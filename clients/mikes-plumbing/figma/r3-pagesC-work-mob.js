const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const M=await figma.getNodeByIdAsync('492:692');const g=async id=>await figma.getNodeByIdAsync(id);
for(const id of ['538:5694','538:5737','538:5756','538:5757','492:723','492:813','538:5764']){const n=await g(id);if(n)n.remove();}
// ---- A: index cards (mobile) ----
const A=F(M,'M1 Reviews: what they saw when Mike left (Yelp, word for word)',0,886,390,1400,C.cream);
EYE(A,'What neighbors say',20,56);
TR(A,[['They noticed\n',{c:C.ink}],['the clean-up.',{s:'Black Italic',c:C.tanD}]],20,96,{f:'Playfair Display',s:'Black',z:40,lh:104,w:350,n:'H2'});
const stats=[['43','posts on Mike’s Instagram'],['7','photos on his Yelp page'],['0','stock photos'],['0','AI images']];
stats.forEach((s,i)=>{const x=20+(i%2)*180,y=210+Math.floor(i/2)*92;T(A,s[0],x,y,{f:'Playfair Display',s:'Black',z:42,c:C.ink});T(A,s[1],x,y+54,{z:13,c:C.muteD,w:160,lh:135});});
T(A,'Counted 17 Nov 2026',20,400,{z:11,s:'SemiBold',c:C.tanD,ls:14,u:true});
const cards=[['awesome service. showed up on time. Completed the service requested and left the area super clean. Would definitely recommend. 5 stars.','Julian T.','Irvine, CA','Jun 12, 2025',-1.2],
['…He fixed our water leaks and installed new water lines throughout our entire home, and everything was done with great attention to detail.','Jackie H.','Fontana, CA','Apr 10, 2026',1],
['…His pricing is very reasonable and he is quick and clean with his work.','Suzi J.','Valley Center, CA','Aug 25, 2025',-0.8]];
let cy=470;
cards.forEach((c,i)=>{const k=F(A,'index card: '+c[1]+' (Yelp, word for word)',20,cy,350,250,C.white);k.clipsContent=false;
 k.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.14},offset:{x:0,y:8},radius:16,spread:0,visible:true,blendMode:'NORMAL'}];
 R(k,0,42,350,1.5,C.ink,1,'card header rule');for(let ly=70;ly<300;ly+=24)R(k,0,ly,350,1,C.tan,0.55,'ruled line');
 T(k,c[1].toUpperCase()+' · '+c[2],16,15,{z:10,s:'Bold',c:C.ink,ls:10});STARS(k,350-16-5*13,15,10,'#C99A2E');
 const q=T(k,'“'+c[0]+'”',16,52,{f:'Playfair Display',s:'Italic',z:16,c:C.ink,w:318,lh:150});
 const by=Math.max(q.y+q.height+12,150);T(k,'Yelp · '+c[3],16,by,{z:12,s:'SemiBold',c:C.tanD});R(k,312,by-2,20,20,C.yelp,1,'yelp mark');T(k,'y',317,by-2,{s:'Bold',z:14,c:C.white});
 k.resize(350,by+36);for(const n of [...k.children])if(n.name==='ruled line'&&n.y>by+16)n.remove();
 const tp=R(k,130,-12,90,24,C.tan,0.75,'masking tape');tp.rotation=-3+i*2;
 k.rotation=c[4];cy+=k.height+40;});
A.resize(390,cy+30);
// ---- B: contact sheet, two vertical film strips ----
const B=F(M,'M2 Our work: contact sheet on the light table (real photos)',0,0,390,2000,C.paper);
EYE(B,'The gallery',20,56);
TR(B,[['The contact ',{c:C.ink}],['sheet.',{s:'Black Italic',c:C.tanD}]],20,96,{f:'Playfair Display',s:'Black',z:44,lh:100,w:350,n:'H2'});
const intro=T(B,'Fourteen real job photos from Mike’s Instagram and Yelp, laid out like film on a light table. Under each frame: only what the photo shows. Towns: Mike to confirm.',20,160,{z:16,c:C.muteD,w:350,lh:150});
let cx=20,chy=intro.y+intro.height+24;const chips=F(B,'filter chips (scroll sideways)',0,chy,390,36,null);
['All 14','Drains & sewer','Leaks','Commercial','Fixtures'].forEach((t,i)=>{const tt=figma.createText();tt.fontName={family:'Jost',style:'Medium'};tt.characters=t;tt.fontSize=13;const w=Math.ceil(tt.width)+30;tt.remove();HX(chips,cx,0,w,34,{fill:i===0?C.ink:null,stroke:i===0?null:C.tanD,cut:9});T(chips,t,cx,8,{z:13,s:'Medium',c:i===0?C.cream:C.ink,w,a:'CENTER'});cx+=w+8;});
const P=[['bar','Bar sink plumbing','IG'],['interceptor','Grease interceptor service','IG'],['roughin','Rough-in plumbing','IG'],['cleanout','Sewer cleanout dig','IG'],['ytoilet','Toilet install','Yelp'],['backflow','Main line leak repair','IG'],['ygrease','Commercial grease tank','Yelp'],['hosebib','Pressure regulator & hose bib','IG'],['yyard','Commercial job site','Yelp'],['roots','Roots in a sewer line','IG'],['yasphalt','Asphalt patch after the dig','Yelp'],['yard','Yard cleaned up after the job','IG'],['stucco','Leak behind stucco','IG'],['yyard2','Commercial job site','Yelp']];
const marks={ygrease:'grease tank',roots:'roots in the line'};
const SW=170,FW=124,FH=94,CELL=150,sy0=chy+70;
for(let s=0;s<2;s++){const sx=20+s*180;const st=F(B,'film strip '+(s+1)+' (vertical)',sx,sy0,SW,7*CELL+24,C.ink);st.clipsContent=false;
 for(let hy=10;hy<st.height-14;hy+=28){const h1=R(st,7,hy,10,14,C.paper,1,'sprocket hole');h1.cornerRadius=2;const h2=R(st,SW-17,hy,10,14,C.paper,1,'sprocket hole');h2.cornerRadius=2;}
 for(let f=0;f<7;f++){const idx=s*7+f;const p=P[idx];const fy=14+f*CELL;
  IMG(st,23,fy,FW,FH,p[0],{n:'frame '+(idx+1)+'A: '+p[1]+' (real, '+p[2]+')'});
  T(st,(idx+1)+'A',23,fy+FH+6,{z:9,s:'Bold',c:C.tan,ls:8});const src=T(st,p[2],0,fy+FH+6,{z:8,s:'Bold',c:C.tanD,ls:8,u:true});src.x=23+FW-src.width;
  T(st,p[1],23,fy+FH+20,{z:11,c:C.cream,w:FW,lh:120});
  if(marks[p[0]]){const e=CIRC(st,15,fy-8,FW+16,{stroke:C.cream,sw:2.5,n:'grease-pencil circle'});e.resize(FW+16,FH+16);e.rotation=s?1.5:-1.5;}}
 st.rotation=s?0.6:-0.6;}
const ig=F(B,'IG tile (43 posts)',20,sy0+7*CELL+64,350,170,C.char);ig.strokes=[solid(C.tan)];ig.strokeWeight=1.5;
SVG(ig,IC.ig(C.tan),20,20,26,'ig icon');T(ig,'43',20,54,{f:'Playfair Display',s:'Black',z:50,c:C.cream});T(ig,'posts on @mikesplumbingservices · new jobs go up here first',120,66,{z:13,c:C.mute,w:210,lh:135});T(ig,'Follow the work →',20,128,{z:14,s:'SemiBold',c:C.tan});
B.resize(390,ig.y+ig.height+60);
// ---- restack ----
const order=['492:693','492:703',A.id,B.id,'492:828'];let y=0;for(const id of order){const n=await g(id);n.y=y;y+=n.height;}
const ft=(await g('557:1020')).clone();M.appendChild(ft);ft.x=0;ft.y=y;y+=ft.height;
const sb=await g('538:5794');M.appendChild(sb);sb.y=y;y+=sb.height;M.resize(390,y);
return {A:A.id,B:B.id,ft:ft.id,h:y,mx:M.x,my:M.y};
