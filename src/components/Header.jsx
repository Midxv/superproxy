// src/components/Header.jsx
import React from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onOpenSidebar }) => {
    const navigate = useNavigate();

    return (
        <div className="global-header">

            {/* LEFT: Menu Button */}
            <div className="header-left">
                <button className="header-menu-btn" onClick={onOpenSidebar}>
                    <Menu size={24} color="#1e1b4b" />
                </button>
            </div>

            {/* CENTER: Logo */}
            <h1 className="header-logo" onClick={() => navigate('/dashboard')}>
                Super<span style={{ color: 'var(--primary)' }}>Proxy</span>
            </h1>

            {/* RIGHT: Spacer (Keeps logo centered) */}
            <div className="header-right"></div>

            <style jsx>{`
                .global-header {
                    display: grid;
                    grid-template-columns: 50px 1fr 50px; /* Precise columns */
                    align-items: center;
                    padding: 20px 0; /* Reduced side padding as grid handles it */
                    margin-bottom: 30px;
                    width: 100%;
                }

                .header-left { display: flex; justify-content: flex-start; }
                .header-right { display: flex; justify-content: flex-end; }

                .header-menu-btn {
                    background: white; border: 1px solid var(--border);
                    width: 44px; height: 44px;
                    border-radius: 12px; cursor: pointer;
                    transition: 0.2s; display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.03);
                }
                .header-menu-btn:hover { transform: scale(1.05); background: #f8f9ff; }

                .header-logo {
                    font-size: 28px; font-weight: 900; letter-spacing: -1px;
                    margin: 0; color: #1e1b4b; cursor: pointer; user-select: none;
                    text-align: center; /* Ensures text centering */
                }
            `}</style>
        </div>
    );
};

export default Header;