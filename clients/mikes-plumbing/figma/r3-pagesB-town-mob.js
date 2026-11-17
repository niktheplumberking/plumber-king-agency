const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const M=await figma.getNodeByIdAsync('486:2603');const g=async id=>await figma.getNodeByIdAsync(id);
for(const id of ['486:2694','538:5348','538:5356','486:2719']){const n=await g(id);if(n)n.remove();}
const S=F(M,'M2 Greetings from Riverside: postcard reviews (Yelp + Nextdoor, word for word)',0,911,390,1600,C.paper);M.insertChild(2,S);
EYE(S,'Reviews from Riverside',20,56);
TR(S,[['Riverside says\n',{c:C.ink}],['call Mike.',{s:'Black Italic',c:C.tanD}]],20,100,{f:'Playfair Display',s:'Black',z:40,lh:108,w:350,n:'H2'});
T(S,'Two real Riverside reviews, word for word: Isaiah C. on Yelp, P.H. on Nextdoor.',20,206,{z:15,c:C.muteD,w:350,lh:150});
// front
const fr=F(S,'postcard front: Greetings from Riverside (letters filled with Mike’s real van photo)',20,290,350,400,C.ink);fr.strokes=[solid(C.cream)];fr.strokeWeight=8;fr.strokeAlign='INSIDE';
const inb=R(fr,16,16,318,368,null,1,'inner border');inb.strokes=[solid(C.tan,0.7)];inb.dashPattern=[3,4];
T(fr,'Greetings from',0,40,{f:'Yellowtail',z:36,c:C.cream,w:350,a:'CENTER'});
const L1=T(fr,'RIVER',0,96,{f:'Playfair Display',s:'Black',z:96,c:C.cream,w:350,a:'CENTER',lh:100});
const L2=T(fr,'SIDE',0,L1.y+L1.height-12,{f:'Playfair Display',s:'Black',z:96,c:C.cream,w:350,a:'CENTER',lh:100});
for(const t of [L1,L2]){t.fills=[{type:'IMAGE',imageHash:H.van,scaleMode:'FILL'}];t.strokes=[solid(C.cream)];t.strokeWeight=1.5;t.strokeAlign='OUTSIDE';}
T(fr,'CALIFORNIA · INLAND EMPIRE',0,L2.y+L2.height+12,{f:'Jost',s:'Bold',z:10,c:C.tan,w:350,a:'CENTER',ls:30});
T(fr,'Home base of Mike’s Plumbing Services',0,340,{f:'Yellowtail',z:16,c:C.tan,w:350,a:'CENTER'});
fr.rotation=-1.5;
// back
const bk=F(S,'postcard back: Isaiah C. (Yelp, word for word)',20,720,350,10,C.cream);bk.strokes=[solid(C.tanD)];bk.strokeWeight=1;bk.clipsContent=false;
T(bk,'POST CARD',20,24,{f:'Jost',s:'Bold',z:11,c:C.tanD,ls:40});
const st=F(bk,'postage stamp: 5.0 on Yelp',250,20,80,96,C.paper);st.clipsContent=false;PERF(st,0,-5,80,C.cream,{d:9,gap:5});PERF(st,0,91,80,C.cream,{d:9,gap:5});
const sb=R(st,6,6,68,84,null,1,'stamp frame');sb.strokes=[solid(C.ink)];sb.strokeWeight=1.2;
T(st,'5.0',0,18,{f:'Jost',s:'Bold',z:28,c:C.ink,w:80,a:'CENTER'});STARS(st,40-5*8/2,56,7,'#C99A2E');T(st,'YELP · 20',0,68,{z:8,s:'Bold',c:C.tanD,w:80,a:'CENTER',ls:14});
const pm=SEAL(bk,186,56,84,'RIVERSIDE · CALIFORNIA · ',{fg:C.tanD,bg:null,rz:8,band:18,n:'postmark',rot:-12});T(pm,'HOME',0,30,{f:'Jost',s:'Bold',z:10,c:C.tanD,w:84,a:'CENTER',ls:16});T(pm,'BASE',0,42,{f:'Jost',s:'Bold',z:10,c:C.tanD,w:84,a:'CENTER',ls:16});pm.opacity=0.85;
STARS(bk,20,62,12,'#C99A2E');R(bk,20,84,18,18,C.yelp,1,'yelp mark');T(bk,'y',25,84,{s:'Bold',z:13,c:C.white});
const q=T(bk,'“Owner Mike came himself and took care of issues I had with my toilet and sink. Was on time and took care of everything pretty quick. Left everything clean and working perfectly. Thank you Mike!”',20,140,{f:'Playfair Display',s:'Italic',z:18,c:C.ink,w:310,lh:145});
T(bk,'Isaiah C.',20,q.y+q.height+12,{f:'Yellowtail',z:26,c:C.ink});
const at=T(bk,'Riverside, CA · Jun 12, 2025 · Yelp',20,q.y+q.height+50,{z:11,s:'SemiBold',c:C.tanD});
let ay=at.y+at.height+26;R(bk,20,ay,310,1,C.tanD,0.5,'postcard divider');ay+=18;
T(bk,'TO',20,ay,{f:'Jost',s:'Bold',z:10,c:C.tanD,ls:30});ay+=22;
['Anyone in Riverside who needs a plumber','Call (951) 809-9533'].forEach((a,i)=>{const t=T(bk,a,20,ay,{f:i?'Playfair Display':'Jost',s:i?'Black':'Medium',z:i?19:14,c:C.ink});ay+=t.height+6;R(bk,20,ay,200,1,C.tanD,0.7,'address line');ay+=14;});
bk.resize(350,ay+70);bk.rotation=1;
const nd=F(S,'note: Nextdoor neighbor (P.H. · Riverside, word for word)',170,bk.y+bk.height-60,200,128,C.white);nd.clipsContent=false;nd.strokes=[solid(C.tan)];nd.effects=[{type:'DROP_SHADOW',color:{r:0.06,g:0.05,b:0.04,a:0.16},offset:{x:0,y:8},radius:18,spread:0,visible:true,blendMode:'NORMAL'}];
R(nd,70,-11,56,22,C.tan,0.8,'tape');
T(nd,'NEXTDOOR NEIGHBOR',16,20,{z:9,s:'Bold',c:C.tanD,ls:14});
T(nd,'“good prices”',16,40,{f:'Playfair Display',s:'Black Italic',z:27,c:C.ink});
T(nd,'P.H. · Riverside',16,90,{z:12,s:'SemiBold',c:C.muteD});
nd.rotation=4;
const by=nd.y+nd.height+30;BTN(S,20,by,'Read all 20 on Yelp',{k:'ink',h:52,w:350,z:15,icon:'arrow'});
T(S,'Postcard letters show Mike’s own van photo.',20,by+66,{z:12,c:C.muteD});
S.resize(390,by+130);
const order=['486:2604','486:2614',S.id,'486:2634','486:2738','486:2766','486:2797'];
let y=0;for(const id of order){const n=await g(id);n.y=y;y+=n.height;}
const tk=await g('538:5349');tk.y=S.y+S.height-tk.height/2;M.appendChild(tk);
const ft=(await g('557:1020')).clone();M.appendChild(ft);ft.x=0;ft.y=y;ft.name='Mobile footer: the owner’s mark (clone of Home)';y+=ft.height;
const sy=await g('538:5386');sy.y=y;M.appendChild(sy);y+=sy.height;
M.appendChild(await g('486:2604'));
M.resize(390,y);
return {S:S.id,ft:ft.id,h:y};
