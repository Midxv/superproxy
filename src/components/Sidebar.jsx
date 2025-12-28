import React from 'react';
import { Home, Server, Settings, HelpCircle } from 'lucide-react';

const Sidebar = () => {
    return (
        <div style={{
            width: '250px',
            height: '100vh',
            background: 'var(--bg-card)',
            borderRight: '1px solid var(--border)',
            padding: '20px',
            position: 'fixed',
            left: 0, top: 0
        }}>
            <h2 style={{marginBottom: '30px'}}>Super<span style={{color: 'var(--primary)'}}>Proxy</span></h2>

            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <p style={{fontSize: '12px', color: '#555', textTransform: 'uppercase'}}>Menu</p>
                <NavBtn icon={<Home size={18} />} text="Dashboard" active />
                <NavBtn icon={<Server size={18} />} text="Buy Proxies" />
                <NavBtn icon={<Settings size={18} />} text="Settings" />
                <NavBtn icon={<HelpCircle size={18} />} text="Support" />
            </div>
        </div>
    );
};

const NavBtn = ({ icon, text, active }) => (
    <button style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        background: active ? 'rgba(0, 201, 167, 0.1)' : 'transparent',
        color: active ? 'var(--primary)' : 'var(--text-muted)',
        border: 'none', padding: '12px', borderRadius: '8px',
        cursor: 'pointer', fontSize: '14px', width: '100%', textAlign: 'left'
    }}>
        {icon} {text}
    </button>
);

export default Sidebar;