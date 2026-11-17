const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const g=async id=>await figma.getNodeByIdAsync(id);
const D=await g('496:1354');
for(const id of ['538:590','538:658','538:677','538:678','538:760','496:1407']){const n=await g(id);if(n)n.remove();}
const BADGE=(p,x,y,n,d=34)=>{const f=F(p,'badge '+n,x,y,d,d,null);f.clipsContent=false;CIRC(f,0,0,d,{fill:C.ink,stroke:C.ink,sw:1});const t=T(f,String(n),0,0,{s:'Bold',z:15,c:C.cream,w:d,a:'CENTER'});t.textAutoResize='NONE';t.resize(d,d);t.textAlignVertical='CENTER';return f;};
// ===== 04 Call log (reviews, Yelp dates only) =====
const CLg=F(D,'04 Reviews: the call log (Yelp, word for word, Yelp dates only)',0,0,1440,1200,C.paper);
EYE(CLg,'What neighbors say',80,120);
TR(CLg,[['The call\n',{c:C.ink}],['log.',{s:'Black Italic',c:C.tanD}]],80,170,{f:'Playfair Display',s:'Black',z:72,lh:100,w:380,n:'H2'});
T(CLg,'When the water won’t stop, people call. These are their words, copied from Mike’s Yelp page. Each entry is dated by the day the review was posted.',80,330,{z:17,c:C.muteD,w:360,lh:155});
const st=[['5.0','on Yelp'],['20','reviews'],['Insured','Mike’s own claim'],['2025','family owned since']];
st.forEach((s,i)=>{const x=80+(i%2)*190,y=490+Math.floor(i/2)*110;R(CLg,x,y,170,1,C.ink,1,'stat rule');T(CLg,s[0],x,y+14,{f:'Playfair Display',s:'Black',z:34,c:C.ink});T(CLg,s[1],x,y+62,{z:13,c:C.muteD});});
const cs=T(CLg,'CSLB lic. #: Mike to confirm',80,720,{z:13,s:'Medium',c:C.tanD});
// printout sheet
const PS=F(CLg,'call log printout',500,110,860,900,C.white);PS.clipsContent=false;
PS.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.12},offset:{x:0,y:14},radius:30,spread:0,visible:true,blendMode:'NORMAL'}];
const HB=F(PS,'log header',0,0,860,52,C.ink);
T(HB,'CALL LOG',56,17,{z:12,s:'Bold',c:C.cream,ls:30});T(HB,'LINE: (951) 809-9533  ·  SOURCE: YELP, READ 17 NOV 2026',0,18,{z:11,s:'SemiBold',c:C.tan,ls:14,w:804,a:'RIGHT'});
const hd=[['Logged',100],['Caller',230],['In their words',400],['Stars',730]];hd.forEach(h=>T(PS,h[0].toUpperCase(),h[1],74,{z:10,s:'Bold',c:C.tanD,ls:16}));
const rows=[['Jul 16, 2025','Stuart W.','San Diego, CA','Mike happened to call around 7pm the same day and offered to at least take a look and let me know where I stand. … He insisted that he could finish the diagnosis that night which I greatly appreciated!'],
['Jul 28, 2025','Jared K.','Nakagami District, Japan','Answered my late night call and was at my door by 8am the next day. Solved the issue with the toilet in less than an hour.'],
['Aug 1, 2025','Martha B.','CA','On a Friday, I called three plumbers and they couldn’t come over until Monday. Mike actually called me instead of back and forth messaging. … He had all the parts and fixed it perfectly,'],
['Aug 25, 2025','Suzi J.','Valley Center, CA','Mike was here within two hours of our call. We found hime to be professional, friendly and efficient.'],
['Sep 4, 2025','Erik N.','Buena Park, CA','Great service responded fast and did the work same day Would recommend and will use again for any plumbing service that I may need']];
let y=104;const tl=R(PS,70,104,1,10,C.tan,1,'timeline');
rows.forEach((r,i)=>{const band=R(PS,40,y,780,10,C.tan,i%2?0:0.16,'green-bar band');
 CIRC(PS,64,y+22,13,{fill:C.ink,stroke:C.white,sw:2});
 T(PS,r[0].toUpperCase(),100,y+20,{z:12,s:'Bold',c:C.ink,ls:6,w:120});
 T(PS,r[1],230,y+18,{z:15,s:'SemiBold',c:C.ink,w:160});T(PS,r[2],230,y+40,{z:12,c:C.muteD,w:160,lh:140});
 const q=T(PS,'“'+r[3]+'”',400,y+18,{z:15,c:C.ink,w:310,lh:150});
 STARS(PS,730,y+22,11,'#C99A2E');
 const h=Math.max(q.height,60)+38;band.resize(780,h);y+=h;});
tl.resize(1,y-104);
// tractor-feed holes both sides
for(let hy=70;hy<y+30;hy+=30){CIRC(PS,12,hy,11,{fill:C.paper,stroke:'#D9D0B4',sw:1});CIRC(PS,837,hy,11,{fill:C.paper,stroke:'#D9D0B4',sw:1});}
const hl=R(PS,36,52,1,y+20-52,'#D9D0B4',1,'feed strip line');const hr=R(PS,824,52,1,y+20-52,'#D9D0B4',1,'feed strip line');
T(PS,'END OF LOG · 5 OF 20 SHOWN · READ ALL 20 ON YELP →',0,y+16,{z:11,s:'Bold',c:C.tanD,ls:16,w:860,a:'CENTER'});
PS.resize(860,y+60);
CLg.resize(1440,110+PS.height+110);
// ===== 05 Fridge card (tear-off shut-off guide) =====
const FR=F(D,'05 Before Mike arrives: the fridge card (general tips, not a diagnosis)',0,0,1440,1300,C.cream);
EYE(FR,'Before Mike arrives',80,140);
TR(FR,[['Stick this\n',{c:C.ink}],['on the fridge.',{s:'Black Italic',c:C.tanD}]],80,190,{f:'Playfair Display',s:'Black',z:64,lh:100,w:440,n:'H2'});
T(FR,'General safety tips while you wait. They are not a diagnosis and not a substitute for a plumber.',80,350,{z:17,c:C.muteD,w:400,lh:155});
const gas=F(FR,'gas warning',80,440,400,80,null);gas.strokes=[solid(C.ink)];gas.strokeWeight=1.5;SVG(gas,IC.flame(C.ink),20,28,22);T(gas,'Smell gas? Leave the house and call your gas company or 911 first.',58,18,{z:15,s:'SemiBold',c:C.ink,w:320,lh:145});
T(FR,'CALL WHILE YOU DO THIS',80,570,{z:11,s:'Bold',c:C.tanD,ls:20});T(FR,'(951) 809-9533',80,594,{f:'Playfair Display',s:'Black',z:44,c:C.ink});
BTN(FR,80,670,'Call Mike now',{k:'ink',icon:'phone',h:58,w:300,z:16});
const CW=700;const CD=F(FR,'fridge card',600,150,CW,1000,C.white);CD.clipsContent=false;
CD.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.18},offset:{x:0,y:16},radius:30,spread:0,visible:true,blendMode:'NORMAL'}];
T(CD,'MIKE’S PLUMBING SERVICES · KEEP BY THE PHONE',0,64,{z:10,s:'Bold',c:C.tanD,ls:22,w:CW,a:'CENTER'});
T(CD,'In a plumbing emergency',0,88,{f:'Playfair Display',s:'Black',z:36,c:C.ink,w:CW,a:'CENTER'});
R(CD,56,148,CW-112,2,C.ink,1,'rule');
const tips=[['Shut off the water','Turn the main shut-off valve clockwise. It is often near the front hose bib or in the garage. For one fixture, close the small valve behind it.'],
['Keep power away from water','If water reaches outlets, appliances or the panel, switch that circuit off only if you can do it from a dry spot.'],
['Turn off the water heater','If the heater is leaking, turn off its gas or power and close the cold-water valve on top.'],
['Stop using drains','If sewage is backing up, don’t flush or run water until the line is cleared.'],
['Take photos, then call Mike','Photos help Mike see the problem and bring the right parts: (951) 809-9533.']];
let ty=176;tips.forEach((t,i)=>{BADGE(CD,56,ty,i+1);const a=T(CD,t[0],110,ty+4,{f:'Playfair Display',s:'Black',z:21,c:C.ink});const b=T(CD,t[1],110,a.y+a.height+6,{z:15,c:C.muteD,w:CW-166,lh:150});ty=b.y+b.height+24;if(i<4)R(CD,110,ty-12,CW-166,1,C.tan,1,'rule');});
T(CD,'Tear one off for a neighbor.  Hours: Mike to confirm.',0,ty+10,{z:12,s:'Medium',c:C.muteD,w:CW,a:'CENTER'});
const py=ty+46;PERF(CD,0,py,CW,C.cream,{d:10,gap:10});
// tear-off tabs
const NT=8,TW=CW/NT,TH=180;const TB=F(CD,'tear-off tabs',0,py+10,CW,TH,null);TB.clipsContent=false;
TB.y=py+3;CD.fills=[];const bg=figma.createRectangle();bg.name='card body';bg.resize(CW,py+7);bg.fills=[solid(C.white)];CD.insertChild(0,bg);
for(let i=0;i<NT;i++){if(i===5)continue;const tb=F(TB,'tab '+(i+1),i*TW,0,TW-4,TH,C.white);tb.clipsContent=false;
 const tx=T(tb,'(951) 809-9533',0,0,{z:15,s:'Bold',c:C.ink});tx.rotation=90;tx.x=TW/2-tx.height+2;tx.y=TH-20;
 const t2=T(tb,'Mike’s Plumbing',0,0,{z:11,c:C.muteD});t2.rotation=90;t2.x=TW/2+6;t2.y=TH-20;}
CD.resize(CW,py+10+TH);
// magnet
const MG=F(CD,'magnet',CW/2-30,-26,60,60,null);MG.clipsContent=false;MG.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.3},offset:{x:0,y:6},radius:10,spread:0,visible:true,blendMode:'NORMAL'}];
CIRC(MG,0,0,60,{fill:C.tanD,stroke:C.ink,sw:2});CIRC(MG,14,10,22,{fill:C.tan,stroke:C.tan,sw:1});
CD.rotation=1.2;
FR.resize(1440,150+CD.height+130);
// ===== footer =====
const ft=(await g('556:2551')).clone();D.appendChild(ft);ft.x=0;
const order=['496:1355','496:1365','496:1381',CLg.id,FR.id,'496:1447','496:1573','538:693',ft.id];
let yy=0;const pos={};for(const id of order){const n=await g(id);n.y=yy;pos[id]=yy;yy+=n.height;}
const sl=await g('538:759');sl.y=pos['538:693'];D.resize(1440,yy);D.appendChild(sl);
return {CL:CLg.id,FR:FR.id,ft:ft.id,h:yy};
