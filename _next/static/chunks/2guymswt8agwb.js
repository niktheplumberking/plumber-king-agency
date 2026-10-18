(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,89664,e=>{var t=e.i(56420);let a={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};a.node;let r=(0,t.f)(a);e.s(["f",0,r],89664)},84026,e=>{var t=e.i(56420);let a={name:"shield-check",size:24,node:[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]};a.node;let r=(0,t.f)(a);e.s(["f",0,r],84026)},96439,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(56420);let s={name:"plus",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]};s.node;let i=(0,r.f)(s);e.s(["FaqList",0,function({items:e,level:r=3}){let s=2===r?"h2":"h3",[n,o]=(0,a.useState)(0),l=(0,a.useId)();return(0,t.jsx)("div",{className:"space-y-3",children:e.map((e,a)=>{let r=n===a;return(0,t.jsxs)("div",{className:`fq ${r?"open":""}`,children:[(0,t.jsx)(s,{className:"m-0",children:(0,t.jsxs)("button",{type:"button",id:`${l}-q${a}`,"aria-expanded":r,"aria-controls":`${l}-a${a}`,onClick:()=>o(r?null:a),className:"fq-btn",children:[(0,t.jsx)("span",{"aria-hidden":!0,className:"fq-n",children:String(a+1).padStart(2,"0")}),(0,t.jsx)("span",{className:"flex-1",children:e.q}),(0,t.jsx)("span",{className:"fq-ic",children:(0,t.jsx)(i,{className:"h-5 w-5","aria-hidden":!0})})]})}),(0,t.jsx)("div",{id:`${l}-a${a}`,role:"region","aria-labelledby":`${l}-q${a}`,hidden:!r,className:"enter-fade",children:(0,t.jsx)("p",{className:"fq-a",children:e.a})})]},e.q)})})}],96439)},32276,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(68877),s=e.i(56420);let i={name:"loader-circle",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],aliases:["loader-2"]};i.node;let n=(0,s.f)(i);var o=e.i(89042);e.s(["LeadForm",0,function({kind:e="strategy-call",tone:s="dark"}){let i=(0,a.useId)(),[l,d]=(0,a.useState)("idle"),[c,h]=(0,a.useState)({}),[p,f]=(0,a.useState)(1),m="dark"===s,g=`mt-2 block min-h-12 w-full rounded-md border-2 px-4 py-3 text-t3 outline-none transition-colors focus:border-ribbon ${m?"aria-[invalid=true]:border-white border-white/30 bg-white/10 text-white placeholder:text-white/75":"aria-[invalid=true]:border-ribbon-deep border-ink/20 bg-white text-ink placeholder:text-slate/70"}`,u=`mt-2 text-t3 font-semibold ${m?"text-white":"text-ribbon-deep"}`,x=`text-t3 font-extrabold tracking-wider uppercase ${m?"text-white/90":"text-ink"}`;async function b(t){let a,r;t.preventDefault();let s=t.currentTarget,i=new FormData(s);if(i.get("company_website_hp"))return;let n=(r={},(a=e=>String(i.get(e)??"").trim())("name")||(r.name="Please enter your name."),a("business")||(r.business="Please enter your business name."),a("email")?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a("email"))||(r.email="That email looks incomplete. Check it has an @ and a domain, like mike@johnsonplumbing.com."):r.email="Please enter your email so Nick can reply.",a("phone").replace(/\D/g,"").length<7&&(r.phone=a("phone")?"That phone number looks too short. Include the area code.":"Please enter a phone number."),"website-audit"!==e||a("website")||(r.website="Please enter your website address so Nick can audit it."),r),l=1===p?Object.fromEntries(Object.entries(n).filter(([e])=>"name"===e||"phone"===e)):n;h(l);let c=Object.keys(l)[0],m=e=>setTimeout(()=>s.elements.namedItem(e)?.focus(),0);if(c){("name"===c||"phone"===c)&&f(1),m(c);return}if(1===p){f(2),m("business");return}let g=Object.fromEntries(i.entries());delete g.company_website_hp;let u={...g,kind:e,page:window.location.pathname,submittedAt:new Date().toISOString()};if(!o.B.formEndpoint){let t=Object.entries(u).map(([e,t])=>`${e}: ${t}`).join("\n");window.location.href=`mailto:${o.B.email}?subject=${encodeURIComponent("website-audit"===e?"Free website audit request":"Strategy call request")}&body=${encodeURIComponent(t)}`,d("sent");return}d("sending");try{let e=await fetch(o.B.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(u)}),t=await e.json().catch(()=>null);d(e.ok&&t?.ok?"sent":"error")}catch{d("error")}}return"sent"===l?(0,t.jsxs)("div",{role:"status",className:`rounded-md border-2 border-ink p-8 ${m?"bg-white/[0.06] text-white":"bg-ivory"}`,children:[(0,t.jsx)("img",{src:"/bobo/cheer.webp",alt:"Bobo the duck cheering",width:96,height:96,className:"h-24 w-24"}),(0,t.jsx)("p",{className:"mt-4 font-display text-t2 font-bold",children:"Got it. Nick will be in touch."}),(0,t.jsx)("p",{className:`mt-2 ${m?"text-white/90":"text-slate"}`,children:"Nick reads and replies to every request personally."})]}):(0,t.jsxs)("form",{onSubmit:b,className:"grid gap-5 sm:grid-cols-2",noValidate:!0,children:[(0,t.jsxs)("div",{className:"sm:col-span-2 flex items-center gap-3","aria-live":"polite",children:[(0,t.jsxs)("span",{className:`text-t3 font-bold ${m?"text-white":"text-ink"}`,children:["Step ",p," of 2"]}),(0,t.jsx)("span",{"aria-hidden":!0,className:"lf-bar",children:(0,t.jsx)("span",{style:{transform:`scaleX(${p/2})`}})})]}),(0,t.jsxs)("div",{hidden:1!==p,className:"contents",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:`${i}-name`,className:x,children:"Your name"}),(0,t.jsx)("input",{id:`${i}-name`,name:"name",required:!0,autoComplete:"name",className:g,"aria-invalid":!!c.name||void 0,"aria-describedby":c.name?`${i}-name-err`:void 0,placeholder:"Mike Johnson"}),c.name&&(0,t.jsx)("p",{id:`${i}-name-err`,className:u,children:c.name})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:`${i}-phone`,className:x,children:"Phone"}),(0,t.jsx)("input",{id:`${i}-phone`,name:"phone",type:"tel",required:!0,autoComplete:"tel",className:g,"aria-invalid":!!c.phone||void 0,"aria-describedby":c.phone?`${i}-phone-err`:void 0,placeholder:"(555) 555-0123"}),c.phone&&(0,t.jsx)("p",{id:`${i}-phone-err`,className:u,children:c.phone})]})]}),(0,t.jsxs)("div",{hidden:2!==p,className:"contents",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:`${i}-co`,className:x,children:"Business name"}),(0,t.jsx)("input",{id:`${i}-co`,name:"business",required:!0,autoComplete:"organization",className:g,"aria-invalid":!!c.business||void 0,"aria-describedby":c.business?`${i}-business-err`:void 0,placeholder:"Johnson Plumbing"}),c.business&&(0,t.jsx)("p",{id:`${i}-business-err`,className:u,children:c.business})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:`${i}-email`,className:x,children:"Email"}),(0,t.jsx)("input",{id:`${i}-email`,name:"email",type:"email",required:!0,autoComplete:"email",className:g,"aria-invalid":!!c.email||void 0,"aria-describedby":c.email?`${i}-email-err`:void 0,placeholder:"mike@johnsonplumbing.com"}),c.email&&(0,t.jsx)("p",{id:`${i}-email-err`,className:u,children:c.email})]}),(0,t.jsxs)("div",{className:"sm:col-span-2",children:[(0,t.jsx)("label",{htmlFor:`${i}-site`,className:x,children:"website-audit"===e?"Your current website":"Current website (if you have one)"}),(0,t.jsx)("input",{id:`${i}-site`,name:"website",type:"text",inputMode:"url",required:"website-audit"===e,className:g,"aria-invalid":!!c.website||void 0,"aria-describedby":c.website?`${i}-website-err`:void 0,placeholder:"johnsonplumbing.com"}),c.website&&(0,t.jsx)("p",{id:`${i}-website-err`,className:u,children:c.website})]})]}),(0,t.jsxs)("div",{"aria-hidden":!0,className:"absolute -left-[9999px]",children:[(0,t.jsx)("label",{htmlFor:`${i}-hp`,children:"Leave empty"}),(0,t.jsx)("input",{id:`${i}-hp`,name:"company_website_hp",tabIndex:-1,autoComplete:"off"})]}),(0,t.jsxs)("div",{className:"sm:col-span-2",children:[(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-3",children:[2===p&&(0,t.jsx)("button",{type:"button",onClick:()=>f(1),className:`min-h-11 px-3 font-bold underline underline-offset-4 ${m?"text-white":"text-ink"}`,children:"Back"}),(0,t.jsxs)("button",{type:"submit",disabled:"sending"===l,className:"btn btn-primary w-full sm:w-auto",children:["sending"===l?(0,t.jsx)(n,{className:"h-5 w-5 animate-spin","aria-hidden":!0}):null,1===p?"Next: your business":"website-audit"===e?o.B.secondaryCta:o.B.primaryCta,(0,t.jsx)(r.f,{className:"h-4.5 w-4.5","aria-hidden":!0})]})]}),"error"===l&&(0,t.jsxs)("p",{role:"alert",className:"mt-3 text-t3 font-semibold text-royal",children:["That didn't send. Please email ",(0,t.jsx)("a",{className:"underline",href:`mailto:${o.B.email}`,children:o.B.email})," and we'll get right back to you."]}),(0,t.jsxs)("p",{className:`mt-4 text-t3 ${m?"text-white/90":"text-slate"}`,children:["No commitment, no hard sell. By sending this you agree to our ",(0,t.jsx)("a",{href:"/privacy-policy/",className:"underline",children:"Privacy Policy"}),"."]})]})]})}],32276)},96199,e=>{var t=e.i(43476);e.s(["f",0,function({children:e,delay:a=0,y:r=28,className:s,as:i="div",off:n}){return(0,t.jsx)(i,{"data-reveal":n?void 0:"",className:s,style:{"--rd":`${a}s`,"--ry":`${r}px`},children:e})}])},25935,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(46607),s=e.i(40462),i=e.i(83495);e.s(["HScrollFx",0,function({className:e,children:n,...o}){let l=(0,a.useRef)(null);return(0,r.f)(l,({mobile:e})=>{let t=s.f.utils.toArray("[data-station]",l.current);if(e)return void t.forEach(e=>i.f.create({trigger:e,start:"top 50%",end:"bottom 50%",toggleClass:"on"}));let a=l.current.querySelector("[data-track]"),r=l.current.querySelector("[data-rail]"),n=()=>a.scrollWidth-window.innerWidth+64,o=-1;s.f.timeline({scrollTrigger:{trigger:l.current.querySelector("[data-pin]"),start:"top top",end:()=>`+=${n()}`,scrub:.6,pin:!0,invalidateOnRefresh:!0},onUpdate:()=>{let e=r.getBoundingClientRect().right,a=-1;t.forEach((t,r)=>{t.getBoundingClientRect().left<=e&&(a=r)}),a!==o&&(t.forEach((e,t)=>e.classList.toggle("on",t===a)),o=a)}}).to(a,{x:()=>-n(),ease:"none"},0).fromTo(r,{scaleX:0},{scaleX:1,ease:"none"},0)}),(0,t.jsx)("section",{ref:l,className:e,...o,children:n})},"MarqueeRow",0,function({items:e,dur:a,reverse:r,itemClass:s,sep:i,outlineEvery:n,loop:o}){let l=[...e,...e,...e,...e,...e,...e];return(0,t.jsx)("div",{className:"marquee overflow-hidden",children:(0,t.jsx)("div",{"data-loop":o,className:`${o?"":"marquee-track"} flex w-max items-center will-change-transform ${r?"reverse":""}`,style:a?{"--dur":a}:void 0,children:l.map((a,r)=>(0,t.jsxs)("span",{"aria-hidden":r>=e.length,className:s,children:[(0,t.jsx)("span",{className:n&&r%2?"outline-text":void 0,children:a}),"dot"===i?(0,t.jsx)("span",{"aria-hidden":!0,className:"mx-[0.2em] inline-block h-[0.3em] w-[0.3em] rounded-full bg-current opacity-80"}):(0,t.jsx)("span",{className:"text-t3 opacity-80",children:i})]},r))})})},"ScrollFx",0,function({as:e="div",className:n,children:o,...l}){let d=(0,a.useRef)(null);return(0,r.f)(d,()=>{let e={trigger:d.current,start:"top bottom",end:"bottom top",scrub:.6};d.current.querySelectorAll("[data-fx-y],[data-fx-x],[data-fx-rotate]").forEach(t=>{let a={},r={ease:"none",scrollTrigger:e},i=t.dataset.fxY,n=t.dataset.fxX,o=t.dataset.fxRotate,l=(e,t)=>{let[s,i]=e.split(",").map(e=>e.trim()),n=s.endsWith("%")?`${t}Percent`:t;a[n]=parseFloat(s),r[n]=void 0===i?-parseFloat(s):parseFloat(i)};if(i&&l(i,"y"),n&&l(n,"x"),o){let[e,t]=o.split(",").map(Number);a.rotate=e,r.rotate=t}s.f.fromTo(t,a,r)});let t=d.current.querySelectorAll("[data-loop]");if(!t.length)return;let a=[...t].map(e=>"1"===e.dataset.loop?s.f.fromTo(e,{xPercent:-50},{xPercent:0,duration:46,ease:"none",repeat:-1}):s.f.fromTo(e,{xPercent:0},{xPercent:-50,duration:40,ease:"none",repeat:-1}));i.f.create({trigger:d.current,start:"top bottom",end:"bottom top",onUpdate:e=>{let t;return t=e.getVelocity(),a.forEach(e=>s.f.to(e,{timeScale:1+Math.min(Math.abs(t)/450,5),duration:.5,ease:"none",overwrite:!0,onComplete:()=>{s.f.to(e,{timeScale:1,duration:1.4,ease:"none"})}}))}});let r=e=>a.forEach(t=>e.detail?t.pause():t.play());return window.addEventListener("pk-motion",r),()=>window.removeEventListener("pk-motion",r)}),(0,t.jsx)(e,{ref:d,className:n,...l,children:o})}])},6764,e=>{var t=e.i(43476),a=e.i(71645);let r={aurora:{style:"streak",colors:["#f4efe9","#e9c2b8","#c2433f","#2a1e2a","#22395e","#6f97c2","#e5edf4"],scale:.7,warp:1.4,angle:-.62,gloss:.18,veins:0},ember:{style:"marble",colors:["#07090c","#16252c","#3d5f68","#1a1416","#a3201a","#ef4a2b","#ff8a5c"],scale:.62,warp:3.2,angle:-.5,gloss:.55,veins:.6},dusk:{style:"marble",colors:["#120c18","#3e2850","#8f6c9c","#2b1a24","#b3502f","#eab08a","#fbe7d2"],scale:.75,warp:3.6,angle:.8,gloss:.5,veins:.5},glacier:{style:"streak",colors:["#f7f8fa","#d9e2ea","#9fb4c7","#e8edf2","#bccbd8","#ffffff"],scale:.7,warp:1.6,angle:.35,gloss:.25,veins:0},verdant:{style:"marble",colors:["#070b08","#173024","#4f7a5a","#141812","#a7843a","#e9cf87","#fbf3d6"],scale:.7,warp:3.4,angle:2.1,gloss:.5,veins:.5}};function s(e){let t=e>>>0;return()=>{let e=t=t+0x6d2b79f5>>>0;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/0x100000000}}function i(e){let t=0x811c9dc5;for(let a=0;a<e.length;a++)t=Math.imul(t^e.charCodeAt(a),0x1000193);return t>>>0}let n=new Map,o=[],l=!1;function d({art:e,seed:i,w:c,h,density:p,priority:f,className:m}){let g=a.useRef(null),[u,x]=a.useState(!1),b=JSON.stringify("string"==typeof e?r[e]:e),y=Math.round(c*p),v=Math.round(h*p);return a.useEffect(()=>{var e;let t,a,r=!0;return x(!1),(e=JSON.parse(b),t=JSON.stringify([e,i,y,v]),!(a=n.get(t))&&(a=new Promise(t=>{let a,r,n,d,c,h,p,m,g,u,x,b,w,j,k,N,M,C,F,S,$,E,A,P,q,z,T=o.length;for(;T>1&&o[T-1].priority>f;)T--;o.splice(T,0,{job:(a=Math.max(1,Math.round(y)),r=Math.max(1,Math.round(v)),d=(n=e.colors.length>=2?e.colors:["#111111","#eeeeee"]).map((e,t)=>{let a,r;return{t:t/(n.length-1),c:(3===(a=e.trim().replace(/^#/,"")).length&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]),[(r=/^[0-9a-f]{6}$/i.test(a)?parseInt(a,16):8421504)>>16&255,r>>8&255,255&r])}}),c=e.scale??.7,h=e.warp??3,p=e.gloss??.4,m=e.veins??0,g="streak"===e.style,u=function(e){let t=s(e),a=new Uint8Array(512),r=new Float32Array(512),i=[];for(let e=0;e<256;e++)i.push(e);for(let e=255;e>0;e--){let a=Math.floor(t()*(e+1)),r=i[e];i[e]=i[a],i[a]=r}for(let e=0;e<512;e++)a[e]=i[255&e];for(let e=0;e<256;e++){let a=t()*Math.PI*2;r[2*e]=Math.cos(a),r[2*e+1]=Math.sin(a)}let n=(e,t)=>{let s=Math.floor(e),i=Math.floor(t),n=e-s,o=t-i,l=255&s,d=255&i,c=2*a[l+a[d]],h=2*a[l+1+a[d]],p=2*a[l+a[d+1]],f=2*a[l+1+a[d+1]],m=r[c]*n+r[c+1]*o,g=r[h]*(n-1)+r[h+1]*o,u=r[p]*n+r[p+1]*(o-1),x=r[f]*(n-1)+r[f+1]*(o-1),b=n*n*n*(n*(6*n-15)+10);return m+b*(g-m)+o*o*o*(o*(6*o-15)+10)*(u-m+b*(x-u-g+m))};return(e,t,a)=>{let r=0,s=.5;for(let i=0;i<a;i++){r+=s*n(e,t);let a=1.6*e+1.2*t+7.1;t=-1.2*e+1.6*t+3.3,e=a,s*=.5}return r}}(977*i+13),b=50*(x=s(i+1))(),w=50*x(),k=Math.cos(j=(e.angle??0)+(x()-.5)*.5),N=Math.sin(j),M=Math.min(a,r),S=new Float32Array((C=Math.ceil(a/2)+3)*(F=Math.ceil(r/2)+3)),$=new Float32Array(C*F),E=new Float32Array(a*r),A=new Float32Array(a*r),P=new Uint8ClampedArray(a*r*4),q=0,z=e=>{for(let t=0;t<C;t++){let s=((t-1)*2-a/2)/M,i=((e-1)*2-r/2)/M,n=(s*k-i*N)*c,o=(s*N+i*k)*c;g&&(n*=.14,o*=2.2);let l=u(n+=b,o+=w,3),d=u(n+5.2,o+1.3,3),p=u(n+h*l+1.7,o+h*d+9.2,3),f=u(n+h*l+8.3,o+h*d+2.8,3);S[e*C+t]=u(n+h*p,o+h*f,4),$[e*C+t]=Math.sqrt(l*l+d*d)}},{width:a,height:r,pixels:P,step:e=>{if(q>=F)return!0;let t=Math.min(F,q+Math.max(1,e));for(;q<t;)z(q++);return!(q<F)&&((()=>{let e=(e,t,a,r)=>(-e+9*t+9*a-r)/16,t=new Float32Array(a*F);for(let r=0;r<F;r++){let s=r*C;for(let i=0;i<a;i++){let n=(i>>1)+1;t[r*a+i]=1&i?e(S[s+n-1],S[s+n],S[s+n+1],S[s+n+2]):S[s+n]}}for(let s=0;s<r;s++){let r=(s>>1)+1;for(let i=0;i<a;i++){E[s*a+i]=1&s?e(t[(r-1)*a+i],t[r*a+i],t[(r+1)*a+i],t[(r+2)*a+i]):t[r*a+i];let n=(i>>1)+1,o=$[r*C+n],l=1&i?(o+$[r*C+n+1])/2:o,d=1&s?1&i?($[(r+1)*C+n]+$[(r+1)*C+n+1])/2:$[(r+1)*C+n]:l;A[s*a+i]=(l+d)/2}}})(),(()=>{let e=[],t=Math.max(1,Math.floor(E.length/4096));for(let a=0;a<E.length;a+=t)e.push(E[a]);e.sort((e,t)=>e-t);let s=e[Math.floor(.02*e.length)],i=1/(e[Math.floor(.98*e.length)]-s||1),n=i*M*.012;for(let e=0;e<r;e++)for(let t=0;t<a;t++){let o=e*a+t,l=(E[o]-s)*i;l=l<0?0:l>1?1:l;let c=1;for(;c<d.length-1&&d[c].t<l;)c++;let h=d[c-1],f=d[c],g=(l-h.t)/(f.t-h.t||1);g=(g=g<0?0:g>1?1:g)*g*(3-2*g);let u=(E[t<a-1?o+1:o]-E[t>0?o-1:o])*n,x=(E[e<r-1?o+a:o]-E[e>0?o-a:o])*n,b=(-(-.55*u)- -.65*x+.52)/Math.sqrt(u*u+x*x+1),y=Math.pow(b>0?b:0,24)*p*255,v=(.82+.28*b)*(1+.035*Math.sin(150*l+24*A[o]))*(1-m*Math.max(0,1-14*Math.abs(A[o]-.42))*.6);P[4*o]=(h.c[0]+(f.c[0]-h.c[0])*g)*v+y,P[4*o+1]=(h.c[1]+(f.c[1]-h.c[1])*g)*v+y,P[4*o+2]=(h.c[2]+(f.c[2]-h.c[2])*g)*v+y,P[4*o+3]=255}})(),!0)}}),priority:f,done:t}),function(){if(l)return;l=!0;let e=()=>{let t=performance.now()+7;for(;o.length&&performance.now()<t;){let e=o[0];if(e.job.step(4)){o.shift();let t=document.createElement("canvas");t.width=e.job.width,t.height=e.job.height,t.getContext("2d")?.putImageData(new ImageData(e.job.pixels,t.width,t.height),0,0),e.done(t)}}o.length?requestAnimationFrame(e):l=!1};requestAnimationFrame(e)}()}),n.set(t,a)),a).then(e=>{let t=g.current;r&&t&&(t.width=e.width,t.height=e.height,t.getContext("2d")?.drawImage(e,0,0),x(!0))}),()=>{r=!1}},[b,i,y,v,f]),(0,t.jsx)("canvas",{ref:g,"aria-hidden":"true",className:m,"data-ready":u||void 0,style:{width:c,height:h,maxWidth:"none"}})}let c="M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z",h="M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 176A22 22 0 0 1 318 198L22 198A22 22 0 0 1 0 176Z",p=[{name:"Cover — final",meta:"PNG · 4.8 MB",art:"ember"},{name:"Moodboard",meta:"24 images",art:"dusk"},{name:"Brief.pdf",meta:"PDF · 1.2 MB"}];function f({label:e="My Files",meta:r,tone:n="light",art:o="aurora",seed:l=3,image:g,files:u=p,action:x="add",onAdd:b,onFilesChange:y,menu:v=[],labelPlacement:w="bottom-left",open:j,defaultOpen:k=!1,onOpenChange:N,onFileSelect:M,width:C=340,appear:F=!0,appearDelay:S=0,className:$,style:E}){let A=a.useId().replace(/:/g,""),P=a.useRef(null),q=a.useRef(null),z=a.useRef(null),T=a.useRef(null),B=a.useRef(null),[R,_]=a.useState(u),I=a.useRef(u.map((e,t)=>t)),L=a.useRef(u.length),[O,Y]=a.useState(null),[D,G]=a.useState(0),[U,X]=a.useState(k),W=j??U,J=a.useCallback(e=>{void 0===j&&X(e),N?.(e)},[j,N]),[H,K]=a.useState(!1),[V,Z]=a.useState(!F),Q=C/340,ee=Math.min(1.5,Math.max(1,window.devicePixelRatio||1))*Q;a.useEffect(()=>{if(!F)return;let e=P.current;if(!e||"u"<typeof IntersectionObserver)return void Z(!0);let t=0,a=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(a.disconnect(),t=window.setTimeout(()=>Z(!0),S))},{threshold:.25});return a.observe(e),()=>{a.disconnect(),window.clearTimeout(t)}},[F,S]),a.useEffect(()=>{let e=P.current;if(!e)return;let t=0,a=0,r=0,s=()=>{t=0,e.style.setProperty("--gf-px",a.toFixed(3)),e.style.setProperty("--gf-py",r.toFixed(3))},i=i=>{if("touch"===i.pointerType)return;let n=e.getBoundingClientRect();a=(i.clientX-n.left)/n.width*2-1,r=(i.clientY-n.top)/n.height*2-1,t||(t=requestAnimationFrame(s))},n=()=>{a=0,r=0,t||(t=requestAnimationFrame(s))};return e.addEventListener("pointermove",i),e.addEventListener("pointerleave",n),()=>{e.removeEventListener("pointermove",i),e.removeEventListener("pointerleave",n),cancelAnimationFrame(t)}},[]),a.useEffect(()=>{q.current?.toggleAttribute("inert",!W)},[W]),a.useEffect(()=>{if(!W&&!H)return;let e=e=>{"Escape"===e.key&&(H?(K(!1),T.current?.focus()):(J(!1),z.current?.focus()))},t=e=>{let t=e.target;!H||B.current?.contains(t)||T.current?.contains(t)||K(!1),!W||H||P.current?.contains(t)||J(!1)};return document.addEventListener("keydown",e),document.addEventListener("pointerdown",t),()=>{document.removeEventListener("keydown",e),document.removeEventListener("pointerdown",t)}},[W,H,J]),a.useEffect(()=>{H&&B.current?.querySelector("[role=menuitem]")?.focus()},[H]);let et=[{label:W?"Close folder":"Open folder",onSelect:()=>J(!W)},...v],ea=Math.max(0,R.length-4),er=R.slice(ea),es=R.length,ei=r??es+(1===es?" item":" items");return(0,t.jsxs)("div",{ref:P,className:"gf-root"+($?" "+$:""),"data-tone":n,"data-open":W||void 0,"data-entered":V||void 0,"data-place":w,style:{width:C,height:326*Q,...E},children:[(0,t.jsx)("style",{children:m}),(0,t.jsx)("div",{className:"gf-stage",style:{transform:"translateY("+54*Q+"px) scale("+Q+")"},children:(0,t.jsxs)("div",{className:"gf-tilt",children:[(0,t.jsx)("div",{className:"gf-shadow","aria-hidden":"true"}),(0,t.jsxs)("div",{className:"gf-back",style:{clipPath:"path('"+c+"')"},"aria-hidden":"true",children:[g?(0,t.jsx)("img",{className:"gf-art",src:g,alt:"",width:364,height:296,draggable:!1}):"none"!==o?(0,t.jsx)(d,{className:"gf-art",art:o,seed:l,w:364,h:296,density:ee,priority:0}):null,(0,t.jsx)("div",{className:"gf-back-sheen"})]}),(0,t.jsx)("svg",{className:"gf-rim gf-back-rim",viewBox:"0 0 340 272","aria-hidden":"true",children:(0,t.jsx)("path",{d:c})}),(0,t.jsxs)("div",{className:"gf-front"+(D?" gf-front--bump":""),style:{clipPath:"path('"+h+"')"},children:[(0,t.jsx)("div",{className:"gf-tint","aria-hidden":"true"}),(0,t.jsx)("div",{className:"gf-spec","aria-hidden":"true"}),(0,t.jsxs)("svg",{className:"gf-rim gf-front-rim",viewBox:"0 0 340 198","aria-hidden":"true",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:"gf-rim-"+A,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0",stopColor:"#fff",stopOpacity:"0.95"}),(0,t.jsx)("stop",{offset:"0.35",stopColor:"#fff",stopOpacity:"0.35"}),(0,t.jsx)("stop",{offset:"1",stopColor:"#fff",stopOpacity:"0.12"})]})}),(0,t.jsx)("path",{d:h,stroke:"url(#gf-rim-"+A+")"})]}),(0,t.jsx)("button",{ref:z,type:"button",className:"gf-hit","aria-expanded":W,"aria-label":(W?"Close ":"Open ")+e+", "+es+(1===es?" item":" items"),onClick:()=>{K(!1),J(!W)}}),(0,t.jsxs)("div",{className:"gf-label",children:[(0,t.jsx)("span",{className:"gf-title",children:e}),(0,t.jsx)("span",{className:"gf-meta",children:ei},ei)]})]},D),(0,t.jsx)("div",{ref:q,className:"gf-files",role:"list","aria-label":e+" contents",children:er.map((e,a)=>{var r;let n=I.current[ea+a],o=(r=er.length)<=1?0:a/(r-1)*2-1,l=s(i(e.name)+n),c=!!(e.art||e.image),h=(0,t.jsxs)(t.Fragment,{children:[c?e.image?(0,t.jsx)("img",{className:"gf-sheet-art",src:e.image,alt:"",width:272,height:184,draggable:!1}):(0,t.jsx)(d,{className:"gf-sheet-art",art:e.art,seed:i(e.name)%997,w:272,h:184,density:Math.min(ee,1.25),priority:1}):(0,t.jsxs)("span",{className:"gf-lines","aria-hidden":"true",children:[(0,t.jsx)("i",{style:{width:"86%"}}),(0,t.jsx)("i",{style:{width:"92%"}}),(0,t.jsx)("i",{style:{width:"64%"}}),(0,t.jsx)("i",{style:{width:"88%"}}),(0,t.jsx)("i",{style:{width:"42%"}})]}),(0,t.jsxs)("span",{className:"gf-sheet-head",children:[(0,t.jsx)("span",{className:"gf-sheet-name",children:e.name}),e.meta?(0,t.jsx)("span",{className:"gf-sheet-meta",children:e.meta}):null]})]}),p={className:"gf-sheet"+(c?" gf-sheet--art":"")+(n===O?" gf-sheet--drop":""),style:{"--gf-slot":o,"--gf-depth":er.length-1-a,"--gf-jx":((l()-.5)*10).toFixed(2)+"px","--gf-jr":((l()-.5)*3.2).toFixed(2)+"deg",zIndex:a+1},onAnimationEnd:n===O?()=>Y(null):void 0};return(0,t.jsx)("div",{role:"listitem",className:"gf-sheet-slot",children:e.href?(0,t.jsx)("a",{...p,href:e.href,onClick:()=>M?.(e,ea+a),children:h}):(0,t.jsx)("button",{...p,type:"button",onClick:()=>M?.(e,ea+a),children:h})},n)})}),"none"!==x?(0,t.jsx)("button",{ref:T,type:"button",className:"gf-key gf-key--"+x,"aria-label":"add"===x?"Add a file to "+e:"More options for "+e,"aria-haspopup":"more"===x?"menu":void 0,"aria-expanded":"more"===x?H:void 0,"aria-controls":"more"===x?"gf-menu-"+A:void 0,onClick:()=>{let e,t,a;return"add"===x?(e=b?.(R)||{name:"Untitled "+(R.length+1),meta:"Just now"},t=[...R,e],a=L.current++,void(I.current=[...I.current,a],_(t),Y(a),G(e=>e+1),y?.(t))):K(e=>!e)},children:"add"===x?(0,t.jsx)("svg",{className:"gf-glyph gf-glyph--plus",viewBox:"0 0 24 24","aria-hidden":"true",children:(0,t.jsx)("path",{d:"M12 4.5v15M4.5 12h15"})},D):(0,t.jsxs)("svg",{className:"gf-glyph gf-glyph--more",viewBox:"0 0 30 12","aria-hidden":"true",children:[(0,t.jsx)("rect",{x:"1",y:"1.5",width:"8",height:"9",rx:"3.4"}),(0,t.jsx)("rect",{x:"11",y:"1.5",width:"8",height:"9",rx:"3.4"}),(0,t.jsx)("rect",{x:"21",y:"1.5",width:"8",height:"9",rx:"3.4"})]})}):null,"more"===x?(0,t.jsx)("div",{ref:B,id:"gf-menu-"+A,role:"menu","aria-label":e+" options",className:"gf-menu","data-open":H||void 0,onKeyDown:e=>{let t=Array.from(B.current?.querySelectorAll("[role=menuitem]")??[]),a=t.indexOf(document.activeElement),r=a=>{e.preventDefault(),t[(a+t.length)%t.length]?.focus()};"ArrowDown"===e.key?r(a+1):"ArrowUp"===e.key?r(a-1):"Home"===e.key?r(0):"End"===e.key?r(t.length-1):"Tab"===e.key&&K(!1)},children:et.map((e,a)=>(0,t.jsx)("button",{type:"button",role:"menuitem",tabIndex:H?-1:void 0,disabled:!H,className:"gf-menu-item"+(e.danger?" gf-menu-item--danger":""),onClick:()=>{K(!1),T.current?.focus(),e.onSelect?.()},children:e.label},e.label+a))}):null]})})]})}let m=`
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
`,g={style:"marble",colors:["#FFF0F6","#FFD6E7","#FF8FBF","#FF3D8B","#C2185B","#FFE6F0","#FFFFFF"],scale:.7,warp:2.6,angle:-.5,gloss:.35,veins:.15};e.s(["FolderSlot",0,function({folder:e,delay:r}){let s=(0,a.useRef)(null),[i,n]=(0,a.useState)(0);return(0,a.useEffect)(()=>{let e=s.current;if(!e)return;let t=new ResizeObserver(([e])=>n(Math.round(Math.min(380,e.contentRect.width))));return t.observe(e),()=>t.disconnect()},[]),(0,t.jsx)("div",{ref:s,className:"flex w-full justify-center",style:{minHeight:i?void 0:"22rem"},children:i>0&&(0,t.jsx)(f,{label:e.label,meta:e.meta,tone:"light",art:e.image?"none":g,image:e.image,seed:7,action:"none",width:i,appearDelay:r,files:e.files.map(e=>({name:e.name,meta:e.meta,href:e.href,image:e.image}))})})}],6764)},90390,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(46607),s=e.i(40462);e.s(["HeroMotion",0,function({className:e,children:i}){let n=(0,a.useRef)(null);return(0,r.f)(n,()=>{let e={trigger:n.current,start:"top top",end:"bottom top",scrub:!0};s.f.to("[data-hero-media]",{yPercent:8,ease:"none",scrollTrigger:e}),s.f.to("[data-hero-copy]",{yPercent:-18,ease:"none",scrollTrigger:e}),s.f.to("[data-hero-leads]",{y:-120,ease:"none",scrollTrigger:e}),s.f.to("[data-hero-sticker]",{y:160,rotate:10,ease:"none",scrollTrigger:e})}),(0,t.jsx)("section",{ref:n,className:e,children:i})}])},14954,e=>{var t=e.i(43476),a=e.i(47782),r=e.i(71645),s=e.i(68877),i=e.i(89664),n=e.i(56420);let o={name:"lock",size:24,node:[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]};o.node;let l=(0,n.f)(o),d={name:"rotate-ccw",size:24,node:[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]};d.node;let c=(0,n.f)(d);var h=e.i(84026);let p={name:"wrench",size:24,node:[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",key:"1ngwbx"}]]};p.node;let f=(0,n.f)(p);var m=e.i(63676),g=e.i(89042),u=e.i(96199);let x=e=>e.toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0});function b({value:e}){let[a,s]=(0,r.useState)(e),i=(0,r.useRef)(e);return(0,r.useEffect)(()=>{let t=i.current;if(t===e)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){i.current=e,s(e);return}let a=performance.now(),r=0,n=o=>{let l=Math.min(1,(o-a)/600),d=Math.round(t+(e-t)*(1-Math.pow(1-l,4)));i.current=d,s(d),l<1&&(r=requestAnimationFrame(n))};return r=requestAnimationFrame(n),()=>cancelAnimationFrame(r)},[e]),(0,t.jsx)(t.Fragment,{children:x(a)})}let y=[{q:"Is your phone number at the top of every page on a phone?",fix:"Put your number in the header of every page. On phones, make it a tap-to-call link."},{q:"Can a visitor call you with one tap from anywhere on the page?",fix:"Add a sticky call button on mobile that stays visible as people scroll."},{q:"Does each main service have its own page?",fix:"Give every money-making job (water heaters, drains, repiping...) its own page. Google ranks pages, not websites."},{q:"Do you have pages for the towns you serve?",fix:"Add real, useful pages for your main service areas, not copies with the city name swapped."},{q:"Do you show real Google reviews on your site?",fix:"Show your real Google rating and a few recent reviews near the top, linked to the source."},{q:"Are there real photos of you, your team or your trucks?",fix:"Swap stock photos for real ones. Homeowners want to see who is coming to their house."},{q:"Does your homepage load fast on a phone (about 3 seconds or less)?",fix:"Compress images and cut heavy scripts. Test it free with Google PageSpeed Insights."},{q:"Is your Google Business Profile complete and linked to your website?",fix:"Fill in categories, services, service area, hours and photos, and link it to your site."}];e.s(["JobValueCalculator",0,function(){let[e,i]=(0,r.useState)(450),[n,o]=(0,r.useState)(3),[l,d]=(0,r.useState)(!1),c=l?null:(0,t.jsxs)(t.Fragment,{children:[" ",(0,t.jsx)("span",{className:"ml-1 align-middle font-sans text-t3 font-semibold text-white/90",children:"SAMPLE"})]}),h={t:(0,r.useId)(),j:(0,r.useId)()},p=e*n*52;return(0,t.jsx)("section",{className:"bg-paper py-24 md:py-32","aria-labelledby":"calc-h",children:(0,t.jsxs)("div",{className:"container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20",children:[(0,t.jsxs)(u.f,{children:[(0,t.jsxs)("h2",{id:"calc-h",className:"display text-t1",children:["What are a few extra jobs ",(0,t.jsx)("span",{className:"accent",children:"worth to you?"})]}),(0,t.jsx)("p",{className:"mt-5 max-w-lg text-t3 text-slate",children:"Move the sliders to your own numbers. This isn't a promise of results. It shows what's at stake when your website sends calls to someone else."})]}),(0,t.jsxs)(u.f,{delay:.1,className:"on-blue blueprint rounded-md border-2 border-ink p-7 text-white shadow-[8px_8px_0_var(--color-ink)] md:p-10",children:[(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex items-baseline justify-between gap-4",children:[(0,t.jsx)("label",{htmlFor:h.t,className:"font-semibold",children:"Your average job value"}),(0,t.jsxs)("output",{htmlFor:h.t,className:"font-display text-t2 font-bold text-white",children:[x(e),c]})]}),(0,t.jsx)("input",{id:h.t,type:"range",min:100,max:3e3,step:50,value:e,onChange:e=>{i(+e.target.value),d(!0)},className:"mt-4 h-11 w-full cursor-pointer accent-[var(--color-royal)]"})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex items-baseline justify-between gap-4",children:[(0,t.jsx)("label",{htmlFor:h.j,className:"font-semibold",children:"Extra booked jobs per week"}),(0,t.jsxs)("output",{htmlFor:h.j,className:"font-display text-t2 font-bold text-white",children:[n,c]})]}),(0,t.jsx)("input",{id:h.j,type:"range",min:1,max:20,step:1,value:n,onChange:e=>{o(+e.target.value),d(!0)},className:"mt-4 h-11 w-full cursor-pointer accent-[var(--color-royal)]"})]})]}),(0,t.jsxs)("div",{className:"mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-t3 text-white/90",children:"Extra revenue per month"}),(0,t.jsxs)("p",{className:"font-display text-t2 font-extrabold","aria-live":"polite",children:[(0,t.jsx)(b,{value:Math.round(p/12)}),c]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-t3 text-white/90",children:"Extra revenue per year"}),(0,t.jsxs)("p",{className:"font-display text-t2 font-extrabold text-white","aria-live":"polite",children:[(0,t.jsx)(b,{value:p}),c]})]})]}),(0,t.jsxs)(a.f,{href:"/free-website-audit/",className:"btn btn-gold mt-8 w-full",children:["See what your site is missing",(0,t.jsx)(s.f,{className:"h-4.5 w-4.5","aria-hidden":!0})]})]})]})})},"WebsiteGrader",0,function(){let[e,n]=(0,r.useState)(()=>y.map(()=>null)),o=e.findIndex(e=>null===e),d=-1===o,p=(0,r.useMemo)(()=>e.filter(Boolean).length,[e]),x=e=>n(t=>t.map((t,a)=>a===o?e:t)),b=y.length;return(0,t.jsxs)("section",{className:"relative overflow-hidden bg-ivory py-24 md:py-32","aria-labelledby":"grader-h",children:[(0,t.jsx)("div",{"aria-hidden":!0,className:"hero-dots pointer-events-none absolute bottom-10 left-0 h-72 w-[30%]"}),(0,t.jsxs)("div",{className:"container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20",children:[(0,t.jsxs)(u.f,{children:[(0,t.jsxs)("h2",{id:"grader-h",className:"display text-t1",children:["Is your website costing you jobs? ",(0,t.jsx)("span",{className:"accent",children:"60 seconds."})]}),(0,t.jsx)("p",{className:"mt-5 max-w-md text-t3 text-slate md:text-t2",children:"Eight yes-or-no questions. You get a score and the exact fixes for anything you answer no to."}),(0,t.jsx)("ul",{className:"mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1",children:[[h.f,"Free, no email needed"],[l,"Nothing is sent anywhere"],[f,"Real fixes, not a pitch"]].map(([e,a])=>(0,t.jsxs)("li",{className:"gr-trust",children:[(0,t.jsx)(e,{className:"h-5 w-5","aria-hidden":!0}),a]},a))})]}),(0,t.jsxs)(u.f,{delay:.1,className:"gr-card",children:[(0,t.jsx)("img",{src:d?p>=6?"/bobo/cheer.webp":"/bobo/sorry.webp":"/bobo/think.webp",alt:d?p>=6?"Bobo the duck cheering":"Bobo the duck looking worried":"Bobo the duck thinking",width:120,height:120,className:"pointer-events-none absolute -top-[4.5rem] right-4 h-24 w-24 md:-top-24 md:h-28 md:w-28"}),(0,t.jsxs)("div",{className:"flex items-center justify-between gap-4 text-t3 font-semibold text-slate",children:[(0,t.jsx)("span",{children:d?"Your result":`Question ${o+1} of ${b}`}),(0,t.jsxs)("button",{type:"button",onClick:()=>n(y.map(()=>null)),className:"inline-flex min-h-11 items-center gap-1.5 rounded px-3 hover:text-ink",children:[(0,t.jsx)(c,{className:"h-4 w-4","aria-hidden":!0}),"Start over"]})]}),(0,t.jsx)("ol",{"aria-hidden":!0,className:"mt-3 grid gap-1.5",style:{gridTemplateColumns:`repeat(${b},1fr)`},children:e.map((e,a)=>(0,t.jsx)("li",{className:`gr-seg ${!0===e?"yes":!1===e?"no":a===o?"now":""}`},a))}),(0,t.jsxs)("div",{className:"mt-8 grid min-h-[17rem] gap-8 md:grid-cols-[minmax(0,1fr)_auto]","aria-live":"polite",children:[d?(0,t.jsxs)("div",{className:"enter-fade",children:[(0,t.jsx)("p",{className:"mt-1 text-t3 font-semibold",children:p>=7?"Strong foundation. A few tweaks could squeeze more calls out of it.":p>=4?"You're leaving calls on the table. The fixes below are where to start.":"Your website is probably costing you jobs every week. Good news: it's fixable."}),p<b&&(0,t.jsx)("ul",{className:"mt-6 space-y-3",children:y.map((a,r)=>!1===e[r]&&(0,t.jsxs)("li",{className:"gr-fix",children:[(0,t.jsx)(s.f,{className:"mt-1 h-4 w-4 shrink-0 text-ribbon-deep","aria-hidden":!0}),a.fix]},a.q))}),(0,t.jsx)("div",{className:"mt-8 flex flex-wrap gap-3",children:(0,t.jsxs)(a.f,{href:"/free-website-audit/",className:"btn btn-primary",children:[g.B.secondaryCta,(0,t.jsx)(s.f,{className:"h-4.5 w-4.5","aria-hidden":!0})]})})]},"result"):(0,t.jsxs)("div",{className:"enter-slide",children:[(0,t.jsx)("p",{className:"font-display text-t2 font-extrabold",children:y[o].q}),(0,t.jsxs)("div",{className:"mt-8 grid gap-3 sm:grid-cols-2",children:[(0,t.jsxs)("button",{type:"button",onClick:()=>x(!0),className:"gr-ans yes",children:[(0,t.jsx)(i.f,{className:"h-6 w-6","aria-hidden":!0}),"Yes"]}),(0,t.jsxs)("button",{type:"button",onClick:()=>x(!1),className:"gr-ans",children:[(0,t.jsx)(m.X,{className:"h-6 w-6","aria-hidden":!0}),"No / not sure"]})]})]},o),(0,t.jsxs)("div",{className:"gr-ring order-first md:order-none",role:"img","aria-label":`Score so far: ${p} of ${b}`,children:[(0,t.jsxs)("svg",{viewBox:"0 0 64 64","aria-hidden":!0,children:[(0,t.jsx)("circle",{cx:"32",cy:"32",r:"27"}),(0,t.jsx)("circle",{cx:"32",cy:"32",r:"27",className:"fill",style:{strokeDashoffset:169.6*(1-p/b)}})]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("b",{className:"font-display",children:p}),(0,t.jsxs)("span",{children:["/",b]})]})]})]})]})]})]})}],14954)},56967,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(89664),s=e.i(46607),i=e.i(40462),n=e.i(32361);let o=[{pain:"An agency that learns your trade on your dime",promise:"Plumbers only"},{pain:"Your website held hostage if you ever leave",promise:"You own your website"},{pain:"A sales pitch before a straight answer",promise:"Free 30-minute strategy call"},{pain:"Reports full of jargon nobody reads",promise:"Reports in plain English"},{pain:"No idea which calls came from the website",promise:"Calls, forms and leads tracked"},{pain:"They vanish the day the site goes live",promise:"Support after launch"},{pain:"Projects that drag on with no end date",promise:"A timeline before we start"}];e.s(["Promises",0,function(){let e=(0,a.useRef)(null);return(0,s.f)(e,()=>{i.f.utils.toArray("[data-row]").forEach(e=>{i.f.timeline({scrollTrigger:{trigger:e,start:"top 82%",once:!0}}).from(e.querySelector("[data-pain]"),{autoAlpha:0,x:-16,duration:.4,ease:"power2.out"}).from(e.querySelector("[data-promise]"),{xPercent:12,autoAlpha:0,rotate:3,duration:.55,ease:"back.out(1.6)"},"<0.1")}),i.f.from("[data-panel-bobo]",{y:60,rotate:-12,ease:"back.out(1.4)",duration:.9,scrollTrigger:{trigger:"[data-panel]",start:"top 75%",once:!0}})}),(0,t.jsxs)("section",{ref:e,"aria-labelledby":"promise-h",className:"relative overflow-x-clip bg-white pt-52 pb-28 md:pt-72 md:pb-36",children:[(0,t.jsx)("div",{"aria-hidden":!0,className:"pointer-events-none absolute top-24 left-[-10%] -z-0 aspect-square w-[min(44rem,70vw)] rounded-full bg-sky"}),(0,t.jsxs)("div",{className:"container-x relative grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16",children:[(0,t.jsxs)("div",{className:"lg:sticky lg:top-32 lg:self-start",children:[(0,t.jsxs)("h2",{id:"promise-h",className:"display text-t1",children:["No runaround. ",(0,t.jsx)("span",{className:"accent",children:"Just more booked jobs."})]}),(0,t.jsx)("p",{className:"mt-6 max-w-md text-t3 text-slate md:text-t2",children:"You have heard the agency pitch before. Here is what changes when you work with me, in plain English."}),(0,t.jsx)("div",{className:"mt-9 hidden lg:block",children:(0,t.jsx)(n.f,{})})]}),(0,t.jsxs)("div",{"data-panel":!0,className:"relative mt-14 lg:mt-0 lg:-mr-[clamp(1rem,2.2vw,2.5rem)]",children:[(0,t.jsx)("img",{"data-panel-bobo":!0,src:"/brand/bobo-full.webp",alt:"Bobo the duck",width:480,height:549,loading:"lazy",decoding:"async",className:"absolute -top-[5.25rem] right-6 w-28 md:-top-[9.5rem] md:w-36"}),(0,t.jsxs)("div",{className:"relative z-10 rounded-3xl bg-ink px-5 pt-8 pb-8 text-white shadow-[12px_12px_0_var(--color-ribbon)] md:px-10 md:pt-10 md:pb-12 lg:rounded-r-none",children:[(0,t.jsxs)("div",{"aria-hidden":!0,className:"mb-6 grid gap-3 border-b border-white/10 pb-6 md:mb-8 md:grid-cols-2 md:gap-8 md:pb-8",children:[(0,t.jsx)("div",{className:"fit-box",children:(0,t.jsx)("p",{className:"fit-title tall display text-mist [--fit:11.2] [letter-spacing:1.7cqi]",children:"OTHER AGENCIES"})}),(0,t.jsx)("div",{className:"fit-box",children:(0,t.jsxs)("p",{className:"fit-title tall display text-white [--fit:11.2]",children:["PLUMBER ",(0,t.jsx)("span",{className:"text-ribbon",children:"KING"})," AGENCY"]})})]}),(0,t.jsx)("h3",{className:"sr-only",children:"Other agencies compared with Plumber King Agency"}),(0,t.jsx)("ol",{className:"relative",children:o.map((e,a)=>(0,t.jsxs)("li",{"data-row":!0,className:"grid gap-2 border-b border-white/10 py-5 first:pt-0 last:border-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-8",children:[(0,t.jsxs)("p",{className:"relative self-start text-t3 text-mist md:self-center",children:[(0,t.jsx)("span",{"data-pain":!0,children:e.pain}),(0,t.jsx)("span",{className:"sr-only",children:" (not with us)"})]}),(0,t.jsxs)("p",{"data-promise":!0,className:"flex items-center gap-3 text-t2 font-bold",children:[(0,t.jsx)("span",{className:`grid h-9 w-9 shrink-0 place-items-center rounded-full ${a%2?"bg-white text-ink":"bg-ribbon-deep text-white"}`,children:(0,t.jsx)(r.f,{className:"h-5 w-5","aria-hidden":!0})}),e.promise]})]},e.promise))})]})]}),(0,t.jsx)("div",{className:"flex justify-center lg:hidden",children:(0,t.jsx)(n.f,{})})]})]})}])},93850,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(89664),s=e.i(56420);let i={name:"chevrons-left-right",size:24,node:[["path",{d:"m9 7-5 5 5 5",key:"j5w590"}],["path",{d:"m15 7 5 5-5 5",key:"1bl6da"}]]};i.node;let n=(0,s.f)(i);var o=e.i(63676),l=e.i(46607),d=e.i(40462),c=e.i(96199);let h=["Template look, same as every competitor","Phone number buried in the footer","No reason to trust you over the next guy","Slow on a phone with one bar of signal"],p=["Built around the jobs you want more of","Call button under every thumb","Reviews, photos and promises up front","Loads fast on any phone"];function f({src:e,label:a}){return(0,t.jsx)("img",{src:e,alt:a,width:1296,height:768,loading:"lazy",decoding:"async",className:"h-full w-full object-cover object-top",draggable:!1})}function m({value:e,onValueChange:r,before:s,after:i}){let o=(0,a.useRef)(null),l=(0,a.useId)(),d=Math.max(0,Math.min(100,e)),c=e=>{let t=o.current.getBoundingClientRect();t.width&&r(Math.round(Math.max(0,Math.min(100,(e-t.left)/t.width*100))))};return(0,t.jsxs)("figure",{children:[(0,t.jsxs)("div",{ref:o,className:"relative aspect-[4/3] cursor-ew-resize touch-pan-y overflow-hidden rounded-xl border-4 border-ink bg-white shadow-[12px_12px_0_var(--color-ink)] select-none sm:aspect-[27/16]",onPointerDown:e=>{0===e.button&&(e.currentTarget.setPointerCapture(e.pointerId),c(e.clientX))},onPointerMove:e=>{e.currentTarget.hasPointerCapture(e.pointerId)&&c(e.clientX)},onPointerUp:e=>{e.currentTarget.hasPointerCapture(e.pointerId)&&e.currentTarget.releasePointerCapture(e.pointerId)},children:[(0,t.jsx)("div",{className:"absolute inset-0","aria-hidden":!0,children:i}),(0,t.jsx)("div",{className:"absolute inset-0","aria-hidden":!0,style:{clipPath:`inset(0 ${100-d}% 0 0)`},children:s}),(0,t.jsxs)("span",{"aria-hidden":!0,className:"pointer-events-none absolute inset-0",style:{transform:`translate3d(${d}%,0,0)`},children:[(0,t.jsx)("span",{className:"absolute inset-y-0 left-0 w-[3px] -translate-x-1/2 bg-ink"}),(0,t.jsx)("span",{className:"absolute top-1/2 left-0 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md border-2 border-ink bg-white text-ink shadow-[3px_3px_0_var(--color-ink)]",children:(0,t.jsx)(n,{className:"h-5 w-5"})})]}),(0,t.jsx)("span",{"aria-hidden":!0,className:"sticker absolute top-4 left-4 bg-slate text-white",style:{"--tilt":"-3deg"},children:"Typical site"}),(0,t.jsx)("span",{"aria-hidden":!0,className:"sticker absolute top-4 right-4 bg-royal text-white",style:{"--tilt":"3deg"},children:"Plumber King site"})]}),(0,t.jsx)("label",{htmlFor:l,className:"sr-only",children:"Compare a typical plumber website with a Plumber King website"}),(0,t.jsx)("input",{id:l,type:"range",min:0,max:100,value:d,onChange:e=>r(Number(e.target.value)),"aria-valuetext":`${d}% typical site shown`,className:"mt-4 h-11 w-full cursor-pointer accent-[var(--color-ribbon)]"})]})}e.s(["ProblemSplit",0,function(){let e=(0,a.useRef)(null),[s,i]=(0,a.useState)(72);return(0,l.f)(e,()=>{let e={v:92};d.f.to(e,{v:50,duration:1.4,ease:"power3.inOut",onUpdate:()=>i(Math.round(e.v)),scrollTrigger:{trigger:"[data-compare]",start:"top 70%",once:!0}})}),(0,t.jsxs)("section",{ref:e,className:"relative overflow-x-clip bg-ivory py-24 md:py-32","aria-labelledby":"problem-h",children:[(0,t.jsx)("div",{"aria-hidden":!0,className:"hero-dots pointer-events-none absolute top-16 right-0 h-72 w-[34%]"}),(0,t.jsxs)("div",{className:"container-x relative",children:[(0,t.jsxs)(c.f,{className:"grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end",children:[(0,t.jsxs)("h2",{id:"problem-h",className:"display text-t1",children:["Your website rings a phone. ",(0,t.jsx)("span",{className:"accent",children:"Yours, or the other guy's."})]}),(0,t.jsx)("p",{className:"text-t3 text-slate md:text-t2",children:"A website that doesn't bring in calls quietly sends your jobs to the plumber down the road. Drag the handle and see the difference."})]}),(0,t.jsxs)("div",{className:"relative mt-14 lg:mt-20 lg:px-[6%]",children:[(0,t.jsx)("div",{"data-compare":!0,children:(0,t.jsx)(m,{value:s,onValueChange:i,before:(0,t.jsx)(f,{src:"/work/ridgeline-before.webp",label:"Typical plumber website"}),after:(0,t.jsx)(f,{src:"/work/ridgeline-after.webp",label:"Rebuilt plumber website"})})}),(0,t.jsxs)(c.f,{className:"relative z-10 mt-8 rounded-xl border-2 border-ink/15 bg-white p-6 shadow-[6px_6px_0_rgb(20_20_20/0.12)] lg:absolute lg:bottom-10 lg:-left-2 lg:mt-0 lg:w-[22rem] lg:-rotate-2",children:[(0,t.jsx)("h3",{className:"display text-t2 text-slate",children:"The typical plumber site"}),(0,t.jsx)("ul",{className:"mt-4 space-y-2.5",children:h.map(e=>(0,t.jsxs)("li",{className:"flex gap-3 text-t3 text-slate",children:[(0,t.jsx)(o.X,{className:"mt-1 h-4 w-4 shrink-0 text-royal","aria-hidden":!0}),e]},e))})]}),(0,t.jsx)(c.f,{delay:.1,className:"relative z-10 mt-6 lg:absolute lg:top-[42%] lg:-right-2 lg:mt-0 lg:w-[22rem]",children:(0,t.jsxs)("div",{className:"ring-card rounded-xl border-2 border-ink bg-white p-6 shadow-[8px_8px_0_var(--color-ribbon)] lg:rotate-2",children:[(0,t.jsx)("h3",{className:"display text-t2 text-royal",children:"A Plumber King site"}),(0,t.jsx)("ul",{className:"mt-4 space-y-2.5",children:p.map(e=>(0,t.jsxs)("li",{className:"flex gap-3 text-t3",children:[(0,t.jsx)(r.f,{className:"mt-1 h-4 w-4 shrink-0 text-royal","aria-hidden":!0}),e]},e))})]})})]})]})]})}],93850)},88424,e=>{var t=e.i(43476),a=e.i(71645);let r=[0,0,1,1];var s=e.i(56420);let i={name:"phone-call",size:24,node:[["path",{d:"M13 2a9 9 0 0 1 9 9",key:"1itnx2"}],["path",{d:"M13 6a5 5 0 0 1 5 5",key:"11nki7"}],["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]};i.node;let n=(0,s.f)(i),o={name:"search",size:24,node:[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]};o.node;let l=(0,s.f)(o);var d=e.i(84026);function c({children:e,className:a=""}){return(0,t.jsx)("div",{"data-mock":!0,className:`relative rounded-[2.6rem] bg-[#1c1f26] p-[10px] shadow-[0_40px_120px_-30px_rgb(20_35_61/0.45),0_0_0_1px_rgb(255_255_255/0.08)] ${a}`,children:(0,t.jsxs)("div",{className:"relative overflow-hidden rounded-[2rem] bg-[#15181f] text-white",children:[(0,t.jsx)("div",{"aria-hidden":!0,className:"absolute top-2 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black"}),(0,t.jsx)("div",{className:"pt-4",children:e})]})})}var h=e.i(32361),p=e.i(89860);let f=[{key:"found",label:"Found",title:"They search. You show up.",body:'"Emergency plumber near me." "Who fixes water heaters in Cary?" Whether they type it into Google or ask an AI assistant, your business is built to be one of the answers: service pages, Google Business Profile, schema markup and clear answers that search engines can read.'},{key:"trusted",label:"Trusted",title:"They land. They trust you in seconds.",body:"Real photos of you and your trucks, your real reviews and what makes you different, right where a worried homeowner looks first. No stock-photo models, no walls of text."},{key:"booked",label:"Booked",title:"They tap. Your phone rings.",body:"A call button under every thumb, a two-field quote form for the people who would rather type, and every lead sent to your phone straight away, so you get the job before they call someone else."}],m=[{icon:l,text:"emergency plumber near me",cls:"top-[8%] -left-[22%] bg-white text-ink",tilt:"-6deg"},{icon:d.f,text:"Real photos, real you",cls:"top-[42%] -right-[26%] bg-ink text-white",tilt:"5deg"},{icon:n,text:"New call from your site",cls:"bottom-[10%] -left-[18%] bg-ribbon-deep text-white",tilt:"-4deg"}],g=[{src:"/media/screen-found.webp",alt:"Phone search for emergency plumber near me: an AI answer and the map list both show Your Plumbing Co. first"},{src:"/media/screen-trusted.webp",alt:"Phone showing the plumber's website: a headline, five stars, a Call now button and trust points"},{src:"/media/screen-booked.webp",alt:"Phone showing an incoming call from the website: new customer, water heater leaking"}];e.s(["StoryScroll",0,function(){let e=(0,a.useRef)(null),s=function(){let[e,t]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{let e=window.matchMedia("(prefers-reduced-motion: reduce)");t(e.matches);let a=()=>t(e.matches);return e.addEventListener("change",a),()=>e.removeEventListener("change",a)},[]),e}(),[i,n]=(0,a.useState)(0),o=(0,a.useRef)(null);!function(e,t,r,s=!1){(0,a.useEffect)(()=>{let a=e.current;if(!a||!s&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let i=0,n=()=>{i=0,r(function(e,[t,a,r,s]){let i=e.getBoundingClientRect(),n=window.innerHeight,o=i.top+t*i.height-a*n,l=i.top+r*i.height-s*n;return Math.min(1,Math.max(0,o===l?0:o/(o-l)))}(a,t))},o=()=>{i||(i=requestAnimationFrame(n))};return n(),window.addEventListener("scroll",o,{passive:!0}),window.addEventListener("resize",o),()=>{window.removeEventListener("scroll",o),window.removeEventListener("resize",o),cancelAnimationFrame(i)}},[e,s,...t])}(e,r,e=>{n(Math.min(2,Math.floor(3.2*e))),o.current&&(o.current.style.transform=`scaleY(${Math.min(1,1.15*e)})`)},!0);let l=(e,a=!1)=>(0,t.jsxs)("ol",{className:"relative mt-10 space-y-14 pl-14",children:[(0,t.jsx)("div",{"aria-hidden":!0,className:"absolute top-2 bottom-2 left-[1.1rem] w-1 rounded bg-ink/10",children:(0,t.jsx)("div",{ref:o,className:"h-full w-full origin-top scale-y-0 rounded bg-ribbon"})}),f.map((r,s)=>{let i=m[s].icon,n=s===e;return(0,t.jsxs)("li",{"aria-current":n?"step":void 0,className:`step ${n?"on":""}`,children:[(0,t.jsx)("span",{className:`step-dot ${n||a?"on":""}`,children:(0,t.jsx)(i,{className:"h-5 w-5","aria-hidden":!0})}),(0,t.jsxs)("h3",{className:"display text-t2",children:[r.label,": ",r.title]}),(0,t.jsx)("p",{className:"mt-2 max-w-lg text-t3",children:r.body})]},r.key)})]});return s?(0,t.jsx)("section",{className:"bg-sky py-24","aria-labelledby":"story-h",children:(0,t.jsxs)("div",{className:"container-x max-w-4xl",children:[(0,t.jsxs)("h2",{id:"story-h",className:"display text-t1",children:["From invisible to ",(0,t.jsx)("span",{className:"accent",children:"booked."})]}),l(-1,!0),(0,t.jsx)("div",{className:"mt-12",children:(0,t.jsx)(h.f,{})})]})}):(0,t.jsx)("section",{ref:e,className:"relative overflow-x-clip bg-sky lg:h-[240vh]","aria-labelledby":"story-h",children:(0,t.jsxs)("div",{className:"relative pt-24 pb-44 lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:items-center lg:overflow-hidden lg:py-0",children:[(0,t.jsx)(p.WalkingBobo,{}),(0,t.jsx)("div",{"aria-hidden":!0,className:"hero-dots pointer-events-none absolute top-[12%] right-0 h-64 w-[30%] rotate-180"}),(0,t.jsxs)("div",{className:"container-x grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20",children:[(0,t.jsxs)("div",{className:"relative mx-auto w-full max-w-[19rem] lg:max-w-[22rem]",children:[(0,t.jsx)("div",{"aria-hidden":!0,className:"absolute -inset-x-[30%] top-[6%] -bottom-[6%] rounded-t-full bg-[linear-gradient(180deg,var(--color-ribbon),var(--color-ribbon-deep))]"}),(0,t.jsx)("div",{className:"relative -rotate-3",children:(0,t.jsx)(c,{children:(0,t.jsx)("div",{className:"h-[30rem]",children:(0,t.jsx)("img",{src:g[i].src,alt:g[i].alt,width:333,height:481,loading:"lazy",decoding:"async",className:"enter-fade block h-full w-full object-cover object-top"},i)})})}),m.map((e,a)=>(0,t.jsxs)("span",{"aria-hidden":!0,className:`sticker absolute hidden transition-[opacity,translate,scale] duration-700 ease-[cubic-bezier(.16,1,.3,1)] lg:inline-flex ${e.cls} ${a<=i?"translate-y-0 scale-100 opacity-100":"translate-y-6 scale-75 opacity-0"}`,style:{"--tilt":e.tilt},children:[(0,t.jsx)(e.icon,{className:"h-4 w-4"}),e.text]},e.text)),(0,t.jsx)("p",{className:"relative mt-4 text-center text-t3 text-white",children:"SAMPLE illustration"})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("h2",{id:"story-h",className:"display text-t1",children:["From invisible to ",(0,t.jsx)("span",{className:"accent",children:"booked."})]}),l(i),(0,t.jsx)("div",{className:`mt-10 transition-[opacity,translate] duration-700 lg:pl-14 ${2===i?"translate-y-0 opacity-100":"lg:translate-y-4 lg:opacity-0"}`,children:(0,t.jsx)(h.f,{})})]})]})]})})}],88424)},89860,e=>{var t=e.i(43476),a=e.i(71645),r=e.i(56420);let s={name:"pause",size:24,node:[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]]};s.node;let i=(0,r.f)(s),n={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};n.node;let o=(0,r.f)(n);e.s(["PauseMotion",0,function(){let[e,r]=(0,a.useState)(!1),[s,n]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{window.matchMedia("(prefers-reduced-motion: reduce)").matches||r(!0)},[]),e?(0,t.jsxs)("button",{type:"button",onClick:()=>{let e=!s;window.dispatchEvent(new CustomEvent("pk-motion",{detail:e})),document.documentElement.classList.toggle("pk-still",e),n(e)},"aria-pressed":s,"aria-label":s?"Play the moving strips and Bobo":"Pause the moving strips and Bobo",className:"pause-pill",children:[s?(0,t.jsx)(o,{className:"h-4 w-4 fill-current","aria-hidden":!0}):(0,t.jsx)(i,{className:"h-4 w-4 fill-current","aria-hidden":!0}),(0,t.jsxs)("span",{"aria-hidden":!0,children:[s?"Play":"Pause"," motion"]})]}):null},"WalkingBobo",0,function(){let e=(0,a.useRef)(null),r=(0,a.useRef)(null),[s,i]=(0,a.useState)(!1),[n,o]=(0,a.useState)(!1),[l,d]=(0,a.useState)(!1),c=(0,a.useRef)(!1);return(0,a.useEffect)(()=>{let t=e.current,a=navigator;if(!t||window.matchMedia("(prefers-reduced-motion: reduce)").matches||a.connection?.saveData)return;let s=new IntersectionObserver(([e])=>{e.isIntersecting&&(o(/^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent)),i(!0));let t=r.current;t&&(e.isIntersecting&&!c.current?t.play().catch(()=>{}):t.pause())},{rootMargin:"300px 0px"});s.observe(t);let n=e=>{let t=e.detail;c.current=t,d(t);let a=r.current;a&&(t?a.pause():a.play().catch(()=>{}))};return window.addEventListener("pk-motion",n),()=>{s.disconnect(),window.removeEventListener("pk-motion",n)}},[s]),(0,t.jsx)("div",{ref:e,"aria-hidden":!0,className:"walk-bobo",children:s&&(n?l?null:(0,t.jsx)("img",{src:"/bobo/walk.webp",alt:"",width:480,height:205,decoding:"async",className:"h-full w-full"}):(0,t.jsx)("video",{ref:r,muted:!0,loop:!0,playsInline:!0,autoPlay:!0,preload:"auto",className:"h-full w-full",children:(0,t.jsx)("source",{src:"/bobo/walk.webm",type:"video/webm"})}))})}],89860)}])})();