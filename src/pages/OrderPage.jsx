// src/pages/OrderPage.jsx
import React, { useState } from 'react';
import { CreditCard, Bitcoin, CheckCircle, ShieldCheck, Smartphone, Globe, Lock } from 'lucide-react';

const OrderPage = () => {
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [plan, setPlan] = useState('1 Day');

    return (
        <div className="page-container">

            <div className="content-wrapper">
                <h1 className="page-title">Complete your order</h1>

                <div className="layout-grid">

                    {/* LEFT COLUMN: Payment Methods */}
                    <div className="left-section">
                        <h3 className="section-header">Payment Method</h3>

                        <div className="payment-options">
                            {/* Credit Card Option */}
                            <div
                                className={`payment-card ${selectedMethod === 'card' ? 'active' : ''}`}
                                onClick={() => setSelectedMethod('card')}
                            >
                                <div className="radio-circle">
                                    {selectedMethod === 'card' && <div className="radio-inner" />}
                                </div>
                                <div className="payment-info">
                                    <div className="payment-title">
                                        <CreditCard size={20} className="icon-violet" />
                                        <span>Credit / Debit Card</span>
                                    </div>
                                    <div className="card-icons">
                                        <span className="card-logo">VISA</span>
                                        <span className="card-logo">MC</span>
                                        <span className="card-logo">AMEX</span>
                                    </div>
                                </div>
                            </div>

                            {/* Crypto Option */}
                            <div
                                className={`payment-card ${selectedMethod === 'crypto' ? 'active' : ''}`}
                                onClick={() => setSelectedMethod('crypto')}
                            >
                                <div className="radio-circle">
                                    {selectedMethod === 'crypto' && <div className="radio-inner" />}
                                </div>
                                <div className="payment-info">
                                    <div className="payment-title">
                                        <Bitcoin size={20} className="icon-gold" />
                                        <span>Crypto (BTC, ETH, LTC)</span>
                                    </div>
                                    <span className="badge-discount">-5% Fees</span>
                                </div>
                            </div>

                            {/* PayPal Option */}
                            <div
                                className={`payment-card ${selectedMethod === 'paypal' ? 'active' : ''}`}
                                onClick={() => setSelectedMethod('paypal')}
                            >
                                <div className="radio-circle">
                                    {selectedMethod === 'paypal' && <div className="radio-inner" />}
                                </div>
                                <div className="payment-info">
                                    <div className="payment-title">
                                        <span style={{fontWeight: 'bold', color: '#003087'}}>PayPal</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* DYNAMIC FORM AREA */}
                        <div className="form-area">
                            {selectedMethod === 'card' ? (
                                <div className="card-form animate-fade">
                                    <label>Card Information</label>
                                    <div className="input-with-icon">
                                        <CreditCard size={18} color="#8b5cf6" />
                                        <input type="text" placeholder="0000 0000 0000 0000" />
                                    </div>
                                    <div className="row">
                                        <input type="text" placeholder="MM / YY" className="half-input" />
                                        <input type="text" placeholder="CVC" className="half-input" />
                                    </div>
                                    <div className="secure-badge">
                                        <Lock size={14} /> 128-bit SSL Secured Payment
                                    </div>
                                </div>
                            ) : (
                                <div className="crypto-info animate-fade">
                                    <ShieldCheck size={48} color="#7c3aed" />
                                    <p>Secure anonymous checkout via <strong>CoinGate</strong>.</p>
                                    <p className="sub-text">You will be redirected to complete payment.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Order Summary */}
                    <div className="right-section">
                        <div className="summary-card">
                            <h3>Order Summary</h3>

                            <div className="summary-item">
                                <span className="label">Product</span>
                                <span className="value flex-align"><Globe size={14} /> Residential Proxies</span>
                            </div>

                            <div className="summary-item">
                                <span className="label">Plan Duration</span>
                                <select className="plan-select" value={plan} onChange={(e) => setPlan(e.target.value)}>
                                    <option>1 Day</option>
                                    <option>7 Days</option>
                                    <option>30 Days</option>
                                </select>
                            </div>

                            <div className="divider"></div>

                            <div className="benefits-list">
                                <div className="benefit"><CheckCircle size={14} color="#7c3aed" /> No hidden fees</div>
                                <div className="benefit"><CheckCircle size={14} color="#7c3aed" /> Instant delivery</div>
                                <div className="benefit"><CheckCircle size={14} color="#7c3aed" /> 24/7 Support</div>
                            </div>

                            <div className="total-row">
                                <span>Total Price</span>
                                <span className="price-tag">$10.62</span>
                            </div>

                            <button className="btn-checkout">
                                Complete Order
                            </button>

                            <p className="terms-text">By clicking complete, you agree to our Terms of Service.</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- CSS STYLES (Violet & White Theme) --- */}
            <style jsx>{`
        /* Global Reset for this page */
        .page-container {
          min-height: 100vh;
          background-color: #f8f9ff; /* Very light violet tint */
          color: #1e1b4b; /* Dark Violet/Black text */
          font-family: 'Inter', sans-serif;
          padding: 20px;
        }

        .content-wrapper {
          max-width: 1100px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 28px;
          margin-bottom: 30px;
          color: #4c1d95; /* Deep Violet */
        }

        .layout-grid {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 30px;
        }

        /* --- LEFT SECTION --- */
        .left-section {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 4px 25px rgba(124, 58, 237, 0.05);
        }

        .section-header { margin-top: 0; margin-bottom: 20px; font-size: 18px; }

        .payment-options { display: flex; flex-direction: column; gap: 15px; }

        .payment-card {
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          transition: 0.2s all;
        }

        .payment-card:hover { border-color: #c4b5fd; background: #fdfcff; }
        .payment-card.active { border-color: #7c3aed; background: #f5f3ff; }

        .radio-circle {
          width: 20px; height: 20px;
          border-radius: 50%;
          border: 2px solid #ddd;
          display: flex; justify-content: center; align-items: center;
        }
        .payment-card.active .radio-circle { border-color: #7c3aed; }
        .radio-inner { width: 10px; height: 10px; background: #7c3aed; border-radius: 50%; }

        .payment-info { flex: 1; display: flex; justify-content: space-between; align-items: center; }
        .payment-title { display: flex; align-items: center; gap: 10px; font-weight: 600; }
        .icon-violet { color: #7c3aed; }
        .icon-gold { color: #f59e0b; }

        .card-icons { display: flex; gap: 5px; }
        .card-logo { font-size: 10px; background: #eee; padding: 2px 5px; border-radius: 4px; font-weight: bold; color: #555; }
        .badge-discount { font-size: 12px; background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 12px; font-weight: bold; }

        /* Form Area */
        .form-area { margin-top: 30px; padding-top: 20px; border-top: 1px solid #f3f4f6; }
        .animate-fade { animation: fadeIn 0.3s ease-in; }
        
        .card-form label { display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #6b7280; }
        
        .input-with-icon {
          position: relative;
          display: flex; align-items: center;
          background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;
          padding: 0 12px; margin-bottom: 15px;
        }
        .input-with-icon input, .half-input {
          width: 100%; padding: 12px; border: none; background: transparent; outline: none; font-size: 16px; color: #333;
        }
        .row { display: flex; gap: 15px; }
        .half-input { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; }

        .secure-badge { margin-top: 15px; display: flex; align-items: center; gap: 6px; font-size: 12px; color: #6b7280; justify-content: center; }

        .crypto-info { text-align: center; padding: 20px; }
        .sub-text { font-size: 14px; color: #888; }

        /* --- RIGHT SECTION (SUMMARY) --- */
        .summary-card {
          background: white; padding: 25px; border-radius: 20px;
          box-shadow: 0 10px 40px rgba(124, 58, 237, 0.1);
          position: sticky; top: 20px;
        }
        
        .summary-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; font-size: 14px; }
        .label { color: #6b7280; }
        .value { font-weight: 600; color: #111; }
        .flex-align { display: flex; align-items: center; gap: 6px; }

        .plan-select { padding: 5px; border-radius: 6px; border: 1px solid #ddd; outline: none; cursor: pointer; }

        .divider { height: 1px; background: #e5e7eb; margin: 20px 0; }

        .benefits-list { margin-bottom: 20px; display: flex; flex-direction: column; gap: 8px; }
        .benefit { font-size: 13px; color: #4b5563; display: flex; align-items: center; gap: 8px; }

        .total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 18px; font-weight: bold; }
        .price-tag { color: #7c3aed; font-size: 24px; }

        .btn-checkout {
          width: 100%; padding: 16px; border: none; border-radius: 12px;
          background: #7c3aed; color: white; font-weight: bold; font-size: 16px;
          cursor: pointer; transition: 0.2s; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
        }
        .btn-checkout:hover { background: #6d28d9; transform: translateY(-2px); }

        .terms-text { font-size: 11px; color: #9ca3af; text-align: center; margin-top: 15px; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .layout-grid { grid-template-columns: 1fr; }
          .summary-card { position: relative; order: -1; margin-bottom: 20px; } /* Summary on top for mobile */
        }
      `}</style>
        </div>
    );
};

export default OrderPage;