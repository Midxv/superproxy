import React, { useState } from 'react';

const OrderPage = () => {
    const [duration, setDuration] = useState('1 Day');

    const getPrice = () => {
        if (duration === '1 Day') return '10.62';
        if (duration === '30 Days') return '250.00';
        return '0.00';
    };

    return (
        <div style={{padding: '40px', maxWidth: '600px'}}>
            <h1>Create Order</h1>
            <div style={{
                background: 'var(--bg-card)', padding: '24px',
                borderRadius: '12px', border: '1px solid var(--border)'
            }}>
                <label style={{display: 'block', marginBottom: '10px'}}>Duration</label>
                <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    style={{
                        width: '100%', padding: '12px', background: '#000',
                        color: 'white', border: '1px solid var(--border)', borderRadius: '6px'
                    }}
                >
                    <option>1 Day</option>
                    <option>30 Days</option>
                </select>

                <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                        <p style={{color: 'var(--text-muted)'}}>Total Price</p>
                        <h2>${getPrice()}</h2>
                    </div>
                    <button style={{
                        background: 'var(--accent)', color: 'white', border: 'none',
                        padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
                    }}>
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;