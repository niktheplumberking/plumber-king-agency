const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const sec=await figma.getNodeByIdAsync('481:440');
const D=F(sec,'Home - Desktop 1440',120,200,1440,12000,C.paper);D.clipsContent=true;
const ids={D:D.id};
// 01 Utility bar
const U=F(D,'01 Utility bar',0,0,1440,40,C.ink);
SVG(U,IC.pin(C.tan),80,11,18);T(U,'Serving Riverside, the Inland Empire, Orange County & LA',104,10,{z:14,c:C.mute});
SVG(U,IC.flame(C.tan),640,11,18);T(U,'Emergency service',664,10,{z:14,c:C.mute});
HX(U,1062,8,298,24,{fill:C.tan,cut:8,n:'offer tag'});T(U,'15% OFF FOR NEW CUSTOMERS',1088,12,{z:12,s:'SemiBold',c:C.ink,ls:14});
// 02 Header
const Hd=F(D,'02 Header',0,40,1440,104,C.ink);R(Hd,0,103,1440,1,C.line);
LOGO(Hd,80,14,120);
const nav=['Services','Commercial','Areas','About Mike','Reviews','Our work','Contact'];let nx=262;
for(const n of nav){const t=T(Hd,n,nx,40,{z:16,s:'Medium',c:C.cream});nx+=t.width+30;}
T(Hd,'Call Mike',1012,30,{z:12,s:'SemiBold',c:C.tan,ls:16,u:true});T(Hd,'(951) 809-9533',1012,48,{f:'Playfair Display',s:'Bold',z:22,c:C.cream});
BTN(Hd,1200,24,'Free estimate',{k:'cream',h:56,w:160,z:16});
// 03 Hero
const He=F(D,'03 Hero',0,144,1440,836,C.ink);
IMG(He,0,0,1440,836,'mike',{n:'hero bg (IG photo, darkened)'});He.children[He.children.length-1].fills=[{type:'IMAGE',imageHash:H.mike,scaleMode:'FILL',filters:{exposure:-0.35,saturation:-0.6}}];
R(He,0,0,1440,836,C.ink,0.86,'shade');
// big faded watermark word
T(He,'EST 2025',-20,600,{f:'Playfair Display',s:'Black',z:250,c:C.cream,o:0.04,n:'watermark'});
// right: framed Mike photo (badge-hex cut) + name patch beside, not on face
const ph=IMGHX(He,820,70,520,700,'mike',{cutCorners:56,n:'HERO PHOTO: Mike at work (IG), real'});
HX(He,806,56,548,728,{stroke:C.tan,sw:1.5,cut:0,n:'frame line'});He.children[He.children.length-1].vectorPaths=[{windingRule:'NONZERO',data:`M 62 0 L 486 0 L 548 62 L 548 666 L 486 728 L 62 728 L 0 666 L 0 62 Z`}];
const np=F(He,'name patch (beside photo, not on face)',1060,700,300,74,null);np.clipsContent=false;HX(np,0,0,300,74,{fill:C.cream,cut:22});HX(np,6,6,288,62,{stroke:C.ink,sw:1.2,cut:19});
T(np,'MIKE',0,13,{f:'Playfair Display',s:'Black',z:22,c:C.ink,w:300,a:'CENTER',ls:12});T(np,'Owner · does the job himself',0,42,{z:13,s:'Medium',c:C.ink,w:300,a:'CENTER'});
// left copy
const chip=F(He,'review chip (Yelp, real: 5.0 / 20 reviews, read 17 Nov 2026)',80,72,380,48,null);chip.clipsContent=false;HX(chip,0,0,380,48,{fill:C.char2,stroke:C.line,cut:14});
R(chip,26,12,24,24,C.yelp,1,'yelp mark');T(chip,'y',33,12,{f:'Jost',s:'Bold',z:16,c:C.white});T(chip,'5.0',62,11,{f:'Playfair Display',s:'Bold',z:20,c:C.cream});STARS(chip,102,15,17,C.tan);T(chip,'20 reviews on Yelp',204,14,{z:15,c:C.mute});
EYE(He,'Family owned & operated · Est. 2025',80,150,{c:C.tan});
TR(He,[["Riverside's\n",{c:C.cream}],['first-call',{f:'Playfair Display',s:'Black Italic',c:C.tan}],[' plumber.',{c:C.cream}]],80,198,{f:'Playfair Display',s:'Black',z:84,lh:102,w:700,n:'H1 (trade + town)'});
T(He,'Serving Riverside, Corona, Moreno Valley, Menifee and the rest of the IE, OC & LA.',80,412,{z:19,s:'Medium',c:C.tan,w:640,lh:140});
T(He,'Mike runs Mike’s Plumbing Services himself. He grew up in his family’s grease-industry business, has 10+ years hands-on, and fixes drains, leaks, water heaters and sewer lines the right way, then leaves the place spotless.',80,478,{z:18,c:C.mute,w:620,lh:155});
BTN(He,80,606,'Call (951) 809-9533',{k:'cream',icon:'phone',h:64,z:18});
BTN(He,420,606,'Get a free estimate',{k:'ghost',fg:C.cream,h:64,z:18});
const tr=[['shield','Insured'],['check','Free estimates'],['tag','15% off for new customers']];let tx=80;
for(const [i,s] of tr){SVG(He,IC[i](C.tan),tx,706,22);const t=T(He,s,tx+30,706,{z:16,s:'Medium',c:C.cream});tx+=t.width+64;}
ids.hero=He.id;
// 04 Form card straddling hero edge
const Fm=F(D,'04 Quote form (straddles hero edge)',80,904,1280,196,C.cream);Fm.clipsContent=false;Fm.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.25},offset:{x:0,y:18},radius:40,spread:0,visible:true,blendMode:'NORMAL'}];
R(Fm,0,0,1280,6,C.tanD,1,'top rule');
T(Fm,'Get your free estimate',40,34,{f:'Playfair Display',s:'Black',z:30,c:C.ink});T(Fm,'Tell Mike what’s going on. He calls you back.',40,78,{z:16,c:C.muteD});
T(Fm,'Get your',40,118,{f:'Yellowtail',z:28,c:C.tanD,n:'script accent'});T(Fm,'15% new-customer discount',150,124,{z:16,s:'SemiBold',c:C.ink});
FIELD(Fm,470,34,250,'Name');FIELD(Fm,736,34,250,'Phone');FIELD(Fm,1002,34,238,'ZIP code');
FIELD(Fm,470,102,516,'How can Mike help? (drain, leak, water heater…)');BTN(Fm,1002,98,'Send to Mike',{k:'ink',h:60,w:238,z:17,icon:'arrow'});
// 05 Proof strip
const P=F(D,'05 Proof strip (all real)',0,1040,1440,300,C.paper);
const st=[['5.0','Yelp rating','stars'],['20','Yelp reviews, all 5 stars',''],['2025','Mike’s Plumbing est.',''],['10+','years hands-on (Mike, Yelp bio)','']];
for(let i=0;i<4;i++){const x=80+i*320;const g=F(P,'stat '+st[i][1],x,130,300,130,null);g.clipsContent=false;
 T(g,st[i][0],0,0,{f:'Playfair Display',s:'Black',z:64,c:C.ink});if(st[i][2])STARS(g,118,30,20,C.tanD);T(g,st[i][1],0,86,{z:15,s:'Medium',c:C.muteD,w:280});if(i<3)R(P,x+290,140,1,100,'#CFC7AE');}
RULE(P,80,270,1280,'#CFC7AE');
D.appendChild(Fm);
return ids;
