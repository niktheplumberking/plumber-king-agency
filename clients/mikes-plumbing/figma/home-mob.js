const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const SEC=await figma.getNodeByIdAsync('481:440');
const M=F(SEC,'Home - Mobile 390',2000,200,390,12000,C.paper);M.clipsContent=true;
let y=0;const out={};MHEADER(M,0);y=72;
// HERO
const He=F(M,'Mobile hero',0,y,390,900,C.ink);const bg=IMG(He,0,0,390,900,'mike');bg.fills=[{type:'IMAGE',imageHash:H.mike,scaleMode:'FILL',filters:{exposure:-0.5,saturation:-0.7}}];R(He,0,0,390,900,C.ink,0.86,'shade');
R(He,20,28,22,22,C.yelp,1,'yelp mark');T(He,'y',26,28,{s:'Bold',z:15,c:C.white});T(He,'5.0',50,28,{s:'SemiBold',z:15,c:C.cream});STARS(He,82,31,14,C.tan);T(He,'20 reviews on Yelp',172,29,{z:13,c:C.mute});
EYE(He,'Family owned & operated · Est. 2025',20,66,{c:C.tan,z:11});
const h1=TR(He,[['Riverside’s\n',{c:C.cream}],['first-call',{s:'Black Italic',c:C.tan}],['\nplumber.',{c:C.cream}]],20,110,{f:'Playfair Display',s:'Black',z:50,lh:102,w:350,n:'H1'});
let hy=h1.y+h1.height+16;const it=T(He,'Serving Riverside, Corona, Moreno Valley, Menifee and the rest of the IE, OC & LA. Mike runs it himself and leaves the place spotless.',20,hy,{z:16,c:C.mute,w:350,lh:155});hy+=it.height+24;
BTN(He,20,hy,'Call (951) 809-9533',{k:'cream',icon:'phone',h:58,w:350,z:16});hy+=70;BTN(He,20,hy,'Get a free estimate',{k:'ghost',fg:C.cream,h:58,w:350,z:16});hy+=78;
[['Insured'],['Free estimates'],['15% off new customers']].forEach((c,i)=>{T(He,'✓ '+c[0],20+[0,104,236][i],hy,{z:13,c:C.mute});});hy+=40;
IMGHX(He,20,hy,350,420,'mike',{cutCorners:34,n:'hero photo (real): Mike with drain camera'});
const tag=F(He,'name patch',150,hy+380,200,64,null);tag.clipsContent=false;HX(tag,0,0,200,64,{fill:C.cream,cut:18});T(tag,'MIKE',0,10,{f:'Playfair Display',s:'Black',z:18,c:C.ink,w:200,a:'CENTER',ls:12});T(tag,'Owner · does the job himself',0,36,{z:11,c:C.muteD,w:200,a:'CENTER'});
hy+=480;He.resize(390,hy);for(const n of He.children)if(n.name==='shade'||n.name.startsWith('photo:'))n.resize(390,hy);y+=hy;
// FORM 1
const Fm=F(M,'Mobile quote form 1',0,y,390,500,C.cream);R(Fm,0,0,390,6,C.ink,1,'top rule');
T(Fm,'Get your free estimate',20,32,{f:'Playfair Display',s:'Black',z:26,w:350});T(Fm,'Tell Mike what’s going on. He calls you back.',20,72,{z:15,c:C.muteD,w:350});
['Name','Phone','ZIP code'].forEach((l,i)=>FIELD(Fm,20,112+i*64,350,l));FIELD(Fm,20,304,350,'How can Mike help?');BTN(Fm,20,372,'Send to Mike',{k:'ink',h:58,w:350,icon:'arrow'});T(Fm,'15% new-customer discount',20,446,{z:14,s:'SemiBold',c:C.tanD});
y+=500;
// PROOF 2x2
const Pr=F(M,'Mobile proof grid (all real)',0,y,390,330,C.paper);
[['5.0','Yelp rating'],['20','Yelp reviews, all 5 stars'],['2025','Mike’s Plumbing est.'],['10+','years hands-on (Yelp bio)']].forEach((p,i)=>{const x=20+(i%2)*180,yy=36+Math.floor(i/2)*140;R(Pr,x,yy,2,104,C.tanD,1,'accent');T(Pr,p[0],x+16,yy,{f:'Playfair Display',s:'Black',z:42,c:C.ink});T(Pr,p[1],x+16,yy+62,{z:13,c:C.muteD,w:150,lh:140});});
T(Pr,'Yelp numbers read 17 Nov 2026.',20,302,{z:12,c:C.muteD});y+=330;
// SERVICES (dark) — compact rows
const S=F(M,'Mobile services',0,y,390,1500,C.char);let sb=HEAD(S,20,56,'What Mike fixes',[['Every pipe, drain and heater. '],['Home',1],[' or business.']],null,{dark:true,w:350,z:34});
const sv=[['Drain cleaning & hydro jetting','cleanout'],['Leak detection & slab leaks','stucco'],['Sewer lines & camera inspection','roots'],['Grease interceptors','interceptor'],['Toilets, sinks & faucets','ytoilet'],['Pressure regulators & valves','hosebib'],['Water heaters',null,'flame'],['Garbage disposals & water filtration',null,'filter']];
let sy=sb+32;sv.forEach((s,i)=>{const g=F(S,'service row: '+s[0],20,sy,350,104,C.ink);if(s[1])IMGHX(g,0,0,104,104,s[1],{cutCorners:14,n:'photo (real)'});else{const p=F(g,'icon panel (photo: Mike to send)',0,0,104,104,C.char2);SVG(p,IC[s[2]](C.tan),36,30,32);T(p,'Photo: Mike',0,72,{z:10,c:C.mute,w:104,a:'CENTER'});}
 T(g,String(i+1).padStart(2,'0'),120,16,{f:'Playfair Display',s:'Black',z:14,c:C.tan});T(g,s[0],120,38,{f:'Playfair Display',s:'Bold',z:17,c:C.cream,w:190,lh:118});SVG(g,IC.arrow(C.tan),318,40,20);sy+=116;});
BTN(S,20,sy+12,'All services',{k:'ghost',fg:C.cream,h:56,w:350,icon:'arrow'});S.resize(390,sy+112);y+=S.height;
// MOTTO
const Mo=F(M,'Mobile motto band',0,y,390,96,C.cream);T(Mo,'Friendly. Transparent. Proficient.',0,32,{f:'Playfair Display',s:'Black Italic',z:21,c:C.ink,w:390,a:'CENTER'});y+=96;
// ABOUT
const A=F(M,'Mobile about Mike',0,y,390,1200,C.paper);IMGHX(A,20,48,240,330,'van',{cutCorners:26,n:'photo (real): Mike loading the van'});
const bd=F(A,'years badge',230,300,140,72,null);bd.clipsContent=false;HX(bd,0,0,140,72,{fill:C.ink,cut:20});T(bd,'10+',0,8,{f:'Playfair Display',s:'Black',z:28,c:C.cream,w:140,a:'CENTER'});T(bd,'years hands-on',0,44,{z:12,c:C.tan,w:140,a:'CENTER'});
let ay=HEAD(A,20,412,'About Mike',[['Raised in the grease trade. '],['Built',1],[' for plumbing.']],null,{w:350,z:34});ay+=24;
for(const [h,p] of [['How it started','Mike grew up in his family’s grease-industry business, learning the tough, behind-the-scenes work most plumbers never see.'],['On his own','He started Mike’s Plumbing Services in 2025, with 10+ years of hands-on experience behind him.'],['How he works','Precision, no mess left behind, and the “why” behind the fix explained.']]){T(A,h,20,ay,{z:12,s:'SemiBold',c:C.tanD,u:true,ls:14});const t=T(A,p,20,ay+22,{z:16,c:C.ink,w:350,lh:155});ay=t.y+t.height+22;}
T(A,'Mike',20,ay-6,{f:'Yellowtail',z:46,c:C.ink});T(A,'Owner, Mike’s Plumbing Services',20,ay+56,{z:13,c:C.muteD});BTN(A,20,ay+96,'More about Mike',{k:'ink',h:56,w:350,icon:'arrow'});A.resize(390,ay+200);y+=A.height;
// REVIEWS
const Rv=F(M,'Mobile reviews (Yelp, word for word)',0,y,390,1500,C.ink);let rb=HEAD(Rv,20,56,'Reviews',[['Neighbors call him '],['first.',1]],null,{dark:true,w:350,z:36});
const wd=F(Rv,'Yelp widget header (real, 17 Nov 2026)',20,rb+24,350,100,C.char);wd.strokes=[solid(C.line)];R(wd,20,22,36,36,C.yelp,1,'yelp mark');T(wd,'y',31,26,{s:'Bold',z:22,c:C.white});T(wd,'5.0',70,16,{f:'Playfair Display',s:'Black',z:30,c:C.cream});STARS(wd,130,26,16,C.tan);T(wd,'20 reviews · read 17 Nov 2026',70,62,{z:13,c:C.mute});
let ry=rb+148;[['Mike happened to call around 7pm the same day and offered to at least take a look… I came home to a fixed leak and spotless work site.','Stuart W.','Yelp','Jul 16, 2025'],['Mike was able helped me out with a slab leak on short notice, rerouted water lines and new showers valves installed. He was upfront and honest with me on pricing and reliable when setting up the appointments.','Sal C.','Corona, CA','Jul 25, 2026'],['Mike did a couple of jobs in my house! He’s my first phone call when I need a plumber.','Brandon A.','Los Angeles, CA','Aug 20, 2026']].forEach(r=>{const c=REVIEW(Rv,20,ry,350,r[0],r[1],r[2],r[3],{dark:true,z:15});ry+=c.height+14;});
BTN(Rv,20,ry+14,'Read all 20 reviews',{k:'cream',h:56,w:350,icon:'arrow'});Rv.resize(390,ry+120);y+=Rv.height;
// PROCESS (vertical line through numbers)
const P=F(M,'Mobile how it works',0,y,390,1000,C.paper);let pb=HEAD(P,20,56,'How it works',[['Five steps. '],['No surprises.',1]],null,{w:350,z:34});
const steps=[['Call or text','You reach Mike himself. No call center.'],['He looks first','He finds the real cause and shows you.'],['Free estimate','Price and plan before any work starts.'],['The fix','Done with precision. No shortcuts.'],['Clean up','He leaves the site the way he found it.']];
const py0=pb+40;R(P,51,py0+20,2,4*112,C.tanD,1,'process line (passes through the numbers)');
steps.forEach((s,i)=>{const yy=py0+i*112;HX(P,20,yy,64,44,{fill:C.ink,cut:12,n:'step badge'});T(P,String(i+1).padStart(2,'0'),20,yy+10,{f:'Playfair Display',s:'Black',z:18,c:C.cream,w:64,a:'CENTER'});T(P,s[0],104,yy+2,{f:'Playfair Display',s:'Bold',z:20,c:C.ink,w:266});T(P,s[1],104,yy+34,{z:15,c:C.muteD,w:266,lh:150});});
P.resize(390,py0+5*112+30);y+=P.height;
// COMMERCIAL
const Cm=F(M,'Mobile commercial',0,y,390,1000,C.ink);IMG(Cm,0,0,390,300,'ygrease',{n:'photo (real, Yelp): grease tank'});R(Cm,0,300,390,4,C.tan,1,'edge');
let cb=HEAD(Cm,20,340,'Commercial plumbing',[['Grease is the '],['family business.',1]],'Interceptors, kitchen drains and backed-up lines are work Mike knows from the inside.',{dark:true,w:350,z:32});
['Grease interceptor and trap cleaning','Kitchen and floor drain jetting','Bar sinks, hand sinks, restrooms','Sewer camera inspection'].forEach((c,i)=>{const yy=cb+24+i*44;HX(Cm,20,yy+2,26,20,{stroke:C.tan,cut:6});T(Cm,c,58,yy,{z:16,c:C.cream,w:312});});
const cby=cb+24+4*44+16;BTN(Cm,20,cby,'Commercial service',{k:'cream',h:56,w:350,icon:'arrow'});Cm.resize(390,cby+100);y+=Cm.height;
// GALLERY
const G=F(M,'Mobile our work (real photos)',0,y,390,900,C.cream);let gb=HEAD(G,20,56,'Our work',[['Real jobs. '],['Real photos.',1]],null,{w:350,z:34});
[['roughin',20,gb+28,350,300,'Rough-in plumbing'],['backflow',20,gb+340,169,200,'Main line leak'],['yasphalt',201,gb+340,169,200,'Asphalt patched'],['yard',20,gb+552,350,220,'Site left clean']].forEach(g=>{IMGHX(G,g[1],g[2],g[3],g[4],g[0],{cutCorners:16,n:'photo (real): '+g[5]});const tg=F(G,'caption: '+g[5],g[1]+10,g[2]+g[4]-40,10,28,C.ink);const t=T(tg,g[5],10,5,{z:12,s:'Medium',c:C.cream});tg.resize(t.width+20,28);});
BTN(G,20,gb+796,'See all work',{k:'ink',h:56,w:350,icon:'arrow'});G.resize(390,gb+900);y+=G.height;
// AREAS
const Ar=F(M,'Mobile service areas',0,y,390,1000,C.ink);let arb=HEAD(Ar,20,56,'Service areas',[['Based in Riverside. '],['Out across',1],[' the IE, OC and LA.']],null,{dark:true,w:350,z:32});
const mp=F(Ar,'map frame',20,arb+28,350,250,C.char);mp.strokes=[solid(C.line)];IMG(mp,0,0,350,190,'map',{n:'map (real): Google Maps screenshot 17 Nov 2026'});T(mp,'Google Maps · Riverside, CA area · 17 Nov 2026',14,204,{z:12,c:C.mute,w:322});
let tx=20,ty=arb+300;['Riverside','Corona','Moreno Valley','Menifee','Murrieta','Fontana','Irvine','Buena Park','Los Angeles'].forEach((t,i)=>{const w=t.length*9+48;if(tx+w>370){tx=20;ty+=54;}HX(Ar,tx,ty,w,42,{fill:i===0?C.cream:null,stroke:i===0?null:C.tan,cut:11});T(Ar,t,tx,ty+11,{z:14,s:'Medium',c:i===0?C.ink:C.cream,w:w,a:'CENTER'});tx+=w+10;});
BTN(Ar,20,ty+76,'All service areas',{k:'cream',h:56,w:350,icon:'arrow'});Ar.resize(390,ty+176);y+=Ar.height;
// FAQ
const Q=F(M,'Mobile FAQ',0,y,390,1000,C.paper);let qb=HEAD(Q,20,56,'Questions',[['Straight '],['answers.',1]],null,{w:350,z:34});let qy=qb+28;
[['Are estimates free?','Yes. Mike gives free estimates, so you know the price and the plan before work starts.'],['Do new customers get a discount?'],['Are you licensed and insured?'],['Do you do commercial work?'],['Do you take emergency calls?'],['How can I pay?']].forEach((q,i)=>{const g=F(Q,'faq: '+q[0],20,qy,350,10,i===0?C.ink:C.white);g.strokes=[solid(i===0?C.ink:'#DDD5BC')];const t1=T(g,q[0],20,20,{f:'Playfair Display',s:'Bold',z:18,c:i===0?C.cream:C.ink,w:260});HX(g,302,18,28,28,{stroke:i===0?C.tan:C.tanD,cut:7});T(g,i===0?'–':'+',302,19,{z:18,c:i===0?C.tan:C.tanD,w:28,a:'CENTER'});let h=t1.height+40;if(q[1]){const t=T(g,q[1],20,t1.y+t1.height+12,{z:15,c:C.mute,w:310,lh:155});h=t.y+t.height+22;}g.resize(350,h);qy+=h+10;});
Q.resize(390,qy+50);y+=Q.height;
const MC=MCONTACT(M,y);y+=MC.height;const MF=MFOOTER(M,y);y+=MF.height;const MS=MSTICKY(M,y);y+=MS.height;
M.resize(390,y);
NOTE(SEC,2430,200,'Mobile notes: same facts as desktop. Mike to confirm: hours (Yelp 24h vs Nextdoor 7am-11pm), CSLB licence #, photos for water heaters + disposals/filtration, towns for gallery captions.',300);
SEC.resizeWithoutConstraints(2830,Math.max(SEC.height,200+Math.max(y,(await figma.getNodeByIdAsync('483:437')).height)+200));
out.mobile=M.id;out.h=y;return out;
