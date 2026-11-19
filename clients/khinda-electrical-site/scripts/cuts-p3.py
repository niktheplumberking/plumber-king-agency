"""Part 3 section-decor cuts for pages 06-10: each section's drawn layer with copy, buttons and photos removed (HTML renders
them). usage: python3 scripts/cuts-p3.py <page-prefix e.g. 06> ; table below = (page, frame, section, rect, out, extra drops)"""
import subprocess, sys, re
G = ['!@text', '!@img', '!eyebrow*', '!H1', '!H2*', '!btn*', '!Frame*', '!call link*', '!breadcrumb', '!lead*', '!body', '!number big', '!caption']
T = [
 ('06-about', 'd', '6.1 Hero · directory card over his panel', '0,178,1440,800', '06/s1-d', ['!photo ig39', '!photo edge shade', '!marker line', '!rule*', '!↑ panel directory card*', '!↑ tape label (card)']),
 ('06-about', 'd', '6.2 Story · one cable run with heat-shrink date markers', '0,978,1440,740', '06/s2-d', ['~cable edge@cd', '~cable 12/2 yellow jacket@cd', '~cable highlight@cd']),
 ('06-about', 'd', '6.3 Numbers · analog electric meter', '0,1718,1440,760', '06/s3-d', ['!Rectangle*']),
 ('06-about', 'd', '6.4 Owner · pegboard with tools and pinned job photos', '0,2478,1440,820', '06/s4-d', ['!his own line', '!tape label (pegboard)', '!pinned print*']),
 ('06-about', 'd', '6.6 Four rules · instruction stickers inside a panel door', '0,3298,1440,820', '06/s6-d', ['!rule sticker*']),
 ('06-about', 'd', '6.7 Proof · 3 phones on his workbench playing reels', '0,4118,1440,820', '06/s7-d', ['!phone*']),
 ('06-about', 'd', '6.9 Licences · 3 stickers on his hard hat', '0,4938,1440,760', '06/s9-d', ['!Rectangle*', '!checkbox*']),
 ('06-about', 'd', '6.10 CTA · handset on a coiled cord', '0,5698,1440,580', '06/s10-d', ['!bolt']),
]
M06 = [('6.1 Hero · directory card over his panel', 152, 1080, ['!photo ig39', '!marker line', '!Rectangle*', '!HOME  /  ABOUT', '!panel directory card (crosses 6.1/6.2)', '!tape label']),
 ('6.2 Story · one cable run with heat-shrink date markers', 1232, 1200, ['!source line']),
 ('6.3 Numbers · analog electric meter', 2432, 1060, ['!Rectangle*']),
 ('6.4 Owner · pegboard with tools and pinned job photos', 3492, 1060, ['!body', '!his own line', '!tape label (pegboard)', '!pinned print*']),
 ('6.6 Four rules · instruction stickers inside a panel door', 4552, 1060, ['!rule sticker*']),
 ('6.7 Proof · 3 phones on his workbench playing reels', 5612, 800, ['!phone*', '!swipe hint']),
 ('6.9 Licences · 3 stickers on his hard hat', 6412, 1100, ['!Rectangle*', '!checkbox*']),
 ('6.10 CTA · handset on a coiled cord', 7512, 570, ['!vector', '!number big', '!caption'])]
T += [('06-about', 'm', n, f'0,{y},390,{h}', f'06/s{n.split()[0].split(".")[1]}-m', ex) for n, y, h, ex in M06]
S7 = {1: '7.1 Hero · doorbell button + the number huge', 4: '7.4 Base + map · ring-terminal pin on the real map', 5: '7.5 Other tasks · toolbox with 3 labelled drawers',
      6: '7.6 Three FAQs · lockout tags hanging from a rail', 7: '7.7 Phone band · a plug going into an outlet'}
BELL = ['button bezel', 'amber ring', 'button face', 'button dish', 'bolt']
T += [
 ('07-contact', 'd', S7[1], '0,178,1440,1000', '07/s1-d', ['!marker line', '!tape label', '!jump links', '!number huge', '!PRESS TO CALL', '!236-818-2664', *['!' + b for b in BELL]]),
 ('07-contact', 'd', S7[1], '990,403,220,220', '07/bell-d', BELL[:4] + ['bolt#2']),
 ('07-contact', 'd', S7[4], '0,2718,1440,780', '07/s4-d', ['!Google Maps screenshot · Surrey', '!map label', '!NAP card (terminal block)', '!map source']),
 ('07-contact', 'd', S7[5], '0,3498,1440,800', '07/s5-d', ['!drawer 0*']),
 ('07-contact', 'd', S7[6], '0,4258,1440,780', '07/s6-d', ['!lockout tag*']),
 ('07-contact', 'd', '*', '1040,5100,260,520', '07/s7-d', ['duplex outlet plate', 'plug (pushed into the top outlet)', 'plug cord', 'cord highlight', 'junction box (7.7 cord in, G5 cable out)']),
]
M07 = [(S7[1], 152, 1240, ['!marker line', '!tape label', '!HOME  /  CONTACT', '!number huge', '!TAP TO CALL*', '!PRESS TO CALL', '!236-818-2664', *['!' + b for b in BELL]]),
 (S7[4], 3712, 940, ['!Google Maps screenshot · Surrey', '!map label', '!NAP card (terminal block)', '!Map: Google Maps, Nov 2026']),
 (S7[5], 4652, 880, ['!drawer 0*']),
 ('7.6 Three FAQs · lockout tags hanging from rails', 5512, 1500, ['!lockout tag*'])]
T += [('07-contact', 'm', n, f'0,{y},390,{h}', f'07/s{n.split()[0].split(".")[1]}-m', ex) for n, y, h, ex in M07]
T += [('07-contact', 'm', S7[1], '115,823,160,160', '07/bell-m', BELL[:4] + ['bolt#2']),
      ('07-contact', 'm', '*', '220,7380,170,420', '07/s7-m', ['duplex outlet plate', 'plug (pushed into the top outlet)', 'plug cord (7.7 into the J-box)', 'junction box (7.7 cord in, G5 cable out)'])]
S8 = {1: '8.1 Hero · terminal board: review slots open, job slots wired', 2: '8.2 Job wall · staggered job boxes screwed to the board',
      3: "8.3 Owner's words · his bio on torn masking tape + the roll", 4: '8.4 Proof today · rugged job-site tablet showing his Instagram profile',
      5: '8.5 Leave a review · review sticker on an outdoor disconnect switch', 6: '8.6 Send a video · record button with a 0:00 counter', 7: '8.7 CTA · dimmer slide: turn it up, call'}
M8 = {1: '8.1 Hero · terminal board (mobile)', 2: '8.2 Job wall · staggered job boxes screwed to the board (mobile)', 3: "8.3 Owner's words · torn masking tape + the roll (mobile)",
      4: '8.4 Proof today · rugged tablet with his Instagram (mobile)', 5: '8.5 Leave a review · sticker on a disconnect switch (mobile)', 6: '8.6 Send a video · record button + 0:00 counter (mobile)', 7: '8.7 CTA · dimmer slide (mobile)'}
LEG = ['!HOW TO READ THE BOARD', '!Open slot', '!A Google review*', '!Wired', '!A job he posted*']
T += [
 ('08-reviews', 'd', S8[1], '0,178,1440,880', '08/s1-d', ['!legend · how to read the board', '!marker underline', '!marker line', '!6 OF 66*']),
 ('08-reviews', 'd', S8[2], '0,998,1440,1086', '08/s2-d', ['!@textall', '!text link', '!Want your job*', '!job', '!what he did', '!town', '!JOB 0*']),
 ('08-reviews', 'd', S8[3], '0,2084,1440,760', '08/s3-d', ['!source card', '!his three lines · where each one leads', '!marker caption']),
 ('08-reviews', 'd', S8[4], '0,2844,1440,900', '08/s4-d', ['!odometer*', '!Rectangle']),
 ('08-reviews', 'd', S8[5], '0,3684,1440,800', '08/s5-d', ['!breaker toggle', '!Rectangle']),
 ('08-reviews', 'd', S8[6], '0,4484,1440,900', '08/s6-d', []),
 ('08-reviews', 'd', S8[7], '0,5344,1440,600', '08/s7-d', ['!If your street*', '!1 FLIP IT*']),
]
T += [('08-reviews', 'm', M8[k], f'0,{y},390,{h}', f'08/s{k}-m', ex) for k, y, h, ex in [
 (1, 152, 1260, ['!legend', '!First reviews*']), (2, 1352, 1600, ['!@textall', '!job', '!what he did', '!town', '!JOB 0*']), (3, 2952, 1010, ['!source card', '!marker caption']),
 (4, 3962, 1100, ['!odometer*', '!Rectangle', '+Frame*']), (5, 4982, 1190, ['+Frame*']), (6, 6172, 840, ['+Frame*']), (7, 7012, 780, ['!If your street*', '!1 FLIP IT*'])]]
S9 = {1: '9.1 Hero · drop ceiling of 9 troffers, 4 lit with his jobs', 4: '9.4 Instagram · his reels on a film strip', 5: '9.5 CTA · pull-chain light: pull to call'}
M9 = {1: '9.1 Hero · drop ceiling, 4 of 9 troffers lit (mobile)', 4: '9.4 Instagram · vertical film strip (mobile)', 5: '9.5 CTA · pull-chain light (mobile)'}
SH = ['sheet E-01 · residential panel', 'sheet E-02 · crystal chandelier', 'sheet E-03 · barbershop fit-out']
T += [
 ('09-our-work', 'd', S9[1], '0,178,1440,760', '09/s1-d', ['!photo ig*', '!tape label', '!marker line', '!marker underline', '!job types line']),
 ('09-our-work', 'd', S9[4], '0,3938,1440,820', '09/s4-d', ['!@img', '!Frame']),
 ('09-our-work', 'd', S9[5], '0,4758,1440,660', '09/s5-d', ['!pull knob = call', '!phone big']),
 ('09-our-work', 'd', '*', '100,2688,1240,620', '09/e1-d', [SH[0], '!photo ig*', '!stage label', '!callout*']),
 ('09-our-work', 'd', '*', '90,3220,650,620', '09/e2-d', [SH[1], '!photo ig*', '!stage label', '!callout*']),
 ('09-our-work', 'd', '*', '700,3224,650,620', '09/e3-d', [SH[2], '!photo ig*', '!stage label', '!callout*']),
 ('09-our-work', 'm', M9[1], '0,152,390,960', '09/s1-m', ['!photo ig*', '!tape label', '+Frame*']),
 ('09-our-work', 'm', M9[4], '0,4604,390,1360', '09/s4-m', ['!@img', '!Frame']),
 ('09-our-work', 'm', M9[5], '0,5924,390,800', '09/s5-m', ['!pull knob = call', '!phone big']),
 ('09-our-work', 'm', '*', '10,2874,370,680', '09/e1-m', [SH[0], '!photo ig*', '!Frame', '!callout*']),
 ('09-our-work', 'm', '*', '5,3550,380,430', '09/e2-m', [SH[1], '!photo ig*', '!Frame', '!callout*']),
 ('09-our-work', 'm', '*', '5,3982,380,430', '09/e3-m', [SH[2], '!photo ig*', '!Frame', '!callout*']),
]
EXTRA = {}
want = sys.argv[1] if len(sys.argv) > 1 else ''
for pg, fr, sec, rect, out, ex in T + EXTRA.get('x', []):
    if not pg.startswith(want): continue
    keep = {e[1:] for e in ex if e.startswith('+')}; ex = [e for e in ex if not e.startswith('+')]  # '+X': keep X (not in G's drops)
    picks_only = sec == '*' or (bool(ex) or bool(keep)) and not keep and all(not e.startswith(('!', '~')) for e in ex)
    args = ex if picks_only else ['.', *[g for g in G if g[1:] not in keep], *ex]
    subprocess.run(['python3', 'scripts/cut-obj.py', pg, fr, sec, rect, f'src/art/p3/{out}.svg', *args])
    # 2-decimal coordinates (0.01 export unit < 0.04 px): the outlined copy in these layers is heavy
    f = f'src/art/p3/{out}.svg'; t = open(f).read()
    t = re.sub(r'(?<=[ dM LCHVZQSATlchvzqsat,"])(-?\d+\.\d{3,})', lambda m: f'{float(m.group(1)):.2f}'.rstrip('0').rstrip('.'), t)
    if pg >= '07':  # 07+: the section fill is CSS (it would cover photos and cards placed under the art)
        t = re.sub(r'<rect width="(?:1440|390)" height="[\d.]+" transform="translate\([^)]*\) scale\([^)]*\)" fill="[^"]+"/>\n?', '', t, count=1)
    open(f, 'w').write(t)
