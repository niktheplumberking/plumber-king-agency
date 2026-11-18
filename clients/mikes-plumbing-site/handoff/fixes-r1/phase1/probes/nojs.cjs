const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const c=await b.newContext({javaScriptEnabled:false,viewport:{width:1440,height:900}});const p=await c.newPage();
for(const pg of ['/','/plumber-corona-ca']){await p.goto(process.env.U+pg);
 const sel='details[data-acc][name]:not([name="mnav"])'; const n=await p.locator(sel).count();
 await p.locator(sel+' > summary').nth(0).click(); await p.locator(sel+' > summary').nth(3).click();
 const o=await p.evaluate(s=>[...document.querySelectorAll(s)].map(d=>d.open?1:0).join(''),sel); console.log(pg,'rows',n,'open after clicking 1 then 4:',o);}
await b.close();})();
