// src/components/Header.jsx
import React from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onOpenSidebar }) => {
    const navigate = useNavigate();

    return (
        <div className="global-header">

            {/* 1. Hamburger (Opens Sidebar) */}
            <button className="header-menu-btn" onClick={onOpenSidebar}>
                <Menu size={24} color="#1e1b4b" />
            </button>

            {/* 2. Logo (Click -> Dashboard) */}
            <h1 className="header-logo" onClick={() => navigate('/dashboard')}>
                Super<span style={{ color: 'var(--primary)' }}>Proxy</span>
            </h1>

            {/* Spacer to balance the layout centered */}
            <div style={{ width: '40px' }}></div>

            <style jsx>{`
        .global-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 30px; background: transparent;
          margin-bottom: 20px;
        }
        
        .header-menu-btn {
          background: white; border: 1px solid var(--border);
          padding: 8px; border-radius: 12px; cursor: pointer;
          transition: 0.2s; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.03);
        }
        .header-menu-btn:hover { transform: scale(1.05); background: #f8f9ff; }

        .header-logo {
          font-size: 28px; font-weight: 900; letter-spacing: -1px; 
          margin: 0; color: #1e1b4b; cursor: pointer; user-select: none;
        }
      `}</style>
        </div>
    );
};

export default Header;