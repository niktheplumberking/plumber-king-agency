(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,96439,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(56420);let s={name:"plus",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]};s.node;let n=(0,r.f)(s);e.s(["FaqList",0,function({items:e,level:r=3}){let s=2===r?"h2":"h3",[i,o]=(0,a.useState)(0),l=(0,a.useId)();return(0,t.jsx)("div",{className:"space-y-3",children:e.map((e,a)=>{let r=i===a;return(0,t.jsxs)("div",{className:`fq ${r?"open":""}`,children:[(0,t.jsx)(s,{className:"m-0",children:(0,t.jsxs)("button",{type:"button",id:`${l}-q${a}`,"aria-expanded":r,"aria-controls":`${l}-a${a}`,onClick:()=>o(r?null:a),className:"fq-btn",children:[(0,t.jsx)("span",{"aria-hidden":!0,className:"fq-n",children:String(a+1).padStart(2,"0")}),(0,t.jsx)("span",{className:"flex-1",children:e.q}),(0,t.jsx)("span",{className:"fq-ic",children:(0,t.jsx)(n,{className:"h-5 w-5","aria-hidden":!0})})]})}),(0,t.jsx)("div",{id:`${l}-a${a}`,role:"region","aria-labelledby":`${l}-q${a}`,hidden:!r,className:"enter-fade",children:(0,t.jsx)("p",{className:"fq-a",children:e.a})})]},e.q)})})}],96439)},32276,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(68877),s=e.i(56420);let n={name:"loader-circle",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],aliases:["loader-2"]};n.node;let i=(0,s.f)(n);var o=e.i(89042);let l=[{v:"US",label:"United States +1",code:"+1"},{v:"CA",label:"Canada +1",code:"+1"}];function d({c:e}){return"CA"===e?(0,t.jsxs)("svg",{viewBox:"0 0 30 20",className:"lf-flag","aria-hidden":!0,children:[(0,t.jsx)("rect",{width:"30",height:"20",fill:"#fff"}),(0,t.jsx)("rect",{width:"7.5",height:"20",fill:"#d52b1e"}),(0,t.jsx)("rect",{x:"22.5",width:"7.5",height:"20",fill:"#d52b1e"}),(0,t.jsx)("path",{fill:"#d52b1e",d:"M15 4.2l1 1.9 1.3-.5-.4 3 1.6-1.5.4 1.1 1.7-.3-.6 1.8.8.4-2.9 2.3.3 1.1-2.8-.4.1 2.7h-1l.1-2.7-2.8.4.3-1.1-2.9-2.3.8-.4-.6-1.8 1.7.3.4-1.1 1.6 1.5-.4-3 1.3.5z"})]}):(0,t.jsxs)("svg",{viewBox:"0 0 30 20",className:"lf-flag","aria-hidden":!0,children:[(0,t.jsx)("rect",{width:"30",height:"20",fill:"#fff"}),[0,2,4,6,8,10,12].map(e=>(0,t.jsx)("rect",{y:20*e/13,width:"30",height:20/13,fill:"#b22234"},e)),(0,t.jsx)("rect",{width:"13",height:140/13,fill:"#3c3b6e"}),[0,1,2,3].map(e=>[0,1,2,3,4].map(a=>(0,t.jsx)("circle",{cx:1.6+2.45*a,cy:1.5+2.6*e,r:"0.55",fill:"#fff"},`${e}-${a}`)))]})}e.s(["LeadForm",0,function({kind:e="strategy-call",tone:s="dark"}){let n=(0,a.useId)(),[c,f]=(0,a.useState)("idle"),[h,p]=(0,a.useState)({}),[g,m]=(0,a.useState)(1),[u,x]=(0,a.useState)("US"),b="dark"===s,y=`mt-2 block min-h-12 w-full rounded-md border-2 px-4 py-3 text-t3 outline-none transition-colors focus:border-ribbon ${b?"aria-[invalid=true]:border-white border-white/30 bg-white/10 text-white placeholder:text-white/75":"aria-[invalid=true]:border-ribbon-deep border-ink/20 bg-white text-ink placeholder:text-slate/70"}`,v=`mt-2 text-t3 font-semibold ${b?"text-white":"text-ribbon-deep"}`,w=`text-t3 font-extrabold tracking-wider uppercase ${b?"text-white/90":"text-ink"}`;async function j(t){let a,r;t.preventDefault();let s=t.currentTarget,n=new FormData(s);if(n.get("company_website_hp"))return;let i=(r={},(a=e=>String(n.get(e)??"").trim())("name")||(r.name="Please enter your name."),a("business")||(r.business="Please enter your business name."),a("email")?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a("email"))||(r.email="That email looks incomplete. Check it has an @ and a domain, like mike@johnsonplumbing.com."):r.email="Please enter your email so Nick can reply.",a("phone").replace(/\D/g,"").length<7&&(r.phone=a("phone")?"That phone number looks too short. Include the area code.":"Please enter a phone number."),"website-audit"!==e||a("website")||(r.website="Please enter your website address so Nick can audit it."),r),d=1===g?Object.fromEntries(Object.entries(i).filter(([e])=>"name"===e||"phone"===e)):i;p(d);let c=Object.keys(d)[0],h=e=>setTimeout(()=>s.elements.namedItem(e)?.focus(),0);if(c){("name"===c||"phone"===c)&&m(1),h(c);return}if(1===g){m(2),h("business");return}let u=Object.fromEntries(n.entries());delete u.company_website_hp;let x=l.find(e=>e.v===u.country)??l[0];u.phone=`${x.code} ${String(u.phone??"").trim()} (${x.v})`,delete u.country;let b={...u,kind:e,page:window.location.pathname,submittedAt:new Date().toISOString()};if(!o.B.formEndpoint){let t=Object.entries(b).map(([e,t])=>`${e}: ${t}`).join("\n");window.location.href=`mailto:${o.B.email}?subject=${encodeURIComponent("website-audit"===e?"Free website audit request":"Strategy call request")}&body=${encodeURIComponent(t)}`,f("sent");return}f("sending");try{let e=await fetch(o.B.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(b)}),t=await e.json().catch(()=>null);f(e.ok&&t?.ok?"sent":"error")}catch{f("error")}}return"sent"===c?(0,t.jsxs)("div",{role:"status",className:`rounded-md border-2 border-ink p-8 ${b?"bg-white/[0.06] text-white":"bg-ivory"}`,children:[(0,t.jsx)("img",{src:"/bobo/cheer.webp",alt:"Bobo the duck cheering",width:96,height:96,className:"h-24 w-24"}),(0,t.jsx)("p",{className:"mt-4 font-display text-t2 font-bold",children:"Got it. Nick will be in touch."}),(0,t.jsx)("p",{className:`mt-2 ${b?"text-white/90":"text-slate"}`,children:"Nick reads and replies to every request personally."})]}):(0,t.jsxs)("form",{onSubmit:j,className:`grid gap-5 ${1===g?"lf-s1":"sm:grid-cols-2"}`,noValidate:!0,children:[(0,t.jsxs)("div",{className:"col-span-full flex items-center gap-3","aria-live":"polite",children:[(0,t.jsxs)("span",{className:`text-t3 font-bold ${b?"text-white":"text-ink"}`,children:["Step ",g," of 2"]}),(0,t.jsx)("span",{"aria-hidden":!0,className:"lf-bar",children:(0,t.jsx)("span",{style:{transform:`scaleX(${g/2})`}})})]}),(0,t.jsxs)("div",{hidden:1!==g,className:"contents",children:[(0,t.jsxs)("div",{className:"lf-name min-w-0",children:[(0,t.jsx)("label",{htmlFor:`${n}-name`,className:w,children:"Your name"}),(0,t.jsx)("input",{id:`${n}-name`,name:"name",required:!0,autoComplete:"name",size:8,className:`${y} min-w-0`,"aria-invalid":!!h.name||void 0,"aria-describedby":h.name?`${n}-name-err`:void 0,placeholder:"Mike Johnson"}),h.name&&(0,t.jsx)("p",{id:`${n}-name-err`,className:v,children:h.name})]}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("label",{htmlFor:`${n}-cc`,className:w,children:"Country"}),(0,t.jsxs)("div",{className:`lf-cc mt-2 ${b?"lf-cc-dark":""}`,children:[(0,t.jsx)(d,{c:u}),(0,t.jsx)("select",{id:`${n}-cc`,name:"country",value:u,onChange:e=>x(e.target.value),autoComplete:"country",className:`lf-cc-sel ${b?"text-white":"text-ink"}`,"aria-label":"Country code",children:l.map(e=>(0,t.jsx)("option",{value:e.v,children:e.code},e.v))})]})]}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("label",{htmlFor:`${n}-phone`,className:w,children:"Phone"}),(0,t.jsx)("input",{id:`${n}-phone`,name:"phone",type:"tel",required:!0,autoComplete:"tel",className:y,"aria-invalid":!!h.phone||void 0,"aria-describedby":h.phone?`${n}-phone-err`:void 0,placeholder:"(555) 555-0123"}),h.phone&&(0,t.jsx)("p",{id:`${n}-phone-err`,className:v,children:h.phone})]})]}),(0,t.jsxs)("div",{hidden:2!==g,className:"contents",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:`${n}-co`,className:w,children:"Business name"}),(0,t.jsx)("input",{id:`${n}-co`,name:"business",required:!0,autoComplete:"organization",className:y,"aria-invalid":!!h.business||void 0,"aria-describedby":h.business?`${n}-business-err`:void 0,placeholder:"Johnson Plumbing"}),h.business&&(0,t.jsx)("p",{id:`${n}-business-err`,className:v,children:h.business})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:`${n}-email`,className:w,children:"Email"}),(0,t.jsx)("input",{id:`${n}-email`,name:"email",type:"email",required:!0,autoComplete:"email",className:y,"aria-invalid":!!h.email||void 0,"aria-describedby":h.email?`${n}-email-err`:void 0,placeholder:"mike@johnsonplumbing.com"}),h.email&&(0,t.jsx)("p",{id:`${n}-email-err`,className:v,children:h.email})]}),(0,t.jsxs)("div",{className:"sm:col-span-2",children:[(0,t.jsx)("label",{htmlFor:`${n}-site`,className:w,children:"website-audit"===e?"Your current website":"Current website (if you have one)"}),(0,t.jsx)("input",{id:`${n}-site`,name:"website",type:"text",inputMode:"url",required:"website-audit"===e,className:y,"aria-invalid":!!h.website||void 0,"aria-describedby":h.website?`${n}-website-err`:void 0,placeholder:"johnsonplumbing.com"}),h.website&&(0,t.jsx)("p",{id:`${n}-website-err`,className:v,children:h.website})]})]}),(0,t.jsxs)("div",{"aria-hidden":!0,className:"absolute -left-[9999px]",children:[(0,t.jsx)("label",{htmlFor:`${n}-hp`,children:"Leave empty"}),(0,t.jsx)("input",{id:`${n}-hp`,name:"company_website_hp",tabIndex:-1,autoComplete:"off"})]}),(0,t.jsxs)("div",{className:"col-span-full lf-foot",children:[(0,t.jsxs)("div",{className:"lf-btns flex flex-wrap items-center gap-3",children:[2===g&&(0,t.jsx)("button",{type:"button",onClick:()=>m(1),className:`min-h-11 px-3 font-bold underline underline-offset-4 ${b?"text-white":"text-ink"}`,children:"Back"}),(0,t.jsxs)("button",{type:"submit",disabled:"sending"===c,className:"btn btn-primary w-full sm:w-auto",children:["sending"===c?(0,t.jsx)(i,{className:"h-5 w-5 animate-spin","aria-hidden":!0}):null,1===g?"Next: your business":"website-audit"===e?o.B.secondaryCta:o.B.primaryCta,(0,t.jsx)(r.f,{className:"h-4.5 w-4.5","aria-hidden":!0})]})]}),"error"===c&&(0,t.jsxs)("p",{role:"alert",className:"mt-3 text-t3 font-semibold text-royal",children:["That didn't send. Please email ",(0,t.jsx)("a",{className:"underline",href:`mailto:${o.B.email}`,children:o.B.email})," and we'll get right back to you."]}),(0,t.jsxs)("p",{className:`mt-4 text-t3 ${b?"text-white/90":"text-slate"}`,children:["No commitment, no hard sell. By sending this you agree to our ",(0,t.jsx)("a",{href:"/privacy-policy/",className:"underline",children:"Privacy Policy"}),"."]})]})]})}],32276)},6764,e=>{var t=e.i(43476),a=e.i(71645);let r={aurora:{style:"streak",colors:["#f4efe9","#e9c2b8","#c2433f","#2a1e2a","#22395e","#6f97c2","#e5edf4"],scale:.7,warp:1.4,angle:-.62,gloss:.18,veins:0},ember:{style:"marble",colors:["#07090c","#16252c","#3d5f68","#1a1416","#a3201a","#ef4a2b","#ff8a5c"],scale:.62,warp:3.2,angle:-.5,gloss:.55,veins:.6},dusk:{style:"marble",colors:["#120c18","#3e2850","#8f6c9c","#2b1a24","#b3502f","#eab08a","#fbe7d2"],scale:.75,warp:3.6,angle:.8,gloss:.5,veins:.5},glacier:{style:"streak",colors:["#f7f8fa","#d9e2ea","#9fb4c7","#e8edf2","#bccbd8","#ffffff"],scale:.7,warp:1.6,angle:.35,gloss:.25,veins:0},verdant:{style:"marble",colors:["#070b08","#173024","#4f7a5a","#141812","#a7843a","#e9cf87","#fbf3d6"],scale:.7,warp:3.4,angle:2.1,gloss:.5,veins:.5}};function s(e){let t=e>>>0;return()=>{let e=t=t+0x6d2b79f5>>>0;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/0x100000000}}function n(e){let t=0x811c9dc5;for(let a=0;a<e.length;a++)t=Math.imul(t^e.charCodeAt(a),0x1000193);return t>>>0}let i=new Map,o=[],l=!1;function d({art:e,seed:n,w:c,h:f,density:h,priority:p,className:g}){let m=a.useRef(null),[u,x]=a.useState(!1),b=JSON.stringify("string"==typeof e?r[e]:e),y=Math.round(c*h),v=Math.round(f*h);return a.useEffect(()=>{var e;let t,a,r=!0;return x(!1),(e=JSON.parse(b),t=JSON.stringify([e,n,y,v]),!(a=i.get(t))&&(a=new Promise(t=>{let a,r,i,d,c,f,h,g,m,u,x,b,w,j,k,N,M,$,C,S,A,F,B,E,P,R,T=o.length;for(;T>1&&o[T-1].priority>p;)T--;o.splice(T,0,{job:(a=Math.max(1,Math.round(y)),r=Math.max(1,Math.round(v)),d=(i=e.colors.length>=2?e.colors:["#111111","#eeeeee"]).map((e,t)=>{let a,r;return{t:t/(i.length-1),c:(3===(a=e.trim().replace(/^#/,"")).length&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]),[(r=/^[0-9a-f]{6}$/i.test(a)?parseInt(a,16):8421504)>>16&255,r>>8&255,255&r])}}),c=e.scale??.7,f=e.warp??3,h=e.gloss??.4,g=e.veins??0,m="streak"===e.style,u=function(e){let t=s(e),a=new Uint8Array(512),r=new Float32Array(512),n=[];for(let e=0;e<256;e++)n.push(e);for(let e=255;e>0;e--){let a=Math.floor(t()*(e+1)),r=n[e];n[e]=n[a],n[a]=r}for(let e=0;e<512;e++)a[e]=n[255&e];for(let e=0;e<256;e++){let a=t()*Math.PI*2;r[2*e]=Math.cos(a),r[2*e+1]=Math.sin(a)}let i=(e,t)=>{let s=Math.floor(e),n=Math.floor(t),i=e-s,o=t-n,l=255&s,d=255&n,c=2*a[l+a[d]],f=2*a[l+1+a[d]],h=2*a[l+a[d+1]],p=2*a[l+1+a[d+1]],g=r[c]*i+r[c+1]*o,m=r[f]*(i-1)+r[f+1]*o,u=r[h]*i+r[h+1]*(o-1),x=r[p]*(i-1)+r[p+1]*(o-1),b=i*i*i*(i*(6*i-15)+10);return g+b*(m-g)+o*o*o*(o*(6*o-15)+10)*(u-g+b*(x-u-m+g))};return(e,t,a)=>{let r=0,s=.5;for(let n=0;n<a;n++){r+=s*i(e,t);let a=1.6*e+1.2*t+7.1;t=-1.2*e+1.6*t+3.3,e=a,s*=.5}return r}}(977*n+13),b=50*(x=s(n+1))(),w=50*x(),k=Math.cos(j=(e.angle??0)+(x()-.5)*.5),N=Math.sin(j),M=Math.min(a,r),S=new Float32Array(($=Math.ceil(a/2)+3)*(C=Math.ceil(r/2)+3)),A=new Float32Array($*C),F=new Float32Array(a*r),B=new Float32Array(a*r),E=new Uint8ClampedArray(a*r*4),P=0,R=e=>{for(let t=0;t<$;t++){let s=((t-1)*2-a/2)/M,n=((e-1)*2-r/2)/M,i=(s*k-n*N)*c,o=(s*N+n*k)*c;m&&(i*=.14,o*=2.2);let l=u(i+=b,o+=w,3),d=u(i+5.2,o+1.3,3),h=u(i+f*l+1.7,o+f*d+9.2,3),p=u(i+f*l+8.3,o+f*d+2.8,3);S[e*$+t]=u(i+f*h,o+f*p,4),A[e*$+t]=Math.sqrt(l*l+d*d)}},{width:a,height:r,pixels:E,step:e=>{if(P>=C)return!0;let t=Math.min(C,P+Math.max(1,e));for(;P<t;)R(P++);return!(P<C)&&((()=>{let e=(e,t,a,r)=>(-e+9*t+9*a-r)/16,t=new Float32Array(a*C);for(let r=0;r<C;r++){let s=r*$;for(let n=0;n<a;n++){let i=(n>>1)+1;t[r*a+n]=1&n?e(S[s+i-1],S[s+i],S[s+i+1],S[s+i+2]):S[s+i]}}for(let s=0;s<r;s++){let r=(s>>1)+1;for(let n=0;n<a;n++){F[s*a+n]=1&s?e(t[(r-1)*a+n],t[r*a+n],t[(r+1)*a+n],t[(r+2)*a+n]):t[r*a+n];let i=(n>>1)+1,o=A[r*$+i],l=1&n?(o+A[r*$+i+1])/2:o,d=1&s?1&n?(A[(r+1)*$+i]+A[(r+1)*$+i+1])/2:A[(r+1)*$+i]:l;B[s*a+n]=(l+d)/2}}})(),(()=>{let e=[],t=Math.max(1,Math.floor(F.length/4096));for(let a=0;a<F.length;a+=t)e.push(F[a]);e.sort((e,t)=>e-t);let s=e[Math.floor(.02*e.length)],n=1/(e[Math.floor(.98*e.length)]-s||1),i=n*M*.012;for(let e=0;e<r;e++)for(let t=0;t<a;t++){let o=e*a+t,l=(F[o]-s)*n;l=l<0?0:l>1?1:l;let c=1;for(;c<d.length-1&&d[c].t<l;)c++;let f=d[c-1],p=d[c],m=(l-f.t)/(p.t-f.t||1);m=(m=m<0?0:m>1?1:m)*m*(3-2*m);let u=(F[t<a-1?o+1:o]-F[t>0?o-1:o])*i,x=(F[e<r-1?o+a:o]-F[e>0?o-a:o])*i,b=(-(-.55*u)- -.65*x+.52)/Math.sqrt(u*u+x*x+1),y=Math.pow(b>0?b:0,24)*h*255,v=(.82+.28*b)*(1+.035*Math.sin(150*l+24*B[o]))*(1-g*Math.max(0,1-14*Math.abs(B[o]-.42))*.6);E[4*o]=(f.c[0]+(p.c[0]-f.c[0])*m)*v+y,E[4*o+1]=(f.c[1]+(p.c[1]-f.c[1])*m)*v+y,E[4*o+2]=(f.c[2]+(p.c[2]-f.c[2])*m)*v+y,E[4*o+3]=255}})(),!0)}}),priority:p,done:t}),function(){if(l)return;l=!0;let e=()=>{let t=performance.now()+7;for(;o.length&&performance.now()<t;){let e=o[0];if(e.job.step(4)){o.shift();let t=document.createElement("canvas");t.width=e.job.width,t.height=e.job.height,t.getContext("2d")?.putImageData(new ImageData(e.job.pixels,t.width,t.height),0,0),e.done(t)}}o.length?requestAnimationFrame(e):l=!1};requestAnimationFrame(e)}()}),i.set(t,a)),a).then(e=>{let t=m.current;r&&t&&(t.width=e.width,t.height=e.height,t.getContext("2d")?.drawImage(e,0,0),x(!0))}),()=>{r=!1}},[b,n,y,v,p]),(0,t.jsx)("canvas",{ref:m,"aria-hidden":"true",className:g,"data-ready":u||void 0,style:{width:c,height:f,maxWidth:"none"}})}let c="M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z",f="M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 176A22 22 0 0 1 318 198L22 198A22 22 0 0 1 0 176Z",h=[{name:"Cover — final",meta:"PNG · 4.8 MB",art:"ember"},{name:"Moodboard",meta:"24 images",art:"dusk"},{name:"Brief.pdf",meta:"PDF · 1.2 MB"}];function p({label:e="My Files",meta:r,tone:i="light",art:o="aurora",seed:l=3,image:m,files:u=h,action:x="add",onAdd:b,onFilesChange:y,menu:v=[],labelPlacement:w="bottom-left",open:j,defaultOpen:k=!1,onOpenChange:N,onFileSelect:M,width:$=340,appear:C=!0,appearDelay:S=0,className:A,style:F}){let B=a.useId().replace(/:/g,""),E=a.useRef(null),P=a.useRef(null),R=a.useRef(null),T=a.useRef(null),L=a.useRef(null),[z,I]=a.useState(u),q=a.useRef(u.map((e,t)=>t)),_=a.useRef(u.length),[O,D]=a.useState(null),[Y,H]=a.useState(0),[U,W]=a.useState(k),G=j??U,J=a.useCallback(e=>{void 0===j&&W(e),N?.(e)},[j,N]),[X,K]=a.useState(!1),[Q,V]=a.useState(!C),Z=$/340,ee=Math.min(1.5,Math.max(1,window.devicePixelRatio||1))*Z;a.useEffect(()=>{if(!C)return;let e=E.current;if(!e||"u"<typeof IntersectionObserver)return void V(!0);let t=0,a=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(a.disconnect(),t=window.setTimeout(()=>V(!0),S))},{threshold:.25});return a.observe(e),()=>{a.disconnect(),window.clearTimeout(t)}},[C,S]),a.useEffect(()=>{let e=E.current;if(!e)return;let t=0,a=0,r=0,s=()=>{t=0,e.style.setProperty("--gf-px",a.toFixed(3)),e.style.setProperty("--gf-py",r.toFixed(3))},n=n=>{if("touch"===n.pointerType)return;let i=e.getBoundingClientRect();a=(n.clientX-i.left)/i.width*2-1,r=(n.clientY-i.top)/i.height*2-1,t||(t=requestAnimationFrame(s))},i=()=>{a=0,r=0,t||(t=requestAnimationFrame(s))};return e.addEventListener("pointermove",n),e.addEventListener("pointerleave",i),()=>{e.removeEventListener("pointermove",n),e.removeEventListener("pointerleave",i),cancelAnimationFrame(t)}},[]),a.useEffect(()=>{P.current?.toggleAttribute("inert",!G)},[G]),a.useEffect(()=>{if(!G&&!X)return;let e=e=>{"Escape"===e.key&&(X?(K(!1),T.current?.focus()):(J(!1),R.current?.focus()))},t=e=>{let t=e.target;!X||L.current?.contains(t)||T.current?.contains(t)||K(!1),!G||X||E.current?.contains(t)||J(!1)};return document.addEventListener("keydown",e),document.addEventListener("pointerdown",t),()=>{document.removeEventListener("keydown",e),document.removeEventListener("pointerdown",t)}},[G,X,J]),a.useEffect(()=>{X&&L.current?.querySelector("[role=menuitem]")?.focus()},[X]);let et=[{label:G?"Close folder":"Open folder",onSelect:()=>J(!G)},...v],ea=Math.max(0,z.length-4),er=z.slice(ea),es=z.length,en=r??es+(1===es?" item":" items");return(0,t.jsxs)("div",{ref:E,className:"gf-root"+(A?" "+A:""),"data-tone":i,"data-open":G||void 0,"data-entered":Q||void 0,"data-place":w,style:{width:$,height:326*Z,...F},children:[(0,t.jsx)("style",{children:g}),(0,t.jsx)("div",{className:"gf-stage",style:{transform:"translateY("+54*Z+"px) scale("+Z+")"},children:(0,t.jsxs)("div",{className:"gf-tilt",children:[(0,t.jsx)("div",{className:"gf-shadow","aria-hidden":"true"}),(0,t.jsxs)("div",{className:"gf-back",style:{clipPath:"path('"+c+"')"},"aria-hidden":"true",children:[m?(0,t.jsx)("img",{className:"gf-art",src:m,alt:"",width:364,height:296,draggable:!1}):"none"!==o?(0,t.jsx)(d,{className:"gf-art",art:o,seed:l,w:364,h:296,density:ee,priority:0}):null,(0,t.jsx)("div",{className:"gf-back-sheen"})]}),(0,t.jsx)("svg",{className:"gf-rim gf-back-rim",viewBox:"0 0 340 272","aria-hidden":"true",children:(0,t.jsx)("path",{d:c})}),(0,t.jsxs)("div",{className:"gf-front"+(Y?" gf-front--bump":""),style:{clipPath:"path('"+f+"')"},children:[(0,t.jsx)("div",{className:"gf-tint","aria-hidden":"true"}),(0,t.jsx)("div",{className:"gf-spec","aria-hidden":"true"}),(0,t.jsxs)("svg",{className:"gf-rim gf-front-rim",viewBox:"0 0 340 198","aria-hidden":"true",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:"gf-rim-"+B,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0",stopColor:"#fff",stopOpacity:"0.95"}),(0,t.jsx)("stop",{offset:"0.35",stopColor:"#fff",stopOpacity:"0.35"}),(0,t.jsx)("stop",{offset:"1",stopColor:"#fff",stopOpacity:"0.12"})]})}),(0,t.jsx)("path",{d:f,stroke:"url(#gf-rim-"+B+")"})]}),(0,t.jsx)("button",{ref:R,type:"button",className:"gf-hit","aria-expanded":G,"aria-label":(G?"Close ":"Open ")+e+", "+es+(1===es?" item":" items"),onClick:()=>{K(!1),J(!G)}}),(0,t.jsxs)("div",{className:"gf-label",children:[(0,t.jsx)("span",{className:"gf-title",children:e}),(0,t.jsx)("span",{className:"gf-meta",children:en},en)]})]},Y),(0,t.jsx)("div",{ref:P,className:"gf-files",role:"list","aria-label":e+" contents",children:er.map((e,a)=>{var r;let i=q.current[ea+a],o=(r=er.length)<=1?0:a/(r-1)*2-1,l=s(n(e.name)+i),c=!!(e.art||e.image),f=(0,t.jsxs)(t.Fragment,{children:[c?e.image?(0,t.jsx)("img",{className:"gf-sheet-art",src:e.image,alt:"",width:272,height:184,draggable:!1}):(0,t.jsx)(d,{className:"gf-sheet-art",art:e.art,seed:n(e.name)%997,w:272,h:184,density:Math.min(ee,1.25),priority:1}):(0,t.jsxs)("span",{className:"gf-lines","aria-hidden":"true",children:[(0,t.jsx)("i",{style:{width:"86%"}}),(0,t.jsx)("i",{style:{width:"92%"}}),(0,t.jsx)("i",{style:{width:"64%"}}),(0,t.jsx)("i",{style:{width:"88%"}}),(0,t.jsx)("i",{style:{width:"42%"}})]}),(0,t.jsxs)("span",{className:"gf-sheet-head",children:[(0,t.jsx)("span",{className:"gf-sheet-name",children:e.name}),e.meta?(0,t.jsx)("span",{className:"gf-sheet-meta",children:e.meta}):null]})]}),h={className:"gf-sheet"+(c?" gf-sheet--art":"")+(i===O?" gf-sheet--drop":""),style:{"--gf-slot":o,"--gf-depth":er.length-1-a,"--gf-jx":((l()-.5)*10).toFixed(2)+"px","--gf-jr":((l()-.5)*3.2).toFixed(2)+"deg",zIndex:a+1},onAnimationEnd:i===O?()=>D(null):void 0};return(0,t.jsx)("div",{role:"listitem",className:"gf-sheet-slot",children:e.href?(0,t.jsx)("a",{...h,href:e.href,onClick:()=>M?.(e,ea+a),children:f}):(0,t.jsx)("button",{...h,type:"button",onClick:()=>M?.(e,ea+a),children:f})},i)})}),"none"!==x?(0,t.jsx)("button",{ref:T,type:"button",className:"gf-key gf-key--"+x,"aria-label":"add"===x?"Add a file to "+e:"More options for "+e,"aria-haspopup":"more"===x?"menu":void 0,"aria-expanded":"more"===x?X:void 0,"aria-controls":"more"===x?"gf-menu-"+B:void 0,onClick:()=>{let e,t,a;return"add"===x?(e=b?.(z)||{name:"Untitled "+(z.length+1),meta:"Just now"},t=[...z,e],a=_.current++,void(q.current=[...q.current,a],I(t),D(a),H(e=>e+1),y?.(t))):K(e=>!e)},children:"add"===x?(0,t.jsx)("svg",{className:"gf-glyph gf-glyph--plus",viewBox:"0 0 24 24","aria-hidden":"true",children:(0,t.jsx)("path",{d:"M12 4.5v15M4.5 12h15"})},Y):(0,t.jsxs)("svg",{className:"gf-glyph gf-glyph--more",viewBox:"0 0 30 12","aria-hidden":"true",children:[(0,t.jsx)("rect",{x:"1",y:"1.5",width:"8",height:"9",rx:"3.4"}),(0,t.jsx)("rect",{x:"11",y:"1.5",width:"8",height:"9",rx:"3.4"}),(0,t.jsx)("rect",{x:"21",y:"1.5",width:"8",height:"9",rx:"3.4"})]})}):null,"more"===x?(0,t.jsx)("div",{ref:L,id:"gf-menu-"+B,role:"menu","aria-label":e+" options",className:"gf-menu","data-open":X||void 0,onKeyDown:e=>{let t=Array.from(L.current?.querySelectorAll("[role=menuitem]")??[]),a=t.indexOf(document.activeElement),r=a=>{e.preventDefault(),t[(a+t.length)%t.length]?.focus()};"ArrowDown"===e.key?r(a+1):"ArrowUp"===e.key?r(a-1):"Home"===e.key?r(0):"End"===e.key?r(t.length-1):"Tab"===e.key&&K(!1)},children:et.map((e,a)=>(0,t.jsx)("button",{type:"button",role:"menuitem",tabIndex:X?-1:void 0,disabled:!X,className:"gf-menu-item"+(e.danger?" gf-menu-item--danger":""),onClick:()=>{K(!1),T.current?.focus(),e.onSelect?.()},children:e.label},e.label+a))}):null]})})]})}let g=`
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
`,m={style:"marble",colors:["#FFF0F6","#FFD6E7","#FF8FBF","#FF3D8B","#C2185B","#FFE6F0","#FFFFFF"],scale:.7,warp:2.6,angle:-.5,gloss:.35,veins:.15};e.s(["FolderSlot",0,function({folder:e,delay:r}){let s=(0,a.useRef)(null),[n,i]=(0,a.useState)(0);return(0,a.useEffect)(()=>{let e=s.current;if(!e)return;let t=new ResizeObserver(([e])=>i(Math.round(Math.min(380,e.contentRect.width))));return t.observe(e),()=>t.disconnect()},[]),(0,t.jsx)("div",{ref:s,className:"flex w-full justify-center",style:{minHeight:n?void 0:"22rem"},children:n>0&&(0,t.jsx)(p,{label:e.label,meta:e.meta,tone:"light",art:e.image?"none":m,image:e.image,seed:7,action:"none",width:n,appearDelay:r,files:e.files.map(e=>({name:e.name,meta:e.meta,href:e.href,image:e.image}))})})}],6764)},90390,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(46607),s=e.i(40462);e.s(["HeroMotion",0,function({className:e,children:n}){let i=(0,a.useRef)(null);return(0,r.f)(i,()=>{let e={trigger:i.current,start:"top top",end:"bottom top",scrub:!0};s.f.to("[data-hero-media]",{yPercent:8,ease:"none",scrollTrigger:e}),s.f.to("[data-hero-copy]",{yPercent:-18,ease:"none",scrollTrigger:e}),s.f.to("[data-hero-leads]",{y:-120,ease:"none",scrollTrigger:e}),s.f.to("[data-hero-sticker]",{y:160,rotate:10,ease:"none",scrollTrigger:e})}),(0,t.jsx)("section",{ref:i,className:e,children:n})}])},56967,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(89664),s=e.i(46607),n=e.i(40462),i=e.i(32361);let o=[{pain:"An agency that learns your trade on your dime",promise:"Plumbers only"},{pain:"Your website held hostage if you ever leave",promise:"You own your website"},{pain:"A sales pitch before a straight answer",promise:"Free 30-minute strategy call"},{pain:"Reports full of jargon nobody reads",promise:"Reports in plain English"},{pain:"No idea which calls came from the website",promise:"Calls, forms and leads tracked"},{pain:"They vanish the day the site goes live",promise:"Support after launch"},{pain:"Projects that drag on with no end date",promise:"A timeline before we start"}];e.s(["Promises",0,function(){let e=(0,a.useRef)(null);return(0,s.f)(e,()=>{n.f.utils.toArray("[data-row]").forEach(e=>{n.f.timeline({scrollTrigger:{trigger:e,start:"top 82%",once:!0}}).from(e.querySelector("[data-pain]"),{autoAlpha:0,x:-16,duration:.4,ease:"power2.out"}).from(e.querySelector("[data-promise]"),{xPercent:12,autoAlpha:0,rotate:3,duration:.55,ease:"back.out(1.6)"},"<0.1")}),n.f.from("[data-panel-bobo]",{y:60,rotate:-12,ease:"back.out(1.4)",duration:.9,scrollTrigger:{trigger:"[data-panel]",start:"top 75%",toggleActions:"play none none reverse"}})}),(0,t.jsxs)("section",{ref:e,"aria-labelledby":"promise-h",className:"relative overflow-x-clip bg-white pt-52 pb-28 md:pt-72 md:pb-36",children:[(0,t.jsx)("div",{"aria-hidden":!0,className:"pointer-events-none absolute top-24 left-[-10%] -z-0 aspect-square w-[min(44rem,70vw)] rounded-full bg-sky"}),(0,t.jsxs)("div",{className:"container-x relative grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16",children:[(0,t.jsxs)("div",{className:"lg:sticky lg:top-32 lg:self-start",children:[(0,t.jsxs)("h2",{id:"promise-h",className:"display text-t1",children:["No runaround. ",(0,t.jsx)("span",{className:"accent",children:"Just more booked jobs."})]}),(0,t.jsx)("p",{className:"mt-6 max-w-md text-t3 text-slate md:text-t2",children:"You have heard the agency pitch before. Here is what changes when you work with me, in plain English."}),(0,t.jsx)("div",{className:"mt-9 hidden lg:block",children:(0,t.jsx)(i.f,{})})]}),(0,t.jsxs)("div",{"data-panel":!0,className:"relative mt-14 lg:mt-0 lg:-mr-[clamp(1rem,2.2vw,2.5rem)]",children:[(0,t.jsx)("img",{"data-panel-bobo":!0,src:"/brand/bobo-full.webp",alt:"Bobo the duck",width:480,height:549,loading:"lazy",decoding:"async",className:"absolute -top-[5.25rem] right-6 w-28 md:-top-[9.5rem] md:w-36"}),(0,t.jsxs)("div",{className:"relative z-10 rounded-3xl bg-ink px-5 pt-8 pb-8 text-white shadow-[12px_12px_0_var(--color-ribbon)] md:px-10 md:pt-10 md:pb-12 lg:rounded-r-none",children:[(0,t.jsxs)("div",{"aria-hidden":!0,className:"mb-6 grid gap-3 border-b border-white/10 pb-6 md:mb-8 md:grid-cols-2 md:gap-8 md:pb-8",children:[(0,t.jsx)("div",{className:"fit-box",children:(0,t.jsx)("p",{className:"fit-title tall display text-mist [--fit:11.2] [letter-spacing:1.7cqi]",children:"OTHER AGENCIES"})}),(0,t.jsx)("div",{className:"fit-box",children:(0,t.jsxs)("p",{className:"fit-title tall display text-white [--fit:11.2]",children:["PLUMBER ",(0,t.jsx)("span",{className:"text-ribbon",children:"KING"})," AGENCY"]})})]}),(0,t.jsx)("h3",{className:"sr-only",children:"Other agencies compared with Plumber King Agency"}),(0,t.jsx)("ol",{className:"relative",children:o.map((e,a)=>(0,t.jsxs)("li",{"data-row":!0,className:"grid gap-2 border-b border-white/10 py-5 first:pt-0 last:border-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-8",children:[(0,t.jsxs)("p",{className:"relative self-start text-t3 text-mist md:self-center",children:[(0,t.jsx)("span",{"data-pain":!0,children:e.pain}),(0,t.jsx)("span",{className:"sr-only",children:" (not with us)"})]}),(0,t.jsxs)("p",{"data-promise":!0,className:"flex items-center gap-3 text-t2 font-bold",children:[(0,t.jsx)("span",{className:`grid h-9 w-9 shrink-0 place-items-center rounded-full ${a%2?"bg-white text-ink":"bg-ribbon-deep text-white"}`,children:(0,t.jsx)(r.f,{className:"h-5 w-5","aria-hidden":!0})}),e.promise]})]},e.promise))})]})]}),(0,t.jsx)("div",{className:"flex justify-center lg:hidden",children:(0,t.jsx)(i.f,{})})]})]})}])},93850,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(56420);let s={name:"chevrons-left-right",size:24,node:[["path",{d:"m9 7-5 5 5 5",key:"j5w590"}],["path",{d:"m15 7 5 5-5 5",key:"1bl6da"}]]};s.node;let n=(0,r.f)(s);var i=e.i(63676),o=e.i(46607),l=e.i(40462),d=e.i(96199),c=e.i(44803);let f=["Template look, same as every competitor","Phone number buried in the footer","No reason to trust you over the next guy","Slow on a phone with one bar of signal"],h=["Built around the jobs you want more of","Call button under every thumb","Reviews, photos and promises up front","Loads fast on any phone"];function p({src:e,label:a}){return(0,t.jsx)("img",{src:e,alt:a,width:1296,height:768,loading:"lazy",decoding:"async",className:"h-full w-full object-cover object-top",draggable:!1})}function g({value:e,onValueChange:r,before:s,after:i}){let o=(0,a.useRef)(null),l=(0,a.useId)(),d=Math.max(0,Math.min(100,e)),c=e=>{let t=o.current.getBoundingClientRect();t.width&&r(Math.round(Math.max(0,Math.min(100,(e-t.left)/t.width*100))))};return(0,t.jsxs)("figure",{children:[(0,t.jsxs)("div",{ref:o,className:"relative aspect-[4/3] cursor-ew-resize touch-pan-y overflow-hidden rounded-xl border-4 border-ink bg-white shadow-[12px_12px_0_var(--color-ink)] select-none sm:aspect-[27/16]",onPointerDown:e=>{0===e.button&&(e.currentTarget.setPointerCapture(e.pointerId),c(e.clientX))},onPointerMove:e=>{e.currentTarget.hasPointerCapture(e.pointerId)&&c(e.clientX)},onPointerUp:e=>{e.currentTarget.hasPointerCapture(e.pointerId)&&e.currentTarget.releasePointerCapture(e.pointerId)},children:[(0,t.jsx)("div",{className:"absolute inset-0","aria-hidden":!0,children:i}),(0,t.jsx)("div",{className:"absolute inset-0","aria-hidden":!0,style:{clipPath:`inset(0 ${100-d}% 0 0)`},children:s}),(0,t.jsxs)("span",{"aria-hidden":!0,className:"pointer-events-none absolute inset-0",style:{transform:`translate3d(${d}%,0,0)`},children:[(0,t.jsx)("span",{className:"absolute inset-y-0 left-0 w-[3px] -translate-x-1/2 bg-ink"}),(0,t.jsx)("span",{className:"absolute top-1/2 left-0 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md border-2 border-ink bg-white text-ink shadow-[3px_3px_0_var(--color-ink)]",children:(0,t.jsx)(n,{className:"h-5 w-5"})})]})]}),(0,t.jsx)("label",{htmlFor:l,className:"sr-only",children:"Compare a typical plumber website with a Plumber King website"}),(0,t.jsx)("input",{id:l,type:"range",min:0,max:100,value:d,onChange:e=>r(Number(e.target.value)),"aria-valuetext":`${d}% typical site shown`,className:"mt-4 h-11 w-full cursor-pointer accent-[var(--color-ribbon)]"})]})}e.s(["ProblemSplit",0,function(){let e=(0,a.useRef)(null),[r,s]=(0,a.useState)(72);return(0,o.f)(e,()=>{let e={v:92};l.f.to(e,{v:50,duration:1.4,ease:"power3.inOut",onUpdate:()=>s(Math.round(e.v)),scrollTrigger:{trigger:"[data-compare]",start:"top 70%",once:!0}})}),(0,t.jsxs)("section",{ref:e,className:"relative isolate overflow-x-clip bg-ivory py-24 md:py-32","aria-labelledby":"problem-h",children:[(0,t.jsx)(c.TrailLayer,{tone:"pink"}),(0,t.jsx)("div",{"aria-hidden":!0,className:"hero-dots pointer-events-none absolute top-16 right-0 h-72 w-[34%]"}),(0,t.jsxs)("div",{className:"container-x relative",children:[(0,t.jsx)(d.f,{className:"ps-head fit-box",children:(0,t.jsxs)("h2",{id:"problem-h",className:"display ps-title",children:[(0,t.jsx)("span",{className:"ps-l",children:"Your website"})," ",(0,t.jsx)("span",{className:"ps-l ps-r",children:"rings a phone."})," ",(0,t.jsxs)("span",{className:"accent",children:[(0,t.jsx)("span",{className:"ps-l",children:"Yours, or the"})," ",(0,t.jsxs)("span",{className:"ps-l ps-r",children:["other guy's",(0,t.jsx)("span",{"data-trail-end":"",children:"."})]})]})]})}),(0,t.jsxs)("div",{className:"relative mt-14 lg:mt-20",children:[(0,t.jsx)("div",{"data-compare":!0,children:(0,t.jsx)(g,{value:r,onValueChange:s,before:(0,t.jsx)(p,{src:"/work/ridgeline-before.webp",label:"Typical plumber website"}),after:(0,t.jsx)(p,{src:"/work/ridgeline-after.webp",label:"Rebuilt plumber website"})})}),(0,t.jsxs)(d.f,{className:"relative z-10 mt-8 rounded-xl border-2 border-ink/15 bg-white p-6 shadow-[6px_6px_0_rgb(20_20_20/0.12)] lg:absolute ps-card-l lg:mt-0 lg:w-[22rem] lg:-rotate-2",children:[(0,t.jsx)("h3",{className:"display text-t2 text-slate uppercase",children:"Random plumbing agency"}),(0,t.jsx)("ul",{className:"mt-4 space-y-2.5",children:f.map(e=>(0,t.jsxs)("li",{className:"flex gap-3 text-t3 text-slate",children:[(0,t.jsx)(i.X,{className:"mt-1 h-4 w-4 shrink-0 text-royal","aria-hidden":!0}),e]},e))})]}),(0,t.jsx)(d.f,{delay:.1,className:"relative z-10 mt-6 lg:absolute lg:top-[42%] ps-card-r lg:mt-0 lg:w-[22rem]",children:(0,t.jsxs)("div",{className:"ring-card rounded-xl border-2 border-ink bg-white p-6 shadow-[8px_8px_0_var(--color-ribbon)] lg:rotate-2",children:[(0,t.jsxs)("h3",{className:"display text-t2 uppercase",children:["Plumber ",(0,t.jsx)("span",{className:"text-royal",children:"King"})," Agency"]}),(0,t.jsx)("ul",{className:"mt-4 space-y-2.5",children:h.map(e=>(0,t.jsxs)("li",{className:"flex gap-3 text-t3",children:[(0,t.jsx)("span",{"aria-hidden":!0,className:"duck-tick mt-0.5"}),e]},e))})]})})]})]}),(0,t.jsx)(c.TrailLayer,{tone:"pink",over:!0})]})}],93850)},88424,e=>{var t=e.i(43476),a=e.i(56420);let r={name:"calendar-check",size:24,node:[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"m9 15 2 2 4-4",key:"1grp1n"}]]};r.node;let s=(0,a.f)(r),n={name:"map-pin",size:24,node:[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]};n.node;let i=(0,a.f)(n),o={name:"phone-call",size:24,node:[["path",{d:"M13 2a9 9 0 0 1 9 9",key:"1itnx2"}],["path",{d:"M13 6a5 5 0 0 1 5 5",key:"11nki7"}],["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]};o.node;let l=(0,a.f)(o),d={name:"search",size:24,node:[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]};d.node;let c=(0,a.f)(d);var f=e.i(84026),h=e.i(71645);function p({steps:e,places:a,height:r,className:s,lastCardAttr:n}){let i=(0,h.useRef)(null),[o,l]=(0,h.useState)("");return(0,h.useLayoutEffect)(()=>{let e=i.current;if(!e)return;let t=()=>{if(window.innerWidth<1024)return l("");let t=Array.from(e.querySelectorAll("[data-how-card]")),a=(e,t,a,r,s)=>{let n=(parseFloat(getComputedStyle(e).rotate)||0)*(Math.PI/180),i=Math.cos(n),o=Math.sin(n);return{x:e.offsetLeft+e.offsetWidth/2+t*i-a*o,y:e.offsetTop+e.offsetHeight/2+t*o+a*i,n:[r*i-s*o,r*o+s*i]}},r=(e,t)=>a(e,(t?1:-1)*(e.offsetWidth/2+(t?18:10)),-.05*e.offsetHeight,t?1:-1,0),s=e=>e.toFixed(1),n="";for(let e=0;e<t.length-1;e++){let i=t[e],o=t[e+1],l=o.offsetLeft>i.offsetLeft,d=r(i,l),c=r(o,!l),f=Math.max(40,(c.x-d.x)*(l?1:-1)*.5),h=f;(c.x-d.x)*(l?1:-1)<40&&(d=a(i,(l?1:-1)*.3*i.offsetWidth,i.offsetHeight/2+18,0,1),f=Math.max(50,.6*Math.abs(c.y-d.y)),h=Math.max(50,.6*Math.abs(c.x-d.x))),n+=`M ${s(d.x)} ${s(d.y)} C ${s(d.x+d.n[0]*f)} ${s(d.y+d.n[1]*f)}, ${s(c.x+c.n[0]*h)} ${s(c.y+c.n[1]*h)}, ${s(c.x)} ${s(c.y)} `}l(n.trim())};t();let a=new ResizeObserver(t);return a.observe(e),document.fonts?.ready.then(t),()=>a.disconnect()},[]),(0,t.jsxs)("div",{ref:i,className:`relative mx-auto flex w-full max-w-[1588px] flex-col gap-12 lg:block lg:h-[var(--how-h)] ${s??""}`,style:{"--how-h":`${r}px`},children:[o?(0,t.jsx)("svg",{"aria-hidden":!0,className:"pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block",children:(0,t.jsx)("path",{d:o,className:"how-dash",fill:"none",stroke:"var(--color-ribbon)",strokeOpacity:"0.6",strokeWidth:"2.5",strokeDasharray:"10 8",strokeLinecap:"round"})}):null,e.map((r,s)=>{let i=a[s%a.length],o=r.icon;return(0,t.jsxs)("article",{"data-how-card":"",...s===e.length-1&&n?{[n]:""}:{},className:`how-card relative z-10 w-[86%] max-w-[24rem] lg:absolute lg:mx-0 lg:w-[300px] lg:max-w-none ${s%2?"ml-auto":""}`,style:{"--tilt":`${i.tilt}deg`,"--top":`${i.top}px`,"--k":i.k},children:[(0,t.jsx)("span",{"aria-hidden":!0,className:"how-peg"}),(0,t.jsxs)("div",{className:"rounded-[1.5rem] border-2 border-ink bg-white p-6 shadow-[8px_8px_0_var(--color-ribbon)]",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,t.jsx)("span",{"aria-hidden":!0,className:"display text-t1 leading-[0.85] text-ink",children:String(s+1).padStart(2,"0")}),(0,t.jsx)("span",{"aria-hidden":!0,className:"grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ribbon text-white",children:(0,t.jsx)(o,{className:"h-6 w-6"})})]}),(0,t.jsxs)("h3",{className:"display mt-5 text-t2 text-ink",children:[(0,t.jsxs)("span",{className:"text-ribbon",children:[r.word,"."]})," ",r.title]}),(0,t.jsx)("p",{className:"mt-2 text-t3 text-slate",children:r.body})]})]},r.word)})]})}var g=e.i(44803),m=e.i(89860);let u=[{word:"Found",icon:c,title:"They search. You show up.",body:"“Emergency plumber near me.” Whether they ask Google or an AI assistant, your service pages and Google Business Profile put you in the answers."},{word:"Chosen",icon:i,title:"You stand out from the list.",body:"Your Google profile looks like the pro in town: real photos, hours, services and reviews, so they pick you over the plumber next to you."},{word:"Trusted",icon:f.f,title:"They land. They trust you in seconds.",body:"Real photos of you and your trucks, your real reviews and what makes you different, right where a worried homeowner looks first."},{word:"Called",icon:l,title:"They tap. Your phone rings.",body:"A call button under every thumb and a two-field quote form for the people who would rather type."},{word:"Booked",icon:s,title:"You call back first. The job is yours.",body:"Every call and quote request lands on your phone straight away, so you get the job before they call someone else."}],x=[{top:0,k:-.924,tilt:8},{top:120,k:1,tilt:-8},{top:533,k:-.635,tilt:8},{top:608,k:.661,tilt:-8},{top:970,k:-.048,tilt:8}];e.s(["StoryScroll",0,function(){return(0,t.jsxs)("section",{className:"relative isolate overflow-x-clip bg-sky pt-24 pb-40 md:pt-32 md:pb-48","aria-labelledby":"story-h",children:[(0,t.jsx)(g.TrailLayer,{tone:"white"}),(0,t.jsx)(m.WalkingBobo,{}),(0,t.jsxs)("div",{className:"container-x relative",children:[(0,t.jsxs)("h2",{id:"story-h",className:"display text-center text-t1",children:["From invisible to ",(0,t.jsx)("span",{className:"accent story-booked",children:"booked."})]}),(0,t.jsx)(p,{steps:u,places:x,height:1330,className:"mt-16 lg:mt-24",lastCardAttr:"data-trail-start"})]})]})}],88424)},44803,e=>{var t=e.i(43476),a=e.i(71645);let r=(0,a.createContext)(null),s=32*Math.PI/180;function n(e){let t=0,a=0,r=e;for(;r;)t+=r.offsetLeft,a+=r.offsetTop,r=r.offsetParent;return{x:t,y:a}}let i=2*Math.PI,o=(e,t)=>[e.c[0]+e.r*Math.cos(t),e.c[1]+e.r*Math.sin(t)],l=(e,t)=>t-e.d*Math.PI/2;function d(e,t){let a=t.c[0]-e.c[0],r=t.c[1]-e.c[1],s=Math.hypot(a,r),n=Math.atan2(r,a),i=Math.max(-1,Math.min(1,(t.r*t.d-e.r*e.d)/s));for(let a of[n-Math.asin(i),n-Math.PI+Math.asin(i)]){let r=o(e,l(e,a)),s=o(t,l(t,a));if((s[0]-r[0])*Math.cos(a)+(s[1]-r[1])*Math.sin(a)>-1e-6)return a}return n}function c(e,t,a,r=3){let s=e=>e.toFixed(1),n=[],f=!1;for(let t=0;t<e.length-1;t++){let a=e[t],r=e[t+1];Math.abs(r.r*r.d-a.r*a.d)>Math.hypot(r.c[0]-a.c[0],r.c[1]-a.c[1])+1e-6&&(f=!0),n.push(d(a,r))}let h="",p=0,g=null,m=[],u=[];return e.forEach((d,c)=>{let f=0===c?t:l(d,n[c-1]),x=c===e.length-1?a:l(d,n[c]),b=o(d,f);if(g){let e=Math.hypot(b[0]-g[0],b[1]-g[1]),t=Math.ceil(e/r),a=g;for(let r=1;r<=t;r++)m.push({p:[a[0]+(b[0]-a[0])*(r/t),a[1]+(b[1]-a[1])*(r/t)],s:p+r/t*e});p+=e}else m.push({p:b,s:0});if(h+=0===c?`M ${s(b[0])} ${s(b[1])}`:` L ${s(b[0])} ${s(b[1])}`,g=b,!d.r)return;let y=((x-f)*d.d%i+i)%i;d.loop&&y<1.25*Math.PI&&(y+=i),u.push(d.loop?0:y);let v=Math.ceil(d.r*y/r);for(let e=1;e<=v;e++)m.push({p:o(d,f+d.d*y*(e/v)),s:p+d.r*y*(e/v)});p+=d.r*y;let w=Math.max(1,Math.ceil(y/(.9*Math.PI)));for(let e=1;e<=w;e++){let t=o(d,f+d.d*y*(e/w));h+=` A ${s(d.r)} ${s(d.r)} 0 0 ${+(d.d>0)} ${s(t[0])} ${s(t[1])}`,g=t}}),{d:h,len:p,pts:m,sweeps:u,kinked:f}}e.s(["TrailLayer",0,function({tone:e,over:s=!1}){let n=(0,a.useContext)(r),i=(0,a.useRef)(null),o=(0,a.useRef)(null),l=(0,a.useRef)(null),d=(0,a.useRef)(null);return(0,a.useEffect)(()=>{if(n&&i.current&&o.current&&l.current&&d.current)return n.add({el:i.current,svg:o.current,paths:[l.current,d.current],over:s})},[n,s]),(0,t.jsx)("div",{ref:i,"aria-hidden":!0,className:`pointer-events-none absolute inset-0 overflow-hidden ${s?"z-10":"-z-10"}`,children:(0,t.jsx)("svg",{ref:o,className:"absolute left-0 overflow-visible",width:"0",height:"0",children:[l,d].map((a,r)=>(0,t.jsx)("path",{ref:a,fill:"none",stroke:"white"===e?"#ffffff":"#ff3d8b",strokeLinecap:"round",strokeLinejoin:"round",pathLength:1,strokeDasharray:"1 1",style:{strokeDashoffset:1,opacity:0}},r))})})},"TrailRun",0,function({children:e}){let i=(0,a.useRef)(null),o=(0,a.useRef)(new Set),l=(0,a.useRef)(null),f=(0,a.useRef)(()=>{}),h=(0,a.useRef)({add:e=>(o.current.add(e),f.current(),()=>{o.current.delete(e)})});return(0,a.useLayoutEffect)(()=>{let e=i.current;if(!e)return;let t=window.matchMedia("(prefers-reduced-motion: reduce)"),a=()=>{let e=l.current;if(!e)return;let a=1;if(!t.matches){let t=window.innerHeight,r=e.sDoc-.8*t,s=e.eDoc-.5*t;a=Math.min(1,Math.max(0,(window.scrollY-r)/(s-r)))}let[r,s,n]=e.lens,i=a*(r+s+n),d=[Math.min(1,i/r),Math.min(1,Math.max(0,(i-r-s)/n))],c=e.over.map(([e,t])=>[e,Math.min(t,d[1])]).filter(([e,t])=>t>e),f="0 "+c.map(([e,t],a)=>`${e-(a?c[a-1][1]:0)} ${t-e}`).join(" ")+" 2";for(let e of(c.length||(f="0 2"),o.current)){if(e.over){e.paths[0].style.opacity="0",e.paths[1].style.strokeDasharray=f,e.paths[1].style.strokeDashoffset="0",e.paths[1].style.opacity=c.length?"1":"0";continue}e.paths.forEach((e,t)=>{e.style.strokeDashoffset=String(1-d[t]),e.style.opacity=d[t]<.002?"0":"1"})}},r=()=>{let t=e.querySelector("[data-trail-start]"),r=e.querySelector("[data-trail-end]");if(!t||!r)return;let i=e.clientWidth,f=e.offsetHeight,h=n(e),p=i<768?8:13,g=n(t),m=t.offsetWidth,u=t.offsetHeight,x=t.querySelector(":scope > div"),b=x&&parseFloat(getComputedStyle(x).borderBottomRightRadius)||0,y=(parseFloat(getComputedStyle(t).rotate)||0)*(Math.PI/180),v=Math.cos(y),w=Math.sin(y),j=(e,t)=>[e*v-t*w,e*w+t*v],k=b+8+p/2,N=[m/2+8-b+k*Math.SQRT1_2,u/2+8-b+k*Math.SQRT1_2],[M,$]=j(N[0],N[1]),C=[g.x-h.x+m/2+M,g.y-h.y+u/2+$],S=j(Math.SQRT1_2,Math.SQRT1_2),A=getComputedStyle(r),F=document.createElement("canvas").getContext("2d");if(!F)return;F.font=`${A.fontStyle} ${A.fontWeight} ${A.fontSize} ${A.fontFamily}`;let B=F.measureText("."),E=n(r),P=E.y-h.y+B.fontBoundingBoxAscent+(r.offsetHeight-(B.fontBoundingBoxAscent+B.fontBoundingBoxDescent))/2,R=E.x-h.x+(B.actualBoundingBoxRight-B.actualBoundingBoxLeft)/2,T=P-(B.actualBoundingBoxAscent-B.actualBoundingBoxDescent)/2,L=(B.actualBoundingBoxRight+B.actualBoundingBoxLeft)/2,z=[Math.cos(s),-Math.sin(s)],I=[R+z[0]*(L+12+p/2),T+z[1]*(L+12+p/2)],q=e.firstElementChild,_=q?q.offsetHeight:C[1]+200,O=i<768,D=Math.min(72,Math.max(34,.045*i)),Y=Math.min(150,Math.max(56,.085*i)),H=Math.max(80,_-C[1]);I[1];let U={r:2,d:-1,c:[0,0]},W=Math.atan2(S[1],S[0])-U.d*Math.PI/2;U.c=[C[0]-U.r*Math.cos(W),C[1]-U.r*Math.sin(W)];let G=(i-Math.max(p,.012*i)-p/2-I[0])/(1-Math.cos(Math.PI/2-s)),J={r:O?.5*Y:Math.max(.5*Y,Math.min(.85*G,3.2*Y)),d:1,c:[0,0]},X=Math.atan2(-z[1],-z[0])-J.d*Math.PI/2;J.c=[I[0]-J.r*Math.cos(X),I[1]-J.r*Math.sin(X)];let K=Math.min(Y,.45*H),Q=Math.min(1.6*K,(i-C[0])*.3),V=C[0]+1.3*K,Z=Math.max(C[0]+(i-C[0])*.55,V+(K+Q)*1.2),ee=[U,...O?[]:[{c:[V,C[1]+.72*H-K],r:K,d:-1},{c:[Z,C[1]+.05*H+Q],r:Q,d:1}],{c:[Math.max(1.05*i,Z+2*Q),C[1]+(O?-.4:.45)*H],r:0,d:1}],et=Array.from(r.closest("h2")?.querySelectorAll(".ps-l")??[]),ea=e=>{let t=et[e],a=t?n(t):{x:h.x,y:h.y+_};return{x0:a.x-h.x,x1:a.x-h.x+(t?.offsetWidth??0),y:a.y-h.y,h:t?.offsetHeight??100}},er=ea(0),es=ea(1),en=ea(2),ei=es.h,eo={c:[-.05*i,er.y-.2*ei],r:0,d:1},el=Math.min(1.3*D,es.x0/2-24,.42*ei),ed=!O&&el>=30,ec={c:[.5*es.x0,es.y+.5*ei],r:el,d:1,loop:!0},ef=i-Math.max(p,.012*i)-p/2,eh=(e,t)=>{let a=e?.firstChild;if(!e||!a||3!==a.nodeType||t<0)return null;let r=document.createRange();r.setStart(a,t),r.setEnd(a,t+1);let s=r.getBoundingClientRect(),i=e.getBoundingClientRect(),o=n(e),l=o.x-h.x+(s.left-i.left),d=o.y-h.y+(s.top-i.top),c=Math.ceil(s.width)+8,f=Math.ceil(s.height)+8,p=document.createElement("canvas");p.width=c,p.height=f;let g=p.getContext("2d",{willReadFrequently:!0});if(!g)return null;let m=getComputedStyle(e);g.font=`${m.fontStyle} ${m.fontWeight} ${m.fontSize} ${m.fontFamily}`;let u=g.measureText(a.textContent[t]);g.fillText(a.textContent[t],4,4+u.fontBoundingBoxAscent);let x=g.getImageData(0,0,c,f).data;return{x0:l-4,y0:d-4,x1:l+c-4,y1:d+f-4,base:d+u.fontBoundingBoxAscent,ink:(e,t)=>{let a=Math.round(e-l+4),r=Math.round(t-d+4);return a>=0&&r>=0&&a<c&&r<f&&x[(r*c+a)*4+3]>110}}},ep=et[0]?.textContent??"",eg=(et[1]?.textContent??"").indexOf("phone"),em=eh(et[0],ep.lastIndexOf("b")),[eu,ex,eb,ey,ev,ew]=[0,1,2,3,4,5].map(e=>eh(et[1],eg<0?-1:eg+e)),ej=et[3]?et[3].firstChild?.textContent??"":"",ek=[ej.length-1,ej.length-2].map(e=>eh(et[3],e)),eN=(e,t,a=0)=>{if(!t)return -1;let r=0,s=-1;for(let n=0;n<e.length;n++){let{p:i,s:o}=e[n];if(o<a)continue;if(i[0]<t.x0||i[0]>t.x1||i[1]<t.y0||i[1]>t.y1){r=0;continue}let l=t.ink(i[0],i[1]);if(0===r&&l)r=1;else if(1!==r||l){if(2===r&&l){if(o-s>.8*p)return(s+o)/2;r=1}}else r=2,s=o}return -1},eM=p/2+3,e$=Array.from({length:8},(e,t)=>[Math.cos(t*Math.PI/4)*eM,Math.sin(t*Math.PI/4)*eM]),eC=(e,t)=>!!t&&e.some(({p:e})=>e[0]>t.x0-eM&&e[0]<t.x1+eM&&e[1]>t.y0-eM&&e[1]<t.y1+eM&&(t.ink(e[0],e[1])||e$.some(([a,r])=>t.ink(e[0]+a,e[1]+r)))),eS=c([eo,{c:[i-ei,er.y+ei],r:Math.min(.6*ei,.06*i),d:1},J],0,X),eA=[];if(!O&&em&&eu&&ex&&eb&&ev){let e=parseFloat(getComputedStyle(et[1]).fontSize),t=e=>{for(let t=Math.floor(e.y0);t<e.base;t++)for(let a=e.x0;a<e.x1;a++)if(e.ink(a,t))return t;return e.base},a=eb.base-t(eb),r=e=>{let t=e.base-a/2,r=0,s=-1;for(let a=e.x0;a<e.x1;a++){let n=e.ink(a,t);if(0===r&&n)r=1;else if(1!==r||n){if(2===r&&n)return[(s+a)/2,t]}else r=2,s=a}return[(e.x0+e.x1)/2,t]},s=r(em),n=r(eu),o=t(ex),l=n[0]-s[0],f=n[1]-s[1],h=Math.hypot(l,f),g=l/h,m=f/h,u=Math.min(.9*ei,.08*i),x=s[0]-er.x0>1.2*u?Math.min(.6*ei,(s[0]-er.x0)*.4):.3*ei,b={c:[s[0]-g*x-u*m,s[1]-m*x+u*g],r:u,d:1},y=null;if(g>.2)for(let t of[0,.05,.1,.2,.35])for(let a of[.3,.45,.6,.75,.9])for(let r of Array.from({length:22},(e,t)=>.5+.1*t)){let s=t*e,i=a*e,l=r*e,f={c:[n[0]+g*s+i*m,n[1]+m*s-i*g],r:i,d:-1};for(let e of[!0,!1]){let t={c:[ef-l,o+l],r:l,d:1},a=J;if(e){let e=Math.cos(X),r=Math.sin(X),s=a=>Math.hypot(t.c[0]-(I[0]-a*e),t.c[1]-(I[1]-a*r))-(l-a);if(s(4)>=0)continue;let n=4,i=l;for(let e=0;e<40;e++){let e=(n+i)/2;0>s(e)?n=e:i=e}let o=(n+i)/2;if(o<3*p)continue;a={c:[I[0]-o*e,I[1]-o*r],r:o,d:1}}let r=c([eo,...ed?[ec]:[],b,f,t,a],0,X),s=eN(r.pts,em),n=eN(r.pts,eu,Math.max(0,s)),i=eN(r.pts,eb,Math.max(0,n)),h=0;s<0&&(h+=3),n<0&&(h+=3),i<0&&(h+=3),(eC(r.pts,ev)||eC(r.pts,ew))&&(h+=4),ek.some(e=>eC(r.pts,e))&&(h+=4),r.pts.some(({p:e})=>e[1]>en.y-eM&&e[1]<en.y+en.h&&e[0]<en.x1+eM)&&(h+=4),(r.kinked||r.sweeps.some(e=>e>1.15*Math.PI))&&(h+=5);{let e=d(f,t);(.35>Math.cos(e)||Math.sin(e)>0)&&(h+=5)}let g=1e5*h+3e3*!e+800*!eC(r.pts,ey)+r.len;if(!y||g<y.score){let e=[];s>=0&&n>s&&e.push([s/r.len,n/r.len]),i>=0&&e.push([i/r.len,1]),y={score:g,B:r,over:e}}}}y&&(eS=y.B,eA=y.over)}let eF=c(ee,W,0);for(let e of(l.current={sDoc:h.y+C[1],eDoc:h.y+I[1],lens:[eF.len,.6*i,eS.len],over:eA},o.current)){let t=n(e.el).y-h.y;e.svg.setAttribute("width",String(i)),e.svg.setAttribute("height",String(f)),e.svg.setAttribute("viewBox",`0 0 ${i} ${f}`),e.svg.style.top=`${-t}px`,e.paths.forEach((e,t)=>{e.setAttribute("d",t?eS.d:eF.d),e.setAttribute("stroke-width",String(p))})}a()};f.current=r,r();let h=0,p=()=>{h||(h=requestAnimationFrame(()=>{h=0,a()}))},g=new ResizeObserver(()=>r());return g.observe(e),window.addEventListener("scroll",p,{passive:!0}),window.addEventListener("load",r),t.addEventListener("change",a),document.fonts?.ready.then(r),()=>{g.disconnect(),cancelAnimationFrame(h),window.removeEventListener("scroll",p),window.removeEventListener("load",r),t.removeEventListener("change",a)}},[]),(0,t.jsx)(r.Provider,{value:h.current,children:(0,t.jsx)("div",{ref:i,children:e})})}])},34575,e=>{var t=e.i(71645);e.s(["f",0,function(){let[e,a]=(0,t.useState)(!1);return(0,t.useEffect)(()=>{let e=window.matchMedia("(prefers-reduced-motion: reduce)"),t=()=>a(e.matches||document.documentElement.classList.contains("pk-still")),r=t=>a(e.matches||t.detail);return t(),e.addEventListener("change",t),window.addEventListener("pk-motion",r),()=>{e.removeEventListener("change",t),window.removeEventListener("pk-motion",r)}},[]),e}])}])})();