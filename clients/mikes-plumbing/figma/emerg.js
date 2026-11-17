const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const sec=await figma.getNodeByIdAsync('481:444');
for(const n of [...sec.children])if(n.name.startsWith('Emergency page')||n.name.startsWith('NOTE (remove before dev)'))n.remove();
const RVS=[['Suzi J.','Valley Center CA','Aug 25, 2025','5 STARS for Mike\'s... Mike was here within two hours of our call. We found hime to be professional, friendly and efficient. His pricing is very reasonable and he is quick and clean with his work. We highly recommend Mike for your plumbing needs... we will certainly be calling him if and when we need a plummer again. Thank you, Mike.'],
['Jared K.','Nakagami District, Japan','Jul 28, 2025','Answered my late night call and was at my door by 8am the next day. Solved the issue with the toilet in less than an hour. Clean, professional, and provided a fair price. Will use again if the need arises.'],
['Martha B.','CA','Aug 1, 2025','I had a stop valve behind my toilet, so k had to turn off the water for the whole house. On a Friday, I called three plumbers and they couldn\'t come over until Monday. Mike actually called me instead of back and forth messaging. He came over with all the on that Friday. He had all the parts and fixed it perfectly,'],
['Debbie H.','Menifee','Jul 14, 2025','Amazing! wonderful! Responded same day I called. The job was much more complicated than expected...Michael somehow made everything work and wasn\'t gonna leave until fixed. As a single female I appreciate his honesty and excellent workmanship more than words can convey. So unusual these days. ...VERY REASONABLY PRICED!!!!!']];
const STEPS=[['Shut off the water','Turn the main shut-off valve clockwise. It is often near the front hose bib or in the garage. For one fixture, close the small valve behind it.'],['Keep power away from water','If water reaches outlets, appliances or the panel, switch that circuit off only if you can do it from a dry spot.'],['Turn off the water heater','If the heater is leaking, turn off its gas or power and close the cold-water valve on top.'],['Stop using drains','If sewage is backing up, don’t flush or run water until the line is cleared.'],['Take photos, then call Mike','Photos help Mike see the problem and bring the right parts: (951) 809-9533.']];
const EMS=[['drop','Burst and leaking pipes','Pipes, valves and fittings that won’t stop leaking.'],['pin','Water main & service line leaks','Leaks on the line between the street and the house.'],['home','Slab leaks','Leaks under the slab, rerouted water lines.'],['arrow','Sewer backups & clogged mains','Backed-up toilets and drains across the house.'],['flame','Water heater leaks','Leaking or failed water heaters.'],['building','Restaurant & commercial emergencies','Bars, restaurants and grease lines that can’t wait.']];
const H1=[['Emergency plumber in ',{c:C.cream}],['Riverside.',{s:'Black Italic',c:C.tan}]];
const TIPTAG='GENERAL SAFETY TIPS · NOT A DIAGNOSIS';
// ================= DESKTOP =================
const D=F(sec,'Emergency page - Desktop 1440',120,200,1440,9000,C.paper);UTILBAR(D,0);HEADER(D,40,'Services');
const He=F(D,'03 Emergency hero (call first)',0,144,1440,700,C.ink);const bg=IMG(He,0,0,1440,700,'backflow',{n:'hero bg (real photo, darkened)'});bg.fills=[{type:'IMAGE',imageHash:H.backflow,scaleMode:'FILL',filters:{exposure:-0.4,saturation:-0.7}}];R(He,0,0,1440,700,C.ink,0.88,'shade');
T(He,'Home  /  Services  /  Emergency plumbing',80,44,{z:14,c:C.mute,n:'breadcrumb'});EYE(He,'Emergency plumbing',80,84,{c:C.tan});
const h1=TR(He,H1,80,134,{f:'Playfair Display',s:'Black',z:72,lh:104,w:700,n:'H1'});
const it=T(He,'Burst pipe, water main leak, sewage backing up? Call Mike directly. You talk to the owner, not a call center.',80,h1.y+h1.height+22,{z:19,c:C.mute,w:620,lh:155});
let hy=it.y+it.height+36;BTN(He,80,hy,'Call Mike now  (951) 809-9533',{k:'cream',icon:'phone',h:92,w:660,z:26});hy+=112;
BTN(He,80,hy,'Or send the form',{k:'ghost',fg:C.cream,h:52,z:15});T(He,'Emergency service across Riverside, the IE, OC & LA.',330,hy+15,{z:15,c:C.mute});
IMGHX(He,860,56,480,588,'stucco',{cutCorners:50,n:'hero photo (real): leak repair job'});const fl=HX(He,846,42,508,616,{stroke:C.tan,sw:1.5,n:'frame line'});fl.vectorPaths=[{windingRule:'NONZERO',data:'M 56 0 L 452 0 L 508 56 L 508 560 L 452 616 L 56 616 L 0 560 L 0 56 Z'}];
HX(He,900,580,260,48,{fill:C.cream,cut:15,n:'badge'});SVG(He,IC.flame(C.ink),924,592,22);T(He,'EMERGENCY SERVICE',954,594,{z:14,s:'SemiBold',c:C.ink,ls:14});
let y=144+700,b;
// before Mike arrives
const BA=F(D,'04 Before Mike arrives (general tips)',0,y,1440,900,C.cream);
b=HEAD(BA,80,100,'Before Mike arrives',[['What to do '],['right now.',1]],'General safety tips while you wait. They are not a substitute for a plumber. If you smell gas, leave the house and call your gas company or 911 first.',{w:480,z:50});
const cc=F(BA,'call card',80,b+36,480,230,C.ink);T(cc,'Call while you do this',32,32,{z:13,s:'SemiBold',c:C.tan,u:true,ls:16});T(cc,'(951) 809-9533',32,62,{f:'Playfair Display',s:'Black',z:44,c:C.cream});BTN(cc,32,140,'Call Mike now',{k:'cream',icon:'phone',h:60,w:416,z:17});
HX(BA,640,100,380,32,{stroke:C.tanD,sw:1.2,cut:10,n:'general tips tag'});T(BA,TIPTAG,640,107,{z:12,s:'SemiBold',c:C.tanD,ls:14,w:380,a:'CENTER'});
let sy=160;STEPS.forEach((s,i)=>{HX(BA,640,sy,72,48,{fill:C.ink,cut:14,n:'step hex'});T(BA,String(i+1),640,sy+6,{f:'Playfair Display',s:'Black',z:26,c:C.cream,w:72,a:'CENTER'});
 T(BA,s[0],740,sy+4,{f:'Playfair Display',s:'Black',z:26,c:C.ink,w:620});const t=T(BA,s[1],740,sy+46,{z:17,c:C.muteD,w:620,lh:155});sy=t.y+t.height+26;if(i<4){R(BA,740,sy,620,1,'#CFC7AE');sy+=26;}});
BA.resize(1440,Math.max(sy,b+36+230)+110);y+=BA.height;
// emergencies Mike handles
const EM=F(D,'05 Emergencies Mike handles',0,y,1440,900,C.ink);
b=HEAD(EM,80,110,'What counts as an emergency',[['Emergencies Mike '],['handles.',1]],'From Mike’s own posts: slab leaks, mainline leaks, water heaters and restaurant emergencies.',{dark:true,w:860});
EMS.forEach((s,i)=>{const x=80+(i%3)*434,yy=b+56+Math.floor(i/3)*204;const c=F(EM,'emergency: '+s[1],x,yy,410,180,C.char);c.strokes=[solid(C.line)];
 HX(c,28,28,64,44,{stroke:C.tan,sw:1.3,cut:13});SVG(c,IC[s[0]](C.tan),48,38,24);T(c,s[1],112,30,{f:'Playfair Display',s:'Black',z:21,c:C.cream,w:270,lh:115});T(c,s[2],28,104,{z:16,c:C.mute,w:354,lh:150});});
EM.resize(1440,b+56+2*180+24+120);y+=EM.height;
// reviews
const RV=F(D,'06 Reviews: fast response (Yelp, word for word)',0,y,1440,1200,C.paper);
b=HEAD(RV,80,100,'From Yelp',[['When it couldn’t '],['wait.',1]],'Word for word from Mike’s Yelp page.',{w:820});
const col=[b+48,b+48];RVS.forEach((r,i)=>{const c=i%2;const g=REVIEW(RV,80+c*652,col[c],628,r[3],r[0],r[1],r[2]);col[c]+=g.height+24;});
RV.resize(1440,Math.max(col[0],col[1])+90);y+=RV.height;
// call strip (tan)
const CS=F(D,'07 Call strip',0,y,1440,360,C.tan);RULE(CS,80,52,1280,C.ink);
TR(CS,[['Water where it shouldn’t be? ',{c:C.ink}],['Call Mike.',{s:'Black Italic',c:C.ink}]],80,120,{f:'Playfair Display',s:'Black',z:56,lh:106,w:900});
BTN(CS,1000,124,'(951) 809-9533',{k:'ink',icon:'phone',h:76,w:360,z:22});T(CS,'You talk to the owner. Free estimates. 15% off for new customers.',80,236,{z:18,s:'Medium',c:C.ink});RULE(CS,80,296,1280,C.ink);y+=360;
const CB=CONTACTBAND(D,y,{photo:'roughin',h:[['Plumbing emergency in\n'],['Riverside?',1],[' Call Mike.']]});y+=CB.height;const FT=FOOTER(D,y);y+=FT.height;D.resize(1440,y);
NOTE(sec,1600,500,'MIKE TO CONFIRM (HOURS): Yelp says open 24 hours, 7 days. Nextdoor says 7:00 AM-11:00 PM, 7 days. Page says only "Emergency service" until Mike confirms. No "24/7" claim.',320);
NOTE(sec,1600,800,'MIKE TO CONFIRM: emergency job list (slab leaks, mainline leaks, restaurant emergencies are from his IG posts; burst pipes, sewer backups, water heater leaks from his flyer services).',320);
NOTE(sec,1600,1100,'NOTE: "Before Mike arrives" = general safety tips, labelled as such. Mike to confirm he is happy with them.',320);
// ================= MOBILE =================
const M=F(sec,'Emergency page - Mobile 390',2000,200,390,9000,C.paper);MHEADER(M,0);
const mH=F(M,'Mobile emergency hero (call first)',0,72,390,1000,C.ink);const mbg=IMG(mH,0,0,390,1000,'backflow',{n:'hero bg (real photo, darkened)'});mbg.fills=[{type:'IMAGE',imageHash:H.backflow,scaleMode:'FILL',filters:{exposure:-0.4,saturation:-0.7}}];const msh=R(mH,0,0,390,1000,C.ink,0.88,'shade');
T(mH,'Home / Services / Emergency',20,24,{z:13,c:C.mute});EYE(mH,'Emergency plumbing',20,56,{c:C.tan,z:11});const mh1=TR(mH,H1,20,100,{f:'Playfair Display',s:'Black',z:42,lh:106,w:350});
const mit=T(mH,'Burst pipe, main leak, sewage backing up? Call Mike directly. You talk to the owner.',20,mh1.y+mh1.height+16,{z:16,c:C.mute,w:350,lh:155});
let my=mit.y+mit.height+24;BTN(mH,20,my,'Call Mike now',{k:'cream',icon:'phone',h:80,w:350,z:22});my+=92;T(mH,'(951) 809-9533',20,my,{f:'Playfair Display',s:'Black',z:30,c:C.cream,w:350,a:'CENTER'});my+=60;
IMGHX(mH,20,my,350,240,'stucco',{cutCorners:30,n:'hero photo (real): leak repair job'});HX(mH,36,my+186,216,40,{fill:C.cream,cut:12,n:'badge'});SVG(mH,IC.flame(C.ink),54,my+196,18);T(mH,'EMERGENCY SERVICE',78,my+197,{z:12,s:'SemiBold',c:C.ink,ls:12});my+=272;
mH.resize(390,my);mbg.resize(390,my);msh.resize(390,my);let y2=72+my;
const mBA=F(M,'Before Mike arrives (general tips)',0,y2,390,1400,C.cream);b=HEAD(mBA,20,56,'Before Mike arrives',[['What to do '],['right now.',1]],'General safety tips, not a substitute for a plumber. Smell gas? Leave and call your gas company or 911 first.',{w:350,z:34});
HX(mBA,20,b+24,350,30,{stroke:C.tanD,sw:1.2,cut:10});T(mBA,TIPTAG,20,b+31,{z:10,s:'SemiBold',c:C.tanD,ls:10,w:350,a:'CENTER'});
let by=b+80;STEPS.forEach((s,i)=>{HX(mBA,20,by,52,34,{fill:C.ink,cut:10});T(mBA,String(i+1),20,by+4,{f:'Playfair Display',s:'Black',z:19,c:C.cream,w:52,a:'CENTER'});
 T(mBA,s[0],88,by+2,{f:'Playfair Display',s:'Black',z:19,c:C.ink,w:282});const t=T(mBA,s[1],88,by+32,{z:14,c:C.muteD,w:282,lh:150});by=t.y+t.height+24;});
mBA.resize(390,by+32);y2+=mBA.height;
const mEM=F(M,'Emergencies Mike handles',0,y2,390,1200,C.ink);b=HEAD(mEM,20,56,'Emergencies',[['Emergencies Mike '],['handles.',1]],null,{dark:true,w:350,z:34});
let ey=b+28;EMS.forEach(s=>{const c=F(mEM,'emergency: '+s[1],20,ey,350,96,C.char);c.strokes=[solid(C.line)];HX(c,16,20,56,38,{stroke:C.tan,sw:1.3,cut:11});SVG(c,IC[s[0]](C.tan),34,29,20);
 const t=T(c,s[1],88,18,{f:'Playfair Display',s:'Black',z:17,c:C.cream,w:246});const d=T(c,s[2],88,t.y+t.height+4,{z:13,c:C.mute,w:246,lh:140});c.resize(350,Math.max(96,d.y+d.height+18));ey+=c.height+10;});
mEM.resize(390,ey+46);y2+=mEM.height;
const mRV=F(M,'Reviews: fast response (Yelp)',0,y2,390,2400,C.paper);b=HEAD(mRV,20,56,'From Yelp',[['When it couldn’t '],['wait.',1]],null,{w:350,z:34});
let ry=b+28;RVS.forEach(r=>{const g=REVIEW(mRV,20,ry,350,r[3],r[0],r[1],r[2],{z:15});ry+=g.height+16;});mRV.resize(390,ry+40);y2+=mRV.height;
const mCS=F(M,'Call strip',0,y2,390,400,C.tan);RULE(mCS,20,36,350,C.ink);const ct=TR(mCS,[['Water where it shouldn’t be? ',{c:C.ink}],['Call Mike.',{s:'Black Italic',c:C.ink}]],20,84,{f:'Playfair Display',s:'Black',z:32,lh:110,w:350});
BTN(mCS,20,ct.y+ct.height+24,'(951) 809-9533',{k:'ink',icon:'phone',h:64,w:350,z:19});mCS.resize(390,ct.y+ct.height+24+64+48);y2+=mCS.height;
const MC=MCONTACT(M,y2);y2+=MC.height;const MF=MFOOTER(M,y2);y2+=MF.height;MSTICKY(M,y2);y2+=76;M.resize(390,y2);
NOTE(sec,2430,500,'MIKE TO CONFIRM (mobile): same as desktop: hours (Yelp 24h vs Nextdoor 7am-11pm), emergency job list, general safety tips.',300);
let mxb=0;for(const n of sec.children)mxb=Math.max(mxb,n.y+n.height);sec.resizeWithoutConstraints(2830,mxb+200);
return {D:D.id,dh:y,M:M.id,mh:y2,sec:[sec.width,sec.height]};
