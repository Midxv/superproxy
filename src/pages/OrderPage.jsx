import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Bitcoin, ShieldCheck, Globe, Lock, ChevronDown } from 'lucide-react';

const OrderPage = () => {
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const [plan, setPlan] = useState('1 Day');

    const price = plan === '1 Day' ? '10.62' : plan === '7 Days' ? '50.00' : '180.00';

    const handleCheckout = () => {
        if (selectedMethod === 'crypto') {
            if (!selectedCrypto) return alert("Select a cryptocurrency.");
            navigate('/payment-process', { state: { cryptoStr: selectedCrypto, amount: price } });
        } else {
            alert("Processing Card Payment...");
        }
    };

    return (
        <div className="page-container animate-fade-in">
            <div className="content-wrapper">
                <h1 className="page-title">Checkout</h1>

                <div className="layout-grid">

                    {/* LEFT: PAYMENT METHODS */}
                    <div className="left-section">
                        <h3 className="section-header">Select Payment Method</h3>
                        <div className="payment-options-stack">

                            {/* Card */}
                            <MethodItem
                                active={selectedMethod === 'card'}
                                onClick={() => setSelectedMethod('card')}
                                icon={<CreditCard className="icon-violet" />}
                                title="Credit / Debit Card"
                                logos={['VISA', 'MC', 'AMEX']}
                            >
                                <div className="method-content animate-slide-down">
                                    <div className="card-form-grid">
                                        <div className="input-group full">
                                            <label>Card Number</label>
                                            <input type="text" name="cc-number" autoComplete="cc-number" placeholder="0000 0000 0000 0000" className="secure-input" />
                                            <Lock size={16} className="input-lock" />
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
                            </MethodItem>

                            {/* Crypto */}
                            <MethodItem
                                active={selectedMethod === 'crypto'}
                                onClick={() => setSelectedMethod('crypto')}
                                icon={<Bitcoin className="icon-gold" />}
                                title="Cryptocurrency"
                                badge="-5% Fees"
                            >
                                <div className="method-content animate-slide-down">
                                    <p className="label-sm">Select coin:</p>
                                    <div className="crypto-grid">
                                        {['BTC', 'ETH', 'LTC', 'USDT'].map(c => (
                                            <div key={c}
                                                 className={`crypto-pill ${selectedCrypto === c ? 'active' : ''}`}
                                                 onClick={(e) => {e.stopPropagation(); setSelectedCrypto(c)}}
                                            >
                                                {c}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </MethodItem>

                            {/* Alibaba */}
                            <MethodItem
                                active={selectedMethod === 'alibaba'}
                                onClick={() => setSelectedMethod('alibaba')}
                                title="Alibaba / Alipay"
                                icon={<Globe className="icon-orange" />}
                            />

                        </div>
                    </div>

                    {/* RIGHT: SUMMARY */}
                    <div className="right-section">
                        <div className="summary-card">
                            <h3>Order Summary</h3>

                            <div className="summary-row">
                                <span className="text-muted">Product</span>
                                <span className="font-bold flex-align"><Globe size={16} /> Residential Proxies</span>
                            </div>

                            <div className="summary-row">
                                <span className="text-muted">Duration</span>
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

                            <button className="btn-checkout" onClick={handleCheckout}>
                                Complete Order
                            </button>

                            <div className="secure-footer">
                                <ShieldCheck size={16} /> SSL Encrypted Transaction
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
        .page-container { min-height: 100vh; padding: 40px 20px; }
        .content-wrapper { max-width: 1000px; margin: 0 auto; }
        .page-title { font-size: 32px; font-weight: 800; margin-bottom: 30px; }
        .layout-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; }
        
        .payment-options-stack { display: flex; flex-direction: column; gap: 15px; }
        
        /* Method Item */
        .method-item { background: white; border: 2px solid var(--border); border-radius: 20px; overflow: hidden; cursor: pointer; transition: 0.2s; }
        .method-item.active { border-color: var(--primary); box-shadow: var(--shadow-card); }
        .method-header { padding: 20px; display: flex; justify-content: space-between; align-items: center; }
        .method-left { display: flex; align-items: center; gap: 15px; font-weight: 700; }
        
        .method-content { border-top: 1px solid var(--border); padding: 25px; background: #f8f9ff; }
        
        /* Inputs */
        .card-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .input-group.full { grid-column: span 2; }
        .secure-input { width: 100%; padding: 14px; border: 1px solid var(--border); border-radius: 12px; outline: none; }
        .secure-input:focus { border-color: var(--primary); background: white; }

        /* Crypto Pills */
        .crypto-grid { display: flex; gap: 10px; flex-wrap: wrap; }
        .crypto-pill { background: white; border: 2px solid var(--border); padding: 10px 20px; border-radius: 12px; font-weight: 600; cursor: pointer; }
        .crypto-pill.active { border-color: var(--primary); background: #f5f3ff; color: var(--primary); }

        /* Summary */
        .summary-card { background: white; padding: 30px; border-radius: 30px; box-shadow: var(--shadow-card); position: sticky; top: 30px; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .plan-select { padding: 8px; border-radius: 8px; border: 1px solid var(--border); font-weight: 600; }
        
        .total-row { display: flex; justify-content: space-between; align-items: center; font-size: 18px; font-weight: 700; margin-bottom: 25px; }
        .price-tag { font-size: 32px; color: var(--primary); }
        
        .btn-checkout { width: 100%; padding: 18px; background: var(--primary); color: white; border: none; border-radius: 16px; font-weight: 700; font-size: 18px; cursor: pointer; transition: 0.2s; }
        .btn-checkout:hover { background: var(--primary-hover); transform: translateY(-2px); }
        
        .secure-footer { margin-top: 20px; display: flex; justify-content: center; gap: 8px; color: var(--text-muted); font-size: 13px; }

        .icon-violet { color: var(--primary); } .icon-gold { color: #f59e0b; } .icon-orange { color: #f97316; }
        
        @media (max-width: 900px) { .layout-grid { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
};

// Helper
const MethodItem = ({ active, onClick, icon, title, logos, badge, children }) => (
    <div className={`method-item ${active ? 'active' : ''}`} onClick={onClick}>
        <div className="method-header">
            <div className="method-left">{icon} <span>{title}</span></div>
            <div className="method-right flex gap-2 items-center">
                {logos && logos.map(l=><span key={l} className="text-xs bg-gray-100 p-1 rounded font-bold text-gray-500 mr-2">{l}</span>)}
                {badge && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">{badge}</span>}
                <ChevronDown size={20} className={`transform transition ${active?'rotate-180':''}`} />
            </div>
        </div>
        {active && children}
    </div>
);

export default OrderPage;