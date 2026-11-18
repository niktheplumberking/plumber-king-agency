// Accordion 1 -> 4 switch: open row 1, then click row 4; sample every 50 ms: heights of rows 1 and 4, open count, aria, body opacity.
const { chromium } = require('playwright');
const U=process.env.U||'http://localhost:4602'; const pg=process.env.P||'/'; const W=+(process.env.W||1440); const RM=!!process.env.RM;
(async()=>{
 const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:W,height:900},reducedMotion:RM?'reduce':'no-preference'}); const p=await ctx.newPage();
 await p.addInitScript(()=>{try{sessionStorage.setItem('mps-intro','1')}catch(e){}});
 await p.goto(U+pg,{waitUntil:'networkidle'}); await p.waitForTimeout(2500);
 const grp=await p.evaluate(()=>{const d=[...document.querySelectorAll('details[name]')].filter(x=>x.getClientRects().length&&!x.closest('dialog,[data-mm]')); const n=d[0]?.getAttribute('name'); return {n, count:d.filter(x=>x.getAttribute('name')===n).length, acc:d[0]?.hasAttribute('data-acc')};});
 await p.evaluate((n)=>{window.__R=[...document.querySelectorAll(`details[name="${n}"]`)]; window.__R[0].scrollIntoView({block:'start'});},grp.n); await p.waitForTimeout(1500);
 const snap=()=>p.evaluate(()=>{const R=window.__R; const s=d=>d.querySelector('summary'); const body=d=>[...d.children].find(c=>c.tagName!=='SUMMARY');
   return {h1:Math.round(R[0].offsetHeight),h4:Math.round(R[3].offsetHeight),open:R.filter(d=>d.open&&!d.classList.contains('acc-off')).length,a1:s(R[0]).getAttribute('aria-expanded'),a4:s(R[3]).getAttribute('aria-expanded'),o4:+(+getComputedStyle(body(R[3])).opacity).toFixed(2)};});
 // make row 1 the open one
 await p.evaluate(()=>{const R=window.__R; if(!(R[0].open&&!R[0].classList.contains('acc-off'))) R[0].querySelector('summary').click();}); await p.waitForTimeout(1200);
 const before=await snap();
 await p.evaluate(()=>{window.__T=[];const R=window.__R;const t0=performance.now();const s=d=>d.querySelector('summary');const body=d=>[...d.children].find(c=>c.tagName!=='SUMMARY');
   const iv=setInterval(()=>{window.__T.push([Math.round(performance.now()-t0),Math.round(R[0].offsetHeight),Math.round(R[3].offsetHeight),R.filter(d=>d.open&&!d.classList.contains('acc-off')).length,+(+getComputedStyle(body(R[3])).opacity).toFixed(2)]); if(performance.now()-t0>1000) clearInterval(iv);},50);
   s(R[3]).click();});
 await p.waitForTimeout(1300);
 const T=await p.evaluate(()=>window.__T); const after=await snap();
 // latest click wins: click 2 then (100 ms later) 3
 await p.evaluate(()=>{const R=window.__R; R[1].querySelector('summary').click(); setTimeout(()=>R[2].querySelector('summary').click(),150);}); await p.waitForTimeout(1500);
 const race=await p.evaluate(()=>window.__R.map(d=>(d.open&&!d.classList.contains('acc-off'))?1:0).join(''));
 const mono=(k,dir)=>T.every((x,i)=>i===0||dir*(x[k]-T[i-1][k])>=0);
 const end=T.findIndex((x,i)=>i>0&&x[1]===T[T.length-1][1]&&x[2]===T[T.length-1][2]);
 console.log(JSON.stringify({pg,W,RM,grp,before,after,samples_t_h1_h4_open_op4:T,row1ShrinksMonotonic:mono(1,-1),row4GrowsMonotonic:mono(2,1),maxOpenDuringSwitch:Math.max(...T.map(x=>x[3])),settledAtMs:T[end]?.[0],raceClick2then3:race}));
 await b.close();
})();
