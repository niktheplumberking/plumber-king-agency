// FAQ page content: real facts only (Yelp, IG, Nextdoor, flyer). No licence claim.
const FAQ=[
 ['Price & paying',[
  ['Do you charge for an estimate?','No. Estimates are free. Mike looks at the problem and tells you the price before any work starts.'],
  ['When do I find out the price?','Before anything starts. You hear the full price first, then you decide.'],
  ['Is there a discount for new customers?','Yes. New customers get 15% off the first job.'],
  ['How do I pay?','Cash, Zelle or Cash App.']]],
 ['Booking & hours',[
  ['How fast can Mike come out?','It depends on the day. Call and Mike will tell you when he can be there. Several Yelp reviews say he came the same day.'],
  ['What are your hours?','Mike answers from 7 AM to 11 PM, 7 days a week.'],
  ['Can I text a photo first?','Yes. Text it to (951) 809-9533. Mike looks at it before he calls you back.'],
  ['Who picks up the phone?','Mike does. There is no call center.']]],
 ['Areas',[
  ['Where do you work?','Mike is based in Riverside and works across the Inland Empire, Orange County and Los Angeles.'],
  ['Is there a trip fee?','Ask when you call. Mike tells you the full price before any work starts.']]],
 ['Jobs we do',[
  ['What jobs do you take?','Drain cleaning and hydro jetting, camera inspections, leaks and water lines, water heaters, sewer lines, toilets, sinks and faucets, and emergencies.'],
  ['Do you work for restaurants and businesses?','Yes. Mike does commercial work too, like grease interceptors and restaurant sinks.'],
  ['Do you take emergency calls?','Yes. If water is where it shouldn’t be, shut the main off and call Mike.']]],
 ['About Mike',[
  ['Who comes to my house?','Mike, the owner. It is a family-owned business, started in 2025.'],
  ['Are you insured?','Yes, Mike’s Plumbing Services is insured.']]]];
const pg=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(pg);
figma.root.setSharedPluginData('pkmike','faq',JSON.stringify(FAQ));
const AF=Object.getPrototypeOf(async function(){}).constructor;const L=await new AF(figma.root.getSharedPluginData('pkmike','badge'))();
const {C,T,TR,V,HEX,EB,HD,BTN,IC,ICON,NOTE,SEC,F,R,hexPath,cutPath,solid}=L;
const {sec,D}=await L.PAGE(9,'11 FAQ (desktop + mobile)');const W=1440;
let S=SEC(D,'Hero · questions',196,470,C.black);
HEX(S,1040,-90,520,300,96,null,C.line,1.5,'motif hex');
EB(S,120,90,'Questions',true);
TR(S,[['Questions,\n',{c:C.cream}],['straight ',{c:C.tan}],['answers.',{f:'PDI',c:C.tan}]],120,128,{f:'PD',z:68,lh:106,w:700,n:'H1: Questions, straight answers.'});
const total=FAQ.reduce((a,c)=>a+c[1].length,0);
T(S,total+' questions people ask Mike before they call. Can’t find yours? Ask him.',120,300,{f:'J',z:18,c:C.muted,w:520,lh:155});
const sb=F(S,'search field',840,190,480,60,null,false);V(sb,0,0,480,60,hexPath(480,60,18),[solid(C.char)],C.tan,1.2,'field shape');IC(sb,34,19,22,'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z M15.5 15.5 20 20',C.tan,1.8);T(sb,'Search: price, hours, water heater…',70,18,{f:'J',z:16,c:C.muted});
T(S,'or call (951) 809-9533',840,272,{f:'JM',z:15,c:C.tan});
// main
const ys=666;S=SEC(D,'All questions · FAQ layout 7',ys,10,C.paper);
const lc=F(S,'category list',120,100,300,10,null,false);T(lc,'TOPICS',0,0,{f:'SC',z:13,c:C.brown,ls:20});let ly=34;
FAQ.forEach(([cat,qs],i)=>{const act=i===0;if(act)V(lc,0,ly,300,52,hexPath(300,52,16),[solid(C.black)],null,0,'active shape');
 T(lc,cat,act?30:0,ly+13,{f:'PB',z:19,c:act?C.cream:C.ink});const n=T(lc,String(qs.length),0,ly+15,{f:'JM',z:14,c:act?C.tan:C.brown});n.x=act?262:290-n.width;ly+=62;});
ly+=24;const ask=F(lc,'card: ask Mike',0,ly,300,210,null,false);V(ask,0,0,300,210,cutPath(300,210,20),[solid(C.black)],null,0,'card shape');
T(ask,'Can’t find it?',24,26,{f:'PD',z:26,c:C.cream});T(ask,'Ask Mike. He answers his own phone.',24,66,{f:'J',z:15,c:C.muted,w:252,lh:150});BTN(ask,24,134,'Call Mike',null,'cream',{w:252,h:48,z:15});
lc.resize(300,ly+210);
const rc=F(S,'accordion',480,100,840,10,null,false);let ry=0;let qi=0;const open=new Set([0,4]);
FAQ.forEach(([cat,qs],ci)=>{if(ci>0)ry+=36;HEX(rc,0,ry+4,20,12,5,null,C.brown,1.3,'tick');T(rc,cat.toUpperCase(),32,ry,{f:'SC',z:13,c:C.brown,ls:20});ry+=40;
 qs.forEach(([q,a])=>{const isO=open.has(qi);
  if(isO){const g=F(rc,'Q open: '+q,0,ry,840,10,null,false);const qt=T(g,q,32,26,{f:'PB',z:23,c:C.cream,w:700});const at=T(g,a,32,qt.y+qt.height+12,{f:'J',z:17,c:C.muted,lh:155,w:700});const h=at.y+at.height+28;g.resize(840,h);g.insertChild(0,V(g,0,0,840,h,cutPath(840,h,20),[solid(C.black)],null,0,'card shape'));
   V(g,772,24,40,30,hexPath(40,30,9),[],C.tan,1.3,'icon shape');IC(g,782,29,20,ICON.minus,C.tan,1.8);ry+=h+10;}
  else{const g=F(rc,'Q: '+q,0,ry,840,72,null,false);R(g,0,71,840,1,C.ink,0.15,'row rule');T(g,q,32,22,{f:'PB',z:21,c:C.ink,w:700});V(g,772,20,40,30,hexPath(40,30,9),[],C.ink,1.2,'icon shape');IC(g,782,25,20,ICON.plus,C.ink,1.8);ry+=72+4;}
  qi++;});});
rc.resize(840,ry);const end0=100+Math.max(ry,lc.height)+110;S.resize(W,end0);
NOTE(sec,1580,100+ys+100,'Check every answer. Especially: hours (7 AM–11 PM?), "Mike answers his own phone", trip fee, insured. No licence question until Mike sends a CSLB number.');
const end=await L.FIN(D,ys+end0,true,false);return {D:D.id,sec:sec.id,end};
