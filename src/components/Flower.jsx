export default function Flower({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => <path key={angle} d="M50 47C29 31 40 8 50 5C60 8 71 31 50 47Z" transform={`rotate(${angle} 50 50)`} stroke="currentColor" strokeWidth="1.1" />)}
      <circle cx="50" cy="50" r="5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="1.7" fill="currentColor" />
    </svg>
  );
}
