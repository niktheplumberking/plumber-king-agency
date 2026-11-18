const { chromium } = require('playwright');
const U='https://mikes-plumbing-riverside.vercel.app';
(async()=>{
 const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}});
 await p.addInitScript(()=>{try{sessionStorage.setItem('mps-intro','1')}catch(e){}});
 for (const [from,href] of [['/','/services'],['/','/services#drains'],['/','/about'],['/services','/water-heaters'],['/reviews','/contact']]){
  await p.goto(U+from,{waitUntil:'networkidle'}); await p.waitForTimeout(1200);
  await p.mouse.wheel(0,2500); await p.waitForTimeout(1500);
  const y0=await p.evaluate(()=>scrollY);
  await p.evaluate(h=>{const a=[...document.querySelectorAll('a')].find(a=>a.getAttribute('href')===h); a.click();},href);
  await p.waitForURL(u=>u.href.includes(href.split('#')[0]) && u.pathname!==from,{timeout:8000}).catch(()=>{});
  await p.waitForTimeout(2500);
  const r=await p.evaluate(()=>({y:scrollY,u:location.pathname+location.hash}));
  console.log(from,'->',href,'| before',y0,'| landed',JSON.stringify(r));
 }
 await b.close();
})();
