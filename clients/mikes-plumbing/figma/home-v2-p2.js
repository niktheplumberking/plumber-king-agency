const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const D=await figma.getNodeByIdAsync('483:437');let y=2328;const out={};
// 03 SERVICES (char) — cropped watermark word kept (Nick praised it)
const S=F(D,'03 Services',0,y,1440,1500,C.char);T(S,'SERVICES',900,150,{f:'Playfair Display',s:'Black',z:180,c:C.cream,o:0.05,n:'watermark (cropped word, Nick praised)'});
let b=HEAD(S,80,210,'What Mike fixes',[['Every pipe, drain and heater.\n'],['Home',1],[' or business.']],'Drains to water heaters, slab leaks to grease interceptors. The same owner shows up, explains the why, and cleans up after.',{dark:true,w:820,z:56});
BTN(S,1140,b-62,'All services',{k:'ghost',fg:C.cream,h:56,w:220,icon:'arrow'});
const sv=[['Drain cleaning & hydro jetting','Snaking and hydro jetting for tough clogs.','cleanout'],['Leak detection & slab leaks','Find the leak, open as little as possible.','stucco'],['Sewer lines & camera inspection','Camera inspection and root removal.','roots'],['Grease interceptors','Pumping and cleaning for restaurants.','interceptor'],['Toilets, sinks & faucets','Installs and repairs, done clean.','ytoilet'],['Pressure regulators & valves','Regulators, shut-offs and hose bibs.','hosebib'],['Water heaters','Install and repair.',null,'flame'],['Garbage disposals & water filtration','Install and repair.',null,'filter']];
const cw=300,ch=410,gy=b+60;
sv.forEach((s,i)=>{const x=80+(i%4)*(cw+26),yy=gy+Math.floor(i/4)*(ch+26);const g=F(S,'service card: '+s[0],x,yy,cw,ch,C.ink);
 if(s[2]){IMGHX(g,0,0,cw,210,s[2],{cutCorners:24,n:'photo (real): '+s[2]});}else{const f=F(g,'no real photo yet: icon panel',0,0,cw,210,C.char2);HX(f,cw/2-70,45,140,120,{stroke:C.tan,sw:1.5,cut:34});SVG(f,IC[s[3]](C.tan),cw/2-22,83,44);T(f,'Photo: Mike to send',0,178,{z:12,c:C.mute,w:cw,a:'CENTER'});}
 HX(g,20,186,64,40,{fill:C.ink,stroke:C.tan,cut:12,n:'index badge'});T(g,String(i+1).padStart(2,'0'),20,194,{f:'Playfair Display',s:'Black',z:18,c:C.tan,w:64,a:'CENTER'});
 const t1=T(g,s[0],20,244,{f:'Playfair Display',s:'Bold',z:22,c:C.cream,w:cw-40,lh:118});T(g,s[1],20,t1.y+t1.height+10,{z:15,c:C.mute,w:cw-40,lh:150});
 T(g,'CALL ABOUT THIS →',20,ch-40,{z:12,s:'SemiBold',c:C.tan,ls:14});});
const sb=gy+2*(ch+26)+120;S.resize(1440,sb+100);out.services=S.id;
// ticker band right after reviews (sits over the top of services, tilted)
const tk=TICKER(D,y+6,['Friendly','Transparent','Proficient','Drain cleaning','Hydro jetting','Slab leaks','Grease interceptors','Sewer camera','Riverside','Corona','Menifee'],{bg:C.tan,fg:C.ink,rot:-1.4});out.ticker=tk.id;
y+=S.height;
// 04 ABOUT (paper)
const A=F(D,'04 About Mike + why homeowners choose him',0,y,1440,1200,C.paper);
IMGHX(A,80,240,400,540,'van',{cutCorners:40,n:'photo (real): Mike loading the van'});IMGHX(A,360,560,300,400,'bar',{cutCorners:30,n:'photo (real): Mike at a bar sink'});
const bd=F(A,'years badge',96,820,220,110,null);bd.clipsContent=false;HX(bd,0,0,220,110,{fill:C.ink,cut:30});T(bd,'10+',0,14,{f:'Playfair Display',s:'Black',z:44,c:C.cream,w:220,a:'CENTER'});T(bd,'years hands-on',0,70,{z:14,s:'Medium',c:C.tan,w:220,a:'CENTER'});
let ab=HEAD(A,740,240,'About Mike',[['Raised in the grease trade.\n'],['Built',1],[' for plumbing.']],null,{w:620,z:50});
const paras=[['How it started','Mike grew up in his family’s grease-industry business, learning the tough, behind-the-scenes work most plumbers never see.'],['On his own','He started Mike’s Plumbing Services in 2025, with 10+ years of hands-on experience behind him.']];
let py=ab+30;for(const [h,p] of paras){R(A,740,py+4,4,72,C.tanD,1,'accent bar');T(A,h,762,py,{z:14,s:'SemiBold',c:C.tanD,u:true,ls:14});const t=T(A,p,762,py+24,{z:17,c:C.ink,w:580,lh:155});py=t.y+t.height+26;}
T(A,'Why homeowners choose Mike',740,py+6,{f:'Playfair Display',s:'Bold',z:24,c:C.ink});py+=52;
const why=[['The owner shows up','“Owner Mike came himself…” Isaiah C., Riverside'],['Price before the work','“upfront and honest with me on pricing” Sal C., Corona'],['Leaves it clean','“left the area super clean.” Julian T., Irvine'],['Free estimates + 15% off your first job','Mike’s own offer']];
why.forEach((w,i)=>{const g=F(A,'why: '+w[0],740,py+i*70,620,60,C.ink);HX(g,14,14,40,32,{stroke:C.tan,cut:9});SVG(g,IC.check(C.tan),24,20,20);T(g,w[0],70,9,{z:16,s:'SemiBold',c:C.cream});T(g,w[1],70,32,{z:13,c:C.mute});});
py+=why.length*70+20;T(A,'Mike',740,py,{f:'Yellowtail',z:56,c:C.ink,n:'signature (script accent)'});T(A,'Owner, Mike’s Plumbing Services',740,py+74,{z:14,c:C.muteD});
BTN(A,1020,py+14,'More about Mike',{k:'ink',h:60,w:250,icon:'arrow'});
A.resize(1440,Math.max(1100,py+180));out.about=A.id;
// MORE MIKE DOES box straddling services -> about (pattern breaker, like Paul's)
const mb=F(D,'More Mike does (straddles Services/About: pattern breaker)',80,y-90,1280,170,C.ink);mb.strokes=[solid(C.tan)];mb.strokeWeight=1.5;mb.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.25},offset:{x:0,y:14},radius:30,spread:0,visible:true,blendMode:'NORMAL'}];
T(mb,'MORE MIKE DOES',32,28,{z:12,s:'SemiBold',c:C.tan,ls:18});
let cx=32,cy=60;['Pressure washing','New installations','Rooter maintenance','Shut-off & stop valves','Hose bib moves','Automatic water shut-off','Leak repair'].forEach(c=>{const t=figma.createText();t.fontName={family:'Jost',style:'Medium'};t.characters=c+'  →';t.fontSize=14;const w=Math.ceil(t.width)+40;t.remove();if(cx+w>860){cx=32;cy+=46;}const g=F(mb,'chip: '+c,cx,cy,w,36,null);g.clipsContent=false;HX(g,0,0,w,36,{stroke:C.line,cut:10});T(g,c+'  →',20,8,{z:14,s:'Medium',c:C.cream});cx+=w+10;});
const dz=F(mb,'dashed: not on the list',900,26,350,118,null);dz.clipsContent=false;const dzr=R(dz,0,0,350,118,null);dzr.strokes=[solid(C.tan)];dzr.dashPattern=[6,5];dzr.strokeWeight=1.5;
T(dz,'NOT ON THE LIST?',24,22,{z:12,s:'SemiBold',c:C.tan,ls:16});T(dz,'Call Mike and ask. (951) 809-9533',24,48,{f:'Playfair Display',s:'Bold',z:19,c:C.cream,w:300,lh:120});
y+=A.height;
const c3=D.children.find(n=>n.name.includes('crosses into Services'));if(c3)D.appendChild(c3);
out.y=y;return out;
