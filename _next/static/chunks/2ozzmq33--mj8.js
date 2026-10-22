(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,96439,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(56420);let i={name:"plus",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]};i.node;let s=(0,r.f)(i);e.s(["FaqList",0,function({items:e,level:r=3}){let i=2===r?"h2":"h3",[n,o]=(0,a.useState)(0),l=(0,a.useId)();return(0,t.jsx)("div",{className:"space-y-3",children:e.map((e,a)=>{let r=n===a;return(0,t.jsxs)("div",{className:`fq ${r?"open":""}`,children:[(0,t.jsx)(i,{className:"m-0",children:(0,t.jsxs)("button",{type:"button",id:`${l}-q${a}`,"aria-expanded":r,"aria-controls":`${l}-a${a}`,onClick:()=>o(r?null:a),className:"fq-btn",children:[(0,t.jsx)("span",{"aria-hidden":!0,className:"fq-n",children:String(a+1).padStart(2,"0")}),(0,t.jsx)("span",{className:"flex-1",children:e.q}),(0,t.jsx)("span",{className:"fq-ic",children:(0,t.jsx)(s,{className:"h-5 w-5","aria-hidden":!0})})]})}),(0,t.jsx)("div",{id:`${l}-a${a}`,role:"region","aria-labelledby":`${l}-q${a}`,hidden:!r,className:"enter-fade",children:(0,t.jsx)("p",{className:"fq-a",children:e.a})})]},e.q)})})}],96439)},32276,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(68877),i=e.i(56420);let s={name:"loader-circle",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],aliases:["loader-2"]};s.node;let n=(0,i.f)(s);var o=e.i(89042);let l=[{v:"US",label:"United States +1",code:"+1"},{v:"CA",label:"Canada +1",code:"+1"}];function d({c:e}){return"CA"===e?(0,t.jsxs)("svg",{viewBox:"0 0 30 20",className:"lf-flag","aria-hidden":!0,children:[(0,t.jsx)("rect",{width:"30",height:"20",fill:"#fff"}),(0,t.jsx)("rect",{width:"7.5",height:"20",fill:"#d52b1e"}),(0,t.jsx)("rect",{x:"22.5",width:"7.5",height:"20",fill:"#d52b1e"}),(0,t.jsx)("path",{fill:"#d52b1e",d:"M15 4.2l1 1.9 1.3-.5-.4 3 1.6-1.5.4 1.1 1.7-.3-.6 1.8.8.4-2.9 2.3.3 1.1-2.8-.4.1 2.7h-1l.1-2.7-2.8.4.3-1.1-2.9-2.3.8-.4-.6-1.8 1.7.3.4-1.1 1.6 1.5-.4-3 1.3.5z"})]}):(0,t.jsxs)("svg",{viewBox:"0 0 30 20",className:"lf-flag","aria-hidden":!0,children:[(0,t.jsx)("rect",{width:"30",height:"20",fill:"#fff"}),[0,2,4,6,8,10,12].map(e=>(0,t.jsx)("rect",{y:20*e/13,width:"30",height:20/13,fill:"#b22234"},e)),(0,t.jsx)("rect",{width:"13",height:140/13,fill:"#3c3b6e"}),[0,1,2,3].map(e=>[0,1,2,3,4].map(a=>(0,t.jsx)("circle",{cx:1.6+2.45*a,cy:1.5+2.6*e,r:"0.55",fill:"#fff"},`${e}-${a}`)))]})}e.s(["LeadForm",0,function({kind:e="strategy-call",tone:i="dark"}){let s=(0,a.useId)(),[f,c]=(0,a.useState)("idle"),[g,p]=(0,a.useState)({}),[h,m]=(0,a.useState)(1),[u,x]=(0,a.useState)("US"),b="dark"===i,v=`mt-2 block min-h-12 w-full rounded-md border-2 px-4 py-3 text-t3 outline-none transition-colors focus:border-ribbon ${b?"aria-[invalid=true]:border-white border-white/30 bg-white/10 text-white placeholder:text-white/75":"aria-[invalid=true]:border-ribbon-deep border-ink/20 bg-white text-ink placeholder:text-slate/70"}`,w=`mt-2 text-t3 font-semibold ${b?"text-white":"text-ribbon-deep"}`,y=`text-t3 font-extrabold tracking-wider uppercase ${b?"text-white/90":"text-ink"}`;async function k(t){let a,r;t.preventDefault();let i=t.currentTarget,s=new FormData(i);if(s.get("company_website_hp"))return;let n=(r={},(a=e=>String(s.get(e)??"").trim())("name")||(r.name="Please enter your name."),a("business")||(r.business="Please enter your business name."),a("email")?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a("email"))||(r.email="That email looks incomplete. Check it has an @ and a domain, like mike@johnsonplumbing.com."):r.email="Please enter your email so Nick can reply.",a("phone").replace(/\D/g,"").length<7&&(r.phone=a("phone")?"That phone number looks too short. Include the area code.":"Please enter a phone number."),"website-audit"!==e||a("website")||(r.website="Please enter your website address so Nick can audit it."),r),d=1===h?Object.fromEntries(Object.entries(n).filter(([e])=>"name"===e||"phone"===e)):n;p(d);let f=Object.keys(d)[0],g=e=>setTimeout(()=>i.elements.namedItem(e)?.focus(),0);if(f){("name"===f||"phone"===f)&&m(1),g(f);return}if(1===h){m(2),g("business");return}let u=Object.fromEntries(s.entries());delete u.company_website_hp;let x=l.find(e=>e.v===u.country)??l[0];u.phone=`${x.code} ${String(u.phone??"").trim()} (${x.v})`,delete u.country;let b={...u,kind:e,page:window.location.pathname,submittedAt:new Date().toISOString()};if(!o.B.formEndpoint){let t=Object.entries(b).map(([e,t])=>`${e}: ${t}`).join("\n");window.location.href=`mailto:${o.B.email}?subject=${encodeURIComponent("website-audit"===e?"Free website audit request":"Strategy call request")}&body=${encodeURIComponent(t)}`,c("sent");return}c("sending");try{let e=await fetch(o.B.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(b)}),t=await e.json().catch(()=>null);c(e.ok&&t?.ok?"sent":"error")}catch{c("error")}}return"sent"===f?(0,t.jsxs)("div",{role:"status",className:`rounded-md border-2 border-ink p-8 ${b?"bg-white/[0.06] text-white":"bg-ivory"}`,children:[(0,t.jsx)("img",{src:"/bobo/cheer.webp",alt:"Bobo the duck cheering",width:96,height:96,className:"h-24 w-24"}),(0,t.jsx)("p",{className:"mt-4 font-display text-t2 font-bold",children:"Got it. Nick will be in touch."}),(0,t.jsx)("p",{className:`mt-2 ${b?"text-white/90":"text-slate"}`,children:"Nick reads and replies to every request personally."})]}):(0,t.jsxs)("form",{onSubmit:k,className:`grid gap-5 ${1===h?"lf-s1":"sm:grid-cols-2"}`,noValidate:!0,children:[(0,t.jsxs)("div",{className:"col-span-full flex items-center gap-3","aria-live":"polite",children:[(0,t.jsxs)("span",{className:`text-t3 font-bold ${b?"text-white":"text-ink"}`,children:["Step ",h," of 2"]}),(0,t.jsx)("span",{"aria-hidden":!0,className:"lf-bar",children:(0,t.jsx)("span",{style:{transform:`scaleX(${h/2})`}})})]}),(0,t.jsxs)("div",{hidden:1!==h,className:"contents",children:[(0,t.jsxs)("div",{className:"lf-name min-w-0",children:[(0,t.jsx)("label",{htmlFor:`${s}-name`,className:y,children:"Your name"}),(0,t.jsx)("input",{id:`${s}-name`,name:"name",required:!0,autoComplete:"name",size:8,className:`${v} min-w-0`,"aria-invalid":!!g.name||void 0,"aria-describedby":g.name?`${s}-name-err`:void 0,placeholder:"Mike Johnson"}),g.name&&(0,t.jsx)("p",{id:`${s}-name-err`,className:w,children:g.name})]}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("label",{htmlFor:`${s}-cc`,className:y,children:"Country"}),(0,t.jsxs)("div",{className:`lf-cc mt-2 ${b?"lf-cc-dark":""}`,children:[(0,t.jsx)(d,{c:u}),(0,t.jsx)("select",{id:`${s}-cc`,name:"country",value:u,onChange:e=>x(e.target.value),autoComplete:"country",className:`lf-cc-sel ${b?"text-white":"text-ink"}`,"aria-label":"Country code",children:l.map(e=>(0,t.jsx)("option",{value:e.v,children:e.code},e.v))})]})]}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("label",{htmlFor:`${s}-phone`,className:y,children:"Phone"}),(0,t.jsx)("input",{id:`${s}-phone`,name:"phone",type:"tel",required:!0,autoComplete:"tel",className:v,"aria-invalid":!!g.phone||void 0,"aria-describedby":g.phone?`${s}-phone-err`:void 0,placeholder:"(555) 555-0123"}),g.phone&&(0,t.jsx)("p",{id:`${s}-phone-err`,className:w,children:g.phone})]})]}),(0,t.jsxs)("div",{hidden:2!==h,className:"contents",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:`${s}-co`,className:y,children:"Business name"}),(0,t.jsx)("input",{id:`${s}-co`,name:"business",required:!0,autoComplete:"organization",className:v,"aria-invalid":!!g.business||void 0,"aria-describedby":g.business?`${s}-business-err`:void 0,placeholder:"Johnson Plumbing"}),g.business&&(0,t.jsx)("p",{id:`${s}-business-err`,className:w,children:g.business})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:`${s}-email`,className:y,children:"Email"}),(0,t.jsx)("input",{id:`${s}-email`,name:"email",type:"email",required:!0,autoComplete:"email",className:v,"aria-invalid":!!g.email||void 0,"aria-describedby":g.email?`${s}-email-err`:void 0,placeholder:"mike@johnsonplumbing.com"}),g.email&&(0,t.jsx)("p",{id:`${s}-email-err`,className:w,children:g.email})]}),(0,t.jsxs)("div",{className:"sm:col-span-2",children:[(0,t.jsx)("label",{htmlFor:`${s}-site`,className:y,children:"website-audit"===e?"Your current website":"Current website (if you have one)"}),(0,t.jsx)("input",{id:`${s}-site`,name:"website",type:"text",inputMode:"url",required:"website-audit"===e,className:v,"aria-invalid":!!g.website||void 0,"aria-describedby":g.website?`${s}-website-err`:void 0,placeholder:"johnsonplumbing.com"}),g.website&&(0,t.jsx)("p",{id:`${s}-website-err`,className:w,children:g.website})]})]}),(0,t.jsxs)("div",{"aria-hidden":!0,className:"absolute -left-[9999px]",children:[(0,t.jsx)("label",{htmlFor:`${s}-hp`,children:"Leave empty"}),(0,t.jsx)("input",{id:`${s}-hp`,name:"company_website_hp",tabIndex:-1,autoComplete:"off"})]}),(0,t.jsxs)("div",{className:"col-span-full lf-foot",children:[(0,t.jsxs)("div",{className:"lf-btns flex flex-wrap items-center gap-3",children:[2===h&&(0,t.jsx)("button",{type:"button",onClick:()=>m(1),className:`min-h-11 px-3 font-bold underline underline-offset-4 ${b?"text-white":"text-ink"}`,children:"Back"}),(0,t.jsxs)("button",{type:"submit",disabled:"sending"===f,className:"btn btn-primary w-full sm:w-auto",children:["sending"===f?(0,t.jsx)(n,{className:"h-5 w-5 animate-spin","aria-hidden":!0}):null,1===h?"Next: your business":"website-audit"===e?o.B.secondaryCta:o.B.primaryCta,(0,t.jsx)(r.f,{className:"h-4.5 w-4.5","aria-hidden":!0})]})]}),"error"===f&&(0,t.jsxs)("p",{role:"alert",className:"mt-3 text-t3 font-semibold text-royal",children:["That didn't send. Please email ",(0,t.jsx)("a",{className:"underline",href:`mailto:${o.B.email}`,children:o.B.email})," and we'll get right back to you."]}),(0,t.jsxs)("p",{className:`mt-4 text-t3 ${b?"text-white/90":"text-slate"}`,children:["No commitment, no hard sell. By sending this you agree to our ",(0,t.jsx)("a",{href:"/privacy-policy/",className:"underline",children:"Privacy Policy"}),"."]})]})]})}],32276)},33383,e=>{var t=e.i(43476),a=e.i(71645);e.s(["SittingBobo",0,function({fallback:e,className:r,name:i="sit",w:s=216,h:n=384}){let o=(0,a.useRef)(null),l=(0,a.useRef)(null),[d,f]=(0,a.useState)(!1),[c,g]=(0,a.useState)(!1),[p,h]=(0,a.useState)(!1),m=(0,a.useRef)(!1);return(0,a.useEffect)(()=>{let e=o.current,t=navigator;if(!e||window.matchMedia("(prefers-reduced-motion: reduce)").matches||t.connection?.saveData)return;g(/iP(hone|ad|od)/.test(navigator.userAgent)||/^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent)),m.current=document.documentElement.classList.contains("pk-still"),h(m.current);let a=new IntersectionObserver(([e])=>{e.isIntersecting&&f(!0);let t=l.current;t&&(e.isIntersecting&&!m.current?t.play().catch(()=>{}):t.pause())},{rootMargin:"300px 0px"});a.observe(e);let r=e=>{m.current=e.detail,h(m.current);let t=l.current;t&&(m.current?t.pause():t.play().catch(()=>{}))};return window.addEventListener("pk-motion",r),()=>{a.disconnect(),window.removeEventListener("pk-motion",r)}},[]),(0,t.jsx)("span",{ref:o,"aria-hidden":!0,className:r,children:d&&c?(0,t.jsx)("img",{src:p?`/bobo/${i}-still.webp`:`/bobo/${i}.webp`,alt:"",width:s,height:n,className:"h-full w-full object-contain"}):d?(0,t.jsx)("video",{ref:l,muted:!0,loop:!0,playsInline:!0,autoPlay:!0,preload:"auto",poster:`/bobo/${i}-still.webp`,className:"h-full w-full object-cover",children:(0,t.jsx)("source",{src:`/bobo/${i}.webm`,type:"video/webm"})}):e})}])},6764,e=>{var t=e.i(43476),a=e.i(71645);let r={aurora:{style:"streak",colors:["#f4efe9","#e9c2b8","#c2433f","#2a1e2a","#22395e","#6f97c2","#e5edf4"],scale:.7,warp:1.4,angle:-.62,gloss:.18,veins:0},ember:{style:"marble",colors:["#07090c","#16252c","#3d5f68","#1a1416","#a3201a","#ef4a2b","#ff8a5c"],scale:.62,warp:3.2,angle:-.5,gloss:.55,veins:.6},dusk:{style:"marble",colors:["#120c18","#3e2850","#8f6c9c","#2b1a24","#b3502f","#eab08a","#fbe7d2"],scale:.75,warp:3.6,angle:.8,gloss:.5,veins:.5},glacier:{style:"streak",colors:["#f7f8fa","#d9e2ea","#9fb4c7","#e8edf2","#bccbd8","#ffffff"],scale:.7,warp:1.6,angle:.35,gloss:.25,veins:0},verdant:{style:"marble",colors:["#070b08","#173024","#4f7a5a","#141812","#a7843a","#e9cf87","#fbf3d6"],scale:.7,warp:3.4,angle:2.1,gloss:.5,veins:.5}};function i(e){let t=e>>>0;return()=>{let e=t=t+0x6d2b79f5>>>0;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/0x100000000}}function s(e){let t=0x811c9dc5;for(let a=0;a<e.length;a++)t=Math.imul(t^e.charCodeAt(a),0x1000193);return t>>>0}let n=new Map,o=[],l=!1;function d({art:e,seed:s,w:f,h:c,density:g,priority:p,className:h}){let m=a.useRef(null),[u,x]=a.useState(!1),b=JSON.stringify("string"==typeof e?r[e]:e),v=Math.round(f*g),w=Math.round(c*g);return a.useEffect(()=>{var e;let t,a,r=!0;return x(!1),(e=JSON.parse(b),t=JSON.stringify([e,s,v,w]),!(a=n.get(t))&&(a=new Promise(t=>{let a,r,n,d,f,c,g,h,m,u,x,b,y,k,j,N,$,M,F,C,S,A,E,B,L,q,z=o.length;for(;z>1&&o[z-1].priority>p;)z--;o.splice(z,0,{job:(a=Math.max(1,Math.round(v)),r=Math.max(1,Math.round(w)),d=(n=e.colors.length>=2?e.colors:["#111111","#eeeeee"]).map((e,t)=>{let a,r;return{t:t/(n.length-1),c:(3===(a=e.trim().replace(/^#/,"")).length&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]),[(r=/^[0-9a-f]{6}$/i.test(a)?parseInt(a,16):8421504)>>16&255,r>>8&255,255&r])}}),f=e.scale??.7,c=e.warp??3,g=e.gloss??.4,h=e.veins??0,m="streak"===e.style,u=function(e){let t=i(e),a=new Uint8Array(512),r=new Float32Array(512),s=[];for(let e=0;e<256;e++)s.push(e);for(let e=255;e>0;e--){let a=Math.floor(t()*(e+1)),r=s[e];s[e]=s[a],s[a]=r}for(let e=0;e<512;e++)a[e]=s[255&e];for(let e=0;e<256;e++){let a=t()*Math.PI*2;r[2*e]=Math.cos(a),r[2*e+1]=Math.sin(a)}let n=(e,t)=>{let i=Math.floor(e),s=Math.floor(t),n=e-i,o=t-s,l=255&i,d=255&s,f=2*a[l+a[d]],c=2*a[l+1+a[d]],g=2*a[l+a[d+1]],p=2*a[l+1+a[d+1]],h=r[f]*n+r[f+1]*o,m=r[c]*(n-1)+r[c+1]*o,u=r[g]*n+r[g+1]*(o-1),x=r[p]*(n-1)+r[p+1]*(o-1),b=n*n*n*(n*(6*n-15)+10);return h+b*(m-h)+o*o*o*(o*(6*o-15)+10)*(u-h+b*(x-u-m+h))};return(e,t,a)=>{let r=0,i=.5;for(let s=0;s<a;s++){r+=i*n(e,t);let a=1.6*e+1.2*t+7.1;t=-1.2*e+1.6*t+3.3,e=a,i*=.5}return r}}(977*s+13),b=50*(x=i(s+1))(),y=50*x(),j=Math.cos(k=(e.angle??0)+(x()-.5)*.5),N=Math.sin(k),$=Math.min(a,r),C=new Float32Array((M=Math.ceil(a/2)+3)*(F=Math.ceil(r/2)+3)),S=new Float32Array(M*F),A=new Float32Array(a*r),E=new Float32Array(a*r),B=new Uint8ClampedArray(a*r*4),L=0,q=e=>{for(let t=0;t<M;t++){let i=((t-1)*2-a/2)/$,s=((e-1)*2-r/2)/$,n=(i*j-s*N)*f,o=(i*N+s*j)*f;m&&(n*=.14,o*=2.2);let l=u(n+=b,o+=y,3),d=u(n+5.2,o+1.3,3),g=u(n+c*l+1.7,o+c*d+9.2,3),p=u(n+c*l+8.3,o+c*d+2.8,3);C[e*M+t]=u(n+c*g,o+c*p,4),S[e*M+t]=Math.sqrt(l*l+d*d)}},{width:a,height:r,pixels:B,step:e=>{if(L>=F)return!0;let t=Math.min(F,L+Math.max(1,e));for(;L<t;)q(L++);return!(L<F)&&((()=>{let e=(e,t,a,r)=>(-e+9*t+9*a-r)/16,t=new Float32Array(a*F);for(let r=0;r<F;r++){let i=r*M;for(let s=0;s<a;s++){let n=(s>>1)+1;t[r*a+s]=1&s?e(C[i+n-1],C[i+n],C[i+n+1],C[i+n+2]):C[i+n]}}for(let i=0;i<r;i++){let r=(i>>1)+1;for(let s=0;s<a;s++){A[i*a+s]=1&i?e(t[(r-1)*a+s],t[r*a+s],t[(r+1)*a+s],t[(r+2)*a+s]):t[r*a+s];let n=(s>>1)+1,o=S[r*M+n],l=1&s?(o+S[r*M+n+1])/2:o,d=1&i?1&s?(S[(r+1)*M+n]+S[(r+1)*M+n+1])/2:S[(r+1)*M+n]:l;E[i*a+s]=(l+d)/2}}})(),(()=>{let e=[],t=Math.max(1,Math.floor(A.length/4096));for(let a=0;a<A.length;a+=t)e.push(A[a]);e.sort((e,t)=>e-t);let i=e[Math.floor(.02*e.length)],s=1/(e[Math.floor(.98*e.length)]-i||1),n=s*$*.012;for(let e=0;e<r;e++)for(let t=0;t<a;t++){let o=e*a+t,l=(A[o]-i)*s;l=l<0?0:l>1?1:l;let f=1;for(;f<d.length-1&&d[f].t<l;)f++;let c=d[f-1],p=d[f],m=(l-c.t)/(p.t-c.t||1);m=(m=m<0?0:m>1?1:m)*m*(3-2*m);let u=(A[t<a-1?o+1:o]-A[t>0?o-1:o])*n,x=(A[e<r-1?o+a:o]-A[e>0?o-a:o])*n,b=(-(-.55*u)- -.65*x+.52)/Math.sqrt(u*u+x*x+1),v=Math.pow(b>0?b:0,24)*g*255,w=(.82+.28*b)*(1+.035*Math.sin(150*l+24*E[o]))*(1-h*Math.max(0,1-14*Math.abs(E[o]-.42))*.6);B[4*o]=(c.c[0]+(p.c[0]-c.c[0])*m)*w+v,B[4*o+1]=(c.c[1]+(p.c[1]-c.c[1])*m)*w+v,B[4*o+2]=(c.c[2]+(p.c[2]-c.c[2])*m)*w+v,B[4*o+3]=255}})(),!0)}}),priority:p,done:t}),function(){if(l)return;l=!0;let e=()=>{let t=performance.now()+7;for(;o.length&&performance.now()<t;){let e=o[0];if(e.job.step(4)){o.shift();let t=document.createElement("canvas");t.width=e.job.width,t.height=e.job.height,t.getContext("2d")?.putImageData(new ImageData(e.job.pixels,t.width,t.height),0,0),e.done(t)}}o.length?requestAnimationFrame(e):l=!1};requestAnimationFrame(e)}()}),n.set(t,a)),a).then(e=>{let t=m.current;r&&t&&(t.width=e.width,t.height=e.height,t.getContext("2d")?.drawImage(e,0,0),x(!0))}),()=>{r=!1}},[b,s,v,w,p]),(0,t.jsx)("canvas",{ref:m,"aria-hidden":"true",className:h,"data-ready":u||void 0,style:{width:f,height:c,maxWidth:"none"}})}let f="M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z",c="M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 176A22 22 0 0 1 318 198L22 198A22 22 0 0 1 0 176Z",g=[{name:"Cover — final",meta:"PNG · 4.8 MB",art:"ember"},{name:"Moodboard",meta:"24 images",art:"dusk"},{name:"Brief.pdf",meta:"PDF · 1.2 MB"}];function p({label:e="My Files",meta:r,tone:n="light",art:o="aurora",seed:l=3,image:m,files:u=g,action:x="add",onAdd:b,onFilesChange:v,menu:w=[],labelPlacement:y="bottom-left",open:k,defaultOpen:j=!1,onOpenChange:N,onFileSelect:$,width:M=340,appear:F=!0,appearDelay:C=0,className:S,style:A}){let E=a.useId().replace(/:/g,""),B=a.useRef(null),L=a.useRef(null),q=a.useRef(null),z=a.useRef(null),P=a.useRef(null),[I,O]=a.useState(u),R=a.useRef(u.map((e,t)=>t)),T=a.useRef(u.length),[D,U]=a.useState(null),[Y,J]=a.useState(0),[_,X]=a.useState(j),G=k??_,K=a.useCallback(e=>{void 0===k&&X(e),N?.(e)},[k,N]),[H,Z]=a.useState(!1),[V,W]=a.useState(!F),Q=M/340,ee=Math.min(1.5,Math.max(1,window.devicePixelRatio||1))*Q;a.useEffect(()=>{if(!F)return;let e=B.current;if(!e||"u"<typeof IntersectionObserver)return void W(!0);let t=0,a=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(a.disconnect(),t=window.setTimeout(()=>W(!0),C))},{threshold:.25});return a.observe(e),()=>{a.disconnect(),window.clearTimeout(t)}},[F,C]),a.useEffect(()=>{let e=B.current;if(!e)return;let t=0,a=0,r=0,i=()=>{t=0,e.style.setProperty("--gf-px",a.toFixed(3)),e.style.setProperty("--gf-py",r.toFixed(3))},s=s=>{if("touch"===s.pointerType)return;let n=e.getBoundingClientRect();a=(s.clientX-n.left)/n.width*2-1,r=(s.clientY-n.top)/n.height*2-1,t||(t=requestAnimationFrame(i))},n=()=>{a=0,r=0,t||(t=requestAnimationFrame(i))};return e.addEventListener("pointermove",s),e.addEventListener("pointerleave",n),()=>{e.removeEventListener("pointermove",s),e.removeEventListener("pointerleave",n),cancelAnimationFrame(t)}},[]),a.useEffect(()=>{L.current?.toggleAttribute("inert",!G)},[G]),a.useEffect(()=>{if(!G&&!H)return;let e=e=>{"Escape"===e.key&&(H?(Z(!1),z.current?.focus()):(K(!1),q.current?.focus()))},t=e=>{let t=e.target;!H||P.current?.contains(t)||z.current?.contains(t)||Z(!1),!G||H||B.current?.contains(t)||K(!1)};return document.addEventListener("keydown",e),document.addEventListener("pointerdown",t),()=>{document.removeEventListener("keydown",e),document.removeEventListener("pointerdown",t)}},[G,H,K]),a.useEffect(()=>{H&&P.current?.querySelector("[role=menuitem]")?.focus()},[H]);let et=[{label:G?"Close folder":"Open folder",onSelect:()=>K(!G)},...w],ea=Math.max(0,I.length-4),er=I.slice(ea),ei=I.length,es=r??ei+(1===ei?" item":" items");return(0,t.jsxs)("div",{ref:B,className:"gf-root"+(S?" "+S:""),"data-tone":n,"data-open":G||void 0,"data-entered":V||void 0,"data-place":y,style:{width:M,height:326*Q,...A},children:[(0,t.jsx)("style",{children:h}),(0,t.jsx)("div",{className:"gf-stage",style:{transform:"translateY("+54*Q+"px) scale("+Q+")"},children:(0,t.jsxs)("div",{className:"gf-tilt",children:[(0,t.jsx)("div",{className:"gf-shadow","aria-hidden":"true"}),(0,t.jsxs)("div",{className:"gf-back",style:{clipPath:"path('"+f+"')"},"aria-hidden":"true",children:[m?(0,t.jsx)("img",{className:"gf-art",src:m,alt:"",width:364,height:296,draggable:!1}):"none"!==o?(0,t.jsx)(d,{className:"gf-art",art:o,seed:l,w:364,h:296,density:ee,priority:0}):null,(0,t.jsx)("div",{className:"gf-back-sheen"})]}),(0,t.jsx)("svg",{className:"gf-rim gf-back-rim",viewBox:"0 0 340 272","aria-hidden":"true",children:(0,t.jsx)("path",{d:f})}),(0,t.jsxs)("div",{className:"gf-front"+(Y?" gf-front--bump":""),style:{clipPath:"path('"+c+"')"},children:[(0,t.jsx)("div",{className:"gf-tint","aria-hidden":"true"}),(0,t.jsx)("div",{className:"gf-spec","aria-hidden":"true"}),(0,t.jsxs)("svg",{className:"gf-rim gf-front-rim",viewBox:"0 0 340 198","aria-hidden":"true",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:"gf-rim-"+E,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0",stopColor:"#fff",stopOpacity:"0.95"}),(0,t.jsx)("stop",{offset:"0.35",stopColor:"#fff",stopOpacity:"0.35"}),(0,t.jsx)("stop",{offset:"1",stopColor:"#fff",stopOpacity:"0.12"})]})}),(0,t.jsx)("path",{d:c,stroke:"url(#gf-rim-"+E+")"})]}),(0,t.jsx)("button",{ref:q,type:"button",className:"gf-hit","aria-expanded":G,"aria-label":(G?"Close ":"Open ")+e+", "+ei+(1===ei?" item":" items"),onClick:()=>{Z(!1),K(!G)}}),(0,t.jsxs)("div",{className:"gf-label",children:[(0,t.jsx)("span",{className:"gf-title",children:e}),(0,t.jsx)("span",{className:"gf-meta",children:es},es)]})]},Y),(0,t.jsx)("div",{ref:L,className:"gf-files",role:"list","aria-label":e+" contents",children:er.map((e,a)=>{var r;let n=R.current[ea+a],o=(r=er.length)<=1?0:a/(r-1)*2-1,l=i(s(e.name)+n),f=!!(e.art||e.image),c=(0,t.jsxs)(t.Fragment,{children:[f?e.image?(0,t.jsx)("img",{className:"gf-sheet-art",src:e.image,alt:"",width:272,height:184,draggable:!1}):(0,t.jsx)(d,{className:"gf-sheet-art",art:e.art,seed:s(e.name)%997,w:272,h:184,density:Math.min(ee,1.25),priority:1}):(0,t.jsxs)("span",{className:"gf-lines","aria-hidden":"true",children:[(0,t.jsx)("i",{style:{width:"86%"}}),(0,t.jsx)("i",{style:{width:"92%"}}),(0,t.jsx)("i",{style:{width:"64%"}}),(0,t.jsx)("i",{style:{width:"88%"}}),(0,t.jsx)("i",{style:{width:"42%"}})]}),(0,t.jsxs)("span",{className:"gf-sheet-head",children:[(0,t.jsx)("span",{className:"gf-sheet-name",children:e.name}),e.meta?(0,t.jsx)("span",{className:"gf-sheet-meta",children:e.meta}):null]})]}),g={className:"gf-sheet"+(f?" gf-sheet--art":"")+(n===D?" gf-sheet--drop":""),style:{"--gf-slot":o,"--gf-depth":er.length-1-a,"--gf-jx":((l()-.5)*10).toFixed(2)+"px","--gf-jr":((l()-.5)*3.2).toFixed(2)+"deg",zIndex:a+1},onAnimationEnd:n===D?()=>U(null):void 0};return(0,t.jsx)("div",{role:"listitem",className:"gf-sheet-slot",children:e.href?(0,t.jsx)("a",{...g,href:e.href,onClick:()=>$?.(e,ea+a),children:c}):(0,t.jsx)("button",{...g,type:"button",onClick:()=>$?.(e,ea+a),children:c})},n)})}),"none"!==x?(0,t.jsx)("button",{ref:z,type:"button",className:"gf-key gf-key--"+x,"aria-label":"add"===x?"Add a file to "+e:"More options for "+e,"aria-haspopup":"more"===x?"menu":void 0,"aria-expanded":"more"===x?H:void 0,"aria-controls":"more"===x?"gf-menu-"+E:void 0,onClick:()=>{let e,t,a;return"add"===x?(e=b?.(I)||{name:"Untitled "+(I.length+1),meta:"Just now"},t=[...I,e],a=T.current++,void(R.current=[...R.current,a],O(t),U(a),J(e=>e+1),v?.(t))):Z(e=>!e)},children:"add"===x?(0,t.jsx)("svg",{className:"gf-glyph gf-glyph--plus",viewBox:"0 0 24 24","aria-hidden":"true",children:(0,t.jsx)("path",{d:"M12 4.5v15M4.5 12h15"})},Y):(0,t.jsxs)("svg",{className:"gf-glyph gf-glyph--more",viewBox:"0 0 30 12","aria-hidden":"true",children:[(0,t.jsx)("rect",{x:"1",y:"1.5",width:"8",height:"9",rx:"3.4"}),(0,t.jsx)("rect",{x:"11",y:"1.5",width:"8",height:"9",rx:"3.4"}),(0,t.jsx)("rect",{x:"21",y:"1.5",width:"8",height:"9",rx:"3.4"})]})}):null,"more"===x?(0,t.jsx)("div",{ref:P,id:"gf-menu-"+E,role:"menu","aria-label":e+" options",className:"gf-menu","data-open":H||void 0,onKeyDown:e=>{let t=Array.from(P.current?.querySelectorAll("[role=menuitem]")??[]),a=t.indexOf(document.activeElement),r=a=>{e.preventDefault(),t[(a+t.length)%t.length]?.focus()};"ArrowDown"===e.key?r(a+1):"ArrowUp"===e.key?r(a-1):"Home"===e.key?r(0):"End"===e.key?r(t.length-1):"Tab"===e.key&&Z(!1)},children:et.map((e,a)=>(0,t.jsx)("button",{type:"button",role:"menuitem",tabIndex:H?-1:void 0,disabled:!H,className:"gf-menu-item"+(e.danger?" gf-menu-item--danger":""),onClick:()=>{Z(!1),z.current?.focus(),e.onSelect?.()},children:e.label},e.label+a))}):null]})})]})}let h=`
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
`,m={style:"marble",colors:["#FFF0F6","#FFD6E7","#FF8FBF","#FF3D8B","#C2185B","#FFE6F0","#FFFFFF"],scale:.7,warp:2.6,angle:-.5,gloss:.35,veins:.15};e.s(["FolderSlot",0,function({folder:e,delay:r}){let i=(0,a.useRef)(null),[s,n]=(0,a.useState)(0);return(0,a.useEffect)(()=>{let e=i.current;if(!e)return;let t=new ResizeObserver(([e])=>n(Math.round(Math.min(380,e.contentRect.width))));return t.observe(e),()=>t.disconnect()},[]),(0,t.jsxs)("div",{ref:i,className:"flex w-full justify-center",style:{minHeight:s?void 0:"22rem"},children:[(0,t.jsx)("noscript",{children:(0,t.jsxs)("div",{className:"w-full max-w-[380px] overflow-hidden rounded-xl border-2 border-ink/15 bg-white",children:[e.image&&(0,t.jsx)("img",{src:e.image,alt:"",className:"aspect-[4/3] w-full object-cover"}),(0,t.jsx)("p",{className:"p-4 text-t3 font-bold text-ink",children:e.label})]})}),s>0&&(0,t.jsx)(p,{label:e.label,meta:e.meta,tone:"light",art:e.image?"none":m,image:e.image,seed:7,action:"none",width:s,appearDelay:r,files:e.files.map(e=>({name:e.name,meta:e.meta,href:e.href,image:e.image}))})]})}],6764)},34575,e=>{var t=e.i(71645);e.s(["f",0,function(){let[e,a]=(0,t.useState)(!1);return(0,t.useEffect)(()=>{let e=window.matchMedia("(prefers-reduced-motion: reduce)"),t=()=>a(e.matches||document.documentElement.classList.contains("pk-still")),r=t=>a(e.matches||t.detail);return t(),e.addEventListener("change",t),window.addEventListener("pk-motion",r),()=>{e.removeEventListener("change",t),window.removeEventListener("pk-motion",r)}},[]),e}])}])})();