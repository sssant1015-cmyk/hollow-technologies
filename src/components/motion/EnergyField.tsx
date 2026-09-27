import { useEffect, useRef } from 'react';

interface Node {
  x: number; y: number; vx: number; vy: number; r: number; hue: 0 | 1;
}

/**
 * Signal Weave — the Hollow energy field.
 * A drifting node-web where lines brighten near the cursor, nodes
 * react to pointer proximity, and everything runs GPU-cheap
 * (transform-free 2D canvas, single rAF, caps its own node count).
 * Honors prefers-reduced-motion by rendering one static frame.
 */
export function EnergyField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const pointer = { x: -9999, y: -9999 };
    let nodes: Node[] = [];

    const accent = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#a273ff';
    const signal = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--signal').trim() || '#58c4dd';

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // scale node count with area, capped for perf
      const target = Math.min(90, Math.max(34, Math.round((w * h) / 22000)));
      nodes = Array.from({ length: target }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 1 + Math.random() * 1.6,
        hue: i % 5 === 0 ? 1 : 0,
      }));
    };

    const LINK = 130; // max link distance
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const a = accent();
      const s = signal();

      // links
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]!;
          const dx = n1.x - n2.x, dy = n1.y - n2.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const d = Math.sqrt(d2);
          // cursor proximity brightens the local mesh
          const mx = (n1.x + n2.x) / 2 - pointer.x;
          const my = (n1.y + n2.y) / 2 - pointer.y;
          const md = Math.sqrt(mx * mx + my * my);
          const boost = Math.max(0, 1 - md / 220);
          const alpha = (1 - d / LINK) * (0.1 + boost * 0.5);
          ctx.strokeStyle = boost > 0.35 ? a : s;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = boost > 0.6 ? 1.1 : 0.6;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }

      // nodes
      for (const n of nodes) {
        const dx = n.x - pointer.x, dy = n.y - pointer.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const near = Math.max(0, 1 - d / 180);
        const radius = n.r + near * 1.8;
        ctx.globalAlpha = 0.35 + near * 0.65;
        ctx.fillStyle = n.hue ? s : a;
        // gentle pulse
        const pulse = 0.85 + 0.15 * Math.sin(t / 900 + n.x);
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius * pulse, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = (t: number) => {
      // drift
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        // soft cursor repulsion — energy that politely gets out of the way
        const dx = n.x - pointer.x, dy = n.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 130 * 130 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = ((130 - d) / 130) * 0.35;
          n.x += (dx / d) * f;
          n.y += (dy / d) * f;
        }
        if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
      }
      draw(t);
      raf = requestAnimationFrame(step);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => { pointer.x = -9999; pointer.y = -9999; };

    resize();
    if (reduced) {
      draw(0); // single calm frame
    } else {
      raf = requestAnimationFrame(step);
      window.addEventListener('pointermove', onPointer, { passive: true });
      window.addEventListener('pointerleave', onLeave);
    }
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
