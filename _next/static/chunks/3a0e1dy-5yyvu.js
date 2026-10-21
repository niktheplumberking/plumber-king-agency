(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,96439,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(56420);let s={name:"plus",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]};s.node;let i=(0,r.f)(s);e.s(["FaqList",0,function({items:e,level:r=3}){let s=2===r?"h2":"h3",[n,o]=(0,a.useState)(0),l=(0,a.useId)();return(0,t.jsx)("div",{className:"space-y-3",children:e.map((e,a)=>{let r=n===a;return(0,t.jsxs)("div",{className:`fq ${r?"open":""}`,children:[(0,t.jsx)(s,{className:"m-0",children:(0,t.jsxs)("button",{type:"button",id:`${l}-q${a}`,"aria-expanded":r,"aria-controls":`${l}-a${a}`,onClick:()=>o(r?null:a),className:"fq-btn",children:[(0,t.jsx)("span",{"aria-hidden":!0,className:"fq-n",children:String(a+1).padStart(2,"0")}),(0,t.jsx)("span",{className:"flex-1",children:e.q}),(0,t.jsx)("span",{className:"fq-ic",children:(0,t.jsx)(i,{className:"h-5 w-5","aria-hidden":!0})})]})}),(0,t.jsx)("div",{id:`${l}-a${a}`,role:"region","aria-labelledby":`${l}-q${a}`,hidden:!r,className:"enter-fade",children:(0,t.jsx)("p",{className:"fq-a",children:e.a})})]},e.q)})})}],96439)},32276,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(68877),s=e.i(56420);let i={name:"loader-circle",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],aliases:["loader-2"]};i.node;let n=(0,s.f)(i);var o=e.i(89042);let l=[{v:"US",label:"United States +1",code:"+1"},{v:"CA",label:"Canada +1",code:"+1"}];function d({c:e}){return"CA"===e?(0,t.jsxs)("svg",{viewBox:"0 0 30 20",className:"lf-flag","aria-hidden":!0,children:[(0,t.jsx)("rect",{width:"30",height:"20",fill:"#fff"}),(0,t.jsx)("rect",{width:"7.5",height:"20",fill:"#d52b1e"}),(0,t.jsx)("rect",{x:"22.5",width:"7.5",height:"20",fill:"#d52b1e"}),(0,t.jsx)("path",{fill:"#d52b1e",d:"M15 4.2l1 1.9 1.3-.5-.4 3 1.6-1.5.4 1.1 1.7-.3-.6 1.8.8.4-2.9 2.3.3 1.1-2.8-.4.1 2.7h-1l.1-2.7-2.8.4.3-1.1-2.9-2.3.8-.4-.6-1.8 1.7.3.4-1.1 1.6 1.5-.4-3 1.3.5z"})]}):(0,t.jsxs)("svg",{viewBox:"0 0 30 20",className:"lf-flag","aria-hidden":!0,children:[(0,t.jsx)("rect",{width:"30",height:"20",fill:"#fff"}),[0,2,4,6,8,10,12].map(e=>(0,t.jsx)("rect",{y:20*e/13,width:"30",height:20/13,fill:"#b22234"},e)),(0,t.jsx)("rect",{width:"13",height:140/13,fill:"#3c3b6e"}),[0,1,2,3].map(e=>[0,1,2,3,4].map(a=>(0,t.jsx)("circle",{cx:1.6+2.45*a,cy:1.5+2.6*e,r:"0.55",fill:"#fff"},`${e}-${a}`)))]})}e.s(["LeadForm",0,function({kind:e="strategy-call",tone:s="dark"}){let i=(0,a.useId)(),[c,f]=(0,a.useState)("idle"),[h,p]=(0,a.useState)({}),[g,m]=(0,a.useState)(1),[u,x]=(0,a.useState)("US"),b="dark"===s,y=`mt-2 block min-h-12 w-full rounded-md border-2 px-4 py-3 text-t3 outline-none transition-colors focus:border-ribbon ${b?"aria-[invalid=true]:border-white border-white/30 bg-white/10 text-white placeholder:text-white/75":"aria-[invalid=true]:border-ribbon-deep border-ink/20 bg-white text-ink placeholder:text-slate/70"}`,v=`mt-2 text-t3 font-semibold ${b?"text-white":"text-ribbon-deep"}`,w=`text-t3 font-extrabold tracking-wider uppercase ${b?"text-white/90":"text-ink"}`;async function j(t){let a,r;t.preventDefault();let s=t.currentTarget,i=new FormData(s);if(i.get("company_website_hp"))return;let n=(r={},(a=e=>String(i.get(e)??"").trim())("name")||(r.name="Please enter your name."),a("business")||(r.business="Please enter your business name."),a("email")?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a("email"))||(r.email="That email looks incomplete. Check it has an @ and a domain, like mike@johnsonplumbing.com."):r.email="Please enter your email so Nick can reply.",a("phone").replace(/\D/g,"").length<7&&(r.phone=a("phone")?"That phone number looks too short. Include the area code.":"Please enter a phone number."),"website-audit"!==e||a("website")||(r.website="Please enter your website address so Nick can audit it."),r),d=1===g?Object.fromEntries(Object.entries(n).filter(([e])=>"name"===e||"phone"===e)):n;p(d);let c=Object.keys(d)[0],h=e=>setTimeout(()=>s.elements.namedItem(e)?.focus(),0);if(c){("name"===c||"phone"===c)&&m(1),h(c);return}if(1===g){m(2),h("business");return}let u=Object.fromEntries(i.entries());delete u.company_website_hp;let x=l.find(e=>e.v===u.country)??l[0];u.phone=`${x.code} ${String(u.phone??"").trim()} (${x.v})`,delete u.country;let b={...u,kind:e,page:window.location.pathname,submittedAt:new Date().toISOString()};if(!o.B.formEndpoint){let t=Object.entries(b).map(([e,t])=>`${e}: ${t}`).join("\n");window.location.href=`mailto:${o.B.email}?subject=${encodeURIComponent("website-audit"===e?"Free website audit request":"Strategy call request")}&body=${encodeURIComponent(t)}`,f("sent");return}f("sending");try{let e=await fetch(o.B.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(b)}),t=await e.json().catch(()=>null);f(e.ok&&t?.ok?"sent":"error")}catch{f("error")}}return"sent"===c?(0,t.jsxs)("div",{role:"status",className:`rounded-md border-2 border-ink p-8 ${b?"bg-white/[0.06] text-white":"bg-ivory"}`,children:[(0,t.jsx)("img",{src:"/bobo/cheer.webp",alt:"Bobo the duck cheering",width:96,height:96,className:"h-24 w-24"}),(0,t.jsx)("p",{className:"mt-4 font-display text-t2 font-bold",children:"Got it. Nick will be in touch."}),(0,t.jsx)("p",{className:`mt-2 ${b?"text-white/90":"text-slate"}`,children:"Nick reads and replies to every request personally."})]}):(0,t.jsxs)("form",{onSubmit:j,className:`grid gap-5 ${1===g?"lf-s1":"sm:grid-cols-2"}`,noValidate:!0,children:[(0,t.jsxs)("div",{className:"col-span-full flex items-center gap-3","aria-live":"polite",children:[(0,t.jsxs)("span",{className:`text-t3 font-bold ${b?"text-white":"text-ink"}`,children:["Step ",g," of 2"]}),(0,t.jsx)("span",{"aria-hidden":!0,className:"lf-bar",children:(0,t.jsx)("span",{style:{transform:`scaleX(${g/2})`}})})]}),(0,t.jsxs)("div",{hidden:1!==g,className:"contents",children:[(0,t.jsxs)("div",{className:"lf-name min-w-0",children:[(0,t.jsx)("label",{htmlFor:`${i}-name`,className:w,children:"Your name"}),(0,t.jsx)("input",{id:`${i}-name`,name:"name",required:!0,autoComplete:"name",size:8,className:`${y} min-w-0`,"aria-invalid":!!h.name||void 0,"aria-describedby":h.name?`${i}-name-err`:void 0,placeholder:"Mike Johnson"}),h.name&&(0,t.jsx)("p",{id:`${i}-name-err`,className:v,children:h.name})]}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("label",{htmlFor:`${i}-cc`,className:w,children:"Country"}),(0,t.jsxs)("div",{className:`lf-cc mt-2 ${b?"lf-cc-dark":""}`,children:[(0,t.jsx)(d,{c:u}),(0,t.jsx)("select",{id:`${i}-cc`,name:"country",value:u,onChange:e=>x(e.target.value),autoComplete:"country",className:`lf-cc-sel ${b?"text-white":"text-ink"}`,"aria-label":"Country code",children:l.map(e=>(0,t.jsx)("option",{value:e.v,children:e.code},e.v))})]})]}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("label",{htmlFor:`${i}-phone`,className:w,children:"Phone"}),(0,t.jsx)("input",{id:`${i}-phone`,name:"phone",type:"tel",required:!0,autoComplete:"tel",className:y,"aria-invalid":!!h.phone||void 0,"aria-describedby":h.phone?`${i}-phone-err`:void 0,placeholder:"(555) 555-0123"}),h.phone&&(0,t.jsx)("p",{id:`${i}-phone-err`,className:v,children:h.phone})]})]}),(0,t.jsxs)("div",{hidden:2!==g,className:"contents",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:`${i}-co`,className:w,children:"Business name"}),(0,t.jsx)("input",{id:`${i}-co`,name:"business",required:!0,autoComplete:"organization",className:y,"aria-invalid":!!h.business||void 0,"aria-describedby":h.business?`${i}-business-err`:void 0,placeholder:"Johnson Plumbing"}),h.business&&(0,t.jsx)("p",{id:`${i}-business-err`,className:v,children:h.business})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:`${i}-email`,className:w,children:"Email"}),(0,t.jsx)("input",{id:`${i}-email`,name:"email",type:"email",required:!0,autoComplete:"email",className:y,"aria-invalid":!!h.email||void 0,"aria-describedby":h.email?`${i}-email-err`:void 0,placeholder:"mike@johnsonplumbing.com"}),h.email&&(0,t.jsx)("p",{id:`${i}-email-err`,className:v,children:h.email})]}),(0,t.jsxs)("div",{className:"sm:col-span-2",children:[(0,t.jsx)("label",{htmlFor:`${i}-site`,className:w,children:"website-audit"===e?"Your current website":"Current website (if you have one)"}),(0,t.jsx)("input",{id:`${i}-site`,name:"website",type:"text",inputMode:"url",required:"website-audit"===e,className:y,"aria-invalid":!!h.website||void 0,"aria-describedby":h.website?`${i}-website-err`:void 0,placeholder:"johnsonplumbing.com"}),h.website&&(0,t.jsx)("p",{id:`${i}-website-err`,className:v,children:h.website})]})]}),(0,t.jsxs)("div",{"aria-hidden":!0,className:"absolute -left-[9999px]",children:[(0,t.jsx)("label",{htmlFor:`${i}-hp`,children:"Leave empty"}),(0,t.jsx)("input",{id:`${i}-hp`,name:"company_website_hp",tabIndex:-1,autoComplete:"off"})]}),(0,t.jsxs)("div",{className:"col-span-full lf-foot",children:[(0,t.jsxs)("div",{className:"lf-btns flex flex-wrap items-center gap-3",children:[2===g&&(0,t.jsx)("button",{type:"button",onClick:()=>m(1),className:`min-h-11 px-3 font-bold underline underline-offset-4 ${b?"text-white":"text-ink"}`,children:"Back"}),(0,t.jsxs)("button",{type:"submit",disabled:"sending"===c,className:"btn btn-primary w-full sm:w-auto",children:["sending"===c?(0,t.jsx)(n,{className:"h-5 w-5 animate-spin","aria-hidden":!0}):null,1===g?"Next: your business":"website-audit"===e?o.B.secondaryCta:o.B.primaryCta,(0,t.jsx)(r.f,{className:"h-4.5 w-4.5","aria-hidden":!0})]})]}),"error"===c&&(0,t.jsxs)("p",{role:"alert",className:"mt-3 text-t3 font-semibold text-royal",children:["That didn't send. Please email ",(0,t.jsx)("a",{className:"underline",href:`mailto:${o.B.email}`,children:o.B.email})," and we'll get right back to you."]}),(0,t.jsxs)("p",{className:`mt-4 text-t3 ${b?"text-white/90":"text-slate"}`,children:["No commitment, no hard sell. By sending this you agree to our ",(0,t.jsx)("a",{href:"/privacy-policy/",className:"underline",children:"Privacy Policy"}),"."]})]})]})}],32276)},6764,e=>{var t=e.i(43476),a=e.i(71645);let r={aurora:{style:"streak",colors:["#f4efe9","#e9c2b8","#c2433f","#2a1e2a","#22395e","#6f97c2","#e5edf4"],scale:.7,warp:1.4,angle:-.62,gloss:.18,veins:0},ember:{style:"marble",colors:["#07090c","#16252c","#3d5f68","#1a1416","#a3201a","#ef4a2b","#ff8a5c"],scale:.62,warp:3.2,angle:-.5,gloss:.55,veins:.6},dusk:{style:"marble",colors:["#120c18","#3e2850","#8f6c9c","#2b1a24","#b3502f","#eab08a","#fbe7d2"],scale:.75,warp:3.6,angle:.8,gloss:.5,veins:.5},glacier:{style:"streak",colors:["#f7f8fa","#d9e2ea","#9fb4c7","#e8edf2","#bccbd8","#ffffff"],scale:.7,warp:1.6,angle:.35,gloss:.25,veins:0},verdant:{style:"marble",colors:["#070b08","#173024","#4f7a5a","#141812","#a7843a","#e9cf87","#fbf3d6"],scale:.7,warp:3.4,angle:2.1,gloss:.5,veins:.5}};function s(e){let t=e>>>0;return()=>{let e=t=t+0x6d2b79f5>>>0;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/0x100000000}}function i(e){let t=0x811c9dc5;for(let a=0;a<e.length;a++)t=Math.imul(t^e.charCodeAt(a),0x1000193);return t>>>0}let n=new Map,o=[],l=!1;function d({art:e,seed:i,w:c,h:f,density:h,priority:p,className:g}){let m=a.useRef(null),[u,x]=a.useState(!1),b=JSON.stringify("string"==typeof e?r[e]:e),y=Math.round(c*h),v=Math.round(f*h);return a.useEffect(()=>{var e;let t,a,r=!0;return x(!1),(e=JSON.parse(b),t=JSON.stringify([e,i,y,v]),!(a=n.get(t))&&(a=new Promise(t=>{let a,r,n,d,c,f,h,g,m,u,x,b,w,j,k,N,M,$,C,S,A,F,B,E,P,R,L=o.length;for(;L>1&&o[L-1].priority>p;)L--;o.splice(L,0,{job:(a=Math.max(1,Math.round(y)),r=Math.max(1,Math.round(v)),d=(n=e.colors.length>=2?e.colors:["#111111","#eeeeee"]).map((e,t)=>{let a,r;return{t:t/(n.length-1),c:(3===(a=e.trim().replace(/^#/,"")).length&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]),[(r=/^[0-9a-f]{6}$/i.test(a)?parseInt(a,16):8421504)>>16&255,r>>8&255,255&r])}}),c=e.scale??.7,f=e.warp??3,h=e.gloss??.4,g=e.veins??0,m="streak"===e.style,u=function(e){let t=s(e),a=new Uint8Array(512),r=new Float32Array(512),i=[];for(let e=0;e<256;e++)i.push(e);for(let e=255;e>0;e--){let a=Math.floor(t()*(e+1)),r=i[e];i[e]=i[a],i[a]=r}for(let e=0;e<512;e++)a[e]=i[255&e];for(let e=0;e<256;e++){let a=t()*Math.PI*2;r[2*e]=Math.cos(a),r[2*e+1]=Math.sin(a)}let n=(e,t)=>{let s=Math.floor(e),i=Math.floor(t),n=e-s,o=t-i,l=255&s,d=255&i,c=2*a[l+a[d]],f=2*a[l+1+a[d]],h=2*a[l+a[d+1]],p=2*a[l+1+a[d+1]],g=r[c]*n+r[c+1]*o,m=r[f]*(n-1)+r[f+1]*o,u=r[h]*n+r[h+1]*(o-1),x=r[p]*(n-1)+r[p+1]*(o-1),b=n*n*n*(n*(6*n-15)+10);return g+b*(m-g)+o*o*o*(o*(6*o-15)+10)*(u-g+b*(x-u-m+g))};return(e,t,a)=>{let r=0,s=.5;for(let i=0;i<a;i++){r+=s*n(e,t);let a=1.6*e+1.2*t+7.1;t=-1.2*e+1.6*t+3.3,e=a,s*=.5}return r}}(977*i+13),b=50*(x=s(i+1))(),w=50*x(),k=Math.cos(j=(e.angle??0)+(x()-.5)*.5),N=Math.sin(j),M=Math.min(a,r),S=new Float32Array(($=Math.ceil(a/2)+3)*(C=Math.ceil(r/2)+3)),A=new Float32Array($*C),F=new Float32Array(a*r),B=new Float32Array(a*r),E=new Uint8ClampedArray(a*r*4),P=0,R=e=>{for(let t=0;t<$;t++){let s=((t-1)*2-a/2)/M,i=((e-1)*2-r/2)/M,n=(s*k-i*N)*c,o=(s*N+i*k)*c;m&&(n*=.14,o*=2.2);let l=u(n+=b,o+=w,3),d=u(n+5.2,o+1.3,3),h=u(n+f*l+1.7,o+f*d+9.2,3),p=u(n+f*l+8.3,o+f*d+2.8,3);S[e*$+t]=u(n+f*h,o+f*p,4),A[e*$+t]=Math.sqrt(l*l+d*d)}},{width:a,height:r,pixels:E,step:e=>{if(P>=C)return!0;let t=Math.min(C,P+Math.max(1,e));for(;P<t;)R(P++);return!(P<C)&&((()=>{let e=(e,t,a,r)=>(-e+9*t+9*a-r)/16,t=new Float32Array(a*C);for(let r=0;r<C;r++){let s=r*$;for(let i=0;i<a;i++){let n=(i>>1)+1;t[r*a+i]=1&i?e(S[s+n-1],S[s+n],S[s+n+1],S[s+n+2]):S[s+n]}}for(let s=0;s<r;s++){let r=(s>>1)+1;for(let i=0;i<a;i++){F[s*a+i]=1&s?e(t[(r-1)*a+i],t[r*a+i],t[(r+1)*a+i],t[(r+2)*a+i]):t[r*a+i];let n=(i>>1)+1,o=A[r*$+n],l=1&i?(o+A[r*$+n+1])/2:o,d=1&s?1&i?(A[(r+1)*$+n]+A[(r+1)*$+n+1])/2:A[(r+1)*$+n]:l;B[s*a+i]=(l+d)/2}}})(),(()=>{let e=[],t=Math.max(1,Math.floor(F.length/4096));for(let a=0;a<F.length;a+=t)e.push(F[a]);e.sort((e,t)=>e-t);let s=e[Math.floor(.02*e.length)],i=1/(e[Math.floor(.98*e.length)]-s||1),n=i*M*.012;for(let e=0;e<r;e++)for(let t=0;t<a;t++){let o=e*a+t,l=(F[o]-s)*i;l=l<0?0:l>1?1:l;let c=1;for(;c<d.length-1&&d[c].t<l;)c++;let f=d[c-1],p=d[c],m=(l-f.t)/(p.t-f.t||1);m=(m=m<0?0:m>1?1:m)*m*(3-2*m);let u=(F[t<a-1?o+1:o]-F[t>0?o-1:o])*n,x=(F[e<r-1?o+a:o]-F[e>0?o-a:o])*n,b=(-(-.55*u)- -.65*x+.52)/Math.sqrt(u*u+x*x+1),y=Math.pow(b>0?b:0,24)*h*255,v=(.82+.28*b)*(1+.035*Math.sin(150*l+24*B[o]))*(1-g*Math.max(0,1-14*Math.abs(B[o]-.42))*.6);E[4*o]=(f.c[0]+(p.c[0]-f.c[0])*m)*v+y,E[4*o+1]=(f.c[1]+(p.c[1]-f.c[1])*m)*v+y,E[4*o+2]=(f.c[2]+(p.c[2]-f.c[2])*m)*v+y,E[4*o+3]=255}})(),!0)}}),priority:p,done:t}),function(){if(l)return;l=!0;let e=()=>{let t=performance.now()+7;for(;o.length&&performance.now()<t;){let e=o[0];if(e.job.step(4)){o.shift();let t=document.createElement("canvas");t.width=e.job.width,t.height=e.job.height,t.getContext("2d")?.putImageData(new ImageData(e.job.pixels,t.width,t.height),0,0),e.done(t)}}o.length?requestAnimationFrame(e):l=!1};requestAnimationFrame(e)}()}),n.set(t,a)),a).then(e=>{let t=m.current;r&&t&&(t.width=e.width,t.height=e.height,t.getContext("2d")?.drawImage(e,0,0),x(!0))}),()=>{r=!1}},[b,i,y,v,p]),(0,t.jsx)("canvas",{ref:m,"aria-hidden":"true",className:g,"data-ready":u||void 0,style:{width:c,height:f,maxWidth:"none"}})}let c="M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z",f="M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 176A22 22 0 0 1 318 198L22 198A22 22 0 0 1 0 176Z",h=[{name:"Cover — final",meta:"PNG · 4.8 MB",art:"ember"},{name:"Moodboard",meta:"24 images",art:"dusk"},{name:"Brief.pdf",meta:"PDF · 1.2 MB"}];function p({label:e="My Files",meta:r,tone:n="light",art:o="aurora",seed:l=3,image:m,files:u=h,action:x="add",onAdd:b,onFilesChange:y,menu:v=[],labelPlacement:w="bottom-left",open:j,defaultOpen:k=!1,onOpenChange:N,onFileSelect:M,width:$=340,appear:C=!0,appearDelay:S=0,className:A,style:F}){let B=a.useId().replace(/:/g,""),E=a.useRef(null),P=a.useRef(null),R=a.useRef(null),L=a.useRef(null),T=a.useRef(null),[z,q]=a.useState(u),I=a.useRef(u.map((e,t)=>t)),_=a.useRef(u.length),[O,D]=a.useState(null),[Y,H]=a.useState(0),[U,W]=a.useState(k),G=j??U,J=a.useCallback(e=>{void 0===j&&W(e),N?.(e)},[j,N]),[X,K]=a.useState(!1),[Q,V]=a.useState(!C),Z=$/340,ee=Math.min(1.5,Math.max(1,window.devicePixelRatio||1))*Z;a.useEffect(()=>{if(!C)return;let e=E.current;if(!e||"u"<typeof IntersectionObserver)return void V(!0);let t=0,a=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(a.disconnect(),t=window.setTimeout(()=>V(!0),S))},{threshold:.25});return a.observe(e),()=>{a.disconnect(),window.clearTimeout(t)}},[C,S]),a.useEffect(()=>{let e=E.current;if(!e)return;let t=0,a=0,r=0,s=()=>{t=0,e.style.setProperty("--gf-px",a.toFixed(3)),e.style.setProperty("--gf-py",r.toFixed(3))},i=i=>{if("touch"===i.pointerType)return;let n=e.getBoundingClientRect();a=(i.clientX-n.left)/n.width*2-1,r=(i.clientY-n.top)/n.height*2-1,t||(t=requestAnimationFrame(s))},n=()=>{a=0,r=0,t||(t=requestAnimationFrame(s))};return e.addEventListener("pointermove",i),e.addEventListener("pointerleave",n),()=>{e.removeEventListener("pointermove",i),e.removeEventListener("pointerleave",n),cancelAnimationFrame(t)}},[]),a.useEffect(()=>{P.current?.toggleAttribute("inert",!G)},[G]),a.useEffect(()=>{if(!G&&!X)return;let e=e=>{"Escape"===e.key&&(X?(K(!1),L.current?.focus()):(J(!1),R.current?.focus()))},t=e=>{let t=e.target;!X||T.current?.contains(t)||L.current?.contains(t)||K(!1),!G||X||E.current?.contains(t)||J(!1)};return document.addEventListener("keydown",e),document.addEventListener("pointerdown",t),()=>{document.removeEventListener("keydown",e),document.removeEventListener("pointerdown",t)}},[G,X,J]),a.useEffect(()=>{X&&T.current?.querySelector("[role=menuitem]")?.focus()},[X]);let et=[{label:G?"Close folder":"Open folder",onSelect:()=>J(!G)},...v],ea=Math.max(0,z.length-4),er=z.slice(ea),es=z.length,ei=r??es+(1===es?" item":" items");return(0,t.jsxs)("div",{ref:E,className:"gf-root"+(A?" "+A:""),"data-tone":n,"data-open":G||void 0,"data-entered":Q||void 0,"data-place":w,style:{width:$,height:326*Z,...F},children:[(0,t.jsx)("style",{children:g}),(0,t.jsx)("div",{className:"gf-stage",style:{transform:"translateY("+54*Z+"px) scale("+Z+")"},children:(0,t.jsxs)("div",{className:"gf-tilt",children:[(0,t.jsx)("div",{className:"gf-shadow","aria-hidden":"true"}),(0,t.jsxs)("div",{className:"gf-back",style:{clipPath:"path('"+c+"')"},"aria-hidden":"true",children:[m?(0,t.jsx)("img",{className:"gf-art",src:m,alt:"",width:364,height:296,draggable:!1}):"none"!==o?(0,t.jsx)(d,{className:"gf-art",art:o,seed:l,w:364,h:296,density:ee,priority:0}):null,(0,t.jsx)("div",{className:"gf-back-sheen"})]}),(0,t.jsx)("svg",{className:"gf-rim gf-back-rim",viewBox:"0 0 340 272","aria-hidden":"true",children:(0,t.jsx)("path",{d:c})}),(0,t.jsxs)("div",{className:"gf-front"+(Y?" gf-front--bump":""),style:{clipPath:"path('"+f+"')"},children:[(0,t.jsx)("div",{className:"gf-tint","aria-hidden":"true"}),(0,t.jsx)("div",{className:"gf-spec","aria-hidden":"true"}),(0,t.jsxs)("svg",{className:"gf-rim gf-front-rim",viewBox:"0 0 340 198","aria-hidden":"true",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:"gf-rim-"+B,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0",stopColor:"#fff",stopOpacity:"0.95"}),(0,t.jsx)("stop",{offset:"0.35",stopColor:"#fff",stopOpacity:"0.35"}),(0,t.jsx)("stop",{offset:"1",stopColor:"#fff",stopOpacity:"0.12"})]})}),(0,t.jsx)("path",{d:f,stroke:"url(#gf-rim-"+B+")"})]}),(0,t.jsx)("button",{ref:R,type:"button",className:"gf-hit","aria-expanded":G,"aria-label":(G?"Close ":"Open ")+e+", "+es+(1===es?" item":" items"),onClick:()=>{K(!1),J(!G)}}),(0,t.jsxs)("div",{className:"gf-label",children:[(0,t.jsx)("span",{className:"gf-title",children:e}),(0,t.jsx)("span",{className:"gf-meta",children:ei},ei)]})]},Y),(0,t.jsx)("div",{ref:P,className:"gf-files",role:"list","aria-label":e+" contents",children:er.map((e,a)=>{var r;let n=I.current[ea+a],o=(r=er.length)<=1?0:a/(r-1)*2-1,l=s(i(e.name)+n),c=!!(e.art||e.image),f=(0,t.jsxs)(t.Fragment,{children:[c?e.image?(0,t.jsx)("img",{className:"gf-sheet-art",src:e.image,alt:"",width:272,height:184,draggable:!1}):(0,t.jsx)(d,{className:"gf-sheet-art",art:e.art,seed:i(e.name)%997,w:272,h:184,density:Math.min(ee,1.25),priority:1}):(0,t.jsxs)("span",{className:"gf-lines","aria-hidden":"true",children:[(0,t.jsx)("i",{style:{width:"86%"}}),(0,t.jsx)("i",{style:{width:"92%"}}),(0,t.jsx)("i",{style:{width:"64%"}}),(0,t.jsx)("i",{style:{width:"88%"}}),(0,t.jsx)("i",{style:{width:"42%"}})]}),(0,t.jsxs)("span",{className:"gf-sheet-head",children:[(0,t.jsx)("span",{className:"gf-sheet-name",children:e.name}),e.meta?(0,t.jsx)("span",{className:"gf-sheet-meta",children:e.meta}):null]})]}),h={className:"gf-sheet"+(c?" gf-sheet--art":"")+(n===O?" gf-sheet--drop":""),style:{"--gf-slot":o,"--gf-depth":er.length-1-a,"--gf-jx":((l()-.5)*10).toFixed(2)+"px","--gf-jr":((l()-.5)*3.2).toFixed(2)+"deg",zIndex:a+1},onAnimationEnd:n===O?()=>D(null):void 0};return(0,t.jsx)("div",{role:"listitem",className:"gf-sheet-slot",children:e.href?(0,t.jsx)("a",{...h,href:e.href,onClick:()=>M?.(e,ea+a),children:f}):(0,t.jsx)("button",{...h,type:"button",onClick:()=>M?.(e,ea+a),children:f})},n)})}),"none"!==x?(0,t.jsx)("button",{ref:L,type:"button",className:"gf-key gf-key--"+x,"aria-label":"add"===x?"Add a file to "+e:"More options for "+e,"aria-haspopup":"more"===x?"menu":void 0,"aria-expanded":"more"===x?X:void 0,"aria-controls":"more"===x?"gf-menu-"+B:void 0,onClick:()=>{let e,t,a;return"add"===x?(e=b?.(z)||{name:"Untitled "+(z.length+1),meta:"Just now"},t=[...z,e],a=_.current++,void(I.current=[...I.current,a],q(t),D(a),H(e=>e+1),y?.(t))):K(e=>!e)},children:"add"===x?(0,t.jsx)("svg",{className:"gf-glyph gf-glyph--plus",viewBox:"0 0 24 24","aria-hidden":"true",children:(0,t.jsx)("path",{d:"M12 4.5v15M4.5 12h15"})},Y):(0,t.jsxs)("svg",{className:"gf-glyph gf-glyph--more",viewBox:"0 0 30 12","aria-hidden":"true",children:[(0,t.jsx)("rect",{x:"1",y:"1.5",width:"8",height:"9",rx:"3.4"}),(0,t.jsx)("rect",{x:"11",y:"1.5",width:"8",height:"9",rx:"3.4"}),(0,t.jsx)("rect",{x:"21",y:"1.5",width:"8",height:"9",rx:"3.4"})]})}):null,"more"===x?(0,t.jsx)("div",{ref:T,id:"gf-menu-"+B,role:"menu","aria-label":e+" options",className:"gf-menu","data-open":X||void 0,onKeyDown:e=>{let t=Array.from(T.current?.querySelectorAll("[role=menuitem]")??[]),a=t.indexOf(document.activeElement),r=a=>{e.preventDefault(),t[(a+t.length)%t.length]?.focus()};"ArrowDown"===e.key?r(a+1):"ArrowUp"===e.key?r(a-1):"Home"===e.key?r(0):"End"===e.key?r(t.length-1):"Tab"===e.key&&K(!1)},children:et.map((e,a)=>(0,t.jsx)("button",{type:"button",role:"menuitem",tabIndex:X?-1:void 0,disabled:!X,className:"gf-menu-item"+(e.danger?" gf-menu-item--danger":""),onClick:()=>{K(!1),L.current?.focus(),e.onSelect?.()},children:e.label},e.label+a))}):null]})})]})}let g=`
.gf-root {
  --gf-px: 0;
  --gf-py: 0;
  --gf-ease: cubic-bezier(.2, .8, .2, 1);
  --gf-spring: cubic-bezier(.34, 1.36, .5, 1);
  --gf-hinge: 0deg;
  --gf-lift: 42px;
  --gf-spread: 0px;
  --gf-fan: 0deg;
  --gf-stack: 15px;
  --gf-ink: #141414;
  --gf-ink-soft: #5C5559;
  position: relative;
  display: inline-block;
  flex: none;
  vertical-align: top;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  isolation: isolate;
}
.gf-root[data-tone="dark"] { --gf-ink: #f5f5f7; --gf-ink-soft: rgba(245, 245, 247, .58); }
.gf-root:hover, .gf-root:focus-within { --gf-hinge: -11deg; --gf-lift: -34px; --gf-spread: 8px; --gf-fan: 1.4deg; --gf-stack: 10px; }
.gf-root[data-open] { --gf-hinge: -24deg; --gf-lift: -96px; --gf-spread: 40px; --gf-fan: 5deg; --gf-stack: 30px; }

.gf-stage {
  position: absolute;
  left: 0;
  top: 0;
  width: 340px;
  height: 272px;
  transform-origin: 0 0;
}
.gf-tilt {
  position: absolute;
  inset: 0;
  transform: perspective(1400px) rotateX(calc(var(--gf-py) * -3deg)) rotateY(calc(var(--gf-px) * 4deg));
  transition: transform .9s var(--gf-ease);
}

.gf-shadow {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: -6px;
  height: 60px;
  border-radius: 40px;
  background: rgba(16, 18, 24, .34);
  filter: blur(22px);
  transform: translateX(calc(var(--gf-px) * -8px));
  transition: transform .9s var(--gf-ease), opacity .9s var(--gf-ease);
}
.gf-root[data-tone="dark"] .gf-shadow { background: rgba(0, 0, 0, .62); }

.gf-back {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: linear-gradient(180deg, #f3f3f4 0%, #e3e3e6 100%);
}
.gf-root[data-tone="dark"] .gf-back { background: linear-gradient(180deg, #2a2a2e 0%, #121214 100%); }
.gf-art {
  position: absolute;
  left: -12px;
  top: -12px;
  max-width: none;
  object-fit: cover;
  transform: translate(calc(var(--gf-px) * -7px), calc(var(--gf-py) * -6px)) scale(1.02);
  transition: transform 1.1s var(--gf-ease), opacity 1.2s var(--gf-ease), filter 1.2s var(--gf-ease);
}
canvas.gf-art { opacity: 0; filter: blur(14px) saturate(.6); }
canvas.gf-art[data-ready] { opacity: 1; filter: none; }
.gf-back-sheen {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, .22) 0%, rgba(255, 255, 255, 0) 22%),
    radial-gradient(120% 80% at 80% 0%, rgba(255, 255, 255, .16), rgba(255, 255, 255, 0) 60%);
  pointer-events: none;
}

.gf-rim {
  position: absolute;
  left: 0;
  top: 0;
  max-width: none;
  overflow: visible;
  pointer-events: none;
  fill: none;
}
.gf-back-rim { width: 340px; height: 272px; }
.gf-back-rim path { stroke: rgba(255, 255, 255, .45); stroke-width: 1; }
.gf-root[data-tone="dark"] .gf-back-rim path { stroke: rgba(255, 255, 255, .16); }

/* ---- files ---------------------------------------------------------------- */
.gf-files {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  /* nothing hangs out of the bottom of the pocket, however tall the stack */
  clip-path: inset(-400px -400px 10px -400px);
}
.gf-sheet-slot { display: contents; }
.gf-sheet {
  all: unset;
  box-sizing: border-box;
  position: absolute;
  left: 34px;
  top: 96px;
  width: 272px;
  height: 184px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  pointer-events: auto;
  background: linear-gradient(180deg, #ffffff 0%, #f2f2f0 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .9),
    0 0 0 .5px rgba(0, 0, 0, .1),
    0 10px 26px -8px rgba(10, 12, 20, .28);
  transform-origin: 50% 100%;
  transform:
    translate(calc(var(--gf-jx) + var(--gf-slot) * var(--gf-spread)), calc(var(--gf-lift) + var(--gf-depth) * var(--gf-stack) * -1))
    rotate(calc(var(--gf-jr) + var(--gf-slot) * var(--gf-fan)));
  transition:
    transform .75s var(--gf-spring) calc(var(--gf-depth) * 40ms),
    box-shadow .4s var(--gf-ease),
    translate .9s var(--gf-ease),
    opacity .9s var(--gf-ease);
}
.gf-root[data-tone="dark"] .gf-sheet { background: linear-gradient(180deg, #2c2c30 0%, #1c1c1f 100%); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .14), 0 0 0 .5px rgba(255, 255, 255, .08), 0 12px 28px -8px rgba(0, 0, 0, .7); }
.gf-sheet--art { background: #1a1a1d; }
.gf-root[data-open] .gf-sheet:hover,
.gf-root[data-open] .gf-sheet:focus-visible {
  transform:
    translate(calc(var(--gf-jx) + var(--gf-slot) * var(--gf-spread)), calc(var(--gf-lift) + var(--gf-depth) * var(--gf-stack) * -1 - 18px))
    rotate(calc(var(--gf-slot) * var(--gf-fan) * .6));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .9), 0 0 0 .5px rgba(0, 0, 0, .1), 0 22px 40px -12px rgba(10, 12, 20, .42);
  transition-delay: 0s;
}
.gf-sheet:focus-visible { outline: 3px solid #C2185B; outline-offset: 3px; }
.gf-sheet-art {
  position: absolute;
  left: 0;
  top: 0;
  width: 272px;
  height: 184px;
  max-width: none;
  object-fit: cover;
  transition: opacity .9s var(--gf-ease), filter .9s var(--gf-ease);
}
canvas.gf-sheet-art { opacity: 0; filter: blur(10px); }
canvas.gf-sheet-art[data-ready] { opacity: 1; filter: none; }
.gf-sheet--art::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(0, 0, 0, .42) 0%, rgba(0, 0, 0, 0) 34%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .2);
  pointer-events: none;
}
.gf-sheet-head {
  position: absolute;
  left: 14px;
  right: 14px;
  top: 11px;
  z-index: 1;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  white-space: nowrap;
}
.gf-sheet-name {
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -.005em;
  color: #18181b;
}
.gf-sheet-meta {
  flex: none;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .02em;
  color: #5C5559;
}
.gf-root[data-tone="dark"] .gf-sheet-name, .gf-sheet--art .gf-sheet-name { color: #fafafa; }
.gf-root[data-tone="dark"] .gf-sheet-meta, .gf-sheet--art .gf-sheet-meta { color: rgba(250, 250, 250, .66); }
.gf-lines {
  position: absolute;
  left: 14px;
  right: 14px;
  top: 40px;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.gf-lines i {
  display: block;
  height: 5px;
  border-radius: 3px;
  background: rgba(24, 24, 27, .08);
}
.gf-lines i:first-child { height: 9px; margin-bottom: 4px; background: rgba(24, 24, 27, .14); }
.gf-root[data-tone="dark"] .gf-lines i { background: rgba(255, 255, 255, .08); }
.gf-root[data-tone="dark"] .gf-lines i:first-child { background: rgba(255, 255, 255, .16); }

.gf-sheet--drop { animation: gf-drop .85s var(--gf-ease) both; }
@keyframes gf-drop {
  0% { translate: 0 -190px; rotate: -9deg; opacity: 0; }
  35% { opacity: 1; }
  72% { translate: 0 10px; rotate: 1deg; }
  100% { translate: 0 0; rotate: 0deg; opacity: 1; }
}

/* ---- front glass ----------------------------------------------------------- */
.gf-front {
  position: absolute;
  left: 0;
  top: 74px;
  width: 340px;
  height: 198px;
  z-index: 10;
  -webkit-backdrop-filter: blur(22px) saturate(1.5);
  backdrop-filter: blur(22px) saturate(1.5);
  transform-origin: 50% 100%;
  transform: perspective(760px) rotateX(var(--gf-hinge));
  transition: transform .8s var(--gf-spring), translate 1s var(--gf-ease), opacity 1s var(--gf-ease);
}
.gf-front--bump { animation: gf-bump .7s var(--gf-ease) .38s both; }
@keyframes gf-bump {
  0% { scale: 1; }
  35% { scale: 1.018 .975; }
  70% { scale: .996 1.006; }
  100% { scale: 1; }
}
.gf-tint {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, .16) 0%, rgba(255, 255, 255, .5) 42%, rgba(252, 252, 252, .93) 100%);
}
.gf-root[data-tone="dark"] .gf-tint {
  background: linear-gradient(180deg, rgba(18, 18, 20, .18) 0%, rgba(14, 14, 16, .62) 46%, rgba(8, 8, 10, .94) 100%);
}
.gf-spec {
  position: absolute;
  inset: 0;
  background: radial-gradient(260px 200px at calc(50% + var(--gf-px) * 46%) calc(30% + var(--gf-py) * 40%), rgba(255, 255, 255, .5), rgba(255, 255, 255, 0) 70%);
  mix-blend-mode: soft-light;
  opacity: .9;
  transition: background-position .6s var(--gf-ease);
  pointer-events: none;
}
.gf-root[data-tone="dark"] .gf-spec { mix-blend-mode: screen; opacity: .16; }
.gf-front-rim { width: 340px; height: 198px; }
.gf-front-rim path { stroke-width: 2.4; transition: stroke-width .3s var(--gf-ease); }
.gf-root[data-tone="dark"] .gf-front-rim { opacity: .55; }

.gf-hit {
  all: unset;
  position: absolute;
  inset: 0;
  z-index: 1;
  cursor: pointer;
}
.gf-hit:focus-visible ~ .gf-label .gf-title { text-decoration: underline; text-decoration-thickness: 1.5px; text-underline-offset: 4px; }
.gf-front:has(.gf-hit:focus-visible) .gf-front-rim path { stroke-width: 5; }

.gf-label {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 200px;
  pointer-events: none;
  color: var(--gf-ink);
}
.gf-root[data-place="bottom-left"] .gf-label { left: 28px; bottom: 32px; }
.gf-root[data-place="top-left"] .gf-label { left: 28px; top: 34px; }
.gf-root[data-place="top-right"] .gf-label { right: 32px; top: 52px; align-items: flex-start; }
.gf-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -.012em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gf-meta {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .01em;
  color: var(--gf-ink-soft);
  white-space: nowrap;
  animation: gf-roll .5s var(--gf-ease) both;
}
@keyframes gf-roll {
  from { opacity: 0; translate: 0 7px; filter: blur(3px); }
  to { opacity: 1; translate: 0 0; filter: blur(0); }
}

/* ---- the key: + or \xb7\xb7\xb7 ------------------------------------------------------ */
.gf-key {
  all: unset;
  box-sizing: border-box;
  position: absolute;
  right: 22px;
  bottom: 22px;
  z-index: 12;
  width: 58px;
  height: 58px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: transform .35s var(--gf-spring), box-shadow .35s var(--gf-ease), background .35s var(--gf-ease);
}
.gf-key:hover { transform: translateY(-2px); }
.gf-key:active { transform: translateY(0) scale(.93); transition-duration: .12s; }
.gf-key:focus-visible { outline: 3px solid #C2185B; outline-offset: 3px; }
.gf-key--add {
  color: #fff;
  background: radial-gradient(120% 90% at 50% 0%, #3a3a3f 0%, #121214 55%, #050506 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .22),
    inset 0 -3px 8px rgba(0, 0, 0, .7),
    0 0 0 1px rgba(0, 0, 0, .75),
    0 14px 22px -8px rgba(0, 0, 0, .55),
    0 3px 6px -2px rgba(0, 0, 0, .35);
}
.gf-root[data-tone="dark"] .gf-key--add {
  color: #111113;
  background: radial-gradient(120% 90% at 50% 0%, #ffffff 0%, #ececee 55%, #d2d2d6 100%);
  box-shadow: inset 0 1px 0 #fff, inset 0 -3px 8px rgba(0, 0, 0, .14), 0 0 0 1px rgba(0, 0, 0, .4), 0 14px 22px -8px rgba(0, 0, 0, .7);
}
.gf-key--more {
  color: #111113;
  background: linear-gradient(180deg, rgba(255, 255, 255, .92) 0%, rgba(226, 226, 230, .82) 100%);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow:
    inset 0 1px 0 #fff,
    inset 0 -2px 4px rgba(0, 0, 0, .06),
    0 0 0 1px rgba(0, 0, 0, .16),
    0 10px 18px -8px rgba(0, 0, 0, .3);
}
.gf-root[data-tone="dark"] .gf-key--more {
  color: #f5f5f7;
  background: linear-gradient(180deg, rgba(255, 255, 255, .16) 0%, rgba(255, 255, 255, .06) 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .22), 0 0 0 1px rgba(255, 255, 255, .1), 0 10px 18px -8px rgba(0, 0, 0, .6);
}
.gf-key--more[aria-expanded="true"] { transform: scale(.96); }
.gf-glyph { display: block; max-width: none; fill: none; stroke: currentColor; stroke-linecap: round; }
.gf-glyph--plus { width: 26px; height: 26px; stroke-width: 1.6; animation: gf-turn .6s var(--gf-spring); }
.gf-glyph--more { width: 30px; height: 12px; stroke-width: 1.7; }
@keyframes gf-turn { from { rotate: -90deg; } to { rotate: 0deg; } }

/* ---- menu ------------------------------------------------------------------- */
.gf-menu {
  position: absolute;
  right: 22px;
  bottom: 90px;
  z-index: 20;
  min-width: 176px;
  padding: 6px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  background: rgba(252, 252, 253, .72);
  -webkit-backdrop-filter: blur(24px) saturate(1.6);
  backdrop-filter: blur(24px) saturate(1.6);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .9), 0 0 0 .5px rgba(0, 0, 0, .14), 0 24px 48px -16px rgba(10, 12, 20, .4);
  transform-origin: 100% 100%;
  opacity: 0;
  visibility: hidden;
  transform: translateY(6px) scale(.94);
  transition: opacity .2s var(--gf-ease), transform .32s var(--gf-spring), visibility 0s .32s;
}
.gf-menu[data-open] { opacity: 1; visibility: visible; transform: none; transition-delay: 0s; }
.gf-root[data-tone="dark"] .gf-menu { background: rgba(30, 30, 34, .72); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 0 0 .5px rgba(255, 255, 255, .1), 0 24px 48px -16px rgba(0, 0, 0, .8); }
.gf-menu-item {
  all: unset;
  box-sizing: border-box;
  padding: 9px 12px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 450;
  color: #18181b;
  cursor: pointer;
}
.gf-root[data-tone="dark"] .gf-menu-item { color: #f4f4f5; }
.gf-menu-item:hover, .gf-menu-item:focus-visible { background: rgba(24, 24, 27, .07); }
.gf-root[data-tone="dark"] .gf-menu-item:hover, .gf-root[data-tone="dark"] .gf-menu-item:focus-visible { background: rgba(255, 255, 255, .09); }
.gf-menu-item--danger { color: #d92d20; }
.gf-root[data-tone="dark"] .gf-menu-item--danger { color: #ff6b5e; }

/* ---- entrance: the folder assembles itself ---------------------------------- */
.gf-root:not([data-entered]) .gf-back,
.gf-root:not([data-entered]) .gf-back-rim { translate: 0 22px; opacity: 0; }
.gf-root:not([data-entered]) .gf-sheet { translate: 0 -120px; opacity: 0; }
.gf-root:not([data-entered]) .gf-front { translate: 0 46px; opacity: 0; }
.gf-root:not([data-entered]) .gf-key { opacity: 0; scale: .6; }
.gf-root:not([data-entered]) .gf-shadow { opacity: 0; }
.gf-back, .gf-back-rim { transition: translate 1s var(--gf-ease), opacity .9s var(--gf-ease); }
.gf-root[data-entered] .gf-sheet { transition-delay: calc(var(--gf-depth) * 40ms), 0s, calc(.18s + var(--gf-depth) * 90ms), calc(.18s + var(--gf-depth) * 90ms); }
.gf-root[data-entered] .gf-front { transition-delay: 0s, .42s, .42s; }
.gf-key { transition: transform .35s var(--gf-spring), box-shadow .35s var(--gf-ease), opacity .6s var(--gf-ease) .7s, scale .7s var(--gf-spring) .7s; }

@media (prefers-reduced-motion: reduce) {
  .gf-root *, .gf-root *::before, .gf-root *::after {
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    animation: none !important;
  }
  .gf-tilt { transform: none; }
}
`,m={style:"marble",colors:["#FFF0F6","#FFD6E7","#FF8FBF","#FF3D8B","#C2185B","#FFE6F0","#FFFFFF"],scale:.7,warp:2.6,angle:-.5,gloss:.35,veins:.15};e.s(["FolderSlot",0,function({folder:e,delay:r}){let s=(0,a.useRef)(null),[i,n]=(0,a.useState)(0);return(0,a.useEffect)(()=>{let e=s.current;if(!e)return;let t=new ResizeObserver(([e])=>n(Math.round(Math.min(380,e.contentRect.width))));return t.observe(e),()=>t.disconnect()},[]),(0,t.jsx)("div",{ref:s,className:"flex w-full justify-center",style:{minHeight:i?void 0:"22rem"},children:i>0&&(0,t.jsx)(p,{label:e.label,meta:e.meta,tone:"light",art:e.image?"none":m,image:e.image,seed:7,action:"none",width:i,appearDelay:r,files:e.files.map(e=>({name:e.name,meta:e.meta,href:e.href,image:e.image}))})})}],6764)},90390,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(46607),s=e.i(40462);e.s(["HeroMotion",0,function({className:e,children:i}){let n=(0,a.useRef)(null);return(0,r.f)(n,()=>{let e={trigger:n.current,start:"top top",end:"bottom top",scrub:!0};s.f.to("[data-hero-media]",{yPercent:8,ease:"none",scrollTrigger:e}),s.f.to("[data-hero-copy]",{yPercent:-18,ease:"none",scrollTrigger:e}),s.f.to("[data-hero-leads]",{y:-120,ease:"none",scrollTrigger:e}),s.f.to("[data-hero-sticker]",{y:160,rotate:10,ease:"none",scrollTrigger:e})}),(0,t.jsx)("section",{ref:n,className:e,children:i})}])},56967,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(89664),s=e.i(46607),i=e.i(40462),n=e.i(32361);let o=[{pain:"An agency that learns your trade on your dime",promise:"Plumbers only"},{pain:"Your website held hostage if you ever leave",promise:"You own your website"},{pain:"A sales pitch before a straight answer",promise:"Free 30-minute strategy call"},{pain:"Reports full of jargon nobody reads",promise:"Reports in plain English"},{pain:"No idea which calls came from the website",promise:"Calls, forms and leads tracked"},{pain:"They vanish the day the site goes live",promise:"Support after launch"},{pain:"Projects that drag on with no end date",promise:"A timeline before we start"}];e.s(["Promises",0,function(){let e=(0,a.useRef)(null);return(0,s.f)(e,()=>{i.f.utils.toArray("[data-row]").forEach(e=>{i.f.timeline({scrollTrigger:{trigger:e,start:"top 82%",once:!0}}).from(e.querySelector("[data-pain]"),{autoAlpha:0,x:-16,duration:.4,ease:"power2.out"}).from(e.querySelector("[data-promise]"),{xPercent:12,autoAlpha:0,rotate:3,duration:.55,ease:"back.out(1.6)"},"<0.1")}),i.f.from("[data-panel-bobo]",{y:60,rotate:-12,ease:"back.out(1.4)",duration:.9,scrollTrigger:{trigger:"[data-panel]",start:"top 75%",toggleActions:"play none none reverse"}})}),(0,t.jsxs)("section",{ref:e,"aria-labelledby":"promise-h",className:"relative overflow-x-clip bg-white pt-52 pb-28 md:pt-72 md:pb-36",children:[(0,t.jsx)("div",{"aria-hidden":!0,className:"pointer-events-none absolute top-24 left-[-10%] -z-0 aspect-square w-[min(44rem,70vw)] rounded-full bg-sky"}),(0,t.jsxs)("div",{className:"container-x relative grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16",children:[(0,t.jsxs)("div",{className:"lg:sticky lg:top-32 lg:self-start",children:[(0,t.jsxs)("h2",{id:"promise-h",className:"display text-t1",children:["No runaround. ",(0,t.jsx)("span",{className:"accent",children:"Just more booked jobs."})]}),(0,t.jsx)("p",{className:"mt-6 max-w-md text-t3 text-slate md:text-t2",children:"You have heard the agency pitch before. Here is what changes when you work with me, in plain English."}),(0,t.jsx)("div",{className:"mt-9 hidden lg:block",children:(0,t.jsx)(n.f,{})})]}),(0,t.jsxs)("div",{"data-panel":!0,className:"relative mt-14 lg:mt-0 lg:-mr-[clamp(1rem,2.2vw,2.5rem)]",children:[(0,t.jsx)("img",{"data-panel-bobo":!0,src:"/brand/bobo-full.webp",alt:"Bobo the duck",width:480,height:549,loading:"lazy",decoding:"async",className:"absolute -top-[5.25rem] right-6 w-28 md:-top-[9.5rem] md:w-36"}),(0,t.jsxs)("div",{className:"relative z-10 rounded-3xl bg-ink px-5 pt-8 pb-8 text-white shadow-[12px_12px_0_var(--color-ribbon)] md:px-10 md:pt-10 md:pb-12 lg:rounded-r-none",children:[(0,t.jsxs)("div",{"aria-hidden":!0,className:"mb-6 grid gap-3 border-b border-white/10 pb-6 md:mb-8 md:grid-cols-2 md:gap-8 md:pb-8",children:[(0,t.jsx)("div",{className:"fit-box",children:(0,t.jsx)("p",{className:"fit-title tall display text-mist [--fit:11.2] [letter-spacing:1.7cqi]",children:"OTHER AGENCIES"})}),(0,t.jsx)("div",{className:"fit-box",children:(0,t.jsxs)("p",{className:"fit-title tall display text-white [--fit:11.2]",children:["PLUMBER ",(0,t.jsx)("span",{className:"text-ribbon",children:"KING"})," AGENCY"]})})]}),(0,t.jsx)("h3",{className:"sr-only",children:"Other agencies compared with Plumber King Agency"}),(0,t.jsx)("ol",{className:"relative",children:o.map((e,a)=>(0,t.jsxs)("li",{"data-row":!0,className:"grid gap-2 border-b border-white/10 py-5 first:pt-0 last:border-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-8",children:[(0,t.jsxs)("p",{className:"relative self-start text-t3 text-mist md:self-center",children:[(0,t.jsx)("span",{"data-pain":!0,children:e.pain}),(0,t.jsx)("span",{className:"sr-only",children:" (not with us)"})]}),(0,t.jsxs)("p",{"data-promise":!0,className:"flex items-center gap-3 text-t2 font-bold",children:[(0,t.jsx)("span",{className:`grid h-9 w-9 shrink-0 place-items-center rounded-full ${a%2?"bg-white text-ink":"bg-ribbon-deep text-white"}`,children:(0,t.jsx)(r.f,{className:"h-5 w-5","aria-hidden":!0})}),e.promise]})]},e.promise))})]})]}),(0,t.jsx)("div",{className:"flex justify-center lg:hidden",children:(0,t.jsx)(n.f,{})})]})]})}])},93850,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(56420);let s={name:"chevrons-left-right",size:24,node:[["path",{d:"m9 7-5 5 5 5",key:"j5w590"}],["path",{d:"m15 7 5 5-5 5",key:"1bl6da"}]]};s.node;let i=(0,r.f)(s);var n=e.i(63676),o=e.i(46607),l=e.i(40462),d=e.i(96199),c=e.i(44803);let f=["Template look, same as every competitor","Phone number buried in the footer","No reason to trust you over the next guy","Slow on a phone with one bar of signal"],h=["Built around the jobs you want more of","Call button under every thumb","Reviews, photos and promises up front","Loads fast on any phone"];function p({src:e,label:a}){return(0,t.jsx)("img",{src:e,alt:a,width:1296,height:768,loading:"lazy",decoding:"async",className:"h-full w-full object-cover object-top",draggable:!1})}function g({value:e,onValueChange:r,before:s,after:n}){let o=(0,a.useRef)(null),l=(0,a.useId)(),d=Math.max(0,Math.min(100,e)),c=e=>{let t=o.current.getBoundingClientRect();t.width&&r(Math.round(Math.max(0,Math.min(100,(e-t.left)/t.width*100))))};return(0,t.jsxs)("figure",{children:[(0,t.jsxs)("div",{ref:o,className:"relative aspect-[4/3] cursor-ew-resize touch-pan-y overflow-hidden rounded-xl border-4 border-ink bg-white shadow-[12px_12px_0_var(--color-ink)] select-none sm:aspect-[27/16]",onPointerDown:e=>{0===e.button&&(e.currentTarget.setPointerCapture(e.pointerId),c(e.clientX))},onPointerMove:e=>{e.currentTarget.hasPointerCapture(e.pointerId)&&c(e.clientX)},onPointerUp:e=>{e.currentTarget.hasPointerCapture(e.pointerId)&&e.currentTarget.releasePointerCapture(e.pointerId)},children:[(0,t.jsx)("div",{className:"absolute inset-0","aria-hidden":!0,children:n}),(0,t.jsx)("div",{className:"absolute inset-0","aria-hidden":!0,style:{clipPath:`inset(0 ${100-d}% 0 0)`},children:s}),(0,t.jsxs)("span",{"aria-hidden":!0,className:"pointer-events-none absolute inset-0",style:{transform:`translate3d(${d}%,0,0)`},children:[(0,t.jsx)("span",{className:"absolute inset-y-0 left-0 w-[3px] -translate-x-1/2 bg-ink"}),(0,t.jsx)("span",{className:"absolute top-1/2 left-0 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md border-2 border-ink bg-white text-ink shadow-[3px_3px_0_var(--color-ink)]",children:(0,t.jsx)(i,{className:"h-5 w-5"})})]})]}),(0,t.jsx)("label",{htmlFor:l,className:"sr-only",children:"Compare a typical plumber website with a Plumber King website"}),(0,t.jsx)("input",{id:l,type:"range",min:0,max:100,value:d,onChange:e=>r(Number(e.target.value)),"aria-valuetext":`${d}% typical site shown`,className:"mt-4 h-11 w-full cursor-pointer accent-[var(--color-ribbon)]"})]})}e.s(["ProblemSplit",0,function(){let e=(0,a.useRef)(null),[r,s]=(0,a.useState)(72);return(0,o.f)(e,()=>{let e={v:92};l.f.to(e,{v:50,duration:1.4,ease:"power3.inOut",onUpdate:()=>s(Math.round(e.v)),scrollTrigger:{trigger:"[data-compare]",start:"top 70%",once:!0}})}),(0,t.jsxs)("section",{ref:e,className:"relative isolate overflow-x-clip bg-ivory py-24 md:py-32","aria-labelledby":"problem-h",children:[(0,t.jsx)(c.TrailLayer,{tone:"pink"}),(0,t.jsx)("div",{"aria-hidden":!0,className:"hero-dots pointer-events-none absolute top-16 right-0 h-72 w-[34%]"}),(0,t.jsxs)("div",{className:"container-x relative",children:[(0,t.jsx)(d.f,{className:"ps-head fit-box",children:(0,t.jsxs)("h2",{id:"problem-h",className:"display ps-title",children:[(0,t.jsx)("span",{className:"ps-l",children:"Your website"})," ",(0,t.jsx)("span",{className:"ps-l ps-r",children:"rings a phone."})," ",(0,t.jsxs)("span",{className:"accent",children:[(0,t.jsx)("span",{className:"ps-l",children:"Yours, or the"})," ",(0,t.jsxs)("span",{className:"ps-l ps-r",children:["other guy's",(0,t.jsx)("span",{"data-trail-end":"",children:"."})]})]})]})}),(0,t.jsxs)("div",{className:"relative mt-14 lg:mt-20",children:[(0,t.jsx)("div",{"data-compare":!0,children:(0,t.jsx)(g,{value:r,onValueChange:s,before:(0,t.jsx)(p,{src:"/work/ridgeline-before.webp",label:"Typical plumber website"}),after:(0,t.jsx)(p,{src:"/work/ridgeline-after.webp",label:"Rebuilt plumber website"})})}),(0,t.jsxs)(d.f,{className:"relative z-10 mt-8 rounded-xl border-2 border-ink/15 bg-white p-6 shadow-[6px_6px_0_rgb(20_20_20/0.12)] lg:absolute ps-card-l lg:mt-0 lg:w-[22rem] lg:-rotate-2",children:[(0,t.jsx)("h3",{className:"display text-t2 text-slate uppercase",children:"Random plumbing agency"}),(0,t.jsx)("ul",{className:"mt-4 space-y-2.5",children:f.map(e=>(0,t.jsxs)("li",{className:"flex gap-3 text-t3 text-slate",children:[(0,t.jsx)(n.X,{className:"mt-1 h-4 w-4 shrink-0 text-royal","aria-hidden":!0}),e]},e))})]}),(0,t.jsx)(d.f,{delay:.1,className:"relative z-10 mt-6 lg:absolute lg:top-[42%] ps-card-r lg:mt-0 lg:w-[22rem]",children:(0,t.jsxs)("div",{className:"ring-card rounded-xl border-2 border-ink bg-white p-6 shadow-[8px_8px_0_var(--color-ribbon)] lg:rotate-2",children:[(0,t.jsxs)("h3",{className:"display text-t2 uppercase",children:["Plumber ",(0,t.jsx)("span",{className:"text-royal",children:"King"})," Agency"]}),(0,t.jsx)("ul",{className:"mt-4 space-y-2.5",children:h.map(e=>(0,t.jsxs)("li",{className:"flex gap-3 text-t3",children:[(0,t.jsx)("span",{"aria-hidden":!0,className:"duck-tick mt-0.5"}),e]},e))})]})})]})]})]})}],93850)},88424,e=>{var t=e.i(43476),a=e.i(56420);let r={name:"calendar-check",size:24,node:[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"m9 15 2 2 4-4",key:"1grp1n"}]]};r.node;let s=(0,a.f)(r),i={name:"map-pin",size:24,node:[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]};i.node;let n=(0,a.f)(i),o={name:"phone-call",size:24,node:[["path",{d:"M13 2a9 9 0 0 1 9 9",key:"1itnx2"}],["path",{d:"M13 6a5 5 0 0 1 5 5",key:"11nki7"}],["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]};o.node;let l=(0,a.f)(o),d={name:"search",size:24,node:[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]};d.node;let c=(0,a.f)(d);var f=e.i(84026),h=e.i(71645);function p({steps:e,places:a,height:r,className:s,lastCardAttr:i}){let n=(0,h.useRef)(null),[o,l]=(0,h.useState)("");return(0,h.useLayoutEffect)(()=>{let e=n.current;if(!e)return;let t=()=>{if(window.innerWidth<1024)return l("");let t=Array.from(e.querySelectorAll("[data-how-card]")),a=(e,t,a,r,s)=>{let i=(parseFloat(getComputedStyle(e).rotate)||0)*(Math.PI/180),n=Math.cos(i),o=Math.sin(i);return{x:e.offsetLeft+e.offsetWidth/2+t*n-a*o,y:e.offsetTop+e.offsetHeight/2+t*o+a*n,n:[r*n-s*o,r*o+s*n]}},r=(e,t)=>a(e,(t?1:-1)*(e.offsetWidth/2+(t?18:10)),-.05*e.offsetHeight,t?1:-1,0),s=e=>e.toFixed(1),i="";for(let e=0;e<t.length-1;e++){let n=t[e],o=t[e+1],l=o.offsetLeft>n.offsetLeft,d=r(n,l),c=r(o,!l),f=Math.max(40,(c.x-d.x)*(l?1:-1)*.5),h=f;(c.x-d.x)*(l?1:-1)<40&&(d=a(n,(l?1:-1)*.3*n.offsetWidth,n.offsetHeight/2+18,0,1),f=Math.max(50,.6*Math.abs(c.y-d.y)),h=Math.max(50,.6*Math.abs(c.x-d.x))),i+=`M ${s(d.x)} ${s(d.y)} C ${s(d.x+d.n[0]*f)} ${s(d.y+d.n[1]*f)}, ${s(c.x+c.n[0]*h)} ${s(c.y+c.n[1]*h)}, ${s(c.x)} ${s(c.y)} `}l(i.trim())};t();let a=new ResizeObserver(t);return a.observe(e),document.fonts?.ready.then(t),()=>a.disconnect()},[]),(0,t.jsxs)("div",{ref:n,className:`relative mx-auto flex w-full max-w-[1588px] flex-col gap-12 lg:block lg:h-[var(--how-h)] ${s??""}`,style:{"--how-h":`${r}px`},children:[o?(0,t.jsx)("svg",{"aria-hidden":!0,className:"pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block",children:(0,t.jsx)("path",{d:o,className:"how-dash",fill:"none",stroke:"var(--color-ribbon)",strokeOpacity:"0.6",strokeWidth:"2.5",strokeDasharray:"10 8",strokeLinecap:"round"})}):null,e.map((r,s)=>{let n=a[s%a.length],o=r.icon;return(0,t.jsxs)("article",{"data-how-card":"",...s===e.length-1&&i?{[i]:""}:{},className:`how-card relative z-10 w-[86%] max-w-[24rem] lg:absolute lg:mx-0 lg:w-[300px] lg:max-w-none ${s%2?"ml-auto":""}`,style:{"--tilt":`${n.tilt}deg`,"--top":`${n.top}px`,"--k":n.k},children:[(0,t.jsx)("span",{"aria-hidden":!0,className:"how-peg"}),(0,t.jsxs)("div",{className:"rounded-[1.5rem] border-2 border-ink bg-white p-6 shadow-[8px_8px_0_var(--color-ribbon)]",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,t.jsx)("span",{"aria-hidden":!0,className:"display text-t1 leading-[0.85] text-ink",children:String(s+1).padStart(2,"0")}),(0,t.jsx)("span",{"aria-hidden":!0,className:"grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ribbon text-white",children:(0,t.jsx)(o,{className:"h-6 w-6"})})]}),(0,t.jsxs)("h3",{className:"display mt-5 text-t2 text-ink",children:[(0,t.jsxs)("span",{className:"text-ribbon",children:[r.word,"."]})," ",r.title]}),(0,t.jsx)("p",{className:"mt-2 text-t3 text-slate",children:r.body})]})]},r.word)})]})}var g=e.i(44803),m=e.i(89860);let u=[{word:"Found",icon:c,title:"They search. You show up.",body:"“Emergency plumber near me.” Whether they ask Google or an AI assistant, your service pages and Google Business Profile put you in the answers."},{word:"Chosen",icon:n,title:"You stand out from the list.",body:"Your Google profile looks like the pro in town: real photos, hours, services and reviews, so they pick you over the plumber next to you."},{word:"Trusted",icon:f.f,title:"They land. They trust you in seconds.",body:"Real photos of you and your trucks, your real reviews and what makes you different, right where a worried homeowner looks first."},{word:"Called",icon:l,title:"They tap. Your phone rings.",body:"A call button under every thumb and a two-field quote form for the people who would rather type."},{word:"Booked",icon:s,title:"You call back first. The job is yours.",body:"Every call and quote request lands on your phone straight away, so you get the job before they call someone else."}],x=[{top:0,k:-.924,tilt:8},{top:120,k:1,tilt:-8},{top:533,k:-.635,tilt:8},{top:608,k:.661,tilt:-8},{top:970,k:-.048,tilt:8}];e.s(["StoryScroll",0,function(){return(0,t.jsxs)("section",{className:"relative isolate overflow-x-clip bg-sky pt-24 pb-40 md:pt-32 md:pb-48","aria-labelledby":"story-h",children:[(0,t.jsx)(g.TrailLayer,{tone:"white"}),(0,t.jsx)(m.WalkingBobo,{}),(0,t.jsxs)("div",{className:"container-x relative",children:[(0,t.jsxs)("h2",{id:"story-h",className:"display text-center text-t1",children:["From invisible to ",(0,t.jsx)("span",{className:"accent story-booked",children:"booked."})]}),(0,t.jsx)(p,{steps:u,places:x,height:1330,className:"mt-16 lg:mt-24",lastCardAttr:"data-trail-start"})]})]})}],88424)},44803,e=>{var t=e.i(43476),a=e.i(71645);let r=(0,a.createContext)(null),s=32*Math.PI/180;function i(e){let t=0,a=0,r=e;for(;r;)t+=r.offsetLeft,a+=r.offsetTop,r=r.offsetParent;return{x:t,y:a}}let n=2*Math.PI,o=(e,t)=>[e.c[0]+e.r*Math.cos(t),e.c[1]+e.r*Math.sin(t)],l=(e,t)=>t-e.d*Math.PI/2;e.s(["TrailLayer",0,function({tone:e}){let s=(0,a.useContext)(r),i=(0,a.useRef)(null),n=(0,a.useRef)(null),o=(0,a.useRef)(null);return(0,a.useEffect)(()=>{if(s&&i.current&&n.current&&o.current)return s.add({el:i.current,svg:n.current,path:o.current})},[s]),(0,t.jsx)("div",{ref:i,"aria-hidden":!0,className:"pointer-events-none absolute inset-0 -z-10 overflow-hidden",children:(0,t.jsx)("svg",{ref:n,className:"absolute left-0 overflow-visible",width:"0",height:"0",children:(0,t.jsx)("path",{ref:o,fill:"none",stroke:"white"===e?"#ffffff":"#ff3d8b",strokeLinecap:"round",strokeLinejoin:"round",pathLength:1,strokeDasharray:"1 1",style:{strokeDashoffset:1,opacity:0}})})})},"TrailRun",0,function({children:e}){let d=(0,a.useRef)(null),c=(0,a.useRef)(new Set),f=(0,a.useRef)(null),h=(0,a.useRef)(()=>{}),p=(0,a.useRef)({add:e=>(c.current.add(e),h.current(),()=>{c.current.delete(e)})});return(0,a.useLayoutEffect)(()=>{let e=d.current;if(!e)return;let t=window.matchMedia("(prefers-reduced-motion: reduce)"),a=()=>{let e=f.current;if(!e)return;let a=1;if(!t.matches){let t=window.innerHeight,r=e.sDoc-.8*t,s=e.eDoc-.5*t;a=Math.min(1,Math.max(0,(window.scrollY-r)/(s-r)))}for(let e of c.current)e.path.style.strokeDashoffset=String(1-a),e.path.style.opacity=a<.002?"0":"1"},r=()=>{let t=e.querySelector("[data-trail-start]"),r=e.querySelector("[data-trail-end]");if(!t||!r)return;let d=e.clientWidth,h=e.offsetHeight,p=i(e),g=d<768?8:13,m=i(t),u=t.offsetWidth,x=t.offsetHeight,b=t.querySelector(":scope > div"),y=b&&parseFloat(getComputedStyle(b).borderBottomRightRadius)||0,v=(parseFloat(getComputedStyle(t).rotate)||0)*(Math.PI/180),w=Math.cos(v),j=Math.sin(v),k=(e,t)=>[e*w-t*j,e*j+t*w],N=y+8+g/2,M=[u/2+8-y+N*Math.SQRT1_2,x/2+8-y+N*Math.SQRT1_2],[$,C]=k(M[0],M[1]),S=[m.x-p.x+u/2+$,m.y-p.y+x/2+C],A=k(Math.SQRT1_2,Math.SQRT1_2),F=getComputedStyle(r),B=document.createElement("canvas").getContext("2d");if(!B)return;B.font=`${F.fontStyle} ${F.fontWeight} ${F.fontSize} ${F.fontFamily}`;let E=B.measureText("."),P=i(r),R=P.y-p.y+E.fontBoundingBoxAscent+(r.offsetHeight-(E.fontBoundingBoxAscent+E.fontBoundingBoxDescent))/2,L=P.x-p.x+(E.actualBoundingBoxRight-E.actualBoundingBoxLeft)/2,T=R-(E.actualBoundingBoxAscent-E.actualBoundingBoxDescent)/2,z=(E.actualBoundingBoxRight+E.actualBoundingBoxLeft)/2,q=[Math.cos(s),-Math.sin(s)],I=[L+q[0]*(z+12+g/2),T+q[1]*(z+12+g/2)],_=e.firstElementChild,O=_?_.offsetHeight:S[1]+200,D=Math.min(72,Math.max(34,.045*d)),Y=Math.min(150,Math.max(56,.085*d)),H=Math.max(80,O-S[1]);I[1];let U={r:.8*Y,d:-1,c:[0,0]},W=Math.atan2(A[1],A[0])-U.d*Math.PI/2;U.c=[S[0]-U.r*Math.cos(W),S[1]-U.r*Math.sin(W)];let G={r:.5*Y,d:1,c:[0,0]},J=Math.atan2(-q[1],-q[0])-G.d*Math.PI/2;G.c=[I[0]-G.r*Math.cos(J),I[1]-G.r*Math.sin(J)];let X=Array.from(r.closest("h2")?.querySelectorAll(".ps-l")??[]),K=[];for(let e of[0,2]){let t=X[e];if(!t)continue;let a=i(t),r=t.offsetHeight,s=d-(a.x-p.x+t.offsetWidth),n=Math.min(1.3*D,s/2-24,.42*r);n<30||K.push({c:[d-s/2,a.y-p.y+r*(e?.45:.55)],r:n,d:1,loop:!0})}let Q=function(e,t,a){let r=e=>e.toFixed(1),s=[];for(let t=0;t<e.length-1;t++)s.push(function(e,t){let a=t.c[0]-e.c[0],r=t.c[1]-e.c[1],s=Math.hypot(a,r),i=Math.atan2(r,a),n=Math.max(-1,Math.min(1,(t.r*t.d-e.r*e.d)/s));for(let a of[i-Math.asin(n),i-Math.PI+Math.asin(n)]){let r=o(e,l(e,a)),s=o(t,l(t,a));if((s[0]-r[0])*Math.cos(a)+(s[1]-r[1])*Math.sin(a)>0)return a}return i}(e[t],e[t+1]));let i="";return e.forEach((d,c)=>{let f=0===c?t:l(d,s[c-1]),h=(((c===e.length-1?a:l(d,s[c]))-f)*d.d%n+n)%n;d.loop&&h<1.25*Math.PI&&(h+=n);let p=o(d,f);i+=0===c?`M ${r(p[0])} ${r(p[1])}`:` L ${r(p[0])} ${r(p[1])}`;let g=Math.max(1,Math.ceil(h/(.9*Math.PI)));for(let e=1;e<=g;e++){let t=o(d,f+d.d*h*(e/g));i+=` A ${r(d.r)} ${r(d.r)} 0 0 ${+(d.d>0)} ${r(t[0])} ${r(t[1])}`}}),i}([U,...d<768?[]:[{c:[Math.min(S[0]+3.8*D,d-1.4*D),S[1]+.1*H],r:D,d:-1,loop:!0}],{c:[d+.03*d,O-.2*H],r:1.1*Y,d:1},...K,G],W,J);for(let e of(f.current={sDoc:p.y+S[1],eDoc:p.y+I[1]},c.current)){let t=i(e.el).y-p.y;e.svg.setAttribute("width",String(d)),e.svg.setAttribute("height",String(h)),e.svg.setAttribute("viewBox",`0 0 ${d} ${h}`),e.svg.style.top=`${-t}px`,e.path.setAttribute("d",Q),e.path.setAttribute("stroke-width",String(g))}a()};h.current=r,r();let p=0,g=()=>{p||(p=requestAnimationFrame(()=>{p=0,a()}))},m=new ResizeObserver(()=>r());return m.observe(e),window.addEventListener("scroll",g,{passive:!0}),window.addEventListener("load",r),t.addEventListener("change",a),document.fonts?.ready.then(r),()=>{m.disconnect(),cancelAnimationFrame(p),window.removeEventListener("scroll",g),window.removeEventListener("load",r),t.removeEventListener("change",a)}},[]),(0,t.jsx)(r.Provider,{value:p.current,children:(0,t.jsx)("div",{ref:d,children:e})})}])},34575,e=>{var t=e.i(71645);e.s(["f",0,function(){let[e,a]=(0,t.useState)(!1);return(0,t.useEffect)(()=>{let e=window.matchMedia("(prefers-reduced-motion: reduce)"),t=()=>a(e.matches||document.documentElement.classList.contains("pk-still")),r=t=>a(e.matches||t.detail);return t(),e.addEventListener("change",t),window.addEventListener("pk-motion",r),()=>{e.removeEventListener("change",t),window.removeEventListener("pk-motion",r)}},[]),e}])}])})();