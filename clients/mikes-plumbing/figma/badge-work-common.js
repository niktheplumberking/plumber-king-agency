// shared job data for Our work (desktop + mobile). pin = exact substring of a Yelp review (paired by job type, not the same job)
const JOBS=[
 {k:'mike',t:'Camera inspection, restaurant drain',tag:'Drains & sewer'},
 {k:'cleanout',t:'Digging out a sewer cleanout',tag:'Drains & sewer'},
 {k:'roots',t:'Roots inside a sewer line',tag:'Drains & sewer'},
 {k:'backflow',t:'Main line leak at the backflow',tag:'Leaks & lines',pin:['I came home to a fixed leak and spotless work site.','Stuart W.']},
 {k:'hosebib',t:'Pressure regulator and hose bib',tag:'Installs',pin:['We wanted our hose pipe moved back a few feet from its current location. He was able to come out and complete the job in one afternoon.','Pamela N.']},
 {k:'stucco',t:'Leak behind a stucco wall',tag:'Leaks & lines'},
 {k:'roughin',t:'Rough-in for a new bathroom',tag:'Installs'},
 {k:'interceptor',t:'Grease interceptor pumping',tag:'Commercial'},
 {k:'ytoilet',t:'New toilet, installed',tag:'Installs',pin:['Mike did a great job replacing and installing our new upstairs toilet.','Bruce H.']},
 {k:'yasphalt',t:'Asphalt patched after a line repair',tag:'Leaks & lines'},
 {k:'yard',t:'Work area, cleaned up after',tag:'Leaks & lines',pin:['Completed the service requested and left the area super clean.','Julian T.']},
 {k:'bar',t:'Restaurant bar sink',tag:'Commercial'},
 {k:'ygrease',t:'Grease tank, commercial kitchen',tag:'Commercial'},
 {k:'yyard',t:'Line work in a commercial yard',tag:'Commercial'}];
