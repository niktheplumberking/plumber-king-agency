const AF=Object.getPrototypeOf(async function(){}).constructor;
for(const k of ['lib','r3'])Object.assign(globalThis,await (await new AF('return ('+figma.root.getSharedPluginData('pkmike',k)+')')())());
