const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const M=await figma.getNodeByIdAsync('495:724');const g=async id=>await figma.getNodeByIdAsync(id);
for(const id of ['539:497','539:540','539:559','539:560','539:567','495:755','495:797','495:843']){const n=await g(id);if(n)n.remove();}
// ---- MC1: while you were out ----
const C1=F(M,'M1 While you were out: neighbors on calling Mike (Yelp, word for word)',0,0,390,2000,C.cream);
EYE(C1,'Neighbors on calling Mike',20,56);
const h1=TR(C1,[['“Mike actually\n',{c:C.ink}],['called me.”',{s:'Black Italic',c:C.tanD}]],20,96,{f:'Playfair Display',s:'Black',z:40,lh:104,w:350,n:'H2'});
const i1=T(C1,'Three messages from Mike’s Yelp page about what happened when they called. Word for word.',20,h1.y+h1.height+16,{z:16,c:C.muteD,w:350,lh:150});
let py=i1.y+i1.height+40;NOTES.forEach((n,i)=>{const p=PAD(C1,20,py,350,n,{z:15});p.rotation=[-1,0.8,-0.6][i];py+=p.height+36;});
C1.resize(390,py+30);
// ---- MC2: plate + carbon form ----
const C2=F(M,'M2 Call or write: brass phone plate + carbon-copy service request',0,0,390,2400,C.ink);
EYE(C2,'Call or leave it in writing',20,56,{c:C.tan});
const h2=TR(C2,[['Call Mike direct.\n',{c:C.cream}],['Or write it down.',{s:'Black Italic',c:C.tan}]],20,96,{f:'Playfair Display',s:'Black',z:36,lh:106,w:350,n:'H2'});
const pl=PLATE(C2,20,h2.y+h2.height+30,350,170,{s:0.62});
let ly=pl.y+pl.height+36;const rows=[['Email','mikesplumbingco25@gmail.com'],['Hours','Mike to confirm'],['Area','Riverside · IE · OC · LA'],['Pay','Cash · Zelle · Cash App (Yelp)'],['Sign language','ASL (Yelp)']];
for(const r of rows){const l=LEADER(C2,20,ly,350,r[0],r[1],{c:C.cream,rc:C.tan,z:18,rz:13,dc:C.tanD});ly+=l.height+16;}
const fs=FORMSHEETS(C2,20,ly+50,336,{cols:1,hz:26,pad:22,tabw:140,rot:-1.5});
const tab=fs.back.children.find(n=>n.name.startsWith('tab:'));tab.y=fs.back.height;tab.topLeftRadius=0;tab.topRightRadius=0;tab.bottomLeftRadius=6;tab.bottomRightRadius=6;tab.x=fs.back.width-tab.width-30;tab.children[0].y=8;
C2.resize(390,fs.front.y+fs.front.height+110);
// ---- map: region ledger ----
const S3=await g('495:877');const ad=await g('495:887');let ry=518;
for(const r of [['Riverside','home base (Yelp)'],['Inland Empire','IG + Nextdoor'],['Orange County','IG + Nextdoor'],['Los Angeles','IG + Nextdoor'],['Your street','Mike to confirm']]){const l=LEADER(S3,20,ry,350,r[0],r[1],{c:C.ink,rc:C.tanD,z:18,rz:12,dc:C.tanD});l.name='region ledger row: '+r[0];ry+=l.height+10;}
ad.y=ry+16;S3.resize(390,ad.y+ad.height+48);
FIXLINES(C1);FIXLINES(C2);FIXLINES(S3);
// ---- restack ----
const order=['495:725','495:735',C1.id,C2.id,'495:877','495:890'];let y=0;for(const id of order){const n=await g(id);n.y=y;y+=n.height;}
const ft=(await g('557:1020')).clone();M.appendChild(ft);ft.x=0;ft.y=y;y+=ft.height;
const sb=await g('539:597');M.appendChild(sb);sb.y=y;y+=sb.height;M.resize(390,y);
return {C1:C1.id,C2:C2.id,ft:ft.id,h:y};
