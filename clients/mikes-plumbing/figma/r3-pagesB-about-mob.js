const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const M=await figma.getNodeByIdAsync('490:1531');const g=async id=>await figma.getNodeByIdAsync(id);
for(const id of ['538:5578','538:5621','538:5640','490:1639','538:5648']){const n=await g(id);if(n)n.remove();}
// ---------- LETTERS (mobile): stacked envelopes ----------
const S=F(M,'M2 Letters to Mike: envelope reviews (Yelp, word for word)',0,941,390,2000,C.cream);M.insertChild(2,S);
EYE(S,'Mail from customers',20,56);
TR(S,[['Letters\n',{c:C.ink}],['to Mike.',{s:'Black Italic',c:C.tanD}]],20,100,{f:'Playfair Display',s:'Black',z:40,lh:108,w:350,n:'H2'});
T(S,'Three of his twenty Yelp reviews, word for word. All twenty are five stars (read 17 Nov 2026).',20,206,{z:15,c:C.muteD,w:350,lh:150});
const L=[['Mike was great , he responded very quickly and he was honest,efficient and very respectful.He addressed all my plumbing issues and suggested the best option which was to caulk the base of one toilet and replace the other toilet. His price was very fair and within my budget. I will call him when I am ready to upgrade the bathroom because I know I can trust him','Laura G.','Clarksville, TN','Aug 20, 2025','AUG 20 2025'],
['Mike was a pleasure to work with. He came by and did exactly what was needed. We wanted our hose pipe moved back a few feet from its current location. He was able to come out and complete the job in one afternoon. I’d highly recommend going with Mike’s Plumbing Services for your plumbing needs!','Pamela N.','Menifee, CA','Jul 30, 2025','JUL 30 2025'],
['Highly recommend Mike for all your plumbing needs. We replaced 3 toilets and a pressure regulator. As requested, he coordinated his work with other repairs being done on the property. He’s reasonably priced, detailed & patient. Call him!','Eleanor M.','Los Angeles, CA','Jul 10, 2026','JUL 10 2026']];
const EW=340;let ey0=300;
L.forEach((l,i)=>{const E=F(S,'envelope: '+l[1]+' (Yelp, word for word)',25,ey0,EW,600,null);E.clipsContent=false;
 const lt=F(E,'letter',16,0,EW-32,400,C.paper);lt.effects=[{type:'DROP_SHADOW',color:{r:0.06,g:0.05,b:0.04,a:0.10},offset:{x:0,y:4},radius:10,spread:0,visible:true,blendMode:'NORMAL'}];
 T(lt,'Dear Mike,',20,18,{f:'Yellowtail',z:24,c:C.ink});
 const q=T(lt,'“'+l[0]+'”',20,58,{f:'Playfair Display',s:'Italic',z:15,c:C.ink,w:EW-72,lh:148});
 const sg=T(lt,'— '+l[1],20,q.y+q.height+10,{f:'Yellowtail',z:22,c:C.ink});
 const lh=sg.y+sg.height+100;lt.resize(EW-32,lh);
 for(let r=58;r<lh-90;r+=22){const rl=R(lt,20,r+19,EW-72,1,C.tan,0.35,'letter ruling');lt.insertChild(0,rl);}
 const ey=lh-90;
 const pk=figma.createVector();pk.vectorPaths=[{windingRule:'NONZERO',data:`M 0 ${ey} L ${EW/2} ${ey+64} L ${EW} ${ey} L ${EW} ${ey+190} L 0 ${ey+190} Z`}];pk.fills=[solid(C.tan)];pk.strokes=[solid(C.tanD,0.5)];pk.strokeWeight=1;pk.name='envelope pocket';E.appendChild(pk);
 const fy=ey+84;
 T(E,'FROM',20,fy,{z:9,s:'Bold',c:C.muteD,ls:30});
 T(E,l[1],20,fy+16,{f:'Playfair Display',s:'Bold',z:17,c:C.ink});
 STARS(E,20,fy+46,11,'#C99A2E');
 T(E,l[2]+' · Yelp · '+l[3],20,fy+66,{z:11,s:'SemiBold',c:C.muteD});
 T(E,'To: Mike · Mike’s Plumbing Services · Riverside, CA',20,fy+88,{z:10,s:'Medium',c:C.muteD});
 const st=F(E,'stamp: Yelp',EW-72,fy-2,52,64,C.paper);st.clipsContent=false;PERF(st,0,-4,52,C.tan,{d:7,gap:4});PERF(st,0,60,52,C.tan,{d:7,gap:4});
 R(st,4,4,44,56,C.yelp,1,'stamp art');T(st,'y',0,4,{s:'Bold',z:26,c:C.white,w:52,a:'CENTER'});T(st,'YELP',0,44,{z:8,s:'Bold',c:C.white,w:52,a:'CENTER',ls:20});
 const pm=CIRC(E,EW-128,fy-30,54,{stroke:C.ink,sw:1.1,n:'postmark ring'});pm.opacity=0.55;
 const pd=T(E,l[4],EW-128,fy-12,{z:8,s:'Bold',c:C.ink,w:54,a:'CENTER',ls:6});pd.opacity=0.6;
 for(let w=0;w<3;w++){const wv=figma.createVector();let d='M 0 0';for(let k=1;k<=5;k++)d+=` Q ${k*10-5} ${k%2?-3:3} ${k*10} 0`;wv.vectorPaths=[{windingRule:'NONE',data:d}];wv.strokes=[solid(C.ink,0.45)];wv.strokeWeight=1;wv.fills=[];wv.name='cancel wave';E.appendChild(wv);wv.x=EW-168;wv.y=fy-14+w*9;}
 E.resize(EW,ey+190);E.rotation=[-1.5,1.2,-1][i];ey0+=E.height+44;});
BTN(S,20,ey0+6,'Read all 20 on Yelp',{k:'ink',h:52,w:350,z:15,icon:'arrow'});
S.resize(390,ey0+110);
// ---------- THE FAMILY TRADE (mobile): vertical engraved pipe ----------
const TL=F(M,'Mobile the family trade: engraved pipe timeline (no invented years)',0,0,390,900,C.paper);
EYE(TL,'How Mike got here',20,56);
TR(TL,[['The family\n',{c:C.ink}],['trade.',{s:'Black Italic',c:C.tanD}]],20,100,{f:'Playfair Display',s:'Black',z:40,lh:108,w:350,n:'H2'});
T(TL,'No made-up years. Only what Mike says on Yelp, and what anyone can check today.',20,206,{z:15,c:C.muteD,w:350,lh:150});
const st=[['I','The family trade','Mike started in his family’s grease business, before plumbing on his own.','Yelp, About the business'],
['II','10+ years hands-on','“Over 10 years of hands-on experience,” in Mike’s own words on Yelp.','Yelp, About the business'],
['III','Est. 2025','He branched out on his own: Mike’s Plumbing Services. First Yelp review: 12 Jun 2025.','Yelp history + his logo'],
['IV','Today','20 Yelp reviews, every one of them five stars.','Read 17 Nov 2026']];
const px=48,top=300;let y=top+10;const nuts=[];
st.forEach(s=>{const tb=F(TL,'station text '+s[0],104,y,266,10,null);tb.clipsContent=false;
 T(tb,s[1].toUpperCase(),0,0,{f:'Jost',s:'Bold',z:12,c:C.tanD,ls:24});
 const b=T(tb,s[2],0,24,{f:'Playfair Display',s:'Italic',z:16,c:C.ink,w:266,lh:145});
 const sr=T(tb,s[3],0,b.y+b.height+6,{z:11,s:'SemiBold',c:C.muteD,w:266});tb.resize(266,sr.y+sr.height);
 nuts.push([s[0],y]);y+=tb.height+48;});
const bot=y+30;
R(TL,px-12,top,1.5,bot-top,C.ink,1,'pipe wall left');R(TL,px+12,top,1.5,bot-top,C.ink,1,'pipe wall right');
for(let hy=top+4;hy<bot;hy+=7){const h=figma.createVector();h.vectorPaths=[{windingRule:'NONE',data:'M 0 0 L 22 8'}];h.strokes=[solid(C.ink,0.55)];h.strokeWeight=0.8;h.fills=[];h.name='engraving hatch';TL.appendChild(h);h.x=px-11;h.y=hy;}
R(TL,px-20,bot,40,16,C.ink,1,'pipe end cap');
for(const [n,ny] of nuts){const nut=F(TL,'station '+n,px-28,ny-6,56,56,null);nut.clipsContent=false;HX(nut,0,0,56,56,{fill:C.paper,stroke:C.ink,sw:1.5,cut:14});HX(nut,6,6,44,44,{stroke:C.ink,sw:0.8,cut:11});T(nut,n,0,16,{f:'Jost',s:'Bold',z:18,c:C.ink,w:56,a:'CENTER'});R(TL,px+28,ny+22,20,1,C.ink,0.6,'leader tick');}
T(TL,'Next: your job',104,bot-14,{f:'Yellowtail',z:24,c:C.ink});
T(TL,'Call (951) 809-9533',104,bot+20,{f:'Playfair Display',s:'Black',z:18,c:C.ink});
TL.resize(390,bot+90);
M.insertChild(M.children.indexOf(await g('490:1661')),TL);
// restack
const order=['490:1532','490:1542',S.id,'490:1562','490:1585',TL.id,'490:1661','490:1689'];
let yy=0;for(const id of order){const n=await g(id);n.y=yy;yy+=n.height;}
const story=await g('490:1562');const tk=await g('538:5641');tk.y=story.y+story.height-tk.height/2;M.appendChild(tk);
const ft=(await g('557:1020')).clone();M.appendChild(ft);ft.x=0;ft.y=yy;ft.name='Mobile footer: the owner’s mark (clone of Home)';yy+=ft.height;
const sy=await g('538:5678');sy.y=yy;M.appendChild(sy);yy+=sy.height;
M.appendChild(await g('490:1532'));
M.resize(390,yy);
return {S:S.id,TL:TL.id,ft:ft.id,h:yy};
