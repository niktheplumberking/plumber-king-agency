const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const D=await figma.getNodeByIdAsync('483:437');let y=5094;const out={};
// fixes from screenshot: licence chip position, reviews H2 line breaks
const He=D.children.find(n=>n.name==='03 Hero');const lc=He.children.find(n=>n.name.startsWith('trust chip: CSLB'));const off=He.findOne(n=>n.type==='TEXT'&&n.characters.startsWith('15% off for new'));if(lc&&off){lc.x=off.x+off.width+40;lc.y=off.y-8;}
const RV=D.children.find(n=>n.name.startsWith('02 Reviews'));const h2=RV.findOne(n=>n.type==='TEXT'&&n.name==='H2');
if(h2){h2.characters='Neighbors call\nhim first.';h2.setRangeFontName(0,15,{family:'Playfair Display',style:'Black'});h2.setRangeFills(0,15,[solid(C.ink)]);h2.setRangeFontName(15,25,{family:'Playfair Display',style:'Black Italic'});h2.setRangeFills(15,25,[solid(C.tanD)]);}
// 05 PROCESS (ink) — pipe through hex numbers, each step backed by a real Yelp line
const P=F(D,'05 How it works',0,y,1440,1000,C.ink);
const pb=HEAD(P,80,150,'How it works',[['From first call to '],['clean finish.',1]],'Five steps, and every one of them is something a real customer wrote about Mike on Yelp.',{dark:true,w:900,z:54});
const steps=[['Call or text','You reach Mike himself. No call center.','“Mike actually called me instead of back and forth messaging.”','Martha B.'],['He looks first','He finds the real cause and shows you.','“He took his time explaining everything in detail”','Jackie H., Fontana'],['Price first','Free estimate before any work starts.','“upfront and honest with me on pricing”','Sal C., Corona'],['The fix','Done right, no shortcuts.','“wasn’t gonna leave until fixed.”','Debbie H., Menifee'],['Clean up','He leaves it cleaner than he found it.','“left the area super clean.”','Julian T., Irvine']];
const ly=pb+120;const pipe=R(P,120,ly-4,1200,8,C.char2,1,'pipe');R(P,120,ly-1,1200,2,C.tan,1,'pipe line (passes through the numbers)');
steps.forEach((s,i)=>{const x=80+i*260;const cx=x+120;R(P,cx-3,ly,6,46,C.char2,1,'pipe drop');
 HX(P,cx-40,ly-28,80,56,{fill:C.tan,cut:16,n:'step badge'});T(P,String(i+1).padStart(2,'0'),cx-40,ly-14,{f:'Playfair Display',s:'Black',z:24,c:C.ink,w:80,a:'CENTER'});
 const c=F(P,'step card: '+s[0],x,ly+46,240,300,C.char);c.strokes=[solid(C.line)];T(c,s[0],22,24,{f:'Playfair Display',s:'Bold',z:22,c:C.cream,w:196});T(c,s[1],22,62,{z:14,c:C.mute,w:196,lh:150});
 R(c,22,130,2,90,C.tanD,1,'quote bar');const q=T(c,s[2],34,128,{f:'Playfair Display',s:'Italic',z:15,c:C.cream,w:184,lh:140});T(c,s[3]+' · Yelp',34,q.y+q.height+10,{z:12,c:C.tan,w:184});});
const bly=ly+46+300+50;T(P,'Step 1 starts here:',80,bly+18,{z:17,s:'SemiBold',c:C.cream});BTN(P,260,bly,'Call (951) 809-9533',{k:'cream',h:60,w:290,icon:'phone'});BTN(P,566,bly,'Get a free estimate',{k:'ghost',fg:C.cream,h:60,w:250});
AVATAR(P,1260,bly-20,96);T(P,'You talk to Mike,\nnot a call center.',1060,bly+6,{z:14,s:'Medium',c:C.mute,w:190,a:'RIGHT',lh:140});
P.resize(1440,bly+200);out.process=P.id;
const wv=WAVE3(D,0,y+P.height-70,1440,C.tan,{amp:14,seg:480,sw:3});out.wave=wv.id;y+=P.height;
// 06 OUR WORK (cream) — real job photos + IG tile
const G=F(D,'06 Our work (real photos)',0,y,1440,1100,C.cream);
const gb=HEAD(G,80,130,'Lately',[['Real jobs, '],['real photos.',1]],null,{w:800,z:54});
T(G,'See all of Mike’s work →',1140,gb-40,{z:16,s:'SemiBold',c:C.tanD});
const gl=[['roughin',80,gb+50,360,480,'Rough-in plumbing'],['backflow',460,gb+50,420,230,'Main line leak repair'],['yasphalt',460,gb+300,420,230,'Line repair, asphalt patched'],['yard',900,gb+50,460,300,'Site left clean']];
gl.forEach(g=>{IMGHX(G,g[1],g[2],g[3],g[4],g[0],{cutCorners:22,n:'photo (real): '+g[5]});const tg=F(G,'caption: '+g[5],g[1]+16,g[2]+g[4]-48,10,32,C.ink);const t=T(tg,g[5],12,6,{z:13,s:'Medium',c:C.cream});tg.resize(t.width+24,32);});
const ig=F(G,'IG tile (real: 43 posts, 17 Nov 2026)',900,gb+370,460,160,C.ink);SVG(ig,IC.ig(C.tan),28,28,30);T(ig,'43',28,74,{f:'Playfair Display',s:'Black',z:52,c:C.cream});T(ig,'posts on Mike’s Instagram.\nReal jobs, every week.',130,84,{z:15,c:C.mute,lh:140});T(ig,'@mikesplumbingservices →',240,30,{z:14,s:'SemiBold',c:C.tan});
T(G,'Town for each photo: Mike to confirm.',80,gb+560,{z:13,c:C.muteD});
G.resize(1440,gb+640);out.work=G.id;y+=G.height;
// 07 EMERGENCY band (photo bg, ink) — review card crosses into the next section
const E=F(D,'07 Emergency band',0,y,1440,760,C.ink);const eb=IMG(E,0,0,1440,760,'yyard2');eb.fills=[{type:'IMAGE',imageHash:H.yyard2,scaleMode:'FILL',filters:{exposure:-0.5,saturation:-0.8}}];R(E,0,0,1440,760,C.ink,0.82,'shade');
EYE(E,'Water where it shouldn’t be?',80,140,{c:C.tan});TR(E,[['Shut off the water.\n',{c:C.cream}],['Then call Mike.',{s:'Black Italic',c:C.tan}]],80,190,{f:'Playfair Display',s:'Black',z:64,lh:104,w:700,n:'H2'});
T(E,'Burst pipe, slab leak, sewage backing up? Don’t wait and see. Mike takes emergency calls. Exact hours: Mike to confirm.',80,350,{z:18,c:C.mute,w:600,lh:155});
BTN(E,80,450,'Call (951) 809-9533',{k:'cream',h:64,w:300,icon:'phone'});
const tips=[['Turn off the main shut-off valve (often near the street or where the line enters the house).'],['Keep away from outlets and the breaker panel if water is near them.']];tips.forEach((t,i)=>{const g=F(E,'safety tip',80,550+i*64,600,52,C.char);g.strokes=[solid(C.line)];SVG(g,IC.drop(C.tan),18,14,22);T(g,t[0],54,8,{z:14,c:C.cream,w:530,lh:135});});
T(E,'General safety tips · not a diagnosis.',80,684,{z:12,c:C.mute});
E.resize(1440,760);out.emergency=E.id;
const er=REVIEW(D,860,y+560,480,'Mike was here within two hours of our call. We found hime to be professional, friendly and efficient. His pricing is very reasonable and he is quick and clean with his work.','Suzi J.','Valley Center, CA','Aug 25, 2025',{z:16});er.name+=' (crosses into Commercial: pattern breaker)';er.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.3},offset:{x:0,y:18},radius:40,spread:0,visible:true,blendMode:'NORMAL'}];
const tg2=F(D,'name tag on emergency review',1180,y+538,150,46,null);tg2.clipsContent=false;HX(tg2,0,0,150,46,{fill:C.tan,cut:13});T(tg2,'fixed by',0,4,{z:10,s:'SemiBold',c:C.ink,w:150,a:'CENTER',u:true,ls:14});T(tg2,'Mike',0,12,{f:'Yellowtail',z:22,c:C.ink,w:150,a:'CENTER'});
out.cross2=er.id;out.cross2Bottom=er.y+er.height;y+=E.height;
for(const n of [...D.children])if(n.name.includes('crosses into')||n.name.startsWith('name tag on emergency'))D.appendChild(n);
out.y=y;return out;
