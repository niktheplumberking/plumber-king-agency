const { chromium } = require('playwright');
const U='https://mikes-plumbing-riverside.vercel.app';
(async()=>{
 const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}});
 await p.addInitScript(()=>{try{sessionStorage.setItem('mps-intro','1')}catch(e){}});
 await p.goto(U+'/',{waitUntil:'networkidle'}); await p.waitForTimeout(3000);
 for(let y=6800;y<=8000;y+=100){
   await p.evaluate(y=>window.__pbpLenis.scrollTo(y,{immediate:true}),y); await p.waitForTimeout(1200);
   const o=await p.evaluate(()=>[...document.querySelectorAll('section.ar [data-route-scrub]')].slice(0,6).map(x=>parseFloat(x.style.strokeDashoffset).toFixed(2)).join(','));
   console.log(y,o);
 }
 await p.evaluate(y=>window.__pbpLenis.scrollTo(y,{immediate:true}),7300); await p.waitForTimeout(1500);
 await p.screenshot({path:'route-mid.png'});
 await b.close();
})();
