// Mike's Plumbing Services, direction A "The Badge". Helper library, stored in figma.root sharedPluginData('pkmike','badge').
// Usage in a call: const AF=Object.getPrototypeOf(async function(){}).constructor; const L=await new AF(figma.root.getSharedPluginData('pkmike','badge'))();
const C = { black:'#111111', char:'#232323', char2:'#2C2A26', line:'#3B3830', cream:'#E9E3C9', paper:'#F4F0E2', tan:'#D8CFB0', tanD:'#B9AE8C', muted:'#A39C86', ink:'#1A1814', brown:'#5F5745', note:'#FFE66D', yelp:'#D32323', white:'#FFFFFF' };
const H = { logo:'88c9a481e487d3482dd3730e8ac6fab0ecfde42a', map:'838fdca71f0090fac27932032612acf3246e3da4', mike:'6f13e083becb39719f0433cea9bb96826dee7b33', van:'e5a89e66910284d320f164c763a0ad40da5d3d26', bar:'0c4fd0885b4123934674aa215a53783817b1e88e', roughin:'4848ff65c944571924922f2dffefd525d57667c2', backflow:'d450ef81f958df037aebe8cdabc2c996cc610a17', hosebib:'05c1d5eb865ca52b5b13c06686be281fc7997d3c', yard:'0622f03779247514b42457aade30e45e90e7c5c2', cleanout:'1dd16d01063417c6c4d6d03fe7919bc4f08ca33b', interceptor:'3feb51235debafcbf16cb1c6854d9b02e80e04f3', roots:'dafd55f5923252d6a0cbafb36b0a582329ac6d2f', stucco:'ac78443a2cfbe7da89a65e365998aa7f3d109d20', ygrease:'36ac6f030c95a78a4ec3850f5c9a8058260e7d4e', yyard:'a48d857caa1bbf9a49fde79248825afff0d13695', yyard2:'bf771a5b8714723752e43aba4dec40579412824b', ytoilet:'d910897d6c8644348c764ad6b980fd471451eacb', yasphalt:'22771ea00533da8edaaedbdf67622948e89f05b7' };
function rgb(h){h=h.replace('#','');return{r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255};}
function solid(h,o){const p={type:'SOLID',color:rgb(h)};if(o!==undefined)p.opacity=o;return p;}
const FM = { PD:['Playfair Display','Black'], PDI:['Playfair Display','Black Italic'], PB:['Playfair Display','Bold'], PBI:['Playfair Display','Bold Italic'], PI:['Playfair Display','Italic'], SC:['Playfair Display SC','Bold'], J:['Jost','Regular'], JM:['Jost','Medium'], JS:['Jost','SemiBold'], JB:['Jost','Bold'] };
await Promise.all(Object.values(FM).map(([family,style])=>figma.loadFontAsync({family,style})));
function fn(k){const a=FM[k||'J'];return{family:a[0],style:a[1]};}
function F(p,name,x,y,w,h,fill,clip){const f=figma.createFrame();f.name=name;f.resize(w,h);f.x=x;f.y=y;f.fills=fill?[solid(fill)]:[];f.clipsContent=clip!==false;p.appendChild(f);return f;}
function R(p,x,y,w,h,fill,o,name,rad){const r=figma.createRectangle();r.resize(w,h);r.x=x;r.y=y;r.fills=fill?[solid(fill,o)]:[];if(name)r.name=name;if(rad)r.cornerRadius=rad;p.appendChild(r);return r;}
function LN(p,x,y,w,h,col,o){return R(p,x,y,w,h,col,o,'rule');}
// text: o = {f:fontkey,z:size,c:color,o:opacity,lh:%,ls:%,u:upper,a:align,w:width,n:name}
function T(p,str,x,y,o={}){const t=figma.createText();t.fontName=fn(o.f);t.characters=str;t.fontSize=o.z||17;t.fills=[solid(o.c||C.ink,o.o)];
 if(o.lh)t.lineHeight={unit:'PERCENT',value:o.lh};if(o.ls!==undefined)t.letterSpacing={unit:'PERCENT',value:o.ls};if(o.u)t.textCase='UPPER';if(o.a)t.textAlignHorizontal=o.a;
 p.appendChild(t);if(o.w){t.resize(o.w,t.height);t.textAutoResize='HEIGHT';}else t.textAutoResize='WIDTH_AND_HEIGHT';t.x=x;t.y=y;t.name=o.n||str.slice(0,40);return t;}
// runs: [[text,{f,c}],...]
function TR(p,runs,x,y,o={}){const t=figma.createText();t.fontName=fn(o.f);t.characters=runs.map(r=>r[0]).join('');t.fontSize=o.z||17;t.fills=[solid(o.c||C.ink)];
 if(o.lh)t.lineHeight={unit:'PERCENT',value:o.lh};if(o.ls!==undefined)t.letterSpacing={unit:'PERCENT',value:o.ls};if(o.a)t.textAlignHorizontal=o.a;
 let i=0;for(const [s,ro] of runs){const e=i+s.length;if(ro&&ro.f)t.setRangeFontName(i,e,fn(ro.f));if(ro&&ro.c)t.setRangeFills(i,e,[solid(ro.c)]);if(ro&&ro.z)t.setRangeFontSize(i,e,ro.z);i=e;}
 p.appendChild(t);if(o.w){t.resize(o.w,t.height);t.textAutoResize='HEIGHT';}else t.textAutoResize='WIDTH_AND_HEIGHT';t.x=x;t.y=y;t.name=o.n||runs.map(r=>r[0]).join('').slice(0,40);return t;}
// elongated hexagon path (logo badge): pointed left/right ends
function hexPath(w,h,cut){return `M ${cut} 0 L ${w-cut} 0 L ${w} ${h/2} L ${w-cut} ${h} L ${cut} ${h} L 0 ${h/2} Z`;}
// chamfered frame (badge-cut corners) for photos: top-left + bottom-right cut more, like a stamp
function cutPath(w,h,c){return `M ${c} 0 L ${w-c} 0 L ${w} ${c} L ${w} ${h-c} L ${w-c} ${h} L ${c} ${h} L 0 ${h-c} L 0 ${c} Z`;}
function V(p,x,y,w,h,path,fills,stroke,sw,name){const v=figma.createVector();v.vectorPaths=[{windingRule:'NONZERO',data:path}];p.appendChild(v);v.x=x;v.y=y;v.fills=fills||[];if(stroke){v.strokes=[solid(stroke)];v.strokeWeight=sw||1.5;v.strokeAlign='CENTER';}else v.strokes=[];if(name)v.name=name;return v;}
function HEX(p,x,y,w,h,cut,fill,stroke,sw,name){return V(p,x,y,w,h,hexPath(w,h,cut),fill?[solid(fill)]:[],stroke,sw,name||'badge hex');}
function img(key,mode){return{type:'IMAGE',imageHash:H[key],scaleMode:mode||'FILL'};}
// photo in a badge-cut frame. shape: 'cut' (chamfer) | 'hex' (elongated badge) | 'rect'
function PH(p,x,y,w,h,key,shape,c,name){let path;if(shape==='hex')path=hexPath(w,h,c||Math.min(60,w*0.12));else if(shape==='rect')path=`M 0 0 L ${w} 0 L ${w} ${h} L 0 ${h} Z`;else path=cutPath(w,h,c||28);
 const v=V(p,x,y,w,h,path,[img(key)],null,0,name||('photo: '+key));return v;}
// eyebrow: small hex tick + small caps label
function EB(p,x,y,label,dark,o={}){const g=[];const hx=HEX(p,x,y+3,22,12,5,null,dark?C.tan:C.brown,1.4,'eyebrow tick');const t=T(p,label,x+32,y,{f:'SC',z:o.z||13,c:dark?C.tan:C.brown,ls:18,n:'eyebrow: '+label});return {hx,t,w:32+t.width};}
// two-line two-tone heading. l1/l2 strings; it = italic word inside l2 (optional)
function HD(p,x,y,l1,l2,dark,o={}){const z=o.z||52;const c1=dark?C.cream:C.ink;const c2=dark?C.tan:C.brown;const runs=[[l1+'\n',{c:c1}]];
 if(o.it&&l2.includes(o.it)){const i=l2.indexOf(o.it);if(i>0)runs.push([l2.slice(0,i),{c:c2}]);runs.push([o.it,{c:c2,f:'PDI'}]);const rest=l2.slice(i+o.it.length);if(rest)runs.push([rest,{c:c2}]);}else runs.push([l2,{c:c2}]);
 return TR(p,runs,x,y,{f:'PD',z,lh:o.lh||108,w:o.w,a:o.a,n:'H2: '+l1+' / '+l2});}
// hex-shaped button with 1 or 2 lines. v: 'cream'|'black'|'ghostD'|'ghostL'|'tan'
function BTN(p,x,y,label,sub,v,o={}){const fill={cream:C.cream,black:C.black,tan:C.tan,ghostD:null,ghostL:null}[v];const tc={cream:C.black,black:C.cream,tan:C.black,ghostD:C.cream,ghostL:C.ink}[v];
 const g=figma.createFrame();g.name='button: '+label;g.fills=[];g.clipsContent=false;p.appendChild(g);
 const t1=T(g,label,0,0,{f:'JS',z:o.z||17,c:tc});let t2=null;if(sub)t2=T(g,sub,0,0,{f:'J',z:12.5,c:tc,o:0.82});
 const tw=Math.max(t1.width,t2?t2.width:0);const h=o.h||(sub?64:54);const cut=h*0.32;const w=o.w||Math.round(tw+cut*2+36);g.resize(w,h);g.x=x;g.y=y;
 const bg=V(g,0,0,w,h,hexPath(w,h,cut),fill?[solid(fill)]:[],fill?null:tc,1.5,'button shape');g.insertChild(0,bg);
 const th=t1.height+(t2?t2.height:0);t1.x=Math.round((w-t1.width)/2);t1.y=Math.round((h-th)/2);if(t2){t2.x=Math.round((w-t2.width)/2);t2.y=t1.y+t1.height;}
 return g;}
// badge divider: short rules + small hex outline + optional label; centred at cx
function DIV(p,cx,y,dark,label,o={}){const col=dark?C.tan:C.brown;const g=figma.createFrame();g.name='divider: badge';g.fills=[];g.clipsContent=false;p.appendChild(g);
 let lw=0;let t=null;if(label){t=T(g,label,0,0,{f:'SC',z:12,c:col,ls:20});lw=t.width;}const bw=Math.max(110,lw+56);const bh=30;const arm=o.arm||170;const W=arm*2+bw;g.resize(W,bh);g.x=Math.round(cx-W/2);g.y=y;
 V(g,0,0,W,bh,`M 0 ${bh/2} L ${arm} ${bh/2}`,[],col,1.5,'arm L');V(g,arm+bw,0,arm,bh,`M 0 ${bh/2} L ${arm} ${bh/2}`,[],col,1.5,'arm R');
 HEX(g,arm,0,bw,bh,11,null,col,1.5,'divider badge');if(t){t.x=arm+Math.round((bw-lw)/2);t.y=Math.round((bh-t.height)/2);}else{HEX(g,arm+bw/2-9,bh/2-4,18,8,4,col,null,0,'dot');}
 return g;}
function STARS(p,x,y,s,col,n){const g=figma.createFrame();g.name='5 stars';g.fills=[];g.clipsContent=false;p.appendChild(g);g.resize((s+4)*(n||5),s);g.x=x;g.y=y;for(let i=0;i<(n||5);i++){const st=figma.createStar();st.pointCount=5;st.innerRadius=0.45;st.resize(s,s);st.x=i*(s+4);st.y=0;st.fills=[solid(col||C.tan)];g.appendChild(st);}return g;}
// icon from svg path data (24 box, stroke icons)
function IC(p,x,y,s,d,col,sw){const svg=`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${d}" stroke="${col}" stroke-width="${sw||1.8}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;const n=figma.createNodeFromSvg(svg);p.appendChild(n);n.x=x;n.y=y;n.name='icon';return n;}
const ICON={phone:'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',sms:'M4 5h16v11H8l-4 4V5z M8 9h8 M8 12h5',check:'M5 12l4 4L19 7',clock:'M12 7v5l3 2 M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18',pin:'M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5',drop:'M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z',siren:'M6 18v-6a6 6 0 0 1 12 0v6 M4 18h16v3H4z M12 3V1 M4.5 6.5 3 5 M19.5 6.5 21 5',arrow:'M5 12h14 M13 6l6 6-6 6',shield:'M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z',camera:'M3 8h4l2-3h6l2 3h4v11H3z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8',wrench:'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z',broom:'M14 4l6 6 M17 7l-8 8 M4 20l5-5 3 3-5 5z',plus:'M12 5v14 M5 12h14',minus:'M5 12h14',chev:'M9 6l6 6-6 6',home:'M3 11l9-7 9 7 M5 10v10h14V10',heater:'M7 3h10v18H7z M10 17h4 M12 7v5',toilet:'M6 4h6v6H6z M4 10h14a6 6 0 0 1-6 6v4H8v-4',faucet:'M4 10h9a4 4 0 0 1 4 4v1 M8 10V6h3 M17 19v1',pipe:'M3 9h8v6h10 M3 7v4 M21 13v4',spark:'M12 3v4 M12 17v4 M3 12h4 M17 12h4',star:'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',user:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M4 21a8 8 0 0 1 16 0',mail:'M3 6h18v12H3z M3 7l9 6 9-6',dollar:'M12 3v18 M16 7H10a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6H8'};
// yellow "Mike to confirm" note BESIDE a frame (parent = section or page)
function NOTE(p,x,y,txt,w){const f=F(p,'NOTE: Mike to confirm',x,y,w||280,10,C.note,false);f.cornerRadius=4;f.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.18},offset:{x:0,y:4},radius:10,spread:0,visible:true,blendMode:'NORMAL'}];
 const a=T(f,'MIKE TO CONFIRM',16,14,{f:'JB',z:11,c:C.ink,ls:10});const b=T(f,txt,16,34,{f:'JM',z:14,c:C.ink,lh:135,w:(w||280)-32});f.resize(w||280,b.y+b.height+16);return f;}
function SEC(D,name,y,h,fill){return F(D,name,0,y,D.width,h,fill,true);}
const NAP={phone:'(951) 809-9533',email:'mikesplumbingco25@gmail.com',area:'Riverside, CA · IE · OC · LA'};
// hex chip (outline or filled); returns {w}
function CHIP(p,x,y,label,dark,filled,o={}){const col=dark?C.tan:C.ink;const t=T(p,label,0,0,{f:'JM',z:o.z||14,c:filled?(dark?C.black:C.cream):(dark?C.cream:C.ink)});const h=o.h||34;const w=Math.round(t.width+(o.pad||36));const v=V(p,x,y,w,h,hexPath(w,h,h*0.3),filled?[solid(col)]:[],filled?null:col,1.3,'chip: '+label);p.insertChild(p.children.indexOf(t),v);t.x=x+Math.round((w-t.width)/2);t.y=y+Math.round((h-t.height)/2);return {w,v,t};}
async function INST(p,id,x,y){const c=await figma.getNodeByIdAsync(id);const i=c.createInstance();p.appendChild(i);i.x=x;i.y=y;return i;}
// page shell: section k (home = 0) with desktop frame; returns {sec,D,y}
async function PAGE(k,name){const pg=figma.currentPage;const sec=figma.createSection();sec.name=name;pg.appendChild(sec);sec.x=5400+k*3000;sec.y=0;sec.resizeWithoutConstraints(2800,6000);
 const D=F(sec,name.replace(/^\d+ /,'')+' · Desktop 1440',100,100,1440,6000,C.black,true);await INST(D,'593:438',0,0);await INST(D,'593:449',0,40);await INST(D,'593:466',0,144);return {sec,D,y:196};}
async function MPAGE(sec,name){const M=F(sec,name+' · Mobile 390',1920,100,390,6000,C.black,true);let y=0;for(const id of ['593:577','593:585','593:598']){const i=await INST(M,id,0,y);y+=i.height;}return {M,y};}
// finish: optional shared CTA, footer, resize frame + section
async function FIN(fr,y,cta,mobile){if(cta){const i=await INST(fr,mobile?'593:611':'593:471',0,y);y+=i.height;}const f=await INST(fr,mobile?'593:664':'593:533',0,y);y+=f.height;fr.resize(fr.width,y);
 if(mobile){const sb=await INST(fr,'593:602',0,0);sb.y=844-sb.height;sb.name='Sticky call bar (fixed to screen bottom)';}
 const sec=fr.parent;const need=fr.y+y+100;if(sec.height<need)sec.resizeWithoutConstraints(sec.width,need);return y;}

return {CHIP,INST,PAGE,MPAGE,FIN,C,H,solid,rgb,img,F,R,LN,T,TR,V,HEX,PH,EB,HD,BTN,DIV,STARS,IC,ICON,NOTE,SEC,hexPath,cutPath,NAP};
