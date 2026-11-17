const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const sec=await figma.getNodeByIdAsync('481:438');
for(const c of [...sec.children])c.remove();
const out={};
const FL={...H,flyer:'502d079a097d62fb95b0f6f4e5f1777a1ba0ebfc',svclist:'b87b8ddf8a655b0b5613b7d8060945735f4c1cf7'};Object.assign(H,FL);
function PILL(p,x,y,w,txt,o={}){const g=F(p,'pill: '+txt,x,y,w,o.h||44,o.bg||C.white);g.strokes=[solid(o.st||'#DDD5BC')];g.strokeWeight=1;g.cornerRadius=4;
 if(o.num){T(g,o.num,14,12,{f:'Playfair Display',s:'Black',z:16,c:o.nc||C.tanD});}
 T(g,txt,o.num?48:16,o.sub?7:12,{z:15,s:'SemiBold',c:o.tc||C.ink,w:w-(o.num?48:16)-(o.tag?64:16)});
 if(o.sub)T(g,o.sub,o.num?48:16,27,{z:12,c:o.sc||C.muteD,w:w-70});
 if(o.tag){const tg=F(g,'tag',w-58,(o.h||44)/2-11,46,22,null);tg.clipsContent=false;HX(tg,0,0,46,22,{fill:o.tagC||C.ink,cut:6});T(tg,o.tag,0,4,{z:10,s:'Bold',c:o.tagT||C.cream,w:46,a:'CENTER',ls:8});}
 return g;}
// ---------- 01 OLD vs NEW SITEMAP ----------
{const fr=F(sec,"01 Old vs New Sitemap",120,200,1440,1160,C.paper);out.sitemap=fr.id;
 EYE(fr,'01 · Sitemap',140,110,{c:C.tanD});
 TR(fr,[['No website today.\n',{c:C.ink}],['A full site, built to rank.',{f:'Playfair Display',s:'Black Italic',c:C.tanD}]],140,156,{f:'Playfair Display',s:'Black',z:44,lh:110,w:900});
 // OLD column (dark card)
 const od=F(fr,'OLD: what Mike has today',140,320,380,740,C.ink);
 T(od,'TODAY',28,28,{z:12,s:'SemiBold',c:C.tan,ls:18});T(od,'No website, no Google profile',28,50,{f:'Playfair Display',s:'Bold',z:22,c:C.cream,w:324,lh:120});
 const old=[['Instagram',['@mikesplumbingservices, verified','43 posts · 248 followers','Bio: IE | OC | LA, insured, free estimates','Highlights: FLYER (15% off), YELP 5']],['Yelp',['5.0 stars · 20 reviews','"Serving Riverside Area"','Hours shown: open 24 hours','"License not provided"']],['Nextdoor',['Page "Mike’s Plumbing Services"','City shown: Irvine (old slug: fine-plumbing-service-hemet-ca)','Hours shown: 7 AM – 11 PM','3 neighbor recommendations seen']]];
 let oy=118;for(const [h,l] of old){T(od,h.toUpperCase(),28,oy,{z:12,s:'SemiBold',c:C.tan,ls:16});oy+=26;for(const s of l){const g=F(od,'old pill: '+s,28,oy,324,40,C.char2);g.strokes=[solid(C.line)];g.cornerRadius=4;const t=T(g,s,14,10,{z:13,c:C.cream,w:296,lh:130});g.resize(324,Math.max(40,t.height+20));oy+=g.height+8;}oy+=14;}
 T(od,'Source: Claude’s checks on IG, Yelp, Nextdoor, CSLB and Google, 17 Nov 2026.',28,oy+4,{z:11,c:C.mute,w:324,lh:140});od.resize(380,Math.max(740,oy+60));
 // NEW grid
 T(fr,'NEW · 11 PAGE DESIGNS (DESKTOP + MOBILE) · 21 PAGES AT LAUNCH',560,320,{z:12,s:'SemiBold',c:C.tanD,ls:14});
 const pages=[['01','Home','/','NEW'],['02','Services hub','/services/','NEW'],['03','Drain cleaning & hydro jetting','/services/drain-cleaning-hydro-jetting/','NEW'],['04','Commercial & restaurants','/services/commercial-plumbing/','NEW'],['05','Emergency plumbing','/services/emergency-plumbing/','NEW'],['06','Town template: Riverside','/areas/riverside-ca/','NEW'],['07','Service areas hub','/areas/','NEW'],['08','About Mike','/about/','NEW'],['09','Our work','/gallery/','NEW'],['10','Reviews','/reviews/','NEW'],['11','Contact','/contact/','NEW']];
 pages.forEach((p,i)=>{const col=i%2,row=Math.floor(i/2);PILL(fr,560+col*380,350+row*64,364,p[1],{num:p[0],sub:p[2],h:54,tag:p[3]});});
 const nb=F(fr,'built from the same templates',560,350+6*64+10,744,250,C.cream);nb.strokes=[solid('#DDD5BC')];
 T(nb,'BUILT NEXT, SAME TEMPLATES',24,22,{z:12,s:'SemiBold',c:C.tanD,ls:14});
 T(nb,'Service pages: water heaters · leak detection & slab leaks · sewer lines & camera inspection · toilets, sinks & faucets · garbage disposals · water filtration · pressure washing.',24,48,{z:15,c:C.ink,w:696,lh:150});
 T(nb,'Town pages (8 max at launch, each with that town’s real Yelp review): Riverside, Corona, Moreno Valley, Menifee, Murrieta, Fontana, Irvine, Buena Park. Plus /thank-you/ (noindex).',24,124,{z:15,c:C.ink,w:696,lh:150});
 T(nb,'Mike to confirm which towns he really works in before launch.',24,206,{z:13,s:'Medium',c:C.tanD,w:696});}
// ---------- 02 BRAND MOODBOARD ----------
{const fr=F(sec,"02 Brand Moodboard",1640,200,1440,1160,C.ink);out.mood=fr.id;
 EYE(fr,'02 · Moodboard',140,110,{c:C.tan});
 TR(fr,[['The website is the badge.\n',{c:C.cream}],['Black, cream and old-school craft.',{f:'Playfair Display',s:'Black Italic',c:C.tan}]],140,156,{f:'Playfair Display',s:'Black',z:44,lh:110,w:900});
 LOGO(fr,1080,96,220,'his real logo (unchanged)');
 const tiles=[[140,320,520,380,'mike','THE OWNER (IG)'],[680,320,300,380,'van','THE VAN (IG)'],[1000,320,300,380,'bar','COMMERCIAL (IG)'],[140,720,300,300,'flyer','HIS FLYER (IG)'],[460,720,300,300,'svclist','HIS SERVICE LIST (IG)'],[780,720,300,300,'interceptor','GREASE WORK (IG)']];
 for(const [x,y,w,h,k,l] of tiles){IMGHX(fr,x,y,w,h,k,{cutCorners:26,n:'moodboard: '+l});const lb=F(fr,'label '+l,x+16,y+16,10,28,null);lb.clipsContent=false;const t=T(lb,l,14,6,{z:11,s:'SemiBold',c:C.ink,ls:12});lb.resize(t.width+28,28);HX(lb,0,0,t.width+28,28,{fill:C.cream,cut:9});lb.appendChild(t);}
 // motif tile
 const mt=F(fr,'motif tile: badge hex',1100,720,200,300,C.char);mt.strokes=[solid(C.line)];
 HX(mt,30,40,140,64,{stroke:C.tan,sw:2,cut:20});HX(mt,46,52,108,40,{fill:C.cream,cut:14});HX(mt,30,130,140,40,{fill:C.tan,cut:13});T(mt,'BUTTON',30,141,{z:12,s:'Bold',c:C.ink,w:140,a:'CENTER',ls:14});
 RULE(mt,20,200,160,C.tan);T(mt,'Badge hex from his logo: buttons, tags, dividers',20,236,{z:12,c:C.mute,w:160,lh:140});
 const kw=['Friendly. Transparent. Proficient. (his IG bio)','Badge hex from the real logo','Cream on black, nothing else','Real photos only. No stock, no AI.','One script accent per page'];
 let kx=140;for(const k of kw){const g=F(fr,'keyword: '+k,kx,1060,10,34,null);g.clipsContent=false;const t=T(g,k,38,8,{z:13,s:'Medium',c:C.cream});g.resize(t.width+54,34);HX(g,0,0,t.width+54,34,{stroke:C.line,cut:11});SVG(g,IC.check(C.tan),14,9,16);g.appendChild(t);kx+=g.width+12;}}
// ---------- 03 COLORS & FONTS ----------
{const fr=F(sec,"03 Colors & Fonts",3160,200,1440,1160,C.paper);out.colors=fr.id;
 EYE(fr,'03 · Colours and fonts',140,110,{c:C.tanD});
 TR(fr,[['Mike’s own palette.\n',{c:C.ink}],['Straight off the badge and the flyer.',{f:'Playfair Display',s:'Black Italic',c:C.tanD}]],140,156,{f:'Playfair Display',s:'Black',z:44,lh:110,w:1000});
 const sw=[['Ink','#0F0E0C','Logo black. Header, dark bands, text.','sampled: his logo'],['Charcoal','#1C1B19','Cards on dark, alternating bands.','sampled: IG logo tile #232323, deepened'],['Cream','#E8E3C8','Logo lettering. Main buttons, form cards.','sampled: IG logo tile'],['Tan','#D2C4A7','Flyer cream. Italic heading word, stars, icons.','sampled: his flyer'],['Paper','#F4F0E1','Light sections.','tint of his cream (ours)'],['Tan dark','#8E8268','Eyebrows and accents on light.','shade of his tan (ours)']];
 sw.forEach((s,i)=>{const x=140+(i%3)*390,y=320+Math.floor(i/3)*170;const dark=['Ink','Charcoal','Tan dark'].includes(s[0]);const g=F(fr,'swatch '+s[0]+' '+s[1],x,y,370,150,s[1]);g.strokes=[solid('#DDD5BC')];
  T(g,s[0],22,20,{z:15,s:'SemiBold',c:dark?C.cream:C.ink});T(g,s[1],22,42,{f:'Playfair Display',s:'Bold',z:24,c:dark?C.cream:C.ink});T(g,s[2],22,86,{z:13,c:dark?C.mute:C.muteD,w:326});T(g,s[3].toUpperCase(),22,118,{z:10,s:'SemiBold',c:dark?C.tan:C.tanD,ls:12});});
 T(fr,'No blue, no red, no extra accent. Cream on ink must pass 4.5:1 (it does: about 15:1).',140,666,{z:14,c:C.muteD});
 const f1=F(fr,'font: Playfair Display',140,710,500,370,C.ink);
 T(f1,'PLAYFAIR DISPLAY · HEADINGS',28,28,{z:11,s:'SemiBold',c:C.tan,ls:14});TR(f1,[["Riverside's ",{c:C.cream}],['first-call',{f:'Playfair Display',s:'Black Italic',c:C.tan}],[' plumber.',{c:C.cream}]],28,62,{f:'Playfair Display',s:'Black',z:40,lh:110,w:440});
 T(f1,'Closest free match to the flared serif in his logo (inferring; Mike to send the real font name if he has it). Black for headings, Black Italic for the one tan word.',28,230,{z:14,c:C.mute,w:440,lh:150});
 const f2=F(fr,'font: Jost',660,710,380,370,C.cream);
 T(f2,'JOST · BODY AND BUTTONS',28,28,{z:11,s:'SemiBold',c:C.tanD,ls:14});T(f2,'Drains, leaks, water heaters and sewer lines, done right and left spotless.',28,62,{z:19,s:'Medium',c:C.ink,w:324,lh:150});
 BTN(f2,28,170,'Call (951) 809-9533',{k:'ink',icon:'phone',h:54,z:15,w:324});
 T(f2,'Closest match to the geometric sans on his flyer (inferring). Regular 18 body, SemiBold buttons.',28,250,{z:14,c:C.muteD,w:324,lh:150});
 const f3=F(fr,'font: Yellowtail',1060,710,240,370,C.char);
 T(f3,'YELLOWTAIL · SCRIPT',24,28,{z:11,s:'SemiBold',c:C.tan,ls:14});T(f3,'Our Services',24,70,{f:'Yellowtail',z:40,c:C.cream,w:200,lh:110});
 T(f3,'Closest match to the script on his flyer (inferring). One accent per page, never a heading.',24,230,{z:13,c:C.mute,w:192,lh:150});}
sec.resizeWithoutConstraints(4720,1560);
const shots=[];for(const id of [out.sitemap,out.mood,out.colors]){const n=await figma.getNodeByIdAsync(id);shots.push(await n.screenshot({scale:0.5}));}
return out;
