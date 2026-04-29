import React, { useState, useEffect, useRef, useCallback } from 'react';
import SkillPlanet from './SkillPlanet';
import SkillTooltip from './SkillTooltip';

// ─── CONFIG ──────────────────────────────────────────────────────────────────

/** Three depth-layers of stars: far (tiny/dim), mid, near (large/bright) */
const STAR_LAYERS = {
  desktop: [
    { count: 140, minSize: 0.2, maxSize: 0.7,  minOp: 0.04, maxOp: 0.14, speed: 0.008 },
    { count:  80, minSize: 0.6, maxSize: 1.4,  minOp: 0.10, maxOp: 0.30, speed: 0.020 },
    { count:  40, minSize: 1.2, maxSize: 2.6,  minOp: 0.18, maxOp: 0.50, speed: 0.038 },
  ],
  mobile: [
    { count: 70, minSize: 0.2, maxSize: 0.6,  minOp: 0.04, maxOp: 0.12, speed: 0.006 },
    { count: 35, minSize: 0.5, maxSize: 1.2,  minOp: 0.08, maxOp: 0.25, speed: 0.015 },
    { count: 18, minSize: 1.0, maxSize: 2.0,  minOp: 0.14, maxOp: 0.40, speed: 0.028 },
  ],
};

/** Star color palette — weighted random pick */
const STAR_COLORS = [
  { r: 200, g: 220, b: 255, weight: 40 }, // cool blue-white
  { r: 255, g: 250, b: 245, weight: 30 }, // pure white
  { r: 180, g: 200, b: 255, weight: 12 }, // blue
  { r: 255, g: 220, b: 180, weight: 10 }, // warm amber
  { r: 220, g: 180, b: 255, weight:  5 }, // lavender
  { r: 180, g: 255, b: 220, weight:  3 }, // mint
];

const METEOR_COUNT = { desktop: 4, mobile: 2 };
const CONSTELLATION_DIST = 120; // max px between linked stars

const ORBITS_DESKTOP = [
  { radiusRatio: 0.30, angularSpeed: 0.00030 },
  { radiusRatio: 0.55, angularSpeed: 0.00019 },
  { radiusRatio: 0.78, angularSpeed: 0.00012 },
];
const ORBITS_MOBILE = [
  { radiusRatio: 0.22, angularSpeed: 0.00030 },
  { radiusRatio: 0.44, angularSpeed: 0.00019 },
  { radiusRatio: 0.66, angularSpeed: 0.00012 },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const getPlanetSize = (proficiency, isMobile) => {
  const base = 36 + (proficiency / 100) * 32;
  return Math.round(isMobile ? base * 0.72 : base);
};

const buildOrbitStates = (skills, isMobile, prevStates = []) => {
  const cfg = isMobile ? ORBITS_MOBILE : ORBITS_DESKTOP;
  const prevAngles = {};
  prevStates.forEach((s) => { prevAngles[s.id] = s.angle; });

  const sorted = [...skills].sort((a, b) => b.proficiency - a.proficiency);
  const rings  = cfg.map(() => []);
  sorted.forEach((skill, i) => rings[i % cfg.length].push(skill));

  const states = [];
  rings.forEach((ringSkills, ringIdx) => {
    const { radiusRatio, angularSpeed } = cfg[ringIdx];
    ringSkills.forEach((skill, posInRing) => {
      const defaultAngle =
        ringSkills.length > 1
          ? (posInRing / ringSkills.length) * Math.PI * 2
          : 0;
      states.push({
        id: skill.id,
        radiusRatio,
        angularSpeed,
        angle: prevAngles[skill.id] !== undefined ? prevAngles[skill.id] : defaultAngle,
      });
    });
  });
  return states;
};

/** Weighted random color pick */
const pickStarColor = () => {
  const total = STAR_COLORS.reduce((s, c) => s + c.weight, 0);
  let r = Math.random() * total;
  for (const c of STAR_COLORS) {
    r -= c.weight;
    if (r <= 0) return c;
  }
  return STAR_COLORS[0];
};

// ─── NEXT-GEN CANVAS PARTICLE FIELD ─────────────────────────────────────────

const ParticleField = React.memo(({ isMobile }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const layers = isMobile ? STAR_LAYERS.mobile : STAR_LAYERS.desktop;
    const meteorMax = isMobile ? METEOR_COUNT.mobile : METEOR_COUNT.desktop;
    let animId;
    let allStars = [];
    let meteors  = [];
    let brightStars = []; // for constellation lines
    let frame = 0;

    /* ── Star spawner ─────────────────────────────────────────────── */
    const spawnStars = (w, h) => {
      const stars = [];
      layers.forEach((layer, li) => {
        for (let i = 0; i < layer.count; i++) {
          const sz = layer.minSize + Math.random() * (layer.maxSize - layer.minSize);
          const ang = Math.random() * Math.PI * 2;
          const clr = pickStarColor();
          stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: sz,
            layer: li,
            baseOp: layer.minOp + Math.random() * (layer.maxOp - layer.minOp),
            phase: Math.random() * Math.PI * 2,
            twinkleSpd: 0.003 + Math.random() * 0.012,
            // Deeper stars have slower twinkle — cinematic feel
            twinkleAmp: li === 0 ? 0.3 : li === 1 ? 0.45 : 0.6,
            vx: Math.cos(ang) * layer.speed * (0.4 + Math.random() * 0.6),
            vy: Math.sin(ang) * layer.speed * (0.4 + Math.random() * 0.6),
            r: clr.r, g: clr.g, b: clr.b,
            // Near-layer stars can have a subtle cross-glow
            hasGlow: li === 2 && Math.random() < 0.35,
          });
        }
      });
      return stars;
    };

    /* ── Shooting-star / meteor spawner ───────────────────────────── */
    const spawnMeteor = (w, h) => ({
      x: Math.random() * w * 1.2 - w * 0.1,
      y: -10 - Math.random() * 60,
      angle: (0.6 + Math.random() * 0.5),      // radians, mostly downward-right
      speed: 3.5 + Math.random() * 4.5,
      length: 60 + Math.random() * 100,
      life: 0,
      maxLife: 50 + Math.random() * 60,
      width: 0.8 + Math.random() * 1.2,
      opacity: 0.5 + Math.random() * 0.4,
      active: true,
    });

    /* ── Resize ───────────────────────────────────────────────────── */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth  || window.innerWidth;
      const h = canvas.offsetHeight || window.innerHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      allStars = spawnStars(w, h);
      brightStars = allStars.filter(s => s.layer === 2);
      meteors = [];
    };
    resize();

    /* ── Draw loop ────────────────────────────────────────────────── */
    const draw = () => {
      const w = canvas.offsetWidth  || window.innerWidth;
      const h = canvas.offsetHeight || window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      frame++;

      /* — Stars — */
      for (let i = 0; i < allStars.length; i++) {
        const s = allStars[i];
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -4)    s.x = w + 4;
        if (s.x > w + 4) s.x = -4;
        if (s.y < -4)    s.y = h + 4;
        if (s.y > h + 4) s.y = -4;
        s.phase += s.twinkleSpd;
        const tw = (Math.sin(s.phase) + 1) * 0.5;
        const op = s.baseOp * (1 - s.twinkleAmp + tw * s.twinkleAmp);

        // Glow halo for bright near-layer stars
        if (s.hasGlow) {
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 4);
          grad.addColorStop(0, `rgba(${s.r},${s.g},${s.b},${(op * 0.25).toFixed(3)})`);
          grad.addColorStop(1, `rgba(${s.r},${s.g},${s.b},0)`);
          ctx.fillStyle = grad;
          ctx.fillRect(s.x - s.size * 4, s.y - s.size * 4, s.size * 8, s.size * 8);
        }

        // Star core
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${op.toFixed(3)})`;
        ctx.fill();

        // Cross-spike for biggest stars
        if (s.hasGlow && op > 0.25) {
          ctx.save();
          ctx.globalAlpha = op * 0.3;
          ctx.strokeStyle = `rgba(${s.r},${s.g},${s.b},1)`;
          ctx.lineWidth = 0.5;
          const sp = s.size * 5;
          ctx.beginPath();
          ctx.moveTo(s.x - sp, s.y); ctx.lineTo(s.x + sp, s.y);
          ctx.moveTo(s.x, s.y - sp); ctx.lineTo(s.x, s.y + sp);
          ctx.stroke();
          ctx.restore();
        }
      }

      /* — Constellation lines (faint, between nearby bright stars) — */
      if (!isMobile) {
        ctx.save();
        ctx.lineWidth = 0.4;
        for (let i = 0; i < brightStars.length; i++) {
          const a = brightStars[i];
          for (let j = i + 1; j < brightStars.length; j++) {
            const b = brightStars[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONSTELLATION_DIST) {
              const fade = 1 - dist / CONSTELLATION_DIST;
              ctx.strokeStyle = `rgba(140,180,255,${(fade * 0.07).toFixed(3)})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        ctx.restore();
      }

      /* — Shooting stars / Meteors — */
      // Spawn new meteors periodically
      if (frame % 90 === 0 && meteors.filter(m => m.active).length < meteorMax) {
        meteors.push(spawnMeteor(w, h));
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        if (!m.active) continue;
        m.life++;
        if (m.life > m.maxLife) { m.active = false; continue; }
        const progress = m.life / m.maxLife;
        // Fade in then out
        const fadeOp = progress < 0.15 ? progress / 0.15 : progress > 0.7 ? (1 - progress) / 0.3 : 1;
        const mx = m.x + Math.cos(m.angle) * m.speed * m.life;
        const my = m.y + Math.sin(m.angle) * m.speed * m.life;
        const tx = mx - Math.cos(m.angle) * m.length * fadeOp;
        const ty = my - Math.sin(m.angle) * m.length * fadeOp;
        const grad = ctx.createLinearGradient(tx, ty, mx, my);
        grad.addColorStop(0, `rgba(180,210,255,0)`);
        grad.addColorStop(0.7, `rgba(220,240,255,${(m.opacity * fadeOp * 0.4).toFixed(3)})`);
        grad.addColorStop(1, `rgba(255,255,255,${(m.opacity * fadeOp).toFixed(3)})`);
        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(mx, my);
        ctx.stroke();
        ctx.restore();
      }
      // Clean up dead meteors
      if (meteors.length > 20) {
        meteors = meteors.filter(m => m.active);
      }

      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || document.documentElement);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
});
ParticleField.displayName = 'ParticleField';

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const SkillUniverse = ({
  skills,
  selectedSkill,
  onSkillSelect,
  hoveredSkill,
  onSkillHover,
  selectedView,
  isMobile,
}) => {
  const containerRef  = useRef(null);
  const dimRef        = useRef({ w: 800, h: 600 });
  const [dims, setDims] = useState({ w: 800, h: 600 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const planetDomMap  = useRef({});
  const orbitStateRef = useRef([]);
  const rafRef        = useRef(null);

  // ── Resize tracking ───────────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w > 0 && h > 0) {
        dimRef.current = { w, h };
        setDims({ w, h });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Mouse tracking (desktop) ──────────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  // ── Rebuild orbit state when skills / isMobile change ────────────────────
  useEffect(() => {
    if (!skills?.length) { orbitStateRef.current = []; return; }
    orbitStateRef.current = buildOrbitStates(skills, isMobile, orbitStateRef.current);
  }, [skills, isMobile]);

  // ── RAF loop — direct DOM mutation, zero React re-renders ─────────────────
  useEffect(() => {
    const tick = () => {
      const { w, h } = dimRef.current;
      const cx  = w / 2;
      const cy  = h / 2;
      const dim = Math.min(w, h);
      const states = orbitStateRef.current;

      for (let i = 0; i < states.length; i++) {
        const st = states[i];
        st.angle += st.angularSpeed;

        // radiusRatio is relative to half the smallest dimension
        const r  = st.radiusRatio * (dim / 2);
        const px = cx + r * Math.cos(st.angle);
        const py = cy + r * Math.sin(st.angle);

        const el = planetDomMap.current[st.id];
        if (el) {
          el.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []); // intentionally empty — reads mutable refs

  // ── Planet ref registration ───────────────────────────────────────────────
  const registerPlanetRef = useCallback((id, node) => {
    if (node) planetDomMap.current[id] = node;
    else      delete planetDomMap.current[id];
  }, []);

  const minDim   = Math.min(dims.w, dims.h);
  const orbitCfg = isMobile ? ORBITS_MOBILE : ORBITS_DESKTOP;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        minHeight: '400px',
        background:
          'radial-gradient(ellipse 80% 60% at 50% 40%, #0b1624 0%, #060c18 55%, #020508 100%)',
      }}
    >
      {/* Canvas star field — zero DOM star nodes */}
      <ParticleField isMobile={isMobile} />

      {/* Nebula gas clouds — animated, layered depth */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {/* Deep blue nebula — top left */}
        <div className="absolute rounded-full" style={{
          top: '5%', left: '6%', width: 480, height: 480,
          background: 'radial-gradient(circle, rgba(30,70,220,0.10) 0%, rgba(20,50,180,0.04) 40%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'nebulaFloat1 18s ease-in-out infinite',
        }} />
        {/* Violet nebula — bottom right */}
        <div className="absolute rounded-full" style={{
          bottom: '5%', right: '5%', width: 420, height: 420,
          background: 'radial-gradient(circle, rgba(130,40,220,0.09) 0%, rgba(90,20,180,0.03) 45%, transparent 70%)',
          filter: 'blur(55px)',
          animation: 'nebulaFloat2 22s ease-in-out infinite',
        }} />
        {/* Cyan nebula — center left */}
        <div className="absolute rounded-full" style={{
          top: '40%', left: '15%', width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(20,160,230,0.07) 0%, transparent 65%)',
          filter: 'blur(45px)',
          animation: 'nebulaFloat3 25s ease-in-out infinite',
        }} />
        {/* Rose nebula — top right */}
        <div className="absolute rounded-full" style={{
          top: '12%', right: '15%', width: 350, height: 350,
          background: 'radial-gradient(circle, rgba(200,60,120,0.06) 0%, transparent 65%)',
          filter: 'blur(50px)',
          animation: 'nebulaFloat2 20s ease-in-out infinite reverse',
        }} />
        {/* Teal nebula — bottom left */}
        <div className="absolute rounded-full" style={{
          bottom: '15%', left: '25%', width: 260, height: 260,
          background: 'radial-gradient(circle, rgba(30,200,180,0.05) 0%, transparent 65%)',
          filter: 'blur(40px)',
          animation: 'nebulaFloat1 28s ease-in-out infinite reverse',
        }} />
        {/* Indigo core haze — center */}
        <div className="absolute rounded-full" style={{
          top: '50%', left: '50%', width: 220, height: 220,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(80,120,255,0.08) 0%, rgba(40,60,180,0.03) 50%, transparent 80%)',
          filter: 'blur(30px)',
          animation: 'nebulaFloat3 15s ease-in-out infinite',
        }} />
      </div>

      {/* Orbit rings — purely decorative, updated via dims state */}
      {orbitCfg.map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  o.radiusRatio * minDim,
            height: o.radiusRatio * minDim,
            top:  '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(255,255,255,0.05)',
            zIndex: 2,
          }}
        />
      ))}

      {/* Central core */}
      <div
        className="absolute pointer-events-none"
        style={{ top: '50%', left: '50%', zIndex: 6 }}
      >
        <div style={{
          width: 12, height: 12,
          borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(160,220,255,0.95) 0%, rgba(60,130,220,0.5) 55%, transparent 100%)',
          boxShadow: '0 0 18px 5px rgba(100,190,255,0.55), 0 0 50px 14px rgba(50,110,220,0.20)',
          animation: 'corePulse 4s ease-in-out infinite',
        }} />
      </div>

      {/* Skill planets — positioned by RAF via refs, no React position state */}
      {skills?.map((skill) => (
        <SkillPlanet
          key={skill.id}
          skill={skill}
          size={getPlanetSize(skill.proficiency, isMobile)}
          isSelected={selectedSkill?.id === skill.id}
          isHovered={hoveredSkill?.id === skill.id}
          onSelect={onSkillSelect}
          onHover={onSkillHover}
          onRef={(node) => registerPlanetRef(skill.id, node)}
          isMobile={isMobile}
        />
      ))}

      {/* Tooltip */}
      {!isMobile && (
        <SkillTooltip skill={hoveredSkill} position={mousePosition} isVisible={!!hoveredSkill} />
      )}

      {/* HUD: view label */}
      <div className="absolute top-4 left-4 glass-card px-4 py-2" style={{ zIndex: 10 }}>
        <div className="text-sm font-medium text-foreground">
          {selectedView === 'all'         ? 'Complete Universe'         :
           selectedView === 'fullstack'   ? 'Full Stack Galaxy'         :
           selectedView === 'datascience' ? 'Data Science Cluster'      :
           selectedView === 'mobile'      ? 'Mobile Development System' :
           selectedView === 'devops'      ? 'DevOps Pipeline'           : 'Skills Observatory'}
        </div>
        <div className="text-xs text-muted-foreground">
          {skills?.length} skills · Click to explore
        </div>
      </div>

      {/* HUD: hint */}
      {!isMobile && (
        <div className="absolute bottom-4 right-4 glass-card px-4 py-2 text-xs text-muted-foreground" style={{ zIndex: 10 }}>
          🖥️ Hover to explore · Click for details
        </div>
      )}

      {/* Global keyframes */}
      <style>{`
        @keyframes corePulse {
          0%, 100% { opacity: 0.80; transform: translate(-50%,-50%) scale(1);    }
          50%       { opacity: 1.00; transform: translate(-50%,-50%) scale(1.30); }
        }
        @keyframes satOrbit {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulsRing {
          0%        { transform: scale(1);    opacity: 0.55; }
          100%      { transform: scale(1.55); opacity: 0;    }
        }
        @keyframes nebulaFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1);     }
          50%      { transform: translate(15px, -10px) scale(1.08); }
        }
        @keyframes nebulaFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1);      }
          50%      { transform: translate(-12px, 8px) scale(1.06); }
        }
        @keyframes nebulaFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1);       }
          33%      { transform: translate(8px, 12px) scale(1.04);  }
          66%      { transform: translate(-6px, -8px) scale(0.97); }
        }
      `}
      </style>
    </div>
  );
};

export default SkillUniverse;