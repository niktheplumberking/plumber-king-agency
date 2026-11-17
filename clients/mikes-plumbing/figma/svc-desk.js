const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const sec=await figma.getNodeByIdAsync('481:441');
const D=F(sec,'Services hub - Desktop 1440',120,200,1440,9000,C.paper);
UTILBAR(D,0);HEADER(D,40,'Services');
const hero=PAGEHERO(D,144,{photo:'cleanout',crumb:'Home  /  Services',eye:'Everything Mike fixes',h1:[['Plumbing services across the ',{c:C.cream}],['IE, OC & LA.',{s:'Black Italic',c:C.tan}]],intro:'Drains, leaks, water heaters, sewer lines and commercial grease lines. Homes and businesses. Mike does the job himself, explains the why behind the fix, and leaves it clean.'});
let y=144+hero.height;
// Router
const Ro=F(D,'04 Router: home or business?',0,y,1440,600,C.paper);
let b=HEAD(Ro,80,96,'Start here',[['Home or '],['business?',1]],'Mike works on both. Pick yours and go straight to the right help.',{w:700});
const rc=[['yard','For your home','Clogged drains, leaks, water heaters, toilets, sinks, faucets, disposals, water filtration and pressure regulators.','Home services','home'],['bar','For your business','Restaurants, bars and commercial sites: grease interceptors, hydro jetting, camera inspections and emergency calls.','Commercial plumbing','building']];
rc.forEach((r,i)=>{const x=80+i*652;const c=F(Ro,'router card: '+r[1],x,b+48,628,260,C.white);c.strokes=[solid('#DDD5BC')];
 IMG(c,0,0,250,260,r[0],{n:'photo (real): '+r[0]});
 SVG(c,IC[r[4]](C.tanD),282,32,26);T(c,r[1],282,72,{f:'Playfair Display',s:'Black',z:30,c:C.ink});T(c,r[2],282,118,{z:16,c:C.muteD,w:318,lh:150});
 T(c,r[3]+'  →',282,214,{z:15,s:'SemiBold',c:C.ink});R(c,282,240,150,2,C.tan);});
Ro.resize(1440,b+48+260+100);y+=Ro.height;
// Services grid (dark)
const G=F(D,'05 All services grid',0,y,1440,1800,C.ink);
b=HEAD(G,80,110,'12 ways Mike can help',[['Every pipe, drain and '],['heater.',1]],'Real jobs, real photos from Mike’s Instagram and Yelp. Where we don’t have a photo of that job yet, you see the badge instead.',{dark:true,w:820});
const sv=[['Drain cleaning & hydro jetting','Snaking and high-pressure jetting for the toughest clogs.','roots'],['Sewer lines & camera inspection','Camera inspection, root removal, line repairs.','yasphalt'],['Leak detection & repair','Finding hidden leaks, slab leaks, pipe repairs.','stucco'],['Water heaters','Water heater installs and repairs.',null,'flame'],
['Grease interceptors','Pumping and service for restaurant grease lines.','interceptor'],['Toilets, sinks & faucets','Repairs, replacements and new installs.','ytoilet'],['Garbage disposals','Disposal repairs and new installs.',null,'wrench'],['Water filtration','Water filtration installs.',null,'filter'],
['Pressure regulators & valves','Regulators, shut-off valves, hose bibs.','hosebib'],['Water mains & emergencies','Main line leaks and urgent repairs.','backflow'],['Rough-in, ADU & repipes','New water lines and rough-in plumbing.','roughin'],['Pressure washing','Floors, driveways and surfaces.',null,'drop']];
const cw=302,ch=430;sv.forEach((s,i)=>{const x=80+(i%4)*(cw+24),yy=b+56+Math.floor(i/4)*(ch+24);const c=F(G,'service card: '+s[0],x,yy,cw,ch,C.char);c.strokes=[solid(C.line)];
 if(s[2]){const p=IMG(c,0,0,cw,220,s[2],{n:'photo (real): '+s[2]});}else{const pf=F(c,'no photo yet: badge card',0,0,cw,220,C.char2);HX(pf,cw/2-70,50,140,90,{stroke:C.tan,sw:1.5,cut:26});SVG(pf,IC[s[3]](C.tan),cw/2-18,77,36);T(pf,'Photo: Mike to send',0,170,{z:12,s:'SemiBold',c:C.mute,w:cw,a:'CENTER',ls:10,u:true});}
 T(c,String(i+1).padStart(2,'0'),24,244,{f:'Playfair Display',s:'Bold Italic',z:18,c:C.tan});T(c,s[0],24,272,{f:'Playfair Display',s:'Black',z:23,c:C.cream,w:cw-48,lh:115});
 T(c,s[1],24,338,{z:15,c:C.mute,w:cw-48,lh:150});T(c,'See service  →',24,388,{z:14,s:'SemiBold',c:C.tan});});
G.resize(1440,b+56+3*ch+2*24+120);y+=G.height;
// Process (cream)
const P=F(D,'06 Process',0,y,1440,640,C.cream);
b=HEAD(P,80,100,'How it works',[['From your call to a '],['clean finish.',1]],null,{w:900});
const steps=[['Call or text Mike','(951) 809-9533. You talk to the owner.'],['Mike takes a look','He diagnoses on site and explains the why.'],['Free estimate','You hear the price before any work starts.'],['The fix, done right','Proper parts, no shortcuts, no surprises.'],['Clean-up & check','He tests it and leaves the place spotless.']];
const ly=b+110;R(P,140,ly,1160,2,C.ink,1,'process line (passes through numbers)');
steps.forEach((s,i)=>{const cx=140+i*290;HX(P,cx-46,ly-30,92,60,{fill:C.ink,cut:18,n:'step hex'});T(P,String(i+1),cx-46,ly-21,{f:'Playfair Display',s:'Black',z:30,c:C.cream,w:92,a:'CENTER'});
 T(P,s[0],cx-120,ly+56,{f:'Playfair Display',s:'Black',z:22,c:C.ink,w:240,a:'CENTER'});T(P,s[1],cx-120,ly+92,{z:15,c:C.muteD,w:240,a:'CENTER',lh:150});});
T(P,'“He was upfront and honest with me on pricing.”  Sal C., Corona · Yelp',80,ly+190,{z:16,s:'Medium',c:C.tanD,w:1280,a:'CENTER'});
P.resize(1440,ly+270);y+=P.height;
// Quote band (dark)
const Q=F(D,'07 Quote band',0,y,1440,520,C.char);T(Q,'“',80,40,{f:'Playfair Display',s:'Black',z:260,c:C.tan,o:0.25});
TR(Q,[['Mike did a couple of jobs in my house! He’s my ',{c:C.cream}],['first phone call',{s:'Black Italic',c:C.tan}],[' when I need a plumber.',{c:C.cream}]],200,140,{f:'Playfair Display',s:'Black',z:52,lh:115,w:1040,a:'CENTER'});
T(Q,'Brandon A. · Los Angeles · Aug 20, 2026 · 5 stars on Yelp',200,360,{z:16,s:'Medium',c:C.mute,w:1040,a:'CENTER'});RULE(Q,400,420,640,C.line);y+=520;
// FAQ (paper)
const Fq=F(D,'08 FAQ',0,y,1440,900,C.paper);
HEAD(Fq,80,100,'Straight answers',[['Questions people ask '],['first.',1]],'Only what Mike has said publicly. Anything not confirmed yet is marked.',{w:460,iw:420});
const qa=[['Do you give free estimates?','Yes. Estimates are free (Mike’s flyer, Instagram and Nextdoor page all say so). Call (951) 809-9533 or send the form and Mike calls you back.'],['Is there a discount for new customers?','Yes: 15% off for new customers (Mike’s Instagram flyer and Nextdoor). Exact terms: Mike to confirm.'],['Do you work on businesses and restaurants?','Yes. Residential and commercial: grease interceptors, hydro jetting, camera inspections and emergency calls for restaurants and bars.'],['Do you handle emergencies?','Yes, Mike offers emergency service. Exact hours: Mike to confirm.'],['Are you licensed and insured?','Insured (Mike’s Instagram bio). CSLB licence number: Mike to confirm before launch.'],['How can I pay?','Cash, Zelle and Cash App (Mike’s Yelp page). Cards: Mike to confirm.']];
let qy=100;qa.forEach((q,i)=>{const open=i===0;const c=F(Fq,'faq: '+q[0],600,qy,760,open?170:76,open?C.white:C.paper);c.strokes=[solid('#DDD5BC')];
 T(c,q[0],28,24,{f:'Playfair Display',s:'Black',z:21,c:C.ink,w:640});HX(c,700,22,36,30,{stroke:C.ink,sw:1.4,cut:8});T(c,open?'–':'+',700,23,{z:20,s:'SemiBold',w:36,a:'CENTER'});
 if(open){const t=T(c,q[1],28,70,{z:16,c:C.muteD,w:660,lh:155});c.resize(760,t.y+t.height+28);}qy+=c.height+12;});
Fq.resize(1440,Math.max(qy,420)+100);y+=Fq.height;
const CB=CONTACTBAND(D,y,{photo:'van'});y+=CB.height;const FT=FOOTER(D,y);y+=FT.height;D.resize(1440,y);
// sticky notes beside
NOTE(sec,1600,600,'MIKE TO CONFIRM: photos for water heaters, garbage disposals, water filtration, pressure washing (badge cards stand in until he sends real job photos).');
NOTE(sec,1600,y*0.55,'MIKE TO CONFIRM (FAQ): 15% new-customer terms, emergency hours (Yelp 24h vs Nextdoor 7am-11pm), CSLB licence number, card payments.');
await D.screenshot({scale:0.3});
return {D:D.id,h:y};
