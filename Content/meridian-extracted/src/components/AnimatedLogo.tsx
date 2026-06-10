import React from 'react';
import { motion } from 'motion/react';

interface AnimatedLogoProps {
  className?: string;
  size?: number;
}

export default function AnimatedLogo({ className = '', size = 50 }: AnimatedLogoProps) {
  // 6-pointed star mathematical coordinates (centered at 50, 26 with outer R=15, inner r=7.5)
  // Angle starting at -90 degrees (pointing straight up)
  const starPoints = [
    [50, 8],          // 0: Outer Top
    [53.75, 19.5],    // 1: Inner Top-Right
    [63, 18.5],       // 2: Outer Top-Right
    [57.5, 26],       // 3: Inner Mid-Right
    [63, 33.5],       // 4: Outer Bottom-Right
    [53.75, 32.5],    // 5: Inner Bottom-Right
    [50, 41],         // 6: Outer Bottom (sits perfectly above center dip)
    [46.25, 32.5],    // 7: Inner Bottom-Left
    [37, 33.5],       // 8: Outer Bottom-Left
    [42.5, 26],       // 9: Inner Mid-Left
    [37, 18.5],       // 10: Outer Top-Left
    [46.25, 19.5],    // 11: Inner Top-Left
  ];

  const starPathString = `M ${starPoints[0][0]} ${starPoints[0][1]} ` + 
    starPoints.slice(1).map(p => `L ${p[0]} ${p[1]}`).join(' ') + ' Z';

  // Symmetrical bars with custom coordinates, making a beautiful v-notch top
  const bars = [
    { id: 1, points: '32,44 36,46 36,92 32,92', heightDelay: 0.1 },
    { id: 2, points: '40,48 44,50 44,92 40,92', heightDelay: 0.05 },
    { id: 3, points: '48,52 50,53 52,52 52,92 48,92', heightDelay: 0 },
    { id: 4, points: '56,50 60,48 60,92 56,92', heightDelay: 0.05 },
    { id: 5, points: '64,46 68,44 68,92 64,92', heightDelay: 0.1 },
  ];

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_0_12px_rgba(226,178,84,0.3)] overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background glow behind the star */}
        <motion.circle
          cx="50"
          cy="26"
          r="22"
          fill="url(#goldRadialGlow)"
          opacity="0.35"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.5, 0.35]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Dynamic shooting light trail - Slide Up animation */}
        <motion.rect
          x="49"
          y="35"
          width="2"
          height="55"
          fill="url(#lightTrailGrad)"
          opacity="0"
          animate={{
            y: [-30, 20],
            height: [10, 45, 0],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut"
          }}
        />

        {/* Definitions for gorgeous premium gradients */}
        <defs>
          <radialGradient id="goldRadialGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E2B254" />
            <stop offset="100%" stopColor="#E2B254" stopOpacity="0" />
          </radialGradient>
          
          <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9D995" />
            <stop offset="50%" stopColor="#E2B254" />
            <stop offset="100%" stopColor="#9C772F" />
          </linearGradient>

          <linearGradient id="starWhiteMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F5F5FA" />
            <stop offset="100%" stopColor="#D9D9E3" />
          </linearGradient>

          <linearGradient id="lightTrailGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#E2B254" stopOpacity="0" />
            <stop offset="50%" stopColor="#E2B254" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>

        {/* 5 Symmetrical vertical gold bars styling with elegant entry on Y scaling */}
        <g>
          {bars.map((bar) => (
            <motion.polygon
              key={bar.id}
              points={bar.points}
              fill="url(#goldMetallic)"
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: 1 }}
              whileHover={{ 
                scaleY: 1.05, 
                filter: "brightness(1.15)",
                transition: { duration: 0.2 }
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 14,
                delay: bar.heightDelay,
              }}
            />
          ))}
        </g>

        {/* Royal 6-pointed star centered above */}
        <motion.path
          d={starPathString}
          fill="url(#starWhiteMetallic)"
          stroke="#FFFFFF"
          strokeWidth="0.5"
          initial={{ scale: 0, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          whileHover={{ 
            scale: 1.15, 
            rotate: 15,
            filter: "brightness(1.1)",
          }}
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 12,
            delay: 0.35
          }}
        />
      </svg>
    </div>
  );
}
