import React, { useMemo } from 'react';

/**
 * FloatingCodeSnippets — purely CSS-driven, zero React state updates.
 *
 * Previous implementation ran setInterval every 80 ms calling setState,
 * causing ~12 React re-renders per second.  We now render a fixed set of
 * snippets and animate them entirely with @keyframes via inline style.
 * This is ~100× cheaper and produces the same visual effect.
 */

const SNIPPETS_TEXT = [
  'const future = await buildTomorrow();',
  'function innovate() { return creativity + code; }',
  'class Developer extends Dreamer {}',
  "npm install --save possibilities",
  "git commit -m 'Building the future'",
  'const magic = () => { /* Code here */ };',
  "import { passion } from 'developer';",
  'export default Excellence;',
  'async function createAmazing() {}',
  'const vision = new Promise(resolve => {});',
];

// Fixed snippet configs — determined once, never change.
const SNIPPETS = [
  { text: SNIPPETS_TEXT[0],  left: '5%',  duration: 22, delay: 0,    opacity: 0.15, size: 13 },
  { text: SNIPPETS_TEXT[1],  left: '18%', duration: 28, delay: 4,    opacity: 0.12, size: 12 },
  { text: SNIPPETS_TEXT[2],  left: '35%', duration: 20, delay: 8,    opacity: 0.18, size: 14 },
  { text: SNIPPETS_TEXT[3],  left: '52%', duration: 25, delay: 2,    opacity: 0.13, size: 12 },
  { text: SNIPPETS_TEXT[4],  left: '68%', duration: 30, delay: 6,    opacity: 0.16, size: 13 },
  { text: SNIPPETS_TEXT[5],  left: '80%', duration: 18, delay: 10,   opacity: 0.14, size: 12 },
  { text: SNIPPETS_TEXT[6],  left: '12%', duration: 24, delay: 14,   opacity: 0.17, size: 13 },
  { text: SNIPPETS_TEXT[7],  left: '44%', duration: 26, delay: 16,   opacity: 0.12, size: 12 },
  { text: SNIPPETS_TEXT[8],  left: '72%', duration: 21, delay: 3,    opacity: 0.15, size: 14 },
  { text: SNIPPETS_TEXT[9],  left: '90%', duration: 27, delay: 12,   opacity: 0.13, size: 12 },
];

const FloatingCodeSnippets = () => {
  // Memoise so the array reference is stable across re-renders.
  const snippets = useMemo(() => SNIPPETS, []);

  return (
    <>
      {/* Keyframes injected once — no React state involved */}
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateX(-50%) translateY(100vh); opacity: 0; }
          5%   { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(-50%) translateY(-120px); opacity: 0; }
        }
      `}</style>

      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        {snippets.map((s, i) => (
          <span
            key={i}
            className="absolute font-mono text-accent whitespace-nowrap select-none"
            style={{
              left: s.left,
              bottom: '-60px',
              fontSize: `${s.size}px`,
              opacity: s.opacity,
              animation: `floatUp ${s.duration}s linear ${s.delay}s infinite`,
            }}
          >
            {s.text}
          </span>
        ))}
      </div>
    </>
  );
};

export default FloatingCodeSnippets;
