// ===== 11 CONTACT =====
const sec=await figma.getNodeByIdAsync('481:450');
const CARDS=[['phone','Call or text','(951) 809-9533'],['mail','Email','mikesplumbingco25@gmail.com'],['clock','Hours','Mike to confirm (Yelp: open 24 hours; Nextdoor: 7 AM-11 PM)'],['pin','Area','Riverside · Inland Empire · Orange County · LA']];
function CCARD(S,x,y,w,c){const g=F(S,'contact card: '+c[1],x,y,w,124,C.white);g.strokes=[solid('#D6CEB4')];g.strokeWeight=1;HX(g,20,22,52,40,{stroke:C.tanD,cut:11});SVG(g,IC[c[0]](C.tanD),34,30,24);
 T(g,c[1],88,22,{z:12,s:'SemiBold',c:C.tanD,u:true,ls:14});const v=T(g,c[2],88,42,{z:c[0]==='phone'?20:16,s:c[0]==='phone'?'SemiBold':'Medium',c:C.ink,w:w-110,lh:140});g.resize(w,Math.max(96,v.y+v.height+22));return g;}
function CALLPANEL(S,x,y,w,m){const g=F(S,'Big call panel',x,y,w,m?420:460,C.ink);g.clipsContent=false;R(g,0,0,6,m?420:460,C.tan,1,'accent bar');const p=m?24:48;
 T(g,'Fastest way to reach Mike',p,p,{f:'Yellowtail',z:m?28:34,c:C.tan});T(g,'Call or text',p,p+(m?46:56),{z:13,s:'SemiBold',c:C.mute,u:true,ls:16});
 T(g,'(951) 809-9533',p,p+(m?70:84),{f:'Playfair Display',s:'Black',z:m?40:60,c:C.cream});
 const yy=p+(m?134:178);T(g,'You talk to the owner, not a call center. Emergency service. Hours: Mike to confirm.',p,yy,{z:m?15:17,c:C.mute,w:w-2*p,lh:155});
 BTN(g,p,yy+(m?76:80),'Call (951) 809-9533',{k:'cream',icon:'phone',h:m?56:62,w:m?w-2*p:300,z:m?16:17});BTN(g,m?p:p+316,yy+(m?144:80),'Text Mike',{k:'ghost',fg:C.cream,h:m?56:62,w:m?w-2*p:180,z:m?16:17});
 g.resize(w,yy+(m?224:170));g.children[0].resize(6,g.height);return g;}
function FULLFORM(S,x,y,w,m){const g=F(S,'Full contact form',x,y,w,900,C.cream);g.strokes=[solid('#D6CEB4')];const p=m?20:44;const fw=w-2*p;const hw=m?fw:(fw-16)/2;
 T(g,'Get your free estimate',p,p,{f:'Playfair Display',s:'Black',z:m?26:34,w:fw});T(g,'Mike calls you back. New customers get 15% off their first job.',p,p+(m?40:52),{z:15,c:C.muteD,w:fw});
 let yy=p+(m?94:104);const pair=(a,b)=>{if(m){FIELD(g,p,yy,fw,a);yy+=64;FIELD(g,p,yy,fw,b);yy+=64;}else{FIELD(g,p,yy,hw,a);FIELD(g,p+hw+16,yy,hw,b);yy+=68;}};
 pair('Name','Phone');pair('Email','ZIP code');
 const sv=FIELD(g,p,yy,fw,'Service needed: choose one');SVG(sv,IC.arrow(C.tanD),fw-40,16,18);sv.children[sv.children.length-1].rotation=-90;sv.children[sv.children.length-1].y=34;yy+=68;
 const lab=(s)=>{T(g,s,p,yy,{z:13,s:'SemiBold',c:C.tanD,u:true,ls:14});yy+=28;};
 lab('Is it an emergency?');CHIP(g,p,yy,'Yes, now',{h:40,z:15});CHIP(g,p+130,yy,'No, can wait',{h:40,z:15});yy+=56;
 lab('Home or business?');CHIP(g,p,yy,'Home',{h:40,z:15});CHIP(g,p+106,yy,'Business',{h:40,z:15});yy+=56;
 FIELD(g,p,yy,fw,'What’s going on?',{h:120});yy+=136;
 const up=F(g,'photo upload (optional)',p,yy,fw,78,C.white);up.strokes=[solid(C.tanD)];up.dashPattern=[6,5];SVG(up,IC.camera(C.tanD),20,27,24);T(up,'Add photos of the problem (optional)',58,18,{z:15,s:'Medium',c:C.ink,w:fw-80});T(up,'Helps Mike see the job before he calls.',58,42,{z:13,c:C.muteD,w:fw-80});yy+=94;
 FIELD(g,p,yy,fw,'Best time to call back');yy+=72;
 BTN(g,p,yy,'Send to Mike',{k:'ink',h:62,w:fw,icon:'arrow'});yy+=78;T(g,'Or call (951) 809-9533. We only use your details to reply to you.',p,yy,{z:13,c:C.muteD,w:fw});
 g.resize(w,BOT(g)+p);return g;}
function PAY(S,x,y,w,h,name,sub,o={}){const g=F(S,'payment: '+name,x,y,w,h,o.dash?null:C.white);g.strokes=[solid(o.dash?C.tanD:'#D6CEB4')];if(o.dash)g.dashPattern=[8,6];
 HX(g,20,22,52,40,{fill:o.dash?null:C.ink,stroke:o.dash?C.tanD:null,cut:11});SVG(g,IC[o.ic||'tag'](o.dash?C.tanD:C.tan),34,30,24);T(g,name,88,24,{f:'Playfair Display',s:'Bold',z:22,c:C.ink,w:w-104});T(g,sub,88,58,{z:14,c:C.muteD,w:w-104,lh:140});return g;}
const PAYS=[['Cash','Listed on Yelp',{}],['Zelle','Listed on Yelp',{}],['Cash App','Listed on Yelp',{}],['Cards','Mike to confirm',{dash:1,ic:'clock'}]];
const QS=[['How fast can Mike come out?','Mike offers emergency service. Call (951) 809-9533 and he will tell you when he can be there. Exact hours: Mike to confirm.'],['Are estimates free?','Yes. Estimates are free, and new customers get 15% off their first job.'],['Do you work for businesses too?','Yes. Restaurants and commercial properties: grease interceptors, hydro jetting, leaks and emergencies.'],['Are you insured?','Yes, insured. CSLB licence number: Mike to confirm.']];
const D=F(sec,'Contact - Desktop 1440',120,200,1440,8000,C.paper);
UTILBAR(D,0);HEADER(D,40,'Contact');
let y=144+PAGEHERO(D,144,{photo:'van',crumb:'Home  /  Contact',eye:'Contact Mike',z:62,btn2:'Send a message',h1:[['Call Mike:\n',{c:C.cream}],['(951) 809-9533',{f:'Playfair Display',s:'Black Italic',c:C.tan}]],intro:'You talk to the owner, not a call center. Free estimates, and 15% off your first job as a new customer.'}).height;
let S=F(D,'S1 Call panel, contact cards, full form',0,y,1440,1400,C.paper);
const cp=CALLPANEL(S,80,96,580,false);let cy=cp.y+cp.height+24;CARDS.forEach(c=>{const k=CCARD(S,80,cy,580,c);cy+=k.height+16;});
FULLFORM(S,700,96,660,false);S.resize(1440,BOT(S)+96);y+=S.height;
S=F(D,'S2 Payment methods',0,y,1440,600,C.cream);let b=HEAD(S,80,96,'Ways to pay',[['Pay the '],['easy way.',1]],'Payment methods listed on Mike’s Yelp page (read 17 Nov 2026).',{w:760,z:50});
PAYS.forEach((p,i)=>PAY(S,80+i*326,b+48,302,112,p[0],p[1],p[2]));S.resize(1440,BOT(S)+96);y+=S.height;
S=F(D,'S3 Map + area',0,y,1440,800,C.paper);MAPCARD(S,80,96,760,500);b=HEAD(S,900,96,'Where Mike works',[['Based in '],['Riverside.',1]],'Mike works across the Inland Empire, Orange County and LA.',{w:460,z:46});
b=CHIPS(S,900,b+28,460,['Riverside','Corona','Moreno Valley','Menifee','Murrieta','Fontana','Irvine','Buena Park','Los Angeles','West Hollywood'],{h:42,z:15});
const ad=F(S,'Address block (EMPTY until Mike confirms)',900,b+28,460,96,null);ad.strokes=[solid(C.tanD)];ad.dashPattern=[8,6];T(ad,'Street address',24,20,{f:'Playfair Display',s:'Bold',z:19});T(ad,'Mike to confirm if he wants an address shown.',24,52,{z:15,c:C.muteD,w:410});
S.resize(1440,BOT(S)+96);y+=S.height;
S=F(D,'S4 Mini FAQ',0,y,1440,800,C.ink);b=HEAD(S,80,96,'Before you call',[['Quick '],['answers.',1]],'Anything not confirmed yet is marked.',{dark:true,w:420,z:46});
FAQ(S,560,96,800,QS,{dark:true});S.resize(1440,BOT(S)+96);y+=S.height;
y+=FOOTER(D,y).height;D.resize(1440,y);
NOTE(sec,1600,200+800,'MIKE TO CONFIRM: hours (Yelp says open 24 hours; Nextdoor says 7 AM-11 PM). Does he take texts on (951) 809-9533?');
NOTE(sec,1600,200+1700,'MIKE TO CONFIRM: form fields OK? Where should form messages go (email above?).');
NOTE(sec,1600,200+2300,'MIKE TO CONFIRM: card payments? Yelp lists cash, Zelle, Cash App only.');
NOTE(sec,1600,200+2700,'MIKE TO CONFIRM: show a street address or stay a service-area business? CSLB licence # (FAQ + footer).');
// ===== MOBILE =====
const M=F(sec,'Contact - Mobile 390',2000,200,390,9000,C.paper);
MHEADER(M,0);let my=72+MPAGEHERO(M,72,{photo:'van',crumb:'Home / Contact',eye:'Contact Mike',z:36,btn2:'Send a message',h1:[['Call Mike:\n',{c:C.cream}],['(951) 809-9533',{f:'Playfair Display',s:'Black Italic',c:C.tan}]],intro:'You talk to the owner. Free estimates, 15% off your first job.'}).height;
let MS=F(M,'M1 Call panel + cards',0,my,390,1400,C.paper);const mcp=CALLPANEL(MS,20,40,350,true);let mcy=mcp.y+mcp.height+16;CARDS.forEach(c=>{const k=CCARD(MS,20,mcy,350,c);mcy+=k.height+12;});MS.resize(390,BOT(MS)+40);my+=MS.height;
MS=F(M,'M2 Full form',0,my,390,1400,C.paper);FULLFORM(MS,20,0,350,true);MS.resize(390,BOT(MS)+48);my+=MS.height;
MS=F(M,'M3 Payment methods',0,my,390,800,C.cream);b=HEAD(MS,20,48,'Ways to pay',[['Pay the '],['easy way.',1]],'Listed on Mike’s Yelp page (17 Nov 2026).',{w:350,z:32});
PAYS.forEach((p,i)=>PAY(MS,20,b+24+i*104,350,92,p[0],p[1],p[2]));MS.resize(390,BOT(MS)+48);my+=MS.height;
MS=F(M,'M4 Map',0,my,390,800,C.paper);b=HEAD(MS,20,48,'Where Mike works',[['Based in '],['Riverside.',1]],'IE, Orange County and LA.',{w:350,z:32});MAPCARD(MS,20,b+24,350,300);
const mad=F(MS,'Address block (EMPTY until Mike confirms)',20,b+340,350,96,null);mad.strokes=[solid(C.tanD)];mad.dashPattern=[8,6];T(mad,'Street address',20,18,{f:'Playfair Display',s:'Bold',z:18});T(mad,'Mike to confirm if he wants it shown.',20,50,{z:14,c:C.muteD,w:310});MS.resize(390,BOT(MS)+48);my+=MS.height;
MS=F(M,'M5 Mini FAQ',0,my,390,800,C.ink);b=HEAD(MS,20,48,'Before you call',[['Quick '],['answers.',1]],null,{dark:true,w:350,z:32});FAQ(MS,20,b+24,350,QS,{dark:true,qz:18});MS.resize(390,BOT(MS)+48);my+=MS.height;
my+=MFOOTER(M,my).height;my+=MSTICKY(M,my).height;M.resize(390,my);
NOTE(sec,2430,200+1200,'MIKE TO CONFIRM (mobile): hours, texts OK, cards, address shown?, CSLB #, form routing.');
sec.resizeWithoutConstraints(2830,Math.max(D.y+D.height,M.y+M.height)+200);
return {D:D.id,M:M.id,Dh:D.height,Mh:M.height};
