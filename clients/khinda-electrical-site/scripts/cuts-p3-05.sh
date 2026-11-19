#!/bin/sh
# Part 3 art cuts, page 05 Newton = the town template (Figma page px boxes; see scripts/cut-obj.py)
C="python3 scripts/cut-obj.py 05-newton"; O=src/art/p3/05; mkdir -p $O
$C d "↑ utility pole close-up (crosses 5.1/5.2)" 940,178,170,880 $O/pole-d.svg "."
$C d "5.2 Distance · map with cable base→Newton" 620,1108,700,520 $O/route-d.svg "cable base→Newton edge@cd" "cable base→Newton@cd" "cable base→Newton hl@cd"
$C d "5.2 Distance · map with cable base→Newton" 940,1210,60,80 $O/pins-d.svg "base pin" "Newton marker"
$C d "5.3 Local problems · basement-suite floor plan" 120,2038,780,520 $O/plan-d.svg "plan sheet · E-1"
$C m "5.3 Local problems · basement-suite floor plan" 20,2251,350,233 $O/plan-m.svg "plan sheet · E-1"
$C d "5.6 Permits (H2 question) · permit sticker on a panel door" 760,4090,560,640 $O/encl-d.svg "panel enclosure (door open)" "!photo ig39 panel rough-in" "open door (hinged right)" "door latch" "hinge*"
$C d "5.10 Emergency · flashlight beam band" 90,7328,1350,360 $O/beam-d.svg "beam (flat)" "flashlight"
$C m "5.10 Emergency · flashlight beam band" 0,9199,390,405 $O/beam-m.svg "beam (flat)" "flashlight"
$C d "5.11 City FAQ · 3-gang box, one question per gang" 790,8108,520,520 $O/gang-d.svg "3-gang box (blue, nail-on)" "!gang label*" "!blank insert*" "!insert screw*" "!Q1" "!Q2" "!Q3" "!gang 1 · pressed ring" "!gang 1 conductor*" "!bare copper tip*" "!gang 1" "!gang 2" "!gang 3" "!knockout*"
$C m "5.11 City FAQ · 3-gang box, one question per gang" 39,10227,312,300 $O/gang-m.svg "3-gang box (blue, nail-on)" "!gang label*" "!blank insert*" "!insert screw*" "!Q1" "!Q2" "!Q3" "!gang 1 · pressed ring" "!gang 1 conductor*" "!bare copper tip*" "!gang 1" "!gang 2" "!gang 3" "!knockout*"
$C d "5.12 Nearby · 3 cable ends with wire-marker flags" 180,9188,820,400 $O/near-d.svg "cable FLEETWOOD edge" "cable FLEETWOOD" "cable FLEETWOOD hl" "cable CLOVERDALE edge" "cable CLOVERDALE" "cable CLOVERDALE hl" "cable DELTA edge" "cable DELTA" "cable DELTA hl" "jacket end*" "conductor*" "bare copper*" "flag wrap*"
$C m "*" 0,11570,390,420 $O/near-m.svg "↑ cable edge*" "↑ cable" "↑ cable#2" "↑ cable#3" "↑ cable hl*" "↑ jacket end*" "↑ conductor*" "↑ bare copper*" "↑ flag wrap*"
