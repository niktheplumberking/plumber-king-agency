// Round-2 CFG used with round2-transform.js (prepend helpers.js, then one CFG, then the transform). 17 Nov 2026.
// Reviews are Yelp word for word (research/FACTS-CHECK.md); "…" marks a trim. Mobile uses the first 2 reviews.
// Services hub 481:441 (d 486:1743 / m 488:437): reviews Isaiah C., Eleanor M., Sal C.; ticker Drain cleaning, Hydro jetting,
//   Slab leaks, Sewer camera, Grease interceptors, Water heaters, Toilets & faucets, Riverside, Corona.
const CFG_DRAIN={sec:'481:442',d:'493:437',m:'493:807',dropD:['08 Reviews'],dropM:['Reviews'],
 ticker:['Clogged drains','Hydro jetting','Camera inspection','Rooter maintenance','Grease lines','Riverside','Corona','Menifee'],
 rv:[['Great service responded fast and did the work same day Would recommend and will use again for any plumbing service that I may need','Erik N.','Buena Park, CA','Sep 4, 2025'],
 ['Needed my garbage disposal repaired, he was quick and efficient! I value a clean plumber. 10 out of 10 recommend.','Janeth H.','Corona, CA','Jun 12, 2025'],
 ['Responded same day I called. The job was much more complicated than expected...Michael somehow made everything work and wasn’t gonna leave until fixed.','Debbie H.','Menifee, CA','Jul 14, 2025']]};
const CFG_COMMERCIAL={sec:'481:443',d:'486:1432',m:'487:2971',dropD:['07 What property owners say'],dropM:['Mobile what property owners say'],
 ticker:['Restaurants & bars','Grease interceptors','Hydro jetting','Camera inspection','Emergency calls','Riverside','Inland Empire','Orange County','LA'],
 rv:[['Highly recommend Mike for all your plumbing needs. We replaced 3 toilets and a pressure regulator. As requested, he coordinated his work with other repairs being done on the property. He’s reasonably priced, detailed & patient. Call him!','Eleanor M.','Los Angeles, CA','Jul 10, 2026'],
 ['Water pressure regulate,shut off valve and automatic water shut off WIFI connected has a lot of respect and calls back to inquire how the work is going very professional and reasonable price','Tewolde T.','Moreno Valley, CA','Jun 5, 2026'],
 ['Mike did a great job replacing and installing our new upstairs toilet. He is an excellent communicator. His prices are fair and competitive. I will definitely use him again!…','Bruce H.','West Hollywood, CA','Aug 24, 2026']]};
const CFG_EMERGENCY={sec:'481:444',d:'496:1354',m:'496:1687',dropD:['06 Reviews'],dropM:['Reviews'],
 ticker:['Leaks','Backed-up drains','Water mains','Slab leaks','Shut-off valves','Riverside','Corona','Menifee'],
 rv:[['…Mike was here within two hours of our call. We found hime to be professional, friendly and efficient. His pricing is very reasonable and he is quick and clean with his work.…','Suzi J.','Valley Center, CA','Aug 25, 2025'],
 ['…On a Friday, I called three plumbers and they couldn’t come over until Monday. Mike actually called me instead of back and forth messaging.… He had all the parts and fixed it perfectly,','Martha B.','CA','Aug 1, 2025'],
 ['Great service responded fast and did the work same day Would recommend and will use again for any plumbing service that I may need','Erik N.','Buena Park, CA','Sep 4, 2025']]};
// Fix pass after the transform (all 4 desktops): in review cards narrower than 300px the town · date line is set to 12px and
// wraps at width-136 so it never runs under the Yelp mark; content below shifts down and the card/section grow to fit.
// TODO for helpers.js v3: build REVIEW() that way from the start.
