// src/pages/AddFundsPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Bitcoin, ShieldCheck, Lock, AlertOctagon, X } from 'lucide-react';
import LoadingScreen from '../components/LoadingScreen'; // Re-use your loader

// Crypto Options Data
const cryptoOptions = [
    { id: 'BTC', name: 'Bitcoin', color: '#f7931a' },
    { id: 'ETH', name: 'Ethereum', color: '#627eea' },
    { id: 'USDT', name: 'Tether (TRC20)', color: '#26a17b' },
    { id: 'LTC', name: 'Litecoin', color: '#345d9d' },
];

const AddFundsPage = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('50.00'); // Default amount
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [selectedCrypto, setSelectedCrypto] = useState(null);

    // States for the Alibaba "Fake Process"
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);

    const handlePayment = () => {
        if (selectedMethod === 'alibaba') {
            // 1. Start Loading
            setIsLoading(true);
            setShowErrorToast(false);

            // 2. Wait 2 seconds (simulate check), then show error
            setTimeout(() => {
                setIsLoading(false);
                setShowErrorToast(true);
                // Auto-hide toast after 5 seconds if they don't close it
                setTimeout(() => setShowErrorToast(false), 5000);
            }, 2000);
            return;
        }

        if (selectedMethod === 'crypto') {
            if (!selectedCrypto) {
                alert("Please select a cryptocurrency.");
                return;
            }
            navigate('/payment-process', { state: { cryptoStr: selectedCrypto, amount: amount } });
            return;
        }

        // Card Logic
        alert(`Processing Card Payment for $${amount}...`);
    };

    return (
        <div className="page-container animate-fade-in">

            {/* LOCAL LOADER (Only shows when paying) */}
            {isLoading && <LoadingScreen />}

            {/* ERROR TOAST (Big Red Box) */}
            {showErrorToast && (
                <div className="error-overlay animate-pop">
                    <div className="error-toast">
                        <div className="error-icon-box">
                            <AlertOctagon size={40} color="white" />
                        </div>
                        <div className="error-content">
                            <h3>Payment Failed</h3>
                            <p>Alibaba Pay is not available in your region. Please use a different method.</p>
                        </div>
                        <button className="close-toast" onClick={() => setShowErrorToast(false)}>
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}

            <div className="content-wrapper">
                <h1 className="page-title">Add Funds</h1>

                <div className="layout-grid">

                    {/* === LEFT: Payment Selection === */}
                    <div className="left-section">
                        <h3 className="section-header">Select Payment Method</h3>

                        <div className="payment-options-stack">

                            {/* Card */}
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

                            {/* Crypto */}
                            <PaymentMethodItem
                                active={selectedMethod === 'crypto'}
                                onClick={() => setSelectedMethod('crypto')}
                                icon={<Bitcoin className="icon-gold" />}
                                title="Cryptocurrency"
                                badge="-5% Fees"
                            >
                                <div className="method-expanded-content animate-slide-down">
                                    <p style={{marginBottom: '15px', fontSize:'14px', color:'var(--text-muted)'}}>Select coin:</p>
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
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </PaymentMethodItem>

                            {/* Alibaba (The Trigger) */}
                            <PaymentMethodItem
                                active={selectedMethod === 'alibaba'}
                                onClick={() => setSelectedMethod('alibaba')}
                                icon={<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="icon-orange"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>}
                                title="Alibaba / Alipay"
                            />

                        </div>
                    </div>

                    {/* === RIGHT: Amount Summary === */}
                    <div className="right-section">
                        <div className="summary-card">
                            <h3>Deposit Amount</h3>

                            <div className="amount-input-box">
                                <span className="currency-symbol">$</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="big-amount-input"
                                />
                            </div>

                            <div className="quick-amounts">
                                {['25', '50', '100', '500'].map(val => (
                                    <div key={val} className="chip" onClick={() => setAmount(val + '.00')}>${val}</div>
                                ))}
                            </div>

                            <div className="divider"></div>

                            <div className="total-row">
                                <span>Total to Pay</span>
                                <span className="price-tag">${amount}</span>
                            </div>

                            <button className="btn-checkout" onClick={handlePayment}>
                                {selectedMethod === 'alibaba' ? 'Proceed to Alipay' : 'Add Funds Now'}
                            </button>

                            <div className="secure-footer">
                                <ShieldCheck size={16} /> Secure 256-bit SSL Payment
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
        /* Reuse styles from OrderPage + New styles */
        .page-container { min-height: 100vh; padding: 40px 20px; background: var(--bg-main); }
        .content-wrapper { max-width: 1000px; margin: 0 auto; }
        .page-title { font-size: 32px; margin-bottom: 30px; color: var(--text-main); font-weight: 800; }
        .layout-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; }
        
        .section-header { margin-bottom: 20px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; font-size: 13px; letter-spacing: 1px; }
        .payment-options-stack { display: flex; flex-direction: column; gap: 15px; }

        /* Payment Item */
        .payment-method-item {
          background: white; border: 2px solid var(--border); border-radius: 20px;
          overflow: hidden; transition: all 0.2s; cursor: pointer;
        }
        .payment-method-item.active { border-color: var(--primary); box-shadow: var(--shadow-card); }
        
        .method-header { padding: 20px; display: flex; align-items: center; justify-content: space-between; }
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

        .method-expanded-content { border-top: 1px solid var(--border); padding: 25px; background: #f8f9ff; }
        
        /* Forms */
        .card-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .input-group.full { grid-column: span 2; }
        .input-group label { display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600; color: var(--text-muted); }
        .input-group { position: relative; }
        .secure-input {
          width: 100%; padding: 12px 15px 12px 40px; border: 1px solid var(--border); border-radius: 12px;
          outline: none; font-size: 15px; background: white;
        }
        .input-lock-icon { position: absolute; left: 12px; top: 38px; color: var(--text-muted); }

        .crypto-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .crypto-option {
          background: white; border: 2px solid var(--border); padding: 12px; border-radius: 12px;
          display: flex; align-items: center; gap: 10px; cursor: pointer;
        }
        .crypto-option.selected { border-color: var(--primary); background: #f5f3ff; }
        .coin-icon { width: 24px; height: 24px; border-radius: 50%; color: white; display: flex; justify-content: center; align-items: center; font-size: 10px; font-weight: bold; }
        .coin-name { font-weight: 600; font-size: 14px; }

        /* Right Summary */
        .summary-card {
          background: white; padding: 30px; border-radius: 30px;
          box-shadow: var(--shadow-hover); border: 1px solid white; position: sticky; top: 30px;
        }
        
        /* Amount Input */
        .amount-input-box {
          display: flex; align-items: center; background: #f8f9ff;
          border: 2px solid var(--border); border-radius: 16px; padding: 10px 20px;
          margin-bottom: 15px;
        }
        .currency-symbol { font-size: 32px; font-weight: 700; color: var(--text-main); }
        .big-amount-input {
          width: 100%; border: none; background: transparent; outline: none;
          font-size: 36px; font-weight: 800; color: var(--primary); margin-left: 5px;
        }
        
        .quick-amounts { display: flex; gap: 10px; margin-bottom: 25px; }
        .chip {
          padding: 8px 16px; background: white; border: 1px solid var(--border);
          border-radius: 20px; font-weight: 600; cursor: pointer; transition: 0.2s;
        }
        .chip:hover { border-color: var(--primary); color: var(--primary); }

        .divider { height: 1px; background: var(--border); margin: 25px 0; }
        .total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .price-tag { font-size: 32px; font-weight: 800; color: var(--primary); }

        .btn-checkout {
          width: 100%; padding: 18px; border: none; border-radius: 16px;
          background: var(--primary); color: white; font-weight: 700; font-size: 18px;
          cursor: pointer; transition: 0.2s; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
        }
        .btn-checkout:hover { background: var(--primary-hover); transform: translateY(-2px); }
        
        .secure-footer { margin-top: 20px; display: flex; justify-content: center; align-items: center; gap: 8px; color: var(--text-muted); font-size: 13px; }

        /* TOAST ERROR */
        .error-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          display: flex; justify-content: center; align-items: center;
          background: rgba(0,0,0,0.4); z-index: 9999; backdrop-filter: blur(4px);
        }
        .error-toast {
          background: white; width: 90%; max-width: 400px;
          padding: 30px; border-radius: 24px;
          display: flex; flex-direction: column; align-items: center; text-align: center;
          box-shadow: 0 20px 60px rgba(220, 38, 38, 0.2); position: relative;
          animation: popUp 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        .error-icon-box {
          width: 70px; height: 70px; background: #ef4444; border-radius: 50%;
          display: flex; justify-content: center; align-items: center;
          margin-bottom: 20px; box-shadow: 0 10px 20px rgba(239, 68, 68, 0.4);
        }
        .error-content h3 { font-size: 22px; color: #111; margin-bottom: 10px; }
        .error-content p { color: #666; font-size: 15px; line-height: 1.5; }
        .close-toast {
          position: absolute; top: 15px; right: 15px; background: #f3f4f6;
          border: none; width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #555;
        }

        .icon-violet { color: var(--primary); } .icon-gold { color: #f59e0b; } .icon-orange { color: #f97316; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        .animate-slide-down { animation: slideDown 0.3s ease-out; }
        .animate-pop { animation: popUp 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28); }

        @keyframes fadeIn { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); }}
        @keyframes slideDown { from { opacity:0; transform: translateY(-10px); height: 0; } to { opacity:1; transform: translateY(0); height: auto; }}
        @keyframes popUp { from { opacity:0; transform: scale(0.8); } to { opacity:1; transform: scale(1); }}
        
        @media (max-width: 900px) { .layout-grid { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
};

// Helper Component (Same as OrderPage)
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
            </div>
        </div>
        {active && children}
    </div>
);

export default AddFundsPage;