// Cover on page A (until navigation), then reveal on page B. Edge = panel's visible top (cover) / bottom (reveal) per frame.
const { chromium } = require('playwright');
const U=process.env.U||'http://localhost:4602';
(async()=>{
 const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}});
 await p.addInitScript(()=>{try{sessionStorage.setItem('mps-intro','1')}catch(e){}
   window.__r=[]; const t0=performance.now();
   const f=()=>{const pn=document.querySelector('.pt-panel'); if(pn&&document.documentElement.classList.contains('pt-in')){const r=pn.getBoundingClientRect(); window.__r.push([Math.round(performance.now()-t0),Math.round(r.top),Math.round(r.bottom)]);} requestAnimationFrame(f)}; requestAnimationFrame(f);});
 await p.goto(U+'/our-work',{waitUntil:'networkidle'}); await p.waitForTimeout(2500);
 await p.mouse.wheel(0,1500); await p.waitForTimeout(1200);
 await p.evaluate(()=>{window.__s=[];const pn=document.querySelector('.pt-panel');const t0=performance.now();
   const f=()=>{const r=pn.getBoundingClientRect();window.__s.push([Math.round(performance.now()-t0),Math.round(r.top)]);localStorage.setItem('__s',JSON.stringify(window.__s));requestAnimationFrame(f)};requestAnimationFrame(f);
   const a=[...document.querySelectorAll('a')].find(a=>a.getAttribute('href')==='/contact'); a.click();});
 await p.waitForURL(u=>u.pathname==='/contact',{timeout:8000}); await p.waitForTimeout(1600);
 const cov=await p.evaluate(()=>JSON.parse(localStorage.getItem('__s')||'[]'));
 const rev=await p.evaluate(()=>window.__r); const y=await p.evaluate(()=>scrollY);
 const an=(a,k,dir)=>{let mono=true,maxGap=0,stall=0,run=0;for(let i=1;i<a.length;i++){const d=a[i][k]-a[i-1][k];if(dir*d<0)mono=false;maxGap=Math.max(maxGap,a[i][0]-a[i-1][0]);
   if(d===0&&a[i][k]!==a[a.length-1][k]&&a[i][k]!==a[0][k]){run+=a[i][0]-a[i-1][0];stall=Math.max(stall,run)}else run=0;}return {frames:a.length,first:a[0],last:a[a.length-1],mono,maxFrameGap:maxGap,maxMidStallMs:stall};};
 console.log('COVER (top, px; 900 = off below, <=0 = covered)',JSON.stringify(an(cov,1,-1)));
 console.log('cover edge',JSON.stringify(cov.filter((x,i)=>i%3==0).map(x=>x[1])));
 console.log('REVEAL (bottom, px; >=900 covered, <=0 gone)',JSON.stringify(an(rev,2,-1)));
 console.log('reveal edge',JSON.stringify(rev.filter((x,i)=>i%3==0).map(x=>x[2])));
 console.log('landed scrollY',y);
 await b.close();
})();
