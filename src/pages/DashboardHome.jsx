// src/pages/DashboardHome.jsx
import React, { useState } from 'react';
import { Plus, Globe, Server, Smartphone, Shield, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const DashboardHome = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Helper to navigate with state
    const handleOrder = (productType) => {
        navigate('/order', { state: { product: productType } });
    };

    return (
        <div className="dashboard-container">

            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <Header onOpenSidebar={() => setSidebarOpen(true)} />

            {/* Balance Section */}
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <div className="balance-card animate-pop">
                    <p className="balance-label">Available Balance</p>
                    <h2 className="balance-value">$0.00</h2>

                    <button className="btn-add-funds" onClick={() => navigate('/add-funds')}>
                        <Plus size={18} strokeWidth={3} /> Add Funds
                    </button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="products-grid">
                <ProductCard
                    icon={<Globe size={32} className="icon-blue" />}
                    title="Residential"
                    price="$1.75 / GB"
                    desc="Ethical IPs for scraping & unblocking."
                    onClick={() => handleOrder('Residential')}
                />

                <ProductCard
                    icon={<Server size={32} className="icon-red" />}
                    title="ISP Proxies"
                    price="$2.40 / IP"
                    desc="High speed static IPs for accounts."
                    onClick={() => handleOrder('ISP')}
                />

                <ProductCard
                    icon={<Shield size={32} className="icon-violet" />}
                    title="Datacenter"
                    price="$1.39 / IP"
                    desc="99.9% Uptime with 10Gbps speeds."
                    onClick={() => handleOrder('Datacenter')}
                />

                <ProductCard
                    icon={<Smartphone size={32} className="icon-orange" />}
                    title="Mobile 4G/5G"
                    price="$10.00 / Mo"
                    desc="Real carrier networks for verification."
                    onClick={() => handleOrder('Mobile')}
                />
            </div>

            {/* Reviews */}
            <div className="reviews-section">
                <div className="reviews-header">
                    <Star fill="#00b67a" stroke="none" size={28} />
                    <h3 style={{ fontSize: '24px', margin: 0, fontWeight: '800' }}>Trustpilot Reviews</h3>
                </div>

                <div className="reviews-grid">
                    <ReviewCard user="Alex D." text="Cleanest dashboard I've used. Proxies are super fast." />
                    <ReviewCard user="Sarah J." text="Support helped me setup in minutes. 10/10 service." />
                    <ReviewCard user="Mike B." text="Residential pool is huge. No bans on major sites." />
                    <ReviewCard user="David K." text="Unbeatable price for the quality. Highly recommend." />
                </div>
            </div>

            <style jsx>{`
                .icon-blue { color: #3b82f6; } .icon-red { color: #ef4444; }
                .icon-violet { color: #8b5cf6; } .icon-orange { color: #f97316; }
            `}</style>
        </div>
    );
};

const ProductCard = ({ icon, title, price, desc, onClick }) => (
    <div className="product-card" onClick={onClick}>
        <div style={{ background: '#f3f4f6', width: 'fit-content', padding: '12px', borderRadius: '14px', marginBottom: '15px' }}>
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
            {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#00b67a" stroke="none" />)}
        </div>
        <p className="review-text">"{text}"</p>
        <p className="review-user">{user}</p>
    </div>
);

export default DashboardHome;