// ===== round-2 transform (fork A). CFG set per page =====
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
function hexOf(n){const f=n.fills&&n.fills[0];if(!f||f.type!=='SOLID')return C.ink;const h=v=>Math.round(v*255).toString(16).padStart(2,'0');return '#'+h(f.color.r)+h(f.color.g)+h(f.color.b);}
function killLines(F0,headerName){let k=0;for(const n of F0.findAll(n=>n.name==='divider: badge rule'))if(!n.removed){n.remove();k++;}
 for(const n of F0.findAll(n=>(n.type==='RECTANGLE'||n.type==='LINE')&&n.width>=(F0.width>500?1200:330)&&n.height<=3&&!/pipe|process|timeline|passes|underline|quote|accent/i.test(n.name)&&n.parent&&(n.y<=60||n.y>=n.parent.height-60))){let p=n.parent,inH=false;while(p&&p!==F0){if(p.name.startsWith(headerName)||p.name.startsWith('Mobile header')||p.name.startsWith('Mobile sticky'))inH=true;p=p.parent;}if(!inH){n.remove();k++;}}return k;}
function heroChip(He,mobile){const btns=He.children.filter(n=>n.name.startsWith('button:'));if(!btns.length)return 0;const mb=Math.max(...btns.map(b=>b.y+b.height));const sh=56;
 for(const n of He.children){if(n.y>=mb-1&&!(n.name.includes('bg')||n.name==='shade'||n.name.startsWith('photo:')))n.y+=sh;}
 if(!mobile){/* desktop: only shift left column items */}
 He.resize(He.width,He.height+sh);for(const n of He.children)if(n.name.includes('hero bg')||n.name==='shade'||n.name.startsWith('photo:'))n.resize(n.width,He.height);
 const w=mobile?350:270;const lc=F(He,'trust chip: CSLB licence (Mike to confirm)',mobile?20:80,mb+12,w,38,null);lc.clipsContent=false;const lh=HX(lc,0,0,w,38,{stroke:C.tan,cut:11});lh.dashPattern=[5,4];SVG(lc,IC.shield(C.tan),18,9,20);T(lc,'CSLB lic. #: Mike to confirm',46,9,{z:14,s:'Medium',c:C.cream});return sh;}
function MTRUST(M,y,rv){const S=F(M,'Mobile reviews + trust (right after hero, Nick rule)',0,y,390,900,C.paper);
 EYE(S,'What neighbors say',20,40,{c:C.tanD,z:11});const yc=F(S,'Yelp score card (real, 17 Nov 2026)',20,86,350,170,C.ink);R(yc,20,20,30,30,C.yelp,1,'yelp mark');T(yc,'y',29,22,{s:'Bold',z:20,c:C.white});T(yc,'Mike on Yelp · 17 Nov 2026',62,26,{z:12,s:'SemiBold',c:C.cream});
 T(yc,'5.0',20,64,{f:'Playfair Display',s:'Black',z:48,c:C.cream});STARS(yc,116,80,18,C.tan);T(yc,'20 reviews, all 5 stars',116,106,{z:13,c:C.mute});T(yc,'Insured · Family owned · Est. 2025',20,138,{z:12,c:C.cream});
 const lb=F(S,'licence box (Mike to confirm)',20,270,350,42,null);const lbh=HX(lb,0,0,350,42,{stroke:C.tanD,cut:12});lbh.dashPattern=[5,4];T(lb,'CSLB licence #: Mike to confirm',0,11,{z:13,s:'Medium',c:C.tanD,w:350,a:'CENTER'});
 let ry=334;const cards=[];rv.forEach(r=>{const c=REVIEW(S,20,ry,350,r[0],r[1],r[2],r[3],{z:14});cards.push(c);ry+=c.height+14;});
 const last=cards[cards.length-1];S.resize(390,last.y+last.height-70);const gy=S.y+last.y;M.appendChild(last);last.x=20;last.y=gy;last.name+=' (crosses into next section: pattern breaker)';last.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.22},offset:{x:0,y:12},radius:28,spread:0,visible:true,blendMode:'NORMAL'}];return S;}
function MFOOTER2(M,y){const S=F(M,'Mobile footer (floating card)',0,y,390,720,C.ink);T(S,'Mike’s',150,560,{f:'Yellowtail',z:120,c:C.cream,o:0.06,n:'script watermark (cropped)'});
 const fc=F(S,'footer card',20,32,350,560,C.cream);LOGO(fc,24,24,120);T(fc,'Family owned & operated plumbing for homes and businesses across Riverside, the IE, OC and LA. Est. 2025.',24,110,{z:14,c:C.muteD,w:302,lh:155});
 T(fc,'(951) 809-9533',24,200,{f:'Playfair Display',s:'Black',z:26,c:C.ink});T(fc,'mikesplumbingco25@gmail.com',24,240,{z:14,c:C.muteD});
 ['Services','About Mike','Reviews','Our work','Areas','Contact'].forEach((l,i)=>T(fc,l,24+(i%2)*160,284+Math.floor(i/2)*32,{z:15,c:C.ink}));
 const tb=F(fc,'trust rows',24,396,302,140,C.paper);[['star','5.0 on Yelp · 20 reviews'],['shield','Insured'],['home','Family owned · Est. 2025'],['shield','CSLB lic. #: Mike to confirm']].forEach((t,i)=>{SVG(tb,IC[t[0]](C.tanD),16,14+i*30,18);T(tb,t[1],44,13+i*30,{z:13,s:'Medium',c:C.ink});});
 T(S,'© 2026 Mike’s Plumbing Services · Privacy · Terms',20,616,{z:12,c:C.mute});T(S,'Website by Plumber King Agency',20,640,{z:12,c:C.mute});return S;}
function spacerTicker(P,y,nextColor,mobile,items){const sp=F(P,'ticker spacer',0,y,mobile?390:1440,mobile?140:110,nextColor);const tk=TICKER(P,y+(mobile?82:22),items,{bg:C.tan,fg:C.ink,rot:mobile?-2.5:-1.4,w:mobile?460:1560,h:mobile?48:66,z:mobile?15:22});if(mobile)tk.x=-30;return sp;}
async function doDesktop(id){const D=await figma.getNodeByIdAsync(id);const log={};log.lines=killLines(D,'02 Header');
 const secs=D.children.filter(n=>n.type==='FRAME'&&n.width===1440&&n.x===0).sort((a,b)=>a.y-b.y);const hi=secs.findIndex(n=>/hero/i.test(n.name));const He=secs[hi];
 heroChip(He,false);
 for(const n of secs){if(CFG.dropD.some(s=>n.name.startsWith(s))||n.name==='Contact band'||n.name==='Footer')n.remove();}
 const rest=D.children.filter(n=>n.type==='FRAME'&&n.width===1440&&n.x===0&&!n.removed).sort((a,b)=>a.y-b.y);
 let y=He.y+He.height;const after=rest.filter(n=>n.y>He.y);
 const TRv=TRUSTREVIEWS(D,y,CFG.rv);y+=TRv.height;const nextC=after.length?hexOf(after[0]):C.paper;spacerTicker(D,y,nextC,false,CFG.ticker);y+=110;
 for(const n of after){n.y=y;y+=n.height;}
 const last=after[after.length-1];const K=CONTACT2(D,y,{prevColor:last?hexOf(last):C.paper});y+=K.height;const Ft=FOOTER2(D,y);y+=Ft.height;
 for(const n of [...D.children])if(n.name.includes('ticker band'))D.appendChild(n);for(const n of [...D.children])if(n.name.includes('crosses into')||n.name.startsWith('slanted'))D.appendChild(n);
 D.resize(1440,y);log.h=y;return log;}
async function doMobile(id){const M=await figma.getNodeByIdAsync(id);const log={};log.lines=killLines(M,'Mobile header');
 const secs=M.children.filter(n=>n.type==='FRAME'&&n.width===390&&n.x===0).sort((a,b)=>a.y-b.y);const He=secs.find(n=>/hero/i.test(n.name));heroChip(He,true);
 for(const n of secs){if(CFG.dropM.some(s=>n.name.startsWith(s))||n.name==='Mobile footer'||n.name.startsWith('Mobile sticky'))n.remove();}
 const after=M.children.filter(n=>n.type==='FRAME'&&n.width===390&&n.x===0&&!n.removed&&n.y>He.y).sort((a,b)=>a.y-b.y);
 let y=He.y+He.height;const TRv=MTRUST(M,y,CFG.rv.slice(0,2));y+=TRv.height;const nextC=after.length?hexOf(after[0]):C.paper;spacerTicker(M,y,nextC,true,CFG.ticker);y+=140;
 for(const n of after){n.y=y;y+=n.height;}
 const Ft=MFOOTER2(M,y);y+=Ft.height;const St=MSTICKY(M,y);y+=St.height;
 for(const n of [...M.children])if(n.name.includes('ticker band'))M.appendChild(n);for(const n of [...M.children])if(n.name.includes('crosses into'))M.appendChild(n);
 M.resize(390,y);log.h=y;return log;}
const out={d:await doDesktop(CFG.d),m:await doMobile(CFG.m)};
const SEC=await figma.getNodeByIdAsync(CFG.sec);const Dd=await figma.getNodeByIdAsync(CFG.d),Mm=await figma.getNodeByIdAsync(CFG.m);
SEC.resizeWithoutConstraints(2830,Math.max(Dd.y+Dd.height,Mm.y+Mm.height)+200);return out;
