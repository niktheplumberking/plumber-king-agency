const { chromium } = require('playwright');
(async()=>{
 const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}});
 await p.goto('https://mikes-plumbing-riverside.vercel.app/',{waitUntil:'commit'});
 const t0=Date.now(); let lastLog='';
 for(let i=0;i<70;i++){
  const r=await p.evaluate(()=>{const pn=document.querySelector('.ld-panel');const h=document.querySelector('[data-m-hero] h1');
   const pr=pn?pn.getBoundingClientRect():null; const lines=h?[...h.querySelectorAll('*')].map(e=>getComputedStyle(e).transform).filter(t=>t!=='none').length:0;
   return {panelBottom:pr?Math.round(pr.bottom):null, intro:document.documentElement.classList.contains('intro'), h1op:h?getComputedStyle(h).opacity:null, h1anim:lines}}).catch(()=>null);
  const s=JSON.stringify(r); if(s!==lastLog){console.log(Date.now()-t0,'ms',s); lastLog=s;}
  await p.waitForTimeout(60);
 }
 await b.close();
})();
