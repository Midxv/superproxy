// src/pages/DashboardHome.jsx
import React from 'react';
import { Server, Globe, Smartphone, Shield, ArrowRight } from 'lucide-react';

const DashboardHome = () => {
    return (
        <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>

            {/* Top Header */}
            <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', margin: '0 0 10px 0' }}>Welcome back!</h1>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>Manage your proxies and subscriptions.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '14px' }}>Quick-Start guides ↗</a>
                    <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '14px' }}>Documentation ↗</a>
                </div>
            </div>

            {/* Product Grid */}
            <div className="product-grid">

                {/* Card 1: Residential */}
                <ProductCard
                    icon={<Globe size={32} color="#4facfe" />}
                    title="Residential"
                    price="from $1.75/GB"
                    features={[
                        "32M+ ethical IPs across 195 countries",
                        "Target country, state, and city-level",
                        "Rotating and sticky sessions"
                    ]}
                    btnText="Buy now"
                />

                {/* Card 2: ISP */}
                <ProductCard
                    icon={<Server size={32} color="#ff6b6b" />}
                    title="ISP"
                    price="from $2.40/Proxy"
                    features={[
                        "Premium ISP providers",
                        "Unlimited traffic",
                        "State and city targeting"
                    ]}
                    btnText="Buy now"
                />

                {/* Card 3: Datacenter */}
                <ProductCard
                    icon={<Shield size={32} color="#00c9a7" />}
                    title="Datacenter"
                    price="from $1.39/Proxy"
                    features={[
                        "99.9% uptime",
                        "State and city targeting",
                        "Ultra-fast 10Gbps servers"
                    ]}
                    btnText="Buy now"
                />

                {/* Card 4: Mobile */}
                <ProductCard
                    icon={<Smartphone size={32} color="#f2994a" />}
                    title="Mobile"
                    price="from $10/Month"
                    features={[
                        "Real 4G/5G mobile network",
                        "Auto-rotation available",
                        "Unlimited bandwidth"
                    ]}
                    btnText="Buy now"
                />

            </div>

            <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
      `}</style>
        </div>
    );
};

// Reusable Card Component
const ProductCard = ({ icon, title, price, features, btnText }) => (
    <div style={{
        background: 'var(--bg-card)', padding: '24px', borderRadius: '16px',
        border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', height: '100%'
    }}>
        <div style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.05)', width: 'fit-content', padding: '12px', borderRadius: '12px' }}>
            {icon}
        </div>

        <h3 style={{ fontSize: '20px', margin: '0 0 5px 0' }}>{title}</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 'bold', margin: '0 0 20px 0', fontSize: '14px' }}>{price}</p>

        <div style={{ flex: 1, marginBottom: '25px' }}>
            {features.map((feat, index) => (
                <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', fontSize: '14px', color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--primary)' }}>✓</span>
                    {feat}
                </div>
            ))}
        </div>

        <button style={{
            width: '100%', padding: '12px', borderRadius: '8px', border: 'none',
            background: 'var(--accent)', color: 'white', fontWeight: 'bold',
            cursor: 'pointer', fontSize: '16px'
        }}>
            {btnText}
        </button>
    </div>
);

export default DashboardHome;