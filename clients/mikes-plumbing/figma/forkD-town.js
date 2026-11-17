const sec=await figma.getNodeByIdAsync('481:445');
const D=F(sec,'Town: Riverside - Desktop 1440',120,200,1440,8000,C.paper);
UTILBAR(D,0);HEADER(D,40,'Areas');
let y=144+PAGEHERO(D,144,{photo:'backflow',crumb:'Home  /  Service areas  /  Riverside, CA',eye:'Riverside · Inland Empire',h1:[['Plumber in\n',{c:C.cream}],['Riverside',{f:'Playfair Display',s:'Black Italic',c:C.tan}],[', CA',{c:C.cream}]],intro:'Riverside is home base. Mike handles drains, leaks, water heaters, sewer lines and commercial jobs across the city, with free estimates and 15% off for new customers.'}).height;
// S1 quick answer + services
let S=F(D,'S1 Quick answer + services in Riverside',0,y,1440,700,C.paper);
QA(S,80,96,560,'Need a plumber in Riverside, CA?','Mike’s Plumbing Services is a family-owned plumber serving Riverside and the Inland Empire. Mike handles drain cleaning and hydro jetting, leaks and slab leaks, water heaters, sewer lines and commercial jobs, with free estimates and 15% off for new customers. Call (951) 809-9533.');
let b=HEAD(S,700,96,'Services in Riverside',[['What Mike fixes in '],['Riverside',1]],null,{w:660,z:42});
b=SVCLINKS(S,700,b+32,660,2,false);
const s1b=Math.max(BOT(S),b)+96;S.resize(1440,s1b);y+=s1b;
// S2 reviews (dark)
S=F(D,'S2 Reviews from Riverside & the IE',0,y,1440,900,C.ink);
b=HEAD(S,80,96,'Neighbors on Yelp',[['Riverside says '],['call Mike.',1]],'Real Yelp reviews, word for word. Mike’s Plumbing Services: 5.0 stars from 20 reviews (read 17 Nov 2026).',{dark:true,w:820});
const big=F(S,'featured review: Isaiah C., Riverside (Yelp, word for word)',80,b+48,600,420,C.char2);big.strokes=[solid(C.line)];
T(big,'“',36,8,{f:'Playfair Display',s:'Black',z:140,c:C.tan,o:0.5});T(big,'Owner Mike came himself and took care of issues I had with my toilet and sink. Was on time and took care of everything pretty quick. Left everything clean and working perfectly. Thank you Mike!',40,120,{f:'Playfair Display',s:'Italic',z:26,c:C.cream,w:520,lh:140});
STARS(big,40,330,20,C.tan);T(big,'Isaiah C. · Riverside, CA · Jun 12, 2025 · Yelp',40,366,{z:15,s:'Medium',c:C.mute});
const r1=REVIEW(S,720,b+48,640,'Mike was able helped me out with a slab leak on short notice, rerouted water lines and new showers valves installed. He was upfront and honest with me on pricing and reliable when setting up the appointments.…','Sal C.','Corona, CA','Jul 25, 2026',{dark:true});
REVIEW(S,720,r1.y+r1.height+20,640,'Amazing! wonderful! Responded same day I called. The job was much more complicated than expected...Michael somehow made everything work and wasn’t gonna leave until fixed.…','Debbie H.','Menifee, CA','Jul 14, 2025',{dark:true});
big.resize(600,Math.max(420,BOT(S)-big.y));
S.resize(1440,BOT(S)+96);y+=S.height;
// S3 map + neighborhoods + nearby
S=F(D,'S3 Map, neighborhoods, nearby towns',0,y,1440,800,C.cream);
b=HEAD(S,80,96,'Where Mike works',[['Riverside and '],['next door',1]],'Riverside is Mike’s base. He also works across the Inland Empire, Orange County and LA.',{w:560,z:46});
MAPCARD(S,700,96,660,480);
const nb=F(S,'Neighborhoods / ZIPs block (EMPTY until Mike confirms)',80,b+40,560,170,null);nb.strokes=[solid(C.tanD)];nb.dashPattern=[8,6];nb.strokeWeight=1.5;
T(nb,'Riverside neighborhoods & ZIP codes',28,26,{f:'Playfair Display',s:'Bold',z:22,c:C.ink});T(nb,'Mike to confirm which Riverside neighborhoods and ZIP codes he covers. Nothing is filled in until he does.',28,66,{z:16,c:C.muteD,w:500,lh:150});
T(S,'Nearby towns',80,b+250,{z:13,s:'SemiBold',c:C.tanD,u:true,ls:16});
CHIPS(S,80,b+282,580,['Corona','Moreno Valley','Menifee','Murrieta','Fontana'],{icon:true});
S.resize(1440,BOT(S)+96);y+=S.height;
// S4 FAQ
S=F(D,'S4 FAQ: plumber in Riverside',0,y,1440,800,C.paper);
b=HEAD(S,80,96,'Riverside FAQ',[['Questions before you '],['call',1]],'Straight answers from Mike’s own listings. Anything not confirmed yet is marked.',{w:420,z:46});
const lc=F(S,'call card',80,b+40,420,220,C.ink);lc.clipsContent=false;T(lc,'Still not sure?',32,32,{f:'Yellowtail',z:32,c:C.tan});T(lc,'Ask Mike directly.',32,78,{f:'Playfair Display',s:'Black',z:28,c:C.cream});BTN(lc,32,132,'Call (951) 809-9533',{k:'cream',icon:'phone',h:58,z:16,w:356});
FAQ(S,560,96,800,[['Do you give free estimates in Riverside?','Yes. Estimates are free, and new customers get 15% off their first job.'],['Do you work on commercial properties?','Yes. Mike works for restaurants and businesses too: grease interceptors, hydro jetting, leaks and emergencies.'],['Can you come out for an emergency?','Mike offers emergency service. Call (951) 809-9533. Exact hours: Mike to confirm.'],['Are you insured?','Yes, insured. CSLB licence number: Mike to confirm.'],['How can I pay?','Cash, Zelle and Cash App (as listed on Yelp). Cards: Mike to confirm.']]);
S.resize(1440,BOT(S)+96);y+=S.height;
y+=CONTACTBAND(D,y,{photo:'van'}).height;y+=FOOTER(D,y).height;D.resize(1440,y);
// notes beside desktop
NOTE(sec,1600,200+1000,'MIKE TO CONFIRM: Riverside neighborhoods + ZIP codes he covers (block left empty on purpose).');
NOTE(sec,1600,200+2300,'MIKE TO CONFIRM: hours. Yelp says open 24 hours; Nextdoor says 7 AM-11 PM. Site says "emergency service" only.');
NOTE(sec,1600,200+3300,'MIKE TO CONFIRM: CSLB licence number (none found 17 Nov). Card payments accepted?');
// ===== MOBILE =====
const M=F(sec,'Town: Riverside - Mobile 390',2000,200,390,8000,C.paper);
MHEADER(M,0);let my=72+MPAGEHERO(M,72,{photo:'backflow',crumb:'Areas / Riverside, CA',eye:'Riverside · IE',h1:[['Plumber in\n',{c:C.cream}],['Riverside',{f:'Playfair Display',s:'Black Italic',c:C.tan}],[', CA',{c:C.cream}]],intro:'Home base. Drains, leaks, water heaters, sewer lines and commercial jobs, with free estimates and 15% off for new customers.'}).height;
let MS=F(M,'M1 Quick answer + services',0,my,390,900,C.paper);QA(MS,20,40,350,'Need a plumber in Riverside, CA?','Mike’s Plumbing Services is a family-owned plumber serving Riverside and the Inland Empire: drains and hydro jetting, leaks and slab leaks, water heaters, sewer lines and commercial jobs. Free estimates, 15% off for new customers. Call (951) 809-9533.',{tz:24,bz:16});
b=HEAD(MS,20,BOT(MS)+48,'Services here',[['What Mike fixes in '],['Riverside',1]],null,{w:350,z:32});SVCLINKS(MS,20,b+24,350,1,false);MS.resize(390,BOT(MS)+48);my+=MS.height;
MS=F(M,'M2 Reviews',0,my,390,900,C.ink);b=HEAD(MS,20,48,'Neighbors on Yelp',[['Riverside says '],['call Mike.',1]],'5.0 stars from 20 Yelp reviews (17 Nov 2026).',{dark:true,w:350,z:32});
const mr=REVIEW(MS,20,b+28,350,'Owner Mike came himself and took care of issues I had with my toilet and sink. Was on time and took care of everything pretty quick. Left everything clean and working perfectly. Thank you Mike!','Isaiah C.','Riverside, CA','Jun 12, 2025',{dark:true});
REVIEW(MS,20,mr.y+mr.height+16,350,'Mike was able helped me out with a slab leak on short notice, rerouted water lines and new showers valves installed.…','Sal C.','Corona, CA','Jul 25, 2026',{dark:true});MS.resize(390,BOT(MS)+48);my+=MS.height;
MS=F(M,'M3 Map + nearby',0,my,390,900,C.cream);b=HEAD(MS,20,48,'Where Mike works',[['Riverside and '],['next door',1]],null,{w:350,z:32});MAPCARD(MS,20,b+24,350,240);
const mnb=F(MS,'Neighborhoods block (EMPTY until Mike confirms)',20,b+288,350,140,null);mnb.strokes=[solid(C.tanD)];mnb.dashPattern=[8,6];T(mnb,'Riverside neighborhoods & ZIPs',20,20,{f:'Playfair Display',s:'Bold',z:19});T(mnb,'Mike to confirm. Left empty on purpose.',20,58,{z:15,c:C.muteD,w:310});
T(MS,'Nearby towns',20,b+452,{z:13,s:'SemiBold',c:C.tanD,u:true,ls:16});CHIPS(MS,20,b+482,350,['Corona','Moreno Valley','Menifee','Murrieta','Fontana'],{h:42,z:15});MS.resize(390,BOT(MS)+48);my+=MS.height;
MS=F(M,'M4 FAQ',0,my,390,900,C.paper);b=HEAD(MS,20,48,'Riverside FAQ',[['Questions before you '],['call',1]],null,{w:350,z:32});
FAQ(MS,20,b+24,350,[['Free estimates in Riverside?','Yes. Free, and new customers get 15% off their first job.'],['Commercial properties?','Yes, restaurants and businesses too.'],['Emergencies?','Emergency service available. Hours: Mike to confirm.'],['Insured?','Yes. CSLB licence #: Mike to confirm.'],['How can I pay?','Cash, Zelle, Cash App (Yelp). Cards: Mike to confirm.']],{qz:18});MS.resize(390,BOT(MS)+48);my+=MS.height;
my+=MCONTACT(M,my).height;my+=MFOOTER(M,my).height;my+=MSTICKY(M,my).height;M.resize(390,my);
NOTE(sec,2430,200+1500,'MIKE TO CONFIRM (mobile): same items as desktop: neighborhoods/ZIPs, hours, CSLB #, cards.');
sec.resizeWithoutConstraints(2830,Math.max(D.y+D.height,M.y+M.height)+200);
await D.screenshot({scale:0.3});await M.screenshot({scale:0.5});
return {D:D.id,M:M.id,Dh:D.height,Mh:M.height};
