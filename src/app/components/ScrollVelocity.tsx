'use client';

import { useRef, useLayoutEffect, useState, CSSProperties, RefObject } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'motion/react';

function useElementWidth(ref: RefObject<HTMLElement | null>): number {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    function update() {
      if (ref.current) setWidth(ref.current.offsetWidth);
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [ref]);
  return width;
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity?: number;
  scrollContainerRef?: RefObject<HTMLElement>;
  itemClassName?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: { input: [number, number]; output: [number, number] };
  itemStyle?: CSSProperties;
}

function VelocityText({
  children,
  baseVelocity = 100,
  scrollContainerRef,
  itemClassName = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  itemStyle,
}: VelocityTextProps) {
  const baseX = useMotionValue(0);
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness });
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping.input,
    velocityMapping.output,
    { clamp: false }
  );

  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef as RefObject<HTMLElement | null>);

  const x = useTransform(baseX, v => {
    if (copyWidth === 0) return '0px';
    const min = -copyWidth, max = 0;
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return `${mod + min}px`;
  });

  const directionFactor = useRef(1);
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div style={{ x, display: 'flex', whiteSpace: 'nowrap' }}>
        {Array.from({ length: numCopies }).map((_, i) => (
          <span
            key={i}
            ref={i === 0 ? copyRef : null}
            className={itemClassName}
            style={{ flexShrink: 0, ...itemStyle }}
          >
            {children}&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  );
}

interface ScrollVelocityProps {
  texts?: string[];
  velocity?: number;
  itemClassName?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: { input: [number, number]; output: [number, number] };
  scrollContainerRef?: RefObject<HTMLElement>;
  itemStyle?: CSSProperties;
}

export default function ScrollVelocity({
  texts = [],
  velocity = 100,
  itemClassName = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  scrollContainerRef,
  itemStyle,
}: ScrollVelocityProps) {
  return (
    <div>
      {texts.map((text, i) => (
        <VelocityText
          key={i}
          baseVelocity={i % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          itemClassName={itemClassName}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          itemStyle={itemStyle}
        >
          {text}
        </VelocityText>
      ))}
    </div>
  );
}
