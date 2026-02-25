
import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { themeAtom, themeTransitionAtom } from '../../store/atoms';

const CELL_SIZE = 5; // Fine-grained pixels
const SPEED_MULTIPLIER = 2.0; // Faster expansion for smaller pixels

const ThemeTransitionOverlay: React.FC = () => {
  const [transitionState, setTransitionState] = useAtom(themeTransitionAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);

  // Keep DOM class in sync with the atom value.
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (!transitionState.isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Handle HiDPI displays for crisp pixels
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const cols = Math.ceil(width / CELL_SIZE);
    const rows = Math.ceil(height / CELL_SIZE);
    const maxDist = Math.hypot(width, height);

    // Calculated "Difference" color between Dark (#050608) and Light (#F5EFE4) themes.
    // This specific hex ensures that:
    // Dark + Mask = Light
    // Light + Mask = Dark
    // providing a seamless visual transition during the wave.
    const maskColor = '#F0E9DC'; 

    // Generate noise map once
    const noiseMap = new Float32Array(cols * rows);
    for (let i = 0; i < noiseMap.length; i++) {
      noiseMap[i] = Math.random();
    }

    const animate = (time: number) => {
      if (startTimeRef.current === undefined) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      
      // Radius expands based on time
      const radius = (elapsed * 1.5 * SPEED_MULTIPLIER); 
      const radiusSq = radius * radius;
      
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = maskColor;

      // Optimization: Calculate bounds to avoid iterating pixels far from the wave
      // This is crucial for 5px cells (approx 80k items on 1080p)
      const buffer = 400; // Scatter buffer
      const minX = Math.max(0, Math.floor((transitionState.origin.x - radius - buffer) / CELL_SIZE));
      const maxX = Math.min(cols, Math.ceil((transitionState.origin.x + radius + buffer) / CELL_SIZE));
      const minY = Math.max(0, Math.floor((transitionState.origin.y - radius - buffer) / CELL_SIZE));
      const maxY = Math.min(rows, Math.ceil((transitionState.origin.y + radius + buffer) / CELL_SIZE));

      for (let i = minX; i < maxX; i++) {
        const x = i * CELL_SIZE;
        const dx = x - transitionState.origin.x;
        const dx2 = dx * dx;

        for (let j = minY; j < maxY; j++) {
          const y = j * CELL_SIZE;
          const dy = y - transitionState.origin.y;
          const distSq = dx2 + dy * dy;

          const noise = noiseMap[i + j * cols];
          // Scatter effect logic
          const scatter = 300 * noise; 
          const threshold = radius - scatter;
          const thresholdSq = threshold * threshold;
          
          // Using squared distance checks for performance
          if (distSq < thresholdSq) {
             ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
          } else if (distSq < radiusSq && noise > 0.85) {
             // Leading edge particles
             ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
          }
        }
      }

      // Check for completion
      if (radius > maxDist + 400) {
        setTheme(transitionState.type);
        setTransitionState(prev => ({ ...prev, isActive: false }));
        ctx.clearRect(0, 0, width, height);
      } else {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      startTimeRef.current = undefined;
    };
  }, [transitionState.isActive, transitionState.type, transitionState.origin, setTransitionState, setTheme]);

  if (!transitionState.isActive) return null;

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ 
        // Difference blend mode performs the color inversion math live
        mixBlendMode: 'difference' 
      }}
    />
  );
};

export default ThemeTransitionOverlay;
