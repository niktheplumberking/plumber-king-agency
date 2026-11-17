const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const M=await figma.getNodeByIdAsync('532:437');
const g=async id=>await figma.getNodeByIdAsync(id);
const ix=async id=>M.children.indexOf(await g(id));
const ids={};
// ---------- reviews ----------
{const i=await ix('532:512');for(const id of ['532:512','532:609'])(await g(id)).remove();
 const S=F(M,'Mobile reviews: neighbors’ ledger (Yelp, word for word)',0,0,390,1900,C.paper);M.insertChild(i,S);ids.rev=S.id;
 EYE(S,'What neighbors say',20,72,{z:11});
 TR(S,[['Neighbors call\n',{c:C.ink}],['him first.',{s:'Black Italic',c:C.tanD}]],20,116,{f:'Playfair Display',s:'Black',z:46,lh:100,w:350,n:'H2'});
 T(S,'Every word below is copied from Mike’s Yelp page. Twenty reviews, every one five stars (read 17 Nov 2026).',20,224,{z:16,c:C.muteD,w:350,lh:155});
 const sd=260;const seal=SEAL(S,65,330,sd,'TWENTY YELP REVIEWS · ALL FIVE STARS · READ 17 NOV 2026 · ',{bg:C.paper,fg:C.ink,rz:10,band:36,n:'engraved seal: 5.0 on Yelp'});
 T(seal,'5.0',0,78,{f:'Playfair Display',s:'Black',z:74,c:C.ink,w:sd,a:'CENTER'});STARS(seal,sd/2-5*16/2,170,13,'#C99A2E');T(seal,'ON YELP',0,192,{z:10,s:'Bold',c:C.tanD,w:sd,a:'CENTER',ls:24});
 R(seal,sd/2-10,52,20,20,C.yelp,1,'yelp mark');T(seal,'y',sd/2-5,52,{s:'Bold',z:14,c:C.white});
 const np=F(S,'name patch: served by Mike',236,548,140,48,null);np.clipsContent=false;HX(np,0,0,140,48,{fill:C.ink,cut:15});T(np,'SERVED BY',0,6,{z:9,s:'Bold',c:C.tan,w:140,a:'CENTER',ls:20});T(np,'Mike',0,14,{f:'Yellowtail',z:24,c:C.cream,w:140,a:'CENTER'});np.rotation=6;
 const r1=[['Owner Mike came himself and took care of issues I had with my toilet and sink. Was on time and took care of everything pretty quick. Left everything clean and working perfectly. Thank you Mike!','Isaiah C.','Riverside, CA','Jun 12, 2025'],['Mike did a couple of jobs in my house! He’s my first phone call when I need a plumber.','Brandon A.','Los Angeles, CA','Aug 20, 2026']];
 const r2=[['Needed my garbage disposal repaired, he was quick and efficient! I value a clean plumber. 10 out of 10 recommend.','Janeth H.','Corona, CA','Jun 12, 2025'],['Great service responded fast and did the work same day Would recommend and will use again for any plumbing service that I may need','Erik N.','Buena Park, CA','Sep 4, 2025']];
 const l1=F(S,'marquee row 1 (swipe / drifts left)',0,640,390,380,null);let x=20;r1.forEach((r,k)=>{SLIP(l1,x,20,300,r[0],r[1],r[2],r[3],{no:'0'+(k+1),z:16,rot:k?0.8:-0.8});x+=316;});
 const l2=F(S,'marquee row 2 (drifts right)',0,1010,390,300,null);x=-210;r2.forEach((r,k)=>{SLIP(l2,x,10,300,r[0],r[1],r[2],r[3],{no:'0'+(k+3),z:16,rot:k?-0.8:0.8});x+=316;});
 T(S,'←  swipe for all 20',20,1320,{z:11,s:'SemiBold',c:C.tanD,ls:14,u:true});
 const tg=[['Insured','Mike’s own claim on IG','shield',{}],['Family owned','& operated · Est. 2025','home',{}],['Free estimates','+15% off first job','tag',{}],['CSLB lic. #','Mike to confirm','shield',{dashed:true}]];
 tg.forEach((t,k)=>TAG(S,20+(k%2)*180,1370+Math.floor(k/2)*180,170,t[0],t[1],null,{...t[3],rot:[1.5,-1,1,-1.5][k]}));
 BTN(S,20,1740,'Read all 20 on Yelp',{k:'ink',h:56,w:350,z:15,icon:'arrow'});T(S,'+ 3 neighbors recommend Mike on Nextdoor',20,1810,{z:14,s:'Medium',c:C.muteD,w:350,a:'CENTER'});
 S.resize(390,1870);}
// ---------- services ----------
{const i=await ix('532:628');for(const id of ['532:628','532:705'])(await g(id)).remove();
 const S=F(M,'Mobile services: Mike’s index',0,0,390,1500,C.ink);M.insertChild(i,S);ids.svc=S.id;
 EYE(S,'What Mike fixes',20,96,{c:C.tan,z:11});
 TR(S,[['Every pipe, drain and heater. ',{c:C.cream}],['Home',{s:'Black Italic',c:C.tan}],[' or business.',{c:C.cream}]],20,140,{f:'Playfair Display',s:'Black',z:36,lh:106,w:350,n:'H2'});
 T(S,'Tap the problem. The same owner shows up.',20,316,{z:16,c:C.mute,w:350,lh:150});
 const list=[['Drain cleaning & hydro jetting'],['Leak detection & slab leaks'],['Sewer lines & camera'],['Grease interceptors'],['Toilets, sinks & faucets'],['Pressure regulators & valves'],['Water heaters'],['Disposals & water filtration']];
 const L=F(S,'service index (row 01 open)',20,380,350,1060,null);L.clipsContent=false;let y=0;
 list.forEach((s,k)=>{const act=k===0;
  if(act){HX(L,-8,y,366,60,{fill:C.cream,cut:16,n:'active row (open)'});T(L,'01',10,y+21,{z:12,s:'Bold',c:C.tanD,ls:12});T(L,s[0],44,y+16,{f:'Playfair Display',s:'Black',z:18,c:C.ink});SVG(L,IC.arrow(C.ink),320,y+20,18,'row arrow');y+=72;
   IMGHX(L,0,y,350,220,'roots',{cutCorners:30,n:'photo: roots in a drain line (Mike’s IG)'});
   const c=F(L,'panel card',16,y+170,334,300,C.cream);
   T(c,'Snaking for simple clogs, hydro jetting when grease or roots are the problem. Camera first when it keeps coming back.',20,22,{z:15,c:C.muteD,w:294,lh:150});
   T(c,'Signs you need it',20,124,{z:11,s:'Bold',c:C.ink,ls:14,u:true});let px=20,py=148;['Slow drains','Gurgling','Sewer smell','Backups'].forEach(t=>{const tt=figma.createText();tt.fontName={family:'Jost',style:'Medium'};tt.characters=t;tt.fontSize=13;const w=Math.ceil(tt.width)+26;tt.remove();if(px+w>314){px=20;py+=38;}HX(c,px,py,w,30,{stroke:C.tanD,cut:8});T(c,t,px,py+6,{z:13,s:'Medium',c:C.ink,w,a:'CENTER'});px+=w+6;});
   BTN(c,20,234,'Call about this',{k:'ink',icon:'phone',h:50,w:294,z:15});y+=170+300+24;}
  else{T(L,String(k+1).padStart(2,'0'),0,y+20,{z:12,s:'Bold',c:C.tan,ls:12});T(L,s[0],36,y+15,{f:'Playfair Display',s:'Bold',z:18,c:C.cream});SVG(L,IC.arrow(C.tan),330,y+19,18,'row arrow');R(L,0,y+58,350,1,C.line,1,'row rule');y+=60;}});
 T(L,'Not listed? Call and ask: (951) 809-9533',0,y+16,{z:14,s:'Medium',c:C.tan});
 S.resize(390,380+y+180);
 const tb=F(M,'ticker band (solid, gap-free)',-120,0,630,52,C.tan);let x=24;for(const it of ['Friendly','Transparent','Proficient','Drain cleaning','Hydro jetting']){const t=T(tb,it,x,14,{f:'Playfair Display',s:'Black',z:18,c:C.ink,ls:6,u:true});x+=t.width+18;HX(tb,x,20,20,12,{fill:C.ink,cut:5});x+=38;}tb.rotation=-2;ids.tick=tb.id;}
// ---------- process ----------
{const i=await ix('534:776');(await g('534:776')).remove();
 const S=F(M,'Mobile how it works: work order No. 001',0,0,390,1800,C.ink);M.insertChild(i,S);ids.proc=S.id;
 EYE(S,'How it works',20,80,{c:C.tan,z:11});
 TR(S,[['From first call to\n',{c:C.cream}],['clean finish.',{s:'Black Italic',c:C.tan}]],20,124,{f:'Playfair Display',s:'Black',z:38,lh:104,w:350,n:'H2'});
 T(S,'Five lines on every job. Next to each: what a real customer wrote on Yelp.',20,212,{z:16,c:C.mute,w:350,lh:150});
 const TK=F(S,'work order ticket (cream paper)',16,310,358,1300,C.cream);TK.clipsContent=false;PERF(TK,0,-6,358,C.ink,{d:12,gap:12});
 T(TK,'WORK ORDER',22,30,{z:11,s:'Bold',c:C.tanD,ls:28});T(TK,'No. 001',22,48,{f:'Playfair Display',s:'Black',z:34,c:C.ink});R(TK,22,104,314,2,C.ink,1,'ticket rule');
 const rows=[['Call or text','You reach Mike himself. No call center, no app.','Mike actually called me instead of back and forth messaging.','Martha B., CA'],['He looks first','He finds the real cause and shows it to you.','He took his time explaining everything in detail…','Jackie H., Fontana'],['Price first','A free estimate before any work starts.','His price was very fair and within my budget.','Laura G.'],['The fix','Done right, with the parts on the truck.','…repaired water main to my house and installed new water heater all in one afternoon.','Robert U.'],['Clean up','He leaves the place cleaner than he found it.','I came home to a fixed leak and spotless work site.','Stuart W.']];
 let y=128;rows.forEach((r,k)=>{const cb=F(TK,'tick box '+(k+1),22,y+7,26,26,null);const cbr=R(cb,0,0,26,26,null);cbr.strokes=[solid(C.ink)];cbr.strokeWeight=2;SVG(cb,IC.check(C.tanD),3,3,20,'tick');
  const nb=F(TK,'step number '+(k+1),58,y,40,40,null);nb.clipsContent=false;HX(nb,0,0,40,40,{fill:C.ink,cut:10});const nt=T(nb,String(k+1),0,0,{s:'Bold',z:17,c:C.cream,w:40,a:'CENTER'});nt.textAutoResize='NONE';nt.resize(40,40);nt.textAlignVertical='CENTER';
  T(TK,r[0],110,y+6,{f:'Playfair Display',s:'Black',z:21,c:C.ink});
  const d=T(TK,r[1],22,y+52,{z:15,c:C.muteD,w:314,lh:145});const q=T(TK,'“'+r[2]+'”',22,d.y+d.height+10,{f:'Playfair Display',s:'Italic',z:16,c:C.ink,w:314,lh:140});
  const a=T(TK,'— '+r[3]+' · Yelp',22,q.y+q.height+6,{z:12,s:'SemiBold',c:C.tanD});y=a.y+a.height+20;if(k<4){R(TK,22,y-8,314,1,C.tan,1,'ruled line');y+=12;}});
 T(TK,'Signed',22,y+30,{z:11,s:'Bold',c:C.tanD,ls:18,u:true});T(TK,'Mike',84,y+4,{f:'Yellowtail',z:46,c:C.ink,n:'signature'});R(TK,80,y+62,170,1.5,C.ink,1,'signature line');
 STAMP(TK,230,y-6,120,'RIVERSIDE · CA · EST 2025 · RIVERSIDE · CA · ','JOB','DONE',{rot:-14,c:C.tanD,z:24,rz:9});
 TK.resize(358,y+110);TK.rotation=-1;
 BTN(S,20,310+y+150,'Call (951) 809-9533',{k:'cream',icon:'phone',h:58,w:350,z:16});
 S.resize(390,310+y+150+58+90);}
// ---------- emergency ----------
{const i=await ix('534:871');for(const id of ['534:871','534:893'])(await g(id)).remove();
 const S=F(M,'Mobile emergency: shut off the water',0,0,390,1200,C.ink);M.insertChild(i,S);ids.em=S.id;
 VALVE(S,170,40,300,C.tan);for(const p of S.findOne(n=>n.name.startsWith('engraving')).findAll(n=>n.type==='VECTOR'))p.strokeWeight=3;
 RINGTEXT(S,'TURN CLOCKWISE TO CLOSE · RIGHTY TIGHTY · TURN CLOCKWISE TO CLOSE · ',320,190,172,{f:'Jost',s:'Bold',z:10,c:C.tan});
 EYE(S,'Water where it shouldn’t be?',20,330,{c:C.tan,z:11});
 TR(S,[['Shut off the water.\n',{c:C.cream}],['Then call Mike.',{s:'Black Italic',c:C.tan}]],20,374,{f:'Playfair Display',s:'Black',z:40,lh:104,w:350,n:'H2'});
 T(S,'Burst pipe, slab leak, sewage backing up? Mike takes emergency calls (exact hours: Mike to confirm).',20,470,{z:16,c:C.mute,w:350,lh:150});
 const steps=[['Find the shut-off','Near the street or where the line enters the house. Turn it clockwise.'],['Stay clear of power','Keep away from outlets and the breaker panel if water is near.'],['Call or text a photo','(951) 809-9533. Mike tells you what to do while he drives.']];
 let y=574;steps.forEach((s,k)=>{const gg=F(S,'step: '+s[0],20,y,350,108,C.char);gg.strokes=[solid(C.line)];const nb=F(gg,'dial '+(k+1),18,18,36,36,null);nb.clipsContent=false;CIRC(nb,0,0,36,{stroke:C.tan,sw:1.5});const t=T(nb,String(k+1),0,0,{s:'Bold',z:15,c:C.tan,w:36,a:'CENTER'});t.textAutoResize='NONE';t.resize(36,36);t.textAlignVertical='CENTER';
  T(gg,s[0],70,18,{f:'Playfair Display',s:'Black',z:18,c:C.cream});T(gg,s[1],70,46,{z:13,c:C.mute,w:262,lh:140});y+=118;});
 T(S,'General safety tips · not a diagnosis',20,y,{z:12,c:C.muteD});
 BTN(S,20,y+34,'Call (951) 809-9533',{k:'cream',icon:'phone',h:60,w:350,z:17});
 const q=F(S,'pull quote: Suzi J. (Yelp, word for word)',20,y+120,350,90,null);q.clipsContent=false;T(q,'“',0,-14,{f:'Playfair Display',s:'Black',z:56,c:C.tan});const qt=T(q,'Mike was here within two hours of our call.',36,4,{f:'Playfair Display',s:'Italic',z:19,c:C.cream,w:310,lh:130});T(q,'Suzi J., Valley Center CA · Yelp · Aug 25, 2025',36,qt.height+12,{z:12,s:'SemiBold',c:C.tan});
 S.resize(390,y+260);}
// ---------- footer ----------
{const i=await ix('534:1072');(await g('534:1072')).remove();
 const S=F(M,'Mobile footer: the owner’s mark',0,0,390,1000,C.ink);M.insertChild(i,S);ids.ft=S.id;
 LOGO(S,20,56,140);TR(S,[['Plumbing done by the owner, ',{c:C.cream}],['start to finish.',{s:'Black Italic',c:C.tan}]],20,160,{f:'Playfair Display',s:'Black',z:28,lh:112,w:350});
 BTN(S,20,240,'Call (951) 809-9533',{k:'cream',icon:'phone',h:56,w:350,z:16});
 const cols=[['Services',['Drain cleaning','Leaks & slab leaks','Sewer & camera','Grease interceptors','Water heaters','Emergency']],['Company',['About Mike','Reviews','Our work','Service areas','Contact']]];
 cols.forEach((c,k)=>{const x=20+k*180;T(S,c[0],x,340,{z:11,s:'Bold',c:C.tan,ls:20,u:true});c[1].forEach((l,j)=>{T(S,l,x,370+j*34,{z:14,c:C.cream});R(S,x,370+j*34+26,160,1,C.line,1,'ledger line');});});
 const sd=150;const seal=SEAL(S,20,600,sd,'FAMILY OWNED & OPERATED · RIVERSIDE · CALIFORNIA · ',{fg:C.tan,rz:9,band:28,n:'engraved seal: family owned'});T(seal,'EST.',0,48,{z:10,s:'Bold',c:C.tan,w:sd,a:'CENTER',ls:30});T(seal,'2025',0,60,{f:'Playfair Display',s:'Black',z:30,c:C.cream,w:sd,a:'CENTER'});
 T(S,'(951) 809-9533',190,620,{f:'Playfair Display',s:'Black',z:22,c:C.cream});T(S,'mikesplumbingco25@gmail.com',190,654,{z:12,c:C.mute});T(S,'Hours: Mike to confirm',190,676,{z:12,c:C.mute});
 ['IG','Yelp','ND'].forEach((s,k)=>{HX(S,190+k*58,706,50,32,{stroke:C.tan,cut:9});T(S,s,190+k*58,713,{z:12,s:'SemiBold',c:C.cream,w:50,a:'CENTER'});});
 T(S,'© 2026 Mike’s Plumbing Services · Insured · CSLB licence #: Mike to confirm · Privacy · Terms · Website by Plumber King Agency',20,790,{z:12,c:C.mute,w:350,lh:150});
 T(S,'MIKE’S',-8,850,{f:'Playfair Display',s:'Black',z:150,c:C.cream,o:0.92,n:'giant wordmark (cropped)'});
 S.resize(390,980);}
// ---------- restack ----------
const order=['532:438','532:448','532:494',ids.rev,ids.svc,'532:712',ids.proc,'534:837',ids.em,'534:912','534:938','534:978','534:1025',ids.ft,'534:1105'];
let y=0;const pos={};for(const id of order){const n=await g(id);n.y=y;pos[id]=y;y+=n.height;}
(await g(ids.tick)).y=pos[ids.svc]-26;(await g('532:763')).y=pos['532:712']-120;(await g('534:833')).y=pos['534:837']-64;(await g('534:939')).y=pos['534:938']-100;
M.resize(390,y);for(const id of [ids.tick,'532:763','534:833','534:939'])M.appendChild(await g(id));
return {ids,h:y};
