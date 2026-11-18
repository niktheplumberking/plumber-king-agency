const { chromium } = require('playwright');
const U=process.env.U||'http://localhost:4602';
(async()=>{
 const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}});
 await p.addInitScript(()=>{try{sessionStorage.setItem('mps-intro','1')}catch(e){}});
 const L=process.env.LEGACY?['/services#drains']:['/drain-cleaning'];
 for (const [from,href] of [['/','/services'],['/',L[0]],['/','/about'],['/services','/water-heaters'],['/reviews','/contact']]){
  await p.goto(U+from,{waitUntil:'networkidle'}); await p.waitForTimeout(1200);
  await p.mouse.wheel(0,2500); await p.waitForTimeout(1500);
  const y0=await p.evaluate(()=>Math.round(scrollY));
  await p.evaluate(h=>{const a=[...document.querySelectorAll('a')].find(a=>a.getAttribute('href')===h); a.click();},href);
  await p.waitForURL(u=>u.pathname!==from,{timeout:8000}).catch(()=>{});
  await p.waitForTimeout(2500);
  const r=await p.evaluate(()=>({y:Math.round(scrollY),u:location.pathname+location.hash}));
  await p.goBack({waitUntil:'networkidle'}); await p.waitForTimeout(2000);
  const back=await p.evaluate(()=>({y:Math.round(scrollY),u:location.pathname}));
  console.log(from,'->',href,'| before',y0,'| landed',JSON.stringify(r),'| back',JSON.stringify(back));
 }
 await b.close();
})();
