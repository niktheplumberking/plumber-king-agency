const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const g=async id=>await figma.getNodeByIdAsync(id);
const M=await g('487:2971');
for(const id of ['536:27429','536:27472','536:27491','536:27492','536:27497','487:3002']){const n=await g(id);if(n)n.remove();}
// ===== pull quote =====
const PQ=F(M,'Mobile review: one big pull quote (Yelp, word for word, a homeowner)',0,0,390,900,C.cream);
T(PQ,'“',290,10,{f:'Playfair Display',s:'Black',z:200,c:C.tan,n:'giant quote mark'});
EYE(PQ,'What neighbors say',20,72,{z:11});
const q=T(PQ,'You can tell he genuinely cares about doing quality work and helping his customers, not just getting in and out.',20,170,{f:'Playfair Display',s:'Black Italic',z:34,c:C.ink,w:350,lh:118,n:'pull quote'});
let y=q.y+q.height+28;STARS(PQ,20,y,14,'#C99A2E');
T(PQ,'Jackie H. · Fontana, CA',20,y+26,{z:15,s:'SemiBold',c:C.ink});T(PQ,'Yelp · Apr 10, 2026',20,y+48,{z:14,c:C.muteD});
const nt=T(PQ,'From a homeowner’s review (word for word). The same Mike shows up at your business.',20,y+84,{z:14,c:C.muteD,w:350,lh:150});
y=nt.y+nt.height+32;R(PQ,20,y,350,1,C.ink,1,'strip rule top');
const cells=[['star','5.0 on Yelp · 20 reviews',0],['shield','Insured (Mike’s own claim)',0],['home','Family owned · Est. 2025',0],['shield','CSLB lic. #: Mike to confirm',1]];
cells.forEach((c,i)=>{const yy=y+14+i*46;SVG(PQ,IC[c[0]](C.tanD),20,yy+2,20);T(PQ,c[1],52,yy+2,{z:14,s:'Medium',c:c[2]?C.tanD:C.ink});R(PQ,20,yy+36,350,1,i<3?C.tan:C.ink,1,'rule');});
PQ.resize(390,y+14+4*46+60);
// ===== manifest on a clipboard =====
const MF=F(M,'Mobile restaurant service manifest (clipboard)',0,0,390,1800,C.paper);
EYE(MF,'What Mike does for businesses',20,72,{z:11});
TR(MF,[['The service\n',{c:C.ink}],['manifest.',{s:'Black Italic',c:C.tanD}]],20,114,{f:'Playfair Display',s:'Black',z:44,lh:100,w:350,n:'H2'});
T(MF,'Kitchens, bars and back-of-house. Every line comes straight from Mike’s own flyer, service list and job posts.',20,222,{z:15,c:C.muteD,w:350,lh:155});
const BD=F(MF,'clipboard',12,350,366,1200,C.char);BD.cornerRadius=20;BD.clipsContent=false;
BD.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.22},offset:{x:0,y:14},radius:28,spread:0,visible:true,blendMode:'NORMAL'}];
const SH=F(BD,'manifest sheet',16,56,334,900,C.white);SH.clipsContent=false;
T(SH,'SERVICE MANIFEST',22,34,{z:10,s:'Bold',c:C.tanD,ls:22});
const tt=T(SH,'Restaurants, bars & businesses',22,54,{f:'Playfair Display',s:'Black',z:22,c:C.ink,w:290,lh:115});
let sy=tt.y+tt.height+22;T(SH,'SITE',22,sy,{z:10,s:'Bold',c:C.muteD,ls:16});R(SH,22,sy+34,290,1,C.ink,1,'blank line');sy+=56;
R(SH,22,sy,290,2,C.ink,1,'header rule');sy+=18;
const items=[['Grease interceptor pumping & cleaning','Pumped and cleaned out completely, with the mess handled.'],
['Kitchen & floor drain jetting','High-pressure jetting for kitchen lines, floor drains and mains packed with grease.'],
['Bar, hand & kitchen sinks','Sinks, faucets and fixtures behind the bar and on the line.'],
['Camera inspection','See inside the line before anything gets cut or replaced.'],
['Leak detection & mainline repair','Leaks found and mainlines repaired, then the site cleaned up.'],
['Pressure washing','Floors, driveways and work areas washed back to clean.']];
items.forEach((it,i)=>{const bx=F(SH,'check box',22,sy+2,22,22,null);bx.strokes=[solid(C.ink)];bx.strokeWeight=1.5;
 const ck=figma.createNodeFromSvg(`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5 L10 17 L20 5" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`);bx.appendChild(ck);ck.x=0;ck.y=-2;ck.name='tick';
 const a=T(SH,it[0],58,sy,{f:'Playfair Display',s:'Black',z:18,c:C.ink,w:254,lh:118});const b=T(SH,it[1],58,a.y+a.height+6,{z:14,c:C.muteD,w:254,lh:150});
 sy=b.y+b.height+16;R(SH,22,sy,290,1,C.tan,1,'ruled line');sy+=16;});
T(SH,'ESTIMATE',22,sy+6,{z:10,s:'Bold',c:C.muteD,ls:16});T(SH,'Free, on site',22,sy+24,{f:'Playfair Display',s:'Black Italic',z:19,c:C.ink});
T(SH,'TECH',190,sy+6,{z:10,s:'Bold',c:C.muteD,ls:16});T(SH,'Mike',190,sy+14,{f:'Yellowtail',z:32,c:C.ink,n:'signature'});R(SH,190,sy+58,122,1,C.ink,1,'signature line');
SH.resize(334,sy+90);SH.rotation=-0.6;BD.resize(366,56+SH.height+40);
const CL=F(BD,'metal clip',103,-22,160,70,null);CL.clipsContent=false;
const cp=R(CL,0,16,160,54,C.tan,1,'clip plate');cp.cornerRadius=12;cp.strokes=[solid(C.tanD)];cp.strokeWeight=2;
const ch=R(CL,50,0,60,34,null,1,'clip ring');ch.cornerRadius=17;ch.strokes=[solid(C.tanD)];ch.strokeWeight=6;R(CL,16,40,128,3,C.tanD,1,'clip groove');R(CL,16,50,128,3,C.tanD,1,'clip groove');
// polaroid below the board, tucked at its corner
const by=350+BD.height;const PO=F(MF,'polaroid: grease tank opened for service (Yelp photo)',150,by-20,210,236,C.white);PO.clipsContent=false;
PO.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.25},offset:{x:0,y:8},radius:16,spread:0,visible:true,blendMode:'NORMAL'}];
IMG(PO,12,12,186,176,'interceptor',{n:'photo: grease tank opened for service (real, Yelp)'});T(PO,'Grease tank, opened for service',12,198,{z:11,s:'Medium',c:C.ink,w:186});PO.rotation=5;
BTN(MF,20,by+220,'Book a site visit',{k:'ink',icon:'phone',h:56,w:350,z:15});
T(MF,'Or call (951) 809-9533. The estimate is free and on site.',20,by+290,{z:13,c:C.muteD,w:350,a:'CENTER'});
MF.resize(390,by+290+20+60);
const ft=(await g('557:1020')).clone();M.appendChild(ft);ft.x=0;
const order=['487:2972','487:2982',PQ.id,MF.id,'487:3057','487:3083','487:3139',ft.id,'536:27527'];
let yy=0;for(const id of order){const n=await g(id);n.y=yy;yy+=n.height;}
M.resize(390,Math.round(yy));M.appendChild(await g('536:27527'));M.appendChild(await g('487:2972'));
return {PQ:PQ.id,MF:MF.id,ft:ft.id,h:yy};
