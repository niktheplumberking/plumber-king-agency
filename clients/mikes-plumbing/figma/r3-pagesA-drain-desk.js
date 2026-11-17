const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const g=async id=>await figma.getNodeByIdAsync(id);
const D=await g('493:437');
for(const id of ['535:443','535:511','535:530','535:531','535:609']){const n=await g(id);if(n)n.remove();}
const svgN=(p,s,x,y,name)=>{const n=figma.createNodeFromSvg(s);p.appendChild(n);n.x=x;n.y=y;n.name=name;return n;};
// receipt: white slip, hole at top, torn bottom
function RECEIPT(p,x,y,w,r,o={}){const f=F(p,'receipt: '+r[1]+' (Yelp, word for word)',x,y,w,100,C.white);f.clipsContent=false;
 f.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.16},offset:{x:0,y:6},radius:14,spread:0,visible:true,blendMode:'NORMAL'}];
 CIRC(f,w/2-7,16,14,{fill:C.ink,stroke:C.ink,sw:1});
 T(f,'MIKE’S PLUMBING · YELP',0,40,{z:10,s:'Bold',c:C.tanD,w,a:'CENTER',ls:20});
 const r1=R(f,16,62,w-32,0,null,1,'dashed rule');r1.strokes=[solid(C.ink)];r1.strokeWeight=1;r1.dashPattern=[3,3];
 T(f,r[3],16,72,{z:11,s:'SemiBold',c:C.ink});STARS(f,w-16-5*13,74,10,'#C99A2E');
 const q=T(f,r[0],16,98,{z:o.z||13,c:C.ink,w:w-32,lh:150});
 const r2=R(f,16,q.y+q.height+12,w-32,0,null,1,'dashed rule');r2.strokes=[solid(C.ink)];r2.strokeWeight=1;r2.dashPattern=[3,3];
 const nm=T(f,r[1].toUpperCase(),16,q.y+q.height+22,{z:11,s:'Bold',c:C.ink,ls:12});T(f,r[2],16,nm.y+18,{z:11,c:C.muteD});
 const H=nm.y+44;f.resize(w,H);
 let d='M0 0 ';for(let i=0;i<=w/10;i++)d+=`L${i*10+5} ${i%2?0:9} L${Math.min(w,i*10+10)} 0 `;
 svgN(f,`<svg width="${w}" height="10" viewBox="0 0 ${w} 10" xmlns="http://www.w3.org/2000/svg"><path d="${d}Z" fill="#FFFFFF"/></svg>`,0,H-1,'torn edge');
 if(o.rot)f.rotation=o.rot;return f;}
// ===== 04 Receipts on the spike =====
const SP=F(D,'04 Reviews: receipts on the spike (Yelp, word for word)',0,0,1440,980,C.cream);
EYE(SP,'What neighbors say',80,120);
TR(SP,[['Receipts\n',{c:C.ink}],['on the spike.',{s:'Black Italic',c:C.tanD}]],80,170,{f:'Playfair Display',s:'Black',z:68,lh:100,w:440,n:'H2'});
T(SP,'Paid jobs, filed the old way. Every word copied from Mike’s Yelp page (5.0 stars, 20 reviews, read 17 Nov 2026).',80,330,{z:17,c:C.muteD,w:390,lh:155});
const tl=[['5.0 on Yelp · 20 reviews',0],['Insured (Mike’s own claim)',0],['Family owned · Est. 2025',0],['CSLB lic. #: Mike to confirm',1]];
tl.forEach((t,i)=>{const yy=450+i*44;SVG(SP,IC[t[1]?'shield':'check'](C.tanD),80,yy,20);T(SP,t[0],112,yy,{z:15,s:'Medium',c:t[1]?C.tanD:C.ink});if(i<3)R(SP,80,yy+32,380,1,C.tan,1,'rule');});
const lk=T(SP,'Read all 20 on Yelp  →',80,650,{z:15,s:'SemiBold',c:C.ink,u:true,ls:6});
const BX=540,BY=660;
const front=[['Amazing! wonderful! Responded same day I called. The job was much more complicated than expected...Michael somehow made everything work and wasn’t gonna leave until fixed. As a single female I appreciate his honesty and excellent workmanship more than words can convey.','Debbie H.','Menifee, CA','Jul 14, 2025'],
['awesome service. showed up on time. Completed the service requested and left the area super clean. Would definitely recommend. 5 stars.','Julian T.','Irvine, CA','Jun 12, 2025'],
['Mike was great , he responded very quickly and he was honest,efficient and very respectful.He addressed all my plumbing issues and suggested the best option which was to caulk the base of one toilet and replace the other toilet. His price was very fair and within my budget.','Laura G.','Clarksville, TN','Aug 20, 2025']];
const back=[['Absolutely wonderful service, repaired water main to my house and installed new water heater all in one afternoon. Excellent service highly recommend','Robert U.','Overland Park, KS','Jul 19, 2025'],
['Owner Mike came himself and took care of issues I had with my toilet and sink. Was on time and took care of everything pretty quick.','Isaiah C.','Riverside, CA','Jun 12, 2025'],
['Mike did a couple of jobs in my house! He’s my first phone call when I need a plumber.','Brandon A.','Los Angeles, CA','Aug 20, 2026']];
const RW=250;const cx=[BX+137,BX+410,BX+683];
// spikes (behind)
cx.forEach((x,i)=>{svgN(SP,`<svg width="12" height="${BY-120}" viewBox="0 0 12 ${BY-120}" xmlns="http://www.w3.org/2000/svg"><path d="M6 0 L10 22 V${BY-120} H2 V22 Z" fill="${C.ink}"/><path d="M6 4 L8 22 V${BY-120}" stroke="${C.tan}" stroke-width="1" opacity="0.6"/></svg>`,x-6,120,'spike '+(i+1));});
cx.forEach((x,i)=>{const b=RECEIPT(SP,x-RW/2,146,RW,back[i],{rot:[2.5,-2.5,2][i],z:13});b.children.find(c=>c.type==='TEXT'&&c.characters.startsWith('MIKE')).visible=false;});
cx.forEach((x,i)=>{RECEIPT(SP,x-RW/2,186+[0,20,6][i],RW,front[i],{rot:[-1.5,1,-0.8][i]});});
// base board
const base=F(SP,'spike base board',BX,BY,820,44,C.ink);R(base,0,0,820,4,C.tanD,1,'brass edge');
T(base,'FILED BY MIKE · RIVERSIDE',0,16,{z:10,s:'Bold',c:C.tan,w:820,a:'CENTER',ls:30});
SP.resize(1440,BY+44+110);
// ===== Inside your drain line (cross-section) =====
const IX=F(D,'06 Inside your drain line (cross-section)',0,0,1440,1080,C.paper);
EYE(IX,'Inside your drain line',80,120);
TR(IX,[['What’s really\n',{c:C.ink}],['in the pipe.',{s:'Black Italic',c:C.tanD}]],80,170,{f:'Playfair Display',s:'Black',z:64,lh:100,w:640,n:'H2'});
T(IX,'A general picture of how drain lines block up over time. It is not a diagnosis. Mike can run a camera down your line to see what is actually in there.',840,214,{z:17,c:C.muteD,w:500,lh:155});
const ink=C.ink,tn=C.tan,td=C.tanD;
let hatch='';for(let x=0;x<1280;x+=14){hatch+=`<path d="M${x} 60 l12 18" /><path d="M${x} 302 l12 18" />`;}
let dots='';[[90,98],[130,104],[180,112],[230,118],[300,124],[350,112],[400,96],[110,286],[170,276],[220,270],[290,268],[350,272],[410,288]].forEach(d=>dots+=`<circle cx="${d[0]}" cy="${d[1]}" r="2" fill="${ink}"/>`);
const xs=`<svg width="1280" height="380" viewBox="0 0 1280 380" fill="none" xmlns="http://www.w3.org/2000/svg">
<g stroke="${ink}" stroke-width="1" opacity="0.55">${hatch}</g>
<path d="M0 60 H1280 M0 320 H1280" stroke="${ink}" stroke-width="3"/><path d="M0 80 H1280 M0 300 H1280" stroke="${ink}" stroke-width="1.5"/>
<rect x="622" y="44" width="40" height="292" stroke="${ink}" stroke-width="2" fill="${C.paper}"/><path d="M622 80 H662 M622 300 H662" stroke="${ink}" stroke-width="1"/>
<path d="M20 80 C80 118 150 122 220 130 C300 140 360 128 440 80 Z" fill="${tn}" stroke="${ink}" stroke-width="1.5"/>
<path d="M20 300 C100 258 190 262 290 256 C360 252 410 270 440 300 Z" fill="${tn}" stroke="${ink}" stroke-width="1.5"/>
${dots}
<path d="M470 300 C540 282 600 276 700 280 C770 284 820 292 850 300 Z" fill="${ink}" fill-opacity="0.18" stroke="${ink}" stroke-width="1.2"/>
<g stroke="${ink}" stroke-width="2" stroke-linecap="round">
<path d="M640 80 C632 130 604 168 566 196 C544 212 520 226 494 232"/><path d="M646 80 C662 140 700 170 740 206 C764 226 792 236 826 236"/>
<path d="M642 80 C646 150 652 206 624 266"/><path d="M604 168 C590 150 572 148 556 152"/><path d="M700 170 C716 150 734 146 752 150"/>
<path d="M650 200 C670 214 684 236 690 262"/><path d="M566 196 C560 222 548 240 534 252"/></g>
<path d="M460 50 V330 M860 50 V330" stroke="${td}" stroke-width="1" stroke-dasharray="4 6"/>
<g stroke="${ink}" stroke-width="2" stroke-linecap="round"><path d="M910 160 H1200 M1186 150 L1200 160 L1186 170"/><path d="M930 200 H1220 M1206 190 L1220 200 L1206 210"/><path d="M910 240 H1200 M1186 230 L1200 240 L1186 250"/></g>
</svg>`;
const DRW=F(IX,'pipe cross-section drawing (engraved)',80,400,1280,380,null);DRW.clipsContent=false;svgN(DRW,xs,0,0,'engraving: pipe with grease, roots, sludge, clean flow');
function LPIN(p,x,y,l){const f=F(p,'marker '+l,x-18,y-18,36,36,null);f.clipsContent=false;CIRC(f,0,0,36,{fill:C.ink,stroke:C.ink,sw:2});const t=T(f,l,0,0,{s:'Bold',z:15,c:C.cream,w:36,a:'CENTER'});t.textAutoResize='NONE';t.resize(36,36);t.textAlignVertical='CENTER';return f;}
LPIN(DRW,230,20,'A');LPIN(DRW,660,20,'B');LPIN(DRW,1070,20,'C');
const cap=[['A','Grease coats the walls','Cooking grease, soap and food stick to the pipe and narrow it a little more every week.',80],
['B','Roots get in at the joints','Tree roots find the seams in older sewer lines and grow into a net that catches everything.',520],
['C','Cleaned: back to full flow','Jetting scours the walls back to bare pipe, so water moves the way it did when the line was new.',960]];
cap.forEach(c=>{const x=c[3];LPIN(IX,x+18,836,c[0]);T(IX,c[1],x+52,822,{f:'Playfair Display',s:'Black',z:22,c:C.ink,w:340});T(IX,c[2],x+52,860,{z:15,c:C.muteD,w:340,lh:155});});
IX.resize(1440,1060);
// ===== Snaking vs hydro jetting (two engraved panels) =====
const SV=F(D,'07 Snaking vs hydro jetting (engraved panels)',0,0,1440,1040,C.ink);
EYE(SV,'Two tools, two jobs',80,120,{c:C.tan});
TR(SV,[['Snaking or ',{c:C.cream}],['hydro jetting?',{s:'Black Italic',c:C.tan}]],80,170,{f:'Playfair Display',s:'Black',z:60,lh:104,w:1280,n:'H2'});
T(SV,'Mike looks at your line first and tells you which one it needs, and why.',80,250,{z:18,c:C.mute,w:700,lh:155});
const pipe=(inner)=>`<svg width="520" height="200" viewBox="0 0 520 200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 36 H520 M0 164 H520" stroke="${C.cream}" stroke-width="3"/><path d="M0 48 H520 M0 152 H520" stroke="${C.cream}" stroke-width="1" opacity="0.6"/>${inner}</svg>`;
let coil='M0 100';for(let x=0;x<300;x+=20)coil+=` C${x+5} 84 ${x+15} 116 ${x+20} 100`;
const snake=pipe(`<path d="${coil}" stroke="${C.cream}" stroke-width="2.5"/><path d="M300 86 L338 100 L300 114 Z M306 92 L326 100 M306 108 L326 100" stroke="${C.cream}" stroke-width="2" stroke-linejoin="round"/>
<path d="M352 52 C380 70 372 96 392 110 C410 124 396 140 372 150 L360 150 C346 120 340 80 352 52 Z" fill="${C.tan}" fill-opacity="0.35" stroke="${C.tan}" stroke-width="1.5"/><path d="M344 62 l-10 -6 M344 140 l-10 6 M340 100 l-12 0" stroke="${C.tan}" stroke-width="1.5"/>`);
let spray='';[[-60,-52],[-80,-46],[-100,-40],[-60,52],[-80,46],[-100,40]].forEach(s=>spray+=`<path d="M330 100 L${330+s[0]} ${100+s[1]}" stroke="${C.cream}" stroke-width="1.5" stroke-dasharray="4 4"/>`);
const jet=pipe(`<path d="M0 100 H320" stroke="${C.cream}" stroke-width="5"/><rect x="316" y="90" width="30" height="20" rx="6" stroke="${C.cream}" stroke-width="2"/>${spray}
<path d="M360 48 C400 62 450 58 520 50 V48 Z M360 152 C400 136 460 140 520 146 V152 Z" fill="${C.tan}" fill-opacity="0.45" stroke="${C.tan}" stroke-width="1.5"/><path d="M120 100 H180 M164 92 L180 100 L164 108" stroke="${C.tan}" stroke-width="1.5"/>`);
const panels=[['No. 1','Snaking','A drain snake (a spinning steel cable called an auger) breaks up the clog and pulls it out.','Single clogs in sinks, tubs, showers and toilets.','Opens a path through the clog.',snake],
['No. 2','Hydro jetting','High-pressure water jets spray backwards and scour grease, sludge and roots off the pipe walls.','Grease lines, restaurant drains, roots and clogs that keep coming back.','Cleans the whole pipe wall, not just a hole through it.',jet]];
panels.forEach((p,i)=>{const x=80+i*660;const P=F(SV,'engraved panel: '+p[1],x,340,620,620,null);P.clipsContent=false;
 const o=R(P,0,0,620,620,null,1,'outer rule');o.strokes=[solid(C.tan)];o.strokeWeight=2;const n=R(P,10,10,600,600,null,1,'inner rule');n.strokes=[solid(C.tan)];n.strokeWeight=1;
 [[10,10],[598,10],[10,598],[598,598]].forEach(c=>{const d=R(P,c[0]-4,c[1]-4,12,12,C.ink,1,'corner');d.rotation=0;d.strokes=[solid(C.tan)];});
 T(P,p[0].toUpperCase(),0,44,{z:11,s:'Bold',c:C.tan,w:620,a:'CENTER',ls:30});
 T(P,p[1],0,66,{f:'Playfair Display',s:'Black Italic',z:46,c:C.cream,w:620,a:'CENTER'});
 svgN(P,p[5],50,140,'engraving: '+p[1]);
 const rows=[['What it does',p[2]],['Best for',p[3]],['The result',p[4]]];
 rows.forEach((r,k)=>{const yy=370+k*76;R(P,50,yy-12,520,1,C.line,1,'rule');T(P,r[0].toUpperCase(),50,yy,{z:11,s:'Bold',c:C.tan,ls:16,w:130});T(P,r[1],190,yy-2,{z:15,c:C.cream,w:380,lh:150});});
});
const vs=F(SV,'or medallion',720-36,620,72,72,null);vs.clipsContent=false;CIRC(vs,0,0,72,{fill:C.ink,stroke:C.tan,sw:2});const vt=T(vs,'or',0,0,{f:'Playfair Display',s:'Black Italic',z:26,c:C.tan,w:72,a:'CENTER'});vt.textAutoResize='NONE';vt.resize(72,72);vt.textAlignVertical='CENTER';
SV.resize(1440,340+620+110);
// ===== footer =====
const ft=(await g('556:2551')).clone();D.appendChild(ft);ft.x=0;
// ===== restack =====
const order=['493:438','493:448','493:464',SP.id,'493:485','493:510',IX.id,SV.id,'493:554','493:587','493:649','493:676','535:542',ft.id];
let yy=0;const pos={};for(const id of order){const n=await g(id);n.y=yy;pos[id]=yy;yy+=n.height;}
const sl=await g('535:608');sl.y=pos['535:542'];D.resize(1440,yy);D.appendChild(sl);
return {SP:SP.id,IX:IX.id,SV:SV.id,ft:ft.id,h:yy};
