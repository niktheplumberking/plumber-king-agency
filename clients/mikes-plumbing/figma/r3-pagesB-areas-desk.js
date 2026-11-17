const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const D=await figma.getNodeByIdAsync('489:437');const g=async id=>await figma.getNodeByIdAsync(id);
for(const id of ['534:1156','534:1205','489:510','534:1224','534:1225','534:1307']){const n=await g(id);if(n)n.remove();}
// ---------- TOPO: neighbor pins (reviews right after hero) ----------
const S=F(D,'02 Neighbor pins: topographic map (reviews, Yelp word for word)',0,784,1440,1180,C.ink);D.insertChild(3,S);
EYE(S,'Where the reviews come from',80,110,{c:C.tan});
TR(S,[['Neighbors ',{c:C.cream}],['all over',{s:'Black Italic',c:C.tan}],[' the map.',{c:C.cream}]],80,160,{f:'Playfair Display',s:'Black',z:58,lh:104,w:760,n:'H2'});
T(S,'Riverside is home base. Every pin is the home town of a real Yelp reviewer (Murrieta: the job location in the review). Read 17 Nov 2026.',880,176,{z:17,c:C.mute,w:480,lh:155});
const MW=1280,MH=700;const Mp=F(S,'topographic map (illustration, not to scale)',80,300,MW,MH,C.char);Mp.strokes=[solid(C.line)];
const P=(lon,lat)=>({x:(lon+118.5)/1.55*MW,y:(34.25-lat)/0.8*MH});
function contour(cx,cy,r,k,amp,o){let d='';const N=90;for(let i=0;i<=N;i++){const t=i/N*Math.PI*2;const rr=r*(1+amp*Math.sin(3*t+k*0.7)+amp*0.6*Math.sin(5*t+k*1.3)+amp*0.3*Math.cos(2*t+k));const x=cx+rr*Math.cos(t)*1.25,y=cy+rr*Math.sin(t)*0.85;d+=(i?' L ':'M ')+x.toFixed(1)+' '+y.toFixed(1);}d+=' Z';
 const v=figma.createVector();v.vectorPaths=[{windingRule:'NONE',data:d}];v.strokes=[solid(C.tan,o)];v.strokeWeight=1.2;v.fills=[];v.name='contour line';Mp.appendChild(v);}
const rv=P(-117.40,33.95);for(let k=1;k<=13;k++)contour(rv.x,rv.y,k*34,k,0.07+k*0.004,0.55-k*0.03);
const hl=P(-117.75,33.75);for(let k=1;k<=7;k++)contour(hl.x,hl.y,k*26,k+3,0.1,0.35-k*0.03);
const la=P(-118.3,34.1);for(let k=1;k<=6;k++)contour(la.x,la.y,k*30,k+7,0.09,0.3-k*0.03);
// region labels on arcs
RINGTEXT(Mp,'INLAND EMPIRE',P(-117.3,33.95).x,P(-117.3,33.95).y+40,230,{f:'Jost',s:'Bold',z:15,c:C.tan,arc:44,start:-22});
RINGTEXT(Mp,'ORANGE COUNTY',hl.x,hl.y+230,280,{f:'Jost',s:'Bold',z:15,c:C.tan,arc:40,start:-20});
RINGTEXT(Mp,'LOS ANGELES',la.x+40,la.y+260,300,{f:'Jost',s:'Bold',z:15,c:C.tan,arc:30,start:-15});
// pins
const towns=[['Fontana',-117.44,34.09],['Moreno Valley',-117.23,33.94],['Menifee',-117.15,33.73],['Murrieta',-117.21,33.55],['Corona',-117.57,33.88],['Irvine',-117.82,33.68],['Buena Park',-118.0,33.87],['Los Angeles',-118.24,34.05],['West Hollywood',-118.36,34.09]];
const pin={};for(const [n,lo,la2] of towns){const p=P(lo,la2);pin[n]=p;const gp=F(Mp,'pin: '+n,p.x-9,p.y-9,200,20,null);gp.clipsContent=false;HX(gp,0,0,18,18,{fill:C.tan,cut:5});CIRC(gp,6,6,6,{fill:C.ink});T(gp,n,26,-1,{z:14,s:'SemiBold',c:C.cream});}
const hb=SEAL(Mp,rv.x-62,rv.y-62,124,'HOME BASE · RIVERSIDE CA · ',{fg:C.tan,bg:C.ink,rz:10,band:26,n:'pin: Riverside (home base seal)'});SVG(hb,IC.pin(C.cream),46,40,32,'pin icon');T(hb,'Riverside',0,74,{f:'Yellowtail',z:17,c:C.cream,w:124,a:'CENTER'});
// quote flags tied to pins
function flag(x,y,q,who,to,from){const ln=figma.createVector();ln.vectorPaths=[{windingRule:'NONE',data:`M ${from.x} ${from.y} L ${to.x} ${to.y}`}];ln.strokes=[solid(C.cream,0.7)];ln.strokeWeight=1.2;ln.dashPattern=[4,4];ln.fills=[];ln.name='tie line';Mp.appendChild(ln);
 const c=F(Mp,'quote flag: '+who+' (Yelp, word for word)',x,y,300,10,C.cream);c.clipsContent=false;STARS(c,20,18,12,'#C99A2E');R(c,250,16,18,18,C.yelp,1,'yelp mark');T(c,'y',255,15,{s:'Bold',z:13,c:C.white});
 const t=T(c,'“'+q+'”',20,42,{f:'Playfair Display',s:'Italic',z:16,c:C.ink,w:260,lh:140});T(c,who,20,t.y+t.height+8,{z:12,s:'SemiBold',c:C.tanD,w:260});c.resize(300,t.y+t.height+40);return c;}
flag(430,40,'Owner Mike came himself and took care of issues I had with my toilet and sink.…','Isaiah C. · Riverside, CA · Jun 12, 2025 · Yelp',{x:rv.x-50,y:rv.y-30},{x:730,y:120});
flag(40,250,'…He’s my first phone call when I need a plumber.','Brandon A. · Los Angeles, CA · Aug 20, 2026 · Yelp',pin['Los Angeles'],{x:190,y:250});
flag(40,500,'awesome service. showed up on time. Completed the service requested and left the area super clean.…','Julian T. · Irvine, CA · Jun 12, 2025 · Yelp',pin['Irvine'],{x:340,y:560});
for(const n of Mp.children.filter(n=>n.name.startsWith('pin:')||n.name.startsWith('quote flag')))Mp.appendChild(n);
T(S,'Illustration, not to scale. Pins = home towns of Yelp reviewers, not a full service-area list (Mike to confirm). The real Google map is further down.',80,1024,{z:13,c:C.mute,w:900});
STAMP(S,1210,1010,130,'TWENTY REVIEWS · ALL FIVE STARS · ','5.0','YELP',{rot:-10,c:C.tan,z:34,rz:10});
// ---------- LEDGER: town book ----------
const L=F(D,'03 Town ledger (open book)',0,0,1440,1240,C.cream);D.insertChild(4,L);
EYE(L,'Town by town',80,120);
TR(L,[['Find ',{c:C.ink}],['your town.',{s:'Black Italic',c:C.tanD}]],80,170,{f:'Playfair Display',s:'Black',z:58,lh:104,w:700,n:'H2'});
T(L,'One real Yelp line from a customer in each town, word for word. Don’t see yours? Call and ask: the full town list is Mike to confirm.',80,252,{z:17,c:C.muteD,w:620,lh:155});
const B=F(L,'ledger book (two pages)',80,360,1280,780,C.ink);B.cornerRadius=6;
const pgL=F(B,'left page: Inland Empire',18,18,616,744,C.paper),pgR=F(B,'right page: Orange County + LA',646,18,616,744,C.paper);
const sp=R(B,632,0,16,780,C.char,1,'spine');
for(const pg of [pgL,pgR])for(let i=0;i<30;i++)R(pg,0,70+i*30,616,1,C.tan,0.35,'page ruling');
R(pgL,70,0,1,744,'#C9A9A0',0.6,'margin line');R(pgR,70,0,1,744,'#C9A9A0',0.6,'margin line');
function head(pg,t,n){T(pg,t,90,24,{z:12,s:'Bold',c:C.tanD,ls:22,u:true});T(pg,n,0,24,{z:12,s:'Bold',c:C.tanD,w:590,a:'RIGHT'});}
head(pgL,'Inland Empire','p. 1');head(pgR,'Orange County · Los Angeles','p. 2');
const IE=[['Riverside','Owner Mike came himself and took care of issues I had with my toilet and sink.…','Isaiah C. · Jun 12, 2025'],['Corona','Mike was able helped me out with a slab leak on short notice…','Sal C. · Jul 25, 2026'],['Moreno Valley','…has a lot of respect and calls back to inquire how the work is going very professional and reasonable price','Tewolde T. · Jun 5, 2026'],['Menifee','Amazing! wonderful! Responded same day I called.…','Debbie H. · Jul 14, 2025'],['Murrieta','…we called Mike. He arrived on time and installed it quickly.…','Jack D. · job in Murrieta · May 7, 2026'],['Fontana','He fixed our water leaks and installed new water lines throughout our entire home…','Jackie H. · Apr 10, 2026']];
const OL=[['Irvine','awesome service. showed up on time.…','Julian T. · Jun 12, 2025'],['Buena Park','Great service responded fast and did the work same day…','Erik N. · Sep 4, 2025'],['Los Angeles','Mike did a couple of jobs in my house! He’s my first phone call when I need a plumber.','Brandon A. · Aug 20, 2026'],['West Hollywood','Mike did a great job replacing and installing our new upstairs toilet.…','Bruce H. · Aug 24, 2026']];
function rows(pg,list,y0){let y=y0;list.forEach((r,i)=>{LEADER(pg,90,y,496,r[0],'Plumber in '+r[0]+' →',{c:C.ink,rc:C.tanD,z:22,dc:C.tanD});
 const q=T(pg,'“'+r[1]+'”',90,y+36,{f:'Playfair Display',s:'Italic',z:14,c:C.muteD,w:496,lh:140});T(pg,r[2]+' · Yelp',90,q.y+q.height+4,{z:11,s:'SemiBold',c:C.tanD});y=q.y+q.height+34;});return y;}
const ly=rows(pgL,IE,70);let ry=rows(pgR,OL,70);
const nb=F(pgR,'not listed row',90,ry+10,496,96,null);const nbr=R(nb,0,0,496,96,null);nbr.strokes=[solid(C.tanD)];nbr.dashPattern=[5,4];
T(nb,'Your town not here?',20,16,{f:'Playfair Display',s:'Black',z:20,c:C.ink});T(nb,'Call (951) 809-9533 and ask. Full town list: Mike to confirm.',20,52,{z:14,c:C.muteD});
const ph=Math.max(ly,ry+116)+30;for(const pg of [pgL,pgR])pg.resize(616,ph);B.resize(1280,ph+36);sp.resize(16,ph+36);for(const m of B.findAll(n=>n.name==='margin line'))m.resize(1,ph);L.resize(1440,360+ph+36+110);
// restack
const order=['489:438','489:448','489:464',S.id,L.id,'489:485','534:1240'];
let y=0;for(const id of order){const n=await g(id);n.y=y;y+=n.height;}
const ct=await g('534:1240');(await g('534:1306')).y=ct.y;
const ft=(await g('556:2551')).clone();D.appendChild(ft);ft.x=0;ft.y=y;ft.name='12 Footer: the owner’s mark (clone of Home)';y+=ft.height;
D.resize(1440,y);
const sec=await g('481:446');const mob=await g('489:896');return {S:S.id,L:L.id,ft:ft.id,h:y,secH:sec.height,mobY:mob.y};
