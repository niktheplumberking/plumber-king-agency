const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const D=await figma.getNodeByIdAsync('483:437');
for(const id of ['525:443','525:551']){const n=await figma.getNodeByIdAsync(id);if(n)n.remove();}
const Y=1140;const S=F(D,'02 Reviews: neighbors’ ledger (Yelp, word for word)',0,Y,1440,1300,C.paper);
EYE(S,'What neighbors say',80,150);
TR(S,[['Neighbors call\n',{c:C.ink}],['him first.',{s:'Black Italic',c:C.tanD}]],80,200,{f:'Playfair Display',s:'Black',z:84,lh:100,w:720,n:'H2'});
T(S,'Every word below is copied from Mike’s Yelp page. Twenty reviews, every one five stars (read 17 Nov 2026). Nobody wrote these for him.',80,400,{z:18,c:C.muteD,w:560,lh:155});
// engraved seal
const sd=360;const seal=SEAL(S,940,110,sd,'TWENTY YELP REVIEWS · ALL FIVE STARS · READ 17 NOV 2026 · ',{bg:C.paper,fg:C.ink,rz:14,n:'engraved seal: 5.0 on Yelp'});
T(seal,'5.0',0,108,{f:'Playfair Display',s:'Black',z:104,c:C.ink,w:sd,a:'CENTER'});
STARS(seal,sd/2-5*21/2,236,18,'#C99A2E');T(seal,'ON YELP',0,264,{z:12,s:'Bold',c:C.tanD,w:sd,a:'CENTER',ls:24});
R(seal,sd/2-12,72,24,24,C.yelp,1,'yelp mark');T(seal,'y',sd/2-6,72,{s:'Bold',z:17,c:C.white});
WRENCHES(S,830,120,72,C.tanD);
// Mike name patch near seal
const np=F(S,'name patch: served by Mike',1210,420,180,58,null);np.clipsContent=false;HX(np,0,0,180,58,{fill:C.ink,cut:18});T(np,'SERVED BY',0,8,{z:10,s:'Bold',c:C.tan,w:180,a:'CENTER',ls:20});T(np,'Mike',0,18,{f:'Yellowtail',z:28,c:C.cream,w:180,a:'CENTER'});np.rotation=6;
// two rows of review slips bleeding off both edges (marquee)
const row1=[
['Owner Mike came himself and took care of issues I had with my toilet and sink. Was on time and took care of everything pretty quick. Left everything clean and working perfectly. Thank you Mike!','Isaiah C.','Riverside, CA','Jun 12, 2025'],
['Mike did a couple of jobs in my house! He’s my first phone call when I need a plumber.','Brandon A.','Los Angeles, CA','Aug 20, 2026'],
['Mike was able helped me out with a slab leak on short notice, rerouted water lines and new showers valves installed. He was upfront and honest with me on pricing…','Sal C.','Corona, CA','Jul 25, 2026'],
['Needed my garbage disposal repaired, he was quick and efficient! I value a clean plumber. 10 out of 10 recommend.','Janeth H.','Corona, CA','Jun 12, 2025'],
];
const row2=[
['Great service responded fast and did the work same day Would recommend and will use again for any plumbing service that I may need','Erik N.','Buena Park, CA','Sep 4, 2025'],
['Responded same day I called. The job was much more complicated than expected...Michael somehow made everything work and wasn’t gonna leave until fixed.','Debbie H.','Menifee, CA','Jul 14, 2025'],
['He is an excellent communicator. His prices are fair and competitive. I will definitely use him again!','Bruce H.','West Hollywood, CA','Aug 24, 2026'],
['Mike was a pleasure to work with. He came by and did exactly what was needed… He was able to come out and complete the job in one afternoon.','Pamela N.','Menifee, CA','Jul 30, 2025'],
];
const lane1=F(S,'marquee row 1 (scrolls left, pauses on hover)',0,540,1440,330,null);lane1.clipsContent=true;
let x=-170,no=1;for(const r of row1){const s=SLIP(lane1,x,30,400,r[0],r[1],r[2],r[3],{no:String(no++).padStart(2,'0'),z:17});x+=424;}
const lane2=F(S,'marquee row 2 (scrolls right, pauses on hover)',0,860,1440,320,null);lane2.clipsContent=true;
x=40;for(const r of row2){const s=SLIP(lane2,x,20,400,r[0],r[1],r[2],r[3],{no:String(no++).padStart(2,'0'),z:17});x+=424;}
// edge fades
for(const [lx,dir] of [[0,1],[1240,-1]]){const fr=R(S,lx,540,200,640,C.paper,1,'edge fade');fr.fills=[{type:'GRADIENT_LINEAR',gradientTransform:dir>0?[[1,0,0],[0,1,0]]:[[-1,0,1],[0,1,0]],gradientStops:[{position:0,color:{...rgb(C.paper),a:1}},{position:1,color:{...rgb(C.paper),a:0}}]}];}
// direction cue
T(S,'←  the slips drift slowly · pause on hover',80,1192,{z:12,s:'SemiBold',c:C.tanD,ls:14,u:true});
// brass trust tags (legal + trust up front)
const tags=[['Insured','Mike’s own claim on Instagram','shield',{}],['Family owned','& operated · Est. 2025','home',{}],['Free estimates','+15% off your first job','tag',{}],['CSLB lic. #','Mike to confirm before launch','shield',{dashed:true}]];
tags.forEach((t,i)=>TAG(S,80+i*300,1250,270,t[0],t[1],t[2],{...t[3],rot:[1.5,-1,1,-1.5][i]}));
BTN(S,1360-250,1470,'Read all 20 on Yelp',{k:'ink',h:56,w:250,z:15,icon:'arrow'});
T(S,'+ 3 neighbors recommend Mike on Nextdoor',80,1488,{z:15,s:'Medium',c:C.muteD});
S.resize(1440,1600);
return {id:S.id,h:S.height};
