const { chromium } = require('playwright');
const U=process.env.U||'http://localhost:4602'; const SEL=process.env.SEL||'section.ar [data-scrub-path]';
(async()=>{
 const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}});
 await p.addInitScript(()=>{try{sessionStorage.setItem('mps-intro','1')}catch(e){}});
 await p.goto(U+'/',{waitUntil:'networkidle'}); await p.waitForTimeout(3000);
 for(let y=6800;y<=8000;y+=100){
   await p.evaluate(y=>window.__pbpLenis.scrollTo(y,{immediate:true}),y); await p.waitForTimeout(1200);
   const o=await p.evaluate((SEL)=>[...document.querySelectorAll(SEL)].slice(0,6).map(x=>parseFloat(getComputedStyle(x).strokeDashoffset).toFixed(2)).join(','),SEL);
   console.log(y,o);
 }
 await b.close();
})();
