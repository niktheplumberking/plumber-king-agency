const pg=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(pg);
const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
for(const [f,s] of FONTS)await figma.loadFontAsync({family:f,style:s});
const miss=[];const rgbH=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
const LF=async fn=>{try{await figma.loadFontAsync(fn);return true}catch(e){return false}};
const N=async i=>await figma.getNodeByIdAsync('577:'+i);
async function S(i,str,hl){const n=await N(i);if(!n||n.type!=='TEXT'){miss.push(i);return;}
 const segs=n.getStyledTextSegments(['fontName','fills','fontSize']);for(const s of segs)await LF(s.fontName);
 const f=segs[0];n.characters=str;const L=str.length;if(!L)return;
 n.setRangeFontName(0,L,f.fontName);n.setRangeFills(0,L,f.fills);n.setRangeFontSize(0,L,f.fontSize);n.setRangeTextDecoration(0,L,'NONE');
 for(const p of (hl||[])){const k=str.indexOf(p);if(k<0){miss.push(i+':'+p);continue;}
  const sb={family:f.fontName.family,style:'SemiBold'};if(await LF(sb))n.setRangeFontName(k,k+p.length,sb);
  n.setRangeTextDecoration(k,k+p.length,'UNDERLINE');
  try{n.setRangeTextDecorationColor(k,k+p.length,{value:rgbH('#d2c4a7')});n.setRangeTextDecorationThickness(k,k+p.length,{value:5,unit:'PIXELS'});n.setRangeTextDecorationOffset(k,k+p.length,{value:-2,unit:'PIXELS'});}catch(e){}}}
async function ACC(i,line,col){const n=await N(i);const lines=n.characters.split('\n');let k=0;for(let j=0;j<line;j++)k+=lines[j].length+1;
 n.setRangeFontName(k,n.characters.length,{family:'Playfair Display',style:'Bold Italic'});n.setRangeFills(k,n.characters.length,[{type:'SOLID',color:rgbH(col)}]);}
async function JOST(i){const n=await N(i);n.fontName={family:'Jost',style:'SemiBold'};}
async function IMG(i,key,mode){const n=await N(i);if(!n){miss.push(i);return;}n.fills=[{type:'IMAGE',imageHash:H[key],scaleMode:mode||'FILL'}];}
async function SEAL(i){const n=await N(i);if(!n){miss.push(i);return;}n.fills=[{type:'SOLID',color:rgbH('#0f0e0c')},{type:'IMAGE',imageHash:H.logo,scaleMode:'FIT'}];n.name='logo';}
async function HIDEP(i){const n=await N(i);if(n)n.parent.visible=false;else miss.push('h'+i);}
async function INIT(nameId,ch){const n=await N(nameId);let p=n.parent;for(let d=0;d<4&&p;d++){const t=p.findOne(x=>x.type==='TEXT'&&x.characters.length===1&&x.characters!=='y');if(t){await LF(t.fontName);t.characters=ch;return;}p=p.parent;}miss.push('init'+nameId);}
await LF({family:'Playfair Display',style:'Bold Italic'});await LF({family:'Jost',style:'SemiBold'});await LF({family:'Jost',style:'Medium'});
const DARK='#d2c4a7',LIGHT='#8e8268';
// utility + header
await S(632,'5.0 · 20 Yelp reviews');await S(635,'Insured · Free estimates');
await IMG(2034,'logo','FIT');
// hero
await S(655,'5.0');await S(662,'20 Yelp reviews');await S(668,'Friendly. Transparent.');await S(669,'Proficient.');
await S(670,"Riverside's\nfamily plumber,\nthe owner\non every job.");await ACC(670,2,LIGHT);
await S(675,'Drains, leaks, sewer lines and toilets, for homes, ADUs and restaurants. Free estimates, and 15% off for new customers.');
await S(681,'(951) 809-9533');await S(682,'Tap to call · Free estimates');
await IMG(689,'mike');await IMG(690,'bar');await S(692,'Mike, running a drain camera.');
await S(697,'20 of 20 five stars');
await S(704,'Insured');await S(709,'Family owned');await S(714,'Est. 2025');await S(719,'Free estimates');await S(725,'15% off new customers');
// trust bento
await S(835,'Why Riverside calls Mike');await S(836,'20 neighbors reviewed Mike.\nEvery single one gave five stars.');await ACC(836,1,DARK);
await S(844,'Yelp reviews');const dg=[[847,'0'],[852,'0'],[857,'0'],[862,'2'],[867,'0']];for(const [i,c] of dg)await S(i,c);
await S(871,'checked 17 Nov 2026');await S(873,'5.0');await S(882,'Read them all on Yelp');
await S(891,'Named in 14 of 20');await S(892,'Yelp reviews that say Mike');for(const i of [895,897,899,901])await HIDEP(i);await S(902,'Counted 17 Nov 2026');
await S(910,'“Owner Mike came himself and took care of issues I had with my toilet and sink. Was on time and took care of everything pretty quick. Left everything clean and working perfectly. Thank you Mike!”',['Owner Mike came himself','Left everything clean']);
await S(912,'Isaiah C.');await S(913,'Yelp review · Riverside');await S(917,'Mike');await INIT(912,'I');
await S(922,'Insured');await S(923,'Licence #: Mike to confirm');await JOST(923);await S(924,'Insured, as listed on his Instagram profile.');
await IMG(926,'yard');await S(927,'Family owned\nsince 2025');await S(928,"Started in the family grease business. Now it's his own company.");
await S(930,"Mike's promise: free estimates, and 15% off for new customers.");
await S(936,'(951) 809-9533');await S(937,'Free estimates · 15% off new customers');
await HIDEP(941);await SEAL(992);
// town band
await S(996,'Riverside');await S(999,'Inland Empire');await S(1002,'Orange County');await S(1005,'Los Angeles');await SEAL(1010);
// services
await S(1018,'What Mike fixes');await S(1019,'Every drain, leak and line.\nHomes, ADUs,\nrestaurants.');await ACC(1019,1,LIGHT);
await S(1020,'Homes, ADUs and restaurants across the IE, OC and LA.');
await IMG(1023,'cleanout');await S(1030,'Drain cleaning & hydro jetting');await S(1031,'Kitchen sinks, showers, toilets and main lines, cleared. Hydro jetting for the tough ones.');
await S(1036,'Call about a drain');await S(1038,'See drain cleaning');await S(1043,'Hydro jetting');
await IMG(1045,'roots');await S(1051,'Sewer lines & camera');await S(1052,'Camera inspection and root removal for main sewer lines.');
await S(1057,'Call about a sewer line');await S(1059,'See sewer lines');
await S(1070,'1 of 5 · swipe');await S(1071,'Also: Leaks & slab leaks · Toilets, sinks & faucets · Restaurants & grease');
// more box + about
await S(1074,'More Mike does');
const more=[[1077,'Water heaters'],[1082,'Garbage disposals'],[1087,'Water filtration'],[1092,'Pressure regulators'],[1097,'Shut-off valves'],[1102,'Rough-in for ADUs'],[1107,'Commercial plumbing'],[1112,'Pressure washing']];for(const [i,t] of more)await S(i,t);
await S(1117,'15% off your first job');await S(1118,'For new customers. Any limits: Mike to confirm.');
await S(1125,'Mike');await HIDEP(1128);
await IMG(1120,'van');await IMG(1121,'yasphalt');
await S(1136,'Family owned · Est. 2025');await S(1137,'Not a call center.\nJust Mike and his phone.');await ACC(1137,1,LIGHT);
await S(1138,"Mike grew up in his family's grease business. After 10+ years of hands-on work, he started his own company in 2025. He serves Riverside, the IE, OC and LA.");
await S(1139,'11 of his 20 Yelp reviews mention a fair price. 7 mention how clean he left the place.');
await S(1145,'You talk to Mike, not a call center. “Mike actually called me instead of back and forth messaging.” Martha B.');
await S(1152,'You know the price first. “He was upfront and honest with me on pricing.” Sal C.');
await S(1157,'He cleans up. “I came home to a fixed leak and spotless work site.” Stuart W.');
await S(1158,'working from the heart');await S(1160,'Meet Mike');await S(1167,'Call (951) 809-9533');
// who shows up
await S(1175,'Who shows up');await S(1176,"You'll meet Mike.\nEvery time.");await ACC(1176,1,DARK);
await S(1177,"14 of Mike's 20 Yelp reviews say his name. Counted 17 Nov 2026.");
await S(1182,'OWNER');await S(1183,'Mike');await S(1184,'in 14 of 20 reviews');for(const i of [1187,1192,1197])await HIDEP(i);
{const ph=await N(1178);ph.fills=[{type:'SOLID',color:rgbH('#1c1b19')},{type:'IMAGE',imageHash:H.logo,scaleMode:'FIT'}];ph.name='brand panel (Mike logo, no crew photo exists)';}
await S(1207,'“Mike was a pleasure to work with.”');await S(1212,'Pamela N.');await S(1213,'Yelp review · Menifee');await INIT(1212,'P');
await S(1219,'Counted from all 20 Yelp reviews, read 17 Nov 2026.');await S(1221,"Read Mike's Yelp reviews");
// reviews wall
await S(1232,'Real Yelp reviews');await S(1233,'They rarely just say "he fixed it."\nThey talk about how Mike treated them.');await ACC(1233,1,LIGHT);
await S(1240,'5.0');await S(1247,'20 Yelp reviews');
await S(1255,"I can't say enough good things about Mike! From the moment he arrived, he was professional, respectful, and very easy to talk to. He took his time explaining everything in detail and made sure we understood all our options... He fixed our water leaks and installed new water lines throughout our entire home",['took his time explaining everything in detail','installed new water lines throughout our entire home']);
await S(1260,'Leak repair');await S(1264,'Water lines');await S(1269,'Jackie H. · Fontana');await S(1270,'Yelp review · Apr 2026');await INIT(1269,'J');
await S(1279,'Mike');await HIDEP(1282);
await S(1291,'Mike did a great job replacing and installing our new upstairs toilet. He is an excellent communicator. His prices are fair and competitive. I will definitely use him again!',['excellent communicator','fair and competitive']);
await S(1296,'Toilet replacement');await HIDEP(1300);await S(1305,'Bruce H. · West Hollywood');await S(1306,'Yelp review · Aug 2026');await INIT(1305,'B');
await S(1315,'Mike');await HIDEP(1318);
await S(1329,'Read all 20 on Yelp');await S(1338,'Leave Mike a Yelp review');await IMG(1340,'yyard2');await S(1342,'A commercial job site, left clean. (Yelp photo)');
// process
await S(1350,'How it works');await S(1351,'From your call\nto fixed');await ACC(1351,1,LIGHT);
await S(1355,'Call or text Mike.');await S(1356,"The owner picks up, asks what's going on and tells you when he can come.");
await S(1358,'"Great service responded fast and did the work same day"');await S(1365,'Erik N.');
await S(1369,'Mike shows up himself.');await S(1370,'No dispatcher and no stranger at your door. The owner does the job.');
await S(1372,'"Mike was here within two hours of our call."');await S(1379,'Suzi J.');
await S(1384,'He looks, explains it in plain words and gives you the cost before any work starts. Estimates are free.');
await S(1386,'"He addressed all my plumbing issues and suggested the best option"');await S(1393,'Laura G.');
await S(1398,'He tests the work and leaves the place the way he found it.');
await S(1400,'"Completed the service requested and left the area super clean."');await S(1407,'Julian T.');
await S(1444,'(951) 809-9533');await S(1445,'Tap to call · Mike answers');await SEAL(1438);
// emergency
await IMG(1460,'backflow');await S(1472,'Shut off the water.\nThen call Mike.');await ACC(1472,1,DARK);
await S(1473,"A burst line, a slab leak, a drain backing up. Don't wait and see. Call Mike and tell him what you see.");
await S(1479,'(951) 809-9533');await S(1480,'Call or text Mike');await S(1491,'Water near outlets or the breaker panel? Stay clear of it and tell Mike when you call.');
// our work
await S(1505,'I sent my request for quote from Yelp to several plumbers for a kitchen faucet replacement. Mike was fast with his response, replaced my faucet for a fair price and did a great job in a timely manner. Very clean, professional, and great communication skills.',['fast with his response','fair price','Very clean']);
await S(1510,'Sydney H.');await S(1511,'Yelp review · Aug 2025');await S(1520,'Mike');await INIT(1510,'S');
await S(1528,'Real jobs,\nnot stock photos');await ACC(1528,1,LIGHT);
await IMG(1529,'hosebib');await S(1530,'Hose bib pipe job.');await IMG(1531,'roughin');await S(1532,'Bathroom rough-in, walls still open.');
await IMG(1533,'ygrease');await S(1534,'Grease tank job. (Yelp photo)');await IMG(1535,'yyard');await S(1536,'Commercial site. (Yelp photo)');
await S(1542,'43');await S(1543,"posts on Mike's Instagram.\nHe shows his work.");await S(1545,'@mikesplumbingservices');await S(1551,"See more of Mike's work");
// areas
{const t=await N(1582);let mc=t.parent;while(mc.parent&&mc.parent.id!=='577:1555')mc=mc.parent;
 const keep=mc;for(const k of [...keep.children])k.remove();keep.fills=[{type:'IMAGE',imageHash:H.map,scaleMode:'FILL'}];keep.name='Map card / real Google Maps screenshot (17 Nov 2026)';
 const tag=figma.createFrame();tag.name='map label';tag.layoutMode='HORIZONTAL';tag.paddingLeft=tag.paddingRight=10;tag.paddingTop=tag.paddingBottom=6;tag.cornerRadius=8;
 tag.fills=[{type:'SOLID',color:rgbH('#0f0e0c')}];const tt=figma.createText();tt.fontName={family:'Jost',style:'Medium'};tt.characters='Google Maps · Riverside, CA · 17 Nov 2026';tt.fontSize=11;tt.fills=[{type:'SOLID',color:rgbH('#e8e3c8')}];
 tag.appendChild(tt);keep.appendChild(tag);tag.primaryAxisSizingMode='AUTO';tag.counterAxisSizingMode='AUTO';tag.x=14;tag.y=14;}
{const ph=await N(1616);if(ph){const cap=ph.parent.children[ph.parent.children.indexOf(ph)+1];ph.remove();if(cap&&/caption/i.test(cap.name))cap.remove();}}
await S(1563,'Based in Riverside.\nOut across IE, OC and LA.');await ACC(1563,1,LIGHT);
await S(1564,'Mike works from Riverside and drives out across the Inland Empire, Orange County and Los Angeles.');
await S(1622,'Inland Empire');await S(1630,'Orange County');await S(1638,'Los Angeles');await S(1642,'Yelp reviews came from');
const towns=['Riverside','Corona','Moreno Valley','Fontana','Menifee','Murrieta','Irvine','Buena Park','Los Angeles','West Hollywood'];
const tids=[1648,1653,1658,1663,1668,1673,1678,1683,1688,1693];for(let j=0;j<10;j++)await S(tids[j],towns[j]);
await S(1699,'Not sure if Mike comes to you? Call and ask.');
// faq
await S(1714,"Straight answers. If yours isn't here, call or text Mike.");await S(1723,'How much does a plumber cost in Riverside?');
await S(1728,'It depends on the job. Mike looks first and tells you the price before any work starts. Estimates are free, and new customers get 15% off.');
await S(1730,'Call (951) 809-9533');await S(1740,'Are you insured?');await S(1772,'Payment');await S(1773,'How can I pay?');
await S(1801,'Rather just ask Mike?');await S(1802,'Call or text. Hours: Mike to confirm.');await S(1808,'Call (951) 809-9533');await S(1809,'You talk to Mike, the owner');await SEAL(1812);
// cta
await S(1821,"Tell Mike\nwhat's going on.\nHe'll take it\nfrom there.");await ACC(1821,2,DARK);
await S(1822,'Call or text Mike. Or send the form and he calls you back.');await S(1823,'(951) 809-9533');await S(1829,'(951) 809-9533');await S(1830,'Tap to call · or text Mike');
await S(1846,'(951) 000-0000');await S(1866,'Add a photo (optional). It helps Mike quote faster.');await S(1876,'Mike calls you back. No spam, ever.');
await S(1885,'Free estimates · 15% off new customers');await S(1890,'Insured · Licence #: Mike to confirm');await JOST(1890);await S(1897,'5.0 from 20 Yelp reviews');await SEAL(1879);
// footer
await IMG(1907,'logo','FIT');await S(1904,"Mike's");
await S(1908,'Family-owned plumbing from Riverside, for the Inland Empire, Orange County and Los Angeles. Est. 2025.');
await S(1927,'Yelp reviews');await S(1929,'5.0');
{const f=await N(1898);const d=f.findAll(n=>n.type==='TEXT'&&/^[947]$/.test(n.characters));if(d.length>=3){await S(d[0].id.split(':')[1],'2');await S(d[1].id.split(':')[1],'0');d[2].parent.visible=false;}else miss.push('digits'+d.length);
 const fb=f.findAll(n=>/facebook|fb/i.test(n.name));fb.forEach(n=>{if(/social/i.test(n.name))n.visible=false;});}
await S(1941,'(951) 809-9533');await S(1942,'Tap to call or text');await S(1953,"Mike's Plumbing Services");await S(1954,'Serving Riverside, IE, OC, LA\nService-area business');
await S(1955,'(951) 809-9533');await S(1956,'mikesplumbingco25@gmail.com');await S(1957,'Hours: Mike to confirm\nFree estimates');
await S(2007,'Yelp 5.0');await S(2008,'20 of 20 reviews are five stars\n(read 17 Nov 2026)');await S(2015,'Insured');await S(2016,'Licence #: Mike to confirm');await JOST(2016);
await S(2022,'Free estimates · 15% off new customers');await S(2023,'Friendly. Transparent. Proficient.');await S(2025,"© 2026 Mike's Plumbing Services · Licence #: Mike to confirm");
// sticky
await S(2052,'(951) 809-9533');
return {miss};
