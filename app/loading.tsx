export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#0f0f1e' }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated Pokéball */}
        <div className="relative w-20 h-20 animate-bounce">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="#E53935" stroke="#0f0f1e" strokeWidth="4" />
            <path
              d="M2 50 Q2 22 22 10 Q38 2 50 2 L50 98 Q22 98 6 80 Q2 70 2 50Z"
              fill="#B71C1C"
            />
            <rect x="2" y="46" width="96" height="8" fill="#0f0f1e" />
            <circle cx="50" cy="50" r="14" fill="#0f0f1e" />
            <circle cx="50" cy="50" r="9" fill="white" />
            <circle
              cx="50"
              cy="50"
              r="5"
              fill="#E0E0E0"
              style={{ animation: 'pulse 1s infinite' }}
            />
          </svg>
        </div>
        <p
          className="text-white/40 text-sm tracking-widest uppercase font-mono"
          style={{ animation: 'pulse 1.5s infinite' }}
        >
          Loading…
        </p>
      </div>
    </div>
  );
}
