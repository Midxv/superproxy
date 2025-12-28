// src/pages/DashboardHome.jsx
import React from 'react';
import { Plus, Star } from 'lucide-react';

const DashboardHome = () => {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>

            {/* 1. BIG LOGO */}
            <h1 style={{ fontSize: '48px', marginBottom: '10px', marginTop: '40px' }}>
                Super<span style={{ color: 'var(--primary)' }}>Proxy</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Professional Proxy Dashboard</p>

            {/* 2. CENTERED BALANCE */}
            <div style={{
                background: 'var(--bg-card)', padding: '30px', borderRadius: '16px',
                border: '1px solid var(--border)', display: 'inline-block', minWidth: '300px',
                marginBottom: '50px'
            }}>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase' }}>Available Balance</p>
                <h2 style={{ fontSize: '42px', margin: '10px 0', color: 'white' }}>$0.00</h2>
                <button style={{
                    background: 'rgba(0, 201, 167, 0.15)', color: 'var(--primary)',
                    border: 'none', padding: '10px 24px', borderRadius: '8px',
                    fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', gap: '8px', margin: '0 auto'
                }}>
                    <Plus size={16} /> Add Funds
                </button>
            </div>

            {/* 3. NAVIGATION GRID (Replacements for Sidebar) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '60px' }}>
                <NavCard title="Buy Proxies" />
                <NavCard title="My Orders" />
                <NavCard title="Tools" />
                <NavCard title="Settings" />
            </div>

            {/* 4. TRUSTPILOT REVIEWS */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
                    <Star fill="#00b67a" color="#00b67a" size={32} />
                    <h3 style={{ fontSize: '24px', margin: 0 }}>Trustpilot Reviews</h3>
                </div>

                <div className="review-grid">
                    <ReviewCard user="Alex D." text="Best proxies I've used for scraping. Fast and reliable." />
                    <ReviewCard user="Sarah J." text="Support is 10/10. Helped me set up in minutes." />
                    <ReviewCard user="Michael B." text="Residential IPs are clean. Great for sneaker bots." />
                    <ReviewCard user="David K." text="Unbeatable price for the quality. Highly recommend." />
                    <ReviewCard user="Jessica L." text="Smooth dashboard and instant delivery." />
                    <ReviewCard user="Ryan P." text="Been using for 6 months, zero downtime so far." />
                </div>
            </div>

            <style jsx>{`
        .review-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          text-align: left;
        }
      `}</style>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const NavCard = ({ title }) => (
    <div style={{
        background: '#151515', padding: '20px', borderRadius: '12px', border: '1px solid #333',
        cursor: 'pointer', fontWeight: 'bold', transition: '0.2s'
    }}
         onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
         onMouseOut={(e) => e.currentTarget.style.borderColor = '#333'}
    >
        {title}
    </div>
);

const ReviewCard = ({ user, text }) => (
    <div style={{ background: '#1a1a1a', padding: '15px', borderRadius: '8px', fontSize: '14px' }}>
        <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
            {[1,2,3,4,5].map(i => <div key={i} style={{ width: '15px', height: '15px', background: '#00b67a', marginRight: '2px' }}></div>)}
        </div>
        <p style={{ margin: '0 0 10px 0', lineHeight: '1.4' }}>"{text}"</p>
        <p style={{ margin: 0, color: '#666', fontSize: '12px', fontWeight: 'bold' }}>{user}</p>
    </div>
);

export default DashboardHome;