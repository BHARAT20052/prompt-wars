import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Heatmap } from './components/Heatmap/Heatmap';
import { WaitTimesList } from './components/WaitTimesList/WaitTimesList';
import { LiveAlerts } from './components/LiveAlerts/LiveAlerts';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="app-sidebar">
        <Sidebar />
      </div>
      
      <div className="app-header">
        <Header />
      </div>

      <main className="app-main">
        <div className="dashboard-primary">
          <div style={{ minHeight: '450px', flex: 1 }}>
            <Heatmap />
          </div>
          
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h2 className="title-fluid" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Venue Layout & Navigation</h2>
            <div style={{ 
              height: '150px', 
              background: 'rgba(255,255,255,0.02)', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px dashed rgba(255,255,255,0.1)'
            }}>
              <span style={{ color: 'var(--text-muted)' }}>Interactive map coming soon...</span>
            </div>
          </div>
        </div>
        
        <div className="dashboard-secondary">
          <div style={{ height: '350px' }}>
            <WaitTimesList />
          </div>
          <div style={{ flex: 1, minHeight: '350px' }}>
            <LiveAlerts />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
