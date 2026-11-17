const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const g=async id=>await figma.getNodeByIdAsync(id);
const M=await g('496:1687');
for(const id of ['538:817','538:860','538:879','538:880','538:887','496:1720']){const n=await g(id);if(n)n.remove();}
const BADGE=(p,x,y,n,d=30)=>{const f=F(p,'badge '+n,x,y,d,d,null);f.clipsContent=false;CIRC(f,0,0,d,{fill:C.ink,stroke:C.ink,sw:1});const t=T(f,String(n),0,0,{s:'Bold',z:14,c:C.cream,w:d,a:'CENTER'});t.textAutoResize='NONE';t.resize(d,d);t.textAlignVertical='CENTER';return f;};
// ===== call log =====
const CLg=F(M,'Mobile reviews: the call log (Yelp, word for word, Yelp dates only)',0,0,390,2000,C.paper);
EYE(CLg,'What neighbors say',20,64,{z:11});
TR(CLg,[['The call ',{c:C.ink}],['log.',{s:'Black Italic',c:C.tanD}]],20,106,{f:'Playfair Display',s:'Black',z:46,lh:100,w:350,n:'H2'});
T(CLg,'When the water won’t stop, people call. Their words, copied from Mike’s Yelp page, dated by the day each review was posted.',20,170,{z:15,c:C.muteD,w:350,lh:155});
const PS=F(CLg,'call log printout',20,290,350,1400,C.white);PS.clipsContent=false;
PS.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.12},offset:{x:0,y:10},radius:22,spread:0,visible:true,blendMode:'NORMAL'}];
const HB=F(PS,'log header',0,0,350,64,C.ink);T(HB,'CALL LOG',34,14,{z:11,s:'Bold',c:C.cream,ls:30});T(HB,'LINE: (951) 809-9533 · SOURCE: YELP',34,36,{z:10,s:'SemiBold',c:C.tan,ls:12});
const rows=[['Jul 16, 2025','Stuart W.','San Diego, CA','Mike happened to call around 7pm the same day and offered to at least take a look and let me know where I stand. … He insisted that he could finish the diagnosis that night which I greatly appreciated!'],
['Jul 28, 2025','Jared K.','Nakagami District, Japan','Answered my late night call and was at my door by 8am the next day. Solved the issue with the toilet in less than an hour.'],
['Aug 1, 2025','Martha B.','CA','On a Friday, I called three plumbers and they couldn’t come over until Monday. Mike actually called me instead of back and forth messaging. … He had all the parts and fixed it perfectly,'],
['Aug 25, 2025','Suzi J.','Valley Center, CA','Mike was here within two hours of our call. We found hime to be professional, friendly and efficient.'],
['Sep 4, 2025','Erik N.','Buena Park, CA','Great service responded fast and did the work same day Would recommend and will use again for any plumbing service that I may need']];
let y=64;rows.forEach((r,i)=>{const band=R(PS,26,y,298,10,C.tan,i%2?0:0.16,'green-bar band');
 T(PS,r[0].toUpperCase(),40,y+18,{z:11,s:'Bold',c:C.ink,ls:6});STARS(PS,250,y+19,10,'#C99A2E');
 const q=T(PS,'“'+r[3]+'”',40,y+44,{z:14,c:C.ink,w:270,lh:150});
 const nm=T(PS,r[1]+' · '+r[2],40,q.y+q.height+8,{z:12,s:'SemiBold',c:C.tanD,w:270});
 const h=nm.y+nm.height+18-y;band.resize(298,h);y+=h;});
for(let hy=84;hy<y+20;hy+=28){CIRC(PS,6,hy,10,{fill:C.paper,stroke:'#D9D0B4',sw:1});CIRC(PS,334,hy,10,{fill:C.paper,stroke:'#D9D0B4',sw:1});}
R(PS,24,64,1,y-64+10,'#D9D0B4',1,'feed strip line');R(PS,325,64,1,y-64+10,'#D9D0B4',1,'feed strip line');
T(PS,'END OF LOG · 5 OF 20 · READ ALL ON YELP →',0,y+16,{z:10,s:'Bold',c:C.tanD,ls:12,w:350,a:'CENTER'});
PS.resize(350,y+50);
let sy=290+PS.height+40;
const st=[['5.0','on Yelp'],['20','reviews'],['Insured','Mike’s own claim'],['2025','family owned since']];
st.forEach((s,i)=>{const x=20+(i%2)*180,yy=sy+Math.floor(i/2)*100;R(CLg,x,yy,165,1,C.ink,1,'stat rule');T(CLg,s[0],x,yy+12,{f:'Playfair Display',s:'Black',z:30,c:C.ink});T(CLg,s[1],x,yy+56,{z:13,c:C.muteD});});
T(CLg,'CSLB lic. #: Mike to confirm',20,sy+210,{z:13,s:'Medium',c:C.tanD});
CLg.resize(390,sy+210+20+60);
// ===== fridge card =====
const FR=F(M,'Mobile before Mike arrives: the fridge card (general tips, not a diagnosis)',0,0,390,2000,C.cream);
EYE(FR,'Before Mike arrives',20,64,{z:11});
TR(FR,[['Stick this\n',{c:C.ink}],['on the fridge.',{s:'Black Italic',c:C.tanD}]],20,106,{f:'Playfair Display',s:'Black',z:42,lh:100,w:350,n:'H2'});
T(FR,'General safety tips while you wait. Not a diagnosis, and not a substitute for a plumber.',20,206,{z:15,c:C.muteD,w:350,lh:155});
const gas=F(FR,'gas warning',20,290,350,76,null);gas.strokes=[solid(C.ink)];gas.strokeWeight=1.5;SVG(gas,IC.flame(C.ink),18,27,22);T(gas,'Smell gas? Leave the house and call your gas company or 911 first.',54,16,{z:14,s:'SemiBold',c:C.ink,w:280,lh:145});
const CW=350;const CD=F(FR,'fridge card',20,430,CW,1200,null);CD.clipsContent=false;
CD.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.18},offset:{x:0,y:12},radius:24,spread:0,visible:true,blendMode:'NORMAL'}];
const bg=figma.createRectangle();bg.name='card body';CD.appendChild(bg);bg.fills=[solid(C.white)];
T(CD,'KEEP BY THE PHONE',0,48,{z:10,s:'Bold',c:C.tanD,ls:22,w:CW,a:'CENTER'});
T(CD,'In a plumbing emergency',24,68,{f:'Playfair Display',s:'Black',z:26,c:C.ink,w:CW-48,a:'CENTER',lh:115});
R(CD,24,140,CW-48,2,C.ink,1,'rule');
const tips=[['Shut off the water','Turn the main shut-off valve clockwise. It is often near the front hose bib or in the garage. For one fixture, close the small valve behind it.'],
['Keep power away from water','If water reaches outlets, appliances or the panel, switch that circuit off only if you can do it from a dry spot.'],
['Turn off the water heater','If the heater is leaking, turn off its gas or power and close the cold-water valve on top.'],
['Stop using drains','If sewage is backing up, don’t flush or run water until the line is cleared.'],
['Take photos, then call Mike','Photos help Mike see the problem and bring the right parts: (951) 809-9533.']];
let ty=164;tips.forEach((t,i)=>{BADGE(CD,24,ty,i+1);const a=T(CD,t[0],66,ty+3,{f:'Playfair Display',s:'Black',z:18,c:C.ink,w:CW-90});const b=T(CD,t[1],66,a.y+a.height+6,{z:14,c:C.muteD,w:CW-90,lh:150});ty=b.y+b.height+20;if(i<4)R(CD,66,ty-10,CW-90,1,C.tan,1,'rule');});
T(CD,'Tear one off for a neighbor. Hours: Mike to confirm.',20,ty+6,{z:11,s:'Medium',c:C.muteD,w:CW-40,a:'CENTER'});
const py=ty+40;bg.resize(CW,py+7);bg.x=0;bg.y=0;PERF(CD,0,py,CW,C.cream,{d:10,gap:10});
const NT=5,TW=CW/NT,TH=160;const TB=F(CD,'tear-off tabs',0,py+3,CW,TH,null);TB.clipsContent=false;
for(let i=0;i<NT;i++){if(i===3)continue;const tb=F(TB,'tab '+(i+1),i*TW,0,TW-4,TH,C.white);tb.clipsContent=false;
 const tx=T(tb,'(951) 809-9533',0,0,{z:14,s:'Bold',c:C.ink});tx.rotation=90;tx.x=TW/2-tx.height;tx.y=TH-16;
 const t2=T(tb,'Mike’s Plumbing',0,0,{z:10,c:C.muteD});t2.rotation=90;t2.x=TW/2+4;t2.y=TH-16;}
CD.resize(CW,py+3+TH);
const MG=F(CD,'magnet',CW/2-24,-22,48,48,null);MG.clipsContent=false;MG.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.3},offset:{x:0,y:5},radius:8,spread:0,visible:true,blendMode:'NORMAL'}];
CIRC(MG,0,0,48,{fill:C.tanD,stroke:C.ink,sw:2});CIRC(MG,11,8,18,{fill:C.tan,stroke:C.tan,sw:1});
CD.rotation=0.8;
const by=430+CD.height+40;
T(FR,'CALL WHILE YOU DO THIS',20,by,{z:11,s:'Bold',c:C.tanD,ls:20});
BTN(FR,20,by+26,'Call Mike now  (951) 809-9533',{k:'ink',icon:'phone',h:56,w:350,z:15});
FR.resize(390,by+26+56+64);
// ===== footer =====
const ft=(await g('557:1020')).clone();M.appendChild(ft);ft.x=0;
const order=['496:1688','496:1698',CLg.id,FR.id,'496:1748','496:1872','496:1884',ft.id,'538:917'];
let yy=0;for(const id of order){const n=await g(id);n.y=yy;yy+=n.height;}
M.resize(390,Math.round(yy));M.appendChild(await g('538:917'));M.appendChild(await g('496:1688'));
return {CL:CLg.id,FR:FR.id,ft:ft.id,h:yy};
