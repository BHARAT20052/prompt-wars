import { useState, useEffect } from 'react';
import './LiveAlerts.css';

interface Alert {
  id: number;
  message: string;
  type: 'info' | 'promotion' | 'emergency' | 'incentive';
  time: string;
  incentiveData?: {
    discount: string;
    targetLocation: string;
  };
}

export function LiveAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, message: 'Welcome to Metro Stadium! Enjoy the game.', type: 'info', time: '10 mins ago' },
    { id: 2, message: 'Gate B is experiencing heavy traffic. Please route to Gate A.', type: 'emergency', time: '5 mins ago' }
  ]);

  useEffect(() => {
    // Simulate triggering a dynamic incentivization alert based on Heatmap congestion
    const timer = setTimeout(() => {
      const incentiveAlert: Alert = {
        id: 3,
        message: 'The South Concourse is congested. Walk to the North Concourse and scan this QR code for 15% off your next beer.',
        type: 'incentive',
        time: 'Just now',
        incentiveData: {
          discount: '15% OFF',
          targetLocation: 'North Concourse'
        }
      };
      setAlerts(prev => [incentiveAlert, ...prev]);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const getAlertIcon = (type: string) => {
    if (type === 'promotion') return '🎉';
    if (type === 'emergency') return '⚠️';
    if (type === 'incentive') return '🎁';
    return 'ℹ️';
  };

  return (
    <div className="glass-panel live-alerts-container">
      <div className="component-header">
        <h2 className="title-fluid" style={{ fontSize: '1.2rem' }}>Dynamic Alerts & Incentives</h2>
        <span className="live-indicator">
          <span className="dot"></span> LIVE
        </span>
      </div>

      <div className="alerts-list">
        {alerts.map(alert => (
          <div key={alert.id} className={`alert-item alert-${alert.type} glass-panel-hover`}>
            <div className="alert-icon">{getAlertIcon(alert.type)}</div>
            <div className="alert-content">
              <p>{alert.message}</p>
              
              {alert.type === 'incentive' && (
                <div className="incentive-card">
                  <div className="qr-placeholder">
                    <span style={{ fontSize: '2rem' }}>📱</span>
                  </div>
                  <div className="incentive-details">
                    <span className="discount-badge">{alert.incentiveData?.discount}</span>
                    <span className="target-loc">Valid at: {alert.incentiveData?.targetLocation}</span>
                    <button className="claim-btn">Claim Offer & Route Me</button>
                  </div>
                </div>
              )}
              
              <span className="alert-time">{alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
