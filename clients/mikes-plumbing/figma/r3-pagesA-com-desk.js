const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const g=async id=>await figma.getNodeByIdAsync(id);
const D=await g('486:1432');
for(const id of ['536:27206','536:27274','536:27293','536:27294','536:27372','486:1480']){const n=await g(id);if(n)n.remove();}
// ===== 04 One big pull quote (general review, homeowner) =====
const PQ=F(D,'04 Review: one big pull quote (Yelp, word for word, a homeowner)',0,0,1440,800,C.cream);
T(PQ,'“',60,-10,{f:'Playfair Display',s:'Black',z:320,c:C.tan,n:'giant quote mark'});
EYE(PQ,'What neighbors say',220,120);
const q=T(PQ,'You can tell he genuinely cares about doing quality work and helping his customers, not just getting in and out.',220,180,{f:'Playfair Display',s:'Black Italic',z:56,c:C.ink,w:1060,lh:118,n:'pull quote'});
const ay=q.y+q.height+40;STARS(PQ,220,ay+4,16,'#C99A2E');
T(PQ,'Jackie H. · Fontana, CA · Yelp · Apr 10, 2026',330,ay,{z:16,s:'SemiBold',c:C.ink});
T(PQ,'From a homeowner’s review (word for word). The same Mike shows up at your business.',220,ay+36,{z:15,c:C.muteD,w:800});
const sy=ay+110;R(PQ,80,sy,1280,1,C.ink,1,'strip rule top');R(PQ,80,sy+64,1280,1,C.ink,1,'strip rule bottom');
const cells=[['star','5.0 on Yelp · 20 reviews',0],['shield','Insured (Mike’s own claim)',0],['home','Family owned · Est. 2025',0],['shield','CSLB lic. #: Mike to confirm',1]];
cells.forEach((c,i)=>{const x=80+i*320;if(i)R(PQ,x,sy+14,1,36,C.tanD,1,'cell rule');SVG(PQ,IC[c[0]](C.tanD),x+24,sy+22,20);T(PQ,c[1],x+56,sy+21,{z:14,s:'Medium',c:c[2]?C.tanD:C.ink});});
PQ.resize(1440,sy+64+100);
// ===== 05 Service manifest on a clipboard =====
const MF=F(D,'05 Restaurant service manifest (clipboard)',0,0,1440,1200,C.paper);
EYE(MF,'What Mike does for businesses',80,140);
TR(MF,[['The service\n',{c:C.ink}],['manifest.',{s:'Black Italic',c:C.tanD}]],80,190,{f:'Playfair Display',s:'Black',z:68,lh:100,w:440,n:'H2'});
T(MF,'Kitchens, bars and back-of-house. Every line on this sheet comes straight from Mike’s own flyer, service list and job posts.',80,350,{z:17,c:C.muteD,w:420,lh:155});
BTN(MF,80,470,'Book a site visit',{k:'ink',icon:'phone',h:58,w:290,z:16});
T(MF,'Or call (951) 809-9533. The estimate is free and on site.',80,548,{z:14,c:C.muteD,w:400});
const BD=F(MF,'clipboard',600,110,760,1000,C.char);BD.cornerRadius=26;BD.clipsContent=false;
BD.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.22},offset:{x:0,y:18},radius:36,spread:0,visible:true,blendMode:'NORMAL'}];
const SH=F(BD,'manifest sheet',40,70,680,890,C.white);SH.clipsContent=false;
T(SH,'SERVICE MANIFEST · MIKE’S PLUMBING SERVICES',48,60,{z:11,s:'Bold',c:C.tanD,ls:22});
T(SH,'Restaurants, bars & businesses',48,84,{f:'Playfair Display',s:'Black',z:30,c:C.ink});
[['Site',48,210],['Contact',290,200]].forEach(f=>{T(SH,f[0].toUpperCase(),f[1],140,{z:10,s:'Bold',c:C.muteD,ls:16});R(SH,f[1],176,f[2],1,C.ink,1,'blank line');});
R(SH,48,206,584,2,C.ink,1,'header rule');
T(SH,'✓',48,218,{z:11,s:'Bold',c:C.tanD});T(SH,'SERVICE',96,220,{z:10,s:'Bold',c:C.tanD,ls:16});T(SH,'WHAT’S INCLUDED',360,220,{z:10,s:'Bold',c:C.tanD,ls:16});
R(SH,48,244,584,1,C.ink,1,'rule');
const items=[['Grease interceptor pumping & cleaning','Pumped and cleaned out completely, with the mess handled.'],
['Kitchen & floor drain jetting','High-pressure jetting for kitchen lines, floor drains and mains packed with grease.'],
['Bar, hand & kitchen sinks','Sinks, faucets and fixtures behind the bar and on the line.'],
['Camera inspection','See inside the line before anything gets cut or replaced.'],
['Leak detection & mainline repair','Leaks found and mainlines repaired, then the site cleaned up.'],
['Pressure washing','Floors, driveways and work areas washed back to clean.']];
let y=262;items.forEach((it,i)=>{const bx=F(SH,'check box',48,y+2,24,24,null);bx.strokes=[solid(C.ink)];bx.strokeWeight=1.5;
 const ck=figma.createNodeFromSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5 L10 17 L20 5" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`);bx.appendChild(ck);ck.x=0;ck.y=-2;ck.name='tick';
 const a=T(SH,it[0],96,y,{f:'Playfair Display',s:'Black',z:19,c:C.ink,w:240,lh:118});const b=T(SH,it[1],360,y+2,{z:14,c:C.muteD,w:272,lh:150});
 y=Math.max(a.y+a.height,b.y+b.height)+20;R(SH,48,y-8,584,1,C.tan,1,'ruled line');y+=12;});
const fy=y+20;T(SH,'ESTIMATE',48,fy,{z:10,s:'Bold',c:C.muteD,ls:16});T(SH,'Free, on site',48,fy+20,{f:'Playfair Display',s:'Black Italic',z:22,c:C.ink});
T(SH,'TECH',400,fy,{z:10,s:'Bold',c:C.muteD,ls:16});T(SH,'Mike',400,fy+8,{f:'Yellowtail',z:40,c:C.ink,n:'signature'});R(SH,400,fy+60,232,1,C.ink,1,'signature line');T(SH,'The owner, on every job',400,fy+68,{z:11,c:C.muteD});
SH.resize(680,fy+110);SH.rotation=-0.8;
BD.resize(760,70+SH.height+60);
// metal clip
const CL=F(BD,'metal clip',230,-28,300,96,null);CL.clipsContent=false;
const cp=R(CL,0,20,300,76,C.tan,1,'clip plate');cp.cornerRadius=14;cp.strokes=[solid(C.tanD)];cp.strokeWeight=2;
const ch=R(CL,100,0,100,44,null,1,'clip ring');ch.cornerRadius=22;ch.strokes=[solid(C.tanD)];ch.strokeWeight=8;
R(CL,30,48,240,3,C.tanD,1,'clip groove');R(CL,30,60,240,3,C.tanD,1,'clip groove');
// polaroid tucked under the clip
const PO=F(BD,'polaroid: grease tank opened for service (Yelp photo)',596,-34,230,262,C.white);PO.clipsContent=false;
PO.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.25},offset:{x:0,y:8},radius:16,spread:0,visible:true,blendMode:'NORMAL'}];
IMG(PO,14,14,202,196,'interceptor',{n:'photo: grease tank opened for service (real, Yelp)'});T(PO,'Grease tank, opened for service',14,222,{z:12,s:'Medium',c:C.ink,w:202});PO.rotation=-6;
BD.insertChild(BD.children.length,CL);
MF.resize(1440,110+BD.height+120);
// ===== footer =====
const ft=(await g('556:2551')).clone();D.appendChild(ft);ft.x=0;
const order=['486:1433','486:1443','486:1459',PQ.id,MF.id,'486:1535','486:1562','536:27305',ft.id];
let yy=0;const pos={};for(const id of order){const n=await g(id);n.y=yy;pos[id]=yy;yy+=n.height;}
const sl=await g('536:27371');sl.y=pos['536:27305'];D.resize(1440,yy);D.appendChild(sl);
return {PQ:PQ.id,MF:MF.id,ft:ft.id,h:yy};
