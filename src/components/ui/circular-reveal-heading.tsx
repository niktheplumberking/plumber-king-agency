"use client"
/*
 * 21st.dev "Circular Reveal Heading", sent by Nick 2026-10-18. Copied as given, with these changes only:
 * brand colours (pink-white neumorphism, pink text), a "badge" size, ids made unique per instance, the spin and the
 * float driven frame by frame so the page's Pause button and reduced motion can stop them where they are, and the
 * hover images loaded only once the badge is near the screen, and framer-motion loaded lean (LazyMotion). The undefined #textShadow filter reference is dropped.
 */
import React, { useState, useEffect, useId, useRef } from 'react'
import { m as motion, AnimatePresence, LazyMotion, domAnimation, useAnimationFrame, useMotionValue } from 'framer-motion'
import { cn } from "@/lib/utils"
import { useStill } from "@/lib/useStill"

interface TextItem {
    text: string;
    /** Picture shown in the middle while the word is pointed at; leave it out for none. */
    image?: string;
    alt?: string;
}

interface CircularRevealHeadingProps {
    items: TextItem[];
    centerText: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'badge';
    /** Read out instead of the spinning words (the circle itself is drawn for the eye). */
    label?: string;
}

// Brand neumorphism: the grey #e6e6e6 / #bebebe / #d1d1d1 of the original become pale pink, pink shadow, white light.
const BG = '#fff0f6'
const DARK = '#efc6d8'
const INSET = '#f6d3e2'

const sizeConfig = {
    sm: {
        container: 'h-[300px] w-[300px]',
        fontSize: 'text-xs',
        tracking: 'tracking-[0.25em]',
        radius: 160,
        gap: 40,
        imageSize: 'w-[75%] h-[75%]',
        textStyle: 'font-medium'
    },
    md: {
        container: 'h-[400px] w-[400px]',
        fontSize: 'text-sm',
        tracking: 'tracking-[0.3em]',
        radius: 160,
        gap: 30,
        imageSize: 'w-[75%] h-[75%]',
        textStyle: 'font-medium',
    },
    lg: {
        container: 'h-[500px] w-[500px]',
        fontSize: 'text-base',
        tracking: 'tracking-[0.35em]',
        radius: 160,
        gap: 20,
        imageSize: 'w-[75%] h-[75%]',
        textStyle: 'font-medium'
    },
    // Trust badge on the corner of a card: smaller circle, so the words are set larger in the circle's own units.
    // Nick 2026-10-19: circle 15% smaller, words about 10% bigger on screen (28.4 units at 196 px vs 22 at 230 px), so
    // the text runs on a slightly tighter path (radius 150) with shorter gaps to keep each word's room.
    badge: {
        container: 'h-[170px] w-[170px] md:h-[212px] md:w-[212px] lg:h-[196px] lg:w-[196px]',
        fontSize: 'text-[28.4px]',
        tracking: 'tracking-[0.06em]',
        radius: 150,
        gap: 6,
        imageSize: 'w-[66%] h-[66%]',
        textStyle: 'font-black'
    }
};

const usePreloadImages = (images: (string | undefined)[], enabled: boolean) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!enabled) return;
        const loadImage = (url: string): Promise<void> =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve();
                img.onerror = reject;
            });

        Promise.all(images.filter((u): u is string => !!u).map(loadImage))
            .then(() => setLoaded(true))
            .catch(err => console.error('Error preloading images:', err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images.join('|'), enabled]);

    return loaded;
};

const ImageOverlay = ({ image, alt, size = 'md' }: { image: string, alt: string, size?: keyof typeof sizeConfig }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
    >
        <motion.img
            src={image}
            alt={alt}
            className={cn(
                sizeConfig[size].imageSize,
                "object-cover rounded-full"
            )}
            style={{ filter: 'brightness(0.95)' }}
        />
    </motion.div>
);

export const CircularRevealHeading = ({
    items,
    centerText,
    className,
    size = 'md',
    label
}: CircularRevealHeadingProps) => {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [near, setNear] = useState(false);
    const config = sizeConfig[size];
    const imagesLoaded = usePreloadImages(items.map(item => item.image), near);
    const uid = useId().replace(/:/g, '');
    const gradId = `textGradient-${uid}`;

    // The original loops: a 5 s float (y 0 → -8 → 0, ease in-out) and a 30 s linear turn. Advanced each frame so they
    // stop where they are when motion is paused, and skip work while the badge is off screen.
    const box = useRef<HTMLDivElement>(null);
    const still = useStill();
    const seen = useRef(false);
    const clock = useRef(0);
    const y = useMotionValue(0);
    const rotate = useMotionValue(0);
    useEffect(() => {
        const el = box.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => {
            seen.current = e.isIntersecting;
            if (e.isIntersecting) setNear(true);
        }, { rootMargin: '400px 0px' });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    useAnimationFrame((_, delta) => {
        if (still || !seen.current) return;
        clock.current += Math.min(delta, 50) / 1000;
        const t = clock.current;
        y.set(-4 * (1 - Math.cos((2 * Math.PI * t) / 5)));
        rotate.set((t * 12) % 360);
    });

    // Each letter is placed and turned on its own along the circle. Safari clipped the first and last letter of every
    // word when the words were drawn along a path (Nick's iPhone, 2026-10-22), so no text path is used. Letter widths
    // come from the real font once it has loaded; until then every letter gets the same room.
    const fontPx = parseFloat(config.fontSize.replace(/[^\d.]/g, '')) || 16;
    const trackEm = parseFloat(config.tracking.replace(/[^\d.]/g, '')) || 0;
    const [widths, setWidths] = useState<number[][] | null>(null);
    useEffect(() => {
        let gone = false;
        const measure = () => {
            const ctx = document.createElement('canvas').getContext('2d');
            if (!ctx || gone) return;
            const family = getComputedStyle(document.documentElement).getPropertyValue('--font-display') || 'sans-serif';
            ctx.font = `${config.textStyle === 'font-black' ? 900 : 500} ${fontPx}px ${family}`;
            setWidths(items.map((it) => [...it.text.toUpperCase()].map((ch) => ctx.measureText(ch).width)));
        };
        measure();
        document.fonts?.ready.then(measure);
        return () => { gone = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items.map((i) => i.text).join('|'), fontPx]);

    const createTextSegments = () => {
        const totalItems = items.length;
        const totalGapDegrees = config.gap * totalItems; // Total space for gaps
        const availableDegrees = 360 - totalGapDegrees; // Remaining space for text
        const segmentDegrees = availableDegrees / totalItems; // Space per text segment
        const R = config.radius;
        const segLen = (segmentDegrees * Math.PI * R) / 180;
        return items.map((item, index) => {
            const startDeg = index * (segmentDegrees + config.gap);
            const chars = [...item.text.toUpperCase()];
            const w = widths?.[index] ?? chars.map(() => fontPx * 0.62);
            // Each letter's room is its width plus the tracking; the gaps grow (letters never stretch) so the word fills
            // its stretch of the circle, the way the original fitted it.
            // A word too long for its stretch is narrowed letter by letter (as the original's spacingAndGlyphs did).
            const natural = w.reduce((a, b) => a + b, 0) + trackEm * fontPx * chars.length;
            const k = Math.min(1, segLen / natural);
            const room = w.map((x) => (x + trackEm * fontPx) * k);
            const extra = chars.length > 1 ? Math.max(0, segLen - room.reduce((a, b) => a + b, 0)) / (chars.length - 1) : 0;
            let s = 0;
            return (
                <g key={index}
                    className={cn(config.fontSize, config.textStyle, "cursor-pointer hover:fill-[#141414]")}
                    style={{ fontFamily: 'var(--font-display)' }}
                    fill={`url(#${gradId})`}
                    onMouseEnter={() => imagesLoaded && setActiveImage(item.image ?? null)}
                    onMouseLeave={() => setActiveImage(null)}
                >
                    {chars.map((ch, i) => {
                        const mid = s + (w[i] * k) / 2;
                        s += room[i] + extra;
                        // The circle path starts at 9 o'clock and runs clockwise over the top.
                        const a = Math.PI + (startDeg * Math.PI) / 180 + mid / R;
                        const x = 200 + R * Math.cos(a), y = 200 + R * Math.sin(a);
                        return <text key={i} x={x} y={y} textAnchor="middle" transform={`rotate(${(a * 180) / Math.PI + 90} ${x} ${y})${k < 1 ? ` translate(${x * (1 - k)} 0) scale(${k} 1)` : ""}`}>{ch}</text>;
                    })}
                </g>
            );
        });
    };

    return (
        // LazyMotion + m: the same framer-motion animations with only the features used here (a much smaller download).
        <LazyMotion features={domAnimation} strict>
        <div role={label ? "img" : undefined} aria-label={label}>
            <motion.div
                ref={box}
                aria-hidden={label ? true : undefined}
                tabIndex={-1}
                whileHover={{
                    boxShadow: `14px 14px 30px ${DARK}, -14px -14px 30px #ffffff`
                }}
                whileTap={{ scale: 0.98 }}
                style={{ y, backgroundColor: BG, boxShadow: `10px 10px 24px ${DARK}, -10px -10px 24px #ffffff` }}
                className={cn(
                    "relative overflow-hidden",
                    config.container,
                    "rounded-full",
                    "transition-[box-shadow] duration-500 ease-out",
                    className
                )}
            >
                <AnimatePresence>
                    {activeImage && imagesLoaded && (
                        <ImageOverlay image={activeImage} alt={items.find(i => i.image === activeImage)?.alt || items.find(i => i.image === activeImage)?.text || ""} size={size} />
                    )}
                </AnimatePresence>

                <motion.div
                    className="absolute inset-[2px] rounded-full"
                    style={{
                        backgroundColor: BG,
                        boxShadow: `inset 6px 6px 12px ${INSET}, inset -6px -6px 12px #ffffff`
                    }}
                />

                {/* Badge: the inner ring sits just outside the words; at 12 px its edge ran through their tops (Nick 2026-10-22). */}
                <motion.div
                    className={cn("absolute rounded-full", size === "badge" ? "inset-[7px]" : "inset-[12px]")}
                    style={{
                        backgroundColor: BG,
                        boxShadow: `inset 4px 4px 8px ${INSET}, inset -4px -4px 8px #ffffff`
                    }}
                />

                <motion.div className="absolute inset-0 flex items-center justify-center">
                    <AnimatePresence>
                        {!activeImage && (
                            <motion.div
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className={cn("relative z-10 rounded-3xl", size === "badge" ? "p-1" : "p-6")}
                                style={{ backgroundColor: BG }}
                                whileHover={{
                                    boxShadow: `inset 3px 3px 6px ${INSET}, inset -3px -3px 6px #ffffff`
                                }}
                            >
                                {centerText}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className="absolute inset-0"
                    style={{ rotate }}
                >
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                        <defs>
                            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FF3D8B" />
                                <stop offset="100%" stopColor="#FF3D8B" />
                            </linearGradient>
                        </defs>
                        {createTextSegments()}
                    </svg>
                </motion.div>
            </motion.div>
        </div>
        </LazyMotion>
    );
};
