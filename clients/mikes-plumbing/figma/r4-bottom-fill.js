const pg=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(pg);
const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r4'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
for(const [f,s] of FONTS)await figma.loadFontAsync({family:f,style:s});
const miss=[];const hex=c=>'#'+[c.r,c.g,c.b].map(v=>Math.round(v*255).toString(16).padStart(2,'0')).join('');
const rgbH=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
const LF=async fn=>{try{await figma.loadFontAsync(fn);return true}catch(e){return false}};
async function S(id,str,hl){const n=await figma.getNodeByIdAsync(id);if(!n||n.type!=='TEXT'){miss.push(id);return;}
 const segs=n.getStyledTextSegments(['fontName','fills','fontSize']);for(const s of segs)await LF(s.fontName);
 const f=segs[0];n.characters=str;const L=str.length;if(!L)return;
 n.setRangeFontName(0,L,f.fontName);n.setRangeFills(0,L,f.fills);n.setRangeFontSize(0,L,f.fontSize);n.setRangeTextDecoration(0,L,'NONE');
 for(const p of (hl||[])){const i=str.indexOf(p);if(i<0){miss.push(id+':'+p);continue;}
  const sb={family:f.fontName.family,style:'SemiBold'};if(await LF(sb))n.setRangeFontName(i,i+p.length,sb);
  n.setRangeTextDecoration(i,i+p.length,'UNDERLINE');
  try{n.setRangeTextDecorationColor(i,i+p.length,{value:rgbH('#d2c4a7')});n.setRangeTextDecorationThickness(i,i+p.length,{value:6,unit:'PIXELS'});n.setRangeTextDecorationOffset(i,i+p.length,{value:-2,unit:'PIXELS'});}catch(e){}}}
async function IMG(id,key,mode){const n=await figma.getNodeByIdAsync(id);if(!n){miss.push(id);return;}n.fills=[{type:'IMAGE',imageHash:H[key],scaleMode:mode||'FILL'}];}
async function SEAL(id){const n=await figma.getNodeByIdAsync(id);if(!n){miss.push(id);return;}n.fills=[{type:'SOLID',color:rgbH('#0f0e0c')},{type:'IMAGE',imageHash:H.logo,scaleMode:'FIT'}];}
async function yelpify(secId){const s=await figma.getNodeByIdAsync(secId);let c=0;
 for(const g of s.findAll(n=>n.name==='Google G')){const w=g.width,h=g.height,p=g.parent,i=p.children.indexOf(g);
  const y=figma.createFrame();y.name='Yelp mark';y.resize(w,h);y.cornerRadius=Math.max(3,w*0.2);y.fills=[{type:'SOLID',color:rgbH('#d32323')}];
  const t=figma.createText();t.fontName={family:'Jost',style:'Bold'};t.characters='y';t.fontSize=Math.round(h*0.78);t.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}];
  y.appendChild(t);t.textAlignHorizontal='CENTER';t.textAlignVertical='CENTER';t.resize(w,h);t.x=0;t.y=-1;
  p.insertChild(i,y);if(p.layoutMode==='NONE'){y.x=g.x;y.y=g.y;}g.remove();c++;}
 for(const v of s.findAll(n=>Array.isArray(n.fills)&&n.fills.some(f=>f.type==='SOLID'&&hex(f.color)==='#f5a623')))v.fills=v.fills.map(f=>f.type==='SOLID'&&hex(f.color)==='#f5a623'?{...f,color:rgbH('#c9a23f')}:f);
 return c;}
const MAP={'#111032':'#0f0e0c','#1c1b45':'#1c1b19','#34335e':'#2a2825','#2a7fa8':'#8e8268','#236f94':'#6f6552','#61adcb':'#d2c4a7','#a9d3e4':'#e8e3c8','#c9dce6':'#e2d9c0','#e8f3f8':'#ece6d1','#f4f9fc':'#f4f0e1','#454867':'#4a453b','#5e7183':'#5e584b'};
async function reskinText(secId){const s=await figma.getNodeByIdAsync(secId);let c=0;
 for(const n of s.findAll(n=>n.type==='TEXT')){const segs=n.getStyledTextSegments(['fills','fontName','fontSize']);
  for(const g of segs){await LF(g.fontName);
   const nf=g.fills.map(f=>f.type==='SOLID'&&MAP[hex(f.color)]?(c++,{...f,color:rgbH(MAP[hex(f.color)])}):f);n.setRangeFills(g.start,g.end,nf);
   if(g.fontName.family==='Montserrat'||g.fontName.family==='Russo One'){let fn;
    if(g.fontName.family==='Russo One')fn={family:'Playfair Display',style:'Black'};
    else if(g.fontSize>=28&&/Bold|Black|Extra/.test(g.fontName.style)){const col=nf[0]&&nf[0].type==='SOLID'?hex(nf[0].color):'';fn={family:'Playfair Display',style:(col==='#8e8268'||col==='#d2c4a7')?'Bold Italic':'Bold'};}
    else fn={family:'Jost',style:g.fontName.style.replace('ExtraBold','Bold').replace('Black','Bold')};
    if(await LF(fn)){n.setRangeFontName(g.start,g.end,fn);c++;}}}}
 for(const n of s.findAll(n=>n.type!=='TEXT'))for(const k of ['fills','strokes']){const f=n[k];if(Array.isArray(f)&&f.some(p=>p.type==='SOLID'&&MAP[hex(p.color)]))n[k]=f.map(p=>p.type==='SOLID'&&MAP[hex(p.color)]?{...p,color:rgbH(MAP[hex(p.color)])}:p);}
 return c;}
const R={};
for(const id of ['573:4960','573:5122','573:5163','573:5243','573:5400','573:5535','573:5636'])R[id]=await reskinText(id);

// EMERGENCY
await IMG('573:5124','backflow');
await S('573:5137','Shut off the water.\nThen call Mike.');
await S('573:5138',"A burst line, a slab leak, a drain backing up. Don't wait and see. Call Mike and tell him what you see.");
await S('573:5144','(951) 809-9533');await S('573:5145','Call or text Mike');
await S('573:5162','Water near outlets or the breaker panel? Stay clear of it and tell Mike when you call.');

// OUR WORK
await S('573:5172','Yelp review · Aug 2025');
await S('573:5173','I sent my request for quote from Yelp to several plumbers for a kitchen faucet replacement. Mike was fast with his response, replaced my faucet for a fair price and did a great job in a timely manner. Very clean, professional, and great communication skills.',['fast with his response','fair price','Very clean']);
await S('573:5176','Mike was');await S('573:5177','fast');await S('573:5179','for a');await S('573:5180','fair price');await S('573:5182','and');await S('573:5183','very clean');
await S('573:5186','S');await S('573:5188','Sydney H.');await S('573:5189','Kitchen faucet replacement');await S('573:5198','Mike');
await S('573:5206','Real jobs,\nnot stock photos');await S('573:5208',"See more of Mike's work");
await IMG('573:5212','hosebib');await S('573:5214','Hose bib pipe job.');
await IMG('573:5215','ygrease');await S('573:5217','Grease tank job. (Yelp photo)');
await IMG('573:5218','roughin');await S('573:5219','Bathroom rough-in, walls still open.');
await IMG('573:5223','yyard');await S('573:5225','Commercial site. (Yelp photo)');
await S('573:5231','43');await S('573:5232',"posts on Mike's Instagram.\nHe shows his work.");await S('573:5234','@mikesplumbingservices');
R.yw=await yelpify('573:5163');

// AREAS
const mc=await figma.getNodeByIdAsync('573:5244');for(const k of [...mc.children])k.remove();
mc.fills=[{type:'IMAGE',imageHash:H.map,scaleMode:'FILL'}];mc.name='Map card / real Google Maps screenshot (17 Nov 2026)';
const tag=figma.createFrame();tag.name='map label';tag.layoutMode='HORIZONTAL';tag.paddingLeft=tag.paddingRight=12;tag.paddingTop=tag.paddingBottom=7;tag.cornerRadius=8;
tag.fills=[{type:'SOLID',color:rgbH('#0f0e0c')}];const tt=figma.createText();tt.fontName={family:'Jost',style:'Medium'};tt.characters='Google Maps · Riverside, CA · 17 Nov 2026';tt.fontSize=12;tt.fills=[{type:'SOLID',color:rgbH('#e8e3c8')}];
tag.appendChild(tt);mc.appendChild(tag);tag.primaryAxisSizingMode='AUTO';tag.counterAxisSizingMode='AUTO';tag.x=20;tag.y=20;
for(const id of ['573:5295','573:5296']){const n=await figma.getNodeByIdAsync(id);if(n)n.remove();}
await S('573:5305','Based in Riverside.\nOut across IE, OC and LA.');
await S('573:5306','Mike works from Riverside and drives out across the Inland Empire, Orange County and Los Angeles.');
await S('573:5312','Inland Empire');await S('573:5320','Orange County');await S('573:5328','Los Angeles');
await S('573:5332','Yelp reviews came from');
const towns=['Riverside','Corona','Moreno Valley','Fontana','Menifee','Murrieta','Irvine','Buena Park','Los Angeles','West Hollywood'];
['573:5338','573:5343','573:5348','573:5353','573:5358','573:5363','573:5368','573:5373','573:5378','573:5383'].forEach((id,i)=>R['t'+i]=id);
for(let i=0;i<10;i++)await S(R['t'+i],towns[i]);
await S('573:5389','Not sure if Mike comes to you? Call and ask.');await S('573:5392','See all service areas');await S('573:5399','(951) 809-9533');

// FAQ
await S('573:5409',"Straight answers. If yours isn't here, call or text Mike.");
await S('573:5417','Rather just ask Mike?');await S('573:5418','Call or text. Hours: Mike to confirm.');
await S('573:5424','Call (951) 809-9533');await S('573:5425','You talk to Mike, the owner');
await S('573:5434','Insured');await S('573:5439','Family owned');await S('573:5444','Yelp 5.0 · 20 reviews');await S('573:5449','Est. 2025');
await SEAL('573:5428');
await S('573:5464','How much does a plumber cost in Riverside?');
await S('573:5469','It depends on the job. Mike looks first and tells you the price before any work starts. Estimates are free, and new customers get 15% off.');
await S('573:5471','Call (951) 809-9533');
await S('573:5481','Are you insured?');
await S('573:5513','Payment');await S('573:5514','How can I pay?');

// CTA
await S('573:5555',"Tell Mike what's going on.\nHe'll take it from there.");
await S('573:5556','Call or text Mike. Or send the form and he calls you back.');
await S('573:5557','(951) 809-9533');await S('573:5561','Tap to call · or text Mike');
await S('573:5569','Free estimates');await S('573:5570','15% off new customers');
await S('573:5577','Insured');await S('573:5578','Licence #: Mike to confirm');
await S('573:5587','5.0 on Yelp');await S('573:5588','from 20 reviews');
await S('573:5602','(951) 000-0000');await S('573:5622','Add a photo (optional). It helps Mike quote faster.');await S('573:5632','Mike calls you back. No spam, ever.');
await SEAL('573:5635');R.yc=await yelpify('573:5535');

// FOOTER
await IMG('573:5644','logo','FIT');
await S('573:5642',"Mike's");
await S('573:5645','Family-owned plumbing from Riverside, for the Inland Empire, Orange County and Los Angeles. Est. 2025.');
await S('573:5651','(951) 809-9533');await S('573:5652','Tap to call or text');
await S('573:5655','2');await S('573:5660','0');{const n=await figma.getNodeByIdAsync('573:5665');if(n)n.parent.visible=false;}
await S('573:5670','Yelp reviews');await S('573:5672','5.0');
const sv=['Drain cleaning','Hydro jetting','Sewer lines & camera','Leak & slab leak repair','Water heaters','Toilets, sinks & faucets','Garbage disposals','Grease interceptors','Commercial plumbing','Emergency plumbing'];
const svIds=['573:5687','573:5688','573:5689','573:5690','573:5691','573:5692','573:5694','573:5695','573:5696','573:5697'];
for(let i=0;i<10;i++)await S(svIds[i],sv[i]);
await S('573:5710','Riverside');await S('573:5711','Inland Empire');await S('573:5712','Orange County');await S('573:5714','Los Angeles');
await S('573:5728','Services');await S('573:5731','Get a free estimate');await S('573:5732','Leave Mike a Yelp review');
await S('573:5740',"Mike's Plumbing Services");await S('573:5741','Serving Riverside, the IE, OC and LA\nService-area business');
await S('573:5742','(951) 809-9533');await S('573:5743','mikesplumbingco25@gmail.com');await S('573:5744','Hours: Mike to confirm\nFree estimates');
await S('573:5761','Yelp 5.0');await S('573:5762','20 of 20 reviews are five stars (read 17 Nov 2026)');
await S('573:5769','Insured');await S('573:5770','Licence #: Mike to confirm');
await S('573:5776','Free estimates · 15% off new customers');
await S('573:5777','Friendly. Transparent. Proficient.');
await S('573:5779',"© 2026 Mike's Plumbing Services");await S('573:5783','Licence #: Mike to confirm');
return {miss,R};
