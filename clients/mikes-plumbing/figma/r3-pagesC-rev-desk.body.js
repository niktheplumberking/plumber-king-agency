const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const D=await figma.getNodeByIdAsync('493:1095');const g=async id=>await figma.getNodeByIdAsync(id);
for(const id of ['493:1143','493:1198','493:1220','493:1611','536:27553','536:27554','536:27634']){const n=await g(id);if(n)n.remove();}
// ---- S1: ledger cover + featured entry ----
const S1=F(D,'04 Ledger cover + featured entry (Yelp, word for word)',0,784,1440,860,C.paper);
const cv=COVER(S1,80,90,470,640);cv.rotation=-2;
const st=RV.find(r=>r.name==='Stuart W.');
RIBBON(S1,1290,0,26,170,C.tanD,'ribbon bookmark: featured entry');
EYE(S1,'Featured entry',640,104);
T(S1,'Ledger No. '+st.no+' · Yelp · '+st.date,640,154,{z:12,s:'Bold',c:C.tanD,ls:14,u:true});
const fq=T(S1,'“'+st.q+'”',640,192,{f:'Playfair Display',s:'Italic',z:20,c:C.ink,w:700,lh:158});
const fy=fq.y+fq.height+28;R(S1,640,fy,48,2,C.tanD,1,'short rule');
T(S1,'STUART W. · '+st.town,640,fy+18,{z:13,s:'Bold',c:C.ink,ls:12});STARS(S1,640,fy+46,14,'#C99A2E');
R(S1,760,fy+44,20,20,C.yelp,1,'yelp mark');T(S1,'y',765,fy+44,{s:'Bold',z:14,c:C.white});T(S1,'Yelp',788,fy+45,{z:13,s:'SemiBold',c:C.tanD});
S1.resize(1440,Math.max(fy+140,800));
// ---- S2: the open ledger book ----
const S2=F(D,'05 The neighbors’ ledger: all 20 Yelp reviews (word for word)',0,0,1440,3000,C.tan);
EYE(S2,'All twenty, word for word',80,110,{c:C.ink});
TR(S2,[['The neighbors’\n',{c:C.ink}],['ledger.',{s:'Black Italic',c:C.char}]],80,160,{f:'Playfair Display',s:'Black',z:72,lh:100,w:640,n:'H2'});
T(S2,'Every entry is copied from Mike’s Yelp page, read 17 Nov 2026. Numbered in the order they were written, starting with the first review in June 2025.',800,190,{z:18,c:C.char,w:560,lh:155});
let cx=80;const towns=['All 20','Corona','Menifee','Los Angeles','Riverside','Fontana','Irvine','Moreno Valley','More towns'];
towns.forEach((t,i)=>{const tt=figma.createText();tt.fontName={family:'Jost',style:'Medium'};tt.characters=t;tt.fontSize=14;const w=Math.ceil(tt.width)+36;tt.remove();HX(S2,cx,330,w,36,{fill:i===0?C.ink:null,stroke:i===0?null:C.ink,cut:10});T(S2,t,cx,338,{z:14,s:'Medium',c:i===0?C.cream:C.ink,w,a:'CENTER'});cx+=w+8;});
const PW=632,EW=500,EX=88,HY=96;const tmp=F(S2,'tmp',0,0,PW,10,null);
const ents=RV.map(r=>ENTRY(tmp,EX,0,EW,r));const hs=ents.map(e=>e.height+26);
const tot=hs.reduce((a,b)=>a+b,0);let best=1,bv=1e9,acc=0;for(let k=1;k<20;k++){acc+=hs[k-1];const v=Math.max(acc,tot-acc);if(v<bv){bv=v;best=k;}}
const BH=HY+bv+70;const yb=410;
const book=F(S2,'open ledger book (two pages)',80,yb,1280,BH,null);book.clipsContent=false;
for(const [px,dx] of [[0,-1],[PW+16,1]]){for(let s=3;s>=1;s--){const u=R(book,px+dx*s*2,s*3,PW,BH,C.cream,1,'page stack');u.strokes=[solid(C.tanD,0.4)];u.strokeWeight=1;}}
R(book,PW-4,-4,24,BH+10,C.char,1,'binding');
const pages=[];for(const [k,px] of [[0,0],[1,PW+16]]){const p=F(book,k?'right page (p. 2)':'left page (p. 1)',px,0,PW,BH,C.paper);pages.push(p);
 p.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.25},offset:{x:0,y:14},radius:26,spread:0,visible:true,blendMode:'NORMAL'}];
 for(let ly=HY;ly<BH-60;ly+=30)R(p,0,ly,PW,1,C.tan,0.35,'ruled line');
 const ml=R(p,EX-18,0,1,BH,C.tanD,0.6,'margin line');
 const gr=R(p,k?0:PW-46,0,46,BH,C.ink,1,'gutter shade');gr.fills=[{type:'GRADIENT_LINEAR',gradientTransform:k?[[-1,0,1],[0,1,0]]:[[1,0,0],[0,1,0]],gradientStops:[{position:0,color:{r:0.06,g:0.05,b:0.03,a:0}},{position:1,color:{r:0.06,g:0.05,b:0.03,a:0.16}}]}];
 const a=k?best:0,b=k?20:best;
 T(p,'THE NEIGHBORS’ LEDGER · ENTRIES '+RV[a].no+'–'+RV[b-1].no,EX,40,{z:10,s:'Bold',c:C.tanD,ls:20});
 const rt=T(p,k?'YELP · WORD FOR WORD':'READ 17 NOV 2026',0,40,{z:10,s:'Bold',c:C.tanD,ls:20});rt.x=EX+EW-rt.width;
 R(p,EX,64,EW,1.5,C.ink,1,'page header rule');
 let y=HY;for(let i=a;i<b;i++){const e=ents[i];p.appendChild(e);e.x=EX;e.y=y;y+=hs[i];}
 T(p,'— '+(k+1)+' —',0,BH-48,{f:'Playfair Display',s:'Italic',z:15,c:C.tanD,w:PW,a:'CENTER',n:'page number'});}
tmp.remove();
RIBBON(book,PW+16+PW-90,-14,24,BH+60,C.ink,'ribbon bookmark');
// footnotes + actions
const fy2=yb+BH+60;
const fn=F(S2,'honest footnote: hidden Yelp reviews',80,fy2,640,10,null);fn.clipsContent=false;
const t1=T(fn,'*  Yelp also lists 17 other reviews that it does not currently recommend. We have not read them, so they are not in this ledger.',0,0,{z:16,c:C.char,w:640,lh:155});
const t2=T(fn,'+  3 recommendations for Mike on Nextdoor, from neighbors in Corona and Riverside. One says simply: “good prices”.',0,t1.height+14,{z:16,c:C.char,w:640,lh:155});fn.resize(640,t2.y+t2.height);
BTN(S2,1360-270,fy2-4,'Add your entry on Yelp',{k:'ink',h:56,w:270,z:15,icon:'arrow'});
BTN(S2,1360-270,fy2+64,'Recommend on Nextdoor',{k:'ghost',fg:C.ink,h:56,w:270,z:15,icon:'arrow'});
S2.resize(1440,fy2+Math.max(fn.height,120)+110);
// ---- restack ----
const order=['493:1096','493:1106','493:1122',S1.id,S2.id,'536:27567'];let y=0;for(const id of order){const n=await g(id);n.y=y;y+=n.height;}
const sl=await g('536:27633');sl.y=(await g('536:27567')).y;sl.fills=[solid(C.tan)];D.appendChild(sl);
const ft=(await g('556:2551')).clone();D.appendChild(ft);ft.x=0;ft.y=y;y+=ft.height;D.resize(1440,y);
FIXLINES(S1);FIXLINES(S2);
return {S1:S1.id,S2:S2.id,ft:ft.id,h:y,split:best,BH};
