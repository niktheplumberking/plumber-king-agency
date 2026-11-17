const pg=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(pg);
const AF=Object.getPrototypeOf(async function(){}).constructor;const L=await new AF(figma.root.getSharedPluginData('pkmike','badge'))();
const {C,T,TR,V,HEX,EB,HD,BTN,DIV,IC,ICON,SEC,R,F,CHIP,hexPath,cutPath,solid,img}=L;
const sec=await figma.getNodeByIdAsync('618:1150');
let {M,y}=await L.MPAGE(sec,'Contact');const W=390,G=20,CW=350;
function center(e,cx){const dx=cx-(e.hx.x+e.w/2);e.hx.x+=dx;e.t.x+=dx;}
function FLD(p,x,y,w,label,ph){T(p,label,x,y,{f:'JM',z:14,c:C.ink});const r=R(p,x,y+24,w,48,'#FFFDF6',1,'input: '+label);r.strokes=[solid(C.ink,0.35)];r.strokeWeight=1.2;T(p,ph,x+14,y+38,{f:'J',z:15,c:C.muted});return y+24+48+14;}
// 1 hero
let S=SEC(M,'Hero',y,10,C.black);HEX(S,250,-60,260,150,48,null,C.line,1.4,'motif hex');
let e=EB(S,0,48,'Contact Mike’s Plumbing',true,{z:12});center(e,W/2);
let t=TR(S,[['A real person\n',{c:C.cream}],['picks up.',{f:'PDI',c:C.tan}]],G,84,{f:'PD',z:40,a:'CENTER',w:CW,lh:108,n:'H1: A real person picks up.'});
let yy=t.y+t.height+18;t=T(S,'(951) 809-9533',G,yy,{f:'PD',z:52,c:C.cream,a:'CENTER',w:CW,n:'phone huge'});yy+=t.height+12;
t=T(S,'Mike answers his own phone. Free estimates. Cash, Zelle or Cash App.',G+10,yy,{f:'J',z:16,c:C.muted,a:'CENTER',w:CW-20,lh:150});yy+=t.height+24;
BTN(S,G,yy,'Call Mike','(951) 809-9533','cream',{w:CW});yy+=76;BTN(S,G,yy,'Text a photo','Same number','ghostD',{w:CW});yy+=64+22;
let cl=IC(S,0,yy+1,16,ICON.clock,C.tan,1.8);let ht=T(S,'Answering 7 AM – 11 PM, 7 days',0,yy,{f:'JM',z:14,c:C.tan});cl.x=W/2-(24+ht.width)/2;ht.x=cl.x+24;yy+=50;
S.resize(W,yy);y+=yy;
// 2 ranked cards
S=SEC(M,'Ways to reach Mike · fastest first',y,10,C.paper);DIV(S,W/2,48,false,'Fastest first',{arm:80});
t=HD(S,G,96,'Three ways in.','Pick the fastest.',false,{it:'fastest',a:'CENTER',w:CW,z:34});yy=t.y+t.height+28;
const cards=[{dark:true,fill:C.black,rk:'01',tag:'Fastest',ic:'phone',t:'Call Mike',b:'He answers his own phone. Tell him what’s going on and get a straight answer.',a:'(951) 809-9533'},
 {dark:false,fill:'#FFFDF6',rk:'02',tag:'With a photo',ic:'camera',t:'Text a photo',b:'Snap the leak, the clog or the heater label. Mike sees it before he calls back.',a:'Text (951) 809-9533'},
 {dark:false,fill:'#FFFDF6',rk:'03',tag:'Can’t talk now',ic:'mail',t:'Send the form',b:'Leave your name and number. Mike calls you back.',a:'Fill the form below'}];
for(const c of cards){const h=c.dark?236:214;const g=F(S,'card '+c.rk+': '+c.t,G,yy,CW,h,null,false);V(g,0,0,CW,h,cutPath(CW,h,24),[solid(c.fill)],c.dark?null:C.ink,1.2,'card shape');
 const tc=c.dark?C.cream:C.ink,sc=c.dark?C.tan:C.brown,bc=c.dark?C.muted:C.brown;
 HEX(g,24,24,60,34,11,c.dark?C.cream:C.ink,null,0,'rank badge');T(g,c.rk,24,29,{f:'PD',z:19,c:c.dark?C.black:C.cream,a:'CENTER',w:60});
 T(g,c.tag,98,33,{f:'SC',z:12,c:sc,ls:16});IC(g,CW-48,28,22,ICON[c.ic],sc,1.7);
 let tt=T(g,c.t,24,76,{f:'PD',z:c.dark?32:28,c:tc});let bb=T(g,c.b,24,tt.y+tt.height+6,{f:'J',z:15,c:bc,lh:150,w:CW-48});
 T(g,c.a,24,h-46,{f:'JS',z:16,c:tc});IC(g,CW-46,h-46,20,ICON.arrow,tc,1.8);yy+=h+14;}
t=T(S,'Prefer email? mikesplumbingco25@gmail.com',G,yy+6,{f:'J',z:14,c:C.brown,a:'CENTER',w:CW});yy=t.y+t.height+44;S.resize(W,yy);y+=yy;
// 3 form + next
S=SEC(M,'Form + what happens next',y,10,C.char);
const fc=F(S,'form card',G,40,CW,10,null,false);
EB(fc,24,28,'Send it to Mike',false,{z:12});t=HD(fc,24,58,'Tell Mike','what’s going on.',false,{it:'what’s',z:30});
let fy=t.y+t.height+22;const iw=CW-48;
fy=FLD(fc,24,fy,iw,'Your name','First and last name');fy=FLD(fc,24,fy,iw,'Phone','So Mike can call you back');fy=FLD(fc,24,fy,iw,'Town','Riverside, Corona, Menifee…');
T(fc,'What’s it about?',24,fy,{f:'JM',z:14,c:C.ink});let cx=24,cy=fy+26;
for(const [i,l] of ['Drain','Leak','Water heater','Toilet','Sewer','Other'].entries()){const ch=CHIP(fc,0,0,l,false,i===0,{z:13,h:32,pad:28});if(cx+ch.w>CW-24){cx=24;cy+=40;}ch.v.x=cx;ch.v.y=cy;ch.t.x=cx+Math.round((ch.w-ch.t.width)/2);ch.t.y=cy+Math.round((32-ch.t.height)/2);cx+=ch.w+8;}
fy=cy+32+18;T(fc,'A few words',24,fy,{f:'JM',z:14,c:C.ink});const ta=R(fc,24,fy+24,iw,90,'#FFFDF6',1,'textarea');ta.strokes=[solid(C.ink,0.35)];ta.strokeWeight=1.2;T(fc,'Where is it, how long has it been going on?',38,fy+38,{f:'J',z:15,c:C.muted,w:iw-28});fy+=24+90+16;
const ph=V(fc,24,fy,iw,48,hexPath(iw,48,14),[],C.brown,1.2,'photo drop');ph.dashPattern=[6,5];IC(fc,80,fy+13,22,ICON.camera,C.brown,1.7);T(fc,'Add a photo (optional)',112,fy+13,{f:'JM',z:15,c:C.brown});fy+=48+14;
BTN(fc,24,fy,'Send it to Mike',null,'black',{w:iw,h:54,z:16});fy+=54+28;fc.resize(CW,fy);const fs=V(fc,0,0,CW,fy,cutPath(CW,fy,24),[solid(C.paper)],null,0,'card shape');fc.insertChild(0,fs);
yy=40+fy+56;EB(S,G,yy,'What happens next',true,{z:12});t=HD(S,G,yy+32,'No call center.','Just Mike.',true,{it:'Mike.',z:34});yy=t.y+t.height+34;
const steps=[['Mike reads it himself','Your message goes straight to Mike. No call center, no sales team.'],['He calls you back','He asks what’s going on so he shows up with a plan.'],['Price before any work','You hear the full price before anything starts. Estimates are free.']];
V(S,G+26,yy+20,2,2*128,'M 1 0 L 1 '+(2*128),[],C.tan,1.5,'process line (through numbers)');
steps.forEach(([a,b],i)=>{const sy=yy+i*128;HEX(S,G,sy,54,40,12,C.char,C.tan,1.5,'step hex');T(S,String(i+1),G,sy+6,{f:'PD',z:21,c:C.cream,a:'CENTER',w:54});
 T(S,a,G+74,sy+4,{f:'PB',z:21,c:C.cream});T(S,b,G+74,sy+36,{f:'J',z:15,c:C.muted,lh:150,w:CW-74});});
yy+=2*128+110;S.resize(W,yy);y+=yy;
// 4 map + NAP
S=SEC(M,'Service area map + NAP card',y,10,C.black);const mp=R(S,0,0,W,300,null);mp.fills=[img('map')];mp.name='photo: area map (Google Maps screenshot)';R(S,0,0,W,300,C.black,0.25,'map dim');
const nc=F(S,'NAP card',G,236,CW,10,null,false);EB(nc,24,28,'Where Mike works',true,{z:12});t=T(nc,'Mike’s Plumbing Services',24,58,{f:'PD',z:26,c:C.cream,w:CW-48});
let ny=t.y+t.height+22;for(const [ic,s] of [['pin','Based in Riverside, CA'],['home','Serving the IE, OC & LA'],['phone','(951) 809-9533'],['mail','mikesplumbingco25@gmail.com'],['clock','7 AM – 11 PM, 7 days'],['dollar','Cash, Zelle or Cash App']]){IC(nc,24,ny,18,ICON[ic],C.tan,1.7);T(nc,s,54,ny-1,{f:'J',z:15,c:C.cream});ny+=34;}
ny+=12;BTN(nc,24,ny,'Call Mike',null,'cream',{w:CW-48,h:52});ny+=52+28;nc.resize(CW,ny);nc.insertChild(0,V(nc,0,0,CW,ny,cutPath(CW,ny,24),[solid(C.black)],C.tan,1.2,'card shape'));
yy=236+ny+56;S.resize(W,yy);y+=yy;
// 5 link list
S=SEC(M,'Here for something else · link list',y,10,C.paper);EB(S,G,48,'Other things',false,{z:12});t=HD(S,G,80,'Here for','something else?',false,{it:'else?',z:34});yy=t.y+t.height+26;
for(const l of ['See all services','Read all 20 Yelp reviews','See the work','Towns Mike covers','Common questions']){V(S,G,yy,CW,54,hexPath(CW,54,16),[solid('#FFFDF6')],C.ink,1,'link row');HEX(S,G+30,yy+21,18,11,4,null,C.brown,1.3,'tick');T(S,l,G+60,yy+14,{f:'PB',z:19,c:C.ink});IC(S,G+CW-50,yy+16,22,ICON.arrow,C.ink,1.8);yy+=66;}
yy+=40;S.resize(W,yy);y+=yy;
// 6 FAQ L6
S=SEC(M,'Quick answers · FAQ layout 6',y,10,C.black);DIV(S,W/2,48,true,'Quick answers',{arm:80});t=HD(S,G,96,'Before you call.','Three quick answers.',true,{it:'quick',a:'CENTER',w:CW,z:32});yy=t.y+t.height+30;
for(const [i,[q,a]] of [['Do you charge to come out and look?','No. Estimates are free, and Mike tells you the price before any work starts.'],['How do I pay?','Cash, Zelle or Cash App. New customers get 15% off the first job.'],['Can I just text a photo?','Yes. Text it to (951) 809-9533. Mike looks at it before he calls you back.']].entries()){
 const g=F(S,'FAQ card '+(i+1),G,yy,CW,10,null,false);T(g,'Q'+(i+1),24,24,{f:'SC',z:12,c:C.tan,ls:18});const qq=T(g,q,24,46,{f:'PB',z:21,c:C.cream,lh:120,w:CW-48});R(g,24,qq.y+qq.height+14,36,2,C.tan,1,'rule short');const aa=T(g,a,24,qq.y+qq.height+30,{f:'J',z:15,c:C.muted,lh:150,w:CW-48});
 const h=aa.y+aa.height+26;g.resize(CW,h);g.insertChild(0,V(g,0,0,CW,h,cutPath(CW,h,20),[solid(C.char)],null,0,'card shape'));yy+=h+14;}
yy+=40;S.resize(W,yy);y+=yy;
// 7 ticker
S=SEC(M,'Phone band · number ticker',y,10,C.cream);e=EB(S,0,44,'Call Mike',false,{z:12});center(e,W/2);
function line(str,ty){const wd=c=>/\d/.test(c)?42:(c===' '?8:20);let tw=0;for(const c of str)tw+=wd(c);let x=Math.round(W/2-tw/2);
 for(const c of str){if(/\d/.test(c)){const tl=F(S,'ticker digit '+c,x,ty,38,56,null,true);const mk=V(tl,0,0,38,56,cutPath(38,56,7),[solid(C.black)],null,0,'mask');mk.isMask=true;
  R(tl,0,0,38,56,C.black,1,'tile');R(tl,0,0,38,28,C.char,1,'top flap');T(tl,c,0,6,{f:'PD',z:34,c:C.cream,a:'CENTER',w:38});R(tl,0,27,38,1.5,C.cream,0.55,'flap split');}
 else if(c!==' ')T(S,c,x,ty+6,{f:'PD',z:34,c:C.ink,a:'CENTER',w:20});x+=wd(c);}}
line('(951)',84);line('809-9533',150);
t=T(S,'Mike picks up. Free estimate on every job.',G,226,{f:'J',z:16,c:C.brown,a:'CENTER',w:CW});BTN(S,G,t.y+t.height+20,'Call Mike now',null,'black',{w:CW,h:56});yy=t.y+t.height+20+56+48;S.resize(W,yy);y+=yy;
const end=await L.FIN(M,y,false,true);
return {M:M.id,end};
