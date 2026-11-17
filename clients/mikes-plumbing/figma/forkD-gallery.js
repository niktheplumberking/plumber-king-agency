// ===== 09 OUR WORK (GALLERY) =====
async function PATCHMC(root){const fr=root.findOne(n=>n.name==='Mobile contact band + form 2');if(!fr)return 0;const t=fr.findOne(n=>n.type==='TEXT'&&n.name==='H2');const i=t.characters.indexOf('Riverside?');if(i<0)return 0;t.insertCharacters(i+10,'your town?','BEFORE');t.deleteCharacters(i,i+10);return 1;}
const patchedAreas=await PATCHMC(await figma.getNodeByIdAsync('489:896'));
const sec=await figma.getNodeByIdAsync('481:448');
const PH=[['bar','Bar sink plumbing','Instagram',520],['interceptor','Grease interceptor service','Instagram',420],['roughin','Rough-in plumbing','Instagram',560],
['cleanout','Sewer cleanout dig','Instagram',460],['ytoilet','Toilet install','Yelp',520],['backflow','Main line leak repair','Instagram',480],
['ygrease','Commercial grease tank','Yelp',440],['hosebib','Pressure regulator & hose bib','Instagram',540],['yyard','Commercial job site','Yelp',400],
['roots','Roots in a sewer line','Instagram',300],['yasphalt','Asphalt patch after the dig','Yelp',420],['yard','Yard cleaned up after the job','Instagram',480],
['stucco','Leak behind stucco','Instagram',300],['yyard2','Commercial job site','Yelp',400]];
function TILE(S,x,y,w,h,p,o={}){const g=F(S,'gallery tile: '+p[1]+' ('+p[2]+' photo)',x,y,w,h+(o.cap||92),C.white);g.strokes=[solid('#D6CEB4')];g.strokeWeight=1;IMG(g,0,0,w,h,p[0],{n:'photo (real, '+p[2]+'): '+p[0]});
 HX(g,12,12,o.small?74:96,26,{fill:C.ink,fo:0.85,cut:8});T(g,p[2]==='Yelp'?'YELP':'INSTAGRAM',12,17,{z:o.small?9:11,s:'SemiBold',c:C.tan,w:o.small?74:96,a:'CENTER',ls:10});
 const c=T(g,p[1],o.small?12:20,h+(o.small?12:18),{f:'Playfair Display',s:'Bold',z:o.small?15:20,c:C.ink,w:w-(o.small?24:40),lh:120});
 const tw=T(g,'Town: Mike to confirm',o.small?12:20,c.y+c.height+6,{z:o.small?12:14,c:C.muteD});g.resize(w,tw.y+tw.height+(o.small?14:20));return g;}
function MASONRY(S,x,y,w,cols,gap,o={}){const cw=(w-(cols-1)*gap)/cols;const hs=Array(cols).fill(y);PH.forEach(p=>{let ci=0;for(let i=1;i<cols;i++)if(hs[i]<hs[ci])ci=i;const h=Math.round(p[3]*(o.k||1));const t=TILE(S,x+ci*(cw+gap),hs[ci],cw,h,p,o);hs[ci]+=t.height+gap;});return Math.max(...hs);}
function IGBLOCK(S,x,y,w,o={}){const m=o.m;const g=F(S,'Instagram follow block',x,y,w,m?380:260,C.ink);g.clipsContent=false;HX(g,m?24:48,m?28:60,m?64:96,m?64:96,{stroke:C.tan,sw:1.5,cut:m?14:22});SVG(g,IC.ig(C.tan),m?40:74,m?44:86,m?32:44);
 const ex=m?24:184;const ey=m?112:56;T(g,'Follow the work',ex,ey,{f:'Yellowtail',z:m?28:34,c:C.tan});const hd=T(g,'@mikesplumbingservices',ex,ey+(m?42:50),{f:'Playfair Display',s:'Black',z:m?24:40,c:C.cream,w:m?w-48:640});
 T(g,'43 posts on Instagram (17 Nov 2026). New jobs go up there first.',ex,hd.y+hd.height+12,{z:m?15:17,c:C.mute,w:m?w-48:640,lh:150});
 if(m)BTN(g,24,g.height-84,'Follow on Instagram',{k:'cream',icon:'arrow',h:56,w:w-48,z:15});else BTN(g,w-360,98,'Follow on Instagram',{k:'cream',icon:'arrow',h:62,w:300,z:17});return g;}
const D=F(sec,'Our work - Desktop 1440',120,200,1440,9000,C.paper);
UTILBAR(D,0);HEADER(D,40,'Our work');
let y=144+PAGEHERO(D,144,{photo:'mike',crumb:'Home  /  Our work',eye:'Our work',h1:[['Recent jobs,\n',{c:C.cream}],['real photos.',{f:'Playfair Display',s:'Black Italic',c:C.tan}]],intro:'Every photo here is from Mike’s own Instagram or Yelp page. No stock photos, no AI. Drains, leaks, sewer lines, fixtures and commercial work.'}).height;
let S=F(D,'S1 Masonry gallery',0,y,1440,4000,C.paper);
let b=HEAD(S,80,96,'The gallery',[['Mike’s work, '],['as it happened.',1]],'14 job photos from Instagram and Yelp. Each photo shows the job type; the town for each job is still being confirmed.',{w:760,z:50});
CHIPS(S,880,b-46,480,['Instagram: 9','Yelp: 5'],{});
b=MASONRY(S,80,b+56,1280,3,24);
S.resize(1440,b+72);y+=S.height;
S=F(D,'S2 Instagram follow',0,y,1440,400,C.cream);IGBLOCK(S,80,96,1280);S.resize(1440,BOT(S)+96);y+=S.height;
y+=CONTACTBAND(D,y,{photo:'van',h:[['Want work like this\n'],['at your place?',1],[' Call Mike.']]}).height;y+=FOOTER(D,y).height;D.resize(1440,y);
NOTE(sec,1600,200+900,'MIKE TO CONFIRM: the town for each of the 14 job photos (captions say "Town: Mike to confirm").');
NOTE(sec,1600,200+1700,'MIKE TO CONFIRM: OK to use his Yelp photos on the site (5 tiles marked YELP)? Job-type captions are our reading of the photos.');
NOTE(sec,1600,200+3000,'MIKE TO CONFIRM: hours + CSLB # (contact band + footer). IG post count 43 = read 17 Nov 2026, update at launch.');
// ===== MOBILE =====
const M=F(sec,'Our work - Mobile 390',2000,200,390,9000,C.paper);
MHEADER(M,0);let my=72+MPAGEHERO(M,72,{photo:'mike',crumb:'Home / Our work',eye:'Our work',h1:[['Recent jobs, ',{c:C.cream}],['real photos.',{f:'Playfair Display',s:'Black Italic',c:C.tan}]],intro:'Every photo is from Mike’s own Instagram or Yelp page. No stock, no AI.'}).height;
let MS=F(M,'M1 Gallery',0,my,390,6000,C.paper);b=HEAD(MS,20,48,'The gallery',[['Mike’s work, '],['as it happened.',1]],'14 job photos. Towns still being confirmed.',{w:350,z:32});
b=MASONRY(MS,20,b+28,350,2,12,{k:0.5,small:true,cap:70});MS.resize(390,b+36);my+=MS.height;
MS=F(M,'M2 Instagram follow',0,my,390,500,C.cream);IGBLOCK(MS,20,48,350,{m:true});MS.resize(390,BOT(MS)+48);my+=MS.height;
const mc=MCONTACT(M,my);my+=mc.height;await PATCHMC(M);my+=MFOOTER(M,my).height;my+=MSTICKY(M,my).height;M.resize(390,my);
NOTE(sec,2430,200+1200,'MIKE TO CONFIRM (mobile): town per photo, Yelp photo use, hours, CSLB #.');
sec.resizeWithoutConstraints(2830,Math.max(D.y+D.height,M.y+M.height)+200);
return {D:D.id,M:M.id,Dh:D.height,Mh:M.height,patchedAreas};
