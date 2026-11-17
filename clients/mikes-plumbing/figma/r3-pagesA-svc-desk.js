const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const g=async id=>await figma.getNodeByIdAsync(id);
const D=await g('486:1743');
for(const id of ['534:443','534:511','534:530','534:531','486:1814','486:1909','486:1936','534:611']){const n=await g(id);if(n)n.remove();}
// pin helper: numbered circle, number centred
function PIN(p,x,y,n,o={}){const f=F(p,'pin '+n,x-17,y-17,34,34,null);f.clipsContent=false;CIRC(f,0,0,34,{fill:o.bg||C.tan,stroke:o.ring||C.ink,sw:2});const t=T(f,String(n),0,0,{s:'Bold',z:15,c:o.fg||C.ink,w:34,a:'CENTER'});t.textAutoResize='NONE';t.resize(34,34);t.textAlignVertical='CENTER';return f;}
// ===== 04 Repair log (reviews right after hero) =====
const RL=F(D,'04 Reviews: the repair log (Yelp, word for word)',0,0,1440,900,C.paper);
EYE(RL,'What neighbors say',80,120);
TR(RL,[['The repair\n',{c:C.ink}],['log.',{s:'Black Italic',c:C.tanD}]],80,170,{f:'Playfair Display',s:'Black',z:72,lh:100,w:420,n:'H2'});
T(RL,'Real jobs, written up by the people who paid for them. Copied word for word from Mike’s Yelp page (5.0 stars, 20 reviews, read 17 Nov 2026).',80,330,{z:17,c:C.muteD,w:380,lh:155});
const chips=[['star','5.0 · 20 Yelp reviews',0],['shield','Insured',0],['home','Family owned · Est. 2025',0],['shield','CSLB lic. #: Mike to confirm',1]];
chips.forEach((c,i)=>{const y=470+i*54;const f=F(RL,'trust chip: '+c[1],80,y,360,42,null);f.clipsContent=false;const h=HX(f,0,0,360,42,{fill:c[2]?null:C.cream,stroke:C.tanD,cut:12});if(c[2])h.dashPattern=[5,4];SVG(f,IC[c[0]](C.tanD),20,11,20);T(f,c[1],52,11,{z:14,s:'Medium',c:c[2]?C.tanD:C.ink});});
// log book page
const LB=F(RL,'repair log book page',520,110,840,660,C.white);LB.clipsContent=false;LB.strokes=[solid('#D9D0B4')];
LB.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.12},offset:{x:0,y:14},radius:30,spread:0,visible:true,blendMode:'NORMAL'}];
R(LB,64,0,1,660,C.tan,1,'margin line');R(LB,68,0,1,660,C.tan,1,'margin line 2');
T(LB,'REPAIR LOG · MIKE’S PLUMBING SERVICES',96,28,{z:11,s:'Bold',c:C.tanD,ls:24});
const hd=[['Date',96],['Job',220],['In their words',410]];hd.forEach(h=>T(LB,h[0],h[1],64,{z:11,s:'Bold',c:C.ink,ls:16,u:true}));R(LB,96,86,712,2,C.ink,1,'header rule');
const rows=[['Jul 25, 2026','Slab leak + reroute','Mike was able helped me out with a slab leak on short notice, rerouted water lines and new showers valves installed.','Sal C., Corona'],
['Jul 10, 2026','Toilets + regulator','We replaced 3 toilets and a pressure regulator. … He’s reasonably priced, detailed & patient. Call him!','Eleanor M., Los Angeles'],
['Jun 5, 2026','Regulator + shut-offs','Water pressure regulate,shut off valve and automatic water shut off WIFI connected … very professional and reasonable price','Tewolde T., Moreno Valley'],
['May 7, 2026','Garbage disposal','Our garbage disposal began to malfunction soon after our move to Murrieta, so we called Mike. He arrived on time and installed it quickly.','Jack D., Bonita CA'],
['Aug 7, 2025','Kitchen faucet','Mike was fast with his response, replaced my faucet for a fair price and did a great job in a timely manner.','Sydney H., Fort Worth TX']];
let y=102;rows.forEach((r,i)=>{T(LB,r[0],96,y+4,{z:13,s:'SemiBold',c:C.ink,w:110});
 const tt=figma.createText();tt.fontName={family:'Jost',style:'SemiBold'};tt.characters=r[1];tt.fontSize=12;const w=Math.ceil(tt.width)+28;tt.remove();
 const tg=F(LB,'job tag: '+r[1],220,y,w,28,null);tg.clipsContent=false;HX(tg,0,0,w,28,{fill:C.ink,cut:8});T(tg,r[1],0,6,{z:12,s:'SemiBold',c:C.cream,w,a:'CENTER'});
 const q=T(LB,'“'+r[2]+'”',410,y,{f:'Playfair Display',s:'Italic',z:15,c:C.ink,w:400,lh:140});
 const a=T(LB,r[3]+' · Yelp',410,q.y+q.height+6,{z:12,s:'SemiBold',c:C.tanD});STARS(LB,720,a.y,11,'#C99A2E');
 y=a.y+a.height+16;if(i<rows.length-1)R(LB,96,y-6,712,1,C.tan,0.7,'ruled line');y+=8;});
LB.resize(840,y+40);
STAMP(LB,700,y-70,120,'FIVE STARS · EVERY ONE · FIVE STARS · EVERY ONE · ','5.0','YELP',{rot:-10,c:C.tanD,z:26,rz:9});
RL.resize(1440,Math.max(760,110+y+40+110));
// ===== 05 Where's the problem? house cut-away =====
const WP=F(D,'05 Where’s the problem? (house cut-away)',0,0,1440,1180,C.ink);
EYE(WP,'Where’s the problem?',80,130,{c:C.tan});
TR(WP,[['Point at the spot.\n',{c:C.cream}],['Mike knows the fix.',{s:'Black Italic',c:C.tan}]],80,180,{f:'Playfair Display',s:'Black',z:58,lh:104,w:760,n:'H2'});
T(WP,'Every number is a job Mike does. Tap one to see what it involves, or just call and describe it.',880,214,{z:18,c:C.mute,w:440,lh:155});
const DR=F(WP,'house cut-away drawing (engraved lines)',80,380,820,620,null);DR.clipsContent=false;
const st=C.cream,tn=C.tan;
const svg=`<svg width="820" height="620" viewBox="0 0 820 620" fill="none" xmlns="http://www.w3.org/2000/svg">
<g stroke="${tn}" stroke-width="1" opacity="0.5">${[430,460,490,520,550,580].map((yy,i)=>`<path d="M${10+i*7} ${yy} H${810-i*9}" stroke-dasharray="3 9"/>`).join('')}</g>
<path d="M0 380 H820" stroke="${tn}" stroke-width="2"/>
<rect x="60" y="380" width="460" height="22" fill="${tn}" fill-opacity="0.18" stroke="${tn}" stroke-width="1.5"/>
<path d="M40 172 L290 46 L540 172" stroke="${st}" stroke-width="3" stroke-linejoin="round"/>
<path d="M60 162 V380 M520 162 V380" stroke="${st}" stroke-width="3"/>
<path d="M60 172 H520" stroke="${st}" stroke-width="1.5"/>
<path d="M300 172 V380 M440 172 V380" stroke="${st}" stroke-width="2"/>
<rect x="250" y="96" width="60" height="44" stroke="${st}" stroke-width="1.5"/><path d="M280 96 V140 M250 118 H310" stroke="${st}" stroke-width="1"/>
<rect x="90" y="300" width="160" height="80" stroke="${st}" stroke-width="2"/><path d="M84 300 H256" stroke="${st}" stroke-width="3"/>
<path d="M140 300 v10 h48 v-10" stroke="${st}" stroke-width="1.5"/><path d="M178 300 v-26 h-14" stroke="${st}" stroke-width="2" stroke-linecap="round"/>
<circle cx="164" cy="350" r="14" stroke="${st}" stroke-width="1.5"/><path d="M164 310 V336" stroke="${st}" stroke-width="1.5"/>
<rect x="100" y="200" width="70" height="56" stroke="${st}" stroke-width="1.2"/><path d="M200 210 h70 v40 h-70 z" stroke="${st}" stroke-width="1.2"/>
<path d="M330 380 v-34 h40 c0 18 -6 30 -16 34 z" stroke="${st}" stroke-width="2"/><rect x="326" y="300" width="22" height="44" stroke="${st}" stroke-width="2"/>
<path d="M392 380 V336 M380 330 h26 v-6 h-26 z" stroke="${st}" stroke-width="2"/><path d="M400 324 v-14 h-8" stroke="${st}" stroke-width="1.5"/>
<rect x="352" y="210" width="50" height="62" rx="2" stroke="${st}" stroke-width="1.2"/>
<rect x="455" y="250" width="50" height="124" rx="12" stroke="${st}" stroke-width="2"/><path d="M480 250 V172" stroke="${st}" stroke-width="2"/><path d="M462 290 h36 M462 330 h36" stroke="${st}" stroke-width="1"/>
<path d="M520 344 h34 M548 336 l12 8 l-12 8 z M560 336 l-0 16" stroke="${st}" stroke-width="2" stroke-linejoin="round"/><path d="M520 300 h22 v10" stroke="${st}" stroke-width="2"/><circle cx="542" cy="314" r="4" stroke="${st}" stroke-width="1.5"/>
<path d="M820 412 H540 V380" stroke="${tn}" stroke-width="3"/><path d="M600 404 l10 8 l-10 8 z M620 404 l-10 8 l10 8 z" stroke="${tn}" stroke-width="1.5"/>
<path d="M240 404 c-4 8 -8 12 -4 18 c4 6 10 2 8 -4 c-1 -5 -4 -9 -4 -14z M262 418 c-3 6 -6 9 -3 14 c3 4 8 1 6 -3 c-1 -4 -3 -7 -3 -11z" stroke="${st}" stroke-width="1.5"/>
<path d="M200 402 L820 520 M200 424 L820 542" stroke="${st}" stroke-width="2"/>
<path d="M690 380 V250" stroke="${st}" stroke-width="4"/><circle cx="690" cy="200" r="66" stroke="${st}" stroke-width="2"/><circle cx="660" cy="190" r="26" stroke="${st}" stroke-width="1"/><circle cx="716" cy="214" r="22" stroke="${st}" stroke-width="1"/>
<path d="M690 380 C688 420 700 450 696 498 M690 380 C670 410 652 440 660 492 M690 380 C712 404 732 440 728 502 M696 470 l-14 18 M712 460 l12 18" stroke="${tn}" stroke-width="1.5"/>
</svg>`;
const art=figma.createNodeFromSvg(svg);DR.appendChild(art);art.x=0;art.y=0;art.name='engraving: house, slab, water line, sewer line, tree roots';
const pins=[[164,276,1],[372,292,2],[480,226,3],[572,312,4],[250,452,5],[700,512,6]];
pins.forEach(p=>PIN(DR,p[0],p[1],p[2]));
T(DR,'Street water line',640,424,{z:12,s:'SemiBold',c:C.tan,ls:10,u:true});T(DR,'Sewer line to the street',560,560,{z:12,s:'SemiBold',c:C.tan,ls:10,u:true});T(DR,'Slab',70,388,{z:11,s:'Bold',c:C.ink,ls:12,u:true});
// legend
const LG=F(WP,'legend (each links to its service page)',940,380,420,640,null);LG.clipsContent=false;
const items=[['Kitchen sink & disposal','Drain cleaning · garbage disposals'],['Toilets, sinks & faucets','Installs and repairs'],['Water heater closet','Water heater install & repair'],['Regulator & hose bib','Pressure regulators, shut-offs, hose bib moves'],['Under the slab','Leak detection & slab leaks'],['Yard sewer line','Camera inspection & root removal']];
items.forEach((it,i)=>{const yy=i*84;PIN(LG,17,yy+20,i+1);T(LG,it[0],52,yy+4,{f:'Playfair Display',s:'Black',z:20,c:C.cream});T(LG,it[1],52,yy+34,{z:14,c:C.mute,w:300});SVG(LG,IC.arrow(C.tan),396,yy+10,20,'arrow');R(LG,52,yy+70,368,1,C.line,1,'row rule');});
const RS=F(LG,'pin 7: restaurant (separate building)',0,6*84+6,420,120,C.char);RS.strokes=[solid(C.tan)];RS.dashPattern=[5,4];
PIN(RS,34,40,7,{bg:C.cream});T(RS,'Own a restaurant?',70,22,{f:'Playfair Display',s:'Black',z:20,c:C.cream});T(RS,'Grease interceptors, kitchen drains, bar sinks. Grease is the family business.',70,52,{z:14,c:C.mute,w:330,lh:145});
WP.resize(1440,1110);
// ===== 07 Symptom finder ledger =====
const SF=F(D,'07 Symptom finder (ledger)',0,0,1440,1000,C.cream);
EYE(SF,'Not sure what it is?',80,120);
TR(SF,[['Read the signs.\n',{c:C.ink}],['Then call Mike.',{s:'Black Italic',c:C.tanD}]],80,170,{f:'Playfair Display',s:'Black',z:56,lh:104,w:520,n:'H2'});
T(SF,'General plumbing signs, not a diagnosis. Mike confirms on site, and the estimate is free.',80,310,{z:17,c:C.muteD,w:400,lh:155});
BTN(SF,80,410,'Call (951) 809-9533',{k:'ink',icon:'phone',h:58,w:300,z:16});
const PG=F(SF,'ledger page',600,110,760,780,C.paper);PG.clipsContent=false;PG.strokes=[solid('#D9D0B4')];
PG.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.10},offset:{x:0,y:12},radius:26,spread:0,visible:true,blendMode:'NORMAL'}];
R(PG,0,0,10,780,C.ink,1,'binding');
T(PG,'If you see this',48,40,{z:11,s:'Bold',c:C.tanD,ls:18,u:true});T(PG,'It’s probably',470,40,{z:11,s:'Bold',c:C.tanD,ls:18,u:true});R(PG,48,64,672,2,C.ink,1,'header rule');
const sy=[['Slow drains, gurgling, sewer smell','Drain cleaning'],['Backups in more than one drain','Sewer line + camera'],['Damp floor or a warm spot underfoot','Slab leak'],['Water bill jumped, nothing changed','Hidden leak'],['No hot water, or a leaking tank','Water heater'],['Banging pipes, very strong pressure','Pressure regulator'],['Toilet keeps running or rocks','Toilet repair'],['Disposal hums but won’t spin','Garbage disposal'],['Restaurant floor drains backing up','Grease interceptor']];
sy.forEach((s,i)=>{const yy=84+i*74;T(PG,s[0],48,yy+12,{z:17,c:C.ink,w:380});const d=R(PG,48+0,yy+40,0,0);d.remove();
 const lead=R(PG,430,yy+28,30,0,null,1,'dotted leader');lead.strokes=[solid(C.tanD)];lead.strokeWeight=1.5;lead.dashPattern=[2,5];
 T(PG,s[1],470,yy+8,{f:'Playfair Display',s:'Black',z:21,c:C.ink});SVG(PG,IC.arrow(C.tanD),690,yy+12,20,'arrow');
 if(i<sy.length-1)R(PG,48,yy+66,672,1,C.tan,0.8,'ruled line');});
PG.resize(760,84+sy.length*74+20);SF.resize(1440,110+PG.height+110);
// ===== footer clone =====
const ft=(await g('556:2551')).clone();D.appendChild(ft);ft.x=0;
// ===== restack =====
const order=['486:1744','486:1754','486:1770',RL.id,WP.id,'486:1791',SF.id,'486:1945','534:544',ft.id];
let yy=0;const pos={};for(const id of order){const n=await g(id);n.y=yy;pos[id]=yy;yy+=n.height;}
const sl=await g('534:610');sl.y=pos['534:544'];D.resize(1440,yy);D.appendChild(sl);
return {RL:RL.id,WP:WP.id,SF:SF.id,ft:ft.id,h:yy};
