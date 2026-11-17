// ---- fork D local helpers ----
const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
function FAQ(S,x,y,w,items,o={}){const dark=o.dark;let yy=y;items.forEach((it,i)=>{const open=i===0;const g=F(S,'faq: '+it[0],x,yy,w,72,open?(dark?C.char2:C.white):null);g.strokes=[solid(dark?C.line:'#D6CEB4')];g.strokeWeight=1;
 HX(g,20,20,46,32,{fill:open?(dark?C.tan:C.ink):null,stroke:open?null:(dark?C.tan:C.tanD),cut:9});T(g,String(i+1).padStart(2,'0'),20,26,{z:14,s:'SemiBold',c:open?(dark?C.ink:C.cream):(dark?C.tan:C.tanD),w:46,a:'CENTER'});
 const q=T(g,it[0],86,22,{f:'Playfair Display',s:'Bold',z:o.qz||21,c:dark?C.cream:C.ink,w:w-150});T(g,open?'–':'+',w-44,18,{z:28,c:dark?C.tan:C.tanD});let h=Math.max(72,q.y+q.height+22);
 if(open){const a=T(g,it[1],86,q.y+q.height+12,{z:16,c:dark?C.mute:C.muteD,w:w-130,lh:155});h=a.y+a.height+26;}g.resize(w,h);yy+=h+12;});return yy;}
function CHIP(S,x,y,label,o={}){const t=figma.createText();t.fontName={family:'Jost',style:'Medium'};t.characters=label;t.fontSize=o.z||16;t.textAutoResize='WIDTH_AND_HEIGHT';const w=t.width+(o.icon?72:52),h=o.h||46;
 const g=F(S,'chip: '+label,x,y,w,h,null);g.clipsContent=false;HX(g,0,0,w,h,{fill:o.fill,stroke:o.stroke||C.tanD,sw:1.2,cut:13});g.appendChild(t);t.fills=[solid(o.c||C.ink)];t.x=26;t.y=Math.round((h-t.height)/2);if(o.icon){SVG(g,IC.arrow(o.c||C.ink),w-42,Math.round((h-18)/2),18);}return g;}
function CHIPS(S,x,y,w,labels,o={}){let cx=x,cy=y;const gap=12;for(const l of labels){const c=CHIP(S,cx,cy,l,o);if(cx+c.width>x+w){cx=x;cy+=c.height+gap;c.x=cx;c.y=cy;}cx+=c.width+gap;}return cy+(o.h||46);}
function QA(S,x,y,w,title,body,o={}){const g=F(S,'Quick answer (AEO)',x,y,w,100,C.ink);g.clipsContent=false;R(g,0,0,6,100,C.tan,1,'accent bar');
 SVG(g,IC.check(C.tan),32,32,22);T(g,'QUICK ANSWER',62,34,{z:13,s:'SemiBold',c:C.tan,ls:18});const h=T(g,title,32,72,{f:'Playfair Display',s:'Black',z:o.tz||28,c:C.cream,w:w-64,lh:115});
 const b=T(g,body,32,h.y+h.height+14,{z:o.bz||17,c:C.mute,w:w-64,lh:160});g.resize(w,b.y+b.height+34);g.children[0].resize(6,g.height);return g;}
function SVCLINKS(S,x,y,w,cols,dark){const items=['Drain cleaning & hydro jetting','Leak detection & slab leaks','Water heater repair & install','Sewer lines & camera inspection','Commercial & grease interceptors','Toilets, sinks & faucets','Garbage disposals','Emergency plumbing'];
 const cw=(w-(cols-1)*16)/cols;items.forEach((s,i)=>{const cx=x+(i%cols)*(cw+16),cy=y+Math.floor(i/cols)*72;const g=F(S,'service link: '+s,cx,cy,cw,60,dark?C.char2:C.white);g.strokes=[solid(dark?C.line:'#D6CEB4')];
 HX(g,14,16,40,28,{stroke:dark?C.tan:C.tanD,cut:8});T(g,String(i+1).padStart(2,'0'),14,21,{z:12,s:'SemiBold',c:dark?C.tan:C.tanD,w:40,a:'CENTER'});T(g,s,66,18,{z:16,s:'Medium',c:dark?C.cream:C.ink,w:cw-110});SVG(g,IC.arrow(dark?C.tan:C.tanD),cw-36,20,18);});
 return y+Math.ceil(items.length/cols)*72;}
function MAPCARD(S,x,y,w,h,o={}){const g=F(S,'map (Google Maps screenshot, 17 Nov 2026)',x,y,w,h,C.char);g.strokes=[solid(o.dark?C.line:'#CFC7AE')];g.strokeWeight=1;const r=figma.createRectangle();r.resize(w,h);r.fills=[{type:'IMAGE',imageHash:H.map,scaleMode:'FILL'}];r.name='Google Maps screenshot 17 Nov 2026 (real)';g.appendChild(r);
 const lb=F(g,'map label',16,h-50,330,34,C.ink);lb.cornerRadius=2;T(lb,'Google Maps screenshot · 17 Nov 2026',14,8,{z:13,s:'Medium',c:C.cream});return g;}
function BOT(fr){let m=0;for(const n of fr.children)m=Math.max(m,n.y+n.height);return m;}
