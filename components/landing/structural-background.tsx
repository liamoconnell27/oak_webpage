"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
}

export function StructuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const nodesRef = useRef<Node[]>([]);
  const membersRef = useRef<[number, number][]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const spacingX = 85;
      const spacingY = 85;
      const cols = Math.ceil(canvas.width / spacingX) + 2;
      const rows = Math.ceil(canvas.height / spacingY) + 2;
      const offsetX = -spacingX / 2;
      const offsetY = -spacingY / 2;

      const nodes: Node[] = [];
      const members: [number, number][] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * spacingX;
          const y = offsetY + r * spacingY;
          nodes.push({ x, y, baseX: x, baseY: y, vx: 0, vy: 0 });
        }
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          if (c < cols - 1) members.push([idx, idx + 1]);
          if (r < rows - 1) members.push([idx, idx + cols]);
          // W-truss diagonal pattern
          if (c < cols - 1 && r < rows - 1) {
            if ((r + c) % 2 === 0) {
              members.push([idx, idx + cols + 1]);
            } else {
              members.push([idx + 1, idx + cols]);
            }
          }
        }
      }

      nodesRef.current = nodes;
      membersRef.current = members;
    };

    const k = 0.035;
    const damping = 0.86;
    const mouseRadius = 160;
    const mouseStrength = 2.8;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.006;
      const t = timeRef.current;

      const nodes = nodesRef.current;
      const members = membersRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.vx += (node.baseX - node.x) * k;
        node.vy += (node.baseY - node.y) * k;

        // Gentle ambient wave
        const wave = Math.sin(t * 0.7 + node.baseX * 0.018 + node.baseY * 0.012) * 0.25;
        node.vy += wave * 0.015;

        const mdx = node.x - mouse.x;
        const mdy = node.y - mouse.y;
        const dist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (dist < mouseRadius && dist > 1) {
          const force = ((mouseRadius - dist) / mouseRadius) ** 2 * mouseStrength;
          node.vx += (mdx / dist) * force;
          node.vy += (mdy / dist) * force;
        }

        node.vx *= damping;
        node.vy *= damping;
        node.x += node.vx;
        node.y += node.vy;
      }

      // Draw members with stress-based brightness
      for (const [ai, bi] of members) {
        const a = nodes[ai];
        const b = nodes[bi];

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const restDx = b.baseX - a.baseX;
        const restDy = b.baseY - a.baseY;
        const restLen = Math.sqrt(restDx * restDx + restDy * restDy);
        const curLen = Math.sqrt(dx * dx + dy * dy);
        const strain = restLen > 0 ? Math.abs(curLen - restLen) / restLen : 0;
        const alpha = Math.min(0.07 + strain * 3, 0.4);

        ctx.strokeStyle = `rgba(190, 210, 230, ${alpha})`;
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Draw nodes
      for (const node of nodes) {
        const mdx = node.x - mouse.x;
        const mdy = node.y - mouse.y;
        const dist = Math.sqrt(mdx * mdx + mdy * mdy);
        const proximity = dist < mouseRadius ? (1 - dist / mouseRadius) : 0;

        ctx.globalAlpha = 0.18 + proximity * 0.55;
        ctx.fillStyle = "rgba(190, 210, 230, 1)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.6 + proximity * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animRef.current = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
