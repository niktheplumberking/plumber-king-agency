const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const D=await figma.getNodeByIdAsync('492:437');const g=async id=>await figma.getNodeByIdAsync(id);
for(const id of ['536:16558','536:16626','492:485','492:581','536:16645','536:16646','536:16726']){const n=await g(id);if(n)n.remove();}
// ---- A: index cards (reviews after hero) ----
const A=F(D,'04 Reviews: what they saw when Mike left (Yelp, word for word)',0,784,1440,700,C.cream);D.insertChild(3,A);
EYE(A,'What neighbors say',80,110);
TR(A,[['They noticed\n',{c:C.ink}],['the clean-up.',{s:'Black Italic',c:C.tanD}]],80,160,{f:'Playfair Display',s:'Black',z:56,lh:102,w:560,n:'H2'});
const stats=[['43','posts on Mike’s Instagram'],['7','photos on his Yelp page'],['0','stock photos'],['0','AI images']];
stats.forEach((s,i)=>{const x=760+i*150;T(A,s[0],x,150,{f:'Playfair Display',s:'Black',z:54,c:C.ink});T(A,s[1],x,222,{z:13,c:C.muteD,w:130,lh:135});});
T(A,'Counted 17 Nov 2026',760,272,{z:11,s:'SemiBold',c:C.tanD,ls:14,u:true});
const cards=[['awesome service. showed up on time. Completed the service requested and left the area super clean. Would definitely recommend. 5 stars.','Julian T.','Irvine, CA','Jun 12, 2025',-1.6],
['…He fixed our water leaks and installed new water lines throughout our entire home, and everything was done with great attention to detail.','Jackie H.','Fontana, CA','Apr 10, 2026',1.1],
['…His pricing is very reasonable and he is quick and clean with his work.','Suzi J.','Valley Center, CA','Aug 25, 2025',-0.8]];
cards.forEach((c,i)=>{const x=80+i*440;const k=F(A,'index card: '+c[1]+' (Yelp, word for word)',x,350,380,250,C.white);k.clipsContent=false;
 k.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.14},offset:{x:0,y:10},radius:20,spread:0,visible:true,blendMode:'NORMAL'}];
 R(k,0,44,380,1.5,C.ink,1,'card header rule');for(let ly=74;ly<240;ly+=26)R(k,0,ly,380,1,C.tan,0.55,'ruled line');
 T(k,c[1].toUpperCase()+' · '+c[2],20,16,{z:11,s:'Bold',c:C.ink,ls:12});STARS(k,380-20-5*15,15,12,'#C99A2E');
 const q=T(k,'“'+c[0]+'”',20,56,{f:'Playfair Display',s:'Italic',z:17,c:C.ink,w:340,lh:153});
 const by=Math.max(q.y+q.height+14,190);T(k,'Yelp · '+c[3],20,by,{z:12,s:'SemiBold',c:C.tanD});R(k,330,by-2,20,20,C.yelp,1,'yelp mark');T(k,'y',335,by-2,{s:'Bold',z:14,c:C.white});
 k.resize(380,by+40);for(const n of k.children)if(n.name==='ruled line'&&n.y>by+20)n.remove();
 const tp=R(k,145,-14,90,28,C.tan,0.75,'masking tape');tp.rotation=-3+i*2;
 k.rotation=c[4];});
A.resize(1440,720);
// ---- B: contact sheet ----
const B=F(D,'05 Our work: contact sheet on the light table (real photos)',0,1504,1440,1600,C.paper);D.insertChild(4,B);
EYE(B,'The gallery',80,120);
TR(B,[['The contact ',{c:C.ink}],['sheet.',{s:'Black Italic',c:C.tanD}]],80,170,{f:'Playfair Display',s:'Black',z:64,lh:100,w:700,n:'H2'});
T(B,'Fourteen real job photos from Mike’s Instagram and Yelp, laid out like film on a light table. Under each frame: only what the photo shows. The town for each job: Mike to confirm.',80,256,{z:18,c:C.muteD,w:620,lh:155});
let cx=840;['All 14','Drains & sewer','Leaks','Commercial','Fixtures'].forEach((t,i)=>{const tt=figma.createText();tt.fontName={family:'Jost',style:'Medium'};tt.characters=t;tt.fontSize=14;const w=Math.ceil(tt.width)+36;tt.remove();HX(B,cx,268,w,36,{fill:i===0?C.ink:null,stroke:i===0?null:C.tanD,cut:10});T(B,t,cx,276,{z:14,s:'Medium',c:i===0?C.cream:C.ink,w,a:'CENTER'});cx+=w+8;});
const P=[['bar','Bar sink plumbing','IG'],['interceptor','Grease interceptor service','IG'],['roughin','Rough-in plumbing','IG'],['cleanout','Sewer cleanout dig','IG'],['ytoilet','Toilet install','Yelp'],['backflow','Main line leak repair','IG'],['ygrease','Commercial grease tank','Yelp'],['hosebib','Pressure regulator & hose bib','IG'],['yyard','Commercial job site','Yelp'],['roots','Roots in a sewer line','IG'],['yasphalt','Asphalt patch after the dig','Yelp'],['yard','Yard cleaned up after the job','IG'],['stucco','Leak behind stucco','IG'],['yyard2','Commercial job site','Yelp'],['IG',null,null]];
const FW=244,FH=186,SW=20+5*FW+4*16+20;const marks={ygrease:'commercial grease tank',roots:'roots in the line',yasphalt:'patched after the dig'};
const strips=[];
for(let s=0;s<3;s++){const sy=380+s*370;const st=F(B,'film strip '+(s+1),(1440-SW)/2,sy,SW,282,C.ink);st.clipsContent=false;strips.push(st);
 for(let hx=14;hx<SW-20;hx+=34){const h1=R(st,hx,10,18,12,C.paper,1,'sprocket hole');h1.cornerRadius=2;const h2=R(st,hx,260,18,12,C.paper,1,'sprocket hole');h2.cornerRadius=2;}
 T(st,'MIKE’S · RIVERSIDE',SW-190,8,{z:9,s:'Bold',c:C.tanD,ls:20});
 for(let f=0;f<5;f++){const idx=s*5+f;const p=P[idx];const fx=20+f*(FW+16);
  if(p[0]==='IG'){const t=F(st,'IG tile (43 posts)',fx,32,FW,FH,C.char);t.strokes=[solid(C.tan)];t.strokeWeight=1.5;SVG(t,IC.ig(C.tan),20,20,28,'ig icon');T(t,'43',20,62,{f:'Playfair Display',s:'Black',z:56,c:C.cream});T(t,'posts on @mikesplumbingservices',20,132,{z:13,c:C.mute,w:200});T(t,'Follow the work →',20,156,{z:13,s:'SemiBold',c:C.tan});
   T(st,(idx+1)+'A',fx,226,{z:11,s:'Bold',c:C.tan,ls:10});T(st,'Instagram · new jobs go up here first',fx+34,225,{z:13,c:C.cream});continue;}
  IMG(st,fx,32,FW,FH,p[0],{n:'frame '+(idx+1)+'A: '+p[1]+' (real, '+p[2]+')'});
  T(st,(idx+1)+'A',fx,226,{z:11,s:'Bold',c:C.tan,ls:10});T(st,p[1],fx+34,225,{z:13,c:C.cream,w:FW-34-40});const src=T(st,p[2],0,226,{z:10,s:'Bold',c:C.tanD,ls:10,u:true});src.x=fx+FW-src.width;
  if(marks[p[0]]){const e=CIRC(st,fx-10,22,FW+20,{stroke:C.cream,sw:3,n:'grease-pencil circle'});e.resize(FW+20,FH+20);e.rotation=s%2?1.5:-1.5;
   const note=T(B,marks[p[0]],0,0,{f:'Yellowtail',z:26,c:C.tanD,n:'grease-pencil note'});note.x=(1440-SW)/2+fx+FW/2-note.width/2;note.y=sy+(s===0?-36:290);}}
 st.rotation=[-0.6,0.5,-0.4][s];}
NOTE(D.parent,1600,2600,'Our work: filter chips = Drains & sewer / Leaks / Commercial / Fixtures. Town per photo: Mike to confirm. Grease-pencil notes only say what each photo shows.',300);
B.resize(1440,380+3*370+80);
// ---- restack ----
const order=['492:438','492:448','492:464',A.id,B.id,'536:16659'];let y=0;for(const id of order){const n=await g(id);n.y=y;y+=n.height;}
const sl=await g('536:16725');sl.y=(await g('536:16659')).y;sl.fills=[solid(C.paper)];D.appendChild(sl);
const ft=(await g('556:2551')).clone();D.appendChild(ft);ft.x=0;ft.y=y;y+=ft.height;D.resize(1440,y);
return {A:A.id,B:B.id,ft:ft.id,h:y};
