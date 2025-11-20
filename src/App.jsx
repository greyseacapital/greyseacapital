import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function App() {
  const year = new Date().getFullYear();
  const [showContact, setShowContact] = useState(false);
  const canvasRef = useRef(null);

  // Enhanced and repositioned digital grey/white WAVES animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight / 2.5); // limit vertical area

    const lerp = (a, b, t) => a + (b - a) * t;

    const config = {
      layers: 6,
      baseAmp: 80,
      baseLen: 0.009,
      speed: 0.002,
      spread: 70,
      lineWidth: 2.5,
      opacityStart: 0.25,
      opacityEnd: 0.1,
    };

    let t = 0;

    const draw = () => {
      t += config.speed * 16;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < config.layers; i++) {
        const progress = i / (config.layers - 1 || 1);
        const amp = config.baseAmp * lerp(1.4, 0.6, progress);
        const yBase = height * 0.5 + (progress - 0.5) * config.spread;
        const len = config.baseLen * lerp(0.9, 1.8, progress);
        const opacity = lerp(config.opacityStart, config.opacityEnd, progress);

        for (let pass = 0; pass < 2; pass++) {
          ctx.beginPath();
          for (let x = 0; x <= width; x += 2) {
            const n1 = Math.sin(x * len + t * 2 + i * 0.7);
            const n2 = Math.sin(x * len * 0.5 + t * 1.2 - i * 0.9);
            const n3 = Math.sin(x * len * 1.7 - t * 1.5 + i * 0.3);
            const y = yBase + (n1 * 0.6 + n2 * 0.3 + n3 * 0.1) * amp;
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(255,255,255,${pass === 0 ? opacity : opacity * 0.4})`;
          ctx.lineWidth = pass === 0 ? config.lineWidth : config.lineWidth + 3;
          ctx.stroke();
        }
      }
      requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight / 2.5;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
      {/* Waves visible between logo and Coming Soon */}
      <div className="absolute top-20 left-0 w-full z-20 flex justify-center">
        <canvas ref={canvasRef} className="w-full max-w-6xl opacity-80" />
      </div>

      {/* Header — text-only wordmark */}
      <header className="relative z-30 px-8 md:px-20 py-8 md:py-10 flex items-center">
        <motion.h1
          className="text-xl md:text-2xl font-semibold tracking-tight text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          GREY SEA CAPITAL
        </motion.h1>
      </header>

      {/* Hero */}
      <main className="relative z-10 px-8 md:px-20">
        <section className="mx-auto max-w-4xl text-center pt-64 md:pt-72">
          <motion.span
            className="block text-xs uppercase tracking-[0.35em] text-neutral-500 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Coming Soon
          </motion.span>

          <motion.h2
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.04] text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            GREY SEA CAPITAL
          </motion.h2>

          <motion.p
            className="mt-10 text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            A New Perspective on Market Neutrality.
          </motion.p>

          <motion.div
            className="mt-16 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
          >
            <button
              onClick={() => setShowContact((v) => !v)}
              className="rounded-lg border border-neutral-600 px-8 py-3 text-sm font-medium text-white hover:text-black hover:bg-white transition"
            >
              Contact
            </button>
          </motion.div>

          {showContact && (
            <motion.div
              className="mt-12 bg-neutral-900/80 border border-neutral-700 rounded-2xl p-10 max-w-xl mx-auto text-left"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm text-neutral-400 text-center mb-6">Email us at</p>
              <div className="flex items-center justify-center">
                <a
                  href="mailto:contact@greyseacapital.com"
                  className="rounded-md border border-neutral-600 px-5 py-3 text-sm font-medium text-white hover:text-black hover:bg-white transition"
                >
                  david@greyseacapital.com
                </a>
              </div>
            </motion.div>
          )}

          <motion.div
            className="mt-16 text-xs text-neutral-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            Discipline • Precision • Clarity
          </motion.div>
        </section>

        <motion.footer
          className="mx-auto max-w-5xl py-28 text-[13px] text-neutral-600 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <span>© {year} GREY SEA CAPITAL</span>
        </motion.footer>
      </main>
    </div>
  );
}
