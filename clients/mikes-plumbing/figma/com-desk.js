const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const sec=await figma.getNodeByIdAsync('481:443');
const D=F(sec,'Commercial - Desktop 1440',120,200,1440,9000,C.paper);
UTILBAR(D,0);HEADER(D,40,'Commercial');
const He=PAGEHERO(D,144,{photo:'bar',photo2:'ygrease',crumb:'Home  /  Commercial & restaurants',eye:'Restaurants · bars · businesses',z:62,
 h1:[['Commercial plumbing for\n',{c:C.cream}],['restaurants',{f:'Playfair Display',s:'Black Italic',c:C.tan}],[' & businesses.',{c:C.cream}]],
 intro:'Mike grew up in his family’s grease-industry business, so grease interceptors, clogged kitchen lines and restaurant emergencies are home ground. Hydro jetting, camera inspection, leak repair and emergency service for commercial properties.',btn2:'Book a site visit'});
let y=144+He.height;
// A: services for businesses
const A=F(D,'04 Services for businesses',0,y,1440,900,C.paper);
let b=HEAD(A,80,110,'What Mike does for businesses',[['Kitchens, bars and '],['back-of-house',1],[' plumbing.']],'Everything below comes straight from Mike’s own flyer, service list and job posts.',{w:640,z:50});
IMGHX(A,820,110,540,b-110+20>420?b-110+20:420,'interceptor',{cutCorners:40,n:'photo: grease interceptor (IG, real)'});
const sv=[['flame','Grease interceptors','Pumping and cleaning interceptors, done completely, with the mess handled.'],['drop','Hydro jetting','High-pressure jetting for kitchen lines and mains packed with grease.'],['camera','Rooter & camera inspection','See inside the line before anything gets cut or replaced.'],['wrench','Bar & kitchen sinks','Sinks, faucets and fixtures behind the bar and on the line.'],['pin','Leak detection & mainline repair','Leaks found and mainlines repaired, then the site cleaned up.'],['building','Pressure washing','Floors, driveways and work areas washed back to clean.']];
let gy=Math.max(b,110+420)+70;
sv.forEach((s,i)=>{const x=80+(i%3)*434,yy=gy+Math.floor(i/3)*200;const g=F(A,'service card: '+s[1],x,yy,414,180,C.white);g.strokes=[solid('#DDD5BC')];g.strokeWeight=1;
 HX(g,24,26,64,40,{fill:C.ink,cut:12});SVG(g,IC[s[0]](C.tan),44,34,24);T(g,s[1],106,30,{f:'Playfair Display',s:'Bold',z:22,c:C.ink,w:284});T(g,s[2],24,90,{z:15,c:C.muteD,w:366,lh:150});R(g,0,176,414,4,C.tan,1,'base rule');});
A.resize(1440,gy+400+110);y+=A.height;
// B: grease is in the family (dark)
const B=F(D,'05 Why restaurants call Mike',0,y,1440,860,C.ink);
T(B,'GREASE',700,560,{f:'Playfair Display',s:'Black',z:260,c:C.cream,o:0.04,n:'watermark'});
IMGHX(B,80,110,520,640,'mike',{cutCorners:50,n:'photo: Mike with drain camera at a restaurant (IG, real)'});
const pt=F(B,'patch',330,690,300,70,null);pt.clipsContent=false;HX(pt,0,0,300,70,{fill:C.cream,cut:20});T(pt,'MIKE · ON A RESTAURANT JOB',0,25,{z:13,s:'SemiBold',c:C.ink,w:300,a:'CENTER',ls:10});
b=HEAD(B,680,110,'Why restaurants call Mike',[['Grease is '],['in the family.',1]],'Before he branched out on his own, Mike spent years in his family’s grease-industry business learning the tough, behind-the-scenes work. Now he brings that to every commercial plumbing call.',{dark:true,w:680,z:52});
const pts=[['01','Knows grease systems','Years in the family grease business before he started Mike’s Plumbing Services.'],['02','Explains the why','Mike shows you what went wrong and why the fix works. No shortcuts, no surprises.'],['03','Leaves it clean','Review after review says the same thing: the site is cleaner than he found it.']];
pts.forEach((p,i)=>{const yy=b+40+i*112;HX(B,680,yy,76,48,{stroke:C.tan,sw:1.5,cut:14});T(B,p[0],680,yy+10,{f:'Playfair Display',s:'Black',z:22,c:C.tan,w:76,a:'CENTER'});
 T(B,p[1],780,yy,{f:'Playfair Display',s:'Bold',z:24,c:C.cream});T(B,p[2],780,yy+36,{z:16,c:C.mute,w:560,lh:150});if(i<2)R(B,780,yy+96,580,1,C.line);});
B.resize(1440,Math.max(b+40+3*112,860)+60);y+=B.height;
// C: real commercial jobs strip
const Cc=F(D,'06 Real commercial jobs',0,y,1440,760,C.cream);
b=HEAD(Cc,80,100,'Real jobs, real photos',[['From the '],['job site',1],[', not a stock library.']],null,{w:900,z:46});
const ph=[['ygrease','Grease tank opened for service','Yelp photo'],['yyard','Commercial site, before work','Yelp photo'],['yyard2','Commercial site, washed down','Yelp photo'],['roughin','Rough-in plumbing job','Instagram']];
ph.forEach((p,i)=>{const x=80+i*326;IMGHX(Cc,x,b+44,306,400,p[0],{cutCorners:28,n:'photo: '+p[1]+' ('+p[2]+', real)'});T(Cc,p[1],x,b+460,{z:16,s:'SemiBold',c:C.ink,w:306});T(Cc,p[2],x,b+486,{z:13,c:C.tanD,u:true,ls:12});});
Cc.resize(1440,b+560);y+=Cc.height;
// D: reviews
const Rv=F(D,'07 What property owners say',0,y,1440,700,C.paper);
b=HEAD(Rv,80,100,'From Mike’s Yelp reviews',[['He works '],['with the site,',1],[' not around it.']],null,{w:620,z:46});
RULE(Rv,80,b+30,560,'#CFC7AE');
T(Rv,'5.0',80,b+80,{f:'Playfair Display',s:'Black',z:72,c:C.ink});STARS(Rv,210,b+108,22,'#C99A2E');T(Rv,'20 reviews on Yelp · read 17 Nov 2026',80,b+180,{z:15,c:C.muteD});
const r1=REVIEW(Rv,700,100,660,'Highly recommend Mike for all your plumbing needs. We replaced 3 toilets and a pressure regulator. As requested, he coordinated his work with other repairs being done on the property. He’s reasonably priced, detailed & patient. Call him!','Eleanor M.','Los Angeles, CA','Jul 10, 2026',{z:18});
const r2=REVIEW(Rv,700,r1.y+r1.height+24,660,'Mike was able helped me out with a slab leak on short notice, rerouted water lines and new showers valves installed. He was upfront and honest with me on pricing and reliable when setting up the appointments.…','Sal C.','Corona, CA','Jul 25, 2026');
Rv.resize(1440,Math.max(r2.y+r2.height,b+220)+100);y+=Rv.height;
const CB=CONTACTBAND(D,y,{eye:'Commercial service',h:[['Kitchen line\n'],['backing up?',1],[' Call Mike.']],intro:'Grease interceptors, hydro jetting and emergency service for restaurants and businesses across the IE, OC & LA. Free estimates.'});y+=CB.height;
const Ft=FOOTER(D,y);y+=Ft.height;D.resize(1440,y);
NOTE(sec,1600,500,'Mike to confirm: which restaurants/businesses he can name as clients (none named on the page now), and whether he works after-hours for kitchens.',300);
NOTE(sec,1600,1700,'Mike to confirm: what each commercial photo shows (job + town). Captions are kept generic until he does.',300);
NOTE(sec,1600,3200,'Mike to confirm: hours. Yelp says open 24 hours, Nextdoor says 7 AM-11 PM.',300);
await D.screenshot({scale:0.3});
return {D:D.id,h:y};
