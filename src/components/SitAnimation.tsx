/**
 * SitAnimation — minimalist looping SVG animation of a dog sitting down.
 * Pure CSS + SVG. No props, no deps. 200x200, transparent background.
 */
export function SitAnimation() {
  return (
    <div
      style={{ width: 200, height: 200 }}
      className="relative inline-block"
      aria-label="Dog performing sit command"
      role="img"
    >
      <style>{`
        @keyframes sit-rear {
          0%, 15%   { transform: translateY(0) rotate(0deg); }
          45%, 75%  { transform: translateY(14px) rotate(-6deg); }
          100%      { transform: translateY(0) rotate(0deg); }
        }
        @keyframes sit-head {
          0%, 15%   { transform: translate(0, 0) rotate(0deg); }
          45%, 75%  { transform: translate(-2px, 4px) rotate(4deg); }
          100%     { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes sit-tail {
          0%, 100% { transform: rotate(-8deg); }
          50%      { transform: rotate(14deg); }
        }
        @keyframes sit-bounce {
          0%, 15%, 100% { transform: translateY(0); }
          45%, 75%      { transform: translateY(2px); }
        }
        .sit-anim       { animation: sit-bounce 3s ease-in-out infinite; transform-origin: center bottom; }
        .sit-anim-rear  { animation: sit-rear   3s ease-in-out infinite; transform-origin: 138px 110px; transform-box: fill-box; }
        .sit-anim-head  { animation: sit-head   3s ease-in-out infinite; transform-origin: 70px 80px; transform-box: fill-box; }
        .sit-anim-tail  { animation: sit-tail   0.9s ease-in-out infinite; transform-origin: 158px 100px; transform-box: fill-box; }
      `}</style>

      <svg
        viewBox="0 0 200 200"
        width="200"
        height="200"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Ground line (accent) */}
        <line x1="20" y1="170" x2="180" y2="170" stroke="#F97316" strokeWidth="4" opacity="0.9" />

        <g className="sit-anim">
          {/* Rear legs + hindquarters group — drops down to sit */}
          <g className="sit-anim-rear">
            {/* Hindquarter */}
            <path d="M120 110 Q150 95 158 125 Q160 150 140 155" fill="#F97316" stroke="#1a1a1a" />
            {/* Rear leg */}
            <path d="M140 150 L140 168" />
            {/* Tail */}
            <g className="sit-anim-tail">
              <path d="M158 110 Q175 95 172 80" />
            </g>
          </g>

          {/* Body */}
          <path d="M70 100 Q100 88 138 100 L138 130 Q100 138 70 130 Z" fill="#F97316" stroke="#1a1a1a" />

          {/* Front legs (stay planted) */}
          <path d="M82 130 L82 168" />
          <path d="M100 130 L100 168" />

          {/* Head + neck — slight tilt as dog sits */}
          <g className="sit-anim-head">
            {/* Neck */}
            <path d="M78 102 L62 80" />
            {/* Head */}
            <circle cx="55" cy="72" r="20" fill="#F97316" stroke="#1a1a1a" />
            {/* Snout */}
            <path d="M40 78 Q30 80 32 70 Q36 66 44 68" fill="#F97316" stroke="#1a1a1a" />
            {/* Ear */}
            <path d="M62 56 Q70 48 74 62 Z" fill="#1a1a1a" />
            {/* Eye */}
            <circle cx="52" cy="70" r="2.5" fill="#1a1a1a" stroke="none" />
            {/* Nose */}
            <circle cx="33" cy="73" r="2.5" fill="#1a1a1a" stroke="none" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default SitAnimation;
