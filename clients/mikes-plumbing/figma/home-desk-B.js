const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const D=await figma.getNodeByIdAsync('483:437');
let y=1408;const out={};
// 06 SERVICES (dark) — clipped-corner photo cards, badge index numbers
const S=F(D,'06 Services',0,y,1440,1500,C.char);T(S,'SERVICES',900,40,{f:'Playfair Display',s:'Black',z:180,c:C.cream,o:0.04,n:'watermark'});
let b=HEAD(S,80,110,'What Mike fixes',[['Every pipe, drain and heater.\n'],['Home',1],[' or business.']],'Drains to water heaters, slab leaks to grease interceptors. The same owner shows up, explains the why, and cleans up after.',{dark:true,w:820,z:56});
BTN(S,1140,b-62,'All services',{k:'ghost',fg:C.cream,h:56,w:220,icon:'arrow'});
const sv=[['Drain cleaning & hydro jetting','Snaking and hydro jetting for the toughest clogs.','cleanout'],['Leak detection & slab leaks','Find the leak, open as little as possible, fix it.','stucco'],['Sewer lines & camera inspection','Camera inspection and root removal.','roots'],['Grease interceptors','Pumping and cleaning for restaurants.','interceptor'],['Toilets, sinks & faucets','Installs and repairs, done clean.','ytoilet'],['Pressure regulators & valves','Regulators, shut-offs and hose bibs.','hosebib'],['Water heaters','Install and repair.',null,'flame'],['Garbage disposals & water filtration','Install and repair.',null,'filter']];
const cw=300,ch=380,gx=80,gy=b+60;
sv.forEach((s,i)=>{const x=gx+(i%4)*(cw+26),yy=gy+Math.floor(i/4)*(ch+26);const g=F(S,'service card: '+s[0],x,yy,cw,ch,C.ink);g.clipsContent=false;
 if(s[2]){IMGHX(g,0,0,cw,210,s[2],{cutCorners:24,n:'photo (real): '+s[2]});}else{const f=F(g,'no real photo yet: icon panel',0,0,cw,210,C.char2);HX(f,cw/2-70,45,140,120,{stroke:C.tan,sw:1.5,cut:34});SVG(f,IC[s[3]](C.tan),cw/2-22,83,44);T(f,'Photo: Mike to send',0,178,{z:12,c:C.mute,w:cw,a:'CENTER',n:'honest label'});}
 HX(g,20,186,64,40,{fill:C.cream,cut:12,n:'index badge'});T(g,String(i+1).padStart(2,'0'),20,194,{f:'Playfair Display',s:'Black',z:18,c:C.ink,w:64,a:'CENTER'});
 T(g,s[0],20,244,{f:'Playfair Display',s:'Bold',z:22,c:C.cream,w:cw-40,lh:118});T(g,s[1],20,310,{z:15,c:C.mute,w:cw-40,lh:150});
 T(g,'SEE SERVICE →',20,ch-36,{z:12,s:'SemiBold',c:C.tan,ls:16});R(g,0,ch-2,cw,2,C.tan,1,'card base line');});
S.resize(1440,gy+2*(ch+26)+70);out.services=S.id;y+=S.height;
// divider band with his motto
const M=F(D,'Motto band',0,y,1440,120,C.cream);T(M,'Friendly.   Transparent.   Proficient.',0,34,{f:'Playfair Display',s:'Black Italic',z:40,c:C.ink,w:1440,a:'CENTER',n:'his IG bio motto'});HX(M,40,48,60,24,{stroke:C.ink,cut:8});HX(M,1340,48,60,24,{stroke:C.ink,cut:8});out.motto=M.id;y+=120;
// 07 ABOUT (paper) — photo collage + story + signature + values
const A=F(D,'07 About Mike',0,y,1440,980,C.paper);
IMGHX(A,80,100,400,560,'van',{cutCorners:40,n:'photo (real): Mike loading the van'});IMGHX(A,360,420,300,420,'bar',{cutCorners:30,n:'photo (real): Mike at a bar sink'});
const bd=F(A,'years badge',96,700,220,110,C.ink);bd.clipsContent=false;bd.fills=[];HX(bd,0,0,220,110,{fill:C.ink,cut:30});T(bd,'10+',0,14,{f:'Playfair Display',s:'Black',z:44,c:C.cream,w:220,a:'CENTER'});T(bd,'years hands-on',0,70,{z:14,s:'Medium',c:C.tan,w:220,a:'CENTER'});
let ab=HEAD(A,740,100,'About Mike',[['Raised in the grease trade.\n'],['Built',1],[' for plumbing.']],null,{w:620,z:50});
const paras=[['How it started','Mike grew up in his family’s grease-industry business, learning the tough, behind-the-scenes work most plumbers never see.'],['On his own','He always had a passion for plumbing, so he branched out and started Mike’s Plumbing Services in 2025, with 10+ years of hands-on experience behind him.'],['How he works','Every job done with precision, no mess left behind, and the “why” behind the fix explained. No shortcuts, no surprises.']];
let py=ab+30;for(const [h,p] of paras){R(A,740,py+4,4,72,C.tanD,1,'accent bar');T(A,h,762,py,{z:14,s:'SemiBold',c:C.tanD,u:true,ls:14});const t=T(A,p,762,py+24,{z:17,c:C.ink,w:580,lh:155});py=t.y+t.height+26;}
T(A,'Mike',762,py-4,{f:'Yellowtail',z:56,c:C.ink,n:'signature (script accent)'});T(A,'Owner, Mike’s Plumbing Services',762,py+70,{z:14,c:C.muteD});
BTN(A,740,py+120,'More about Mike',{k:'ink',h:60,w:250,icon:'arrow'});BTN(A,1006,py+120,'Call (951) 809-9533',{k:'ghost',fg:C.ink,h:60,w:290,icon:'phone'});
A.resize(1440,Math.max(940,py+250));out.about=A.id;y+=A.height;
// 08 REVIEWS (ink) — Yelp widget style: header + featured quote + 3 cards
const Rv=F(D,'08 Reviews (Yelp, word for word)',0,y,1440,1200,C.ink);
const rb=HEAD(Rv,80,110,'Reviews',[['Neighbors call him\n'],['first.',1]],null,{dark:true,w:600,z:56});
const wid=F(Rv,'Yelp widget header (real, 17 Nov 2026)',760,110,600,150,C.char);wid.strokes=[solid(C.line)];R(wid,30,30,44,44,C.yelp,1,'yelp mark');T(wid,'y',44,36,{s:'Bold',z:26,c:C.white});
T(wid,'Mike’s Plumbing Services on Yelp',90,28,{z:16,s:'SemiBold',c:C.cream});T(wid,'5.0',90,54,{f:'Playfair Display',s:'Black',z:40,c:C.cream});STARS(wid,168,68,22,C.tan);T(wid,'20 reviews · all 5 stars · read 17 Nov 2026',90,108,{z:14,c:C.mute});
const fq=F(Rv,'featured review: Stuart W. (Yelp)',80,rb+60,620,560,C.char2);fq.clipsContent=false;T(fq,'“',30,-10,{f:'Playfair Display',s:'Black',z:160,c:C.tan,o:0.5});
T(fq,'Mike happened to call around 7pm the same day and offered to at least take a look… the entire time he was working he was extremely conscientious about my lawn and cleaning up any mess… I came home to a fixed leak and spotless work site.',40,110,{f:'Playfair Display',s:'Italic',z:26,c:C.cream,w:540,lh:140});
T(fq,'Stuart W.',40,470,{z:17,s:'SemiBold',c:C.cream});T(fq,'Water service line leak · Jul 16, 2025 · Yelp',40,496,{z:14,c:C.mute});STARS(fq,430,474,18,C.tan);
const rr=[['Mike did a couple of jobs in my house! He’s my first phone call when I need a plumber.','Brandon A.','Los Angeles, CA','Aug 20, 2026'],['Mike was able helped me out with a slab leak on short notice, rerouted water lines and new showers valves installed. He was upfront and honest with me on pricing and reliable when setting up the appointments.','Sal C.','Corona, CA','Jul 25, 2026'],['Highly recommend Mike for all your plumbing needs. We replaced 3 toilets and a pressure regulator… He’s reasonably priced, detailed & patient. Call him!','Eleanor M.','Los Angeles, CA','Jul 10, 2026']];
let ry=rb+60;rr.forEach(r=>{const c=REVIEW(Rv,730,ry,630,r[0],r[1],r[2],r[3],{dark:true,z:15});ry+=c.height+18;});
const bot=Math.max(ry,rb+60+560)+40;BTN(Rv,80,bot,'Read all 20 reviews',{k:'cream',h:60,w:280,icon:'arrow'});T(Rv,'Recommended by neighbors on Nextdoor too.',384,bot+18,{z:16,c:C.mute});
Rv.resize(1440,bot+140);out.reviews=Rv.id;y+=Rv.height;
out.y=y;return out;
