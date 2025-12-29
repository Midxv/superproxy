// src/components/Sidebar.jsx
import React from 'react';
import { X, ShoppingBag, HelpCircle, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    return (
        <>
            {/* 1. DARK OVERLAY (Click to close) */}
            <div
                className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
                onClick={onClose}
            />

            {/* 2. SIDEBAR DRAWER */}
            <div className={`sidebar-drawer ${isOpen ? 'open' : ''}`}>

                {/* Header */}
                <div className="sidebar-header">
                    <h2 className="sidebar-brand">Menu</h2>
                    <button className="btn-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="sidebar-nav">
                    <button className="nav-btn" onClick={() => navigate('/order')}>
                        <ShoppingBag size={20} /> Orders
                    </button>

                    <button className="nav-btn" onClick={() => alert('Support Live Chat opening...')}>
                        <HelpCircle size={20} /> Help & Support
                    </button>
                </nav>

                {/* Footer (Logout) */}
                <div className="sidebar-footer">
                    <button className="btn-logout" onClick={handleLogout}>
                        <LogOut size={20} /> Logout
                    </button>
                </div>

            </div>

            <style jsx>{`
        /* OVERLAY */
        .sidebar-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(30, 27, 75, 0.4); /* Dark violet tint */
          backdrop-filter: blur(2px);
          z-index: 998;
          opacity: 0; visibility: hidden; transition: 0.3s;
        }
        .sidebar-overlay.active { opacity: 1; visibility: visible; }

        /* DRAWER */
        .sidebar-drawer {
          position: fixed; top: 0; left: 0; height: 100%; width: 280px;
          background: white; z-index: 999;
          box-shadow: 10px 0 30px rgba(0,0,0,0.1);
          transform: translateX(-100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex; flex-direction: column;
          padding: 25px;
        }
        .sidebar-drawer.open { transform: translateX(0); }

        /* CONTENT */
        .sidebar-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 40px;
        }
        .sidebar-brand { margin: 0; font-size: 24px; font-weight: 800; color: var(--text-main); }
        .btn-close { background: none; border: none; color: var(--text-muted); padding: 5px; }

        .sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 10px; }
        
        .nav-btn {
          display: flex; align-items: center; gap: 15px;
          width: 100%; padding: 15px;
          background: white; border: none; border-radius: 12px;
          color: var(--text-main); font-weight: 600; font-size: 16px;
          text-align: left; transition: 0.2s;
        }
        .nav-btn:hover { background: #f8f9ff; color: var(--primary); }

        .sidebar-footer { border-top: 1px solid var(--border); padding-top: 20px; }
        .btn-logout {
          display: flex; align-items: center; gap: 15px;
          width: 100%; padding: 15px;
          background: #fef2f2; color: #dc2626; /* Red for logout */
          border: none; border-radius: 12px;
          font-weight: 700; font-size: 16px; transition: 0.2s;
        }
        .btn-logout:hover { background: #fee2e2; }
      `}</style>
        </>
    );
};

export default Sidebar;