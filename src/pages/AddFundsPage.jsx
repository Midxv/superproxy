// src/pages/AddFundsPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Bitcoin, ShieldCheck, Lock, AlertOctagon, X, Globe, ChevronDown, Check } from 'lucide-react';
import LoadingScreen from '../components/LoadingScreen';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

// --- CRYPTO SVGS ---
const BTCLogo = () => (<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#F7931A"/><path d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.766c-.453-.113-.919-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.255l.002-.006-2.384-.596-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.024.18.047-.058-.014-.119-.029-.17-.042l-1.13 4.533c-.085.212-.3.53-.784.41l-1.257-.313-.892 2.057 2.248.56c.418.105.828.215 1.232.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.701 2.813 1.728.43.716-2.873c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.404-1.597-4.213 1.137-.263 1.992-1.013 2.222-2.563zm-3.985 5.602c-.541 2.172-4.205.998-5.392.703l.962-3.86c1.187.295 5.013 0.877 4.43 3.157zm.541-5.636c-.495 1.985-3.547 0.976-4.535.73l.872-3.5c.988.246 3.913.703 3.663 2.77z" fill="white"/></svg>);
const ETHLogo = () => (<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#627EEA"/><path d="M16.498 4v8.87l8.127 3.665L16.498 4z" fill="white" fillOpacity=".602"/><path d="M16.498 4L8.372 16.535l8.126-3.665V4z" fill="white"/><path d="M16.498 20.956l8.127-4.713-8.127 3.665v1.048z" fill="white" fillOpacity=".602"/><path d="M16.498 28V20.956l-8.126-4.713L16.498 28z" fill="white"/><path d="M16.498 19.907l8.127-4.713-8.127-3.665v8.378z" fill="white" fillOpacity=".2"/><path d="M8.372 15.194l8.126 4.713V11.53l-8.126 3.664z" fill="white" fillOpacity=".602"/></svg>);
const LTCLogo = () => (<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#345D9D"/><path d="M23.813 18.496l-1.838.71-2.07 8.29H9.96l4.588-18.364-3.321-1.283 1.167-4.665 4.197 1.621 1.23 4.922 3.749 1.448-1.167 4.666-3.982-1.538-1.748 6.997h6.498l1.735-6.944 2.32.896-1.414 3.245z" fill="white"/></svg>);
const USDTLogo = () => (<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#26A17B"/><path d="M18.657 17.757c0 1.302-.67 2.53-1.794 3.487-1.126.958-2.707 1.537-4.419 1.537-1.712 0-3.293-.58-4.42-1.537-1.125-.957-1.794-2.185-1.794-3.487h-.175V26h12.782v-8.243h-.18zm-6.213-3.935c1.062 0 2.06.344 2.87.93.81.587 1.324 1.386 1.324 2.26 0 .873-.514 1.672-1.324 2.26-.81.585-1.808.93-2.87.93-1.062 0-2.06-.345-2.87-.93-.81-.588-1.324-1.387-1.324-2.26 0-.874.514-1.673 1.324-2.26.81-.586 1.808-.93 2.87-.93zm6.398.93V10H26V6H6v4h7.157v4.752c1.125-.957 2.708-1.537 4.419-1.537 1.712 0 3.294.58 4.42 1.537V14.752z" fill="white"/></svg>);

const cryptoOptions = [
    { id: 'BTC', name: 'Bitcoin', icon: <BTCLogo />, color: '#f7931a' },
    { id: 'ETH', name: 'Ethereum', icon: <ETHLogo />, color: '#627eea' },
    { id: 'LTC', name: 'Litecoin', icon: <LTCLogo />, color: '#345d9d' },
    { id: 'USDT', name: 'Tether', icon: <USDTLogo />, color: '#26a17b' },
];

const AddFundsPage = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('50.00');
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handlePayment = () => {
        // 1. Minimum Limit Check
        if (parseFloat(amount) < 25) {
            alert("Minimum deposit amount is $25.00");
            return;
        }

        if (selectedMethod === 'crypto') {
            if (!selectedCrypto) return alert("Please select a cryptocurrency.");
            navigate('/payment-process', { state: { cryptoStr: selectedCrypto.id, amount: amount } });
            return;
        }

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
                <h1 className="page-title">Add Funds</h1>

                <div className="layout-grid-swapped">

                    {/* Summary Left */}
                    <div className="left-summary-section">
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

                            {/* MINIMUM LIMIT WARNING */}
                            {parseFloat(amount) < 25 && (
                                <p className="min-warning">Minimum deposit amount is $25.00</p>
                            )}

                            <div className="quick-amounts">
                                {['25', '50', '100', '500'].map(val => (
                                    <div key={val} className="chip" onClick={() => setAmount(val + '.00')}>${val}</div>
                                ))}
                            </div>
                            <div className="divider"></div>
                            <div className="total-row"><span>Total to Pay</span><span className="price-tag">${amount}</span></div>
                            <button className="btn-checkout" onClick={handlePayment}>
                                {selectedMethod === 'alibaba' ? 'Proceed to Alipay' :
                                    selectedMethod === 'card' ? 'Pay with Card' : 'Add Funds Now'}
                            </button>
                            <div className="secure-footer"><ShieldCheck size={16} /> Secure 256-bit SSL Payment</div>
                        </div>
                    </div>

                    {/* Methods Right */}
                    <div className="right-methods-section">
                        <h3 className="section-header">Select Payment Method</h3>
                        <div className="payment-options-stack">

                            {/* Card */}
                            <MethodItem
                                active={selectedMethod === 'card'}
                                onClick={() => setSelectedMethod('card')}
                                icon={<CreditCard className="icon-violet" />}
                                title="Cards"
                            >
                                <div className="method-expanded-content animate-slide-down">
                                    <div className="card-form-grid">
                                        <div className="input-group full">
                                            <label>Card Number</label>
                                            <input type="text" name="cc-number" autoComplete="cc-number" className="secure-input" />
                                            <Lock size={16} className="input-lock-icon" />
                                        </div>
                                        <div className="input-group">
                                            <label>Expiry</label>
                                            <input type="text" name="cc-exp" autoComplete="cc-exp" className="secure-input" />
                                        </div>
                                        <div className="input-group">
                                            <label>CVC</label>
                                            <input type="text" name="cc-csc" autoComplete="cc-csc" className="secure-input" />
                                        </div>
                                    </div>
                                    <div className="card-logos-row">
                                        <p className="label-sm">Supported Cards:</p>
                                        <div className="logos-flex">
                                            <svg viewBox="0 0 48 48" height="24"><path fill="#1A1F71" d="M35.3 16.1h4.9l-3.1 19.1h-4.9l3.1-19.1zM21.5 16.1h5.1l-3.2 19.1h-5.1l3.2-19.1zM15.4 16.1h-5c-.3 0-.6.1-.7.4l-3.7 19.1H11l5.4-13.4 1.1 5.3 1 4.5 1.7 3.6h5.3l-8.1-19.5zM47.7 16.1h-2.9c-.8 0-1.5.3-1.8 1.1l-6.3 15.1-2.2-10.7c-.4-1.5-1.5-2.5-3.1-2.5h-5.2l.3 1.5c1.4.3 2.7 1.1 3.5 2.1l3.1 11.8 5.2 12.3h5.4l8.3-19.5c.3-1.3-.5-1.2-4.3-1.2z"/></svg>
                                            <svg viewBox="0 0 48 48" height="24"><g fill="none" fillRule="evenodd"><circle cx="16" cy="24" r="16" fill="#EA001B"/><circle cx="32" cy="24" r="16" fill="#FFA200" fillOpacity=".8"/></g></svg>
                                            <svg viewBox="0 0 48 48" height="24"><path fill="#0079BE" d="M10 24a14 14 0 1 1 28 0 14 14 0 0 1-28 0zm14-10a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/></svg>
                                        </div>
                                    </div>
                                </div>
                            </MethodItem>

                            {/* Crypto with SVGs */}
                            <MethodItem
                                active={selectedMethod === 'crypto'}
                                onClick={() => setSelectedMethod('crypto')}
                                icon={<Bitcoin className="icon-gold" />}
                                title="Cryptocurrency"
                                badge="-5% Fees"
                            >
                                <div className="method-expanded-content animate-slide-down">
                                    <p className="label-sm">Select coin:</p>
                                    <div className="modern-crypto-grid">
                                        {cryptoOptions.map(coin => (
                                            <div
                                                key={coin.id}
                                                className={`crypto-selection-card ${selectedCrypto?.id === coin.id ? 'active' : ''}`}
                                                onClick={(e) => { e.stopPropagation(); setSelectedCrypto(coin); }}
                                                style={{'--highlight-color': coin.color}}
                                            >
                                                <div className="coin-logo-container">{coin.icon}</div>
                                                <div className="coin-info">
                                                    <span className="coin-name">{coin.name}</span>
                                                    <span className="coin-ticker">{coin.id}</span>
                                                </div>
                                                {selectedCrypto?.id === coin.id && (
                                                    <div className="active-check"><Check size={18} strokeWidth={3} /></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </MethodItem>

                            <MethodItem
                                active={selectedMethod === 'alibaba'}
                                onClick={() => setSelectedMethod('alibaba')}
                                title="Alibaba / Alipay"
                                icon={<Globe className="icon-orange" />}
                            />

                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .page-container { min-height: 100vh; padding: 0 20px 40px; }
                .content-wrapper { max-width: 1000px; margin: 0 auto; }
                .page-title { font-size: 32px; margin-bottom: 30px; color: var(--text-main); font-weight: 800; }
                .layout-grid-swapped { display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; }
                .section-header { margin-bottom: 20px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; font-size: 13px; letter-spacing: 1px; }
                .payment-options-stack { display: flex; flex-direction: column; gap: 15px; }

                .method-item { background: white; border: 2px solid var(--border); border-radius: 20px; overflow: hidden; transition: all 0.2s; cursor: pointer; }
                .method-item.active { border-color: var(--primary); box-shadow: var(--shadow-card); }
                .method-header { padding: 20px; display: flex; align-items: center; justify-content: space-between; }
                .method-left { display: flex; align-items: center; gap: 15px; font-weight: 700; }
                .method-right { display: flex; align-items: center; gap: 10px; }
                .badge-discount { font-size: 12px; background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 12px; font-weight: bold; }

                .method-expanded-content { border-top: 1px solid var(--border); padding: 25px; background: #f8f9ff; }
                .card-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
                .input-group.full { grid-column: span 2; }
                .input-group { position: relative; }
                .input-group label { display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600; color: var(--text-muted); }
                .secure-input { width: 100%; padding: 14px 14px 14px 40px; border: 1px solid var(--border); border-radius: 12px; outline: none; background: white; }
                .secure-input:focus { border-color: var(--primary); background: white; }
                .input-lock-icon { position: absolute; left: 12px; top: 38px; color: var(--text-muted); }
                .card-logos-row { margin-top: 20px; border-top: 1px solid #e5e7eb; padding-top: 15px; }
                .label-sm { font-size: 12px; font-weight: 600; color: #888; margin-bottom: 12px; display: block; }
                .logos-flex { display: flex; gap: 15px; }

                .modern-crypto-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 15px; }
                .crypto-selection-card { background: white; border: 2px solid var(--border); border-radius: 16px; padding: 15px; display: flex; flex-direction: column; align-items: center; text-align: center; cursor: pointer; transition: all 0.2s ease; position: relative; }
                .crypto-selection-card:hover { border-color: #d1d5db; transform: translateY(-2px); }
                .crypto-selection-card.active { border-color: var(--highlight-color); background: #fff; box-shadow: 0 8px 20px -5px var(--highlight-color-soft, rgba(0,0,0,0.1)); }
                .coin-logo-container { margin-bottom: 10px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); transition: 0.2s; }
                .crypto-selection-card.active .coin-logo-container { transform: scale(1.1); }
                .coin-info { display: flex; flex-direction: column; }
                .coin-name { font-weight: 700; font-size: 14px; color: var(--text-main); }
                .coin-ticker { font-size: 12px; color: var(--text-muted); font-weight: 600; }
                .active-check { position: absolute; top: 10px; right: 10px; width: 24px; height: 24px; background: var(--highlight-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }

                .summary-card { background: white; padding: 30px; border-radius: 30px; box-shadow: var(--shadow-hover); border: 1px solid white; position: sticky; top: 30px; }
                .amount-input-box { display: flex; align-items: center; background: #f8f9ff; border: 2px solid var(--border); border-radius: 16px; padding: 10px 20px; margin-bottom: 10px; }
                .currency-symbol { font-size: 32px; font-weight: 700; color: var(--text-main); }
                .big-amount-input { width: 100%; border: none; background: transparent; outline: none; font-size: 36px; font-weight: 800; color: var(--primary); margin-left: 5px; }
                .min-warning { color: #ef4444; font-size: 13px; font-weight: 700; margin-bottom: 15px; }
                .quick-amounts { display: flex; gap: 10px; margin-bottom: 25px; }
                .chip { padding: 8px 16px; background: white; border: 1px solid var(--border); border-radius: 20px; font-weight: 600; cursor: pointer; transition: 0.2s; }
                .chip:hover { border-color: var(--primary); color: var(--primary); }
                .divider { height: 1px; background: var(--border); margin: 25px 0; }
                .total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .price-tag { font-size: 32px; font-weight: 800; color: var(--primary); }
                .btn-checkout { width: 100%; padding: 18px; border: none; border-radius: 16px; background: var(--primary); color: white; font-weight: 700; font-size: 18px; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3); }
                .btn-checkout:hover { background: var(--primary-hover); transform: translateY(-2px); }
                .secure-footer { margin-top: 20px; display: flex; justify-content: center; gap: 8px; color: var(--text-muted); font-size: 13px; }

                .error-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: rgba(0,0,0,0.4); z-index: 9999; backdrop-filter: blur(4px); }
                .error-toast { background: white; width: 90%; max-width: 400px; padding: 30px; border-radius: 24px; display: flex; flex-direction: column; align-items: center; text-align: center; box-shadow: 0 20px 60px rgba(220, 38, 38, 0.2); position: relative; animation: popUp 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
                .error-icon-box { width: 70px; height: 70px; background: #ef4444; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-bottom: 20px; box-shadow: 0 10px 20px rgba(239, 68, 68, 0.4); }
                .error-content h3 { font-size: 22px; color: #111; margin-bottom: 10px; }
                .error-content p { color: #666; font-size: 15px; line-height: 1.5; }
                .close-toast { position: absolute; top: 15px; right: 15px; background: #f3f4f6; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #555; }

                .icon-violet { color: var(--primary); } .icon-gold { color: #f59e0b; } .icon-orange { color: #f97316; }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                .animate-slide-down { animation: slideDown 0.3s ease-out; }
                .animate-pop { animation: popUp 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
                @keyframes fadeIn { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); }}
                @keyframes slideDown { from { opacity:0; transform: translateY(-10px); height: 0; } to { opacity:1; transform: translateY(0); height: auto; }}
                @keyframes popUp { from { opacity:0; transform: scale(0.8); } to { opacity:1; transform: scale(1); }}
                @media (max-width: 900px) { .layout-grid-swapped { grid-template-columns: 1fr; } .summary-card { position: static; } }
            `}</style>
        </div>
    );
};

// Helper
const MethodItem = ({ active, onClick, icon, title, logos, badge, children }) => (
    <div className={`method-item ${active ? 'active' : ''}`} onClick={onClick}>
        <div className="method-header">
            <div className="method-left">
                <div className="radio-circle">{active && <div className="radio-inner" />}</div>
                {icon}
                <span className="method-title">{title}</span>
            </div>
            <div className="method-right flex gap-2 items-center">
                {badge && <span className="badge-discount">{badge}</span>}
            </div>
        </div>
        {active && children}
    </div>
);

export default AddFundsPage;