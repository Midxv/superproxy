// src/pages/PaymentProcessPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Copy, CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const PaymentProcessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const { cryptoStr = 'LTC', amount = '10.62' } = location.state || {};

    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [copied, setCopied] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    // Mock Addresses
    const addresses = {
        BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        ETH: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        USDT: 'TZ4UXy7P52v22333222111133332222111',
        LTC: 'ltc1qg97t7555555555566666666777777778888888'
    };
    const currentAddress = addresses[cryptoStr] || addresses.LTC;

    useEffect(() => {
        if (timeLeft <= 0) return;
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (timeLeft / 300) * circumference;

    const handleCopy = () => {
        navigator.clipboard.writeText(currentAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const confirmCancel = () => {
        navigate('/order');
    };

    return (
        <div className="payment-page-container animate-fade-in">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <Header onOpenSidebar={() => setSidebarOpen(true)} />

            {/* CANCEL MODAL */}
            {showCancelConfirm && (
                <div className="modal-overlay animate-pop">
                    <div className="confirm-card">
                        <AlertOctagon size={48} color="#ef4444" style={{marginBottom: '15px'}} />
                        <h3>Cancel Payment?</h3>
                        <p>If you have already sent funds, they may be lost if you cancel now.</p>
                        <div className="modal-actions">
                            <button className="btn-stay" onClick={() => setShowCancelConfirm(false)}>No, Go Back</button>
                            <button className="btn-leave" onClick={confirmCancel}>Yes, Cancel Order</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="payment-card-authentic">

                <div className="payment-header">
                    <h2>Awaiting Payment</h2>
                    <p>Please send exactly <strong>${amount}</strong> worth of <strong>{cryptoStr}</strong>.</p>
                </div>

                {/* TIMER ONLY - NO QR */}
                <div className="timer-container">
                    <svg className="timer-svg" width="260" height="260" viewBox="0 0 260 260">
                        <circle className="timer-bg" cx="130" cy="130" r={radius} strokeWidth="12" />
                        <circle
                            className="timer-progress" cx="130" cy="130" r={radius} strokeWidth="12"
                            strokeDasharray={circumference}
                            strokeDashoffset={progressOffset}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="timer-center-content">
                        <span className="time-text">{formatTime(timeLeft)}</span>
                        <span className="status-text">Time Remaining</span>
                    </div>
                </div>

                <div className="address-section">
                    <label>Send {cryptoStr} to this address:</label>
                    <div className="address-box" onClick={handleCopy}>
                        <span className="crypto-address">{currentAddress}</span>
                        <button className="btn-copy">
                            {copied ? <CheckCircle size={20} color="#00b67a" /> : <Copy size={20} />}
                        </button>
                    </div>
                </div>

                <div className="warning-box">
                    <AlertTriangle size={24} color="#f59e0b" />
                    <div>
                        <strong>Do not close this window.</strong>
                        <p>Payment will process automatically once confirmed on the blockchain.</p>
                    </div>
                </div>

                <button className="btn-cancel" onClick={() => setShowCancelConfirm(true)}>Cancel Order</button>

            </div>

            <style jsx>{`
                .payment-page-container {
                    min-height: 100vh;
                    padding: 0 20px 40px; background: var(--bg-main);
                    display: flex; flex-direction: column; align-items: center;
                }
                .payment-card-authentic {
                    background: white; width: 100%; max-width: 500px; margin-top: 20px;
                    padding: 40px; border-radius: 30px; text-align: center;
                    box-shadow: var(--shadow-card); border: 1px solid var(--border);
                }
                .payment-header h2 { font-size: 28px; margin-bottom: 10px; color: var(--primary); }
                .payment-header p { color: var(--text-muted); margin-bottom: 30px; }

                .timer-container { position: relative; width: 260px; height: 260px; margin: 0 auto 40px; }
                .timer-svg { transform: rotate(-90deg); }
                .timer-bg { fill: none; stroke: #f3f4f6; }
                .timer-progress { fill: none; stroke: var(--primary); transition: stroke-dashoffset 1s linear; }
                .timer-center-content {
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    display: flex; flex-direction: column; justify-content: center; align-items: center;
                }
                .time-text { font-size: 56px; font-weight: 800; color: var(--text-main); line-height: 1; }
                .status-text { font-size: 14px; color: var(--text-muted); margin-top: 5px; font-weight: 600; }

                .address-section label { display: block; text-align: left; margin-bottom: 10px; font-weight: 600; color: var(--text-muted); }
                .address-box {
                    background: #f9fafb; border: 2px solid var(--border); padding: 15px;
                    border-radius: 16px; display: flex; justify-content: space-between; align-items: center;
                    cursor: pointer; transition: 0.2s;
                }
                .address-box:hover { border-color: var(--primary); background: #f5f3ff; }
                .crypto-address { font-family: monospace; font-size: 14px; word-break: break-all; text-align: left; color: var(--text-main); }
                .btn-copy { background: none; border: none; color: var(--text-muted); cursor: pointer; }

                .warning-box {
                    background: #fffbeb; border: 1px solid #fcd34d; padding: 20px; border-radius: 16px;
                    display: flex; gap: 15px; text-align: left; margin: 30px 0; align-items: flex-start;
                }
                .warning-box strong { color: #92400e; display: block; margin-bottom: 5px; }
                .warning-box p { margin: 0; color: #b45309; font-size: 13px; }

                .btn-cancel { background: none; border: none; color: var(--text-muted); cursor: pointer; font-weight: 600; transition: 0.2s; }
                .btn-cancel:hover { color: #ef4444; }

                /* MODAL CSS */
                .modal-overlay {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
                    display: flex; justify-content: center; align-items: center; z-index: 1000;
                }
                .confirm-card {
                    background: white; padding: 30px; border-radius: 24px; text-align: center;
                    max-width: 350px; width: 90%; box-shadow: 0 20px 50px rgba(0,0,0,0.2);
                }
                .confirm-card h3 { margin: 0 0 10px 0; font-size: 22px; color: #111; }
                .confirm-card p { color: #666; font-size: 14px; margin-bottom: 25px; line-height: 1.5; }
                .modal-actions { display: flex; gap: 10px; }
                .btn-stay { flex: 1; padding: 12px; border: 1px solid #ddd; background: white; border-radius: 12px; font-weight: 600; cursor: pointer; }
                .btn-leave { flex: 1; padding: 12px; background: #ef4444; color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; }

                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                .animate-pop { animation: popUp 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
                @keyframes fadeIn { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); }}
                @keyframes popUp { from { opacity:0; transform: scale(0.8); } to { opacity:1; transform: scale(1); }}
            `}</style>
        </div>
    );
};

export default PaymentProcessPage;