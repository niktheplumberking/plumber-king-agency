// QA fixes after r3-pagesA-svc-desk.js (17 Nov): log page 690 tall, margin lines to page height, stamp clear of rows, water-line label left of roots, slab label tan
const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
const pg=await figma.getNodeByIdAsync('481:437');await figma.setCurrentPageAsync(pg);
const book=await figma.getNodeByIdAsync('558:1616');book.resize(840,690);book.clipsContent=false;
for(const id of ['558:1617','558:1618']){const m=await figma.getNodeByIdAsync(id);m.resize(1,690);}
const st=await figma.getNodeByIdAsync('558:1713');st.x=690;st.y=600;
(await figma.getNodeByIdAsync('558:1825')).x=470;
(await figma.getNodeByIdAsync('558:1827')).fills=[solid(C.tan)];
