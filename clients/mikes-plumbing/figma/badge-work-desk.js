// shared job data for Our work (desktop + mobile). pin = exact substring of a Yelp review (paired by job type, not the same job)
const JOBS=[
 {k:'mike',t:'Camera inspection, restaurant drain',tag:'Drains & sewer'},
 {k:'cleanout',t:'Digging out a sewer cleanout',tag:'Drains & sewer'},
 {k:'roots',t:'Roots inside a sewer line',tag:'Drains & sewer'},
 {k:'backflow',t:'Main line leak at the backflow',tag:'Leaks & lines',pin:['I came home to a fixed leak and spotless work site.','Stuart W.']},
 {k:'hosebib',t:'Pressure regulator and hose bib',tag:'Installs',pin:['We wanted our hose pipe moved back a few feet from its current location. He was able to come out and complete the job in one afternoon.','Pamela N.']},
 {k:'stucco',t:'Leak behind a stucco wall',tag:'Leaks & lines'},
 {k:'roughin',t:'Rough-in for a new bathroom',tag:'Installs'},
 {k:'interceptor',t:'Grease interceptor pumping',tag:'Commercial'},
 {k:'ytoilet',t:'New toilet, installed',tag:'Installs',pin:['Mike did a great job replacing and installing our new upstairs toilet.','Bruce H.']},
 {k:'yasphalt',t:'Asphalt patched after a line repair',tag:'Leaks & lines'},
 {k:'yard',t:'Work area, cleaned up after',tag:'Leaks & lines',pin:['Completed the service requested and left the area super clean.','Julian T.']},
 {k:'bar',t:'Restaurant bar sink',tag:'Commercial'},
 {k:'ygrease',t:'Grease tank, commercial kitchen',tag:'Commercial'},
 {k:'yyard',t:'Line work in a commercial yard',tag:'Commercial'}];
const pg=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(pg);
figma.root.setSharedPluginData('pkmike','jobs',JSON.stringify(JOBS));
const AF=Object.getPrototypeOf(async function(){}).constructor;const L=await new AF(figma.root.getSharedPluginData('pkmike','badge'))();
const {C,T,TR,V,HEX,PH,EB,HD,BTN,IC,NOTE,SEC,F,R,CHIP,hexPath,cutPath,solid}=L;
const {sec,D}=await L.PAGE(8,'10 Our work (desktop + mobile)');const W=1440;
let S=SEC(D,'Hero · real jobs',196,600,C.black);
EB(S,120,96,'Our work',true);
TR(S,[['Real jobs.\n',{c:C.cream}],['Real ',{c:C.tan}],['photos.',{f:'PDI',c:C.tan}]],120,134,{f:'PD',z:76,lh:104,w:620,n:'H1: Real jobs. Real photos.'});
T(S,'Every photo on this page comes from Mike’s own Instagram and Yelp pages. No stock photos, no borrowed jobs.',120,320,{f:'J',z:18,c:C.muted,lh:155,w:520});
[['14','jobs shown'],['3','homes, yards, restaurants']].forEach(([n,l],i)=>{const x=120+i*200;T(S,n,x,410,{f:'PD',z:44,c:C.cream});T(S,l,x,466,{f:'JM',z:14,c:C.muted,w:180});});
PH(S,840,70,480,460,'van','cut',40,'photo: Mike loading the van (IG)');
const tg=F(S,'photo tag',860,478,190,36,null,false);V(tg,0,0,190,36,hexPath(190,36,11),[solid(C.black)],C.tan,1.2,'tag shape');T(tg,'Mike, loading up',0,8,{f:'JM',z:14,c:C.cream,a:'CENTER',w:190});
S.children.find(n=>n.type==='TEXT'&&n.characters==='3').remove();S.children.find(n=>n.type==='TEXT'&&n.characters==='homes, yards, restaurants').remove();
T(S,'Homes, yards and restaurants',320,424,{f:'PB',z:22,c:C.cream,w:200,lh:120});
NOTE(sec,1580,100+196+60,'Job titles are read from the photos. Tell us the real job, and the town, for each photo.');
// grid
const ys=796;S=SEC(D,'Jobs grid · alternating spans + reviews layout 8',ys,10,C.paper);
EB(S,120,90,'Fourteen jobs',false);HD(S,120,126,'Pick a job type.','See how Mike works.',false,{it:'how',z:52,w:800});
let cx=120;const cnt={};JOBS.forEach(j=>cnt[j.tag]=(cnt[j.tag]||0)+1);
for(const [i,[l,n]] of [['All',14],...Object.entries(cnt)].entries()){const ch=CHIP(S,cx,300,l+' · '+n,false,i===0,{z:14,h:38,pad:40});cx+=ch.w+10;}
const rows=[[[0,2],[1,1]],[[2,1],[3,2]],[[4,1],[5,1],[6,1]],[[7,2],[8,1]],[[9,1],[10,2]],[[11,1],[12,1],[13,1]]];
const col=384,gap=24;let y=380;
function pinNote(p,x,y,w,q,name){const n=F(p,'pinned review: '+name,x,y,w,10,null,false);
 const qt=T(n,'“'+q+'”',20,30,{f:'PI',z:16,c:C.ink,lh:140,w:w-40});const nm=T(n,name+' · Yelp',20,qt.y+qt.height+10,{f:'JS',z:12.5,c:C.ink});const sm=T(n,'From a review of a similar job',20,nm.y+nm.height+2,{f:'J',z:11.5,c:C.brown});
 const h=sm.y+sm.height+18;n.resize(w,h);n.insertChild(0,V(n,0,0,w,h,cutPath(w,h,12),[solid('#FFFDF6')],C.ink,1,'note shape'));HEX(n,w/2-14,-8,28,18,6,C.black,C.tan,1.2,'pin');
 n.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.28},offset:{x:0,y:8},radius:18,spread:0,visible:true,blendMode:'NORMAL'}];n.rotation=2;return n;}
let idx=0;
for(const r of rows){const ph=r.length===3?340:440;let x=120;
 for(const [ji,sp] of r){const j=JOBS[ji];idx++;const w=sp===2?col*2+gap:col;const g=F(S,'job '+String(idx).padStart(2,'0')+': '+j.t,x,y,w,ph+96,null,false);
  PH(g,0,0,w,ph,j.k,'cut',sp===2?36:26,'photo: '+j.k);
  T(g,String(idx).padStart(2,'0'),0,ph+20,{f:'PD',z:30,c:C.tanD});T(g,j.tag,58,ph+22,{f:'SC',z:12,c:C.brown,ls:16});T(g,j.t,58,ph+44,{f:'PB',z:22,c:C.ink,w:w-70});
  if(j.pin){const nw=sp===2?320:300;pinNote(g,sp===2?w-nw-28:(w-nw)/2,ph-170,nw,j.pin[0],j.pin[1]);}
  x+=w+gap;}
 y+=ph+96+40;}
const end0=y+60;S.resize(W,end0);
NOTE(sec,1580,100+ys+380,'Pinned quotes are real Yelp words, matched by job type. They are not from the same job as the photo. OK?');
const end=await L.FIN(D,ys+end0,true,false);
return {D:D.id,sec:sec.id,end};
