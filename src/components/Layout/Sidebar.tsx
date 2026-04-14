import './Layout.css';

export function Sidebar() {
  const navItems = [
    { label: 'Dashboard', icon: '📊', active: true },
    { label: 'Heatmap', icon: '🗺️' },
    { label: 'Wait Times', icon: '⏱️' },
    { label: 'Alerts', icon: '🔔' },
    { label: 'Navigation', icon: '🧭' }
  ];

  return (
    <aside className="glass-panel sidebar">
      <nav className="nav-menu">
        {navItems.map((item, index) => (
          <button 
            key={index} 
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="event-score glass-panel">
          <div className="team">
            <span className="team-name">Eagles</span>
            <span className="score">24</span>
          </div>
          <div className="divider">:</div>
          <div className="team">
            <span className="score">17</span>
            <span className="team-name">Falcons</span>
          </div>
          <div className="quarter">Q4 05:23</div>
        </div>
      </div>
    </aside>
  );
}
