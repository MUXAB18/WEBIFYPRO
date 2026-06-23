import { useEffect, useRef } from 'react';

/**
 * CursorTrail — A canvas-based glowing particle trail that follows the cursor.
 * Uses requestAnimationFrame for smooth 60fps rendering.
 * Color shifts between brand palette colors over time.
 */
const CursorTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let mouse = { x: -200, y: -200 };
    const particles = [];

    const COLORS = ['#6366f1', '#00d4ff', '#a855f7', '#06ffa5', '#ff006e'];
    let colorIndex = 0;
    let colorTimer = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      const y = e.clientY ?? e.touches?.[0]?.clientY;
      if (x != null) mouse = { x, y };
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });

    class Particle {
      constructor(x, y, color) {
        this.x = x + (Math.random() - 0.5) * 8;
        this.y = y + (Math.random() - 0.5) * 8;
        this.color = color;
        this.size = Math.random() * 3.5 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5 - 0.5;
        this.life = 1;
        this.decay = Math.random() * 0.03 + 0.015;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY -= 0.04; // gentle float upward
        this.life -= this.decay;
        this.size *= 0.97;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life * 0.7);
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0, this.size), 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.size * 4;
        ctx.fill();
        ctx.restore();
      }
    }

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cycle through colors
      colorTimer++;
      if (colorTimer > 40) {
        colorTimer = 0;
        colorIndex = (colorIndex + 1) % COLORS.length;
      }

      // Spawn particles
      if (mouse.x > 0) {
        for (let i = 0; i < 2; i++) {
          particles.push(new Particle(mouse.x, mouse.y, COLORS[colorIndex]));
        }
      }

      // Update + draw
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9998,
      }}
      aria-hidden="true"
    />
  );
};

export default CursorTrail;
