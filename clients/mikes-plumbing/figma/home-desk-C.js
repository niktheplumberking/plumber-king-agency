const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const D=await figma.getNodeByIdAsync('483:437');
let y=4982;const out={};
// 09 PROCESS (paper) — 5 hex steps, line passes THROUGH the numbers
const P=F(D,'09 How it works',0,y,1440,720,C.paper);
const pb=HEAD(P,80,100,'How it works',[['Five steps. '],['No surprises.',1]],'What a job with Mike looks like, from your first call to a clean site.',{w:900,z:52});
const steps=[['Call or text','You reach Mike himself on (951) 809-9533. No call center.'],['He looks first','He comes out, finds the real cause and shows you what he sees.'],['Free estimate','You hear the price and the plan before any work starts.'],['The fix','Done with precision, the right parts, no shortcuts.'],['Clean up','He leaves the site the way he found it. Or cleaner.']];
const ly=pb+110;R(P,140,ly-1,1160,2,C.tanD,1,'process line (passes through the numbers)');
steps.forEach((s,i)=>{const cx=140+i*290;HX(P,cx-48,ly-34,96,68,{fill:C.ink,cut:18,n:'step badge'});T(P,String(i+1).padStart(2,'0'),cx-48,ly-18,{f:'Playfair Display',s:'Black',z:26,c:C.cream,w:96,a:'CENTER'});
 T(P,s[0],cx-120,ly+62,{f:'Playfair Display',s:'Bold',z:24,c:C.ink,w:240,a:'CENTER'});T(P,s[1],cx-120,ly+100,{z:15,c:C.muteD,w:240,a:'CENTER',lh:150});});
P.resize(1440,ly+250);out.process=P.id;y+=P.height;
// 10 COMMERCIAL band (ink) — split: real grease-tank photo + list + CTA
const Cm=F(D,'10 Commercial',0,y,1440,760,C.ink);
IMG(Cm,0,0,640,760,'ygrease',{n:'photo (real, Yelp): grease tank'});R(Cm,640,0,4,760,C.tan,1,'edge');
HX(Cm,520,600,200,110,{fill:C.cream,cut:28,n:'badge'});T(Cm,'Restaurants',520,624,{f:'Playfair Display',s:'Black',z:22,c:C.ink,w:200,a:'CENTER'});T(Cm,'bars · shops · offices',520,660,{z:13,c:C.muteD,w:200,a:'CENTER'});
const cb=HEAD(Cm,780,100,'Commercial plumbing',[['Grease is the\n'],['family business.',1]],'Mike grew up in the grease industry. Interceptors, kitchen drains and backed-up lines are work he knows from the inside.',{dark:true,w:580,z:52});
const cl=['Grease interceptor and trap pumping and cleaning','Kitchen and floor drain jetting','Bar sinks, hand sinks and restroom repairs','Sewer camera inspection for property managers'];
cl.forEach((c,i)=>{const yy=cb+40+i*52;HX(Cm,780,yy+2,30,22,{stroke:C.tan,cut:6});T(Cm,c,826,yy,{z:17,c:C.cream,w:520});});
const by=cb+40+cl.length*52+30;BTN(Cm,780,by,'Commercial service',{k:'cream',h:60,w:270,icon:'arrow'});BTN(Cm,1066,by,'Call (951) 809-9533',{k:'ghost',fg:C.cream,h:60,w:290,icon:'phone'});
Cm.resize(1440,Math.max(760,by+140));out.commercial=Cm.id;y+=Cm.height;
// 11 OUR WORK gallery (cream) — masonry of real job photos with captions
const G=F(D,'11 Our work (real photos)',0,y,1440,1000,C.cream);
const gb=HEAD(G,80,100,'Our work',[['Real jobs. '],['Real photos.',1]],null,{w:700,z:52});
BTN(G,1120,gb-62,'See all work',{k:'ink',h:56,w:240,icon:'arrow'});
const gl=[['roughin',80,gb+50,420,560,'Rough-in plumbing'],['backflow',520,gb+50,400,270,'Main line leak repair'],['yasphalt',520,gb+340,400,270,'Line repair, asphalt patched'],['yard',940,gb+50,420,330,'Site left clean'],['yyard',940,gb+400,420,210,'Commercial yard line']];
gl.forEach(g=>{IMGHX(G,g[1],g[2],g[3],g[4],g[0],{cutCorners:22,n:'photo (real): '+g[5]});const tg=F(G,'caption: '+g[5],g[1]+16,g[2]+g[4]-48,10,32,C.ink);const t=T(tg,g[5],12,6,{z:13,s:'Medium',c:C.cream});tg.resize(t.width+24,32);});
T(G,'Town for each photo: Mike to confirm.',80,gb+640,{z:14,c:C.muteD});
G.resize(1440,gb+720);out.gallery=G.id;y+=G.height;
// 12 AREAS (ink) — real Google Maps screenshot + town chips
const Ar=F(D,'12 Service areas',0,y,1440,900,C.ink);
const ab=HEAD(Ar,80,100,'Service areas',[['Based in Riverside.\n'],['Out across',1],[' the IE, OC and LA.']],'Towns below are places Mike has real jobs and reviews from. Mike to confirm how far he travels.',{dark:true,w:560,z:50});
const mp=F(Ar,'map frame',700,100,660,460,C.char);mp.strokes=[solid(C.line)];IMG(mp,0,0,660,357,'map',{n:'map (real): Google Maps screenshot 17 Nov 2026'});
const mpY=357;R(mp,0,mpY,660,103,C.char);T(mp,'Google Maps · Riverside, CA area · screenshot 17 Nov 2026',24,mpY+20,{z:13,c:C.mute});T(mp,'Service-area business: no street address shown.',24,mpY+48,{z:13,c:C.mute});
const towns=['Riverside','Corona','Moreno Valley','Menifee','Murrieta','Fontana','Irvine','Buena Park','Los Angeles'];
let tx=80,ty=ab+40;towns.forEach((t,i)=>{const w=t.length*10+64;if(tx+w>640){tx=80;ty+=62;}HX(Ar,tx,ty,w,48,{fill:i===0?C.cream:null,stroke:i===0?null:C.tan,cut:12,n:'town chip'});T(Ar,t,tx,ty+13,{z:16,s:'Medium',c:i===0?C.ink:C.cream,w:w,a:'CENTER'});tx+=w+12;});
BTN(Ar,80,ty+90,'All service areas',{k:'cream',h:60,w:260,icon:'arrow'});
Ar.resize(1440,Math.max(660,ty+220));out.areas=Ar.id;y+=Ar.height;
// 13 FAQ (paper) — two columns: question list + answer cards
const Q=F(D,'13 FAQ',0,y,1440,900,C.paper);
const qb=HEAD(Q,80,100,'Questions',[['Straight '],['answers.',1]],'Short, honest answers. Where Mike still has to confirm, we say so.',{w:420,z:52});
BTN(Q,80,qb+40,'Call (951) 809-9533',{k:'ink',h:60,w:290,icon:'phone'});
const qs=[['Are estimates free?','Yes. Mike gives free estimates, so you know the price and the plan before work starts.'],['Do new customers get a discount?','Yes. New customers get 15% off. Mike to confirm the terms.'],['Are you licensed and insured?','Insured. CSLB licence number: Mike to confirm before launch.'],['Do you do commercial work?','Yes. Restaurants, bars and businesses, including grease interceptors and kitchen drains.'],['Do you take emergency calls?','Yes, call Mike for emergencies. Exact hours: Mike to confirm.'],['How can I pay?','Cash, Zelle and Cash App. Cards: Mike to confirm.']];
let qy=100;qs.forEach((q,i)=>{const g=F(Q,'faq: '+q[0],600,qy,760,10,i===0?C.ink:C.white);g.strokes=[solid(i===0?C.ink:'#DDD5BC')];
 T(g,q[0],32,26,{f:'Playfair Display',s:'Bold',z:22,c:i===0?C.cream:C.ink,w:640});HX(g,700,24,32,32,{stroke:i===0?C.tan:C.tanD,cut:8});T(g,i===0?'–':'+',700,26,{z:20,s:'Medium',c:i===0?C.tan:C.tanD,w:32,a:'CENTER'});
 let h=84;if(i===0){const t=T(g,q[1],32,72,{z:17,c:C.mute,w:640,lh:155});h=t.y+t.height+28;}g.resize(760,h);qy+=h+14;});
NOTE(D.parent,1600,D.y+y+100,'FAQ answers for the collapsed items are written (see SEO plan). Mike to confirm: licence #, hours, card payments, 15% terms.',300);
Q.resize(1440,Math.max(qy+80,qb+180));out.faq=Q.id;y+=Q.height;
// contact band + footer
const CB=CONTACTBAND(D,y,{photo:'yyard2'});out.contact=CB.id;y+=CB.height;
const Ft=FOOTER(D,y);out.footer=Ft.id;y+=Ft.height;
D.resize(1440,y);out.y=y;return out;
