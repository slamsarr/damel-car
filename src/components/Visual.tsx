import Image from "next/image";
import { Icon } from "./Icon";

/**
 * Affiche une photo si un chemin est fourni (config/site.ts → photos),
 * sinon un visuel graphique de marque, sans faux contenu photographique.
 */
export function Photo({
  src,
  alt,
  icon = "Sparkles",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
  caption = true,
}: {
  src?: string;
  alt: string;
  icon?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  caption?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      ) : (
        <div role="img" aria-label={alt} className="absolute inset-0 bg-ink-700">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_0%,rgba(124,79,179,.55),transparent_60%),radial-gradient(90%_70%_at_100%_100%,rgba(75,31,122,.7),transparent_65%)]" />
          <div className="absolute -left-1/4 top-1/2 h-px w-[150%] -rotate-[14deg] bg-gradient-to-r from-transparent via-lime/70 to-transparent" />
          <div className="absolute -left-1/4 top-[58%] h-px w-[150%] -rotate-[14deg] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <Bubbles />
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-white/[.06] backdrop-blur">
              <Icon name={icon} className="h-7 w-7 text-lime" />
            </span>
          </div>
          {caption && (
            <span className="absolute bottom-3 left-4 right-4 text-[12px] font-semibold text-white/70">{alt}</span>
          )}
        </div>
      )}
    </div>
  );
}

function Bubbles() {
  const b = [
    [12, 22, 10], [24, 70, 6], [78, 18, 8], [86, 64, 12], [60, 84, 5], [40, 30, 4], [70, 40, 3],
  ];
  return (
    <>
      {b.map(([x, y, s], i) => (
        <span
          key={i}
          className="absolute rounded-full border border-white/25 bg-white/[.04]"
          style={{ left: `${x}%`, top: `${y}%`, width: s * 2, height: s * 2 }}
        />
      ))}
    </>
  );
}

/** Illustration de héros : silhouette de berline stylisée sous la mousse. */
export function HeroCar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 820 320" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a1a44" />
          <stop offset=".55" stopColor="#150b25" />
          <stop offset="1" stopColor="#0a0b0f" />
        </linearGradient>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B6F000" stopOpacity="0" />
          <stop offset=".35" stopColor="#B6F000" />
          <stop offset=".8" stopColor="#C9B1E3" stopOpacity=".7" />
          <stop offset="1" stopColor="#C9B1E3" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7C4FB3" stopOpacity=".55" />
          <stop offset="1" stopColor="#111318" stopOpacity=".9" />
        </linearGradient>
        <radialGradient id="floor" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#7C4FB3" stopOpacity=".55" />
          <stop offset="1" stopColor="#7C4FB3" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="410" cy="268" rx="390" ry="34" fill="url(#floor)" />
      <path
        d="M40 214c0-20 20-30 50-34l112-12c42-36 104-66 182-70h138c60 2 112 34 152 64l66 12c25 4 36 18 36 34v16c0 6-5 10-11 10h-58a64 64 0 0 0-128 0H276a64 64 0 0 0-128 0H54c-8 0-14-6-14-13v-7z"
        fill="url(#body)"
        stroke="rgba(255,255,255,.14)"
      />
      <path d="M210 168c48-38 104-62 176-64h138c58 2 104 30 146 62" stroke="url(#edge)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M244 166c34-30 76-50 138-52h86l10 52z" fill="url(#glass)" />
      <path d="M494 114h24c52 2 92 26 124 52H502z" fill="url(#glass)" />
      <path d="M90 196h680" stroke="rgba(255,255,255,.08)" />
      {[212, 642].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="240" r="52" fill="#07080b" stroke="rgba(255,255,255,.18)" />
          <circle cx={cx} cy="240" r="34" fill="#111318" stroke="#B6F000" strokeOpacity=".7" strokeWidth="2" />
          <circle cx={cx} cy="240" r="9" fill="#C9B1E3" fillOpacity=".7" />
          {[0, 72, 144, 216, 288].map((a) => (
            <line
              key={a}
              x1={cx}
              y1="240"
              x2={cx + 30 * Math.cos((a * Math.PI) / 180)}
              y2={240 + 30 * Math.sin((a * Math.PI) / 180)}
              stroke="rgba(255,255,255,.28)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
        </g>
      ))}
      <path d="M752 186l18 3" stroke="#B6F000" strokeWidth="4" strokeLinecap="round" />
      {/* mousse */}
      {[
        [260, 98, 16], [300, 82, 10], [330, 94, 7], [520, 88, 12], [560, 100, 8], [600, 112, 14],
        [150, 160, 9], [700, 150, 11], [420, 80, 6], [460, 70, 9],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.4)" />
      ))}
    </svg>
  );
}
