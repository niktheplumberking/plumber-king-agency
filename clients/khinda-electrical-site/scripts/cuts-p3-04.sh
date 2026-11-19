#!/bin/sh
# Part 3 art cuts, page 04 Areas hub (Figma page px boxes; see scripts/cut-obj.py)
C="python3 scripts/cut-obj.py 04-areas-hub"; O=src/art/p3/04; mkdir -p $O
$C d "4.2 One base · meter base plate over map" 560,1154,250,450 $O/meter-d.svg "↔ meter base plate (over map edge)"
$C m "4.2 One base · meter base plate over map" 20,2195,180,324 $O/meter-m.svg "↔ meter base plate (over map edge)"
$C d "4.2 One base · meter base plate over map" 796,1238,180,250 $O/lead-d.svg "lead wire tag→pin" "lug"
$C d "4.2 One base · meter base plate over map" 972,1224,28,28 $O/pin-d.svg "base pin"
$C m "4.2 One base · meter base plate over map" 181,2070,24,24 $O/pin-m.svg "base pin"
$C d "*" 940,2220,400,680 $O/drop-d.svg "↑ service drop 4.3→4.4 (into base)@cd" "↑ service drop core@cd" "↑ drop clamp"
$C m "*" 300,3510,90,630 $O/drop-m.svg "↑ service drop 4.3→4.4@cd" "↑ service drop core@cd"
$C d "4.4 Closer means faster · coverage rings" 580,2608,740,600 $O/rings-d.svg "mini map · coverage rings" "~ring r300@rg3" "~ring r205@rg2" "~ring r110@rg1" "~NEWTON@t1" "~label plate · NEWTON@t1" "~GUILDFORD@t1" "~label plate · GUILDFORD@t1" "~FLEETWOOD@t1" "~label plate · FLEETWOOD@t1" "~CLOVERDALE@t1" "~label plate · CLOVERDALE@t1" "~SOUTH SURREY@t1" "~label plate · SOUTH SURREY@t1" "~S. SURREY@t1" "~label plate · S. SURREY@t1" "~CITY CENTRE@t1" "~label plate · CITY CENTRE@t1" "~DELTA@t2" "~label plate · DELTA@t2" "~LANGLEY@t2" "~label plate · LANGLEY@t2" "~WHITE ROCK@t2" "~label plate · WHITE ROCK@t2"
$C m "4.4 Closer means faster · coverage rings" 20,3989,350,350 $O/rings-m.svg "mini map · coverage rings" "~ring r165@rg3" "~ring r115@rg2" "~ring r62@rg1" "~NEWTON@t1" "~label plate · NEWTON@t1" "~GUILDFORD@t1" "~label plate · GUILDFORD@t1" "~FLEETWOOD@t1" "~label plate · FLEETWOOD@t1" "~CLOVERDALE@t1" "~label plate · CLOVERDALE@t1" "~SOUTH SURREY@t1" "~label plate · SOUTH SURREY@t1" "~S. SURREY@t1" "~label plate · S. SURREY@t1" "~CITY CENTRE@t1" "~label plate · CITY CENTRE@t1" "~DELTA@t2" "~label plate · DELTA@t2" "~LANGLEY@t2" "~label plate · LANGLEY@t2" "~WHITE ROCK@t2" "~label plate · WHITE ROCK@t2"

$C d "4.5 Local quirks · code book with 4 tabs" 170,3648,430,480 $O/book-d.svg "code book (closed)"
$C m "4.5 Local quirks · code book with 4 tabs" 20,5031,237,264 $O/book-m.svg "code book (closed)"
$C d "4.7 FAQ · round thermostat display" 750,5278,520,520 $O/thermo-d.svg "body" "dial ring" "ticks" "display"
$C m "4.7 FAQ · round thermostat display" 30,7209,330,330 $O/thermo-m.svg "body" "dial ring" "ticks" "display"
$C d "4.7 FAQ · round thermostat display" 750,5278,520,520 $O/mark-d.svg "set mark"
$C m "4.7 FAQ · round thermostat display" 30,7209,330,330 $O/mark-m.svg "set mark"
$C d "↑ wall switch plate (crosses 4.7/4.8)" 830,5858,280,580 $O/plate-d.svg "." "!toggle lever (up = ON)" "!lever grip" "!tape label" "!ON" "!OFF" "!toggle boss"
$C d "*" 900,6420,140,190 $O/cables-d.svg "↑ cable switch→MAIN cw edge@cd" "↑ cable switch→MAIN cw@cd" "↑ cable switch→MAIN cw hl@cd" "↑ cable switch→MAIN red edge@cd" "↑ cable switch→MAIN red@cd" "↑ cable switch→MAIN red hl@cd" "↑ cable switch→MAIN copper edge@cd" "↑ cable switch→MAIN copper@cd" "↑ cable switch→MAIN copper hl@cd"
$C m "*" 250,8810,120,160 $O/cables-m.svg "↑ cable switch→MAIN cw edge@cd" "↑ cable switch→MAIN cw@cd" "↑ cable switch→MAIN cw hl@cd" "↑ cable switch→MAIN red edge@cd" "↑ cable switch→MAIN red@cd" "↑ cable switch→MAIN red hl@cd" "↑ cable switch→MAIN copper edge@cd" "↑ cable switch→MAIN copper@cd" "↑ cable switch→MAIN copper hl@cd"
