const { chromium } = require('playwright');
(async()=>{
 const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}});
 await p.addInitScript(()=>{try{sessionStorage.setItem('mps-intro','1')}catch(e){}});
 await p.goto('https://mikes-plumbing-riverside.vercel.app/our-work',{waitUntil:'networkidle'}); await p.waitForTimeout(2500);
 await p.evaluate(()=>{window.__s=[];const pn=document.querySelector('.pt-panel');const t0=performance.now();const f=()=>{const r=pn.getBoundingClientRect();window.__s.push([Math.round(performance.now()-t0),Math.round(r.top),getComputedStyle(pn).transform]);requestAnimationFrame(f)};requestAnimationFrame(f);
   const a=[...document.querySelectorAll('a')].find(a=>a.getAttribute('href')==='/contact'); a.click();});
 await p.waitForTimeout(550);
 const s=await p.evaluate(()=>window.__s.filter((x,i)=>i%3==0)).catch(()=>null);
 console.log(JSON.stringify(s));
 await b.close();
})();
