const items = [
  // Growth charts
  { svg: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="4,40 16,28 24,34 44,8" />
      <polyline points="34,8 44,8 44,18" />
    </svg>
  ), size: 48, x: "8%", y: "12%", delay: 0, duration: 28, drift: "drift-1" },
  { svg: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="4,40 16,28 24,34 44,8" />
      <polyline points="34,8 44,8 44,18" />
    </svg>
  ), size: 36, x: "78%", y: "65%", delay: 8, duration: 32, drift: "drift-2" },
  // Clocks
  { svg: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="24" cy="24" r="20" />
      <polyline points="24,12 24,24 34,28" />
    </svg>
  ), size: 42, x: "85%", y: "15%", delay: 4, duration: 30, drift: "drift-3" },
  { svg: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="24" cy="24" r="20" />
      <polyline points="24,12 24,24 34,28" />
    </svg>
  ), size: 32, x: "15%", y: "72%", delay: 12, duration: 26, drift: "drift-1" },
  // Targets
  { svg: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="24" cy="24" r="20" />
      <circle cx="24" cy="24" r="13" />
      <circle cx="24" cy="24" r="6" />
    </svg>
  ), size: 44, x: "45%", y: "8%", delay: 6, duration: 34, drift: "drift-2" },
  { svg: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="24" cy="24" r="20" />
      <circle cx="24" cy="24" r="13" />
      <circle cx="24" cy="24" r="6" />
    </svg>
  ), size: 30, x: "92%", y: "45%", delay: 15, duration: 29, drift: "drift-3" },
  // Bar charts
  { svg: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="28" width="8" height="16" rx="1" />
      <rect x="20" y="18" width="8" height="26" rx="1" />
      <rect x="34" y="8" width="8" height="36" rx="1" />
    </svg>
  ), size: 40, x: "25%", y: "85%", delay: 3, duration: 31, drift: "drift-1" },
  { svg: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="28" width="8" height="16" rx="1" />
      <rect x="20" y="18" width="8" height="26" rx="1" />
      <rect x="34" y="8" width="8" height="36" rx="1" />
    </svg>
  ), size: 34, x: "62%", y: "30%", delay: 10, duration: 27, drift: "drift-2" },
  // Metrics / percentages
  { svg: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <text x="6" y="34" fontSize="28" fill="currentColor" stroke="none" fontWeight="bold">%</text>
    </svg>
  ), size: 28, x: "35%", y: "55%", delay: 7, duration: 33, drift: "drift-3" },
  { svg: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <text x="6" y="34" fontSize="28" fill="currentColor" stroke="none" fontWeight="bold">%</text>
    </svg>
  ), size: 24, x: "70%", y: "80%", delay: 14, duration: 25, drift: "drift-1" },
  // Pie chart
  { svg: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="24" cy="24" r="20" />
      <path d="M24 4 L24 24 L44 24" />
    </svg>
  ), size: 38, x: "5%", y: "42%", delay: 9, duration: 35, drift: "drift-2" },
  // Arrow up
  { svg: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="24" y1="42" x2="24" y2="8" />
      <polyline points="14,18 24,8 34,18" />
    </svg>
  ), size: 30, x: "55%", y: "90%", delay: 11, duration: 28, drift: "drift-3" },
  // Magnifying glass
  { svg: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="20" cy="20" r="14" />
      <line x1="30" y1="30" x2="42" y2="42" />
    </svg>
  ), size: 32, x: "50%", y: "40%", delay: 5, duration: 30, drift: "drift-1" },
  // Dollar sign
  { svg: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <text x="12" y="38" fontSize="34" fill="currentColor" stroke="none" fontWeight="bold">$</text>
    </svg>
  ), size: 26, x: "88%", y: "88%", delay: 13, duration: 26, drift: "drift-2" },
  // Lightning bolt
  { svg: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="28,4 12,28 24,28 20,44 36,20 24,20" />
    </svg>
  ), size: 34, x: "3%", y: "90%", delay: 2, duration: 32, drift: "drift-3" },
];

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient orbs */}
      <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-primary/[.04] blur-[120px] animate-float" />
      <div className="absolute top-[50%] right-[5%] w-[400px] h-[400px] rounded-full bg-primary/[.03] blur-[100px] animate-float-delayed" />
      <div className="absolute bottom-[10%] left-[30%] w-[350px] h-[350px] rounded-full bg-primary/[.025] blur-[90px] animate-float" />

      {/* Floating marketing icons */}
      {items.map((item, i) => (
        <div
          key={i}
          className={`absolute text-primary/[.06] animate-${item.drift}`}
          style={{
            left: item.x,
            top: item.y,
            width: item.size,
            height: item.size,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.svg}
        </div>
      ))}
    </div>
  );
}
