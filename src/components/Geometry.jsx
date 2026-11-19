export function PrismMark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <path d="M40 6 54 20 40 34 26 20 40 6ZM74 40 60 54 46 40 60 26 74 40ZM40 74 26 60 40 46 54 60 40 74ZM6 40 20 26 34 40 20 54 6 40Z" fill="currentColor" />
      <path d="m40 25 15 15-15 15-15-15 15-15Z" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function GoldMesh({ id, className = "" }) {
  return (
    <svg className={className} viewBox="0 0 640 640" fill="none" aria-hidden="true">
      <defs><linearGradient id={id} x1="50" y1="600" x2="570" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#917140" stopOpacity=".15" /><stop offset=".32" stopColor="#d0ae70" /><stop offset=".52" stopColor="#f5dda9" /><stop offset=".75" stopColor="#bd995e" /><stop offset="1" stopColor="#c5a56c" stopOpacity=".1" /></linearGradient></defs>
      <g stroke={"url(#" + id + ")"} strokeWidth=".8">
        {Array.from({ length: 34 }, (_, index) => <path key={index} d={"M" + (-210 + index * 14) + " 690C" + (75 + index * 12) + " 510 " + (400 + index * 9) + " 490 " + (250 + index * 11) + " 250S" + (220 + index * 12) + " 40 " + (390 + index * 9) + " -60"} />)}
        <g opacity=".3">{Array.from({ length: 24 }, (_, index) => <path key={index} d={"M-40 " + (160 + index * 21) + " 690 " + (-80 + index * 21)} />)}</g>
      </g>
    </svg>
  );
}

export function InlayCorner({ className = "" }) {
  return <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true"><path d="M3 77V23L23 3H77M11 77V27L27 11H77M19 77V31L31 19H77" stroke="currentColor" strokeWidth=".8" /><path d="m3 23 20-20M11 27l16-16M19 31l12-12" stroke="currentColor" strokeWidth="2" /></svg>;
}
