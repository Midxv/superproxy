// src/pages/OrderPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Bitcoin, ShieldCheck, Globe, Lock, ChevronDown, AlertOctagon, X } from 'lucide-react';
import LoadingScreen from '../components/LoadingScreen';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const OrderPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // 1. Get Product Data from Dashboard
    const productType = location.state?.product || 'Residential';

    // 2. Pricing Configuration
    const pricingMap = {
        'Residential': { base: 10.62, unit: 'GB' },
        'ISP': { base: 2.40, unit: 'IP' },
        'Datacenter': { base: 1.39, unit: 'IP' },
        'Mobile': { base: 10.00, unit: 'Month' }
    };
    const currentPricing = pricingMap[productType] || pricingMap['Residential'];

    const [selectedMethod, setSelectedMethod] = useState('card');
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const [plan, setPlan] = useState('1 Unit');
    const [calculatedPrice, setCalculatedPrice] = useState(currentPricing.base.toFixed(2));

    // Recalculate price when plan changes
    useEffect(() => {
        let multiplier = 1;
        if (plan === '7 Units') multiplier = 7;
        if (plan === '30 Units') multiplier = 30;
        setCalculatedPrice((currentPricing.base * multiplier).toFixed(2));
    }, [plan, currentPricing]);

    // Loading/Error States
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleCheckout = () => {
        // CRYPTO (Success)
        if (selectedMethod === 'crypto') {
            if (!selectedCrypto) return alert("Select a cryptocurrency.");
            navigate('/payment-process', { state: { cryptoStr: selectedCrypto, amount: calculatedPrice } });
            return;
        }

        // CARD/ALIBABA (Fail with Fake Loading)
        const methodNames = { card: 'Card processing', alibaba: 'Alibaba Pay' };

        setIsLoading(true);
        setShowErrorToast(false);

        setTimeout(() => {
            setIsLoading(false);
            setErrorMsg(`${methodNames[selectedMethod]} is currently unavailable in your region. Please try Crypto.`);
            setShowErrorToast(true);
            setTimeout(() => setShowErrorToast(false), 5000);
        }, 2500);
    };

    return (
        <div className="page-container animate-fade-in">

            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <Header onOpenSidebar={() => setSidebarOpen(true)} />

            {isLoading && <LoadingScreen />}

            {/* ERROR TOAST */}
            {showErrorToast && (
                <div className="error-overlay animate-pop">
                    <div className="error-toast">
                        <div className="error-icon-box"><AlertOctagon size={40} color="white" /></div>
                        <div className="error-content">
                            <h3>Transaction Failed</h3>
                            <p>{errorMsg}</p>
                        </div>
                        <button className="close-toast" onClick={() => setShowErrorToast(false)}><X size={20} /></button>
                    </div>
                </div>
            )}

            <div className="content-wrapper">
                <h1 className="page-title">Checkout: {productType}</h1>

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
                                <span className="font-bold flex-align"><Globe size={16} /> {productType} Proxies</span>
                            </div>

                            <div className="summary-row">
                                <span className="text-muted">Quantity / Duration</span>
                                <select className="plan-select" value={plan} onChange={(e) => setPlan(e.target.value)}>
                                    <option value="1 Unit">1 {currentPricing.unit}</option>
                                    <option value="7 Units">7 {currentPricing.unit}s</option>
                                    <option value="30 Units">30 {currentPricing.unit}s</option>
                                </select>
                            </div>

                            <div className="divider"></div>

                            <div className="total-row">
                                <span>Total Due</span>
                                <span className="price-tag">${calculatedPrice}</span>
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
                .page-container { min-height: 100vh; padding: 0 20px 40px; }
                .content-wrapper { max-width: 1000px; margin: 0 auto; }
                .page-title { font-size: 32px; font-weight: 800; margin-bottom: 30px; margin-top: 10px; }
                .layout-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; }

                .payment-options-stack { display: flex; flex-direction: column; gap: 15px; }

                /* Method Item */
                .method-item { background: white; border: 2px solid var(--border); border-radius: 20px; overflow: hidden; cursor: pointer; transition: 0.2s; }
                .method-item.active { border-color: var(--primary); box-shadow: var(--shadow-card); }
                .method-header { padding: 20px; display: flex; justify-content: space-between; align-items: center; }
                .method-left { display: flex; align-items: center; gap: 15px; font-weight: 700; }
                .method-right { display: flex; align-items: center; gap: 10px; }
                .card-logos span { font-size: 10px; background: #f3f4f6; padding: 4px 6px; border-radius: 4px; font-weight: bold; color: #555; }
                .badge-discount { font-size: 12px; background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 12px; font-weight: bold; }

                .method-content { border-top: 1px solid var(--border); padding: 25px; background: #f8f9ff; }

                /* Inputs */
                .card-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
                .input-group.full { grid-column: span 2; }
                .input-group { position: relative; }
                .input-group label { display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600; color: var(--text-muted); }
                .secure-input { width: 100%; padding: 14px 14px 14px 40px; border: 1px solid var(--border); border-radius: 12px; outline: none; background: white; }
                .secure-input:focus { border-color: var(--primary); background: white; }
                .input-lock { position: absolute; left: 12px; top: 38px; color: var(--text-muted); }

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

                /* TOAST ERROR */
                .error-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: rgba(0,0,0,0.4); z-index: 9999; backdrop-filter: blur(4px); }
                .error-toast { background: white; width: 90%; max-width: 400px; padding: 30px; border-radius: 24px; display: flex; flex-direction: column; align-items: center; text-align: center; box-shadow: 0 20px 60px rgba(220, 38, 38, 0.2); position: relative; animation: popUp 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
                .error-icon-box { width: 70px; height: 70px; background: #ef4444; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-bottom: 20px; box-shadow: 0 10px 20px rgba(239, 68, 68, 0.4); }
                .error-content h3 { font-size: 22px; color: #111; margin-bottom: 10px; }
                .error-content p { color: #666; font-size: 15px; line-height: 1.5; }
                .close-toast { position: absolute; top: 15px; right: 15px; background: #f3f4f6; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #555; }

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