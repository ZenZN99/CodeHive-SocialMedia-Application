"use client";
import React, { useEffect, useRef } from "react";

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    class Point {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      hue: number;

      constructor() {
        this.x = Math.random() * canvas!.width - canvas!.width / 2;
        this.y = Math.random() * canvas!.height - canvas!.height / 2;
        this.z = Math.random() * 600 - 300;
        this.vx = Math.random() * 0.5 - 0.25;
        this.vy = Math.random() * 0.5 - 0.25;
        this.vz = Math.random() * 0.5 - 0.25;
        this.size = Math.random() * 3 + 1;
        this.hue = Math.random() * 360;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        if (this.x > canvas!.width / 2) this.x = -canvas!.width / 2;
        if (this.x < -canvas!.width / 2) this.x = canvas!.width / 2;
        if (this.y > canvas!.height / 2) this.y = -canvas!.height / 2;
        if (this.y < -canvas!.height / 2) this.y = canvas!.height / 2;
        if (this.z > 300) this.z = -300;
        if (this.z < -300) this.z = 300;

        this.hue += 0.3;
        if (this.hue > 360) this.hue = 0;
      }

      draw() {
        const scale = 600 / (600 + this.z);
        const px = this.x * scale + canvas!.width / 2;
        const py = this.y * scale + canvas!.height / 2;
        const size = this.size * scale;

        ctx!.beginPath();
        ctx!.arc(px, py, size, 0, Math.PI * 2);
        ctx!.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
        ctx!.shadowBlur = 12;
        ctx!.shadowColor = `hsl(${this.hue}, 100%, 70%)`;
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
    }

    const points: Point[] = [];
    const numPoints = Math.floor((canvas.width * canvas.height) / 10000);
    for (let i = 0; i < numPoints; i++) {
      points.push(new Point());
    }

    const connectPoints = () => {
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dz = points[i].z - points[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 120) {
            const alpha = 0.15 * (1 - dist / 120);
            const midHue = (points[i].hue + points[j].hue) / 2;
            ctx.strokeStyle = `hsla(${midHue}, 100%, 60%, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            const scale1 = 600 / (600 + points[i].z);
            const scale2 = 600 / (600 + points[j].z);
            ctx.moveTo(points[i].x * scale1 + canvas.width / 2, points[i].y * scale1 + canvas.height / 2);
            ctx.lineTo(points[j].x * scale2 + canvas.width / 2, points[j].y * scale2 + canvas.height / 2);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      const time = Date.now() * 0.0002;
      const gradient = ctx.createLinearGradient(
        0, 0, canvas.width, canvas.height
      );
      gradient.addColorStop(0, `hsl(${time * 360}, 30%, 5%)`);
      gradient.addColorStop(1, `hsl(${(time * 360 + 60) % 360}, 50%, 10%)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      points.forEach((p) => {
        p.update();
        p.draw();
      });

      connectPoints();
      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", setCanvasSize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default BackgroundAnimation;




/*
import React, { useEffect, useRef } from "react";

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 0.7 - 0.35;
        this.speedY = Math.random() * 0.7 - 0.35;
        const alpha = Math.random() * 0.6 + 0.2;
        this.color = `rgba(224, 35, 78, ${alpha})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;

        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        ctx!.shadowBlur = 8;
        ctx!.shadowColor = "#E0234E";
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
    }

    const particlesArray: Particle[] = [];
    const numberOfParticles = Math.min(
      150,
      Math.floor((canvas.width * canvas.height) / 8000)
    );

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }

    const connectParticles = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 140) {
            ctx!.strokeStyle = `rgba(224, 35, 78, ${
              0.15 * (1 - distance / 140)
            })`;
            ctx!.lineWidth = 0.7;
            ctx!.beginPath();
            ctx!.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx!.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx!.stroke();
          }
        }
      }
    };

    const animate = () => {
      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(0,0,0,0.65)");
      gradient.addColorStop(1, "rgba(10,10,10,0.8)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesArray.forEach((p) => {
        p.update();
        p.draw();
      });

      connectParticles();

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", setCanvasDimensions);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default BackgroundAnimation;

*/