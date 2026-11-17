const page=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(page);
const D=await figma.getNodeByIdAsync('495:437');const g=async id=>await figma.getNodeByIdAsync(id);
for(const id of ['538:453','538:502','495:485','495:572','538:521','538:522','538:533']){const n=await g(id);if(n)n.remove();}
// ---- C1: while you were out ----
const C1=F(D,'04 While you were out: neighbors on calling Mike (Yelp, word for word)',0,784,1440,800,C.cream);
EYE(C1,'Neighbors on calling Mike',80,104);
TR(C1,[['“Mike actually\n',{c:C.ink}],['called me.”',{s:'Black Italic',c:C.tanD}]],80,150,{f:'Playfair Display',s:'Black',z:64,lh:100,w:640,n:'H2'});
T(C1,'Three messages from Mike’s Yelp page about what happened when they called. Word for word.',820,180,{z:18,c:C.muteD,w:520,lh:155});
let mh=0;NOTES.forEach((n,i)=>{const p=PAD(C1,80+i*440,330,380,n);p.rotation=[-1.5,1,-0.8][i];mh=Math.max(mh,p.height);});
C1.resize(1440,330+mh+110);
// ---- C2: brass plate + carbon copy form ----
const C2=F(D,'05 Call or write: brass phone plate + carbon-copy service request',0,0,1440,1300,C.ink);
EYE(C2,'Call or leave it in writing',80,110,{c:C.tan});
TR(C2,[['Call Mike direct.\n',{c:C.cream}],['Or write it down.',{s:'Black Italic',c:C.tan}]],80,156,{f:'Playfair Display',s:'Black',z:56,lh:104,w:600,n:'H2'});
PLATE(C2,80,330,580,230);
const rows=[['Email','mikesplumbingco25@gmail.com'],['Hours','Mike to confirm'],['Area','Riverside · IE · OC · LA'],['Pay','Cash · Zelle · Cash App (listed on Yelp)'],['Sign language','ASL (listed on Yelp)']];
let ly=610;for(const r of rows){const l=LEADER(C2,80,ly,580,r[0],r[1],{c:C.cream,rc:C.tan,z:22,rz:15,dc:C.tanD});ly+=l.height+20;}
const fs=FORMSHEETS(C2,760,120,600);
C2.resize(1440,Math.max(120+fs.h,ly)+110);
// ---- C3: restyle map section ----
const S3=await g('495:606');for(const n of [...S3.children])if(n.name.startsWith('chip:'))n.remove();
const reg=[['Riverside','home base (Yelp)'],['Inland Empire','IG + Nextdoor'],['Orange County','IG + Nextdoor'],['Los Angeles','IG + Nextdoor'],['Your street','Mike to confirm']];
let ry=300;for(const r of reg){const l=LEADER(S3,900,ry,460,r[0],r[1],{c:C.ink,rc:C.tanD,z:20,rz:13,dc:C.tanD});l.name='region ledger row: '+r[0];ry+=l.height+12;}
const ad=await g('495:646');ad.y=ry+14;S3.resize(1440,Math.max(ad.y+ad.height+96,692));
// ---- restack ----
const order=['495:438','495:448','495:464',C1.id,C2.id,'495:606','495:649'];let y=0;for(const id of order){const n=await g(id);n.y=y;y+=n.height;}
const ft=(await g('556:2551')).clone();D.appendChild(ft);ft.x=0;ft.y=y;y+=ft.height;D.resize(1440,y);
FIXLINES(C1);FIXLINES(C2);FIXLINES(S3);
return {C1:C1.id,C2:C2.id,ft:ft.id,h:y};
