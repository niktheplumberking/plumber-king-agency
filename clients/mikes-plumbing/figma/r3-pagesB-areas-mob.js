const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const M=await figma.getNodeByIdAsync('489:896');const g=async id=>await figma.getNodeByIdAsync(id);
for(const id of ['538:5458','538:5520','538:5521','538:5501','489:939','538:5528']){const n=await g(id);if(n)n.remove();}
// ---------- TOPO (mobile): map + stacked flags under it ----------
const S=F(M,'M2 Neighbor pins: topographic map (reviews, Yelp word for word)',0,948,390,1500,C.ink);M.insertChild(2,S);
EYE(S,'Where the reviews come from',20,56,{c:C.tan});
TR(S,[['Neighbors\n',{c:C.cream}],['all over',{s:'Black Italic',c:C.tan}],[' the map.',{c:C.cream}]],20,100,{f:'Playfair Display',s:'Black',z:40,lh:108,w:350,n:'H2'});
T(S,'Riverside is home base. Every pin is the home town of a real Yelp reviewer (Murrieta: the job location in the review). Read 17 Nov 2026.',20,206,{z:15,c:C.mute,w:350,lh:150});
const MW=350,MH=520;const Mp=F(S,'topographic map (illustration, not to scale)',20,310,MW,MH,C.char);Mp.strokes=[solid(C.line)];
const P=(lon,lat)=>({x:(lon+118.5)/1.55*MW,y:(34.25-lat)/0.8*MH});
function contour(cx,cy,r,k,amp,o){let d='';const N=72;for(let i=0;i<=N;i++){const t=i/N*Math.PI*2;const rr=r*(1+amp*Math.sin(3*t+k*0.7)+amp*0.6*Math.sin(5*t+k*1.3)+amp*0.3*Math.cos(2*t+k));const x=cx+rr*Math.cos(t)*1.1,y=cy+rr*Math.sin(t)*0.95;d+=(i?' L ':'M ')+x.toFixed(1)+' '+y.toFixed(1);}d+=' Z';
 const v=figma.createVector();v.vectorPaths=[{windingRule:'NONE',data:d}];v.strokes=[solid(C.tan,o)];v.strokeWeight=1;v.fills=[];v.name='contour line';Mp.appendChild(v);}
const rv=P(-117.40,33.95);for(let k=1;k<=11;k++)contour(rv.x,rv.y,k*17,k,0.07+k*0.004,0.55-k*0.035);
const hl=P(-117.75,33.75);for(let k=1;k<=6;k++)contour(hl.x,hl.y,k*14,k+3,0.1,0.35-k*0.035);
const la=P(-118.3,34.1);for(let k=1;k<=5;k++)contour(la.x,la.y,k*15,k+7,0.09,0.3-k*0.04);
T(Mp,'INLAND EMPIRE',190,30,{f:'Jost',s:'Bold',z:10,c:C.tan,ls:30});
T(Mp,'ORANGE COUNTY',80,420,{f:'Jost',s:'Bold',z:10,c:C.tan,ls:30});
T(Mp,'LOS ANGELES',16,40,{f:'Jost',s:'Bold',z:10,c:C.tan,ls:30});
const towns=[['Fontana',-117.44,34.09,'r'],['Moreno Valley',-117.23,33.94,'b'],['Menifee',-117.15,33.73,'l'],['Murrieta',-117.21,33.55,'l'],['Corona',-117.57,33.88,'l'],['Irvine',-117.82,33.68,'r'],['Buena Park',-118.0,33.87,'r'],['Los Angeles',-118.24,34.05,'r'],['West Hollywood',-118.36,34.09,'r']];
const pin={};let no=1;const num={};
for(const [n,lo,la2,side] of towns){const p=P(lo,la2);pin[n]=p;const gp=F(Mp,'pin: '+n,p.x-7,p.y-7,14,14,null);gp.clipsContent=false;HX(gp,0,0,14,14,{fill:C.tan,cut:4});CIRC(gp,4.5,4.5,5,{fill:C.ink});
 const lb=T(gp,n,0,0,{z:11,s:'SemiBold',c:C.cream});if(side==='r'){lb.x=19;lb.y=-1;}else if(side==='l'){lb.x=-5-lb.width;lb.y=-1;}else{lb.x=7-lb.width/2;lb.y=17;}}
const sd=70;const hb=SEAL(Mp,rv.x-sd/2,rv.y-sd/2,sd,'HOME BASE · HOME BASE · ',{fg:C.tan,bg:C.ink,rz:7,band:16,n:'pin: Riverside (home base seal)'});SVG(hb,IC.pin(C.cream),26,18,18,'pin icon');T(hb,'Riverside',0,38,{f:'Yellowtail',z:11,c:C.cream,w:sd,a:'CENTER'});
T(S,'Illustration, not to scale. Pins = home towns of Yelp reviewers, not a full service-area list (Mike to confirm).',20,842,{z:12,c:C.mute,w:350,lh:145});
// flags stacked under the map, each tagged with its pin town
const flags=[['Owner Mike came himself and took care of issues I had with my toilet and sink.…','Isaiah C.','Riverside, CA','Jun 12, 2025'],['…He’s my first phone call when I need a plumber.','Brandon A.','Los Angeles, CA','Aug 20, 2026'],['awesome service. showed up on time. Completed the service requested and left the area super clean.…','Julian T.','Irvine, CA','Jun 12, 2025']];
let fy=910;flags.forEach((f,i)=>{const c=F(S,'quote flag: '+f[1]+' (Yelp, word for word)',20+(i%2?18:0),fy,332,10,C.cream);c.clipsContent=false;
 const tg=F(c,'pin tag',-6,-14,10,28,C.tan);tg.clipsContent=false;const tt=T(tg,'PIN · '+f[2].replace(', CA','').toUpperCase(),12,7,{z:10,s:'Bold',c:C.ink,ls:16});tg.resize(tt.width+24,28);
 STARS(c,18,30,11,'#C99A2E');R(c,296,28,18,18,C.yelp,1,'yelp mark');T(c,'y',301,27,{s:'Bold',z:13,c:C.white});
 const t=T(c,'“'+f[0]+'”',18,56,{f:'Playfair Display',s:'Italic',z:16,c:C.ink,w:296,lh:140});const w=T(c,f[1]+' · '+f[2]+' · '+f[3]+' · Yelp',18,t.y+t.height+8,{z:11,s:'SemiBold',c:C.tanD,w:296});c.resize(332,w.y+w.height+20);c.rotation=[0.8,-0.8,0.6][i];fy+=c.height+30;});
STAMP(S,250,fy-6,110,'TWENTY REVIEWS · ALL FIVE STARS · ','5.0','YELP',{rot:-10,c:C.tan,z:28,rz:9});
S.resize(390,fy+130);
// ---------- LEDGER (mobile): pocket notebook ----------
const L=F(M,'M3 Town ledger (pocket notebook)',0,0,390,1600,C.cream);M.insertChild(3,L);
EYE(L,'Town by town',20,56);
TR(L,[['Find\n',{c:C.ink}],['your town.',{s:'Black Italic',c:C.tanD}]],20,100,{f:'Playfair Display',s:'Black',z:40,lh:108,w:350,n:'H2'});
T(L,'One real Yelp line from a customer in each town, word for word.',20,206,{z:15,c:C.muteD,w:350,lh:150});
const B=F(L,'notebook',16,290,358,1000,C.paper);B.cornerRadius=4;B.strokes=[solid(C.tanD,0.5)];
const bind=R(B,0,0,358,30,C.ink,1,'binding');for(let i=0;i<9;i++){CIRC(B,22+i*38,9,12,{fill:C.cream,n:'ring hole'});}
R(B,44,30,1,10,'#C9A9A0',0.6,'margin line');
const data=[['Inland Empire',[['Riverside','Owner Mike came himself and took care of issues I had with my toilet and sink.…','Isaiah C. · Jun 12, 2025'],['Corona','Mike was able helped me out with a slab leak on short notice…','Sal C. · Jul 25, 2026'],['Moreno Valley','…calls back to inquire how the work is going very professional and reasonable price','Tewolde T. · Jun 5, 2026'],['Menifee','Amazing! wonderful! Responded same day I called.…','Debbie H. · Jul 14, 2025'],['Murrieta','…we called Mike. He arrived on time and installed it quickly.…','Jack D. · job in Murrieta · May 7, 2026'],['Fontana','He fixed our water leaks and installed new water lines throughout our entire home…','Jackie H. · Apr 10, 2026']]],['Orange County · Los Angeles',[['Irvine','awesome service. showed up on time.…','Julian T. · Jun 12, 2025'],['Buena Park','Great service responded fast and did the work same day…','Erik N. · Sep 4, 2025'],['Los Angeles','Mike did a couple of jobs in my house! He’s my first phone call when I need a plumber.','Brandon A. · Aug 20, 2026'],['West Hollywood','Mike did a great job replacing and installing our new upstairs toilet.…','Bruce H. · Aug 24, 2026']]]];
let y=56;for(const [h,list] of data){T(B,h,60,y,{z:11,s:'Bold',c:C.tanD,ls:22,u:true});y+=34;
 for(const r of list){LEADER(B,60,y,278,r[0],'→',{c:C.ink,rc:C.tanD,z:19,dc:C.tanD});const q=T(B,'“'+r[1]+'”',60,y+32,{f:'Playfair Display',s:'Italic',z:13,c:C.muteD,w:278,lh:140});const a=T(B,r[2]+' · Yelp',60,q.y+q.height+4,{z:10,s:'SemiBold',c:C.tanD,w:278});y=a.y+a.height+26;}
 y+=14;}
const nb=F(B,'not listed row',60,y,278,92,null);const nbr=R(nb,0,0,278,92,null);nbr.strokes=[solid(C.tanD)];nbr.dashPattern=[5,4];
T(nb,'Your town not here?',16,14,{f:'Playfair Display',s:'Black',z:18,c:C.ink});T(nb,'Call (951) 809-9533 and ask. Full town list: Mike to confirm.',16,44,{z:13,c:C.muteD,w:246,lh:140});
y+=92+30;B.resize(358,y);
const ml=B.findOne(n=>n.name==='margin line');ml.resize(1,y-30);
for(let ry=60;ry<y;ry+=28){const rl=R(B,0,ry,358,1,C.tan,0.3,'page ruling');B.insertChild(1,rl);}
L.resize(390,290+y+64);
// fix M1 map intro copy if it mentions towns below
const m1=await g('489:927');m1.name='M4 Real map: where Mike works (Google Maps screenshot)';
const it=m1.findOne(n=>n.type==='TEXT'&&/town below|towns below/i.test(n.characters));if(it){await figma.loadFontAsync(it.fontName);it.characters='Riverside is home base. This is the real Google map of the area, captured 17 Nov 2026.';}
// restack
const order=['489:897','489:907',S.id,L.id,'489:927','489:1229'];
let yy=0;for(const id of order){const n=await g(id);n.y=yy;yy+=n.height;}
const ft=(await g('557:1020')).clone();M.appendChild(ft);ft.x=0;ft.y=yy;ft.name='Mobile footer: the owner’s mark (clone of Home)';yy+=ft.height;
const st=await g('538:5558');st.y=yy;M.appendChild(st);yy+=st.height;
await g('489:897').then(h=>M.appendChild(h));
M.resize(390,yy);
return {S:S.id,L:L.id,ft:ft.id,h:yy,itFixed:!!it};
