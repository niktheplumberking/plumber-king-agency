const pg=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(pg);
const AF=Object.getPrototypeOf(async function(){}).constructor;const L=await new AF(figma.root.getSharedPluginData('pkmike','badge'))();
const {C,T,TR,V,HEX,PH,EB,HD,BTN,DIV,IC,ICON,NOTE,SEC,R,F,STARS,CHIP,hexPath,cutPath,solid,img}=L;
const {sec,D}=await L.PAGE(6,'08 Contact (desktop + mobile)');
const W=1440;
function center(e,cx){const dx=cx-(e.hx.x+e.w/2);e.hx.x+=dx;e.t.x+=dx;}
function FLD(p,x,y,w,label,ph){T(p,label,x,y,{f:'JM',z:14,c:C.ink});const r=R(p,x,y+24,w,52,'#FFFDF6',1,'input: '+label);r.strokes=[solid(C.ink,0.35)];r.strokeWeight=1.2;T(p,ph,x+16,y+39,{f:'J',z:15,c:C.muted});return y+24+52;}
// 1 HERO
let S=SEC(D,'Hero · a real person picks up',196,680,C.black);
HEX(S,-140,60,520,300,96,null,C.line,1.5,'motif hex');HEX(S,1080,300,520,300,96,null,C.line,1.5,'motif hex');
let e=EB(S,0,72,'Contact Mike’s Plumbing',true);center(e,W/2);
TR(S,[['A real person ',{c:C.cream}],['picks up.',{f:'PDI',c:C.tan}]],120,116,{f:'PD',z:60,a:'CENTER',w:1200,n:'H1: A real person picks up.'});
T(S,'(951) 809-9533',120,206,{f:'PD',z:150,c:C.cream,a:'CENTER',w:1200,lh:110,n:'phone huge'});
T(S,'Mike answers his own phone. Free estimates. Cash, Zelle or Cash App.',120,420,{f:'J',z:19,c:C.muted,a:'CENTER',w:1200});
let b1=BTN(S,0,480,'Call Mike','(951) 809-9533','cream',{w:270});let b2=BTN(S,0,480,'Text a photo','Same number','ghostD',{w:270});
b1.x=W/2-270-10;b2.x=W/2+10;
let cl=IC(S,0,594,18,ICON.clock,C.tan,1.8);let ht=T(S,'Answering 7 AM – 11 PM, 7 days a week',0,592,{f:'JM',z:15,c:C.tan});
const hw=26+ht.width;cl.x=W/2-hw/2;ht.x=cl.x+26;
NOTE(sec,1580,100+196+560,'Hours: Nextdoor says 7 AM–11 PM, Yelp says open 24 hours. Which one goes on the site?');
// 2 RANKED WAYS
S=SEC(D,'Ways to reach Mike · fastest first',876,660,C.paper);
DIV(S,W/2,70,false,'Fastest first');
HD(S,120,128,'Three ways in.','Pick the fastest.',false,{it:'fastest',a:'CENTER',w:1200,z:52});
const cards=[
 {x:120,w:440,fill:C.black,dark:true,rk:'01',tag:'Fastest',ic:'phone',t:'Call Mike',b:'He answers his own phone. Tell him what’s going on and get a straight answer.',a:'(951) 809-9533'},
 {x:584,w:368,fill:'#FFFDF6',dark:false,rk:'02',tag:'With a photo',ic:'camera',t:'Text a photo',b:'Snap the leak, the clog or the heater label. Mike sees it before he calls back.',a:'Text (951) 809-9533'},
 {x:976,w:344,fill:'#FFFDF6',dark:false,rk:'03',tag:'Can’t talk now',ic:'mail',t:'Send the form',b:'Leave your name and number. Mike calls you back.',a:'Fill the form below'}];
for(const c of cards){const g=F(S,'card '+c.rk+': '+c.t,c.x,296,c.w,300,null,false);
 V(g,0,0,c.w,300,cutPath(c.w,300,30),[solid(c.fill)],c.dark?null:C.ink,1.2,'card shape');
 const tc=c.dark?C.cream:C.ink,sc=c.dark?C.tan:C.brown,bc=c.dark?C.muted:C.brown;
 HEX(g,32,32,72,40,13,c.dark?C.cream:C.ink,null,0,'rank badge');T(g,c.rk,0,38,{f:'PD',z:22,c:c.dark?C.black:C.cream,a:'CENTER',w:72}).x=32;
 T(g,c.tag,120,44,{f:'SC',z:13,c:sc,ls:18});IC(g,c.w-60,38,26,ICON[c.ic],sc,1.7);
 T(g,c.t,32,100,{f:'PD',z:c.dark?40:34,c:tc});T(g,c.b,32,c.dark?160:156,{f:'J',z:16,c:bc,lh:150,w:c.w-64});
 T(g,c.a,32,246,{f:'JS',z:c.dark?20:16,c:tc});IC(g,c.w-56,246,22,ICON.arrow,tc,1.8);}
T(S,'Prefer email? mikesplumbingco25@gmail.com',0,616,{f:'J',z:15,c:C.brown,a:'CENTER',w:1200}).x=120;
// 3 FORM + NEXT
S=SEC(D,'Form + what happens next',1536,780,C.char);
const fc=F(S,'form card',120,90,680,600,null,false);V(fc,0,0,680,600,cutPath(680,600,30),[solid(C.paper)],null,0,'card shape');
EB(fc,32,32,'Send it to Mike',false);HD(fc,32,64,'Tell Mike','what’s going on.',false,{it:'what’s',z:38});
FLD(fc,32,170,300,'Your name','First and last name');FLD(fc,348,170,300,'Phone','So Mike can call you back');
FLD(fc,32,262,300,'Town','Riverside, Corona, Menifee…');
T(fc,'What’s it about?',348,262,{f:'JM',z:14,c:C.ink});
let cx=348,cy=290;for(const [i,l] of ['Drain','Leak','Water heater','Toilet','Sewer','Other'].entries()){const ch=CHIP(fc,0,0,l,false,i===0,{z:13,h:30,pad:28});if(cx+ch.w>648){cx=348;cy+=38;}ch.v.x=cx;ch.v.y=cy;ch.t.x=cx+Math.round((ch.w-ch.t.width)/2);ch.t.y=cy+Math.round((30-ch.t.height)/2);cx+=ch.w+8;}
T(fc,'A few words',32,368,{f:'JM',z:14,c:C.ink});const ta=R(fc,32,392,616,84,'#FFFDF6',1,'textarea');ta.strokes=[solid(C.ink,0.35)];ta.strokeWeight=1.2;T(fc,'Where is it, how long has it been going on?',48,408,{f:'J',z:15,c:C.muted});
const ph=V(fc,32,490,616,48,hexPath(616,48,14),[],C.brown,1.2,'photo drop');ph.dashPattern=[6,5];IC(fc,220,502,22,ICON.camera,C.brown,1.7);T(fc,'Add a photo (optional)',252,503,{f:'JM',z:15,c:C.brown});
BTN(fc,32,550-0,'Send it to Mike',null,'black',{w:616,h:50,z:16}).y=548;
let rx=880;EB(S,rx,96,'What happens next',true);HD(S,rx,132,'No call center.','Just Mike.',true,{it:'Mike.',z:48});
V(S,rx+30,330,2,300,'M 1 0 L 1 300',[],C.tan,1.5,'process line (through numbers)');
const steps=[['Mike reads it himself','Your message goes straight to Mike. No call center, no sales team.'],['He calls you back','He asks what’s going on so he shows up with a plan.'],['Price before any work','You hear the full price before anything starts. Estimates are free.']];
steps.forEach(([t,b],i)=>{const y=310+i*150;HEX(S,rx,y,62,44,13,C.char,C.tan,1.5,'step hex');T(S,String(i+1),rx,y+6,{f:'PD',z:24,c:C.cream,a:'CENTER',w:62}).x=rx;
 T(S,t,rx+92,y+4,{f:'PB',z:24,c:C.cream});T(S,b,rx+92,y+42,{f:'J',z:16,c:C.muted,lh:150,w:360});});
// 4 MAP + NAP
S=SEC(D,'Service area map + NAP card',2316,640,C.black);
const mp=R(S,0,0,W,640,null);mp.fills=[img('map')];mp.name='photo: area map (Google Maps screenshot)';R(S,0,0,W,640,C.black,0.35,'map dim');
const nc=F(S,'NAP card',120,80,460,480,null,false);V(nc,0,0,460,480,cutPath(460,480,30),[solid(C.black)],C.tan,1.2,'card shape');
EB(nc,36,36,'Where Mike works',true);T(nc,'Mike’s Plumbing Services',36,70,{f:'PD',z:30,c:C.cream,w:390});
const rows=[['pin','Based in Riverside, CA'],['home','Serving the IE, OC & LA'],['phone','(951) 809-9533'],['mail','mikesplumbingco25@gmail.com'],['clock','7 AM – 11 PM, 7 days'],['dollar','Cash, Zelle or Cash App']];
rows.forEach(([ic,t],i)=>{IC(nc,36,170+i*38,20,ICON[ic],C.tan,1.7);T(nc,t,68,170+i*38,{f:'J',z:16,c:C.cream});});
BTN(nc,36,402,'Call Mike',null,'cream',{w:388,h:50});
NOTE(sec,1580,100+2316+80,'No street address shown (works from home, service-area business). OK to list only "Riverside, CA"?');
// 5 OTHER TASKS
S=SEC(D,'Here for something else · link list',2956,540,C.paper);
EB(S,120,96,'Other things',false);HD(S,120,132,'Here for','something else?',false,{it:'else?',z:52,w:440});
T(S,'Everything else on the site, one tap away.',120,290,{f:'J',z:17,c:C.brown,w:400});
['See all services','Read all 20 Yelp reviews','See the work','Towns Mike covers','Common questions'].forEach((l,i)=>{const y=86+i*76;V(S,640,y,680,60,hexPath(680,60,18),[solid('#FFFDF6')],C.ink,1,'link row');
 HEX(S,676,y+24,20,12,5,null,C.brown,1.3,'tick');T(S,l,712,y+15,{f:'PB',z:22,c:C.ink});IC(S,1262,y+18,24,ICON.arrow,C.ink,1.8);});
// 6 FAQ L6
S=SEC(D,'Quick answers · FAQ layout 6',3496,640,C.black);
DIV(S,W/2,70,true,'Quick answers');HD(S,120,128,'Before you call.','Three quick answers.',true,{it:'quick',a:'CENTER',w:1200,z:52});
const fq=[['Do you charge to come out and look?','No. Estimates are free, and Mike tells you the price before any work starts.'],['How do I pay?','Cash, Zelle or Cash App. New customers get 15% off the first job.'],['Can I just text a photo?','Yes. Text it to (951) 809-9533. Mike looks at it before he calls you back.']];
fq.forEach(([q,a],i)=>{const x=120+i*408;const g=F(S,'FAQ card '+(i+1),x,300,384,260,null,false);V(g,0,0,384,260,cutPath(384,260,26),[solid(C.char)],null,0,'card shape');
 T(g,'Q'+(i+1),32,30,{f:'SC',z:13,c:C.tan,ls:18});T(g,q,32,56,{f:'PB',z:24,c:C.cream,lh:120,w:320});R(g,32,146,40,2,C.tan,1,'rule short');T(g,a,32,164,{f:'J',z:16,c:C.muted,lh:150,w:320});});
// 7 PHONE TICKER BAND
S=SEC(D,'Phone band · number ticker',4136,420,C.cream);
e=EB(S,0,60,'Call Mike',false);center(e,W/2);
const chars='(951) 809-9533'.split('');let tw=0;const wd=c=>/\d/.test(c)?84:(c===' '?18:34);chars.forEach(c=>tw+=wd(c));let x=Math.round(W/2-tw/2);
for(const c of chars){if(/\d/.test(c)){const t=F(S,'ticker digit '+c,x,104,76,116,null,true);V(t,0,0,76,116,cutPath(76,116,12),[solid(C.black)],null,0,'tile');
  const n=+c;T(t,String((n+9)%10),0,-62,{f:'PD',z:64,c:C.cream,o:0.22,a:'CENTER',w:76});T(t,c,0,18,{f:'PD',z:64,c:C.cream,a:'CENTER',w:76});T(t,String((n+1)%10),0,98,{f:'PD',z:64,c:C.cream,o:0.22,a:'CENTER',w:76});}
 else if(c!==' ')T(S,c,x,118,{f:'PD',z:64,c:C.ink,a:'CENTER',w:34});x+=wd(c);}
T(S,'Mike picks up. Free estimate on every job.',120,250,{f:'J',z:18,c:C.brown,a:'CENTER',w:1200});
let cb=BTN(S,0,300,'Call Mike now',null,'black',{w:300,h:56});cb.x=W/2-150;
const end=await L.FIN(D,4556,false,false);
return {D:D.id,sec:sec.id,end};
