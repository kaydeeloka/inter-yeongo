interface SchoolBuildingProps {
  className?: string;
  asBackground?: boolean;
}

export default function SchoolBuilding({ className, asBackground }: SchoolBuildingProps) {
  return (
    <svg
      viewBox="0 0 800 520"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio={asBackground ? 'xMidYMid slice' : 'xMidYMid meet'}
      style={asBackground ? { width: '100%', height: '100%', display: 'block' } : undefined}
    >
      {/* Sky */}
      <rect width="800" height="520" fill="#B3E5EE" />

      {/* Clouds */}
      <g>
        <ellipse cx="140" cy="75"  rx="55" ry="22" fill="white" />
        <ellipse cx="185" cy="65"  rx="42" ry="18" fill="white" />
        <ellipse cx="110" cy="82"  rx="34" ry="15" fill="white" />
      </g>
      <g>
        <ellipse cx="600" cy="85"  rx="50" ry="20" fill="white" />
        <ellipse cx="645" cy="74"  rx="38" ry="16" fill="white" />
        <ellipse cx="570" cy="90"  rx="30" ry="13" fill="white" />
      </g>

      {/* Ground */}
      <rect x="0" y="360" width="800" height="160" fill="#7CB342" />
      <rect x="0" y="360" width="800" height="10"  fill="#8BC34A" />

      {/* Pathway */}
      <polygon points="358,360 442,360 520,520 280,520" fill="#D4B896" />
      <polygon points="358,360 370,360 450,520 280,520" fill="#C8A87A" opacity="0.25" />

      {/* === TREES === */}
      {/* Far-left */}
      <rect   x="90"  y="300" width="20" height="65" fill="#795548" />
      <circle cx="100" cy="250" r="70"   fill="#4CAF50" />
      <circle cx="68"  cy="285" r="48"   fill="#388E3C" />

      {/* Near-left */}
      <rect   x="178" y="318" width="16" height="48" fill="#6D4C41" />
      <circle cx="186" cy="278" r="56"   fill="#43A047" />
      <circle cx="160" cy="308" r="36"   fill="#388E3C" />

      {/* Far-right */}
      <rect   x="690" y="300" width="20" height="65" fill="#795548" />
      <circle cx="700" cy="250" r="70"   fill="#4CAF50" />
      <circle cx="732" cy="285" r="48"   fill="#388E3C" />

      {/* Near-right */}
      <rect   x="606" y="318" width="16" height="48" fill="#6D4C41" />
      <circle cx="614" cy="278" r="56"   fill="#43A047" />
      <circle cx="640" cy="308" r="36"   fill="#388E3C" />

      {/* Ground plants */}
      <ellipse cx="135" cy="366" rx="22" ry="10" fill="#558B2F" />
      <ellipse cx="158" cy="363" rx="16" ry="8"  fill="#689F38" />
      <ellipse cx="665" cy="366" rx="22" ry="10" fill="#558B2F" />
      <ellipse cx="642" cy="363" rx="16" ry="8"  fill="#689F38" />

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

      {/* SCHOOL sign */}
      <rect x="322" y="258" width="156" height="26" fill="#C0392B" rx="3" />
      <text x="400" y="276" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold"
            fontFamily="Arial, sans-serif" letterSpacing="2">SCHOOL</text>

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

      {/* === STEPS === */}
      <rect x="336" y="359" width="128" height="10" fill="#7B1A1A" />
      <rect x="344" y="349" width="112" height="12" fill="#8B2222" />
      <rect x="352" y="339" width="96"  height="12" fill="#9B3333" />

      {/* === BUSHES === */}
      <circle cx="248" cy="354" r="18" fill="#33691E" />
      <circle cx="268" cy="348" r="23" fill="#388E3C" />
      <circle cx="292" cy="354" r="17" fill="#33691E" />

      <circle cx="508" cy="354" r="17" fill="#33691E" />
      <circle cx="532" cy="348" r="23" fill="#388E3C" />
      <circle cx="552" cy="354" r="18" fill="#33691E" />
    </svg>
  );
}
