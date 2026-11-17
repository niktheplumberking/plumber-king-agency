const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const D=await figma.getNodeByIdAsync('483:437');let y=7750;const out={};
for(const n of D.children)if(n.name.includes('crosses into Commercial')||n.name.startsWith('name tag on emergency'))n.y+=40;
// 08 COMMERCIAL (paper) — list left, real grease-tank photo right
const Cm=F(D,'08 Commercial',0,y,1440,900,C.paper);
const cb=HEAD(Cm,80,160,'Commercial plumbing',[['Grease is the\n'],['family business.',1]],'Mike grew up in the grease industry. Interceptors, kitchen drains and backed-up lines are work he knows from the inside.',{w:560,z:52});
const cl=['Grease interceptor and trap pumping and cleaning','Kitchen and floor drain jetting','Bar sinks, hand sinks and restroom repairs','Sewer camera inspection for property managers'];
cl.forEach((c,i)=>{const yy=cb+36+i*52;HX(Cm,80,yy+2,30,22,{stroke:C.tanD,cut:6});T(Cm,c,126,yy,{z:17,c:C.ink,w:520});});
const by=cb+36+cl.length*52+30;BTN(Cm,80,by,'Commercial service',{k:'ink',h:60,w:270,icon:'arrow'});BTN(Cm,366,by,'Call (951) 809-9533',{k:'ghost',fg:C.ink,h:60,w:290,icon:'phone'});
IMGHX(Cm,760,140,600,520,'ygrease',{cutCorners:44,n:'photo (real, Yelp): grease tank'});
const bdg=F(Cm,'badge: restaurants',700,560,220,110,null);bdg.clipsContent=false;HX(bdg,0,0,220,110,{fill:C.ink,cut:30});T(bdg,'Restaurants',0,26,{f:'Playfair Display',s:'Black',z:22,c:C.cream,w:220,a:'CENTER'});T(bdg,'bars · shops · offices',0,62,{z:13,c:C.tan,w:220,a:'CENTER'});
Cm.resize(1440,Math.max(by+220,800));out.commercial=Cm.id;y+=Cm.height;
// 09 AREAS (char) — map card overlaps the section above (pattern breaker)
const Ar=F(D,'09 Service areas',0,y,1440,820,C.char);
const mp=F(D,'map card (real Google Maps 17 Nov 2026) — overlaps Commercial: pattern breaker',80,y-120,640,560,C.ink);mp.strokes=[solid(C.tan)];mp.strokeWeight=1.5;mp.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.3},offset:{x:0,y:20},radius:40,spread:0,visible:true,blendMode:'NORMAL'}];
IMG(mp,16,16,608,460,'map',{n:'map (real): Google Maps screenshot 17 Nov 2026'});T(mp,'Google Maps · Riverside, CA area · screenshot 17 Nov 2026',24,492,{z:13,c:C.mute});T(mp,'Service-area business: no street address shown.',24,516,{z:13,c:C.mute});
const pin=F(mp,'pin chip: Riverside base',230,190,200,50,null);pin.clipsContent=false;HX(pin,0,0,200,50,{fill:C.cream,stroke:C.ink,cut:15});SVG(pin,IC.pin(C.ink),22,14,22);T(pin,'Mike’s base: Riverside',52,14,{z:14,s:'SemiBold',c:C.ink});
const ab=HEAD(Ar,800,110,'Where Mike works',[['Based in Riverside.\n'],['Out across',1],[' the IE, OC and LA.']],'Every town below is a place Mike has a real Yelp review from. How far he travels: Mike to confirm.',{dark:true,w:560,z:46});
const towns=['Riverside','Corona','Moreno Valley','Menifee','Murrieta','Fontana','Irvine','Buena Park','Los Angeles'];
let tx=800,ty=ab+34;towns.forEach((t,i)=>{const w=t.length*10+64;if(tx+w>1360){tx=800;ty+=58;}HX(Ar,tx,ty,w,46,{fill:i===0?C.cream:null,stroke:i===0?null:C.tan,cut:12,n:'town chip'});T(Ar,t+(i===0?'':' →'),tx,ty+12,{z:15,s:'Medium',c:i===0?C.ink:C.cream,w:w,a:'CENTER'});tx+=w+10;});
const nq=F(Ar,'not sure box',800,ty+80,560,64,null);nq.clipsContent=false;const nqr=R(nq,0,0,560,64,null);nqr.strokes=[solid(C.line)];nqr.dashPattern=[6,5];SVG(nq,IC.pin(C.tan),20,20,22);T(nq,'Not sure Mike comes to you? Call and ask: (951) 809-9533',56,21,{z:15,c:C.cream});
Ar.resize(1440,Math.max(ty+220,mp.y+mp.height-y+100));out.areas=Ar.id;y+=Ar.height;
// 10 FAQ (paper) — "rather ask Mike?" card with his face
const Q=F(D,'10 FAQ',0,y,1440,900,C.paper);
const qb=HEAD(Q,80,130,'Good questions',[['Things people ask\n'],['before they call.',1]],'Straight answers. Where Mike still has to confirm, we say so.',{w:460,z:46});
const ak=F(Q,'ask a person card (Mike)',80,qb+50,420,250,C.ink);ak.clipsContent=false;AVATAR(ak,300,-40,100);T(ak,'Rather just ask Mike?',28,36,{f:'Playfair Display',s:'Black',z:24,c:C.cream,w:260});T(ak,'He picks up himself. Hours: Mike to confirm.',28,104,{z:14,c:C.mute,w:300});BTN(ak,28,160,'Call (951) 809-9533',{k:'cream',h:56,w:280,icon:'phone'});
const tc=[['shield','Insured'],['check','Free estimates'],['tag','15% off new customers'],['star','5.0 on Yelp · 20 reviews']];tc.forEach((t,i)=>{SVG(Q,IC[t[0]](C.tanD),80+(i%2)*210,qb+340+Math.floor(i/2)*36,18);T(Q,t[1],106+(i%2)*210,qb+338+Math.floor(i/2)*36,{z:14,s:'Medium',c:C.ink});});
const qs=[['PRICING','Are estimates free?','Yes. Mike gives free estimates, so you know the price and the plan before work starts.'],['OFFER','Do new customers get a discount?'],['TRUST','Are you licensed and insured?'],['BUSINESS','Do you do commercial work?'],['EMERGENCY','Do you take emergency calls?'],['PAYMENT','How can I pay?']];
let qy=130;qs.forEach((q,i)=>{const g=F(Q,'faq: '+q[1],620,qy,740,10,i===0?C.ink:C.white);g.strokes=[solid(i===0?C.ink:'#DDD5BC')];
 T(g,String(i+1).padStart(2,'0'),28,30,{f:'Playfair Display',s:'Black',z:22,c:i===0?C.tan:C.tanD});T(g,q[0],80,16,{z:10,s:'SemiBold',c:i===0?C.tan:C.tanD,ls:16});T(g,q[1],80,32,{f:'Playfair Display',s:'Bold',z:20,c:i===0?C.cream:C.ink,w:560});
 HX(g,684,26,32,32,{stroke:i===0?C.tan:C.tanD,cut:8});T(g,i===0?'–':'+',684,28,{z:20,s:'Medium',c:i===0?C.tan:C.tanD,w:32,a:'CENTER'});
 let h=84;if(q[2]){const t=T(g,q[2],80,74,{z:16,c:C.mute,w:580,lh:155});h=t.y+t.height+28;}g.resize(740,h);qy+=h+12;});
Q.resize(1440,Math.max(qy+100,qb+520));out.faq=Q.id;y+=Q.height;
SLANT(D,y,C.paper,60,1);
// 11 CONTACT (ink) — big phone number + form
const K=F(D,'11 Contact (big phone)',0,y,1440,820,C.ink);const kb=IMG(K,0,0,1440,820,'van');kb.fills=[{type:'IMAGE',imageHash:H.van,scaleMode:'FILL',filters:{exposure:-0.5,saturation:-0.9}}];R(K,0,0,1440,820,C.ink,0.9,'shade');
EYE(K,'Ready when you are',80,150,{c:C.tan});TR(K,[['Tell Mike what’s going on.\n',{c:C.cream}],['He’ll take it from here.',{s:'Black Italic',c:C.tan}]],80,200,{f:'Playfair Display',s:'Black',z:50,lh:106,w:680,n:'H2'});
T(K,'Call or text and you talk to the owner. Free estimates, and 15% off your first job as a new customer.',80,350,{z:18,c:C.mute,w:600,lh:155});
const big=F(K,'big phone display',80,430,640,130,null);big.clipsContent=false;HX(big,0,0,640,130,{stroke:C.tan,cut:40,sw:2});T(big,'TAP TO CALL · MIKE ANSWERS',60,18,{z:12,s:'SemiBold',c:C.tan,ls:18});T(big,'(951) 809-9533',60,40,{f:'Playfair Display',s:'Black',z:64,c:C.cream});
[['shield','Insured'],['star','5.0 on Yelp'],['pin','Riverside · IE · OC · LA']].forEach((c,i)=>{const g=F(K,'contact chip: '+c[1],80+i*214,600,200,56,C.char);g.strokes=[solid(C.line)];SVG(g,IC[c[0]](C.tan),18,17,22);T(g,c[1],50,17,{z:14,s:'Medium',c:C.cream});});
const fm=F(K,'form 2',800,110,560,600,C.cream);fm.clipsContent=false;AVATAR(fm,470,-36,90,{ring:C.tan});T(fm,'Get a free estimate',40,40,{f:'Playfair Display',s:'Black',z:32});T(fm,'Mike calls you back. New customers get 15% off.',40,90,{z:16,c:C.muteD});
FIELD(fm,40,136,232,'Name');FIELD(fm,288,136,232,'Phone');FIELD(fm,40,204,480,'ZIP code');
T(fm,'What’s going on?',40,276,{z:14,s:'SemiBold'});let px=40;['Leak','Clog or backup','No hot water','Grease / commercial','Other'].forEach((p,i)=>{const t=figma.createText();t.fontName={family:'Jost',style:'Medium'};t.characters=p;t.fontSize=14;const w=Math.ceil(t.width)+36;t.remove();if(i===3)px=40;const yy=i>2?346:304;const g=F(fm,'pill: '+p,px,yy,w,34,i===0?C.ink:C.white);g.strokes=[solid('#CFC7AE')];T(g,p,18,7,{z:14,s:'Medium',c:i===0?C.cream:C.ink});px+=w+8;});
const up=F(fm,'photo upload (optional)',40,396,480,60,null);const upr=R(up,0,0,480,60,null);upr.strokes=[solid(C.tanD)];upr.dashPattern=[6,5];SVG(up,IC.camera(C.tanD),18,18,24);T(up,'Add a photo of the problem (optional)',54,19,{z:15,c:C.muteD});
BTN(fm,40,478,'Send to Mike',{k:'ink',h:62,w:480,icon:'arrow'});T(fm,'We call you back. No spam.',40,556,{z:13,c:C.muteD});
K.resize(1440,820);out.contact=K.id;y+=K.height;
// 12 FOOTER — floating cream card on ink, script watermark
const Ft=F(D,'12 Footer (floating card)',0,y,1440,640,C.ink);T(Ft,'Mike’s',700,400,{f:'Yellowtail',z:220,c:C.cream,o:0.06,n:'script watermark (cropped)'});
const fc=F(Ft,'footer card',80,60,1280,440,C.cream);LOGO(fc,40,40,150);T(fc,'Family owned & operated plumbing for homes and businesses across Riverside, the Inland Empire, Orange County and LA. Est. 2025.',40,150,{z:14,c:C.muteD,w:320,lh:155});
const cols=[['Services',['Drain cleaning & hydro jetting','Leak detection & slab leaks','Water heaters','Sewer lines & camera','Commercial & grease','Emergency plumbing']],['Company',['About Mike','Reviews','Our work','Service areas','Contact']],['Areas',['Riverside','Corona','Moreno Valley','Menifee','Murrieta','Fontana']]];
cols.forEach((c,i)=>{const x=420+i*220;T(fc,c[0],x,44,{z:12,s:'SemiBold',c:C.tanD,u:true,ls:14});c[1].forEach((l,j)=>T(fc,l,x,76+j*30,{z:14,c:C.ink,w:210}));});
T(fc,'CALL MIKE',1080,44,{z:12,s:'SemiBold',c:C.tanD,ls:14});T(fc,'(951) 809-9533',1080,70,{f:'Playfair Display',s:'Black',z:22,c:C.ink});T(fc,'mikesplumbingco25@gmail.com',1080,106,{z:13,c:C.muteD});
['IG','Yelp','ND'].forEach((s,i)=>{HX(fc,1080+i*58,140,50,32,{stroke:C.ink,cut:9});T(fc,s,1080+i*58,147,{z:12,s:'SemiBold',c:C.ink,w:50,a:'CENTER'});});
const tb=F(fc,'trust row',40,330,1200,70,C.paper);[['star','5.0 on Yelp · 20 reviews'],['shield','Insured'],['home','Family owned · Est. 2025'],['shield','CSLB lic. #: Mike to confirm']].forEach((t,i)=>{SVG(tb,IC[t[0]](C.tanD),24+i*300,24,22);T(tb,t[1],54+i*300,24,{z:14,s:'Medium',c:C.ink});});
T(Ft,'© 2026 Mike’s Plumbing Services · Privacy · Terms',80,560,{z:13,c:C.mute});T(Ft,'Website by Plumber King Agency',1140,560,{z:13,c:C.mute,w:220,a:'RIGHT'});
out.footer=Ft.id;y+=Ft.height;
for(const n of [...D.children])if(n.name.includes('crosses into')||n.name.startsWith('name tag on emergency')||n.name.startsWith('map card')||n.name.startsWith('slanted'))D.appendChild(n);
D.resize(1440,y);out.y=y;return out;
