// ===== 07 SERVICE AREAS HUB =====
const sec=await figma.getNodeByIdAsync('481:446');
function TOWNCARD(S,x,y,w,town,region,q,who,o={}){const g=F(S,'town card: '+town,x,y,w,300,o.dark?C.char2:C.white);g.strokes=[solid(o.dark?C.line:'#D6CEB4')];g.strokeWeight=1;
 HX(g,24,24,46,32,{fill:o.home?C.tan:null,stroke:o.home?null:C.tanD,cut:9});SVG(g,IC.pin(o.home?C.ink:C.tanD),36,31,18);
 T(g,region,84,22,{z:12,s:'SemiBold',c:C.tanD,u:true,ls:14});T(g,town,84,40,{f:'Playfair Display',s:'Bold',z:o.tz||26,c:C.ink,w:w-110});
 if(o.home){HX(g,w-118,24,94,28,{fill:C.ink,cut:8});T(g,'HOME BASE',w-118,31,{z:11,s:'SemiBold',c:C.tan,w:94,a:'CENTER',ls:10});}
 RULE(g,24,96,w-48,'#E3DCC6');STARS(g,24,116,14,'#C99A2E');
 const t=T(g,'“'+q+'”',24,144,{f:'Playfair Display',s:'Italic',z:o.qz||17,c:C.ink,w:w-48,lh:150});
 const r=T(g,who,24,t.y+t.height+12,{z:13,c:C.muteD,w:w-48});
 const l=T(g,'Plumber in '+town+' →',24,r.y+r.height+18,{z:15,s:'SemiBold',c:C.tanD});g.resize(w,l.y+l.height+26);return g;}
const TOWNS=[
 ['Inland Empire',[
  ['Riverside','Owner Mike came himself and took care of issues I had with my toilet and sink. Was on time and took care of everything pretty quick.…','Isaiah C. · Riverside, CA · Jun 12, 2025 · Yelp',1],
  ['Corona','Mike was able helped me out with a slab leak on short notice, rerouted water lines and new showers valves installed.…','Sal C. · Corona, CA · Jul 25, 2026 · Yelp'],
  ['Moreno Valley','Water pressure regulate,shut off valve and automatic water shut off WIFI connected has a lot of respect and calls back to inquire how the work is going very professional and reasonable price','Tewolde T. · Moreno Valley, CA · Jun 5, 2026 · Yelp'],
  ['Menifee','Amazing! wonderful! Responded same day I called. The job was much more complicated than expected...Michael somehow made everything work and wasn’t gonna leave until fixed.…','Debbie H. · Menifee, CA · Jul 14, 2025 · Yelp'],
  ['Murrieta','Our garbage disposal began to malfunction soon after our move to Murrieta, so we called Mike. He arrived on time and installed it quickly.…','Jack D. · job in Murrieta · May 7, 2026 · Yelp'],
  ['Fontana','He fixed our water leaks and installed new water lines throughout our entire home, and everything was done with great attention to detail.…','Jackie H. · Fontana, CA · Apr 10, 2026 · Yelp']]],
 ['Orange County',[
  ['Irvine','awesome service. showed up on time. Completed the service requested and left the area super clean. Would definitely recommend. 5 stars.','Julian T. · Irvine, CA · Jun 12, 2025 · Yelp'],
  ['Buena Park','Great service responded fast and did the work same day Would recommend and will use again for any plumbing service that I may need','Erik N. · Buena Park, CA · Sep 4, 2025 · Yelp']]],
 ['Los Angeles',[
  ['Los Angeles','Mike did a couple of jobs in my house! He’s my first phone call when I need a plumber.','Brandon A. · Los Angeles, CA · Aug 20, 2026 · Yelp'],
  ['West Hollywood','Mike did a great job replacing and installing our new upstairs toilet. He is an excellent communicator.…','Bruce H. · West Hollywood, CA · Aug 24, 2026 · Yelp']]]];
const D=F(sec,'Service areas - Desktop 1440',120,200,1440,8000,C.paper);
UTILBAR(D,0);HEADER(D,40,'Areas');
let y=144+PAGEHERO(D,144,{photo:'yard',crumb:'Home  /  Service areas',eye:'Service areas',z:58,h1:[['Plumber for the\n',{c:C.cream}],['Inland Empire',{f:'Playfair Display',s:'Black Italic',c:C.tan}],[', Orange County & LA',{c:C.cream}]],intro:'Mike is based in Riverside and works across the Inland Empire, Orange County and LA. Find your town below, then call for a free estimate.'}).height;
// S1 big map
let S=F(D,'S1 Map: where Mike works',0,y,1440,1000,C.paper);
let b=HEAD(S,80,96,'Where Mike works',[['One plumber, '],['three regions.',1]],'Riverside is home base. Every town below has a real Yelp review from a customer there.',{w:700,z:50});
CHIPS(S,880,b-46,480,['Inland Empire','Orange County','Los Angeles'],{});
MAPCARD(S,80,b+48,1280,620);
const tr=F(S,'Travel distance block (EMPTY until Mike confirms)',80,b+700,1280,96,null);tr.strokes=[solid(C.tanD)];tr.dashPattern=[8,6];tr.strokeWeight=1.5;
SVG(tr,IC.clock(C.tanD),28,36,24);T(tr,'How far Mike travels',68,22,{f:'Playfair Display',s:'Bold',z:22,c:C.ink});T(tr,'Mike to confirm his travel radius and full town list. Nothing is filled in until he does.',68,56,{z:16,c:C.muteD,w:1160});
S.resize(1440,BOT(S)+96);y+=S.height;
// S2 town cards grouped
S=F(D,'S2 Town cards by region',0,y,1440,2000,C.cream);
b=HEAD(S,80,96,'Towns Mike serves',[['Find '],['your town',1]],'Real Yelp reviews, word for word, from customers in each town (read 17 Nov 2026).',{w:760,z:50});
let gy=b+56;const cw=(1280-48)/3;
TOWNS.forEach((grp,gi)=>{EYE(S,grp[0]+' · '+grp[1].length+' towns',80,gy,{c:C.tanD});RULE(S,80,gy+34,1280,'#D6CEB4');let ry=gy+60;
 for(let i=0;i<grp[1].length;i+=3){const row=grp[1].slice(i,i+3).map((t,j)=>TOWNCARD(S,80+j*(cw+24),ry,cw,t[0],grp[0],t[1],t[2],{home:t[3]}));const mh=Math.max(...row.map(c=>c.height));row.forEach(c=>c.resize(cw,mh));ry+=mh+24;}
 gy=ry+48;});
const dt=F(S,'Don’t see your town (call)',80,gy,1280,150,C.ink);dt.clipsContent=false;T(dt,'Don’t see your town?',40,36,{f:'Yellowtail',z:34,c:C.tan});T(dt,'Call Mike and ask. Full town list: Mike to confirm.',40,84,{f:'Playfair Display',s:'Black',z:26,c:C.cream,w:780});BTN(dt,920,44,'Call (951) 809-9533',{k:'cream',icon:'phone',h:62,z:17,w:320});
S.resize(1440,BOT(S)+96);y+=S.height;
y+=CONTACTBAND(D,y,{photo:'van',h:[['Need a plumber in\n'],['your town?',1],[' Call Mike.']]}).height;y+=FOOTER(D,y).height;D.resize(1440,y);
NOTE(sec,1600,200+900,'MIKE TO CONFIRM: full town list and how far he travels (radius or drive time). Only the 10 towns with a real Yelp review are shown for now.');
NOTE(sec,1600,200+2000,'MIKE TO CONFIRM: is Murrieta a regular area? Jack D. lives in Bonita CA; the job was in Murrieta.');
NOTE(sec,1600,200+3400,'MIKE TO CONFIRM: hours (Yelp 24 h vs Nextdoor 7 AM-11 PM) and CSLB # (contact band + footer).');
// ===== MOBILE =====
const M=F(sec,'Service areas - Mobile 390',2000,200,390,8000,C.paper);
MHEADER(M,0);let my=72+MPAGEHERO(M,72,{photo:'yard',crumb:'Home / Service areas',eye:'Service areas',z:36,h1:[['Plumber for the ',{c:C.cream}],['Inland Empire',{f:'Playfair Display',s:'Black Italic',c:C.tan}],[', Orange County & LA',{c:C.cream}]],intro:'Based in Riverside, working across the IE, Orange County and LA. Find your town below.'}).height;
let MS=F(M,'M1 Map',0,my,390,900,C.paper);b=HEAD(MS,20,48,'Where Mike works',[['One plumber, '],['three regions.',1]],null,{w:350,z:32});
MAPCARD(MS,20,b+24,350,340);const mtr=F(MS,'Travel block (EMPTY until Mike confirms)',20,b+388,350,120,null);mtr.strokes=[solid(C.tanD)];mtr.dashPattern=[8,6];
T(mtr,'How far Mike travels',20,20,{f:'Playfair Display',s:'Bold',z:19,c:C.ink});T(mtr,'Mike to confirm radius and full town list.',20,56,{z:15,c:C.muteD,w:310,lh:150});MS.resize(390,BOT(MS)+48);my+=MS.height;
MS=F(M,'M2 Town cards',0,my,390,4000,C.cream);b=HEAD(MS,20,48,'Towns Mike serves',[['Find '],['your town',1]],'Real Yelp reviews, word for word.',{w:350,z:32});let mgy=b+36;
TOWNS.forEach(grp=>{EYE(MS,grp[0],20,mgy,{c:C.tanD,z:11});RULE(MS,20,mgy+30,350,'#D6CEB4');let ry=mgy+50;grp[1].forEach(t=>{const c=TOWNCARD(MS,20,ry,350,t[0],grp[0],t[1],t[2],{home:t[3],tz:22,qz:15});ry+=c.height+14;});mgy=ry+28;});
const mdt=F(MS,'Don’t see your town',20,mgy,350,200,C.ink);T(mdt,'Don’t see your town?',24,24,{f:'Yellowtail',z:28,c:C.tan});T(mdt,'Call Mike and ask. Town list: Mike to confirm.',24,66,{f:'Playfair Display',s:'Black',z:20,c:C.cream,w:302});BTN(mdt,24,124,'Call (951) 809-9533',{k:'cream',icon:'phone',h:54,w:302,z:15});
MS.resize(390,BOT(MS)+48);my+=MS.height;
my+=MCONTACT(M,my).height;my+=MFOOTER(M,my).height;my+=MSTICKY(M,my).height;M.resize(390,my);
NOTE(sec,2430,200+1200,'MIKE TO CONFIRM (mobile): full town list, travel radius, Murrieta, hours, CSLB #.');
sec.resizeWithoutConstraints(2830,Math.max(D.y+D.height,M.y+M.height)+200);
return {D:D.id,M:M.id,Dh:D.height,Mh:M.height};
