// ===== ROUND 3 "Riverside workshop ledger" helpers (paste AFTER helpers.js) =====
// place one glyph rotated (clockwise deg a) with its centre at (px,py)
function GLYPH(parent,ch,px,py,a,o){const t=T(parent,ch,0,0,o);const w=t.width,h=t.height;const r=a*Math.PI/180,c=Math.cos(r),s=Math.sin(r);
 t.relativeTransform=[[c,-s,px-(c*w/2-s*h/2)],[s,c,py-(s*w/2+c*h/2)]];return t;}
// text around a circle (centre cx,cy radius r), starts at top, clockwise
function RINGTEXT(parent,str,cx,cy,r,o={}){const n=str.length;const step=(o.arc||360)/n;const st=o.start||0;
 for(let i=0;i<n;i++){const ch=str[i];if(ch===' ')continue;const a=st+i*step;const rad=a*Math.PI/180;GLYPH(parent,ch,cx+r*Math.sin(rad),cy-r*Math.cos(rad),a,o);}}
function CIRC(parent,x,y,d,o={}){const e=figma.createEllipse();e.resize(d,d);e.x=x;e.y=y;e.fills=o.fill?[solid(o.fill,o.fo)]:[];if(o.stroke){e.strokes=[solid(o.stroke,o.so)];e.strokeWeight=o.sw||1.5;if(o.dash)e.dashPattern=o.dash;}else e.strokes=[];if(o.n)e.name=o.n;parent.appendChild(e);return e;}
// engraved seal: returns frame (d x d). ring text all caps. centre content added by caller (centre = d/2)
function SEAL(parent,x,y,d,ring,o={}){const g=figma.createFrame();g.name=o.n||'engraved seal';g.resize(d,d);g.fills=[];g.clipsContent=false;parent.appendChild(g);g.x=x;g.y=y;
 const fg=o.fg||C.ink;CIRC(g,0,0,d,{fill:o.bg,stroke:fg,sw:2.5});CIRC(g,8,8,d-16,{stroke:fg,sw:1});
 const band=o.band||46;CIRC(g,band,band,d-band*2,{stroke:fg,sw:1.5});CIRC(g,band+7,band+7,d-band*2-14,{stroke:fg,sw:0.8,dash:[2,4]});
 RINGTEXT(g,ring,d/2,d/2,d/2-band/2-4,{f:'Jost',s:'SemiBold',z:o.rz||15,c:fg});if(o.rot)g.rotation=o.rot;return g;}
// rubber stamp (tan outline, rotated)
function STAMP(parent,x,y,d,ring,l1,l2,o={}){const g=figma.createFrame();g.name='stamp: '+l1;g.resize(d,d);g.fills=[];g.clipsContent=false;parent.appendChild(g);g.x=x;g.y=y;const c=o.c||C.tanD;
 CIRC(g,0,0,d,{stroke:c,sw:3});CIRC(g,10,10,d-20,{stroke:c,sw:1.2});RINGTEXT(g,ring,d/2,d/2,d/2-22,{f:'Jost',s:'Bold',z:o.rz||12,c});
 T(g,l1,0,d/2-(l2?30:18),{f:'Playfair Display',s:'Black',z:o.z||28,c,w:d,a:'CENTER'});if(l2)T(g,l2,0,d/2+6,{f:'Jost',s:'Bold',z:12,c,w:d,a:'CENTER',ls:14,u:true});
 g.rotation=o.rot===undefined?-12:o.rot;return g;}
// brass trust tag hanging from a nail. dashed=true for "to confirm" items
function TAG(parent,x,y,w,label,sub,icon,o={}){const g=figma.createFrame();g.name='trust tag: '+label;g.resize(w,170);g.fills=[];g.clipsContent=false;parent.appendChild(g);g.x=x;g.y=y;
 const bg=o.bg||C.tan,fg=o.fg||C.ink;CIRC(g,w/2-6,0,12,{fill:C.char,n:'nail'});
 const sv=figma.createVector();sv.vectorPaths=[{windingRule:'NONE',data:`M ${w/2} 6 L ${w/2-34} 44 M ${w/2} 6 L ${w/2+34} 44`}];sv.strokes=[solid(C.tanD)];sv.strokeWeight=1.5;sv.fills=[];sv.name='string';g.appendChild(sv);
 const tw=w,th=118,ty=40,c=22;const v=figma.createVector();v.vectorPaths=[{windingRule:'NONZERO',data:`M ${c} 0 L ${tw-c} 0 L ${tw} ${c} L ${tw} ${th} L 0 ${th} L 0 ${c} Z`}];
 v.fills=o.dashed?[]:[solid(bg)];v.strokes=[solid(o.dashed?C.tanD:C.tanD)];v.strokeWeight=o.dashed?1.5:1;if(o.dashed)v.dashPattern=[5,4];v.x=0;v.y=ty;v.name='tag shape';g.appendChild(v);
 CIRC(g,w/2-9,ty+10,18,{fill:o.dashed?null:C.paper,stroke:C.tanD,sw:1.2,n:'punched hole'});
 if(icon)SVG(g,IC[icon](fg),20,ty+44,22,'icon');T(g,label,icon?52:20,ty+42,{f:'Playfair Display',s:'Black',z:19,c:fg,w:w-(icon?70:40)});
 T(g,sub,20,ty+78,{z:13,c:o.dashed?C.tanD:C.muteD,w:w-40,lh:135});if(o.rot)g.rotation=o.rot;return g;}
// review slip (ledger receipt). q word for word. returns frame
function SLIP(parent,x,y,w,q,name,town,date,o={}){const dark=o.dark;const g=F(parent,'review slip: '+name+' (Yelp, word for word)',x,y,w,100,dark?C.char2:C.white);g.clipsContent=false;
 g.strokes=[solid(dark?C.line:'#D9D0B4')];g.strokeWeight=1;g.effects=[{type:'DROP_SHADOW',color:{r:0.1,g:0.08,b:0.03,a:0.10},offset:{x:0,y:8},radius:18,spread:0,visible:true,blendMode:'NORMAL'}];
 const fg=dark?C.cream:C.ink,mu=dark?C.mute:C.muteD;
 T(g,'No. '+(o.no||'01'),24,22,{z:12,s:'SemiBold',c:C.tanD,ls:16});STARS(g,w-24-5*17,20,14,'#C99A2E');
 const ln=R(g,24,50,w-48,1,C.tan,0.8,'ledger rule');
 const t=T(g,'“'+q+'”',24,66,{f:'Playfair Display',s:'Italic',z:o.z||18,c:fg,w:w-48,lh:145});
 const by=t.y+t.height+18;HX(g,24,by,36,36,{fill:dark?C.tan:C.ink,cut:9});T(g,name.slice(0,1),24,by+6,{f:'Playfair Display',s:'Black',z:17,c:dark?C.ink:C.cream,w:36,a:'CENTER'});
 T(g,name,72,by,{z:15,s:'SemiBold',c:fg});T(g,town+' · '+date,72,by+20,{z:12,c:mu});
 R(g,w-44,by+8,20,20,C.yelp,1,'yelp mark');T(g,'y',w-39,by+8,{s:'Bold',z:14,c:C.white});
 g.resize(w,by+36+24);if(o.rot)g.rotation=o.rot;return g;}
// perforated edge: row of punched circles in colour c across width w
function PERF(parent,x,y,w,c,o={}){const g=figma.createFrame();g.name='perforated edge';g.fills=[];g.resize(w,o.d||14);g.clipsContent=false;parent.appendChild(g);g.x=x;g.y=y;const d=o.d||14,gap=o.gap||12;
 for(let px=gap/2;px<w-d/2;px+=d+gap)CIRC(g,px,0,d,{fill:c});return g;}
// ledger line with dotted leader: left text ...... right text
function LEADER(parent,x,y,w,left,right,o={}){const g=figma.createFrame();g.name='ledger row: '+left;g.fills=[];g.resize(w,o.h||44);g.clipsContent=false;parent.appendChild(g);g.x=x;g.y=y;
 const fg=o.c||C.cream;const l=T(g,left,0,0,{f:o.f||'Playfair Display',s:o.s||'Bold',z:o.z||22,c:fg});const r=T(g,right,0,0,{z:o.rz||14,s:'Medium',c:o.rc||C.tan});r.x=w-r.width;r.y=l.height-r.height-3;
 const d=R(g,l.width+12,l.height-8,w-l.width-r.width-24,0,null,1,'dotted leader');d.strokes=[solid(o.dc||C.tanD)];d.strokeWeight=1.5;d.dashPattern=[2,5];g.resize(w,l.height+6);return g;}
// crossed wrenches engraving (line icon) size s
function WRENCHES(parent,x,y,s,c){const svg=`<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="${c}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 10c-4 4-4 10 0 14l4-1 26 26 4 0 2-2 0-4L24 17l1-4c-4-4-10-4-14 0l5 5-2 4-4 1z"/><path d="M50 10c4 4 4 10 0 14l-4-1-26 26-4 0-2-2 0-4L40 17l-1-4c4-4 10-4 14 0l-5 5 2 4 4 1z"/></g></svg>`;const n=figma.createNodeFromSvg(svg);parent.appendChild(n);n.rescale(s/64);n.x=x;n.y=y;n.name='engraving: crossed wrenches';return n;}
// shut-off valve wheel engraving
function VALVE(parent,x,y,s,c){const svg=`<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="${c}" stroke-width="2.5" stroke-linecap="round"><circle cx="50" cy="50" r="40"/><circle cx="50" cy="50" r="33"/><circle cx="50" cy="50" r="9"/><path d="M50 17v24M50 59v24M17 50h24M59 50h24M27 27l17 17M56 56l17 17M73 27L56 44M44 56L27 73"/></g></svg>`;const n=figma.createNodeFromSvg(svg);parent.appendChild(n);n.rescale(s/100);n.x=x;n.y=y;n.name='engraving: shut-off valve wheel';return n;}
