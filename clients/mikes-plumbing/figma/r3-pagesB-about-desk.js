const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const D=await figma.getNodeByIdAsync('490:1245');const g=async id=>await figma.getNodeByIdAsync(id);
for(const id of ['535:790','535:858','535:877','490:1371','535:962']){const n=await g(id);if(n)n.remove();}
// ---------- LETTERS TO MIKE ----------
const S=F(D,'02 Letters to Mike: envelope reviews (Yelp, word for word)',0,784,1440,1100,C.cream);D.insertChild(3,S);
EYE(S,'Mail from customers',80,110);
TR(S,[['Letters ',{c:C.ink}],['to Mike.',{s:'Black Italic',c:C.tanD}]],80,160,{f:'Playfair Display',s:'Black',z:58,lh:104,w:700,n:'H2'});
T(S,'Three of his twenty Yelp reviews, word for word, laid out like the mail he gets. All twenty are five stars (read 17 Nov 2026).',880,170,{z:17,c:C.muteD,w:480,lh:155});
const L=[['Mike was great , he responded very quickly and he was honest,efficient and very respectful.He addressed all my plumbing issues and suggested the best option which was to caulk the base of one toilet and replace the other toilet. His price was very fair and within my budget. I will call him when I am ready to upgrade the bathroom because I know I can trust him','Laura G.','Clarksville, TN','Aug 20, 2025','AUG 20 2025'],
['Mike was a pleasure to work with. He came by and did exactly what was needed. We wanted our hose pipe moved back a few feet from its current location. He was able to come out and complete the job in one afternoon. I’d highly recommend going with Mike’s Plumbing Services for your plumbing needs!','Pamela N.','Menifee, CA','Jul 30, 2025','JUL 30 2025'],
['Highly recommend Mike for all your plumbing needs. We replaced 3 toilets and a pressure regulator. As requested, he coordinated his work with other repairs being done on the property. He’s reasonably priced, detailed & patient. Call him!','Eleanor M.','Los Angeles, CA','Jul 10, 2026','JUL 10 2026']];
const EW=380;let maxB=0;const envs=[];
L.forEach((l,i)=>{const x=80+i*(EW+50);const E=F(S,'envelope: '+l[1]+' (Yelp, word for word)',x,330,EW,600,null);E.clipsContent=false;
 // letter
 const lt=F(E,'letter',20,0,EW-40,400,C.paper);lt.effects=[{type:'DROP_SHADOW',color:{r:0.06,g:0.05,b:0.04,a:0.10},offset:{x:0,y:4},radius:10,spread:0,visible:true,blendMode:'NORMAL'}];
 T(lt,'Dear Mike,',24,22,{f:'Yellowtail',z:26,c:C.ink});
 const q=T(lt,'“'+l[0]+'”',24,66,{f:'Playfair Display',s:'Italic',z:16,c:C.ink,w:EW-88,lh:148});
 const sg=T(lt,'— '+l[1],24,q.y+q.height+12,{f:'Yellowtail',z:24,c:C.ink});
 const lh=sg.y+sg.height+120;lt.resize(EW-40,lh);
 for(let r=66;r<lh-110;r+=Math.round(16*1.48)){const rl=R(lt,24,r+20,EW-88,1,C.tan,0.35,'letter ruling');lt.insertChild(0,rl);}
 // flap behind letter
 const ey=lh-110;const flap=figma.createVector();flap.vectorPaths=[{windingRule:'NONZERO',data:`M 0 ${ey+4} L ${EW/2} ${ey-120} L ${EW} ${ey+4} Z`}];flap.fills=[solid(C.tanD)];flap.name='open flap';E.insertChild(0,flap);
 const back=R(E,0,ey,EW,230,'#B9A983',1,'envelope back');E.insertChild(1,back);
 // pocket front
 const pk=figma.createVector();pk.vectorPaths=[{windingRule:'NONZERO',data:`M 0 ${ey} L ${EW/2} ${ey+78} L ${EW} ${ey} L ${EW} ${ey+230} L 0 ${ey+230} Z`}];pk.fills=[solid(C.tan)];pk.strokes=[solid(C.tanD,0.5)];pk.strokeWeight=1;pk.name='envelope pocket';E.appendChild(pk);
 const fy=ey+96;
 T(E,'FROM',24,fy,{z:10,s:'Bold',c:C.muteD,ls:30});
 T(E,l[1]+' · '+l[2],24,fy+18,{f:'Playfair Display',s:'Bold',z:17,c:C.ink});
 STARS(E,24,fy+50,12,'#C99A2E');
 T(E,'Yelp · '+l[3],24,fy+72,{z:12,s:'SemiBold',c:C.muteD});
 T(E,'To: Mike · Mike’s Plumbing Services · Riverside, CA',24,fy+102,{f:'Jost',s:'Medium',z:11,c:C.muteD});
 // stamp + postmark
 const st=F(E,'stamp: Yelp',EW-86,fy-6,62,76,C.paper);st.clipsContent=false;PERF(st,0,-5,62,C.tan,{d:8,gap:5});PERF(st,0,71,62,C.tan,{d:8,gap:5});
 R(st,5,5,52,66,C.yelp,1,'stamp art');T(st,'y',0,12,{s:'Bold',z:34,c:C.white,w:62,a:'CENTER'});T(st,'YELP',0,52,{z:9,s:'Bold',c:C.white,w:62,a:'CENTER',ls:20});
 const pm=CIRC(E,EW-150,fy+4,62,{stroke:C.ink,sw:1.2,n:'postmark ring'});pm.opacity=0.55;
 const pd=T(E,l[4],EW-150,fy+24,{z:9,s:'Bold',c:C.ink,w:62,a:'CENTER',ls:6});pd.opacity=0.6;
 for(let w=0;w<3;w++){const wv=figma.createVector();let d='M 0 0';for(let k=1;k<=6;k++)d+=` Q ${k*12-6} ${k%2?-4:4} ${k*12} 0`;wv.vectorPaths=[{windingRule:'NONE',data:d}];wv.strokes=[solid(C.ink,0.45)];wv.strokeWeight=1.2;wv.fills=[];wv.name='cancel wave';E.appendChild(wv);wv.x=EW-196;wv.y=fy+20+w*10;}
 E.resize(EW,ey+230);E.rotation=[-2,1.5,-1][i];E.y=330+[20,0,30][i];envs.push(E);maxB=Math.max(maxB,E.y+E.height);});
BTN(S,80,maxB+60,'Read all 20 on Yelp',{k:'ink',h:56,w:250,z:15,icon:'arrow'});
T(S,'Each letter shows the reviewer’s own town as listed on Yelp.',360,maxB+78,{z:13,c:C.muteD,w:700});
S.resize(1440,maxB+180);
// ---------- THE FAMILY TRADE: engraved pipe timeline ----------
const TL=F(D,'06 The family trade: engraved pipe timeline (no invented years)',0,0,1440,820,C.paper);
EYE(TL,'How Mike got here',80,110);
TR(TL,[['The family ',{c:C.ink}],['trade.',{s:'Black Italic',c:C.tanD}]],80,160,{f:'Playfair Display',s:'Black',z:58,lh:104,w:700,n:'H2'});
T(TL,'No made-up years. Only what Mike says on his Yelp page, and what anyone can check today.',880,170,{z:17,c:C.muteD,w:480,lh:155});
const py=470,x0=80,x1=1240;
// engraved pipe: two rules + hatching
R(TL,x0,py-12,x1-x0,1.5,C.ink,1,'pipe wall top');R(TL,x0,py+12,x1-x0,1.5,C.ink,1,'pipe wall bottom');
for(let hx=x0+4;hx<x1;hx+=7){const h=figma.createVector();h.vectorPaths=[{windingRule:'NONE',data:`M 0 0 L 8 22`}];h.strokes=[solid(C.ink,0.55)];h.strokeWeight=0.8;h.fills=[];h.name='engraving hatch';TL.appendChild(h);h.x=hx;h.y=py-11;}
// end cap + arrow out
const cap=R(TL,x1,py-20,18,40,C.ink,1,'pipe end cap');
const ar=figma.createVector();ar.vectorPaths=[{windingRule:'NONE',data:'M 0 0 L 60 0 M 46 -10 L 60 0 L 46 10'}];ar.strokes=[solid(C.ink)];ar.strokeWeight=2;ar.fills=[];ar.name='flow arrow';TL.appendChild(ar);ar.x=x1+28;ar.y=py-10;
const st=[['I','The family trade','Mike started in his family’s grease business, before plumbing on his own.','Yelp, About the business',-1],
['II','10+ years hands-on','“Over 10 years of hands-on experience,” in Mike’s own words on Yelp.','Yelp, About the business',1],
['III','Est. 2025','He branched out on his own: Mike’s Plumbing Services. First Yelp review: 12 Jun 2025.','Yelp history + his logo',-1],
['IV','Today','20 Yelp reviews, every one of them five stars.','Read 17 Nov 2026',1]];
st.forEach((s,i)=>{const cx=x0+130+i*300;
 const nut=F(TL,'station '+s[0]+': '+s[1],cx-36,py-36,72,72,null);nut.clipsContent=false;HX(nut,0,0,72,72,{fill:C.paper,stroke:C.ink,sw:1.5,cut:18});HX(nut,8,8,56,56,{stroke:C.ink,sw:0.8,cut:14});
 T(nut,s[0],0,22,{f:'Jost',s:'Bold',z:22,c:C.ink,w:72,a:'CENTER'});
 const up=s[4]<0;const tb=F(TL,'station text '+s[0],cx-120,0,240,10,null);tb.clipsContent=false;
 T(tb,s[1].toUpperCase(),0,0,{f:'Jost',s:'Bold',z:13,c:C.tanD,w:240,a:'CENTER',ls:24});
 const b=T(tb,s[2],0,28,{f:'Playfair Display',s:'Italic',z:16,c:C.ink,w:240,a:'CENTER',lh:145});
 const src=T(tb,s[3],0,b.y+b.height+8,{z:11,s:'SemiBold',c:C.muteD,w:240,a:'CENTER'});tb.resize(240,src.y+src.height);
 tb.y=up?py-70-tb.height:py+70;
 R(TL,cx,up?py-70+8:py+36,1,26,C.ink,0.6,'leader tick');
 });
T(TL,'Next: your job',x1-100,py-110,{f:'Yellowtail',z:26,c:C.ink,w:240,a:'RIGHT'});
T(TL,'Call (951) 809-9533',x1-100,py-70,{f:'Playfair Display',s:'Black',z:18,c:C.ink,w:240,a:'RIGHT'});
D.insertChild(D.children.indexOf(await g('490:1394')),TL);
// restack
const order=['490:1246','490:1256','490:1272',S.id,'490:1293','490:1316',TL.id,'490:1394','535:895'];
let y=0;for(const id of order){const n=await g(id);n.y=y;y+=n.height;}
const story=await g('490:1293'),vals=await g('490:1316');
const tk=await g('535:878');tk.y=story.y+story.height-tk.height/2;D.appendChild(tk);
const wv=await g('535:891');wv.y=vals.y+vals.height-70;
const ct=await g('535:895');(await g('535:961')).y=ct.y;
const ft=(await g('556:2551')).clone();D.appendChild(ft);ft.x=0;ft.y=y;ft.name='12 Footer: the owner’s mark (clone of Home)';y+=ft.height;
D.resize(1440,y);
return {S:S.id,TL:TL.id,ft:ft.id,h:y};
