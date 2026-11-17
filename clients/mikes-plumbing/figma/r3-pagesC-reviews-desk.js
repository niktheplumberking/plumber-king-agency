const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const RV0=[["Brandon A.", "Los Angeles", "Aug 20 2026", "Mike did a couple of jobs in my house! He's my first phone call when I need a plumber."], ["Eleanor M.", "Los Angeles", "Jul 10 2026", "Highly recommend Mike for all your plumbing needs. We replaced 3 toilets and a pressure regulator. As requested, he coordinated his work with other repairs being done on the property. He's reasonably priced, detailed & patient. Call him!"], ["Bruce H.", "West Hollywood", "Aug 24 2026", "Mike did a great job replacing and installing our new upstairs toilet. He is an excellent communicator. His prices are fair and competitive. I will definitely use him again! I hired him because of his excellent Nextdoor app reviews and excellent communication skills. Thanks Mike!"], ["Sal C.", "Corona", "Jul 25 2026", "Mike was able helped me out with a slab leak on short notice, rerouted water lines and new showers valves installed. He was upfront and honest with me on pricing and reliable when setting up the appointments. I will definitely call him again for any future plumbing needs."], ["Jack D.", "Bonita CA", "May 7 2026", "Our garbage disposal began to malfunction soon after our move to Murrieta, so we called Mike. He arrived on time and installed it quickly. He communicated well, was polite and courteous, and his prices are quite reasonable. You can't go wrong with Mike's Plumbing!"], ["Tewolde T.", "Moreno Valley", "Jun 5 2026", "Water pressure regulate,shut off valve and automatic water shut off WIFI connected has a lot of respect and calls back to inquire how the work is going very professional and reasonable price"], ["Stuart W.", "San Diego", "Jul 16 2025", "Ended up with a leak on our water service line. Farmed out for a couple estimates. Some got back to me with future appointments but Mike happened to call around 7pm the same day and offered to at least take a look and let me know where I stand. When he arrived he plugged in his equipment and began diagnosing. This was after explaining that I understood if he wanted to get home to his family and come back in the morning since it was late. He insisted that he could finish the diagnosis that night which I greatly appreciated! One thing of note, the entire time he was working he was extremely conscientious about my lawn and cleaning up any mess. This immediately built my trust so I asked him if he minded if I went to work the next day while he did the repair. I came home to a fixed leak and spotless work site. He was extremely communicative through the whole process. I want to make sure this business gets the credibility it deserves. Highly recommended."], ["Jackie H.", "Fontana", "Apr 10 2026", "I can't say enough good things about Mike! From the moment he arrived, he was professional, respectful, and very easy to talk to. He took his time explaining everything in detail and made sure we understood all our options, which made us feel very comfortable. He was also incredibly patient and never rushed through the job. In fact, he stayed and completed everything the same day and didn't leave until the job was fully done, which says a lot about his work ethic. He fixed our water leaks and installed new water lines throughout our entire home, and everything was done with great attention to detail. You can tell he genuinely cares about doing quality work and helping his customers, not just getting in and out. On top of all that, he gave us a very fair price honestly better than anyone else we had contacted. It really felt like he was working from the heart. If you're looking for someone trustworthy, skilled, and fair, I highly recommend him!"], ["Sydney H.", "Fort Worth TX", "Aug 7 2025", "I sent my request for quote from Yelp to several plumbers for a kitchen faucet replacement. Mike was fast with his response, replaced my faucet for a fair price and did a great job in a timely manner. Very clean, professional, and great communication skills. Highly recommend!"], ["Erik N.", "Buena Park", "Sep 4 2025", "Great service responded fast and did the work same day Would recommend and will use again for any plumbing service that I may need"], ["Jared K.", "Nakagami District Japan", "Jul 28 2025", "Answered my late night call and was at my door by 8am the next day. Solved the issue with the toilet in less than an hour. Clean, professional, and provided a fair price. Will use again if the need arises."], ["Suzi J.", "Valley Center CA", "Aug 25 2025", "5 STARS for Mike's... Mike was here within two hours of our call. We found hime to be professional, friendly and efficient. His pricing is very reasonable and he is quick and clean with his work. We highly recommend Mike for your plumbing needs... we will certainly be calling him if and when we need a plummer again. Thank you, Mike."], ["Janeth H.", "Corona", "Jun 12 2025", "Needed my garbage disposal repaired, he was quick and efficient! I value a clean plumber. 10 out of 10 recommend."], ["Debbie H.", "Menifee", "Jul 14 2025", "Amazing! wonderful! Responded same day I called. The job was much more complicated than expected...Michael somehow made everything work and wasn't gonna leave until fixed. As a single female I appreciate his honesty and excellent workmanship more than words can convey. So unusual these days. ...VERY REASONABLY PRICED!!!!!"], ["Julian T.", "Irvine", "Jun 12 2025", "awesome service. showed up on time. Completed the service requested and left the area super clean. Would definitely recommend. 5 stars."], ["Martha B.", "CA", "Aug 1 2025", "I had a stop valve behind my toilet, so k had to turn off the water for the whole house. On a Friday, I called three plumbers and they couldn't come over until Monday. Mike actually called me instead of back and forth messaging. He came over with all the on that Friday. He had all the parts and fixed it perfectly,"], ["Isaiah C.", "Riverside", "Jun 12 2025", "Owner Mike came himself and took care of issues I had with my toilet and sink. Was on time and took care of everything pretty quick. Left everything clean and working perfectly. Thank you Mike!"], ["Pamela N.", "Menifee", "Jul 30 2025", "Mike was a pleasure to work with. He came by and did exactly what was needed. We wanted our hose pipe moved back a few feet from its current location. He was able to come out and complete the job in one afternoon. I'd highly recommend going with Mike's Plumbing Services for your plumbing needs!"], ["Robert U.", "Overland Park KS", "Jul 19 2025", "Absolutely wonderful service, repaired water main to my house and installed new water heater all in one afternoon. Excellent service highly recommend"], ["Laura G.", "Clarksville TN", "Aug 20 2025", "Mike was great , he responded very quickly and he was honest,efficient and very respectful.He addressed all my plumbing issues and suggested the best option which was to caulk the base of one toilet and replace the other toilet. His price was very fair and within my budget. I will call him when I am ready to upgrade the bathroom because I know I can trust him"]];
const TOWN=t=>({'Bonita CA':'Bonita, CA','Fort Worth TX':'Fort Worth, TX','Overland Park KS':'Overland Park, KS','Clarksville TN':'Clarksville, TN','Valley Center CA':'Valley Center, CA','CA':'CA','Nakagami District Japan':'Nakagami District, Japan'}[t]||t+', CA');
const RV=RV0.map((r,i)=>({name:r[0],town:TOWN(r[1]),date:r[2].replace(/ (\d{4})$/,', $1'),d:new Date(r[2]),q:r[3].replace(/'/g,'’'),i})).sort((a,b)=>a.d-b.d||a.i-b.i);
RV.forEach((r,k)=>r.no=String(k+1).padStart(2,'0'));
function ENTRY(parent,x,y,w,r,o={}){const z=o.z||15,nc=o.nc||86;const g=F(parent,'ledger entry No. '+r.no+': '+r.name+' (Yelp, word for word)',x,y,w,100,null);g.clipsContent=false;
 T(g,'NO.',0,2,{z:9,s:'Bold',c:C.tanD,ls:14});const num=T(g,r.no,0,14,{f:'Playfair Display',s:'Black',z:o.nz||28,c:C.ink});
 T(g,r.date.replace(', ','\n'),0,num.y+num.height+2,{z:11,s:'Medium',c:C.tanD,lh:130});
 const hd=T(g,r.name.toUpperCase()+' · '+r.town,nc,4,{z:o.hz||11,s:'Bold',c:C.ink,ls:10,w:w-nc-72});STARS(g,w-5*13,4,10,'#C99A2E');
 const q=T(g,'“'+r.q+'”',nc,Math.max(o.qy||28,hd.y+hd.height+8),{f:'Playfair Display',s:'Italic',z,c:C.ink,w:w-nc,lh:155});
 const h=Math.max(q.y+q.height,92);const rl=R(g,0,h+16,w,1,null,1,'entry rule');rl.strokes=[solid(C.tanD)];rl.strokeWeight=1;rl.dashPattern=[3,4];rl.resize(w,0.01);g.resize(w,h+17);return g;}
function RIBBON(parent,x,y,w,L,c,n){const v=figma.createVector();v.vectorPaths=[{windingRule:'NONZERO',data:`M 0 0 L ${w} 0 L ${w} ${L} L ${w/2} ${L-w*0.6} L 0 ${L} Z`}];v.fills=[solid(c)];v.strokes=[];parent.appendChild(v);v.x=x;v.y=y;v.name=n||'ribbon bookmark';return v;}
function COVER(parent,x,y,w,h,o={}){const cv=F(parent,'ledger cover: The Neighbors’ Ledger (embossed seal)',x,y,w,h,C.ink);cv.cornerRadius=8;cv.clipsContent=false;
 cv.effects=[{type:'DROP_SHADOW',color:{r:0.06,g:0.05,b:0.03,a:0.35},offset:{x:0,y:18},radius:34,spread:0,visible:true,blendMode:'NORMAL'}];
 const sp=w*0.055;R(cv,0,0,sp,h,C.char,1,'spine');R(cv,sp,0,2,h,C.tanD,0.5,'spine crease');
 const b1=R(cv,sp+18,18,w-sp-36,h-36,null,1,'gilt border outer');b1.strokes=[solid(C.tan)];b1.strokeWeight=1.5;
 const b2=R(cv,sp+26,26,w-sp-52,h-52,null,1,'gilt border inner');b2.strokes=[solid(C.tan,0.6)];b2.strokeWeight=0.8;
 const cw=w-sp,s=o.s||1;
 T(cv,'THE NEIGHBORS’',sp,h*0.11,{z:Math.round(12*s),s:'Bold',c:C.tan,ls:30,w:cw,a:'CENTER'});
 T(cv,'Ledger',sp,h*0.11+20*s,{f:'Playfair Display',s:'Black Italic',z:Math.round(68*s),c:C.tan,w:cw,a:'CENTER'});
 const d=Math.round(230*s);const seal=SEAL(cv,sp+(cw-d)/2,h*0.36,d,'TWENTY YELP REVIEWS · ALL FIVE STARS · READ 17 NOV 2026 · ',{fg:C.tan,rz:Math.max(8,Math.round(11*s)),band:Math.round(40*s),n:'embossed seal: 5.0 on Yelp, 20 reviews'});
 const five=T(seal,'5.0',0,0,{f:'Playfair Display',s:'Black',z:Math.round(54*s),c:C.tan,w:d,a:'CENTER'});five.y=d*0.26;
 STARS(seal,d/2-5*(12*s+3)/2,d*0.565,Math.round(12*s),'#C99A2E');
 T(seal,'ON YELP',0,d*0.643,{z:Math.max(8,Math.round(10*s)),s:'Bold',c:C.tan,w:d,a:'CENTER',ls:24});
 const by=seal.y+d+26*s;T(cv,'MIKE’S PLUMBING SERVICES',sp,by,{z:Math.max(9,Math.round(11*s)),s:'Bold',c:C.tan,ls:24,w:cw,a:'CENTER'});
 T(cv,'Riverside · Est. 2025',sp,by+22*s,{f:'Playfair Display',s:'Italic',z:Math.round(15*s),c:C.tan,o:0.75,w:cw,a:'CENTER'});
 return cv;}
function FIXLINES(r){for(const x of r.findAll(x=>x.type==='RECTANGLE'&&['dotted leader','entry rule','tear-off perforation'].includes(x.name)&&x.height<0.5)){const L=figma.createLine();L.name=x.name;const p=x.parent;p.insertChild(p.children.indexOf(x),L);L.x=x.x;L.y=x.y;L.resize(Math.max(x.width,1),0);L.strokes=x.strokes;L.strokeWeight=x.strokeWeight;L.dashPattern=x.dashPattern;x.remove();}}
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

// post-run fixes applied: seal inner spacing, right page x=640, binding w16, ribbon x=1238 len BH+40
