// src/pages/Inventory.jsx
import React, { useState } from 'react';
import { PackageOpen } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Inventory = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="page-container animate-fade-in">

            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <Header onOpenSidebar={() => setSidebarOpen(true)} />

            <div className="empty-state-container">
                <div className="icon-box">
                    <PackageOpen size={64} color="#d1d5db" />
                </div>
                <h2>No orders made yet!</h2>
                <p>Your active proxies and purchase history will appear here.</p>

                <button className="btn-browse" onClick={() => window.location.href='/dashboard'}>
                    Browse Products
                </button>
            </div>

            <style jsx>{`
        .page-container { min-height: 100vh; background: var(--bg-main); }
        
        .empty-state-container {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          height: 60vh; text-align: center;
        }
        
        .icon-box {
          background: white; padding: 30px; border-radius: 50%;
          box-shadow: var(--shadow-card); margin-bottom: 20px;
        }
        
        h2 { font-size: 24px; color: var(--text-main); margin-bottom: 10px; }
        p { color: var(--text-muted); margin-bottom: 30px; }
        
        .btn-browse {
          background: var(--primary); color: white; border: none;
          padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer;
          transition: 0.2s;
        }
        .btn-browse:hover { transform: translateY(-2px); }
        
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; }}
      `}</style>
        </div>
    );
};

export default Inventory;