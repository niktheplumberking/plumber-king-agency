const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const g=async id=>await figma.getNodeByIdAsync(id);
const M=await g('493:807');
for(const id of ['535:666','535:709','535:728','535:729','535:734']){const n=await g(id);if(n)n.remove();}
const svgN=(p,s,x,y,name)=>{const n=figma.createNodeFromSvg(s);p.appendChild(n);n.x=x;n.y=y;n.name=name;return n;};
function RECEIPT(p,x,y,w,r,o={}){const f=F(p,'receipt: '+r[1]+' (Yelp, word for word)',x,y,w,100,C.white);f.clipsContent=false;
 f.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.16},offset:{x:0,y:6},radius:14,spread:0,visible:true,blendMode:'NORMAL'}];
 CIRC(f,w/2-7,16,14,{fill:C.ink,stroke:C.ink,sw:1});
 const hd=T(f,'MIKE’S PLUMBING · YELP',0,40,{z:10,s:'Bold',c:C.tanD,w,a:'CENTER',ls:20});if(o.back)hd.visible=false;
 const r1=R(f,16,62,w-32,0,null,1,'dashed rule');r1.strokes=[solid(C.ink)];r1.strokeWeight=1;r1.dashPattern=[3,3];
 T(f,r[3],16,72,{z:11,s:'SemiBold',c:C.ink});STARS(f,w-16-5*13,74,10,'#C99A2E');
 const q=T(f,r[0],16,98,{z:14,c:C.ink,w:w-32,lh:150});
 const r2=R(f,16,q.y+q.height+12,w-32,0,null,1,'dashed rule');r2.strokes=[solid(C.ink)];r2.strokeWeight=1;r2.dashPattern=[3,3];
 const nm=T(f,r[1].toUpperCase(),16,q.y+q.height+22,{z:11,s:'Bold',c:C.ink,ls:12});T(f,r[2],16,nm.y+18,{z:11,c:C.muteD});
 const H=nm.y+44;f.resize(w,H);
 let d='M0 0 ';for(let i=0;i<=w/10;i++)d+=`L${i*10+5} ${i%2?0:9} L${Math.min(w,i*10+10)} 0 `;
 svgN(f,`<svg width="${w}" height="10" viewBox="0 0 ${w} 10" xmlns="http://www.w3.org/2000/svg"><path d="${d}Z" fill="#FFFFFF"/></svg>`,0,H-1,'torn edge');
 if(o.rot)f.rotation=o.rot;return f;}
function LPIN(p,x,y,l,d=32){const f=F(p,'marker '+l,x-d/2,y-d/2,d,d,null);f.clipsContent=false;CIRC(f,0,0,d,{fill:C.ink,stroke:C.ink,sw:2});const t=T(f,l,0,0,{s:'Bold',z:14,c:C.cream,w:d,a:'CENTER'});t.textAutoResize='NONE';t.resize(d,d);t.textAlignVertical='CENTER';return f;}
// ===== receipts on the spike (mobile: swipe row of spikes) =====
const SP=F(M,'Mobile reviews: receipts on the spike (Yelp, word for word)',0,0,390,1400,C.cream);
EYE(SP,'What neighbors say',20,64,{z:11});
TR(SP,[['Receipts\n',{c:C.ink}],['on the spike.',{s:'Black Italic',c:C.tanD}]],20,106,{f:'Playfair Display',s:'Black',z:44,lh:100,w:350,n:'H2'});
T(SP,'Paid jobs, filed the old way. Every word copied from Mike’s Yelp page (5.0 stars, 20 reviews, read 17 Nov 2026).',20,212,{z:15,c:C.muteD,w:350,lh:155});
const front=[['Amazing! wonderful! Responded same day I called. The job was much more complicated than expected...Michael somehow made everything work and wasn’t gonna leave until fixed. As a single female I appreciate his honesty and excellent workmanship more than words can convey.','Debbie H.','Menifee, CA','Jul 14, 2025'],
['awesome service. showed up on time. Completed the service requested and left the area super clean. Would definitely recommend. 5 stars.','Julian T.','Irvine, CA','Jun 12, 2025'],
['Mike was great , he responded very quickly and he was honest,efficient and very respectful.He addressed all my plumbing issues and suggested the best option which was to caulk the base of one toilet and replace the other toilet. His price was very fair and within my budget.','Laura G.','Clarksville, TN','Aug 20, 2025']];
const back=[['Absolutely wonderful service, repaired water main to my house and installed new water heater all in one afternoon. Excellent service highly recommend','Robert U.','Overland Park, KS','Jul 19, 2025'],
['Owner Mike came himself and took care of issues I had with my toilet and sink. Was on time and took care of everything pretty quick.','Isaiah C.','Riverside, CA','Jun 12, 2025'],
['Mike did a couple of jobs in my house! He’s my first phone call when I need a plumber.','Brandon A.','Los Angeles, CA','Aug 20, 2026']];
const LN=F(SP,'spike row (swipe sideways)',0,310,390,560,null);LN.clipsContent=true;
const RW=290,BY=500;const cx=[195,195+320,195+640];
cx.forEach((x,i)=>svgN(LN,`<svg width="12" height="${BY-20}" viewBox="0 0 12 ${BY-20}" xmlns="http://www.w3.org/2000/svg"><path d="M6 0 L10 22 V${BY-20} H2 V22 Z" fill="${C.ink}"/></svg>`,x-6,20,'spike '+(i+1)));
cx.forEach((x,i)=>RECEIPT(LN,x-RW/2,44,RW,back[i],{rot:[2,-2,2][i],back:1}));
cx.forEach((x,i)=>RECEIPT(LN,x-RW/2,80,RW,front[i],{rot:[-1,1,-1][i]}));
const base=F(LN,'board',0,BY,1100,36,C.ink);R(base,0,0,1100,4,C.tanD,1,'brass edge');
T(SP,'←  swipe for the next receipt',20,890,{z:11,s:'SemiBold',c:C.tanD,ls:14,u:true});
const tl=[['5.0 on Yelp · 20 reviews',0],['Insured (Mike’s own claim)',0],['Family owned · Est. 2025',0],['CSLB lic. #: Mike to confirm',1]];
tl.forEach((t,i)=>{const yy=940+i*44;SVG(SP,IC[t[1]?'shield':'check'](C.tanD),20,yy,20);T(SP,t[0],52,yy,{z:15,s:'Medium',c:t[1]?C.tanD:C.ink});if(i<3)R(SP,20,yy+32,350,1,C.tan,1,'rule');});
T(SP,'Read all 20 on Yelp  →',20,1130,{z:15,s:'SemiBold',c:C.ink,u:true,ls:6});
SP.resize(390,1130+22+64);
// ===== inside your drain line (mobile: the pipe runs DOWN the page) =====
const IX=F(M,'Mobile: inside your drain line (vertical cross-section)',0,0,390,1200,C.paper);
EYE(IX,'Inside your drain line',20,64,{z:11});
TR(IX,[['What’s really\n',{c:C.ink}],['in the pipe.',{s:'Black Italic',c:C.tanD}]],20,106,{f:'Playfair Display',s:'Black',z:40,lh:102,w:350,n:'H2'});
T(IX,'A general picture of how drain lines block up over time, not a diagnosis. Mike can run a camera down your line to see what is actually in there.',20,206,{z:15,c:C.muteD,w:350,lh:155});
const ink=C.ink,tn=C.tan;let h='';for(let y=0;y<840;y+=14)h+=`<path d="M0 ${y} l12 10"/><path d="M88 ${y} l12 10"/>`;
const vs=`<svg width="100" height="840" viewBox="0 0 100 840" fill="none" xmlns="http://www.w3.org/2000/svg">
<g stroke="${ink}" stroke-width="1" opacity="0.5">${h}</g>
<path d="M0 0 V840 M100 0 V840" stroke="${ink}" stroke-width="3"/><path d="M12 0 V840 M88 0 V840" stroke="${ink}" stroke-width="1.5"/>
<path d="M12 20 C34 60 36 120 30 160 C26 200 32 230 12 260 Z" fill="${tn}" stroke="${ink}" stroke-width="1.5"/>
<path d="M88 30 C70 70 64 120 70 170 C74 210 70 236 88 256 Z" fill="${tn}" stroke="${ink}" stroke-width="1.5"/>
<circle cx="22" cy="90" r="2" fill="${ink}"/><circle cx="24" cy="150" r="2" fill="${ink}"/><circle cx="78" cy="110" r="2" fill="${ink}"/><circle cx="76" cy="200" r="2" fill="${ink}"/>
<rect x="-6" y="400" width="112" height="28" stroke="${ink}" stroke-width="2" fill="${C.paper}"/>
<g stroke="${ink}" stroke-width="2" stroke-linecap="round">
<path d="M12 414 C40 420 56 450 60 490 C62 520 50 540 36 556"/><path d="M88 414 C66 430 48 460 44 500"/><path d="M12 420 C30 450 26 486 18 520"/><path d="M60 490 C72 500 80 516 82 536"/><path d="M50 440 C60 430 70 428 80 432"/></g>
<path d="M0 290 H100 M0 590 H100" stroke="${C.tanD}" stroke-width="1" stroke-dasharray="4 6"/>
<g stroke="${ink}" stroke-width="2" stroke-linecap="round"><path d="M50 640 V800 M40 786 L50 800 L60 786"/><path d="M30 660 V780 M22 768 L30 780 L38 768"/><path d="M70 660 V780 M62 768 L70 780 L78 768"/></g>
</svg>`;
svgN(IX,vs,40,330,'engraving: pipe running down, grease, roots, clean flow');
const cap=[['A','Grease coats the walls','Cooking grease, soap and food stick to the pipe and narrow it a little more every week.',330+130],
['B','Roots get in at the joints','Tree roots find the seams in older sewer lines and grow into a net that catches everything.',330+430],
['C','Cleaned: back to full flow','Jetting scours the walls back to bare pipe, so water moves the way it did when the line was new.',330+720]];
cap.forEach(c=>{LPIN(IX,170,c[3]-50,c[0]);const l=R(IX,146,c[3]-50,8,1,C.tanD,1,'leader');
 const tt=T(IX,c[1],160,c[3]-24,{f:'Playfair Display',s:'Black',z:19,c:C.ink,w:210});T(IX,c[2],160,tt.y+tt.height+8,{z:14,c:C.muteD,w:210,lh:150});});
IX.resize(390,330+840+64);
// ===== snaking vs hydro jetting (mobile: stacked engraved panels) =====
const SV=F(M,'Mobile: snaking vs hydro jetting (engraved panels)',0,0,390,1600,C.ink);
EYE(SV,'Two tools, two jobs',20,64,{z:11,c:C.tan});
TR(SV,[['Snaking or\n',{c:C.cream}],['hydro jetting?',{s:'Black Italic',c:C.tan}]],20,106,{f:'Playfair Display',s:'Black',z:38,lh:104,w:350,n:'H2'});
T(SV,'Mike looks at your line first and tells you which one it needs, and why.',20,200,{z:15,c:C.mute,w:350,lh:155});
const dsv=(await g('558:13526'));const engs=dsv.findAll(n=>n.name.startsWith('engraving: '));
const panels=[['No. 1','Snaking','A drain snake (a spinning steel cable called an auger) breaks up the clog and pulls it out.','Single clogs in sinks, tubs, showers and toilets.','Opens a path through the clog.'],
['No. 2','Hydro jetting','High-pressure water jets spray backwards and scour grease, sludge and roots off the pipe walls.','Grease lines, restaurant drains, roots and clogs that keep coming back.','Cleans the whole pipe wall, not just a hole through it.']];
let py=290;panels.forEach((p,i)=>{const P=F(SV,'engraved panel: '+p[1],20,py,350,600,null);P.clipsContent=false;
 T(P,p[0].toUpperCase(),0,32,{z:10,s:'Bold',c:C.tan,w:350,a:'CENTER',ls:30});T(P,p[1],0,50,{f:'Playfair Display',s:'Black Italic',z:34,c:C.cream,w:350,a:'CENTER'});
 const e=engs.find(n=>n.name==='engraving: '+p[1]).clone();P.appendChild(e);e.rescale(310/520);e.x=20;e.y=112;
 e.findAll(n=>'strokeWeight' in n&&typeof n.strokeWeight==='number').forEach(n=>{n.strokeWeight=Math.max(1,n.strokeWeight*1.5);});
 let yy=112+e.height+28;[['What it does',p[2]],['Best for',p[3]],['The result',p[4]]].forEach(r=>{R(P,20,yy,310,1,C.line,1,'rule');T(P,r[0].toUpperCase(),20,yy+14,{z:10,s:'Bold',c:C.tan,ls:16});const t=T(P,r[1],20,yy+34,{z:14,c:C.cream,w:310,lh:150});yy=t.y+t.height+16;});
 P.resize(350,yy+14);const o=R(P,0,0,350,P.height,null,1,'outer rule');o.strokes=[solid(C.tan)];o.strokeWeight=2;const n=R(P,8,8,334,P.height-16,null,1,'inner rule');n.strokes=[solid(C.tan)];n.strokeWeight=1;
 py+=P.height+(i?0:56);
 if(!i){const m=F(SV,'or medallion',195-28,py-28-14,56,56,null);m.clipsContent=false;CIRC(m,0,0,56,{fill:C.ink,stroke:C.tan,sw:2});const vt=T(m,'or',0,0,{f:'Playfair Display',s:'Black Italic',z:22,c:C.tan,w:56,a:'CENTER'});vt.textAutoResize='NONE';vt.resize(56,56);vt.textAlignVertical='CENTER';}
});
SV.resize(390,py+64);SV.appendChild(SV.findOne(n=>n.name==='or medallion'));
// ===== footer =====
const ft=(await g('557:1020')).clone();M.appendChild(ft);ft.x=0;
const order=['493:808','493:818',SP.id,'493:838','493:858',IX.id,SV.id,'493:902','493:929','493:990','493:1016','493:1047',ft.id,'535:764'];
let y=0;for(const id of order){const n=await g(id);n.y=y;y+=n.height;}
M.resize(390,y);M.appendChild(await g('535:764'));M.appendChild(await g('493:808'));
return {SP:SP.id,IX:IX.id,SV:SV.id,ft:ft.id,h:y};
