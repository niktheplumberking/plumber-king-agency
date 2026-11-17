const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const NOTES=[['Erik N.','Buena Park, CA','Sep 4, 2025','Great service responded fast and did the work same day Would recommend and will use again for any plumbing service that I may need'],
['Martha B.','CA','Aug 1, 2025','…On a Friday, I called three plumbers and they couldn’t come over until Monday. Mike actually called me instead of back and forth messaging. He came over with all the on that Friday. He had all the parts and fixed it perfectly,'],
['Jared K.',null,'Jul 28, 2025','Answered my late night call and was at my door by 8am the next day. Solved the issue with the toilet in less than an hour. Clean, professional, and provided a fair price. Will use again if the need arises.']];
function PAD(parent,x,y,w,n,o={}){const p=F(parent,'message pad: '+n[0]+' (Yelp, word for word)',x,y,w,300,C.white);p.clipsContent=false;
 p.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.16},offset:{x:0,y:10},radius:20,spread:0,visible:true,blendMode:'NORMAL'}];
 R(p,0,0,w,44,C.ink,1,'pad gum strip');T(p,'WHILE YOU WERE OUT',0,14,{z:11,s:'Bold',c:C.cream,ls:24,w,a:'CENTER'});
 let yy=62;const row=(lab,val)=>{T(p,lab,18,yy+12,{z:9,s:'Bold',c:C.tanD,ls:16});const v=T(p,val,70,yy,{f:'Yellowtail',z:22,c:C.ink});R(p,64,yy+30,w-82,1,C.tanD,0.7,'fill-in line');yy+=38;};
 row('FOR','Mike');row('FROM',n[0]);if(n[1])row('OF',n[1]);row('DATE',n[2]);
 T(p,'MESSAGE',18,yy+10,{z:9,s:'Bold',c:C.tanD,ls:16});const q=T(p,'“'+n[3]+'”',18,yy+30,{f:'Playfair Display',s:'Italic',z:o.z||16,c:C.ink,w:w-36,lh:150});
 const by=q.y+q.height+16;STARS(p,18,by+2,11,'#C99A2E');R(p,w-18-20,by,20,20,C.yelp,1,'yelp mark');T(p,'y',w-33,by,{s:'Bold',z:14,c:C.white});const yl=T(p,'via Yelp',0,by+1,{z:12,s:'SemiBold',c:C.tanD});yl.x=w-44-yl.width;
 p.resize(w,by+40);return p;}
function SCREW(parent,x,y){const s=CIRC(parent,x,y,14,{fill:C.tanD,stroke:C.ink,sw:0.6,n:'screw'});const sl=R(parent,x+2,y+6.3,10,1.4,C.ink,0.8,'screw slot');sl.rotation=35;return s;}
function PLATE(parent,x,y,w,h,o={}){const p=F(parent,'brass phone plate (tap to call)',x,y,w,h,C.tan);p.cornerRadius=6;
 p.fills=[{type:'GRADIENT_LINEAR',gradientTransform:[[1,0.4,0],[-0.4,1,0.2]],gradientStops:[{position:0,color:{...rgb(C.tan),a:1}},{position:0.55,color:{...rgb('#E2D6BB'),a:1}},{position:1,color:{...rgb(C.tanD),a:1}}]}];
 p.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.45},offset:{x:0,y:10},radius:22,spread:0,visible:true,blendMode:'NORMAL'}];
 const b=R(p,10,10,w-20,h-20,null,1,'engraved border');b.strokes=[solid(C.ink,0.55)];b.strokeWeight=1;b.cornerRadius=3;
 for(const [sx,sy] of [[18,18],[w-32,18],[18,h-32],[w-32,h-32]])SCREW(p,sx,sy);
 const s=o.s||1;T(p,'MIKE’S PLUMBING SERVICES · DIRECT LINE',0,h*0.2,{z:Math.round(11*s),s:'Bold',c:C.ink,ls:22,w,a:'CENTER'});
 SVG(p,IC.phone(C.ink),0,0,Math.round(30*s),'phone icon');const ph=T(p,'(951) 809-9533',0,0,{f:'Playfair Display',s:'Black',z:Math.round(56*s),c:C.ink});
 const ic=p.children[p.children.length-2];const tw=ic.width+14*s+ph.width;ic.x=(w-tw)/2;ph.x=ic.x+ic.width+14*s;ph.y=h*0.33;ic.y=ph.y+ph.height/2-ic.height/2;
 T(p,'Tap to call · you talk to the owner',0,ph.y+ph.height+4,{z:Math.round(13*s),s:'Medium',c:C.ink,o:0.75,w,a:'CENTER'});return p;}
function BOX(parent,x,y,label,o={}){const b=R(parent,x,y,16,16,null,1,'checkbox');b.strokes=[solid(C.ink)];b.strokeWeight=1.3;const t=T(parent,label,x+24,y-2,{z:o.z||15,c:C.ink});return x+24+t.width+(o.gap||26);}
function UFIELD(parent,x,y,w,label){T(parent,label,x,y,{z:10,s:'Bold',c:C.tanD,ls:16});R(parent,x,y+48,w,1.3,C.ink,1,'fill-in line: '+label);}
function FORMSHEETS(parent,x,y,w,o={}){const pad=o.pad||36,iw=w-pad*2,cols=o.cols||2;
 const back=F(parent,'carbon copy sheet: CUSTOMER COPY',x+14,y+18,w,100,C.cream);back.clipsContent=false;
 const front=F(parent,'service request form (front sheet, perforated)',x,y,w,100,C.paper);front.clipsContent=false;
 front.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.35},offset:{x:0,y:12},radius:26,spread:0,visible:true,blendMode:'NORMAL'}];
 PERF(front,0,-7,w,C.ink,{d:14,gap:10});
 T(front,'SERVICE REQUEST',pad,40,{f:'Playfair Display',s:'Black',z:o.hz||34,c:C.ink});
 const no=T(front,'No. ________',0,52,{z:13,s:'Medium',c:C.tanD});no.x=w-pad-no.width;
 const sub=T(front,'Fill it in and Mike gets it. You keep the customer copy.',pad,o.hz?84:92,{z:14,c:C.muteD,w:iw});
 let y2=sub.y+sub.height+30;const cw=cols===2?(iw-30)/2:iw;
 const fields=['NAME','PHONE','ZIP OR TOWN','EMAIL (OPTIONAL)'];
 for(let i=0;i<fields.length;i++){const c=cols===2?i%2:0;UFIELD(front,pad+c*(cw+30),y2,cw,fields[i]);if(cols===1||c===1)y2+=70;}
 y2+=10;T(front,'WHAT’S GOING ON?',pad,y2,{z:10,s:'Bold',c:C.tanD,ls:16});y2+=26;
 const probs=['Leak','Clog or backup','Sewer / camera','No hot water','Grease / commercial','Other'];let bx=pad;
 for(const pr of probs){const tt=figma.createText();tt.fontName={family:'Jost',style:'Regular'};tt.characters=pr;tt.fontSize=15;const need=24+tt.width;tt.remove();if(bx+need>w-pad){bx=pad;y2+=32;}bx=BOX(front,bx,y2,pr);}
 y2+=48;
 if(cols===2){T(front,'IS IT AN EMERGENCY?',pad,y2,{z:10,s:'Bold',c:C.tanD,ls:16});T(front,'HOME OR BUSINESS?',pad+cw+30,y2,{z:10,s:'Bold',c:C.tanD,ls:16});y2+=26;
  let a=BOX(front,pad,y2,'Yes');BOX(front,a,y2,'No');a=BOX(front,pad+cw+30,y2,'Home');BOX(front,a,y2,'Business');y2+=46;}
 else{for(const [lab,opts] of [['IS IT AN EMERGENCY?',['Yes','No']],['HOME OR BUSINESS?',['Home','Business']]]){T(front,lab,pad,y2,{z:10,s:'Bold',c:C.tanD,ls:16});y2+=26;let a=pad;for(const op of opts)a=BOX(front,a,y2,op);y2+=44;}}
 T(front,'TELL MIKE MORE',pad,y2,{z:10,s:'Bold',c:C.tanD,ls:16});for(let k=1;k<=3;k++)R(front,pad,y2+k*34,iw,1,C.tanD,0.6,'writing line');y2+=3*34+30;
 const ph=F(front,'photo attach (optional)',pad,y2,iw,58,null);ph.strokes=[solid(C.tanD)];ph.strokeWeight=1.2;ph.dashPattern=[5,4];
 SVG(ph,IC.camera(C.tanD),18,17,24,'camera icon');T(ph,'Add a photo of the problem (optional)',54,17,{z:15,c:C.muteD});y2+=58+22;
 BTN(front,pad,y2,'Send to Mike',{k:'ink',h:58,w:iw,z:16,icon:'arrow'});y2+=58+30;
 const perf=R(front,0,y2,w,1,null,1,'tear-off perforation');perf.strokes=[solid(C.tanD)];perf.strokeWeight=1.2;perf.dashPattern=[6,5];perf.resize(w,0.01);
 T(front,'TEAR-OFF · KEEP FOR YOUR RECORDS',pad,y2+16,{z:9,s:'Bold',c:C.tanD,ls:16});
 const st=T(front,'Request No. ________ · Mike calls you back',pad,y2+36,{f:'Playfair Display',s:'Italic',z:15,c:C.ink,w:iw});
 front.resize(w,st.y+st.height+26);back.resize(w,front.height);back.rotation=o.rot===undefined?-2.2:o.rot;
 const tab=F(back,'tab: CUSTOMER COPY',w-(o.tabw||170)-30,-30,o.tabw||170,32,C.tanD);tab.topLeftRadius=6;tab.topRightRadius=6;T(tab,'CUSTOMER COPY',0,9,{z:10,s:'Bold',c:C.cream,ls:20,w:o.tabw||170,a:'CENTER'});
 const ghost=T(back,'SERVICE REQUEST',pad+6,46,{f:'Playfair Display',s:'Black',z:o.hz||34,c:C.tanD,o:0.25,n:'carbon ghost'});
 return {front,back,h:front.height+30};}
function FIXLINES(r){for(const x of r.findAll(x=>x.type==='RECTANGLE'&&['dotted leader','entry rule','tear-off perforation'].includes(x.name)&&x.height<0.5)){const L=figma.createLine();L.name=x.name;const p=x.parent;p.insertChild(p.children.indexOf(x),L);L.x=x.x;L.y=x.y;L.resize(Math.max(x.width,1),0);L.strokes=x.strokes;L.strokeWeight=x.strokeWeight;L.dashPattern=x.dashPattern;x.remove();}}
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const M=await figma.getNodeByIdAsync('495:724');const g=async id=>await figma.getNodeByIdAsync(id);
for(const id of ['539:497','539:540','539:559','539:560','539:567','495:755','495:797','495:843']){const n=await g(id);if(n)n.remove();}
// ---- MC1: while you were out ----
const C1=F(M,'M1 While you were out: neighbors on calling Mike (Yelp, word for word)',0,0,390,2000,C.cream);
EYE(C1,'Neighbors on calling Mike',20,56);
const h1=TR(C1,[['“Mike actually\n',{c:C.ink}],['called me.”',{s:'Black Italic',c:C.tanD}]],20,96,{f:'Playfair Display',s:'Black',z:40,lh:104,w:350,n:'H2'});
const i1=T(C1,'Three messages from Mike’s Yelp page about what happened when they called. Word for word.',20,h1.y+h1.height+16,{z:16,c:C.muteD,w:350,lh:150});
let py=i1.y+i1.height+40;NOTES.forEach((n,i)=>{const p=PAD(C1,20,py,350,n,{z:15});p.rotation=[-1,0.8,-0.6][i];py+=p.height+36;});
C1.resize(390,py+30);
// ---- MC2: plate + carbon form ----
const C2=F(M,'M2 Call or write: brass phone plate + carbon-copy service request',0,0,390,2400,C.ink);
EYE(C2,'Call or leave it in writing',20,56,{c:C.tan});
const h2=TR(C2,[['Call Mike direct.\n',{c:C.cream}],['Or write it down.',{s:'Black Italic',c:C.tan}]],20,96,{f:'Playfair Display',s:'Black',z:36,lh:106,w:350,n:'H2'});
const pl=PLATE(C2,20,h2.y+h2.height+30,350,170,{s:0.62});
let ly=pl.y+pl.height+36;const rows=[['Email','mikesplumbingco25@gmail.com'],['Hours','Mike to confirm'],['Area','Riverside · IE · OC · LA'],['Pay','Cash · Zelle · Cash App (Yelp)'],['Sign language','ASL (Yelp)']];
for(const r of rows){const l=LEADER(C2,20,ly,350,r[0],r[1],{c:C.cream,rc:C.tan,z:18,rz:13,dc:C.tanD});ly+=l.height+16;}
const fs=FORMSHEETS(C2,20,ly+50,336,{cols:1,hz:26,pad:22,tabw:140,rot:-1.5});
const tab=fs.back.children.find(n=>n.name.startsWith('tab:'));tab.y=fs.back.height;tab.topLeftRadius=0;tab.topRightRadius=0;tab.bottomLeftRadius=6;tab.bottomRightRadius=6;tab.x=fs.back.width-tab.width-30;tab.children[0].y=8;
C2.resize(390,fs.front.y+fs.front.height+110);
// ---- map: region ledger ----
const S3=await g('495:877');const ad=await g('495:887');let ry=518;
for(const r of [['Riverside','home base (Yelp)'],['Inland Empire','IG + Nextdoor'],['Orange County','IG + Nextdoor'],['Los Angeles','IG + Nextdoor'],['Your street','Mike to confirm']]){const l=LEADER(S3,20,ry,350,r[0],r[1],{c:C.ink,rc:C.tanD,z:18,rz:12,dc:C.tanD});l.name='region ledger row: '+r[0];ry+=l.height+10;}
ad.y=ry+16;S3.resize(390,ad.y+ad.height+48);
FIXLINES(C1);FIXLINES(C2);FIXLINES(S3);
// ---- restack ----
const order=['495:725','495:735',C1.id,C2.id,'495:877','495:890'];let y=0;for(const id of order){const n=await g(id);n.y=y;y+=n.height;}
const ft=(await g('557:1020')).clone();M.appendChild(ft);ft.x=0;ft.y=y;y+=ft.height;
const sb=await g('539:597');M.appendChild(sb);sb.y=y;y+=sb.height;M.resize(390,y);
return {C1:C1.id,C2:C2.id,ft:ft.id,h:y};
// post-run fix (mobile): form 'No.' moved to y=16; photo label shortened to 'Add a photo (optional)'
