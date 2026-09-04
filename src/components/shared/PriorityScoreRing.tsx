import { useEffect, useRef, useState } from 'react';

interface PriorityScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export default function PriorityScoreRing({ score, size = 120, strokeWidth = 10, showLabel = true }: PriorityScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const ref = useRef<SVGSVGElement>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedScore / 100) * circumference;

  const getColor = () => {
    if (score >= 85) return '#ef4444';
    if (score >= 65) return '#f97316';
    if (score >= 40) return '#eab308';
    return '#22c55e';
  };

  const getLabel = () => {
    if (score >= 85) return 'CRITICAL';
    if (score >= 65) return 'HIGH';
    if (score >= 40) return 'MEDIUM';
    return 'LOW';
  };

  useEffect(() => {
    let frame: number;
    const duration = 1200;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setAnimatedScore(Math.round(eased * score));
      if (pct < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  return (
    <div className="flex flex-col items-center gap-2">
      <svg ref={ref} width={size} height={size} className="priority-ring">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          style={{ transition: 'stroke-dashoffset 0.1s ease' }}
        />
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-current text-gray-900 dark:text-white"
          style={{
            fontSize: size * 0.25,
            fontWeight: 700,
            transform: 'rotate(90deg)',
            transformOrigin: 'center',
          }}
        >
          {animatedScore}
        </text>
      </svg>
      {showLabel && (
        <div className="text-center">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{
              backgroundColor: getColor() + '20',
              color: getColor(),
            }}
          >
            {getLabel()}
          </span>
        </div>
      )}
    </div>
  );
}
