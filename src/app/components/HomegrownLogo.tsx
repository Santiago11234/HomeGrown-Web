interface HomegrownLogoProps {
  width?: number;
  className?: string;
  color?: string;
}

export default function HomegrownLogo({
  width = 160,
  className = '',
  color = '#244b27',
}: HomegrownLogoProps) {
  const iconH = Math.round(width * 0.185);
  const iconW = Math.round(iconH * 0.7);

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: Math.round(width * 0.045) + 'px' }}
    >
      <svg
        width={iconW}
        height={iconH}
        viewBox="4 6 20 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M14 32 C14 32 14 22 14 18"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14 22 C14 22 8 20 7 14 C7 14 13 12 16 18"
          fill={color}
          opacity="0.85"
        />
        <path
          d="M14 18 C14 18 18 15 20 9 C20 9 14 8 12 14"
          fill={color}
        />
      </svg>
      <span
        style={{
          fontFamily: 'var(--font-poppins), Poppins, sans-serif',
          fontWeight: 800,
          fontSize: Math.round(width * 0.1125) + 'px',
          color,
          letterSpacing: '-0.3px',
          lineHeight: 1,
        }}
      >
        HomeGrown
      </span>
    </span>
  );
}
