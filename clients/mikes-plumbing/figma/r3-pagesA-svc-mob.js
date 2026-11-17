const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const g=async id=>await figma.getNodeByIdAsync(id);
const M=await g('488:437');
for(const id of ['534:668','534:711','534:730','534:731','488:489','488:572','488:599','534:736']){const n=await g(id);if(n)n.remove();}
function PIN(p,x,y,n,o={}){const d=o.d||34;const f=F(p,'pin '+n,x-d/2,y-d/2,d,d,null);f.clipsContent=false;CIRC(f,0,0,d,{fill:o.bg||C.tan,stroke:o.ring||C.ink,sw:2});const t=T(f,String(n),0,0,{s:'Bold',z:o.z||15,c:o.fg||C.ink,w:d,a:'CENTER'});t.textAutoResize='NONE';t.resize(d,d);t.textAlignVertical='CENTER';return f;}
// ===== repair log (mobile: stacked log entries) =====
const RL=F(M,'Mobile reviews: the repair log (Yelp, word for word)',0,0,390,1800,C.paper);
EYE(RL,'What neighbors say',20,64,{z:11});
TR(RL,[['The repair ',{c:C.ink}],['log.',{s:'Black Italic',c:C.tanD}]],20,106,{f:'Playfair Display',s:'Black',z:46,lh:100,w:350,n:'H2'});
T(RL,'Real jobs, written up by the people who paid for them. Word for word from Mike’s Yelp page (5.0 stars, 20 reviews, read 17 Nov 2026).',20,170,{z:15,c:C.muteD,w:350,lh:155});
const LB=F(RL,'repair log book page',20,290,350,900,C.white);LB.clipsContent=false;LB.strokes=[solid('#D9D0B4')];
LB.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.12},offset:{x:0,y:10},radius:22,spread:0,visible:true,blendMode:'NORMAL'}];
const m1=R(LB,26,0,1,900,C.tan,1,'margin line');const m2=R(LB,30,0,1,900,C.tan,1,'margin line 2');
T(LB,'REPAIR LOG · MIKE’S PLUMBING',46,22,{z:10,s:'Bold',c:C.tanD,ls:22});R(LB,46,44,284,2,C.ink,1,'header rule');
const rows=[['Jul 25, 2026','Slab leak + reroute','Mike was able helped me out with a slab leak on short notice, rerouted water lines and new showers valves installed.','Sal C., Corona'],
['Jul 10, 2026','Toilets + regulator','We replaced 3 toilets and a pressure regulator. … He’s reasonably priced, detailed & patient. Call him!','Eleanor M., Los Angeles'],
['Jun 5, 2026','Regulator + shut-offs','Water pressure regulate,shut off valve and automatic water shut off WIFI connected … very professional and reasonable price','Tewolde T., Moreno Valley'],
['May 7, 2026','Garbage disposal','Our garbage disposal began to malfunction soon after our move to Murrieta, so we called Mike. He arrived on time and installed it quickly.','Jack D., Bonita CA']];
let y=60;rows.forEach((r,i)=>{T(LB,r[0],46,y+6,{z:12,s:'SemiBold',c:C.ink});
 const tt=figma.createText();tt.fontName={family:'Jost',style:'SemiBold'};tt.characters=r[1];tt.fontSize=11;const w=Math.ceil(tt.width)+24;tt.remove();
 const tg=F(LB,'job tag: '+r[1],330-w,y,w,26,null);tg.clipsContent=false;HX(tg,0,0,w,26,{fill:C.ink,cut:7});T(tg,r[1],0,6,{z:11,s:'SemiBold',c:C.cream,w,a:'CENTER'});
 const q=T(LB,'“'+r[2]+'”',46,y+38,{f:'Playfair Display',s:'Italic',z:15,c:C.ink,w:284,lh:140});
 const a=T(LB,r[3]+' · Yelp',46,q.y+q.height+8,{z:11,s:'SemiBold',c:C.tanD});STARS(LB,270,a.y+1,10,'#C99A2E');
 y=a.y+a.height+18;if(i<rows.length-1)R(LB,46,y-6,284,1,C.tan,0.7,'ruled line');y+=10;});
const LBH=y+70;LB.resize(350,LBH);m1.resize(1,LBH);m2.resize(1,LBH);
STAMP(LB,236,LBH-74,100,'FIVE STARS · EVERY ONE · FIVE STARS · EVERY ONE · ','5.0','YELP',{rot:-10,c:C.tanD,z:22,rz:8});
let cy=290+LBH+40;
const chips=[['star','5.0 · 20 Yelp reviews',0],['shield','Insured',0],['home','Family owned · Est. 2025',0],['shield','CSLB lic. #: Mike to confirm',1]];
chips.forEach((c,i)=>{const f=F(RL,'trust chip: '+c[1],20,cy+i*52,350,42,null);f.clipsContent=false;const h=HX(f,0,0,350,42,{fill:c[2]?null:C.cream,stroke:C.tanD,cut:12});if(c[2])h.dashPattern=[5,4];SVG(f,IC[c[0]](C.tanD),20,11,20);T(f,c[1],52,11,{z:14,s:'Medium',c:c[2]?C.tanD:C.ink});});
RL.resize(390,cy+4*52+50);
// ===== house cut-away (mobile: drawing then numbered legend) =====
const WP=F(M,'Mobile: where’s the problem? (house cut-away)',0,0,390,1400,C.ink);
EYE(WP,'Where’s the problem?',20,64,{z:11,c:C.tan});
TR(WP,[['Point at the spot.\n',{c:C.cream}],['Mike knows the fix.',{s:'Black Italic',c:C.tan}]],20,106,{f:'Playfair Display',s:'Black',z:36,lh:106,w:350,n:'H2'});
T(WP,'Every number is a job Mike does. Tap one, or just call and describe it.',20,200,{z:15,c:C.mute,w:350,lh:155});
const src=await g('558:1763');const art=src.clone();
const DR=F(WP,'house cut-away drawing (engraved lines, mobile crop)',0,270,390,300,null);DR.clipsContent=true;DR.appendChild(art);
const sc=390/800;art.rescale(sc);art.x=-6;art.y=-28*sc;
art.findAll(n=>'strokeWeight' in n&&typeof n.strokeWeight==='number').forEach(n=>{n.strokeWeight=Math.max(1,n.strokeWeight*1.7);});
const pins=[[164,276,1],[372,292,2],[480,226,3],[572,312,4],[250,452,5],[700,512,6]];
pins.forEach(p=>PIN(DR,-6+p[0]*sc,-28*sc+p[1]*sc,p[2],{d:26,z:13}));
T(DR,'Slab',30,-28*sc+382*sc+2,{z:9,s:'Bold',c:C.tan,ls:10,u:true});
const LG=F(WP,'legend (each links to its service page)',20,600,350,700,null);LG.clipsContent=false;
const items=[['Kitchen sink & disposal','Drain cleaning · garbage disposals'],['Toilets, sinks & faucets','Installs and repairs'],['Water heater closet','Water heater install & repair'],['Regulator & hose bib','Pressure regulators, shut-offs, hose bib moves'],['Under the slab','Leak detection & slab leaks'],['Yard sewer line','Camera inspection & root removal']];
items.forEach((it,i)=>{const yy=i*78;PIN(LG,15,yy+18,i+1,{d:30,z:14});T(LG,it[0],46,yy+2,{f:'Playfair Display',s:'Black',z:18,c:C.cream,w:270});T(LG,it[1],46,yy+30,{z:13,c:C.mute,w:270});SVG(LG,IC.arrow(C.tan),330,yy+8,18,'arrow');R(LG,46,yy+64,304,1,C.line,1,'row rule');});
const RS=F(LG,'pin 7: restaurant (separate building)',0,6*78+8,350,128,C.char);RS.strokes=[solid(C.tan)];RS.dashPattern=[5,4];
PIN(RS,32,38,7,{bg:C.cream,d:30,z:14});T(RS,'Own a restaurant?',62,22,{f:'Playfair Display',s:'Black',z:18,c:C.cream});T(RS,'Grease interceptors, kitchen drains, bar sinks. Grease is the family business.',62,50,{z:13,c:C.mute,w:270,lh:145});
WP.resize(390,600+6*78+8+128+64);
// ===== symptom finder (mobile: ledger cards) =====
const SF=F(M,'Mobile symptom finder (ledger)',0,0,390,1400,C.cream);
EYE(SF,'Not sure what it is?',20,64,{z:11});
TR(SF,[['Read the signs.\n',{c:C.ink}],['Then call Mike.',{s:'Black Italic',c:C.tanD}]],20,106,{f:'Playfair Display',s:'Black',z:38,lh:104,w:350,n:'H2'});
T(SF,'General plumbing signs, not a diagnosis. Mike confirms on site, and the estimate is free.',20,200,{z:15,c:C.muteD,w:350,lh:155});
const sy=[['Slow drains, gurgling, sewer smell','Drain cleaning'],['Backups in more than one drain','Sewer line + camera'],['Damp floor or a warm spot underfoot','Slab leak'],['Water bill jumped, nothing changed','Hidden leak'],['No hot water, or a leaking tank','Water heater'],['Banging pipes, very strong pressure','Pressure regulator'],['Toilet keeps running or rocks','Toilet repair'],['Disposal hums but won’t spin','Garbage disposal'],['Restaurant floor drains backing up','Grease interceptor']];
const PG=F(SF,'ledger page',20,290,350,100,C.paper);PG.clipsContent=false;PG.strokes=[solid('#D9D0B4')];
PG.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.10},offset:{x:0,y:10},radius:22,spread:0,visible:true,blendMode:'NORMAL'}];
const bind=R(PG,0,0,8,100,C.ink,1,'binding');
T(PG,'If you see this → it’s probably',28,22,{z:10,s:'Bold',c:C.tanD,ls:16,u:true});R(PG,28,44,302,2,C.ink,1,'header rule');
sy.forEach((s,i)=>{const yy=56+i*82;T(PG,s[0],28,yy+8,{z:14,c:C.muteD,w:280});
 T(PG,s[1],28,yy+32,{f:'Playfair Display',s:'Black',z:19,c:C.ink});SVG(PG,IC.arrow(C.tanD),308,yy+34,18,'arrow');
 if(i<sy.length-1)R(PG,28,yy+72,302,1,C.tan,0.8,'ruled line');});
const PH=56+sy.length*82+10;PG.resize(350,PH);bind.resize(8,PH);
BTN(SF,20,290+PH+36,'Call (951) 809-9533',{k:'ink',icon:'phone',h:56,w:350,z:15});
SF.resize(390,290+PH+36+56+64);
// ===== footer clone =====
const ft=(await g('557:1020')).clone();M.appendChild(ft);ft.x=0;
// ===== restack =====
const order=['488:438','488:448',RL.id,'488:468',WP.id,SF.id,'488:608','488:639',ft.id,'534:766'];
let yy=0;for(const id of order){const n=await g(id);n.y=yy;yy+=n.height;}
M.resize(390,yy);M.appendChild(await g('534:766'));M.appendChild(await g('488:438'));
return {RL:RL.id,WP:WP.id,SF:SF.id,ft:ft.id,h:yy};
