// AnimatedBentoGrid.jsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExpoScaleEase } from "gsap/EasePack";

gsap.registerPlugin(ScrollTrigger, ExpoScaleEase);

export const AnimatedBentoGrid = ({ items }) => {
  const [loaded, setLoaded] = useState(false);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const scrollPos = useRef(0);
  const velocity = useRef(0);
  const loopRef = useRef(null);

  // Used for skeleton loader simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Horizontal scroll with inertia, bounce and snapping
  useEffect(() => {
    if (!gridRef.current) return;

    let lastY = 0;
    let isScrolling = false;
    let direction = 1; // 1: right, -1: left
    let maxScroll =
      gridRef.current.scrollWidth - gridRef.current.clientWidth;

    const onWheel = (e) => {
      e.preventDefault();
      isScrolling = true;
      // Simulate inertia: accumulate velocity
      velocity.current += e.deltaY * 0.5;
      // Set direction
      direction = Math.sign(e.deltaY);
      // Start animation loop
      if (!loopRef.current) animLoop();
    };

    const animLoop = () => {
      scrollPos.current += velocity.current;
      // Clamp within bounds
      if (scrollPos.current < 0) {
        scrollPos.current = 0;
        velocity.current *= -0.5; // Bounce
        gsap.to(gridRef.current, {
          x: 40,
          duration: 0.4,
          ease: ExpoScaleEase.config(1.5, 0.5, "power2.inOut"),
          onComplete: () =>
            gsap.to(gridRef.current, {
              x: 0,
              duration: 0.8,
              ease: "expo.inOut",
            }),
        });
      } else if (scrollPos.current > maxScroll) {
        scrollPos.current = maxScroll;
        velocity.current *= -0.5;
        gsap.to(gridRef.current, {
          x: -40,
          duration: 0.4,
          ease: ExpoScaleEase.config(1.5, 0.5, "power2.inOut"),
          onComplete: () =>
            gsap.to(gridRef.current, {
              x: 0,
              duration: 0.8,
              ease: "expo.inOut",
            }),
        });
      }
      // Scroll grid horizontally
      gridRef.current.scrollTo({
        left: scrollPos.current,
        behavior: "auto",
      });

      // Parallax & Depth
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const cardX = card.offsetLeft - scrollPos.current;
        const center = gridRef.current.clientWidth / 2;
        const distance = Math.abs(center - (cardX + card.clientWidth / 2));
        const scale = 1 - distance / (center * 3);
        gsap.to(card, {
          scale: 0.97 + scale * 0.09,
          zIndex: Math.round(1000 - distance),
          filter: `blur(${Math.min(distance / 300, 0.9)}px)`,
          duration: 0.4,
          ease: "expo.inOut"
        });
      });

      // Inertia
      velocity.current *= 0.88; // Friction
      if (Math.abs(velocity.current) > 1) {
        loopRef.current = requestAnimationFrame(animLoop);
      } else {
        velocity.current = 0;
        loopRef.current = null;

        // Snap to nearest card
        let cardIdx = Math.round(scrollPos.current / 360); // Card width+gap
        let newScroll = cardIdx * 360;
        gsap.to(gridRef.current, {
          scrollTo: { x: newScroll },
          duration: 1,
          ease: "expoScale(1.5,0.5,power2.inOut)",
          onUpdate: () => {
            scrollPos.current = gridRef.current.scrollLeft;
          },
        });

        // Stack collapse effect
        cardRefs.current.forEach((card, i) => {
          if (Math.abs(i - cardIdx) > 2) {
            gsap.to(card, {
              scale: 0.92,
              opacity: 0.7,
              z: -20,
              duration: 0.8,
              ease: "expoScale(1.5,0.5,power2.inOut)",
            });
          } else {
            gsap.to(card, {
              scale: 1,
              opacity: 1,
              z: 0,
              duration: 0.8,
              ease: "expoScale(1.5,0.5,power2.inOut)",
            });
          }
        });
      }
    };

    gridRef.current.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      gridRef.current.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(loopRef.current);
    };
  }, [loaded, items.length]);

  // Card entry animation
  useEffect(() => {
    if (!loaded) return;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 40,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          delay: 0.14 * i,
          duration: 0.7,
          ease: "expo.inOut",
        }
      );
    });
  }, [loaded]);

  return (
    <div
      className="relative w-full overflow-x-auto scrollbar-hide"
      ref={gridRef}
      style={{
        perspective: "1600px",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div
        className="flex gap-8 py-6 min-h-[220px]"
        style={{
          minWidth: items.length * 320 + items.length * 32,
          position: "relative",
        }}
      >
        <AnimatePresence>
          {(loaded ? items : Array.from({ length: items.length })).map(
            (item, idx) =>
              <motion.div
                key={idx}
                ref={(el) => (cardRefs.current[idx] = el)}
                initial={{
                  opacity: 0,
                  y: 40,
                  scale: 0.98
                }}
                animate={{
                  opacity: loaded ? 1 : 0,
                  y: loaded ? 0 : 32,
                  scale: loaded ? 1 : 0.98,
                  transition: { delay: 0.13 * idx, ease: "expo.inOut" }
                }}
                exit={{ opacity: 0, y: 16 }}
                whileHover={{
                  scale: 1.045,
                  rotateY: 6,
                  boxShadow: '0px 8px 40px 0px rgba(80,140,255,0.10)',
                  transition: { duration: 0.16, ease: "easeInOut" }
                }}
                className="bento-card bg-white/40 dark:bg-gray-800/60 
                  backdrop-blur-xl border border-white/30 dark:border-black/20 
                  shadow-lg rounded-3xl p-6 min-w-[320px] max-w-[320px] 
                  transition-all select-none cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                {!loaded ? (
                  // Skeleton loader
                  <div className="animate-pulse space-y-3">
                    <div className="h-7 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-36 bg-gray-300 rounded-xl w-full mt-2"></div>
                  </div>
                ) : (
                  // Actual card
                  <>
                    {item.icon && (
                      <div className="mb-4">{item.icon}</div>
                    )}
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-900 dark:text-gray-100 mb-3">{item.desc}</p>
                    {item.badges && (
                      <div className="flex gap-2 mb-2">
                        {item.badges.map((b, i) =>
                          <span className={`px-3 py-1 rounded-lg text-xs ${b.style}`} key={i}>{b.text}</span>
                        )}
                      </div>
                    )}
                    {item.list && (
                      <ul className="mt-2 space-y-2">
                        {item.list.map((l, li) =>
                          <li className="flex items-center gap-2" key={li}>
                            {l.icon}{l.text}
                          </li>
                        )}
                      </ul>
                    )}
                    {item.img && (
                      <img src={item.img} className="rounded-xl mt-4 w-full h-32 object-cover" alt={item.title} />
                    )}
                  </>
                )}
              </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
