import { useEffect, useState } from 'react';
import './Heatmap.css';

interface Zone {
  id: string;
  name: string;
  currentDensity: number; // 0 to 100
  predictedDensity: number;
  x: number;
  y: number;
}

export function Heatmap() {
  const [isPredictive, setIsPredictive] = useState(false);
  const [zones, setZones] = useState<Zone[]>([
    { id: 'z1', name: 'Gate A', currentDensity: 85, predictedDensity: 20, x: 20, y: 30 },
    { id: 'z2', name: 'Concourse N', currentDensity: 45, predictedDensity: 85, x: 50, y: 20 },
    { id: 'z3', name: 'Food Court', currentDensity: 92, predictedDensity: 95, x: 80, y: 40 },
    { id: 'z4', name: 'Merch Stand', currentDensity: 30, predictedDensity: 60, x: 30, y: 70 },
    { id: 'z5', name: 'Restrooms S', currentDensity: 60, predictedDensity: 20, x: 70, y: 75 },
    { id: 'z6', name: 'Gate B', currentDensity: 15, predictedDensity: 10, x: 50, y: 90 },
  ]);

  // Simulate real-time density changes
  useEffect(() => {
    const interval = setInterval(() => {
      setZones(currentZones => currentZones.map(zone => {
        const currentChange = (Math.random() - 0.5) * 10;
        const predictedChange = (Math.random() - 0.5) * 10;
        return {
          ...zone,
          currentDensity: Math.max(0, Math.min(100, zone.currentDensity + currentChange)),
          predictedDensity: Math.max(0, Math.min(100, zone.predictedDensity + predictedChange))
        };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getGlowColor = (density: number) => {
    if (density > 80) return 'var(--error)';
    if (density > 50) return 'var(--warning)';
    return 'var(--success)';
  };

  return (
    <div className="glass-panel heatmap-container">
      <div className="component-header">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h2 className="title-fluid" style={{ fontSize: '1.5rem' }}>
            {isPredictive ? 'Predictive Routing (+10m)' : 'Live Crowd Heatmap'}
          </h2>
          <div className="legend">
            <span className="dot" style={{ background: 'var(--success)' }}></span> Low
            <span className="dot" style={{ background: 'var(--warning)' }}></span> Medium
            <span className="dot" style={{ background: 'var(--error)' }}></span> High
          </div>
        </div>
        
        <button 
          className={`predictive-toggle ${isPredictive ? 'active' : ''}`}
          onClick={() => setIsPredictive(!isPredictive)}
        >
          <span className="icon">⏱️</span> 
          <span>Predictive Mode</span>
        </button>
      </div>
      
      <div className="stadium-map">
        <div className="field-center">Pitch / Court</div>
        
        {isPredictive && (
          <svg className="routing-path" width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}>
            {/* Draw a proactive routing path circumventing a bottleneck */}
            <path 
              d="M 20% 30% Q 50% 10% 80% 40%" 
              fill="none" 
              stroke="var(--accent-primary)" 
              strokeWidth="3" 
              strokeDasharray="10, 10" 
              className="path-animation"
            />
            <text x="50%" y="15%" fill="var(--accent-primary)" fontSize="12" fontWeight="bold">Suggested Route (Faster)</text>
          </svg>
        )}

        {zones.map(zone => {
          const activeDensity = isPredictive ? zone.predictedDensity : zone.currentDensity;
          return (
            <div 
              key={zone.id}
              className="heat-node"
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                backgroundColor: getGlowColor(activeDensity),
                boxShadow: `0 0 ${activeDensity}px ${activeDensity / 2}px ${getGlowColor(activeDensity)}`,
                transform: `scale(${1 + (activeDensity / 100)})`,
                opacity: 0.7 + (activeDensity / 300),
                zIndex: 2
              }}
            >
              <div className="node-tooltip glass-panel">
                <strong>{zone.name}</strong>
                <span>{Math.round(activeDensity)}% {isPredictive ? 'Predicted' : 'Capacity'}</span>
                {isPredictive && activeDensity > 80 && (
                  <span style={{ color: 'var(--error)', marginTop: '4px', fontSize: '10px' }}>⚠️ Botteneck Forming</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
