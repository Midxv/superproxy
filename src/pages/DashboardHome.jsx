// src/pages/DashboardHome.jsx
import React from 'react';
import { Plus, Globe, Server, Smartphone, Shield, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">

            {/* 1. BIG HEADER & BALANCE */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '42px', marginBottom: '10px' }}>
                    Super<span style={{ color: 'var(--primary)' }}>Proxy</span>
                </h1>

                <div className="balance-box">
                    <p className="balance-label">Available Balance</p>
                    <h2 className="balance-value">$0.00</h2>
                    <button className="btn-add-funds">
                        <Plus size={16} /> Add Funds
                    </button>
                </div>
            </div>

            {/* 2. PRODUCT CARDS (Replacing the old text buttons) */}
            <div className="products-grid">

                <ProductCard
                    icon={<Globe size={32} color="#4facfe" />}
                    title="Residential"
                    price="$1.75 / GB"
                    desc="Perfect for scraping & bypassing blocks."
                    onClick={() => navigate('/order')}
                />

                <ProductCard
                    icon={<Server size={32} color="#ff6b6b" />}
                    title="ISP Proxies"
                    price="$2.40 / IP"
                    desc="Fast static IPs for account management."
                    onClick={() => navigate('/order')}
                />

                <ProductCard
                    icon={<Shield size={32} color="#00c9a7" />}
                    title="Datacenter"
                    price="$1.39 / IP"
                    desc="High speed, 99.9% uptime guaranteed."
                    onClick={() => navigate('/order')}
                />

                <ProductCard
                    icon={<Smartphone size={32} color="#f2994a" />}
                    title="Mobile 4G/5G"
                    price="$80 / Mo"
                    desc="Real mobile carrier IPs for verification."
                    onClick={() => navigate('/order')}
                />

            </div>

            {/* 3. TRUSTPILOT SECTION */}
            <div className="reviews-section">
                <div className="reviews-header">
                    <Star fill="#00b67a" color="#00b67a" size={28} />
                    <h3>Trustpilot Reviews</h3>
                </div>
                <div className="reviews-grid">
                    <ReviewCard user="Alex D." text="Best proxies for scraping. Fast and reliable." />
                    <ReviewCard user="Sarah J." text="Support helped me setup in minutes. 10/10." />
                    <ReviewCard user="Mike B." text="Residential pool is super clean. No bans." />
                    <ReviewCard user="David K." text="Unbeatable price for the quality." />
                </div>
            </div>

            {/* --- CSS STYLES --- */}
            <style jsx>{`
        .dashboard-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 30px 20px;
        }

        /* Balance Box */
        .balance-box {
          background: var(--bg-card);
          padding: 25px;
          border-radius: 16px;
          border: 1px solid var(--border);
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          min-width: 280px;
          margin-top: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .balance-label { color: var(--text-muted); font-size: 12px; text-transform: uppercase; margin: 0; }
        .balance-value { font-size: 36px; color: white; margin: 5px 0 15px 0; }
        .btn-add-funds {
          background: rgba(0, 201, 167, 0.15); color: var(--primary);
          border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold;
          cursor: pointer; display: flex; align-items: center; gap: 8px;
          transition: 0.2s;
        }
        .btn-add-funds:hover { background: rgba(0, 201, 167, 0.25); }

        /* Product Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Responsive columns */
          gap: 20px;
          margin-bottom: 60px;
        }

        /* Reviews */
        .reviews-section { border-top: 1px solid var(--border); padding-top: 40px; text-align: center; }
        .reviews-header { display: flex; justify-content: center; gap: 10px; margin-bottom: 30px; align-items: center; }
        .reviews-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }

        /* Animation Keyframes */
        @keyframes popIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

// --- PRODUCT CARD COMPONENT ---
const ProductCard = ({ icon, title, price, desc, onClick }) => (
    <div
        className="product-card"
        onClick={onClick}
    >
        <div className="icon-box">{icon}</div>
        <div className="card-info">
            <h3>{title}</h3>
            <p className="desc">{desc}</p>
            <p className="price">{price}</p>
        </div>

        <style jsx>{`
      .product-card {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 24px;
        cursor: pointer;
        display: flex;
        align-items: flex-start;
        gap: 15px;
        transition: transform 0.1s ease, border-color 0.2s;
        position: relative;
        overflow: hidden;
      }

      /* Hover Effect */
      .product-card:hover {
        border-color: var(--primary);
        background: #252525;
      }

      /* THE POPUP TAP ANIMATION */
      .product-card:active {
        transform: scale(0.96); /* Shrinks slightly when tapped */
      }

      .icon-box {
        background: rgba(255,255,255,0.05);
        padding: 12px;
        border-radius: 12px;
        height: fit-content;
      }

      .card-info h3 { margin: 0 0 5px 0; font-size: 18px; }
      .desc { margin: 0 0 15px 0; color: var(--text-muted); font-size: 13px; line-height: 1.4; }
      .price { margin: 0; color: var(--primary); font-weight: bold; font-size: 16px; margin-top: auto; }
    `}</style>
    </div>
);

// --- REVIEW CARD COMPONENT ---
const ReviewCard = ({ user, text }) => (
    <div style={{ background: '#151515', padding: '15px', borderRadius: '10px', textAlign: 'left', border: '1px solid #333' }}>
        <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
            {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#00b67a" color="#00b67a" />)}
        </div>
        <p style={{ margin: '0 0 10px 0', fontSize: '13px', lineHeight: '1.4', color: '#ddd' }}>"{text}"</p>
        <p style={{ margin: 0, color: '#666', fontSize: '11px', fontWeight: 'bold' }}>{user}</p>
    </div>
);

export default DashboardHome;