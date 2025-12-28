// src/pages/DashboardHome.jsx
import React from 'react';
import { Plus, Globe, Server, Smartphone, Shield, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">

            {/* 1. BIG HEADER & BALANCE */}
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>

                {/* Massive Brand Title */}
                <h1 className="brand-title">
                    Super<span style={{ color: 'var(--primary)' }}>Proxy</span>
                </h1>

                {/* Balance Card (White Card, Black Text) */}
                <div className="balance-card">
                    <p className="balance-label">Available Balance</p>
                    <h2 className="balance-value">$0.00</h2>

                    <button
                        className="btn-add-funds"
                        onClick={() => navigate('/order')}
                    >
                        <Plus size={18} strokeWidth={3} /> Add Funds
                    </button>
                </div>

            </div>

            {/* 2. PRODUCT CARDS (Grid Layout) */}
            <div className="products-grid">

                <ProductCard
                    icon={<Globe size={32} color="#3b82f6" />} // Blue Icon
                    title="Residential"
                    price="$1.75 / GB"
                    desc="Ethical IPs for scraping & unblocking."
                    onClick={() => navigate('/order')}
                />

                <ProductCard
                    icon={<Server size={32} color="#ef4444" />} // Red Icon
                    title="ISP Proxies"
                    price="$2.40 / IP"
                    desc="High speed static IPs for accounts."
                    onClick={() => navigate('/order')}
                />

                <ProductCard
                    icon={<Shield size={32} color="#8b5cf6" />} // Violet Icon
                    title="Datacenter"
                    price="$1.39 / IP"
                    desc="99.9% Uptime with 10Gbps speeds."
                    onClick={() => navigate('/order')}
                />

                {/* --- UPDATED MOBILE PLAN --- */}
                <ProductCard
                    icon={<Smartphone size={32} color="#f97316" />} // Orange Icon
                    title="Mobile 4G/5G"
                    price="$10.00 / Mo"
                    desc="Real carrier networks for verification."
                    onClick={() => navigate('/order')}
                />

            </div>

            {/* 3. TRUSTPILOT REVIEWS (White Cards) */}
            <div className="reviews-section">
                <div className="reviews-header">
                    <Star fill="#00b67a" stroke="none" size={28} />
                    <h3 style={{ fontSize: '24px', margin: 0, fontWeight: 'bold' }}>Trustpilot Reviews</h3>
                </div>

                <div className="reviews-grid">
                    <ReviewCard user="Alex D." text="Cleanest dashboard I've used. Proxies are super fast." />
                    <ReviewCard user="Sarah J." text="Support helped me setup in minutes. 10/10 service." />
                    <ReviewCard user="Mike B." text="Residential pool is huge. No bans on major sites." />
                    <ReviewCard user="David K." text="Unbeatable price for the quality. Highly recommend." />
                </div>
            </div>

        </div>
    );
};

// --- SUB-COMPONENTS ---

const ProductCard = ({ icon, title, price, desc, onClick }) => (
    <div className="product-card" onClick={onClick}>
        <div style={{
            background: '#f3f4f6', width: 'fit-content', padding: '12px',
            borderRadius: '12px', marginBottom: '15px'
        }}>
            {icon}
        </div>

        <h3>{title}</h3>
        <p className="desc">{desc}</p>

        <div className="price-tag">{price}</div>
    </div>
);

const ReviewCard = ({ user, text }) => (
    <div className="review-card-white">
        <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
            {[1,2,3,4,5].map(i => (
                <Star key={i} size={14} fill="#00b67a" stroke="none" />
            ))}
        </div>
        <p className="review-text">"{text}"</p>
        <p className="review-user">{user}</p>
    </div>
);

export default DashboardHome;