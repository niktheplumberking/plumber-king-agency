// ===== Mike's Plumbing Figma helpers (paste at top of every use_figma call) =====
const C={ink:'#0F0E0C',char:'#1C1B19',char2:'#2A2825',line:'#3A3732',cream:'#E8E3C8',paper:'#F4F0E1',tan:'#D2C4A7',tanD:'#8E8268',mute:'#B9B29A',muteD:'#5E584B',white:'#FFFFFF',yelp:'#D32323'};
const H={logo:'88c9a481e487d3482dd3730e8ac6fab0ecfde42a',map:'838fdca71f0090fac27932032612acf3246e3da4',mike:'6f13e083becb39719f0433cea9bb96826dee7b33',van:'e5a89e66910284d320f164c763a0ad40da5d3d26',bar:'0c4fd0885b4123934674aa215a53783817b1e88e',roughin:'4848ff65c944571924922f2dffefd525d57667c2',backflow:'d450ef81f958df037aebe8cdabc2c996cc610a17',hosebib:'05c1d5eb865ca52b5b13c06686be281fc7997d3c',yard:'0622f03779247514b42457aade30e45e90e7c5c2',cleanout:'1dd16d01063417c6c4d6d03fe7919bc4f08ca33b',interceptor:'3feb51235debafcbf16cb1c6854d9b02e80e04f3',roots:'dafd55f5923252d6a0cbafb36b0a582329ac6d2f',stucco:'ac78443a2cfbe7da89a65e365998aa7f3d109d20',ygrease:'36ac6f030c95a78a4ec3850f5c9a8058260e7d4e',yyard:'a48d857caa1bbf9a49fde79248825afff0d13695',yyard2:'bf771a5b8714723752e43aba4dec40579412824b',ytoilet:'d910897d6c8644348c764ad6b980fd471451eacb',yasphalt:'22771ea00533da8edaaedbdf67622948e89f05b7'};
function rgb(h){h=h.replace('#','');return {r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255};}
function solid(h,o){const p={type:'SOLID',color:rgb(h)};if(o!==undefined)p.opacity=o;return p;}
const FONTS=[['Playfair Display','Black'],['Playfair Display','Bold'],['Playfair Display','Black Italic'],['Playfair Display','Bold Italic'],['Playfair Display','Italic'],['Playfair Display SC','Bold'],['Jost','Regular'],['Jost','Medium'],['Jost','SemiBold'],['Jost','Bold'],['Yellowtail','Regular']];
await Promise.all(FONTS.map(([family,style])=>figma.loadFontAsync({family,style})));
function F(parent,name,x,y,w,h,fill){const f=figma.createFrame();f.name=name;f.resize(w,h);f.x=x;f.y=y;f.fills=fill?[solid(fill)]:[];f.clipsContent=true;parent.appendChild(f);return f;}
function R(parent,x,y,w,h,fill,o,name){const r=figma.createRectangle();r.resize(w,h);r.x=x;r.y=y;r.fills=fill?[solid(fill,o)]:[];if(name)r.name=name;parent.appendChild(r);return r;}
// text: o={f:'Jost'|'Playfair Display'|..., s:'Regular', z:16, c:'#hex', w:width(fixed, wraps), lh:%, ls:%, a:'LEFT'|'CENTER'|'RIGHT', u:upper, o:opacity}
function T(parent,str,x,y,o={}){const t=figma.createText();t.fontName={family:o.f||'Jost',style:o.s||'Regular'};t.characters=str;t.fontSize=o.z||16;t.fills=[solid(o.c||C.ink,o.o)];
 if(o.lh)t.lineHeight={unit:'PERCENT',value:o.lh};if(o.ls!==undefined)t.letterSpacing={unit:'PERCENT',value:o.ls};if(o.u)t.textCase='UPPER';if(o.a)t.textAlignHorizontal=o.a;
 parent.appendChild(t);if(o.w){t.resize(o.w,t.height);t.textAutoResize='HEIGHT';}else t.textAutoResize='WIDTH_AND_HEIGHT';t.x=x;t.y=y;if(o.n)t.name=o.n;return t;}
// mixed-style text runs: runs=[[text,{f,s,c,z}],...]
function TR(parent,runs,x,y,o={}){const t=figma.createText();const full=runs.map(r=>r[0]).join('');t.fontName={family:o.f||'Jost',style:o.s||'Regular'};t.characters=full;t.fontSize=o.z||16;t.fills=[solid(o.c||C.ink)];
 let i=0;for(const [s,st] of runs){const j=i+s.length;if(st){if(st.f||st.s)t.setRangeFontName(i,j,{family:st.f||o.f||'Jost',style:st.s||o.s||'Regular'});if(st.c)t.setRangeFills(i,j,[solid(st.c)]);if(st.z)t.setRangeFontSize(i,j,st.z);}i=j;}
 if(o.lh)t.lineHeight={unit:'PERCENT',value:o.lh};if(o.ls!==undefined)t.letterSpacing={unit:'PERCENT',value:o.ls};if(o.a)t.textAlignHorizontal=o.a;
 parent.appendChild(t);if(o.w){t.resize(o.w,t.height);t.textAutoResize='HEIGHT';}else t.textAutoResize='WIDTH_AND_HEIGHT';t.x=x;t.y=y;if(o.n)t.name=o.n;return t;}
function hexD(w,h,c){c=c===undefined?h*0.32:c;return `M ${c} 0 L ${w-c} 0 L ${w} ${h/2} L ${w-c} ${h} L ${c} ${h} L 0 ${h/2} Z`;}
// elongated hexagon = Mike's badge shape
function HX(parent,x,y,w,h,o={}){const v=figma.createVector();v.vectorPaths=[{windingRule:'NONZERO',data:hexD(w,h,o.cut)}];v.fills=o.fill?[solid(o.fill,o.fo)]:[];if(o.stroke){v.strokes=[solid(o.stroke,o.so)];v.strokeWeight=o.sw||1.5;v.strokeAlign='INSIDE';}else v.strokes=[];v.x=x;v.y=y;v.name=o.n||'hex';parent.appendChild(v);return v;}
function IMG(parent,x,y,w,h,key,o={}){const r=figma.createRectangle();r.resize(w,h);r.x=x;r.y=y;r.name=o.n||('photo: '+key);r.fills=[{type:'IMAGE',imageHash:H[key],scaleMode:'FILL'}];if(o.r)r.cornerRadius=o.r;parent.appendChild(r);
 if(o.shade){const s=R(parent,x,y,w,h,o.shadeC||C.ink,o.shade,'shade');} return r;}
// photo clipped to a hex-cut shape (badge-style corners)
function IMGHX(parent,x,y,w,h,key,o={}){const m=figma.createVector();m.vectorPaths=[{windingRule:'NONZERO',data:o.cutCorners?`M ${o.cutCorners} 0 L ${w-o.cutCorners} 0 L ${w} ${o.cutCorners} L ${w} ${h-o.cutCorners} L ${w-o.cutCorners} ${h} L ${o.cutCorners} ${h} L 0 ${h-o.cutCorners} L 0 ${o.cutCorners} Z`:hexD(w,h,o.cut)}];m.fills=[solid('#000000')];parent.appendChild(m);m.x=x;m.y=y;m.isMask=true;
 const r=figma.createRectangle();r.resize(w,h);r.x=x;r.y=y;r.fills=[{type:'IMAGE',imageHash:H[key],scaleMode:'FILL'}];parent.appendChild(r);const g=figma.group([m,r],parent);g.name=o.n||('photo (cut corners): '+key);return g;}
function LOGO(parent,x,y,w,n){const h=Math.round(w*370/588);const r=figma.createRectangle();r.resize(w,h);r.x=x;r.y=y;r.name=n||'LOGO (his real badge, unchanged)';r.fills=[{type:'IMAGE',imageHash:H.logo,scaleMode:'FIT'}];parent.appendChild(r);return r;}
function SVG(parent,svg,x,y,size,name){const n=figma.createNodeFromSvg(svg);n.resize(size,size);n.x=x;n.y=y;n.name=name||'icon';parent.appendChild(n);return n;}
const IC={phone:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
star:c=>`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" fill="${c}"/></svg>`,
check:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="${c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
shield:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="${c}" stroke-width="2" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
tag:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="${c}" stroke-width="2" stroke-linejoin="round"/><circle cx="7" cy="7" r="1.5" fill="${c}"/></svg>`,
home:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10.5z" stroke="${c}" stroke-width="2" stroke-linejoin="round"/></svg>`,
clock:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="${c}" stroke-width="2"/><path d="M12 7v5l3 2" stroke="${c}" stroke-width="2" stroke-linecap="round"/></svg>`,
pin:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" stroke="${c}" stroke-width="2"/><circle cx="12" cy="10" r="2.5" stroke="${c}" stroke-width="2"/></svg>`,
mail:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="14" rx="1" stroke="${c}" stroke-width="2"/><path d="M3 7l9 6 9-6" stroke="${c}" stroke-width="2"/></svg>`,
drop:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.5s7 7.6 7 12.5a7 7 0 1 1-14 0c0-4.9 7-12.5 7-12.5z" stroke="${c}" stroke-width="2" stroke-linejoin="round"/></svg>`,
wrench:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8a2.8 2.8 0 0 1-4-4l8-8-1.3-1.3a4 4 0 0 1-1 0z" stroke="${c}" stroke-width="2" stroke-linejoin="round"/><path d="M14.7 6.3L17 4l3 3-2.3 2.3" stroke="${c}" stroke-width="2"/></svg>`,
flame:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22a7 7 0 0 0 7-7c0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-3 3-5 5-5 8a7 7 0 0 0 7 7z" stroke="${c}" stroke-width="2" stroke-linejoin="round"/></svg>`,
arrow:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14M13 6l6 6-6 6" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
ig:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="5" stroke="${c}" stroke-width="2"/><circle cx="12" cy="12" r="4" stroke="${c}" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="${c}"/></svg>`,
camera:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 7l-7 5 7 5V7z" stroke="${c}" stroke-width="2" stroke-linejoin="round"/><rect x="1" y="5" width="15" height="14" rx="2" stroke="${c}" stroke-width="2"/></svg>`,
building:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="2" width="16" height="20" stroke="${c}" stroke-width="2"/><path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2M10 22v-4h4v4" stroke="${c}" stroke-width="2"/></svg>`,
filter:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" stroke="${c}" stroke-width="2" stroke-linejoin="round"/></svg>`};
// buttons: kind 'cream' (cream bg, ink text), 'ink' (ink bg, cream text), 'ghost' (outline)
function BTN(parent,x,y,label,o={}){const h=o.h||60,z=o.z||17;const g=figma.createFrame();g.name='button: '+label;g.fills=[];g.clipsContent=false;parent.appendChild(g);
 const k=o.k||'cream';const bg=k==='cream'?C.cream:k==='ink'?C.ink:null;const fg=k==='cream'?C.ink:k==='ink'?C.cream:(o.fg||C.cream);
 const t=figma.createText();t.fontName={family:'Jost',style:'SemiBold'};t.characters=label;t.fontSize=z;t.fills=[solid(fg)];t.letterSpacing={unit:'PERCENT',value:2};t.textAutoResize='WIDTH_AND_HEIGHT';
 const iw=o.icon?28:0;const w=o.w||Math.round(t.width+iw+h*0.9+20);g.resize(w,h);
 HX(g,0,0,w,h,{fill:bg,stroke:bg?null:fg,sw:1.5,cut:h*0.3,n:'button shape (badge hex)'});
 if(o.icon){SVG(g,IC[o.icon](fg),Math.round((w-t.width-iw)/2),Math.round((h-20)/2),20,'icon '+o.icon);}
 g.appendChild(t);t.x=Math.round((w-t.width-iw)/2+iw);t.y=Math.round((h-t.height)/2);g.x=x;g.y=y;return g;}
// eyebrow: small hex badge with caps text + optional rule
function EYE(parent,str,x,y,o={}){const c=o.c||C.tanD;const t=figma.createText();t.fontName={family:'Jost',style:'SemiBold'};t.characters=str;t.fontSize=o.z||13;t.letterSpacing={unit:'PERCENT',value:18};t.textCase='UPPER';t.fills=[solid(c)];t.textAutoResize='WIDTH_AND_HEIGHT';
 const w=t.width+44,h=30;const g=figma.createFrame();g.name='eyebrow: '+str;g.fills=[];g.resize(w,h);g.clipsContent=false;parent.appendChild(g);HX(g,0,0,w,h,{stroke:c,sw:1.2,cut:10});g.appendChild(t);t.x=22;t.y=Math.round((h-t.height)/2);
 if(o.a==='CENTER')g.x=Math.round(x-w/2);else g.x=x;g.y=y;return g;}
function STARS(parent,x,y,size,c,n){const g=[];for(let i=0;i<(n||5);i++)g.push(SVG(parent,IC.star(c||C.tan),x+i*(size+3),y,size,'star'));return g;}
// badge-rule divider: line - small hex - line (his badge motif)
function RULE(parent,x,y,w,c,o={}){const g=figma.createFrame();g.name='divider: badge rule';g.fills=[];g.resize(w,24);g.clipsContent=false;parent.appendChild(g);
 R(g,0,11,w/2-46,1.5,c);R(g,w/2+46,11,w/2-46,1.5,c);HX(g,w/2-34,0,68,24,{stroke:c,sw:1.5,cut:8});HX(g,w/2-20,7,40,10,{fill:c,cut:4});g.x=x;g.y=y;return g;}
// "to confirm" sticky note (placed BESIDE frames, never inside)
function NOTE(parent,x,y,str,w){const f=figma.createFrame();f.name='NOTE (remove before dev) '+str.slice(0,80);f.resize(w||300,40);f.fills=[solid('#FFE27A')];f.cornerRadius=4;f.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.18},offset:{x:0,y:4},radius:10,spread:0,visible:true,blendMode:'NORMAL'}];parent.appendChild(f);
 const t=T(f,str,14,12,{z:15,c:'#3B3000',w:(w||300)-28,lh:135,s:'Medium'});f.resize(w||300,Math.round(t.height+24));f.x=x;f.y=y;return f;}
// input field
function FIELD(parent,x,y,w,label,o={}){const h=o.h||52;const g=F(parent,'field: '+label,x,y,w,h,o.bg||C.white);g.strokes=[solid(o.stroke||'#CFC7AE')];g.strokeWeight=1;g.cornerRadius=2;T(g,label,16,Math.round((h-22)/2),{z:16,c:o.c||'#7A7363'});return g;}
// ===== GLOBAL BLOCKS (identical on every page) =====
function UTILBAR(D,y){const U=F(D,'01 Utility bar',0,y,1440,40,C.ink);SVG(U,IC.pin(C.tan),80,11,18);T(U,'Serving Riverside, the Inland Empire, Orange County & LA',104,10,{z:14,c:C.mute});SVG(U,IC.flame(C.tan),640,11,18);T(U,'Emergency service',664,10,{z:14,c:C.mute});HX(U,1062,8,298,24,{fill:C.tan,cut:8,n:'offer tag'});T(U,'15% OFF FOR NEW CUSTOMERS',1088,12,{z:12,s:'SemiBold',c:C.ink,ls:14});return U;}
function HEADER(D,y,active){const Hd=F(D,'02 Header',0,y,1440,104,C.ink);R(Hd,0,103,1440,1,C.line);LOGO(Hd,80,14,120);const nav=['Services','Commercial','Areas','About Mike','Reviews','Our work','Contact'];let nx=262;
 for(const n of nav){const t=T(Hd,n,nx,40,{z:16,s:'Medium',c:n===active?C.tan:C.cream});if(n===active)R(Hd,nx,66,t.width,2,C.tan,1,'active underline');nx+=t.width+30;}
 T(Hd,'Call Mike',1012,30,{z:12,s:'SemiBold',c:C.tan,ls:16,u:true});T(Hd,'(951) 809-9533',1012,48,{f:'Playfair Display',s:'Bold',z:22,c:C.cream});BTN(Hd,1200,24,'Free estimate',{k:'cream',h:56,w:160,z:16});return Hd;}
// page hero for inner pages: dark, photo right, breadcrumb, eyebrow, H1 runs, intro, buttons. returns frame
function PAGEHERO(D,y,o){const h=o.h||640;const He=F(D,'03 Page hero',0,y,1440,h,C.ink);
 const bg=IMG(He,0,0,1440,h,o.photo,{n:'hero bg (real photo, darkened)'});bg.fills=[{type:'IMAGE',imageHash:H[o.photo],scaleMode:'FILL',filters:{exposure:-0.4,saturation:-0.7}}];R(He,0,0,1440,h,C.ink,0.88,'shade');
 T(He,o.crumb,80,44,{z:14,c:C.mute,n:'breadcrumb'});EYE(He,o.eye,80,84,{c:C.tan});
 const h1=TR(He,o.h1,80,134,{f:'Playfair Display',s:'Black',z:o.z||68,lh:104,w:700,n:'H1'});let yy=h1.y+h1.height+22;
 const it=T(He,o.intro,80,yy,{z:18,c:C.mute,w:620,lh:155});yy+=it.height+34;
 BTN(He,80,yy,'Call (951) 809-9533',{k:'cream',icon:'phone',h:62,z:17});BTN(He,410,yy,o.btn2||'Get a free estimate',{k:'ghost',fg:C.cream,h:62,z:17});
 IMGHX(He,840,56,500,h-112,o.photo2||o.photo,{cutCorners:50,n:'page hero photo (real)'});const fl=HX(He,826,42,528,h-84,{stroke:C.tan,sw:1.5,n:'frame line'});const H2=h-84;fl.vectorPaths=[{windingRule:'NONZERO',data:`M 56 0 L 472 0 L 528 56 L 528 ${H2-56} L 472 ${H2} L 56 ${H2} L 0 ${H2-56} L 0 56 Z`}];return He;}
// section heading block: eyebrow + 2-colour Playfair heading + intro. dark=true for dark bg. returns bottom y
function HEAD(S,x,y,eye,runs,intro,o={}){const dark=o.dark;const a=o.a;const w=o.w||760;const cx=a==='CENTER'?x+w/2:x;
 EYE(S,eye,cx,y,{c:dark?C.tan:C.tanD,a});const h=TR(S,runs.map(r=>[r[0],r[1]?{f:'Playfair Display',s:'Black Italic',c:dark?C.tan:C.tanD}:{c:dark?C.cream:C.ink}]),x,y+50,{f:'Playfair Display',s:'Black',z:o.z||54,lh:106,w,a,n:'H2'});
 let b=h.y+h.height;if(intro){const t=T(S,intro,x,b+18,{z:18,c:dark?C.mute:C.muteD,w:o.iw||w,lh:155,a});b=t.y+t.height;}return b;}
// review card (Yelp-widget style). q=quote, n=name, town, date
function REVIEW(S,x,y,w,q,n,town,date,o={}){const dark=o.dark;const g=F(S,'review: '+n+' (Yelp, word for word)',x,y,w,100,dark?C.char2:C.white);g.strokes=[solid(dark?C.line:'#DDD5BC')];g.strokeWeight=1;
 HX(g,24,24,44,44,{fill:dark?C.tan:C.ink,cut:10});T(g,n.slice(0,1),24,33,{f:'Playfair Display',s:'Black',z:20,c:dark?C.ink:C.cream,w:44,a:'CENTER'});
 T(g,n,80,24,{z:16,s:'SemiBold',c:dark?C.cream:C.ink});T(g,town+' · '+date,80,46,{z:13,c:dark?C.mute:C.muteD});
 R(g,w-48,26,22,22,C.yelp,1,'yelp mark');T(g,'y',w-42,26,{s:'Bold',z:15,c:C.white});STARS(g,24,84,16,dark?C.tan:'#C99A2E');
 const t=T(g,q,24,114,{z:o.z||16,c:dark?C.cream:C.ink,w:w-48,lh:155});T(g,'Read on Yelp →',24,t.y+t.height+16,{z:14,s:'SemiBold',c:dark?C.tan:C.tanD});g.resize(w,t.y+t.height+56);return g;}
// final CTA band + contact cards + form (dark, real photo). returns frame
function CONTACTBAND(D,y,o={}){const S=F(D,'Contact band',0,y,1440,760,C.ink);const bg=IMG(S,0,0,1440,760,o.photo||'van');bg.fills=[{type:'IMAGE',imageHash:H[o.photo||'van'],scaleMode:'FILL',filters:{exposure:-0.4,saturation:-0.8}}];R(S,0,0,1440,760,C.ink,0.9,'shade');
 HEAD(S,80,96,o.eye||'Talk to Mike',o.h||[['Need a plumber in\n'],['Riverside?',1],[' Call Mike.']],o.intro||'You talk to the owner, not a call center. Free estimates, and 15% off your first job as a new customer.',{dark:true,w:620,z:52});
 const cards=[['phone','Call or text','(951) 809-9533'],['mail','Email','mikesplumbingco25@gmail.com'],['clock','Hours','Mike to confirm (Yelp: open 24 hours)'],['pin','Area','Riverside · IE · OC · LA']];
 cards.forEach((c,i)=>{const cx=80+(i%2)*310,cy=440+Math.floor(i/2)*130;const g=F(S,'contact card: '+c[1],cx,cy,290,110,C.char);g.strokes=[solid(C.line)];SVG(g,IC[c[0]](C.tan),22,22,24);T(g,c[1],22,58,{z:13,s:'SemiBold',c:C.tan,u:true,ls:12});T(g,c[2],22,78,{z:15,s:'Medium',c:C.cream,w:256});});
 const fm=F(S,'form 2',800,96,560,568,C.cream);T(fm,'Get your free estimate',40,40,{f:'Playfair Display',s:'Black',z:32});T(fm,'Mike calls you back. New customers get 15% off.',40,88,{z:16,c:C.muteD});
 FIELD(fm,40,134,232,'Name');FIELD(fm,288,134,232,'Phone');FIELD(fm,40,202,232,'Email');FIELD(fm,288,202,232,'ZIP code');const ta=FIELD(fm,40,270,480,'What’s going on?',{h:140});
 BTN(fm,40,432,'Send to Mike',{k:'ink',h:62,w:480,icon:'arrow'});T(fm,'Or call (951) 809-9533. Licensed? See FAQ.',40,512,{z:14,c:C.muteD,n:'note: licence line pending CSLB check'});return S;}
function FOOTER(D,y){const S=F(D,'Footer',0,y,1440,520,C.ink);RULE(S,80,40,1280,C.line);LOGO(S,80,104,170);
 T(S,'Family owned & operated plumbing for homes and businesses across Riverside, the Inland Empire, Orange County and LA. Est. 2025.',80,228,{z:15,c:C.mute,w:340,lh:160});
 const cols=[['Services',['Drain cleaning & hydro jetting','Leak detection & slab leaks','Water heaters','Sewer lines & camera inspection','Commercial & grease interceptors','Emergency plumbing']],['Company',['About Mike','Reviews','Our work','Service areas','Contact']],['Areas',['Riverside','Corona','Moreno Valley','Menifee','Murrieta','Fontana']]];
 cols.forEach((c,i)=>{const x=480+i*230;T(S,c[0],x,108,{z:13,s:'SemiBold',c:C.tan,u:true,ls:14});c[1].forEach((l,j)=>T(S,l,x,142+j*32,{z:15,c:C.cream,w:220}));});
 const x=1170;T(S,'Contact',x,108,{z:13,s:'SemiBold',c:C.tan,u:true,ls:14});T(S,'(951) 809-9533',x,140,{f:'Playfair Display',s:'Bold',z:22,c:C.cream});T(S,'mikesplumbingco25@gmail.com',x,178,{z:14,c:C.mute});
 ['Instagram','Yelp','Nextdoor'].forEach((s,i)=>{HX(S,x+i*64,220,56,34,{stroke:C.line,cut:10});T(S,s==='Instagram'?'IG':s==='Yelp'?'Yelp':'ND',x+i*64,229,{z:12,s:'SemiBold',c:C.cream,w:56,a:'CENTER'});});
 R(S,0,440,1440,1,C.line);T(S,'© 2026 Mike’s Plumbing Services · CSLB licence #: Mike to confirm · Privacy · Terms',80,468,{z:13,c:C.mute});T(S,'Website by Plumber King Agency',1140,468,{z:13,c:C.mute,w:220,a:'RIGHT'});return S;}
// ===== MOBILE (390) =====
function MHEADER(M,y){const h=F(M,'Mobile header (sticky)',0,y,390,72,C.ink);LOGO(h,16,10,80);HX(h,214,14,120,44,{fill:C.cream,cut:13});SVG(h,IC.phone(C.ink),232,26,18);T(h,'Call Mike',256,24,{z:15,s:'SemiBold',c:C.ink});
 const mb=F(h,'menu button',342,18,36,36,null);[10,17,24].forEach(yy=>R(mb,6,yy,24,2,C.cream));return h;}
function MSTICKY(M,y){const s=F(M,'Mobile sticky call bar',0,y,390,76,C.ink);R(s,0,0,390,1,C.line);BTN(s,16,10,'Call Mike',{k:'cream',h:56,w:174,icon:'phone',z:16});BTN(s,200,10,'Free estimate',{k:'ghost',fg:C.cream,h:56,w:174,z:16});return s;}
function MFOOTER(M,y){const S=F(M,'Mobile footer',0,y,390,600,C.ink);LOGO(S,24,40,140);T(S,'Family owned & operated plumbing for homes and businesses across Riverside, the IE, OC and LA. Est. 2025.',24,150,{z:15,c:C.mute,w:342,lh:160});
 T(S,'(951) 809-9533',24,248,{f:'Playfair Display',s:'Bold',z:26,c:C.cream});T(S,'mikesplumbingco25@gmail.com',24,290,{z:15,c:C.mute});
 ['Services','About Mike','Reviews','Our work','Areas','Contact'].forEach((l,i)=>T(S,l,24+(i%2)*180,340+Math.floor(i/2)*36,{z:16,c:C.cream}));
 R(S,24,470,342,1,C.line);T(S,'© 2026 Mike’s Plumbing Services · CSLB #: Mike to confirm',24,490,{z:13,c:C.mute,w:342});T(S,'Website by Plumber King Agency',24,520,{z:13,c:C.mute});return S;}
// mobile hero for inner pages
function MPAGEHERO(M,y,o){const S=F(M,'Mobile page hero',0,y,390,800,C.ink);const bg=IMG(S,0,0,390,800,o.photo);bg.fills=[{type:'IMAGE',imageHash:H[o.photo],scaleMode:'FILL',filters:{exposure:-0.4,saturation:-0.7}}];R(S,0,0,390,800,C.ink,0.88,'shade');
 T(S,o.crumb,20,24,{z:13,c:C.mute});EYE(S,o.eye,20,56,{c:C.tan,z:11});const h1=TR(S,o.h1,20,100,{f:'Playfair Display',s:'Black',z:o.z||42,lh:106,w:350});let yy=h1.y+h1.height+16;
 const it=T(S,o.intro,20,yy,{z:16,c:C.mute,w:350,lh:155});yy+=it.height+24;BTN(S,20,yy,'Call (951) 809-9533',{k:'cream',icon:'phone',h:58,w:350,z:16});yy+=70;BTN(S,20,yy,o.btn2||'Get a free estimate',{k:'ghost',fg:C.cream,h:58,w:350,z:16});yy+=82;
 IMGHX(S,20,yy,350,300,o.photo2||o.photo,{cutCorners:34,n:'photo (real)'});yy+=332;S.resize(390,yy);for(const n of S.children)if(n.name==='hero bg (real photo, darkened)'||n.name==='shade'||n.name.startsWith('photo:'))n.resize(390,yy);return S;}
function MCONTACT(M,y){const S=F(M,'Mobile contact band + form 2',0,y,390,900,C.ink);let b=HEAD(S,20,48,'Talk to Mike',[['Need a plumber in '],['Riverside?',1],[' Call Mike.']],'You talk to the owner. Free estimates, 15% off your first job.',{dark:true,w:350,z:36});
 const fm=F(S,'form 2',20,b+28,350,520,C.cream);T(fm,'Get your free estimate',20,24,{f:'Playfair Display',s:'Black',z:24,w:310});['Name','Phone','ZIP code'].forEach((l,i)=>FIELD(fm,20,80+i*64,310,l));FIELD(fm,20,272,310,'What’s going on?',{h:110});BTN(fm,20,398,'Send to Mike',{k:'ink',h:58,w:310,icon:'arrow'});T(fm,'Or call (951) 809-9533',20,470,{z:14,c:C.muteD});
 S.resize(390,b+28+520+48);return S;}
