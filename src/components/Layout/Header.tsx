import './Layout.css';

export function Header() {
  return (
    <header className="glass-panel main-header">
      <div className="header-brand">
        <h1 className="title-fluid text-gradient">VenueSync</h1>
        <span className="status-badge">Live Event: Metro Stadium</span>
      </div>
      
      <div className="header-actions">
        <div className="weather-widget">
          <span className="icon">☀️</span>
          <span>72°F</span>
        </div>
        <div className="user-profile">
          <div className="avatar">A</div>
        </div>
      </div>
    </header>
  );
}
