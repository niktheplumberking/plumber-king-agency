const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const D=await figma.getNodeByIdAsync('483:437');const SEC=D.parent;
// remove v1 sections below the hero/form (rebuilt below with Nick's round-2 structure)
for(const n of [...D.children]){if(n.y>=1040&&!n.name.startsWith('04 Quote form'))n.remove();}
for(const n of [...SEC.children]){if(n.name.startsWith('NOTE')&&n.x<1900&&n.y>1200)n.remove();}
// hero: add the legal/trust chip (licence honest, up front)
const He=D.children.find(n=>n.name==='03 Hero');let maxx=0;for(const n of He.children)if(n.type==='TEXT'&&Math.round(n.y)===706)maxx=Math.max(maxx,n.x+n.width);
const lc=F(He,'trust chip: CSLB licence (Mike to confirm)',maxx+44,698,250,38,null);lc.clipsContent=false;const lh=HX(lc,0,0,250,38,{stroke:C.tan,cut:11});lh.dashPattern=[5,4];SVG(lc,IC.shield(C.tan),18,9,20);T(lc,'CSLB lic. #: Mike to confirm',46,9,{z:14,s:'Medium',c:C.cream});
let y=1040;const out={};
// ===== 02 REVIEWS + TRUST (paper) — right after the hero, Nick's rule =====
const RV=F(D,'02 Reviews + trust (Yelp, word for word)',0,y,1440,1500,C.paper);
T(RV,'5.0',840,40,{f:'Playfair Display',s:'Black',z:300,c:C.ink,o:0.04,n:'watermark (cropped, pattern breaker)'});
let rb=HEAD(RV,80,140,'What neighbors say',[['Neighbors call him\n'],['first.',1]],'Every review here is copied word for word from Mike’s Yelp page: 20 reviews, all 5 stars (read 17 Nov 2026).',{w:520,z:60});
// Yelp score card with odometer counter
const yc=F(RV,'Yelp score card (real, 17 Nov 2026)',80,rb+40,520,300,C.ink);
R(yc,32,32,40,40,C.yelp,1,'yelp mark');T(yc,'y',44,36,{s:'Bold',z:26,c:C.white});T(yc,'Mike’s Plumbing Services on Yelp',88,40,{z:15,s:'SemiBold',c:C.cream});T(yc,'checked 17 Nov 2026',360,42,{z:12,c:C.mute});
['0','2','0'].forEach((d,i)=>{const bx=F(yc,'counter digit',32+i*74,100,64,84,i===2?C.tan:C.char2);T(bx,d,0,10,{f:'Playfair Display',s:'Black',z:52,c:i===2?C.ink:C.cream,w:64,a:'CENTER'});});
T(yc,'reviews on Yelp,\nall 5 stars',266,116,{z:16,s:'Medium',c:C.mute,lh:140});
T(yc,'5.0',32,206,{f:'Playfair Display',s:'Black',z:56,c:C.cream});STARS(yc,140,226,24,C.tan);T(yc,'out of 5 stars',300,230,{z:14,c:C.mute});
// featured review (Riverside) — right column
const fr=F(RV,'featured review: Isaiah C., Riverside (Yelp)',660,140,700,330,C.white);fr.strokes=[solid('#DDD5BC')];fr.clipsContent=false;
T(fr,'“',28,-30,{f:'Playfair Display',s:'Black',z:160,c:C.tan});
T(fr,'Owner Mike came himself and took care of issues I had with my toilet and sink. Was on time and took care of everything pretty quick. Left everything clean and working perfectly. Thank you Mike!',48,90,{f:'Playfair Display',s:'Italic',z:25,c:C.ink,w:600,lh:140});
HX(fr,48,262,44,44,{fill:C.ink,cut:10});T(fr,'I',48,271,{f:'Playfair Display',s:'Black',z:20,c:C.cream,w:44,a:'CENTER'});T(fr,'Isaiah C.',104,262,{z:16,s:'SemiBold'});T(fr,'Riverside, CA · Jun 12, 2025 · Yelp',104,284,{z:13,c:C.muteD});STARS(fr,520,272,18,'#C99A2E');R(fr,658,20,22,22,C.yelp,1,'yelp mark');T(fr,'y',664,20,{s:'Bold',z:15,c:C.white});
const tag=F(RV,'name tag (Mike) on featured review',1170,108,170,52,null);tag.clipsContent=false;HX(tag,0,0,170,52,{fill:C.cream,stroke:C.ink,cut:15});T(tag,'served by',0,6,{z:10,s:'SemiBold',c:C.tanD,w:170,a:'CENTER',u:true,ls:14});T(tag,'Mike',0,14,{f:'Yellowtail',z:26,c:C.ink,w:170,a:'CENTER'});
// trust bento under featured review
const b1=F(RV,'trust: family owned, est. 2025',660,500,340,240,C.ink);IMG(b1,0,0,340,240,'van',{n:'photo (real): Mike loading the van'});R(b1,0,0,340,240,C.ink,0.55,'shade');HX(b1,20,20,150,30,{fill:C.cream,cut:9});T(b1,'Family owned',20,26,{z:12,s:'SemiBold',c:C.ink,w:150,a:'CENTER',u:true,ls:10});T(b1,'Est. 2025',20,172,{f:'Playfair Display',s:'Black',z:32,c:C.cream});T(b1,'Mike runs it and does the job himself.',20,212,{z:13,c:C.cream});
const b2=F(RV,'trust: insured + licence (honest)',1020,500,340,240,C.char);SVG(b2,IC.shield(C.tan),28,28,40);T(b2,'Insured',28,88,{f:'Playfair Display',s:'Black',z:30,c:C.cream});T(b2,'Mike’s own claim on Instagram.',28,130,{z:14,c:C.mute});
const lb=F(b2,'licence box (Mike to confirm)',28,164,284,48,null);const lbh=HX(lb,0,0,284,48,{stroke:C.tan,cut:14});lbh.dashPattern=[5,4];T(lb,'CSLB licence #: Mike to confirm',0,14,{z:14,s:'Medium',c:C.tan,w:284,a:'CENTER'});
// review row (staggered); the 3rd card crosses into the next section
const rr=[['Amazing! wonderful! Responded same day I called. The job was much more complicated than expected...Michael somehow made everything work and wasn’t gonna leave until fixed.','Debbie H.','Menifee, CA','Jul 14, 2025'],['Highly recommend Mike for all your plumbing needs. We replaced 3 toilets and a pressure regulator… He’s reasonably priced, detailed & patient. Call him!','Eleanor M.','Los Angeles, CA','Jul 10, 2026'],['Our garbage disposal began to malfunction soon after our move to Murrieta, so we called Mike. He arrived on time and installed it quickly… You can’t go wrong with Mike’s Plumbing!','Jack D.','Job in Murrieta, CA','May 7, 2026']];
const rowY=Math.max(yc.y+yc.height,740)+80;const cards=[];
rr.forEach((r,i)=>{const c=REVIEW(RV,80+i*436,rowY+[0,50,210][i],408,r[0],r[1],r[2],r[3],{z:15});cards.push(c);});
BTN(RV,80,cards[0].y+cards[0].height+40,'Read all 20 reviews',{k:'ink',h:60,w:270,icon:'arrow'});
const nd=F(RV,'Nextdoor chip (real: 3 recommendations seen 17 Nov)',366,cards[0].y+cards[0].height+40,330,60,null);nd.clipsContent=false;HX(nd,0,0,330,60,{stroke:C.ink,cut:18});T(nd,'+ 3 neighbors recommend Mike on Nextdoor',0,19,{z:14,s:'Medium',c:C.ink,w:330,a:'CENTER'});
const secH=cards[0].y+cards[0].height+150;RV.resize(1440,secH);
// move 3rd card out to the page frame so it crosses the section edge
const c3=cards[2];const gy=RV.y+c3.y;D.appendChild(c3);c3.x=80+2*436;c3.y=gy;c3.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.22},offset:{x:0,y:16},radius:36,spread:0,visible:true,blendMode:'NORMAL'}];c3.name+=' (crosses into Services: pattern breaker)';
out.reviews=RV.id;out.cross=c3.id;y+=RV.height;out.y=y;
return out;
