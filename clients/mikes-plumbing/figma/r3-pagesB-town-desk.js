const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const D=await figma.getNodeByIdAsync('486:2262');const g=async id=>await figma.getNodeByIdAsync(id);
for(const id of ['486:2370','532:808','532:889']){const n=await g(id);if(n)n.remove();}
const S=F(D,'S2 Greetings from Riverside: postcard reviews (Yelp + Nextdoor, word for word)',0,784,1440,1120,C.paper);D.insertChild(3,S);
EYE(S,'Reviews from Riverside',80,110);
TR(S,[['Riverside says ',{c:C.ink}],['call Mike.',{s:'Black Italic',c:C.tanD}]],80,160,{f:'Playfair Display',s:'Black',z:58,lh:104,w:760,n:'H2'});
T(S,'Two real reviews from Riverside neighbors, word for word: Isaiah C. on Yelp and P.H. on Nextdoor. Mike’s Yelp: 5.0 from 20 reviews (read 17 Nov 2026).',880,170,{z:17,c:C.muteD,w:480,lh:155});
// postcard
const PC=F(S,'postcard (front + back)',140,320,1160,640,C.cream);PC.strokes=[solid(C.tanD)];PC.strokeWeight=1.5;PC.effects=[{type:'DROP_SHADOW',color:{r:0.06,g:0.05,b:0.04,a:0.18},offset:{x:0,y:18},radius:40,spread:0,visible:true,blendMode:'NORMAL'}];
const fr=F(PC,'front: Greetings from Riverside (letters filled with Mike’s real van photo)',20,20,560,600,C.ink);
const inb=R(fr,14,14,532,572,null,1,'inner border');inb.strokes=[solid(C.tan,0.7)];inb.strokeWeight=1;inb.dashPattern=[3,4];
T(fr,'Greetings from',0,58,{f:'Yellowtail',z:54,c:C.cream,w:560,a:'CENTER'});
const L1=T(fr,'RIVER',0,128,{f:'Playfair Display',s:'Black',z:170,c:C.cream,w:560,a:'CENTER',lh:100});
const L2=T(fr,'SIDE',0,L1.y+L1.height-24,{f:'Playfair Display',s:'Black',z:170,c:C.cream,w:560,a:'CENTER',lh:100});
for(const t of [L1,L2]){t.fills=[{type:'IMAGE',imageHash:H.van,scaleMode:'FILL'}];t.strokes=[solid(C.cream)];t.strokeWeight=2;t.strokeAlign='OUTSIDE';t.letterSpacing={unit:'PERCENT',value:-2};}
T(fr,'CALIFORNIA · INLAND EMPIRE',0,L2.y+L2.height+14,{f:'Jost',s:'Bold',z:14,c:C.tan,w:560,a:'CENTER',ls:34});
T(fr,'Home base of Mike’s Plumbing Services',0,540,{f:'Yellowtail',z:22,c:C.tan,w:560,a:'CENTER'});
// back
const bx=600;const div=R(PC,bx+300,60,1,520,C.tanD,0.6,'postcard divider');
T(PC,'POST CARD',bx+20,32,{f:'Jost',s:'Bold',z:12,c:C.tanD,ls:40});
STARS(PC,bx+20,92,14,'#C99A2E');const ym=R(PC,bx+246,88,22,22,C.yelp,1,'yelp mark');T(PC,'y',bx+252,88,{s:'Bold',z:15,c:C.white});
const q=T(PC,'“Owner Mike came himself and took care of issues I had with my toilet and sink. Was on time and took care of everything pretty quick. Left everything clean and working perfectly. Thank you Mike!”',bx+20,126,{f:'Playfair Display',s:'Italic',z:21,c:C.ink,w:262,lh:142});
T(PC,'Isaiah C.',bx+20,q.y+q.height+16,{f:'Yellowtail',z:28,c:C.ink});
T(PC,'Riverside, CA · Jun 12, 2025 · Yelp',bx+20,q.y+q.height+56,{z:12,s:'SemiBold',c:C.tanD,w:262});
// stamp + postmark
const st=F(PC,'postage stamp: 5.0 on Yelp',bx+420,40,112,134,C.paper);st.clipsContent=false;
PERF(st,0,-7,112,C.cream,{d:12,gap:6});PERF(st,0,127,112,C.cream,{d:12,gap:6});
const sb=R(st,8,8,96,118,null,1,'stamp frame');sb.strokes=[solid(C.ink)];sb.strokeWeight=1.5;
T(st,'5.0',0,26,{f:'Jost',s:'Bold',z:40,c:C.ink,w:112,a:'CENTER'});STARS(st,56-5*11/2,80,9,'#C99A2E');T(st,'YELP · 20',0,98,{z:10,s:'Bold',c:C.tanD,w:112,a:'CENTER',ls:16});
const pm=SEAL(PC,bx+340,92,118,'RIVERSIDE · CALIFORNIA · ',{fg:C.tanD,bg:null,rz:10,band:24,n:'postmark',rot:-12});T(pm,'HOME',0,44,{f:'Jost',s:'Bold',z:13,c:C.tanD,w:118,a:'CENTER',ls:20});T(pm,'BASE',0,60,{f:'Jost',s:'Bold',z:13,c:C.tanD,w:118,a:'CENTER',ls:20});pm.opacity=0.85;
for(let i=0;i<4;i++){const w=figma.createVector();let d='M 0 0';for(let k=1;k<=12;k++)d+=` Q ${k*14-7} ${k%2?-6:6} ${k*14} 0`;w.vectorPaths=[{windingRule:'NONE',data:d}];w.strokes=[solid(C.tanD,0.7)];w.strokeWeight=1.5;w.fills=[];w.name='cancel wave';PC.appendChild(w);w.x=bx+250;w.y=212+i*12;}
// address lines
T(PC,'TO',bx+320,300,{f:'Jost',s:'Bold',z:11,c:C.tanD,ls:30});
const addr=['Anyone in Riverside','who needs a plumber','Call (951) 809-9533','Free estimates · 15% off first job'];
addr.forEach((a,i)=>{R(PC,bx+320,360+i*52,220,1,C.tanD,0.7,'address line');T(PC,a,bx+320,330+i*52,{f:i===2?'Playfair Display':'Jost',s:i===2?'Black':'Medium',z:i===2?20:15,c:C.ink});});
PC.rotation=-1.2;
// Nextdoor note clipped on the card
const nd=F(S,'note: Nextdoor neighbor (P.H. · Riverside, word for word)',1040,860,290,170,C.white);nd.clipsContent=false;nd.strokes=[solid(C.tan)];nd.effects=[{type:'DROP_SHADOW',color:{r:0.06,g:0.05,b:0.04,a:0.16},offset:{x:0,y:10},radius:24,spread:0,visible:true,blendMode:'NORMAL'}];
R(nd,115,-14,60,26,C.tan,0.8,'tape');
T(nd,'NEXTDOOR · NEIGHBOR RECOMMENDATION',20,28,{z:10,s:'Bold',c:C.tanD,ls:14,w:250});
T(nd,'“good prices”',20,54,{f:'Playfair Display',s:'Black Italic',z:38,c:C.ink});
T(nd,'P.H. · Riverside',20,118,{z:13,s:'SemiBold',c:C.muteD});
nd.rotation=4;
BTN(S,140,1010,'Read all 20 on Yelp',{k:'ink',h:52,w:250,z:15,icon:'arrow'});
T(S,'Postcard letters show Mike’s own van photo.',410,1028,{z:13,c:C.muteD});
S.resize(1440,1120);
// restack: util, header, hero, postcard, S1, S3, S4, contact
const order=['486:2263','486:2273','486:2289',S.id,'486:2310','486:2428','486:2467','532:822'];
let y=0;for(const id of order){const n=await g(id);n.y=y;y+=n.height;}
const tk=await g('532:809');tk.y=S.y+S.height-tk.height/2;D.appendChild(tk);
const ct=await g('532:822');(await g('532:888')).y=ct.y;
const ft=(await g('556:2551')).clone();D.appendChild(ft);ft.x=0;ft.y=y;ft.name='12 Footer: the owner’s mark (clone of Home)';y+=ft.height;
D.resize(1440,y);
return {S:S.id,ft:ft.id,h:y};
