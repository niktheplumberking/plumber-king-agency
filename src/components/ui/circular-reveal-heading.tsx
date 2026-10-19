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
    image: string;
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

const usePreloadImages = (images: string[], enabled: boolean) => {
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

        Promise.all(images.map(loadImage))
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
    const curveId = `curve-${uid}`;
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

    const createTextSegments = () => {
        const totalItems = items.length;
        const totalGapDegrees = config.gap * totalItems; // Total space for gaps
        const availableDegrees = 360 - totalGapDegrees; // Remaining space for text
        const segmentDegrees = availableDegrees / totalItems; // Space per text segment
        return items.map((item, index) => {
            const startPosition = index * (segmentDegrees + config.gap);
            const startOffset = `${(startPosition / 360) * 100}%`;
            return (
                <g key={index}>
                    <text
                        className={cn(
                            config.fontSize,
                            config.tracking,
                            config.textStyle,
                            "uppercase cursor-pointer transition-all duration-300"
                        )}
                        onMouseEnter={() => imagesLoaded && setActiveImage(item.image)}
                        onMouseLeave={() => setActiveImage(null)}
                        style={{
                            fontFamily: 'var(--font-display)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <textPath
                            href={`#${curveId}`}
                            className="hover:fill-[#141414]"
                            fill={`url(#${gradId})`}
                            startOffset={startOffset}
                            textLength={`${(segmentDegrees * Math.PI * config.radius) / 180}`}
                            lengthAdjust="spacingAndGlyphs"
                        >
                            {item.text}
                        </textPath>
                    </text>
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

                <motion.div
                    className="absolute inset-[12px] rounded-full"
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
                                <stop offset="100%" stopColor="#C2185B" />
                            </linearGradient>
                        </defs>
                        <path
                            id={curveId}
                            fill="none"
                            d={`M 200,200 m -${config.radius},0 a ${config.radius},${config.radius} 0 1,1 ${config.radius * 2},0 a ${config.radius},${config.radius} 0 1,1 -${config.radius * 2},0`}
                        />
                        {createTextSegments()}
                    </svg>
                </motion.div>
            </motion.div>
        </div>
        </LazyMotion>
    );
};
