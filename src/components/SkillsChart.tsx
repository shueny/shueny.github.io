import React from 'react';
import { SKILLS_DATA } from '../constants';

const SkillsChart: React.FC = () => {
  const width = 400;
  const height = 300;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = 100;
  const levels = 5;
  
  // Helper to get coordinates
  const getCoordinates = (value: number, index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    // Normalize value (assuming max 100)
    const radius = (value / 100) * maxRadius;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    };
  };

  const totalPoints = SKILLS_DATA.length;

  // Generate grid points
  const gridLevels = Array.from({ length: levels }).map((_, i) => {
    const levelValue = (100 / levels) * (i + 1);
    const points = SKILLS_DATA.map((_, index) => {
      const { x, y } = getCoordinates(levelValue, index, totalPoints);
      return `${x},${y}`;
    }).join(' ');
    return points;
  });

  // Generate data polygon
  const dataPoints = SKILLS_DATA.map((skill, index) => {
    const { x, y } = getCoordinates(skill.A, index, totalPoints);
    return `${x},${y}`;
  }).join(' ');
  
  // Generate axis lines
  const axisLines = SKILLS_DATA.map((_, index) => {
      const start = { x: centerX, y: centerY };
      const end = getCoordinates(100, index, totalPoints);
      return { start, end };
  });

  return (
    <div className="h-[400px] w-full bg-white rounded-2xl shadow-sm border border-orange-100 p-6 flex flex-col items-center justify-center">
      <h3 className="text-xl font-bold text-stone-900 mb-2 text-center font-serif italic">Core Competencies</h3>
      
      <div className="relative w-full h-full flex items-center justify-center">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          {/* Grid Levels */}
          {gridLevels.map((points, i) => (
            <polygon
              key={i}
              points={points}
              fill="transparent"
              stroke="#fed7aa"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          ))}

          {/* Axis Lines */}
          {axisLines.map((line, i) => (
             <line 
               key={i}
               x1={line.start.x}
               y1={line.start.y}
               x2={line.end.x}
               y2={line.end.y}
               stroke="#fed7aa"
               strokeWidth="1"
               strokeDasharray="3 3"
             />
          ))}

          {/* Data Polygon */}
          <polygon
            points={dataPoints}
            fill="#ea580c"
            fillOpacity="0.2"
            stroke="#ea580c"
            strokeWidth="3"
            className="drop-shadow-md"
          />
          
           {/* Data Points (Dots) */}
           {SKILLS_DATA.map((skill, index) => {
             const { x, y } = getCoordinates(skill.A, index, totalPoints);
             return (
               <circle 
                 key={index} 
                 cx={x} 
                 cy={y} 
                 r="4" 
                 fill="#ea580c" 
                 className="hover:scale-150 transition-transform origin-center cursor-pointer"
               >
                 <title>{`${skill.subject}: ${skill.A}%`}</title>
               </circle>
             );
           })}

          {/* Labels */}
          {SKILLS_DATA.map((skill, index) => {
            const { x, y } = getCoordinates(115, index, totalPoints); // Push labels out slightly
            
            // Adjust text anchor based on position
            let textAnchor: 'start' | 'middle' | 'end' = 'middle';
            let dy = '0.35em';
            
            // Right side
            if (x > centerX + 10) textAnchor = 'start';
            // Left side
            else if (x < centerX - 10) textAnchor = 'end';
            
            // Top/Bottom adjustment
            if (y < centerY - 10) dy = '0em';
            else if (y > centerY + 10) dy = '0.8em';

            return (
              <text
                key={index}
                x={x}
                y={y}
                textAnchor={textAnchor}
                dy={dy}
                className="text-[10px] md:text-xs font-bold fill-stone-600 font-sans tracking-wide"
              >
                {skill.subject}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default SkillsChart;