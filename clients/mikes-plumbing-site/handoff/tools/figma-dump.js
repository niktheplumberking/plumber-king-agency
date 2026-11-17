// use_figma code: dump a frame's node tree as compact JSON (read-only).
// Replace __ROOT__ with the frame id and __FROM__/__TO__ with the range of top-level child indexes to dump
// (dump big frames in 2-4 calls). Image fills give {img:<sha1>}: the sha1 equals `sha1sum` of the file in research/photos.
const PAGE='626:1943', ROOT='__ROOT__', FROM=__FROM__, TO=__TO__;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(PAGE));
const root = await figma.getNodeByIdAsync(ROOT);
const r = v => Math.round(v*10)/10;
const hex = c => '#'+[c.r,c.g,c.b].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('');
const paint = p => p.visible===false?null: p.type==='SOLID'? hex(p.color)+(p.opacity!=null&&p.opacity<1?'@'+r(p.opacity):'') : p.type==='IMAGE'? {img:p.imageHash, scale:p.scaleMode} : p.type.startsWith('GRADIENT')? {g:p.type, stops:p.gradientStops.map(s=>hex(s.color)+'@'+r(s.color.a)+':'+r(s.position)), t:p.gradientTransform.map(a=>a.map(r))} : p.type;
const paints = ps => (ps===figma.mixed||!ps||!ps.length)?undefined:ps.map(paint).filter(Boolean);
const hasImg = n => { const f=n.fills; if (f!==figma.mixed && f && f.some(p=>p.type==='IMAGE'&&p.visible!==false)) return true; return 'children' in n && n.children.some(hasImg); };
async function d(n){
  if (n.visible===false) return null;
  const o={id:n.id,n:n.name,t:n.type,x:r(n.x),y:r(n.y),w:r(n.width),h:r(n.height)};
  if (n.rotation) o.rot=r(n.rotation);
  if (n.opacity!=null && n.opacity<1) o.op=r(n.opacity);
  const f=paints(n.fills); if (f&&f.length) o.fill=f;
  const s=paints(n.strokes); if (s&&s.length){o.stroke=s; o.sw=n.strokeWeight===figma.mixed?'mixed':n.strokeWeight; if(n.dashPattern&&n.dashPattern.length)o.dash=n.dashPattern; if(n.strokeAlign)o.sa=n.strokeAlign;}
  if ('cornerRadius' in n && n.cornerRadius) o.rad = n.cornerRadius===figma.mixed?[n.topLeftRadius,n.topRightRadius,n.bottomRightRadius,n.bottomLeftRadius]:n.cornerRadius;
  if (n.effects&&n.effects.length) o.fx=n.effects.filter(e=>e.visible!==false).map(e=>({t:e.type,r:e.radius,c:e.color?hex(e.color)+'@'+r(e.color.a):undefined,o:e.offset,s:e.spread}));
  if (n.clipsContent) o.clip=1;
  if (n.layoutMode && n.layoutMode!=='NONE') o.al={m:n.layoutMode,gap:n.itemSpacing,p:[n.paddingTop,n.paddingRight,n.paddingBottom,n.paddingLeft],pa:n.primaryAxisAlignItems,ca:n.counterAxisAlignItems};
  if (n.type==='TEXT'){
    o.tx=n.characters;
    const segs=n.getStyledTextSegments(['fontName','fontSize','fills','lineHeight','letterSpacing','textCase','textDecoration']);
    o.ts=segs.map(g=>({s:g.start,e:g.end,f:g.fontName.family+' '+g.fontName.style,z:g.fontSize,c:(paints(g.fills)||[]).join(','),lh:g.lineHeight.unit==='AUTO'?'auto':(g.lineHeight.unit==='PIXELS'?g.lineHeight.value:g.lineHeight.value+'%'),ls:g.letterSpacing.value?(g.letterSpacing.unit==='PERCENT'?g.letterSpacing.value+'%':g.letterSpacing.value):undefined,tc:g.textCase!=='ORIGINAL'?g.textCase:undefined,td:g.textDecoration!=='NONE'?g.textDecoration:undefined}));
    o.ta=n.textAlignHorizontal; o.ar=n.textAutoResize;
  }
  if (['VECTOR','BOOLEAN_OPERATION','STAR','POLYGON','LINE','ELLIPSE'].includes(n.type) || (n.name||'').match(/^(svg|icon|hex|stamp|dial|gauge|valve|pipe|wave)/i)){
    if (hasImg(n)) { if (n.fillGeometry) o.clipPath=n.fillGeometry.map(g=>g.data).join(' '); }
    else { try{ o.svg = await n.exportAsync({format:'SVG_STRING'}); }catch(e){} }
    if (o.svg && o.svg.length>6000) o.svg=o.svg.slice(0,6000)+'…TRUNC';
    if (n.type!=='FRAME' && n.type!=='GROUP') return o;
  }
  if ('children' in n){ const k=[]; for (const c of n.children){const x=await d(c); if(x)k.push(x);} if(k.length)o.k=k; }
  return o;
}
const out={id:root.id,n:root.name,w:root.width,h:root.height,fill:paints(root.fills),k:[]};
const kids=root.children.slice(FROM,TO); for (const c of kids){const x=await d(c); if(x)out.k.push(x);}
return JSON.stringify({total:root.children.length, from:FROM, to:TO, frame:out});
