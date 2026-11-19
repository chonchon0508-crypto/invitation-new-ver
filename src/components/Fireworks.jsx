import { useEffect, useRef } from "react";

const colors = ["255,215,145", "255,242,207", "113,211,255", "187,163,255", "255,153,192"];

export default function Fireworks({ opened }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext("2d");
    if (!context) return undefined;
    let width;
    let height;
    let frame;
    let lastTime = 0;
    let startTime = 0;
    let particles = [];
    let rockets = [];
    const positions = opened
      ? [[0.15, 0.3, 0], [0.82, 0.23, 180], [0.38, 0.17, 450], [0.68, 0.42, 760], [0.12, 0.55, 1060], [0.9, 0.5, 1350], [0.5, 0.12, 1750]]
      : [[0.16, 0.3, 150], [0.84, 0.25, 650], [0.7, 0.55, 1150]];
    let pending = positions.map((position, index) => ({ x: position[0], y: position[1], at: position[2], color: colors[index % colors.length] }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const burst = (rocket, elapsed) => {
      const count = width < 600 ? 55 : 85;
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.12;
        const speed = (Math.random() * 3 + 1.3) * (width < 600 ? 0.75 : 1);
        particles.push({ x: rocket.x, y: rocket.y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, bornAt: elapsed, life: 1400 + Math.random() * 900, color: i % 5 === 0 ? colors[1] : rocket.color, trail: [] });
      }
    };

    const render = timestamp => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const delta = Math.min((timestamp - (lastTime || timestamp)) / 16.67, 6);
      lastTime = timestamp;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      pending = pending.filter(item => {
        if (elapsed < item.at) return true;
        rockets.push({ x: width * item.x, y: height + 5, targetY: height * item.y, launchedAt: item.at, color: item.color });
        return false;
      });

      rockets = rockets.filter(rocket => {
        const previousY = rocket.y;
        const progress = Math.min((elapsed - rocket.launchedAt) / 600, 1);
        rocket.y = height + 5 + (rocket.targetY - height - 5) * progress;
        context.beginPath();
        context.moveTo(rocket.x, previousY + 24);
        context.lineTo(rocket.x, rocket.y);
        context.strokeStyle = `rgba(${rocket.color},0.65)`;
        context.lineWidth = 1.4;
        context.stroke();
        if (progress >= 1) { burst(rocket, elapsed); return false; }
        return true;
      });

      particles = particles.filter(particle => {
        const age = elapsed - particle.bornAt;
        if (age > particle.life) return false;
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > 5) particle.trail.shift();
        particle.vx *= Math.pow(0.984, delta);
        particle.vy = particle.vy * Math.pow(0.984, delta) + 0.028 * delta;
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        const opacity = Math.pow(1 - age / particle.life, 1.3);
        context.beginPath();
        context.moveTo(particle.trail[0].x, particle.trail[0].y);
        context.lineTo(particle.x, particle.y);
        context.strokeStyle = `rgba(${particle.color},${opacity * 0.65})`;
        context.lineWidth = 1;
        context.stroke();
        context.beginPath();
        context.arc(particle.x, particle.y, 1.3, 0, Math.PI * 2);
        context.fillStyle = `rgba(${particle.color},${opacity})`;
        context.fill();
        return true;
      });

      if (pending.length || rockets.length || particles.length) frame = window.requestAnimationFrame(render);
      else context.clearRect(0, 0, width, height);
    };

    resize();
    frame = window.requestAnimationFrame(render);
    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      context.clearRect(0, 0, width, height);
    };
  }, [opened]);

  return <canvas className="fireworks" ref={canvasRef} aria-hidden="true" />;
}
