const RV0=__RV__;
const TOWN=t=>({'Bonita CA':'Bonita, CA','Fort Worth TX':'Fort Worth, TX','Overland Park KS':'Overland Park, KS','Clarksville TN':'Clarksville, TN','Valley Center CA':'Valley Center, CA','CA':'CA','Nakagami District Japan':'Nakagami District, Japan'}[t]||t+', CA');
const RV=RV0.map((r,i)=>({name:r[0],town:TOWN(r[1]),date:r[2].replace(/ (\d{4})$/,', $1'),d:new Date(r[2]),q:r[3].replace(/'/g,'’'),i})).sort((a,b)=>a.d-b.d||a.i-b.i);
RV.forEach((r,k)=>r.no=String(k+1).padStart(2,'0'));
function ENTRY(parent,x,y,w,r,o={}){const z=o.z||15,nc=o.nc||86;const g=F(parent,'ledger entry No. '+r.no+': '+r.name+' (Yelp, word for word)',x,y,w,100,null);g.clipsContent=false;
 T(g,'NO.',0,2,{z:9,s:'Bold',c:C.tanD,ls:14});const num=T(g,r.no,0,14,{f:'Playfair Display',s:'Black',z:o.nz||28,c:C.ink});
 T(g,r.date.replace(', ','\n'),0,num.y+num.height+2,{z:11,s:'Medium',c:C.tanD,lh:130});
 const hd=T(g,r.name.toUpperCase()+' · '+r.town,nc,4,{z:o.hz||11,s:'Bold',c:C.ink,ls:10,w:w-nc-72});STARS(g,w-5*13,4,10,'#C99A2E');
 const q=T(g,'“'+r.q+'”',nc,Math.max(o.qy||28,hd.y+hd.height+8),{f:'Playfair Display',s:'Italic',z,c:C.ink,w:w-nc,lh:155});
 const h=Math.max(q.y+q.height,92);const rl=R(g,0,h+16,w,1,null,1,'entry rule');rl.strokes=[solid(C.tanD)];rl.strokeWeight=1;rl.dashPattern=[3,4];rl.resize(w,0.01);g.resize(w,h+17);return g;}
function RIBBON(parent,x,y,w,L,c,n){const v=figma.createVector();v.vectorPaths=[{windingRule:'NONZERO',data:`M 0 0 L ${w} 0 L ${w} ${L} L ${w/2} ${L-w*0.6} L 0 ${L} Z`}];v.fills=[solid(c)];v.strokes=[];parent.appendChild(v);v.x=x;v.y=y;v.name=n||'ribbon bookmark';return v;}
function COVER(parent,x,y,w,h,o={}){const cv=F(parent,'ledger cover: The Neighbors’ Ledger (embossed seal)',x,y,w,h,C.ink);cv.cornerRadius=8;cv.clipsContent=false;
 cv.effects=[{type:'DROP_SHADOW',color:{r:0.06,g:0.05,b:0.03,a:0.35},offset:{x:0,y:18},radius:34,spread:0,visible:true,blendMode:'NORMAL'}];
 const sp=w*0.055;R(cv,0,0,sp,h,C.char,1,'spine');R(cv,sp,0,2,h,C.tanD,0.5,'spine crease');
 const b1=R(cv,sp+18,18,w-sp-36,h-36,null,1,'gilt border outer');b1.strokes=[solid(C.tan)];b1.strokeWeight=1.5;
 const b2=R(cv,sp+26,26,w-sp-52,h-52,null,1,'gilt border inner');b2.strokes=[solid(C.tan,0.6)];b2.strokeWeight=0.8;
 const cw=w-sp,s=o.s||1;
 T(cv,'THE NEIGHBORS’',sp,h*0.11,{z:Math.round(12*s),s:'Bold',c:C.tan,ls:30,w:cw,a:'CENTER'});
 T(cv,'Ledger',sp,h*0.11+20*s,{f:'Playfair Display',s:'Black Italic',z:Math.round(68*s),c:C.tan,w:cw,a:'CENTER'});
 const d=Math.round(230*s);const seal=SEAL(cv,sp+(cw-d)/2,h*0.36,d,'TWENTY YELP REVIEWS · ALL FIVE STARS · READ 17 NOV 2026 · ',{fg:C.tan,rz:Math.max(8,Math.round(11*s)),band:Math.round(40*s),n:'embossed seal: 5.0 on Yelp, 20 reviews'});
 const five=T(seal,'5.0',0,0,{f:'Playfair Display',s:'Black',z:Math.round(54*s),c:C.tan,w:d,a:'CENTER'});five.y=d*0.26;
 STARS(seal,d/2-5*(12*s+3)/2,d*0.565,Math.round(12*s),'#C99A2E');
 T(seal,'ON YELP',0,d*0.643,{z:Math.max(8,Math.round(10*s)),s:'Bold',c:C.tan,w:d,a:'CENTER',ls:24});
 const by=seal.y+d+26*s;T(cv,'MIKE’S PLUMBING SERVICES',sp,by,{z:Math.max(9,Math.round(11*s)),s:'Bold',c:C.tan,ls:24,w:cw,a:'CENTER'});
 T(cv,'Riverside · Est. 2025',sp,by+22*s,{f:'Playfair Display',s:'Italic',z:Math.round(15*s),c:C.tan,o:0.75,w:cw,a:'CENTER'});
 return cv;}
function FIXLINES(r){for(const x of r.findAll(x=>x.type==='RECTANGLE'&&['dotted leader','entry rule','tear-off perforation'].includes(x.name)&&x.height<0.5)){const L=figma.createLine();L.name=x.name;const p=x.parent;p.insertChild(p.children.indexOf(x),L);L.x=x.x;L.y=x.y;L.resize(Math.max(x.width,1),0);L.strokes=x.strokes;L.strokeWeight=x.strokeWeight;L.dashPattern=x.dashPattern;x.remove();}}
