import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Copy, CheckCircle, AlertTriangle, QrCode, Clock } from 'lucide-react';

const PaymentProcessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get data passed from Order Page (default to LTC if accessed directly)
    const { cryptoStr = 'LTC', amount = '10.62' } = location.state || {};

    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [showQR, setShowQR] = useState(false);
    const [copied, setCopied] = useState(false);

    // Mock Addresses
    const addresses = {
        BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        ETH: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        USDT: 'TZ4UXy7P52v22333222111133332222111', // TRC20 example
        LTC: 'ltc1qg97t7555555555566666666777777778888888'
    };
    const currentAddress = addresses[cryptoStr] || addresses.LTC;

    // Timer Logic
    useEffect(() => {
        if (timeLeft <= 0) return;
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    // Format time (MM:SS)
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // SVG Circle math for progress bar
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (timeLeft / 300) * circumference;

    const handleCopy = () => {
        navigator.clipboard.writeText(currentAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="payment-page-container animate-fade-in">
            <div className="payment-card-authentic">

                {/* Header */}
                <div className="payment-header">
                    <h2>Awaiting Payment</h2>
                    <p>Please send exactly <strong>${amount}</strong> worth of <strong>{cryptoStr}</strong>.</p>
                </div>

                {/* THE BIG CIRCLE TIMER / QR TOGGLE */}
                <div className="timer-container" onClick={() => setShowQR(!showQR)}>

                    {/* SVG Progress Circle background */}
                    <svg className="timer-svg" width="260" height="260" viewBox="0 0 260 260">
                        <circle className="timer-bg" cx="130" cy="130" r={radius} strokeWidth="12" />
                        <circle
                            className="timer-progress" cx="130" cy="130" r={radius} strokeWidth="12"
                            strokeDasharray={circumference}
                            strokeDashoffset={progressOffset}
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Center Content (Timer or QR) */}
                    <div className="timer-center-content">
                        {showQR ? (
                            <div className="qr-view animate-pop">
                                {/* Placeholder for real QR Code gen */}
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${currentAddress}`} alt="QR" style={{borderRadius: '12px'}}/>
                                <span style={{fontSize:'12px', marginTop:'10px', color: 'var(--text-muted)', display:'flex', alignItems:'center', gap:'5px'}}>
                  <Clock size={14}/> Click to see timer
                </span>
                            </div>
                        ) : (
                            <div className="time-view animate-pop">
                                <span className="time-text">{formatTime(timeLeft)}</span>
                                <span style={{fontSize:'12px', marginTop:'5px', color: 'var(--text-muted)', display:'flex', alignItems:'center', gap:'5px'}}>
                  <QrCode size={14}/> Click to see QR code
                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Address Section */}
                <div className="address-section">
                    <label>Send {cryptoStr} to this address:</label>
                    <div className="address-box" onClick={handleCopy}>
                        <span className="crypto-address">{currentAddress}</span>
                        <button className="btn-copy">
                            {copied ? <CheckCircle size={20} color="#00b67a" /> : <Copy size={20} />}
                        </button>
                    </div>
                </div>

                {/* Authentic Warning */}
                <div className="warning-box">
                    <AlertTriangle size={24} color="#f59e0b" />
                    <div>
                        <strong>Do not close this window.</strong>
                        <p>Payment will automatically process once completed on the blockchain. This usually takes 1-15 minutes.</p>
                    </div>
                </div>

                <button className="btn-cancel" onClick={() => navigate('/order')}>Cancel Order</button>

            </div>

            <style jsx>{`
                .payment-page-container {
                    min-height: 100vh; display: flex; justify-content: center; align-items: center;
                    padding: 20px; background: var(--bg-main);
                }
                .payment-card-authentic {
                    background: white; width: 100%; max-width: 500px;
                    padding: 40px; border-radius: 30px; text-align: center;
                    box-shadow: var(--shadow-card); border: 1px solid var(--border);
                }
                .payment-header h2 { font-size: 28px; margin-bottom: 10px; color: var(--primary); }
                .payment-header p { color: var(--text-muted); margin-bottom: 30px; }

                /* CIRCLE TIMER CSS */
                .timer-container {
                    position: relative; width: 260px; height: 260px; margin: 0 auto 40px; cursor: pointer;
                }
                .timer-svg { transform: rotate(-90deg); } /* Start from top */
                .timer-bg { fill: none; stroke: #f3f4f6; }
                .timer-progress {
                    fill: none; stroke: var(--primary); transition: stroke-dashoffset 1s linear;
                }
                .timer-center-content {
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    display: flex; flex-direction: column; justify-content: center; align-items: center;
                }
                .time-text { font-size: 56px; font-weight: 800; color: var(--text-main); line-height: 1; }

                /* Address Box */
                .address-section label { display: block; text-align: left; margin-bottom: 10px; font-weight: 600; color: var(--text-muted); }
                .address-box {
                    background: #f9fafb; border: 2px solid var(--border); padding: 15px;
                    border-radius: 16px; display: flex; justify-content: space-between; align-items: center;
                    cursor: pointer; transition: 0.2s;
                }
                .address-box:hover { border-color: var(--primary); background: #f5f3ff; }
                .crypto-address {
                    font-family: monospace; font-size: 14px; word-break: break-all; text-align: left; color: var(--text-main);
                }
                .btn-copy { background: none; border: none; color: var(--text-muted); cursor: pointer; }

                /* Warning Box */
                .warning-box {
                    background: #fffbeb; border: 1px solid #fcd34d; padding: 20px; borderRadius: 16px;
                    display: flex; gap: 15px; text-align: left; margin: 30px 0; align-items: flex-start;
                }
                .warning-box strong { color: #92400e; display: block; margin-bottom: 5px; }
                .warning-box p { margin: 0; color: #b45309; font-size: 13px; }

                .btn-cancel { background: none; border: none; color: var(--text-muted); cursor: pointer; font-weight: 600; }

                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                .animate-pop { animation: popUp 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
                @keyframes fadeIn { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); }}
                @keyframes popUp { from { opacity:0; transform: scale(0.8); } to { opacity:1; transform: scale(1); }}
            `}</style>
        </div>
    );
};

export default PaymentProcessPage;