import { useEffect, useState } from 'react';
import './WaitTimesList.css';

interface QueueData {
  id: string;
  name: string;
  type: 'concession' | 'restroom' | 'merch';
  waitTime: number; // in minutes
}

export function WaitTimesList() {
  const [queues, setQueues] = useState<QueueData[]>([
    { id: 'q1', name: 'Hot Dog Stand A', type: 'concession', waitTime: 12 },
    { id: 'q2', name: 'Restrooms North', type: 'restroom', waitTime: 3 },
    { id: 'q3', name: 'Team Store', type: 'merch', waitTime: 25 },
    { id: 'q4', name: 'Beer Stand South', type: 'concession', waitTime: 8 },
    { id: 'q5', name: 'Restrooms East', type: 'restroom', waitTime: 15 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueues(current => current.map(q => ({
        ...q,
        waitTime: Math.max(0, q.waitTime + Math.floor((Math.random() - 0.5) * 5))
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusClass = (time: number) => {
    if (time < 5) return 'status-fast';
    if (time < 15) return 'status-med';
    return 'status-slow';
  };

  const getIcon = (type: string) => {
    if (type === 'concession') return '🍔';
    if (type === 'restroom') return '🚻';
    return '👕';
  };

  // Sort by shortest wait time
  const sortedQueues = [...queues].sort((a, b) => a.waitTime - b.waitTime);

  return (
    <div className="glass-panel wait-times-container">
      <div className="component-header">
        <h2 className="title-fluid" style={{ fontSize: '1.2rem' }}>Smart Queue Management</h2>
      </div>
      
      <div className="queue-list">
        {sortedQueues.map(queue => (
          <div key={queue.id} className="queue-item glass-panel-hover">
            <div className="queue-info">
              <span className="queue-icon">{getIcon(queue.type)}</span>
              <span className="queue-name">{queue.name}</span>
            </div>
            <div className={`queue-time ${getStatusClass(queue.waitTime)}`}>
              <span className="time-val">{queue.waitTime}</span> min
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
