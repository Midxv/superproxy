import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Bitcoin, ShieldCheck, Globe, CheckCircle, ChevronDown, Lock } from 'lucide-react';

// Crypto Options Data
const cryptoOptions = [
    { id: 'BTC', name: 'Bitcoin', color: '#f7931a' },
    { id: 'ETH', name: 'Ethereum', color: '#627eea' },
    { id: 'USDT', name: 'Tether (TRC20)', color: '#26a17b' },
    { id: 'LTC', name: 'Litecoin', color: '#345d9d' },
];

const OrderPage = () => {
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [selectedCrypto, setSelectedCrypto] = useState(null); // Stores 'BTC', 'LTC' etc.
    const [plan, setPlan] = useState('1 Day');

    const price = plan === '1 Day' ? '10.62' : plan === '7 Days' ? '50.00' : '180.00';

    const handleCompleteOrder = () => {
        if (selectedMethod === 'crypto') {
            if (!selectedCrypto) {
                alert("Please select a cryptocurrency first.");
                return;
            }
            // Navigate to the new Payment Process page with data
            navigate('/payment-process', { state: { cryptoStr: selectedCrypto, amount: price } });
        } else {
            // Handle Card/Alibaba logic here (mock for now)
            alert(`Processing ${selectedMethod.toUpperCase()} payment...`);
        }
    };

    return (
        <div className="page-container animate-fade-in">
            <div className="content-wrapper">
                <h1 className="page-title">Checkout</h1>

                <div className="layout-grid">

                    {/* === LEFT COLUMN: Payment Methods === */}
                    <div className="left-section">
                        <h3 className="section-header">Select Payment Method</h3>

                        <div className="payment-options-stack">

                            {/* 1. Credit Card Option */}
                            <PaymentMethodItem
                                active={selectedMethod === 'card'}
                                onClick={() => setSelectedMethod('card')}
                                icon={<CreditCard className="icon-violet" />}
                                title="Credit / Debit Card"
                                logos={['VISA', 'MC', 'AMEX']}
                            >
                                {/* Browser Autofill Form */}
                                <div className="method-expanded-content animate-slide-down">
                                    <div className="card-form-grid">
                                        <div className="input-group full">
                                            <label>Card Number</label>
                                            {/* name="cc-number" triggers browser autofill */}
                                            <input type="text" name="cc-number" autoComplete="cc-number" placeholder="0000 0000 0000 0000" className="secure-input" />
                                            <Lock size={16} className="input-lock-icon" />
                                        </div>
                                        <div className="input-group">
                                            <label>Expiry</label>
                                            <input type="text" name="cc-exp" autoComplete="cc-exp" placeholder="MM / YY" className="secure-input" />
                                        </div>
                                        <div className="input-group">
                                            <label>CVC</label>
                                            <input type="text" name="cc-csc" autoComplete="cc-csc" placeholder="123" className="secure-input" />
                                        </div>
                                    </div>
                                </div>
                            </PaymentMethodItem>

                            {/* 2. Crypto Option */}
                            <PaymentMethodItem
                                active={selectedMethod === 'crypto'}
                                onClick={() => setSelectedMethod('crypto')}
                                icon={<Bitcoin className="icon-gold" />}
                                title="Cryptocurrency"
                                badge="-5% Fees"
                            >
                                {/* Crypto Selection Grid */}
                                <div className="method-expanded-content animate-slide-down">
                                    <p style={{marginBottom: '15px', fontSize:'14px', color:'var(--text-muted)'}}>Select coin to pay anonymously:</p>
                                    <div className="crypto-grid">
                                        {cryptoOptions.map(coin => (
                                            <div
                                                key={coin.id}
                                                className={`crypto-option ${selectedCrypto === coin.id ? 'selected' : ''}`}
                                                onClick={(e) => { e.stopPropagation(); setSelectedCrypto(coin.id); }}
                                                style={{'--coin-color': coin.color}}
                                            >
                                                <span className="coin-icon" style={{backgroundColor: coin.color}}>{coin.id[0]}</span>
                                                <span className="coin-name">{coin.name}</span>
                                                {selectedCrypto === coin.id && <CheckCircle size={16} color="var(--primary)" className="coin-check"/>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </PaymentMethodItem>

                            {/* 3. Alibaba Option */}
                            <PaymentMethodItem
                                active={selectedMethod === 'alibaba'}
                                onClick={() => setSelectedMethod('alibaba')}
                                // Using a placeholder icon for Alibaba
                                icon={<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="icon-orange"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>}
                                title="Alibaba / Alipay"
                            >
                                <div className="method-expanded-content animate-slide-down">
                                    <p style={{fontSize:'14px', color:'var(--text-muted)'}}>You will be redirected to Alibaba to complete payment safely.</p>
                                </div>
                            </PaymentMethodItem>

                        </div>
                    </div>

                    {/* === RIGHT COLUMN: Summary === */}
                    <div className="right-section">
                        <div className="summary-card">
                            <h3>Order Summary</h3>

                            <div className="summary-item">
                                <span className="label">Product</span>
                                <span className="value flex-align"><Globe size={16} className="icon-violet" /> Residential Proxies</span>
                            </div>

                            <div className="summary-item">
                                <span className="label">Duration</span>
                                <select className="plan-select" value={plan} onChange={(e) => setPlan(e.target.value)}>
                                    <option>1 Day</option>
                                    <option>7 Days</option>
                                    <option>30 Days</option>
                                </select>
                            </div>

                            <div className="divider"></div>

                            <div className="total-row">
                                <span>Total Due</span>
                                <span className="price-tag">${price}</span>
                            </div>

                            <button className="btn-checkout" onClick={handleCompleteOrder}>
                                {selectedMethod === 'crypto' && selectedCrypto ? `Pay with ${selectedCrypto}` : 'Complete Order'}
                            </button>

                            <div className="secure-footer">
                                <ShieldCheck size={16} /> SSL Encrypted Transaction
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
        .page-container { min-height: 100vh; padding: 40px 20px; background: var(--bg-main); }
        .content-wrapper { max-width: 1000px; margin: 0 auto; }
        .page-title { font-size: 32px; margin-bottom: 30px; color: var(--text-main); }
        .layout-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; }
        
        /* Left Section Styling */
        .section-header { margin-bottom: 20px; }
        .payment-options-stack { display: flex; flex-direction: column; gap: 15px; }
        
        /* Method Item Component Styling */
        .payment-method-item {
          background: white; border: 2px solid var(--border); border-radius: 20px;
          overflow: hidden; transition: all 0.2s; cursor: pointer;
        }
        .payment-method-item.active { border-color: var(--primary); box-shadow: var(--shadow-card); }
        .method-header {
          padding: 20px; display: flex; align-items: center; justify-content: space-between;
        }
        .method-left { display: flex; align-items: center; gap: 15px; }
        .radio-circle {
          width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--border);
          display: flex; justify-content: center; align-items: center;
        }
        .payment-method-item.active .radio-circle { border-color: var(--primary); }
        .radio-inner { width: 10px; height: 10px; background: var(--primary); border-radius: 50%; }
        .method-title { font-weight: 700; font-size: 16px; }
        .method-right { display: flex; align-items: center; gap: 10px; }
        .card-logos span { font-size: 10px; background: #f3f4f6; padding: 4px 6px; border-radius: 4px; font-weight: bold; color: #555; }
        .badge-discount { font-size: 12px; background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 12px; font-weight: bold; }
        
        /* Expanded Content */
        .method-expanded-content {
          border-top: 1px solid var(--border); padding: 25px; background: #f8f9ff;
        }
        
        /* Card Form */
        .card-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .input-group.full { grid-column: span 2; }
        .input-group label { display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600; color: var(--text-muted); }
        .input-group { position: relative; }
        .secure-input {
          width: 100%; padding: 12px 15px 12px 40px; border: 1px solid var(--border); border-radius: 12px;
          outline: none; font-size: 15px; transition: 0.2s; background: white;
        }
        .secure-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1); }
        .input-lock-icon { position: absolute; left: 12px; top: 38px; color: var(--text-muted); }

        /* Crypto Grid */
        .crypto-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .crypto-option {
          background: white; border: 2px solid var(--border); padding: 12px; border-radius: 12px;
          display: flex; align-items: center; gap: 10px; cursor: pointer; position: relative;
        }
        .crypto-option:hover { border-color: var(--coin-color); background: #fafafa; }
        .crypto-option.selected { border-color: var(--primary); background: #f5f3ff; }
        .coin-icon { width: 24px; height: 24px; border-radius: 50%; color: white; display: flex; justify-content: center; align-items: center; font-size: 10px; font-weight: bold; }
        .coin-name { font-weight: 600; font-size: 14px; }
        .coin-check { margin-left: auto; }

        /* Summary Section */
        .summary-card {
          background: white; padding: 30px; border-radius: 30px;
          box-shadow: var(--shadow-hover); border: 1px solid white; position: sticky; top: 30px;
        }
        .summary-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .label { font-weight: 600; color: var(--text-muted); }
        .flex-align { display: flex; align-items: center; gap: 8px; font-weight: 600; }
        .plan-select { padding: 8px 12px; border-radius: 10px; border: 1px solid var(--border); outline: none; cursor: pointer; font-weight: 600; }
        .divider { height: 1px; background: var(--border); margin: 25px 0; }
        .total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .total-row span:first-child { font-size: 18px; font-weight: 700; }
        .price-tag { font-size: 32px; font-weight: 800; color: var(--primary); }
        .btn-checkout {
          width: 100%; padding: 18px; border: none; border-radius: 16px;
          background: var(--primary); color: white; font-weight: 700; font-size: 18px;
          cursor: pointer; transition: 0.2s; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
        }
        .btn-checkout:hover { background: var(--primary-hover); transform: translateY(-2px); }
        .secure-footer { margin-top: 20px; display: flex; justify-content: center; align-items: center; gap: 8px; color: var(--text-muted); font-size: 13px; }
        
        .icon-violet { color: var(--primary); } .icon-gold { color: #f59e0b; } .icon-orange { color: #f97316; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        .animate-slide-down { animation: slideDown 0.3s ease-out; }
        @keyframes fadeIn { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); }}
        @keyframes slideDown { from { opacity:0; transform: translateY(-10px); height: 0; } to { opacity:1; transform: translateY(0); height: auto; }}
        
        @media (max-width: 900px) { .layout-grid { grid-template-columns: 1fr; } .summary-card { position: static; order: -1; } }
      `}</style>
        </div>
    );
};

// Helper Component for Payment Items to keep JSX clean
const PaymentMethodItem = ({ active, onClick, icon, title, logos, badge, children }) => (
    <div className={`payment-method-item ${active ? 'active' : ''}`} onClick={onClick}>
        <div className="method-header">
            <div className="method-left">
                <div className="radio-circle">{active && <div className="radio-inner" />}</div>
                {icon}
                <span className="method-title">{title}</span>
            </div>
            <div className="method-right">
                {logos && <div className="card-logos">{logos.map(l=><span key={l}>{l}</span>)}</div>}
                {badge && <span className="badge-discount">{badge}</span>}
                <ChevronDown size={20} color="var(--text-muted)" style={{transform: active ? 'rotate(180deg)' : 'rotate(0)', transition:'0.3s'}} />
            </div>
        </div>
        {active && children}
    </div>
);

export default OrderPage;