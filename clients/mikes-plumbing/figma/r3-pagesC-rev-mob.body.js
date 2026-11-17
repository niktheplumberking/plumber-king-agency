const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const M=await figma.getNodeByIdAsync('493:1735');const g=async id=>await figma.getNodeByIdAsync(id);
for(const id of ['493:1766','493:1767','493:1789','493:1799','493:1962','539:443','539:444','539:451']){const n=await g(id);if(n)n.remove();}
// ---- M1: cover + featured ----
const S1=F(M,'M1 Ledger cover + featured entry (Yelp, word for word)',0,0,390,1600,C.paper);
const cv=COVER(S1,45,60,300,410,{s:0.64});cv.rotation=-2;
const st=RV.find(r=>r.name==='Stuart W.');
RIBBON(S1,330,0,20,110,C.tanD,'ribbon bookmark: featured entry');
EYE(S1,'Featured entry',20,530);
T(S1,'Ledger No. '+st.no+' · Yelp · '+st.date,20,576,{z:11,s:'Bold',c:C.tanD,ls:12,u:true});
const fq=T(S1,'“'+st.q+'”',20,606,{f:'Playfair Display',s:'Italic',z:17,c:C.ink,w:350,lh:155});
const fy=fq.y+fq.height+24;R(S1,20,fy,40,2,C.tanD,1,'short rule');
T(S1,'STUART W. · '+st.town,20,fy+16,{z:12,s:'Bold',c:C.ink,ls:12});STARS(S1,20,fy+42,13,'#C99A2E');
R(S1,124,fy+40,20,20,C.yelp,1,'yelp mark');T(S1,'y',129,fy+40,{s:'Bold',z:14,c:C.white});T(S1,'Yelp',152,fy+41,{z:13,s:'SemiBold',c:C.tanD});
S1.resize(390,fy+110);
// ---- M2: ledger page (newest 8) ----
const S2=F(M,'M2 The neighbors’ ledger: newest page (Yelp, word for word)',0,0,390,4000,C.tan);
EYE(S2,'All twenty, word for word',20,56,{c:C.ink});
const h2=TR(S2,[['The neighbors’\n',{c:C.ink}],['ledger.',{s:'Black Italic',c:C.char}]],20,96,{f:'Playfair Display',s:'Black',z:44,lh:100,w:350,n:'H2'});
const it=T(S2,'Every entry is copied from Mike’s Yelp page, read 17 Nov 2026, and numbered in the order it was written.',20,h2.y+h2.height+18,{z:16,c:C.char,w:350,lh:150});
const chips=F(S2,'town chips (scroll sideways)',0,it.y+it.height+22,390,36,null);let cx=20;
['All 20','Corona','Menifee','Los Angeles','Riverside','More towns'].forEach((t,i)=>{const tt=figma.createText();tt.fontName={family:'Jost',style:'Medium'};tt.characters=t;tt.fontSize=13;const w=Math.ceil(tt.width)+30;tt.remove();HX(chips,cx,0,w,34,{fill:i===0?C.ink:null,stroke:i===0?null:C.ink,cut:9});T(chips,t,cx,8,{z:13,s:'Medium',c:i===0?C.cream:C.ink,w,a:'CENTER'});cx+=w+8;});
const py=chips.y+70;const PW=350,EX=34,EW=296;
const pg=F(S2,'ledger page: newest entries 20–13',20,py,PW,3000,C.paper);pg.clipsContent=false;
pg.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.25},offset:{x:0,y:12},radius:22,spread:0,visible:true,blendMode:'NORMAL'}];
T(pg,'NEWEST ENTRIES · 20–13',EX,28,{z:9,s:'Bold',c:C.tanD,ls:18});const rt=T(pg,'YELP',0,28,{z:9,s:'Bold',c:C.tanD,ls:18});rt.x=EX+EW-rt.width;
R(pg,EX,48,EW,1.5,C.ink,1,'page header rule');
let y=72;const ents=[];for(let i=19;i>=12;i--){const e=ENTRY(pg,EX,y,EW,RV[i],{nc:54,nz:22,z:14,hz:10});ents.push(e);y+=e.height+22;}
const BH=y+50;pg.resize(PW,BH);
const rl=[];for(let ly=72;ly<BH-40;ly+=28){const r=R(pg,0,ly,PW,1,C.tan,0.35,'ruled line');rl.push(r);}
for(const r of rl)pg.insertChild(0,r);const ml=R(pg,EX-12,0,1,BH,C.tanD,0.6,'margin line');pg.insertChild(0,ml);
T(pg,'— turn back for entries 12–01 —',0,BH-36,{f:'Playfair Display',s:'Italic',z:13,c:C.tanD,w:PW,a:'CENTER',n:'page footer'});
for(let s=1;s<=2;s++){const u=R(S2,20+s*3,py+s*4,PW,BH,C.cream,1,'page stack');u.strokes=[solid(C.tanD,0.4)];u.strokeWeight=1;S2.insertChild(S2.children.indexOf(pg),u);}
RIBBON(S2,20+PW-34,py-10,20,BH+40,C.ink,'ribbon bookmark');
let by=py+BH+60;
BTN(S2,20,by,'Turn back: 12 earlier entries',{k:'ghost',fg:C.ink,h:54,w:350,z:15,icon:'arrow'});by+=86;
const t1=T(S2,'*  Yelp also lists 17 other reviews that it does not currently recommend. We have not read them, so they are not in this ledger.',20,by,{z:15,c:C.char,w:350,lh:150});by+=t1.height+12;
const t2=T(S2,'+  3 recommendations for Mike on Nextdoor, from neighbors in Corona and Riverside. One says simply: “good prices”.',20,by,{z:15,c:C.char,w:350,lh:150});by+=t2.height+30;
BTN(S2,20,by,'Add your entry on Yelp',{k:'ink',h:54,w:350,z:15,icon:'arrow'});by+=66;
BTN(S2,20,by,'Recommend on Nextdoor',{k:'ghost',fg:C.ink,h:54,w:350,z:15,icon:'arrow'});by+=54;
S2.resize(390,by+70);
// ---- restack ----
const order=['493:1736','493:1746',S1.id,S2.id,'493:1988'];y=0;for(const id of order){const n=await g(id);n.y=y;y+=n.height;}
const ft=(await g('557:1020')).clone();M.appendChild(ft);ft.x=0;ft.y=y;y+=ft.height;
const sb=await g('539:481');M.appendChild(sb);sb.y=y;y+=sb.height;M.resize(390,y);
FIXLINES(S1);FIXLINES(S2);
return {S1:S1.id,S2:S2.id,ft:ft.id,h:y};
