const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const sec=await figma.getNodeByIdAsync('481:441');
for(const n of sec.children)if(n.name==='Services hub - Mobile 390')n.remove();
const M=F(sec,'Services hub - Mobile 390',2000,200,390,9000,C.paper);
MHEADER(M,0);
const mh=MPAGEHERO(M,72,{photo:'cleanout',crumb:'Home  /  Services',eye:'Everything Mike fixes',h1:[['Plumbing services across the ',{c:C.cream}],['IE, OC & LA.',{s:'Black Italic',c:C.tan}]],intro:'Drains, leaks, water heaters, sewer lines and commercial grease lines. Mike does the job himself and explains the why behind the fix.'});
let y=72+mh.height;
// router
const Ro=F(M,'Router: home or business?',0,y,390,900,C.paper);
let b=HEAD(Ro,20,48,'Start here',[['Home or '],['business?',1]],'Mike works on both. Pick yours.',{w:350,z:36});
let ry=b+28;
[['yard','For your home','Drains, leaks, water heaters, toilets, sinks, faucets, disposals, filtration, regulators.','Home services','home'],['bar','For your business','Restaurants, bars, commercial sites: grease interceptors, hydro jetting, camera inspections.','Commercial plumbing','building']].forEach(r=>{
 const c=F(Ro,'router card: '+r[1],20,ry,350,400,C.white);c.strokes=[solid('#DDD5BC')];IMG(c,0,0,350,170,r[0],{n:'photo (real): '+r[0]});
 SVG(c,IC[r[4]](C.tanD),20,190,24);T(c,r[1],20,224,{f:'Playfair Display',s:'Black',z:26,c:C.ink});const t=T(c,r[2],20,266,{z:15,c:C.muteD,w:310,lh:150});
 T(c,r[3]+'  →',20,t.y+t.height+16,{z:15,s:'SemiBold',c:C.ink});c.resize(350,t.y+t.height+60);ry+=c.height+16;});
Ro.resize(390,ry+32);y+=Ro.height;
// services list (dark)
const G=F(M,'All services list',0,y,390,2400,C.ink);
b=HEAD(G,20,56,'12 ways Mike can help',[['Every pipe, drain and '],['heater.',1]],'Real photos from Mike’s Instagram and Yelp. No photo yet = badge.',{dark:true,w:350,z:34});
const sv=[['Drain cleaning & hydro jetting','Snaking and jetting for tough clogs.','roots'],['Sewer lines & camera inspection','Camera inspection, root removal, repairs.','yasphalt'],['Leak detection & repair','Hidden leaks, slab leaks, pipe repairs.','stucco'],['Water heaters','Installs and repairs.',null,'flame'],
['Grease interceptors','Restaurant grease line service.','interceptor'],['Toilets, sinks & faucets','Repairs, replacements, installs.','ytoilet'],['Garbage disposals','Repairs and new installs.',null,'wrench'],['Water filtration','Filtration installs.',null,'filter'],
['Pressure regulators & valves','Regulators, shut-offs, hose bibs.','hosebib'],['Water mains & emergencies','Main line leaks, urgent repairs.','backflow'],['Rough-in, ADU & repipes','New water lines, rough-in.','roughin'],['Pressure washing','Floors, driveways, surfaces.',null,'drop']];
let gy=b+32;sv.forEach((s,i)=>{const c=F(G,'service row: '+s[0],20,gy,350,128,C.char);c.strokes=[solid(C.line)];
 if(s[2])IMG(c,0,0,112,128,s[2],{n:'photo (real): '+s[2]});else{const pf=F(c,'no photo yet: badge',0,0,112,128,C.char2);HX(pf,26,34,60,40,{stroke:C.tan,sw:1.3,cut:12});SVG(pf,IC[s[3]](C.tan),44,42,24);T(pf,'Photo: Mike to send',6,90,{z:9,s:'SemiBold',c:C.mute,w:100,a:'CENTER',u:true});}
 T(c,String(i+1).padStart(2,'0'),128,14,{f:'Playfair Display',s:'Bold Italic',z:14,c:C.tan});const t=T(c,s[0],128,34,{f:'Playfair Display',s:'Black',z:17,c:C.cream,w:206,lh:115});
 T(c,s[1],128,t.y+t.height+6,{z:13,c:C.mute,w:206,lh:140});gy+=140;});
G.resize(390,gy+44);y+=G.height;
// process vertical timeline (cream)
const P=F(M,'Process (timeline)',0,y,390,900,C.cream);
b=HEAD(P,20,56,'How it works',[['From your call to a '],['clean finish.',1]],null,{w:350,z:34});
const steps=[['Call or text Mike','(951) 809-9533. You talk to the owner.'],['Mike takes a look','He diagnoses on site and explains the why.'],['Free estimate','You hear the price before any work starts.'],['The fix, done right','Proper parts, no shortcuts, no surprises.'],['Clean-up & check','He tests it and leaves the place spotless.']];
let py=b+36;R(P,51,py+20,2,4*104,C.ink,1,'timeline line');
steps.forEach((s,i)=>{HX(P,20,py,64,42,{fill:C.ink,cut:13,n:'step hex'});T(P,String(i+1),20,py+5,{f:'Playfair Display',s:'Black',z:22,c:C.cream,w:64,a:'CENTER'});
 T(P,s[0],104,py,{f:'Playfair Display',s:'Black',z:20,c:C.ink,w:266});T(P,s[1],104,py+32,{z:14,c:C.muteD,w:266,lh:145});py+=104;});
const sq=T(P,'“He was upfront and honest with me on pricing.”  Sal C., Corona · Yelp',20,py+8,{z:15,s:'Medium',c:C.tanD,w:350,lh:145});
P.resize(390,sq.y+sq.height+56);y+=P.height;
// quote band
const Q=F(M,'Quote band',0,y,390,500,C.char);T(Q,'“',16,0,{f:'Playfair Display',s:'Black',z:160,c:C.tan,o:0.25});
const qt=TR(Q,[['Mike did a couple of jobs in my house! He’s my ',{c:C.cream}],['first phone call',{s:'Black Italic',c:C.tan}],[' when I need a plumber.',{c:C.cream}]],20,96,{f:'Playfair Display',s:'Black',z:30,lh:118,w:350});
const qn=T(Q,'Brandon A. · Los Angeles · Aug 20, 2026 · 5 stars on Yelp',20,qt.y+qt.height+20,{z:14,s:'Medium',c:C.mute,w:350});RULE(Q,20,qn.y+qn.height+28,350,C.line);Q.resize(390,qn.y+qn.height+92);y+=Q.height;
// FAQ
const Fq=F(M,'FAQ',0,y,390,1200,C.paper);
b=HEAD(Fq,20,56,'Straight answers',[['Questions people ask '],['first.',1]],'Only what Mike has said publicly. Unconfirmed items are marked.',{w:350,z:34});
const qa=[['Do you give free estimates?','Yes. Estimates are free (Mike’s flyer, Instagram and Nextdoor page all say so). Call (951) 809-9533 or send the form and Mike calls you back.'],['Is there a discount for new customers?'],['Do you work on businesses and restaurants?'],['Do you handle emergencies?'],['Are you licensed and insured?'],['How can I pay?']];
let qy=b+28;qa.forEach((q,i)=>{const open=i===0;const c=F(Fq,'faq: '+q[0],20,qy,350,76,open?C.white:C.paper);c.strokes=[solid('#DDD5BC')];
 const qt2=T(c,q[0],20,20,{f:'Playfair Display',s:'Black',z:18,c:C.ink,w:258});HX(c,296,18,36,30,{stroke:C.ink,sw:1.4,cut:8});T(c,open?'–':'+',296,19,{z:20,s:'SemiBold',w:36,a:'CENTER'});
 let hh=Math.max(76,qt2.y+qt2.height+20);if(open){const t=T(c,q[1],20,qt2.y+qt2.height+12,{z:15,c:C.muteD,w:310,lh:150});hh=t.y+t.height+22;}c.resize(350,hh);qy+=hh+10;});
Fq.resize(390,qy+46);y+=Fq.height;
const MC=MCONTACT(M,y);y+=MC.height;const MF=MFOOTER(M,y);y+=MF.height;MSTICKY(M,y);y+=76;M.resize(390,y);
NOTE(sec,2430,700,'MIKE TO CONFIRM (mobile): same items as desktop. Photos for water heaters, garbage disposals, water filtration, pressure washing; 15% terms; emergency hours; CSLB licence #; card payments.',300);
// resize section
const D=sec.children.find(n=>n.name==='Services hub - Desktop 1440');
let mb=0;for(const n of sec.children)mb=Math.max(mb,n.y+n.height);sec.resizeWithoutConstraints(2830,mb+200);
return {M:M.id,h:y,D:D&&D.id,sec:[sec.width,sec.height]};
