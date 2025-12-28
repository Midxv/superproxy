import React, { useState } from 'react';
import { CreditCard, Bitcoin, ShieldCheck } from 'lucide-react';

const OrderPage = () => {
    const [duration, setDuration] = useState('1 Day');
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'crypto'

    const getPrice = () => {
        let base = 10.62;
        if (duration === '30 Days') base = 250.00;
        // Add 1% fee for crypto if you want to match screenshot logic
        if (paymentMethod === 'crypto') base = base * 1.01;
        return base.toFixed(2);
    };

    return (
        <div style={{padding: '40px', maxWidth: '1000px', margin: '0 auto'}}>
            <h1 style={{marginBottom: '20px'}}>Complete Order</h1>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>

                {/* LEFT COLUMN: Payment Selection */}
                <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    <div style={{background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)'}}>
                        <h3 style={{marginTop: 0, marginBottom: '20px', fontSize: '14px', color: 'var(--text-muted)'}}>PAYMENT METHOD</h3>

                        {/* Payment Toggles */}
                        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            {/* Card Option */}
                            <div
                                onClick={() => setPaymentMethod('card')}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '15px', padding: '15px',
                                    border: paymentMethod === 'card' ? '1px solid var(--primary)' : '1px solid var(--border)',
                                    borderRadius: '8px', cursor: 'pointer',
                                    background: paymentMethod === 'card' ? 'rgba(0, 201, 167, 0.05)' : 'transparent'
                                }}
                            >
                                <div style={{
                                    width: '20px', height: '20px', borderRadius: '50%',
                                    border: paymentMethod === 'card' ? '6px solid var(--primary)' : '2px solid var(--text-muted)'
                                }}></div>
                                <CreditCard size={24} />
                                <span style={{fontWeight: 'bold'}}>Credit Card</span>
                                <div style={{marginLeft: 'auto', display: 'flex', gap: '5px'}}>
                                    <span style={{fontSize: '10px', background: '#eee', color: '#333', padding: '2px 4px', borderRadius: '2px'}}>VISA</span>
                                    <span style={{fontSize: '10px', background: '#eee', color: '#333', padding: '2px 4px', borderRadius: '2px'}}>MC</span>
                                </div>
                            </div>

                            {/* Crypto Option */}
                            <div
                                onClick={() => setPaymentMethod('crypto')}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '15px', padding: '15px',
                                    border: paymentMethod === 'crypto' ? '1px solid var(--primary)' : '1px solid var(--border)',
                                    borderRadius: '8px', cursor: 'pointer',
                                    background: paymentMethod === 'crypto' ? 'rgba(0, 201, 167, 0.05)' : 'transparent'
                                }}
                            >
                                <div style={{
                                    width: '20px', height: '20px', borderRadius: '50%',
                                    border: paymentMethod === 'crypto' ? '6px solid var(--primary)' : '2px solid var(--text-muted)'
                                }}></div>
                                <Bitcoin size={24} color="#F7931A" />
                                <span style={{fontWeight: 'bold'}}>Crypto</span>
                                <span style={{marginLeft: 'auto', fontSize: '12px', color: 'var(--text-muted)'}}>BTC, ETH, LTC +25 more</span>
                            </div>
                        </div>

                        {/* Dynamic Form Content */}
                        <div style={{marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border)'}}>
                            {paymentMethod === 'card' ? (
                                <div>
                                    <label style={{fontSize: '12px', color: 'var(--text-muted)'}}>Card Number</label>
                                    <input type="text" placeholder="1234 5678 9101 1121" style={inputStyle} />
                                    <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                                        <input type="text" placeholder="MM / YY" style={inputStyle} />
                                        <input type="text" placeholder="CVC" style={inputStyle} />
                                    </div>
                                </div>
                            ) : (
                                <div style={{textAlign: 'center', padding: '20px'}}>
                                    <ShieldCheck size={48} color="var(--primary)" style={{marginBottom: '10px'}} />
                                    <p>Powered by <strong>CoinGate</strong></p>
                                    <p style={{fontSize: '12px', color: 'var(--text-muted)'}}>Secure & Anonymous Checkout</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Summary */}
                <div style={{background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', height: 'fit-content'}}>
                    <h3 style={{marginTop: 0, fontSize: '14px', color: 'var(--text-muted)'}}>SUBSCRIPTION SUMMARY</h3>

                    <div style={{marginTop: '20px'}}>
                        <label style={{display: 'block', marginBottom: '8px', fontSize: '12px'}}>Plan</label>
                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            style={inputStyle}
                        >
                            <option>1 Day</option>
                            <option>30 Days</option>
                        </select>
                    </div>

                    <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '20px'}}>
                        <span>Final Price</span>
                        <span style={{fontSize: '24px', fontWeight: 'bold'}}>${getPrice()}</span>
                    </div>

                    <button style={{
                        width: '100%', marginTop: '20px',
                        background: 'var(--accent)', color: 'white', border: 'none',
                        padding: '15px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer'
                    }}>
                        Complete Order
                    </button>
                </div>

            </div>
        </div>
    );
};

// Simple reusable style for inputs
const inputStyle = {
    width: '100%', padding: '12px', background: '#121212',
    color: 'white', border: '1px solid #333', borderRadius: '6px', outline: 'none'
};

export default OrderPage;