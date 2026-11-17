async function R4(){
const W='#FFFFFF',PAPER2='#FBF8EF',EDGE='#E2D9C0';
const SH=[{type:'DROP_SHADOW',color:{r:0.06,g:0.05,b:0.03,a:0.10},offset:{x:0,y:10},radius:30,spread:0,visible:true,blendMode:'NORMAL'}];
const SH2=[{type:'DROP_SHADOW',color:{r:0.06,g:0.05,b:0.03,a:0.18},offset:{x:0,y:18},radius:44,spread:0,visible:true,blendMode:'NORMAL'}];
const I={
 shield:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>';},
 check:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';},
 tag:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>';},
 home:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V21H3z"/><path d="M9 21v-6h6v6"/></svg>';},
 clock:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';},
 pin:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>';},
 arrow:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';},
 phone:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8.1 9.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/></svg>';},
 drop:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.7S5 10 5 14.5a7 7 0 0 0 14 0C19 10 12 2.7 12 2.7z"/></svg>';},
 flame:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-5 5-5 8 0 4 3 7 7 7z"/></svg>';},
 wrench:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0 5 5L22 14l-8 8-2.3-2.3a4 4 0 0 0-5-5L4 12l8-8z" transform="rotate(0)"/></svg>';},
 waves:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M2 13c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/></svg>';},
 camera:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/></svg>';},
 toilet:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.6l.6 3H8l.4-3.6A6 6 0 0 1 4 12V4a2 2 0 0 1 2-2h3a1 1 0 0 1 1 1v9"/></svg>';},
 building:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/></svg>';},
 insta:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>';},
 users:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>';},
 clip:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>';},
 zap:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>';},
 heart:function(c){return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/></svg>';}
};
function ic(p,name,c,x,y,s){return SVG(p,I[name](c),x,y,s||20,'icon '+name);}
function HL(p,x,y,s,c){return HX(p,x,y,s*1.55,s,{fill:c,cut:s*0.32,n:'hex glyph'});}
function EB(p,label,x,y,o){o=o||{};const c=o.c||(o.dark?C.tan:C.tanD);const g=figma.createFrame();g.name='eyebrow: '+label;g.fills=[];g.clipsContent=false;p.appendChild(g);
 HL(g,0,3,9,c);HL(g,7,3,9,c).opacity=0.45;const t=T(g,label,26,0,{z:13,s:'Bold',c:o.dark?C.cream:C.ink,ls:16,u:true});g.resize(26+t.width,t.height);g.x=x;g.y=y;return g;}
function H2(p,l1,l2,x,y,o){o=o||{};const z=o.z||52;const dark=o.dark;const runs=[[l1,{s:'Bold',c:dark?C.cream:C.ink}]];if(l2)runs.push(['\n'+l2,{s:'Bold Italic',c:dark?C.tan:C.tanD}]);
 const t=TR(p,runs,x,y,{f:'Playfair Display',z:z,lh:o.lh||110,w:o.w,a:o.a});t.name='H2';return t;}
function CHIP(p,label,x,y,o){o=o||{};const dark=o.dark;const g=figma.createFrame();g.name='chip: '+label;g.layoutMode='HORIZONTAL';g.counterAxisAlignItems='CENTER';g.itemSpacing=8;g.paddingLeft=12;g.paddingRight=14;g.paddingTop=8;g.paddingBottom=8;
 g.cornerRadius=o.r||8;g.fills=[solid(dark?C.char2:W)];g.strokes=[solid(dark?C.line:EDGE)];g.strokeWeight=1;p.appendChild(g);g.primaryAxisSizingMode='AUTO';g.counterAxisSizingMode='AUTO';
 if(o.icon){const s=SVG(g,I[o.icon](dark?C.tan:C.tanD),0,0,16,'icon');}
 const t=T(g,label,0,0,{z:o.z||14,s:'Medium',c:dark?C.cream:C.ink});g.x=x;g.y=y;return g;}
function CARD(p,name,x,y,w,h,o){o=o||{};const f=F(p,name,x,y,w,h,o.fill||(o.dark?C.char:W));f.cornerRadius=o.r===undefined?18:o.r;if(o.stroke!==false){f.strokes=[solid(o.dark?C.line:EDGE)];f.strokeWeight=1;}if(o.sh!==false)f.effects=o.big?SH2:SH;f.clipsContent=o.clip===undefined?true:o.clip;return f;}
function YM(p,x,y,s){const f=F(p,'Yelp mark',x,y,s,s,C.yelp);f.cornerRadius=s*0.22;const t=T(f,'y',0,0,{f:'Jost',s:'Bold',z:s*0.72,c:W});t.x=Math.round((s-t.width)/2);t.y=Math.round((s-t.height)/2)-1;return f;}
function PATCH(p,x,y,top,name,o){o=o||{};const w=o.w||150,h=o.h||56;const g=figma.createFrame();g.name='stitched patch: '+top+' '+name;g.fills=[];g.clipsContent=false;g.resize(w,h);p.appendChild(g);
 HX(g,0,0,w,h,{fill:o.light?C.paper:C.ink,cut:h*0.32,n:'patch'});const s=HX(g,5,5,w-10,h-10,{stroke:o.light?C.tanD:C.tan,sw:1.3,cut:(h-10)*0.32,n:'stitching'});s.dashPattern=[4,3];
 const a=T(g,top,0,9,{z:8.5,s:'Bold',c:o.light?C.tanD:C.tan,ls:22,u:true,w:w,a:'CENTER'});const b=T(g,name,0,17,{f:'Yellowtail',z:o.z||25,c:o.light?C.ink:C.cream,w:w,a:'CENTER'});
 g.effects=SH;g.x=x;g.y=y;if(o.rot)g.rotation=o.rot;return g;}
function HLTEXT(p,str,hl,x,y,w,o){o=o||{};const dark=o.dark;const t=T(p,str,x,y,{z:o.z||16,c:dark?C.cream:'#2B2823',lh:o.lh||158,w:w,f:o.f,s:o.s});
 for(const ph of (hl||[])){const i=str.indexOf(ph);if(i<0)continue;const j=i+ph.length;t.setRangeFontName(i,j,{family:o.f||'Jost',style:'SemiBold'});t.setRangeFills(i,j,[solid(dark?W:C.ink)]);
  try{t.setRangeTextDecoration(i,j,'UNDERLINE');}catch(e){}try{t.setRangeTextDecorationColor(i,j,{value:rgb(dark?'#8E8268':'#D2C4A7')});}catch(e){}try{t.setRangeTextDecorationThickness(i,j,{unit:'PIXELS',value:6});}catch(e){}try{t.setRangeTextDecorationOffset(i,j,{unit:'PIXELS',value:-3});}catch(e){}try{t.setRangeTextDecorationSkipInk(i,j,false);}catch(e){}}
 return t;}
function RCARD(p,x,y,w,r,o){o=o||{};const dark=o.dark;const g=F(p,'review: '+r.name+' (Yelp, word for word)',x,y,w,10,dark?C.char:W);g.cornerRadius=18;g.strokes=[solid(dark?C.line:EDGE)];g.strokeWeight=1;g.effects=o.sh===false?[]:SH;g.clipsContent=false;
 g.layoutMode='VERTICAL';g.paddingLeft=26;g.paddingRight=26;g.paddingTop=26;g.paddingBottom=22;g.itemSpacing=14;g.primaryAxisSizingMode='AUTO';g.counterAxisSizingMode='FIXED';
 const st=F(g,'stars',0,0,120,16,null);st.clipsContent=false;STARS(st,0,0,16,dark?C.tan:'#C9A23F');
 const q=HLTEXT(g,r.q,r.hl,0,0,w-52,{dark:dark,z:o.z||16});q.layoutAlign='STRETCH';
 if(r.tags&&r.tags.length){const tr=figma.createFrame();tr.name='service tags';tr.fills=[];tr.layoutMode='HORIZONTAL';tr.itemSpacing=6;tr.layoutWrap='WRAP';tr.counterAxisSpacing=6;g.appendChild(tr);tr.layoutAlign='STRETCH';tr.primaryAxisSizingMode='FIXED';tr.counterAxisSizingMode='AUTO';
  for(const tg of r.tags){const c=CHIP(tr,tg,0,0,{z:12,icon:'wrench',dark:dark,r:6});c.paddingTop=4;c.paddingBottom=4;c.paddingLeft=8;c.paddingRight=10;c.itemSpacing=5;c.children[0].resize(12,12);}}
 const ln=R(g,0,0,w-52,1,dark?C.line:EDGE);ln.layoutAlign='STRETCH';
 const ft=figma.createFrame();ft.name='reviewer';ft.fills=[];ft.layoutMode='HORIZONTAL';ft.counterAxisAlignItems='CENTER';ft.itemSpacing=12;g.appendChild(ft);ft.layoutAlign='STRETCH';ft.primaryAxisSizingMode='FIXED';ft.counterAxisSizingMode='AUTO';
 const av=F(ft,'initial',0,0,38,38,dark?C.char2:C.paper);av.cornerRadius=19;const ai=T(av,r.name[0],0,0,{z:15,s:'Bold',c:dark?C.tan:C.tanD});ai.x=Math.round((38-ai.width)/2);ai.y=Math.round((38-ai.height)/2);
 const nm=figma.createFrame();nm.fills=[];nm.layoutMode='VERTICAL';nm.itemSpacing=1;ft.appendChild(nm);nm.layoutGrow=1;nm.primaryAxisSizingMode='AUTO';
 T(nm,r.name+(r.town?' · '+r.town:''),0,0,{z:14,s:'SemiBold',c:dark?C.cream:C.ink});T(nm,'Yelp review · '+r.date,0,0,{z:12,c:dark?C.mute:C.muteD});
 YM(ft,0,0,22);
 return g;}
function PBTN(p,x,y,o){o=o||{};const k=o.k||'ink';const bg=k==='ink'?C.ink:k==='cream'?C.cream:C.tan;const fg=k==='ink'?C.cream:C.ink;const h=o.h||68,w=o.w||268;
 const g=figma.createFrame();g.name='button: call (951) 809-9533';g.fills=[];g.clipsContent=false;g.resize(w,h);p.appendChild(g);
 HX(g,0,0,w,h,{fill:bg,cut:h*0.3,n:'button shape (badge hex)'});const cc=F(g,'icon disc',h*0.36,Math.round((h-36)/2),36,36,k==='ink'?C.char2:C.ink);cc.cornerRadius=18;ic(cc,'phone',k==='ink'?C.tan:C.cream,9,9,18);
 T(g,o.label||'(951) 809-9533',h*0.36+48,Math.round(h/2)-21,{z:o.z||20,s:'SemiBold',c:fg});T(g,o.sub||'Tap to call · Mike answers',h*0.36+48,Math.round(h/2)+3,{z:12,c:k==='ink'?C.mute:C.muteD});
 g.x=x;g.y=y;return g;}
function LINK(p,label,x,y,o){o=o||{};const c=o.c||C.ink;const g=figma.createFrame();g.name='link: '+label;g.fills=[];g.clipsContent=false;p.appendChild(g);const t=T(g,label,0,0,{z:o.z||15,s:'SemiBold',c:c});
 R(g,0,t.height+2,t.width,1.5,o.u||C.tanD);ic(g,'arrow',c,t.width+6,Math.round((t.height-16)/2),16);g.resize(t.width+24,t.height+4);g.x=x;g.y=y;return g;}
function CAP(p,str,x,y,o){o=o||{};const g=figma.createFrame();g.name='photo caption';g.layoutMode='HORIZONTAL';g.paddingLeft=12;g.paddingRight=12;g.paddingTop=7;g.paddingBottom=7;g.cornerRadius=8;g.fills=[solid(W)];g.effects=SH;p.appendChild(g);
 g.primaryAxisSizingMode='AUTO';g.counterAxisSizingMode='AUTO';T(g,str,0,0,{z:o.z||13,c:C.ink,s:'Medium'});g.x=x;g.y=y;return g;}
function PHOTO(p,x,y,w,h,key,o){o=o||{};const f=F(p,'photo frame: '+key,x,y,w,h,W);f.cornerRadius=o.r===undefined?20:o.r;f.clipsContent=true;f.effects=o.sh===false?[]:SH2;
 if(o.border){f.strokes=[solid(W)];f.strokeWeight=o.border;f.strokeAlign='INSIDE';}
 const im=IMG(f,0,0,w,h,key,{n:'photo: '+key+(o.desc?' ('+o.desc+')':'')});if(o.border){im.x=o.border;im.y=o.border;im.resize(w-2*o.border,h-2*o.border);im.cornerRadius=Math.max(0,(o.r===undefined?20:o.r)-o.border);}
 return f;}
return {W,PAPER2,EDGE,SH,SH2,I,ic,HL,EB,H2,CHIP,CARD,YM,PATCH,HLTEXT,RCARD,PBTN,LINK,CAP,PHOTO};}
