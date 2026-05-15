interface SchoolBuildingProps {
  className?: string;
  asBackground?: boolean;
  buildingOnly?: boolean;
}

export default function SchoolBuilding({ className, asBackground, buildingOnly }: SchoolBuildingProps) {
  return (
    <svg
      viewBox={buildingOnly ? '195 95 415 285' : '0 0 800 520'}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio={asBackground ? 'xMidYMid slice' : 'xMidYMid meet'}
      style={asBackground ? { width: '100%', height: '100%', display: 'block' } : undefined}
    >
      {/* === BUILDING === */}
      {/* Body */}
      <rect x="230" y="190" width="340" height="175" fill="#E8C97C" />

      {/* Side pilasters */}
      <rect x="230" y="190" width="22"  height="175" fill="#DDB86A" />
      <rect x="548" y="190" width="22"  height="175" fill="#DDB86A" />

      {/* Main roof band */}
      <rect x="225" y="186" width="352" height="16"  fill="#B22222" rx="1" />

      {/* Gable / pediment */}
      <polygon points="308,186 492,186 400,106" fill="#C0392B" />

      {/* Clock */}
      <circle cx="400" cy="148" r="21"  fill="white"  stroke="#8B4513" strokeWidth="2.5" />
      <circle cx="400" cy="148" r="2"   fill="#333" />
      <line x1="400" y1="131" x2="400" y2="148" stroke="#333" strokeWidth="2"   strokeLinecap="round" />
      <line x1="400" y1="148" x2="413" y2="148" stroke="#333" strokeWidth="2"   strokeLinecap="round" />

      {/* === TOP-FLOOR WINDOWS === */}
      {/* Left pair */}
      <rect x="248" y="208" width="50" height="40" fill="#67CDD4" rx="2" />
      <line x1="273" y1="208" x2="273" y2="248" stroke="#B0E8EB" strokeWidth="1.5" />
      <line x1="248" y1="228" x2="298" y2="228" stroke="#B0E8EB" strokeWidth="1"   />

      <rect x="308" y="208" width="50" height="40" fill="#67CDD4" rx="2" />
      <line x1="333" y1="208" x2="333" y2="248" stroke="#B0E8EB" strokeWidth="1.5" />
      <line x1="308" y1="228" x2="358" y2="228" stroke="#B0E8EB" strokeWidth="1"   />

      {/* Right pair */}
      <rect x="442" y="208" width="50" height="40" fill="#67CDD4" rx="2" />
      <line x1="467" y1="208" x2="467" y2="248" stroke="#B0E8EB" strokeWidth="1.5" />
      <line x1="442" y1="228" x2="492" y2="228" stroke="#B0E8EB" strokeWidth="1"   />

      <rect x="502" y="208" width="50" height="40" fill="#67CDD4" rx="2" />
      <line x1="527" y1="208" x2="527" y2="248" stroke="#B0E8EB" strokeWidth="1.5" />
      <line x1="502" y1="228" x2="552" y2="228" stroke="#B0E8EB" strokeWidth="1"   />

      {/* === BOTTOM-FLOOR WINDOWS === */}
      {/* Left pair */}
      <rect x="248" y="293" width="50" height="42" fill="#67CDD4" rx="2" />
      <line x1="273" y1="293" x2="273" y2="335" stroke="#B0E8EB" strokeWidth="1.5" />
      <line x1="248" y1="314" x2="298" y2="314" stroke="#B0E8EB" strokeWidth="1"   />

      <rect x="308" y="293" width="50" height="42" fill="#67CDD4" rx="2" />
      <line x1="333" y1="293" x2="333" y2="335" stroke="#B0E8EB" strokeWidth="1.5" />
      <line x1="308" y1="314" x2="358" y2="314" stroke="#B0E8EB" strokeWidth="1"   />

      {/* Right pair */}
      <rect x="442" y="293" width="50" height="42" fill="#67CDD4" rx="2" />
      <line x1="467" y1="293" x2="467" y2="335" stroke="#B0E8EB" strokeWidth="1.5" />
      <line x1="442" y1="314" x2="492" y2="314" stroke="#B0E8EB" strokeWidth="1"   />

      <rect x="502" y="293" width="50" height="42" fill="#67CDD4" rx="2" />
      <line x1="527" y1="293" x2="527" y2="335" stroke="#B0E8EB" strokeWidth="1.5" />
      <line x1="502" y1="314" x2="552" y2="314" stroke="#B0E8EB" strokeWidth="1"   />

      {/* === ENTRANCE DOOR === */}
      <rect x="358" y="272" width="84" height="93" fill="#B22222" rx="3" />
      {/* Left panel */}
      <rect x="362" y="276" width="36" height="85" fill="#67CDD4" rx="1" />
      <line x1="362" y1="319" x2="398" y2="319" stroke="#55B8BF" strokeWidth="1.5" />
      {/* Right panel */}
      <rect x="402" y="276" width="36" height="85" fill="#67CDD4" rx="1" />
      <line x1="402" y1="319" x2="438" y2="319" stroke="#55B8BF" strokeWidth="1.5" />
      {/* Handles */}
      <circle cx="397" cy="323" r="3" fill="#FFD700" />
      <circle cx="403" cy="323" r="3" fill="#FFD700" />

      {/* SCHOOL sign — rendered last so it sits in front of windows */}
      <rect x="322" y="258" width="156" height="26" fill="#C0392B" rx="3" />
      <text x="400" y="276" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold"
            fontFamily="Arial, sans-serif" letterSpacing="2">CAMPUS</text>
    </svg>
  );
}
