'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaHeart, FaPlay, FaLock, FaMusic, FaVolumeUp, FaExpand, FaChevronRight, FaImage, FaVideo } from 'react-icons/fa'

interface TemplatePreviewProps {
  templateId: string;
  theme?: 'normal' | 'love' | 'birthday';
  fullScreen?: boolean;
}

// Love Theme Animated Hearts Component
function LoveThemeHearts() {
  const hearts = Array.from({ length: 25 }, (_, i) => i);
  const heartColors = ['text-red-400', 'text-pink-400', 'text-rose-400', 'text-red-500', 'text-pink-500', 'text-purple-400', 'text-fuchsia-400'];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Multi-colored hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart}
          className="absolute"
          initial={{
            x: Math.random() * 100 + '%',
            y: '100vh',
            scale: Math.random() * 0.5 + 0.3,
            opacity: 0
          }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 1, 0],
            rotate: [0, 180, 360],
            scale: [0.3, 1, 0.8, 0.3]
          }}
          transition={{
            duration: Math.random() * 10 + 8,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut"
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        >
          <FaHeart
            className={`${heartColors[Math.floor(Math.random() * heartColors.length)]} drop-shadow-lg filter brightness-110`}
            size={Math.random() * 30 + 15}
          />
        </motion.div>
      ))}

      {/* Floating sparkles */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-yellow-300 drop-shadow-sm"
          initial={{
            x: Math.random() * 100 + '%',
            y: '100vh',
            opacity: 0
          }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Floating rose petals */}
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute text-pink-300"
          initial={{
            x: Math.random() * 100 + '%',
            y: '100vh',
            opacity: 0,
            rotate: 0
          }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.8, 0],
            rotate: [0, 360],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`]
          }}
          transition={{
            duration: Math.random() * 12 + 10,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "linear"
          }}
        >
          🌸
        </motion.div>
      ))}

      {/* Scattered LOVE text */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`love-${i}`}
          className="absolute font-bold text-pink-200/30 text-2xl md:text-4xl select-none"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: 0,
            scale: 0.5,
            rotate: Math.random() * 360
          }}
          animate={{
            opacity: [0, 0.3, 0.3, 0],
            scale: [0.5, 1, 1, 0.5],
            rotate: [Math.random() * 360, Math.random() * 360 + 180]
          }}
          transition={{
            duration: Math.random() * 8 + 12,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
        >
          LOVE
        </motion.div>
      ))}

      {/* Floating hearts with different shapes */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={`big-heart-${i}`}
          className="absolute text-4xl md:text-6xl"
          initial={{
            x: Math.random() * 100 + '%',
            y: '100vh',
            opacity: 0,
            scale: 0.2
          }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.6, 0.6, 0],
            scale: [0.2, 1.5, 1.5, 0.2],
            rotate: [0, 90, 180, 270]
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut"
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
}

// Love Theme Wrapper
function LoveThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full bg-gradient-to-br from-pink-200 via-pink-400 via-rose-300 to-red-300 overflow-hidden">
      <LoveThemeHearts />
      {/* Romantic overlay with multiple gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 via-transparent to-red-400/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-rose-400/10 via-transparent to-pink-400/10" />
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,20,147,0.3) 2px, transparent 2px),
                         radial-gradient(circle at 75% 75%, rgba(255,20,147,0.3) 2px, transparent 2px)`,
        backgroundSize: '50px 50px'
      }} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Birthday Theme Animated Elements
function BirthdayThemeElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced Confetti */}
      {Array.from({ length: 25 }, (_, i) => (
        <motion.div
          key={`confetti-${i}`}
          className="absolute"
          initial={{
            x: Math.random() * 100 + '%',
            y: '100vh',
            opacity: 0
          }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 1, 0],
            rotate: [0, 360],
            scale: [0.3, 1.2, 0.3]
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        >
          {['🎉', '🎊', '✨', '🎈', '🎂', '🎁', '🎆', '🎇'][Math.floor(Math.random() * 8)]}
        </motion.div>
      ))}

      {/* Enhanced Balloons - Multiple colors and sizes */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={`balloon-${i}`}
          className="absolute"
          initial={{
            x: Math.random() * 100 + '%',
            y: '100vh',
            opacity: 0
          }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 0],
            x: [`${Math.random() * 100}%`, `${Math.random() * 120}%`],
            rotate: [0, 15, -15, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: Math.random() * 10 + 8,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            fontSize: `${Math.random() * 20 + 20}px`,
          }}
        >
          {['🎈', '🔴', '🟡', '🟢', '🔵', '🟣', '🟠'][Math.floor(Math.random() * 7)]}
        </motion.div>
      ))}

      {/* Crackers/Fireworks */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`cracker-${i}`}
          className="absolute text-3xl"
          initial={{
            x: Math.random() * 100 + '%',
            y: '100vh',
            opacity: 0,
            scale: 0.2
          }}
          animate={{
            y: '-5vh',
            opacity: [0, 1, 1, 0],
            scale: [0.2, 1.5, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeOut"
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        >
          {['🎆', '🎇', '✨', '💥'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}

      {/* Cake pieces floating */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={`cake-${i}`}
          className="absolute text-2xl"
          initial={{
            x: Math.random() * 100 + '%',
            y: '100vh',
            opacity: 0
          }}
          animate={{
            y: '-8vh',
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, 90, 180, 270],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: Math.random() * 12 + 8,
            repeat: Infinity,
            delay: Math.random() * 6,
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        >
          🎂
        </motion.div>
      ))}

      {/* Sparkles */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-xl"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: 0
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.2, 1, 0.2],
            rotate: [0, 180]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}

// Birthday Theme Wrapper
function BirthdayThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full bg-gradient-to-br from-yellow-200 via-orange-300 via-pink-300 to-yellow-400 overflow-hidden">
      <BirthdayThemeElements />
      {/* Enhanced festive overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-yellow-400/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400/15 via-transparent to-orange-400/15" />
      {/* Party pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,165,0,0.4) 3px, transparent 3px),
                         radial-gradient(circle at 80% 80%, rgba(255,192,203,0.4) 3px, transparent 3px)`,
        backgroundSize: '60px 60px'
      }} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default function TemplatePreview({ templateId, fullScreen = false }: TemplatePreviewProps) {
  // Text Only Templates
  if (templateId === 'text-only-normal') {
    return (
      <div className="h-full bg-gradient-to-br from-purple-900 via-purple-700 to-pink-700 flex items-center justify-center p-8">
        <div className="max-w-3xl text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <FaHeart className="text-8xl mx-auto mb-8 text-pink-300" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-8 text-white"
          >
            Happy Birthday, Sarah! 🎉
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl md:text-2xl leading-relaxed text-white/90"
          >
            Wishing you the most amazing day filled with love, laughter, and wonderful surprises!
            You deserve all the happiness in the world. May this year bring you endless joy and beautiful memories!
          </motion.p>
        </div>
      </div>
    );
  }

  if (templateId === 'text-only-love') {
    return (
      <div className="h-full bg-gradient-to-br from-pink-200 via-pink-400 via-rose-300 to-red-300 relative overflow-hidden flex items-center justify-center">
        <LoveThemeHearts />
        {/* Romantic overlay with multiple gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 via-transparent to-red-400/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400/10 via-transparent to-pink-400/10" />
        <div className="relative z-10 max-w-3xl text-center p-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: [0, 1.2, 1],
              rotate: [-180, 20, 0]
            }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
            className="mb-8"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaHeart className="text-8xl mx-auto text-red-500 drop-shadow-2xl filter brightness-110" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 100
            }}
            className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-red-600 via-pink-600 to-red-800 bg-clip-text text-transparent drop-shadow-lg"
          >
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="bg-gradient-to-r from-red-600 via-pink-600 to-red-800 bg-clip-text text-transparent bg-[length:200%_200%]"
            >
              Happy Birthday, My Love! 💕
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl md:text-2xl leading-relaxed text-red-800 font-medium"
          >
            <motion.span
              animate={{
                textShadow: [
                  '0 0 0px rgba(220, 38, 38, 0)',
                  '0 0 20px rgba(220, 38, 38, 0.5)',
                  '0 0 0px rgba(220, 38, 38, 0)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              My dearest love, today is all about celebrating you and the beautiful person you are.
              Every moment with you is a treasure, and I can&apos;t wait to create more memories together!
            </motion.span>
          </motion.p>
        </div>

        {/* Floating romantic elements around text */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-3xl"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          💕
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-1/4 text-2xl"
          animate={{
            y: [0, 15, 0],
            x: [0, 5, 0],
            rotate: [0, -10, 10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          🌹
        </motion.div>
      </div>
    );
  }

  if (templateId === 'text-only-birthday') {
    return (
      <div className="relative h-full bg-gradient-to-br from-yellow-200 via-orange-300 via-pink-300 to-yellow-400 overflow-hidden flex items-center justify-center">
        <BirthdayThemeElements />
        {/* Enhanced festive overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-yellow-400/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/15 via-transparent to-orange-400/15" />
        <div className="relative z-10 max-w-3xl text-center p-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: [0, 1.3, 1],
              rotate: [-180, 30, 0]
            }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
            className="mb-8"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 15, -15, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="text-8xl filter brightness-110">🎂</div>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 100
            }}
            className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg"
          >
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_200%]"
            >
              Happy Birthday! 🎉
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl md:text-2xl leading-relaxed text-orange-900 font-medium"
          >
            <motion.span
              animate={{
                textShadow: [
                  '0 0 0px rgba(234, 88, 12, 0)',
                  '0 0 20px rgba(234, 88, 12, 0.5)',
                  '0 0 0px rgba(234, 88, 12, 0)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Time to celebrate! May your birthday be filled with joy, laughter, and all your favorite things.
              Here&apos;s to another amazing year ahead filled with adventures and happiness!
            </motion.span>
          </motion.p>
        </div>

        {/* Floating birthday elements around text */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-3xl"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🎈
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-1/4 text-2xl"
          animate={{
            y: [0, 15, 0],
            x: [0, 5, 0],
            rotate: [0, -10, 10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          🎊
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/3 text-2xl"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 20, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          🎆
        </motion.div>
      </div>
    );
  }

  // Text with Image Templates
  if (templateId === 'text-with-image-normal') {
    return (
      <div className="h-full bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-700 flex items-center justify-center p-8">
        <div className="max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800"
              alt="Memory"
              className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Our Beautiful Memories
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-white/90">
              Every moment with you is a treasure. This picture reminds me of all the wonderful times we&apos;ve shared together. Here&apos;s to many more amazing memories!
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (templateId === 'text-with-image-love') {
    return (
      <div className="relative h-full bg-gradient-to-br from-pink-200 via-pink-400 via-rose-300 to-red-300 overflow-hidden flex items-center justify-center">
        <LoveThemeHearts />
        {/* Romantic overlay with multiple gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 via-transparent to-red-400/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400/10 via-transparent to-pink-400/10" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,20,147,0.3) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, rgba(255,20,147,0.3) 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
        <div className="relative z-10 h-full flex items-center justify-center p-8">
          <div className="max-w-6xl grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80, scale: 0.8 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1
              }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="relative"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800"
                alt="Memory"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-500/50 to-transparent rounded-2xl" />
              <motion.div
                className="absolute top-4 right-4 text-4xl"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                💕
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1
              }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 80,
                damping: 12
              }}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 bg-clip-text text-transparent drop-shadow-lg"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                <motion.span
                  animate={{
                    textShadow: [
                      '0 0 0px rgba(220, 38, 38, 0)',
                      '0 0 20px rgba(220, 38, 38, 0.5)',
                      '0 0 0px rgba(220, 38, 38, 0)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Our Beautiful Memories
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl leading-relaxed text-red-800 font-medium"
                animate={{
                  textShadow: [
                    '0 0 0px rgba(220, 38, 38, 0)',
                    '0 0 15px rgba(220, 38, 38, 0.4)',
                    '0 0 0px rgba(220, 38, 38, 0)'
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                Every moment with you is a treasure. This picture reminds me of all the wonderful times we&apos;ve shared together. Here&apos;s to many more amazing memories!
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (templateId === 'text-with-image-birthday') {
    return (
      <div className="relative h-full bg-gradient-to-br from-yellow-200 via-orange-300 via-pink-300 to-yellow-400 overflow-hidden flex items-center justify-center">
        <BirthdayThemeElements />
        {/* Enhanced festive overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-yellow-400/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/15 via-transparent to-orange-400/15" />
        {/* Party pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,165,0,0.4) 3px, transparent 3px),
                           radial-gradient(circle at 80% 80%, rgba(255,192,203,0.4) 3px, transparent 3px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="relative z-10 h-full flex items-center justify-center p-8">
          <div className="max-w-6xl grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80, scale: 0.8 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1
              }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="relative"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800"
                alt="Memory"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/50 to-transparent rounded-2xl" />
              <motion.div
                className="absolute top-4 right-4 text-4xl"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🎂
              </motion.div>
              <motion.div
                className="absolute bottom-4 left-4 text-3xl"
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                🎈
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1
              }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 80,
                damping: 12
              }}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                <motion.span
                  animate={{
                    textShadow: [
                      '0 0 0px rgba(234, 88, 12, 0)',
                      '0 0 20px rgba(234, 88, 12, 0.5)',
                      '0 0 0px rgba(234, 88, 12, 0)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Our Beautiful Memories
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl leading-relaxed text-orange-900 font-semibold"
                animate={{
                  textShadow: [
                    '0 0 0px rgba(234, 88, 12, 0)',
                    '0 0 15px rgba(234, 88, 12, 0.4)',
                    '0 0 0px rgba(234, 88, 12, 0)'
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                Every moment with you is a treasure. This picture reminds me of all the wonderful times we&apos;ve shared together. Here&apos;s to many more amazing memories!
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Text with Video Templates
  if (templateId === 'text-with-video-normal') {
    return (
      <div className="bg-gradient-to-br from-pink-900 via-pink-700 to-red-700 p-4 sm:p-8">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-white text-center"
          >
            A Special Message for You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl mb-8 text-white/90 text-center"
          >
            I created this video montage just for you! Watch all our favorite moments come to life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="relative bg-black/30 backdrop-blur-sm rounded-2xl p-8 aspect-video flex items-center justify-center border-2 border-white/20 shadow-2xl mx-auto max-w-4xl"
          >
            {/* Video player mockup */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
              {/* Video thumbnail placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

              {/* Play button */}
              <motion.div
                className="relative z-10 bg-white/20 backdrop-blur-md rounded-full p-6 border-2 border-white/30"
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(255,255,255,0.4)',
                    '0 0 0 20px rgba(255,255,255,0)',
                    '0 0 0 0 rgba(255,255,255,0)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaPlay className="text-4xl text-white ml-1" />
                </motion.div>
              </motion.div>

              {/* Video controls overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <FaPlay className="text-sm" />
                    <div className="w-32 h-1 bg-white/30 rounded-full">
                      <div className="w-1/3 h-full bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm">0:45 / 2:30</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaVolumeUp className="text-sm" />
                    <FaExpand className="text-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute top-4 right-4 text-2xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🎬
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (templateId === 'text-with-video-love') {
    return (
      <div className="relative bg-gradient-to-br from-pink-200 via-pink-400 via-rose-300 to-red-300 overflow-hidden">
        <LoveThemeHearts />
        {/* Romantic overlay with multiple gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 via-transparent to-red-400/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400/10 via-transparent to-pink-400/10" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,20,147,0.3) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, rgba(255,20,147,0.3) 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
        <div className="relative z-10 p-4 sm:p-8">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -40, scale: 0.8 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 bg-clip-text text-transparent drop-shadow-lg"
            >
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  textShadow: [
                    '0 0 0px rgba(220, 38, 38, 0)',
                    '0 0 25px rgba(220, 38, 38, 0.6)',
                    '0 0 0px rgba(220, 38, 38, 0)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                A Special Message for You
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 80,
                damping: 12
              }}
              className="text-xl md:text-2xl mb-8 text-red-900 font-semibold"
            >
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 0px rgba(220, 38, 38, 0)',
                    '0 0 20px rgba(220, 38, 38, 0.5)',
                    '0 0 0px rgba(220, 38, 38, 0)'
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              >
                I created this video montage just for you! Watch all our favorite moments come to life.
              </motion.span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0
              }}
              transition={{
                delay: 0.7,
                type: "spring",
                stiffness: 120,
                damping: 10
              }}
              className="bg-red-100/30 backdrop-blur-sm rounded-2xl p-12 aspect-video flex items-center justify-center relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-red-200/20 rounded-2xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="text-center relative z-10">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🎬
                </motion.div>
                <motion.p
                  className="text-red-600/60 font-medium"
                  animate={{
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Video Player Preview
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (templateId === 'text-with-video-birthday') {
    return (
      <div className="relative bg-gradient-to-br from-yellow-200 via-orange-300 via-pink-300 to-yellow-400 overflow-hidden">
        <BirthdayThemeElements />
        {/* Enhanced festive overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-yellow-400/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/15 via-transparent to-orange-400/15" />
        {/* Party pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,165,0,0.4) 3px, transparent 3px),
                           radial-gradient(circle at 80% 80%, rgba(255,192,203,0.4) 3px, transparent 3px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="relative z-10 p-4 sm:p-8">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -40, scale: 0.8 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg"
            >
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  textShadow: [
                    '0 0 0px rgba(234, 88, 12, 0)',
                    '0 0 25px rgba(234, 88, 12, 0.6)',
                    '0 0 0px rgba(234, 88, 12, 0)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                A Special Message for You
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 80,
                damping: 12
              }}
              className="text-xl md:text-2xl mb-8 text-orange-900 font-semibold"
            >
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 0px rgba(234, 88, 12, 0)',
                    '0 0 20px rgba(234, 88, 12, 0.5)',
                    '0 0 0px rgba(234, 88, 12, 0)'
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              >
                I created this video montage just for you! Watch all our favorite moments come to life.
              </motion.span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0
              }}
              transition={{
                delay: 0.7,
                type: "spring",
                stiffness: 120,
                damping: 10
              }}
              className="bg-yellow-100/30 backdrop-blur-sm rounded-2xl p-12 aspect-video flex items-center justify-center relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-200/20 to-pink-200/20 rounded-2xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="text-center relative z-10">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🎬
                </motion.div>
                <motion.p
                  className="text-yellow-600/60 font-medium"
                  animate={{
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Video Player Preview
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Text with Audio Templates
  if (templateId === 'text-with-audio-normal') {
    return (
      <div className="h-full bg-gradient-to-br from-teal-900 via-teal-700 to-cyan-700 flex items-center justify-center p-8">
        <div className="max-w-4xl text-center">
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <div className="text-8xl mb-8">🎵</div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
          >
            Listen to My Heart
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl md:text-2xl mb-8 text-white/90"
          >
            I recorded this special message just for you. Put on your headphones and listen with your heart.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border-2 border-white/20"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🎧</div>
              <div className="w-full h-12 bg-white/20 rounded-full flex items-center justify-center">
                <p className="text-sm text-white/80">Audio Player Controls</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (templateId === 'text-with-audio-love') {
    return (
      <div className="relative h-full bg-gradient-to-br from-pink-200 via-pink-400 via-rose-300 to-red-300 overflow-hidden flex items-center justify-center">
        <LoveThemeHearts />
        {/* Romantic overlay with multiple gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 via-transparent to-red-400/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400/10 via-transparent to-pink-400/10" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,20,147,0.3) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, rgba(255,20,147,0.3) 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
        <div className="relative z-10 h-full flex items-center justify-center p-8">
          <div className="max-w-4xl text-center">
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{
                scale: [0, 1.2, 1],
                rotate: [180, 20, 0]
              }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 10
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-8xl mb-8 filter brightness-110">🎵</div>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -40, scale: 0.8 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 bg-clip-text text-transparent drop-shadow-lg"
            >
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  textShadow: [
                    '0 0 0px rgba(220, 38, 38, 0)',
                    '0 0 25px rgba(220, 38, 38, 0.6)',
                    '0 0 0px rgba(220, 38, 38, 0)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                Listen to My Heart
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{
                delay: 0.7,
                type: "spring",
                stiffness: 80,
                damping: 12
              }}
              className="text-xl md:text-2xl mb-8 text-red-900 font-semibold"
            >
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 0px rgba(220, 38, 38, 0)',
                    '0 0 20px rgba(220, 38, 38, 0.5)',
                    '0 0 0px rgba(220, 38, 38, 0)'
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              >
                I recorded this special message just for you. Put on your headphones and listen with your heart.
              </motion.span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{
                delay: 0.9,
                type: "spring",
                stiffness: 120,
                damping: 10
              }}
              className="bg-red-100/10 backdrop-blur-md p-8 rounded-2xl border-2 border-red-200/20 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-red-200/20 rounded-2xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="text-center relative z-10">
                <motion.div
                  className="text-4xl mb-4"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🎧
                </motion.div>
                <motion.div
                  className="w-full h-12 bg-red-200/20 rounded-full flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(220, 38, 38, 0)',
                      '0 0 20px rgba(220, 38, 38, 0.3)',
                      '0 0 0px rgba(220, 38, 38, 0)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.p
                    className="text-sm text-red-600/80 font-medium"
                    animate={{
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Audio Player Controls
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (templateId === 'text-with-audio-birthday') {
    return (
      <div className="relative h-full bg-gradient-to-br from-yellow-200 via-orange-300 via-pink-300 to-yellow-400 overflow-hidden flex items-center justify-center">
        <BirthdayThemeElements />
        {/* Enhanced festive overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-yellow-400/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/15 via-transparent to-orange-400/15" />
        {/* Party pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,165,0,0.4) 3px, transparent 3px),
                           radial-gradient(circle at 80% 80%, rgba(255,192,203,0.4) 3px, transparent 3px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="relative z-10 h-full flex items-center justify-center p-8">
          <div className="max-w-4xl text-center">
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{
                scale: [0, 1.2, 1],
                rotate: [180, 20, 0]
              }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 10
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-8xl mb-8 filter brightness-110">🎵</div>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -40, scale: 0.8 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg"
            >
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  textShadow: [
                    '0 0 0px rgba(234, 88, 12, 0)',
                    '0 0 25px rgba(234, 88, 12, 0.6)',
                    '0 0 0px rgba(234, 88, 12, 0)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                Listen to My Heart
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{
                delay: 0.7,
                type: "spring",
                stiffness: 80,
                damping: 12
              }}
              className="text-xl md:text-2xl mb-8 text-orange-900 font-semibold"
            >
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 0px rgba(234, 88, 12, 0)',
                    '0 0 20px rgba(234, 88, 12, 0.5)',
                    '0 0 0px rgba(234, 88, 12, 0)'
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              >
                I recorded this special message just for you. Put on your headphones and listen with your heart.
              </motion.span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{
                delay: 0.9,
                type: "spring",
                stiffness: 120,
                damping: 10
              }}
              className="bg-yellow-100/10 backdrop-blur-md p-8 rounded-2xl border-2 border-yellow-200/20 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-200/20 to-pink-200/20 rounded-2xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="text-center relative z-10">
                <motion.div
                  className="text-4xl mb-4"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🎧
                </motion.div>
                <motion.div
                  className="w-full h-12 bg-yellow-200/20 rounded-full flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(234, 88, 12, 0)',
                      '0 0 20px rgba(234, 88, 12, 0.3)',
                      '0 0 0px rgba(234, 88, 12, 0)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.p
                    className="text-sm text-yellow-600/80 font-medium"
                    animate={{
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Audio Player Controls
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Photo Gallery Templates
  if (templateId === 'photo-gallery-normal') {
    const images = [
      'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400',
      'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=400',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
      'https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=400',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
    ];

    return (
      <div className="bg-gradient-to-br from-green-900 via-green-700 to-teal-700 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-white text-center"
          >
            Our Journey Together 📸
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl mb-12 text-white/90 text-center"
          >
            A collection of our most cherished moments
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="relative"
          >
            {/* Main featured image */}
            <motion.div
              className="mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={images[0]}
                alt="Featured memory"
                className="w-full max-w-2xl mx-auto h-64 object-cover rounded-2xl shadow-2xl border-4 border-white/20"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-lg font-semibold">Our First Date</p>
                <p className="text-sm opacity-90">That magical evening ✨</p>
              </div>
            </motion.div>

            {/* Gallery grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.slice(1).map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                  }}
                  className="relative group cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx + 2}`}
                    className="w-full h-32 object-cover rounded-xl shadow-xl transition-all duration-300 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 left-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Memory #{idx + 2}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2, 3, 4].map((dot) => (
                <motion.div
                  key={dot}
                  className={`w-3 h-3 rounded-full ${dot === 0 ? 'bg-white' : 'bg-white/40'}`}
                  animate={dot === 0 ? {
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: dot === 0 ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (templateId === 'photo-gallery-love') {
    const images = [
      'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400',
      'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=400',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
      'https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=400',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
    ];

    return (
      <div className="relative bg-gradient-to-br from-pink-200 via-pink-400 via-rose-300 to-red-300 overflow-hidden">
        <LoveThemeHearts />
        {/* Romantic overlay with multiple gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 via-transparent to-red-400/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400/10 via-transparent to-pink-400/10" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,20,147,0.3) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, rgba(255,20,147,0.3) 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
        <div className="relative z-10 p-4 sm:p-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-4 text-red-800"
            >
              Our Journey Together 📸
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl mb-12 text-red-700"
            >
              A collection of our most cherished moments
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {images.map((img, idx) => (
                <motion.img
                  key={idx}
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  className="rounded-xl shadow-xl w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (templateId === 'photo-gallery-birthday') {
    const images = [
      'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400',
      'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=400',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
      'https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=400',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
    ];

    return (
      <div className="relative bg-gradient-to-br from-yellow-200 via-orange-300 via-pink-300 to-yellow-400 overflow-hidden">
        <BirthdayThemeElements />
        {/* Enhanced festive overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-yellow-400/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/15 via-transparent to-orange-400/15" />
        {/* Party pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,165,0,0.4) 3px, transparent 3px),
                           radial-gradient(circle at 80% 80%, rgba(255,192,203,0.4) 3px, transparent 3px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="relative z-10 p-4 sm:p-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-4 text-yellow-800"
            >
              Our Journey Together 📸
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl mb-12 text-yellow-700"
            >
              A collection of our most cherished moments
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {images.map((img, idx) => (
                <motion.img
                  key={idx}
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  className="rounded-xl shadow-xl w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Treasure Hunt Templates
  if (templateId === 'treasure-hunt-normal') {
    return (
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-700 to-purple-700 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="relative mb-8"
          >
            <FaLock className="text-8xl mx-auto text-yellow-300 drop-shadow-lg" />
            <motion.div
              className="absolute -top-2 -right-2 text-2xl"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🔒
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-8 text-white"
          >
            Solve the Clues! 🔐
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl mb-8 text-white/80"
          >
            Follow the trail of clues to unlock your surprise!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-6 mb-8"
          >
            {[
              { clue: 'Where we first met...', emoji: '🏙️', hint: 'That special spot in the city' },
              { clue: 'Your favorite place...', emoji: '🏖️', hint: 'Where you feel most at peace' },
              { clue: 'Our special song...', emoji: '🎵', hint: 'The melody that reminds us of us' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl border-2 border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 bg-yellow-300/20 rounded-full flex items-center justify-center border-2 border-yellow-300/30"
                    animate={{
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(255,255,0,0.3)',
                        '0 0 0 10px rgba(255,255,0,0)',
                        '0 0 0 0 rgba(255,255,0,0)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-2xl font-bold text-yellow-300">#{idx + 1}</span>
                  </motion.div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{item.emoji}</span>
                      <p className="text-lg text-white font-medium">{item.clue}</p>
                    </div>
                    <p className="text-sm text-white/60 italic">{item.hint}</p>
                  </div>
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: idx * 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    <FaChevronRight className="text-yellow-300 text-xl" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border-2 border-white/20 shadow-xl">
              <motion.input
                type="text"
                placeholder="Enter password to unlock..."
                className="w-full p-4 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50 text-center text-lg mb-4 focus:outline-none focus:border-yellow-300 transition-colors"
                readOnly
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(255,255,255,0.2)',
                    '0 0 0 8px rgba(255,255,255,0)',
                    '0 0 0 0 rgba(255,255,255,0)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.button
                className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🔓 Unlock Treasure
              </motion.button>
            </div>
            <div className="text-sm text-white/60 mt-4 flex items-center justify-center gap-2">
              <FaMusic className="text-yellow-300" />
              <span>Hidden audio message + secret text revealed!</span>
              <FaMusic className="text-yellow-300" />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (templateId === 'treasure-hunt-love') {
    return (
      <div className="relative bg-gradient-to-br from-pink-200 via-pink-400 via-rose-300 to-red-300 overflow-hidden">
        <LoveThemeHearts />
        {/* Romantic overlay with multiple gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 via-transparent to-red-400/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400/10 via-transparent to-pink-400/10" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,20,147,0.3) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, rgba(255,20,147,0.3) 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
        <div className="relative z-10 p-4 sm:p-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <FaLock className="text-8xl mx-auto mb-8 text-red-400" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-8 text-red-800"
            >
              Solve the Clues! 🔐
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4 mb-8"
            >
              {['Where we first met...', 'Your favorite place...', 'Our special song...'].map((clue, idx) => (
                <div
                  key={idx}
                  className="bg-red-100/10 backdrop-blur-md p-6 rounded-xl border-2 border-red-200/20"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-red-400">#{idx + 1}</span>
                    <p className="text-lg text-left flex-1 text-red-700">{clue}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="max-w-md mx-auto"
            >
              <input
                type="text"
                placeholder="Enter password to unlock..."
                className="w-full p-4 rounded-lg bg-red-100/20 border-2 border-red-200/30 text-red-800 placeholder-red-400/50 text-center text-lg mb-4"
                readOnly
              />
              <div className="text-sm text-red-600/60">
                🎵 Hidden audio message + secret text revealed after unlock!
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (templateId === 'treasure-hunt-birthday') {
    return (
      <div className="relative bg-gradient-to-br from-yellow-200 via-orange-300 via-pink-300 to-yellow-400 overflow-hidden">
        <BirthdayThemeElements />
        {/* Enhanced festive overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-yellow-400/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/15 via-transparent to-orange-400/15" />
        {/* Party pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,165,0,0.4) 3px, transparent 3px),
                           radial-gradient(circle at 80% 80%, rgba(255,192,203,0.4) 3px, transparent 3px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="relative z-10 p-4 sm:p-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <FaLock className="text-8xl mx-auto mb-8 text-yellow-400" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-8 text-yellow-800"
            >
              Solve the Clues! 🔐
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4 mb-8"
            >
              {['Where we first met...', 'Your favorite place...', 'Our special song...'].map((clue, idx) => (
                <div
                  key={idx}
                  className="bg-yellow-100/10 backdrop-blur-md p-6 rounded-xl border-2 border-yellow-200/20"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-yellow-400">#{idx + 1}</span>
                    <p className="text-lg text-left flex-1 text-yellow-700">{clue}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="max-w-md mx-auto"
            >
              <input
                type="text"
                placeholder="Enter password to unlock..."
                className="w-full p-4 rounded-lg bg-yellow-100/20 border-2 border-yellow-200/30 text-yellow-800 placeholder-yellow-400/50 text-center text-lg mb-4"
                readOnly
              />
              <div className="text-sm text-yellow-600/60">
                🎵 Hidden audio message + secret text revealed after unlock!
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Treasure Hunt + Image Templates
  if (templateId === 'treasure-hunt-image-normal') {
    return (
      <div className="bg-gradient-to-br from-violet-900 via-violet-700 to-purple-700 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="relative mb-8"
          >
            <FaLock className="text-8xl mx-auto text-yellow-300 drop-shadow-lg" />
            <motion.div
              className="absolute -top-2 -right-2 text-2xl"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🖼️
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-8 text-white"
          >
            Solve the Clues! 🔐
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl mb-8 text-white/80"
          >
            Follow the trail of clues to unlock your surprise photo!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-6 mb-8"
          >
            {[
              { clue: 'First hint...', emoji: '🌟', hint: 'Think about our beginning' },
              { clue: 'Second hint...', emoji: '💫', hint: 'A place that means everything' },
              { clue: 'Final clue...', emoji: '✨', hint: 'The moment that changed everything' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl border-2 border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 bg-yellow-300/20 rounded-full flex items-center justify-center border-2 border-yellow-300/30"
                    animate={{
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(255,255,0,0.3)',
                        '0 0 0 10px rgba(255,255,0,0)',
                        '0 0 0 0 rgba(255,255,0,0)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-2xl font-bold text-yellow-300">#{idx + 1}</span>
                  </motion.div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{item.emoji}</span>
                      <p className="text-lg text-white font-medium">{item.clue}</p>
                    </div>
                    <p className="text-sm text-white/60 italic">{item.hint}</p>
                  </div>
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: idx * 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    <FaChevronRight className="text-yellow-300 text-xl" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border-2 border-white/20 shadow-xl">
              <motion.input
                type="text"
                placeholder="Enter password to unlock..."
                className="w-full p-4 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50 text-center text-lg mb-4 focus:outline-none focus:border-yellow-300 transition-colors"
                readOnly
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(255,255,255,0.2)',
                    '0 0 0 8px rgba(255,255,255,0)',
                    '0 0 0 0 rgba(255,255,255,0)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.button
                className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🔓 Unlock Treasure
              </motion.button>
            </div>
            <div className="text-sm text-white/60 mt-4 flex items-center justify-center gap-2">
              <FaImage className="text-yellow-300" />
              <span>Hidden image + secret message revealed!</span>
              <FaImage className="text-yellow-300" />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (templateId === 'treasure-hunt-image-love') {
    return (
      <div className="relative h-full bg-gradient-to-br from-pink-200 via-pink-400 via-rose-300 to-red-300 overflow-hidden flex items-center justify-center">
        <LoveThemeHearts />
        {/* Romantic overlay with multiple gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 via-transparent to-red-400/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400/10 via-transparent to-pink-400/10" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,20,147,0.3) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, rgba(255,20,147,0.3) 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
        <div className="relative z-10 h-full flex items-center justify-center p-8">
          <div className="max-w-4xl text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <FaLock className="text-8xl mx-auto mb-8 text-red-400" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-8 text-red-800"
            >
              Solve the Clues! 🔐
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4 mb-8"
            >
              {['First hint...', 'Second hint...', 'Final clue...'].map((clue, idx) => (
                <div
                  key={idx}
                  className="bg-red-100/10 backdrop-blur-md p-6 rounded-xl border-2 border-red-200/20"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-red-400">#{idx + 1}</span>
                    <p className="text-lg text-left flex-1 text-red-700">{clue}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="max-w-md mx-auto"
            >
              <input
                type="text"
                placeholder="Enter password to unlock..."
                className="w-full p-4 rounded-lg bg-red-100/20 border-2 border-red-200/30 text-red-800 placeholder-red-400/50 text-center text-lg mb-4"
                readOnly
              />
              <div className="text-sm text-red-600/60">
                🖼️ Hidden image + secret message revealed after unlock!
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (templateId === 'treasure-hunt-image-birthday') {
    return (
      <div className="relative bg-gradient-to-br from-yellow-200 via-orange-300 via-pink-300 to-yellow-400 overflow-hidden">
        <BirthdayThemeElements />
        {/* Enhanced festive overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-yellow-400/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/15 via-transparent to-orange-400/15" />
        {/* Party pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,165,0,0.4) 3px, transparent 3px),
                           radial-gradient(circle at 80% 80%, rgba(255,192,203,0.4) 3px, transparent 3px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="relative z-10 p-4 sm:p-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <FaLock className="text-8xl mx-auto mb-8 text-yellow-400" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-8 text-yellow-800"
            >
              Solve the Clues! 🔐
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4 mb-8"
            >
              {['First hint...', 'Second hint...', 'Final clue...'].map((clue, idx) => (
                <div
                  key={idx}
                  className="bg-yellow-100/10 backdrop-blur-md p-6 rounded-xl border-2 border-yellow-200/20"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-yellow-400">#{idx + 1}</span>
                    <p className="text-lg text-left flex-1 text-yellow-700">{clue}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="max-w-md mx-auto"
            >
              <input
                type="text"
                placeholder="Enter password to unlock..."
                className="w-full p-4 rounded-lg bg-yellow-100/20 border-2 border-yellow-200/30 text-yellow-800 placeholder-yellow-400/50 text-center text-lg mb-4"
                readOnly
              />
              <div className="text-sm text-yellow-600/60">
                🖼️ Hidden image + secret message revealed after unlock!
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Treasure Hunt + Video Templates
  if (templateId === 'treasure-hunt-video-normal') {
    return (
      <div className="bg-gradient-to-br from-fuchsia-900 via-fuchsia-700 to-purple-700 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="relative mb-8"
          >
            <FaLock className="text-8xl mx-auto text-yellow-300 drop-shadow-lg" />
            <motion.div
              className="absolute -top-2 -right-2 text-2xl"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🎥
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-8 text-white"
          >
            Solve the Clues! 🔐
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl mb-8 text-white/80"
          >
            Follow the trail of clues to unlock your surprise video!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-6 mb-8"
          >
            {[
              { clue: 'Think back to when...', emoji: '🌅', hint: 'Our first adventure together' },
              { clue: 'Remember the place...', emoji: '🏞️', hint: 'Where memories were made' },
              { clue: 'Our special moment...', emoji: '💑', hint: 'The instant that changed everything' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl border-2 border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 bg-yellow-300/20 rounded-full flex items-center justify-center border-2 border-yellow-300/30"
                    animate={{
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(255,255,0,0.3)',
                        '0 0 0 10px rgba(255,255,0,0)',
                        '0 0 0 0 rgba(255,255,0,0)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-2xl font-bold text-yellow-300">#{idx + 1}</span>
                  </motion.div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{item.emoji}</span>
                      <p className="text-lg text-white font-medium">{item.clue}</p>
                    </div>
                    <p className="text-sm text-white/60 italic">{item.hint}</p>
                  </div>
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: idx * 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    <FaChevronRight className="text-yellow-300 text-xl" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border-2 border-white/20 shadow-xl">
              <motion.input
                type="text"
                placeholder="Enter password to unlock..."
                className="w-full p-4 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50 text-center text-lg mb-4 focus:outline-none focus:border-yellow-300 transition-colors"
                readOnly
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(255,255,255,0.2)',
                    '0 0 0 8px rgba(255,255,255,0)',
                    '0 0 0 0 rgba(255,255,255,0)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.button
                className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🔓 Unlock Treasure
              </motion.button>
            </div>
            <div className="text-sm text-white/60 mt-4 flex items-center justify-center gap-2">
              <FaVideo className="text-yellow-300" />
              <span>Hidden video message + secret text revealed!</span>
              <FaVideo className="text-yellow-300" />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (templateId === 'treasure-hunt-video-love') {
    return (
      <div className="relative h-full bg-gradient-to-br from-pink-200 via-pink-400 via-rose-300 to-red-300 overflow-hidden flex items-center justify-center">
        <LoveThemeHearts />
        {/* Romantic overlay with multiple gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 via-transparent to-red-400/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400/10 via-transparent to-pink-400/10" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,20,147,0.3) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, rgba(255,20,147,0.3) 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
        <div className="relative z-10 h-full flex items-center justify-center p-8">
          <div className="max-w-4xl text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <FaLock className="text-8xl mx-auto mb-8 text-red-400" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-8 text-red-800"
            >
              Solve the Clues! 🔐
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4 mb-8"
            >
              {['Think back to when...', 'Remember the place...', 'Our special moment...'].map((clue, idx) => (
                <div
                  key={idx}
                  className="bg-red-100/10 backdrop-blur-md p-6 rounded-xl border-2 border-red-200/20"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-red-400">#{idx + 1}</span>
                    <p className="text-lg text-left flex-1 text-red-700">{clue}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="max-w-md mx-auto"
            >
              <input
                type="text"
                placeholder="Enter password to unlock..."
                className="w-full p-4 rounded-lg bg-red-100/20 border-2 border-red-200/30 text-red-800 placeholder-red-400/50 text-center text-lg mb-4"
                readOnly
              />
              <div className="text-sm text-red-600/60">
                🎥 Hidden video message + secret text revealed after unlock!
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (templateId === 'treasure-hunt-video-birthday') {
    return (
      <div className="relative bg-gradient-to-br from-yellow-200 via-orange-300 via-pink-300 to-yellow-400 overflow-hidden">
        <BirthdayThemeElements />
        {/* Enhanced festive overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-yellow-400/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/15 via-transparent to-orange-400/15" />
        {/* Party pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,165,0,0.4) 3px, transparent 3px),
                           radial-gradient(circle at 80% 80%, rgba(255,192,203,0.4) 3px, transparent 3px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="relative z-10 p-4 sm:p-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <FaLock className="text-8xl mx-auto mb-8 text-yellow-400" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-8 text-yellow-800"
            >
              Solve the Clues! 🔐
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4 mb-8"
            >
              {['Think back to when...', 'Remember the place...', 'Our special moment...'].map((clue, idx) => (
                <div
                  key={idx}
                  className="bg-yellow-100/10 backdrop-blur-md p-6 rounded-xl border-2 border-yellow-200/20"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-yellow-400">#{idx + 1}</span>
                    <p className="text-lg text-left flex-1 text-yellow-700">{clue}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="max-w-md mx-auto"
            >
              <input
                type="text"
                placeholder="Enter password to unlock..."
                className="w-full p-4 rounded-lg bg-yellow-100/20 border-2 border-yellow-200/30 text-yellow-800 placeholder-yellow-400/50 text-center text-lg mb-4"
                readOnly
              />
              <div className="text-sm text-yellow-600/60">
                🎥 Hidden video message + secret text revealed after unlock!
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
