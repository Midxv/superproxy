// src/pages/DashboardHome.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Globe, Star, ShieldCheck, ChevronDown } from 'lucide-react';

const DashboardHome = () => {
    const navigate = useNavigate();

    // State for the "Quick Order" widget
    const [service, setService] = useState('IPv4');
    const [country, setCountry] = useState('US');
    const [period, setPeriod] = useState('1 Month');
    const [quantity, setQuantity] = useState(1);

    // Mock Pricing Logic
    const getPrice = () => {
        let base = 2.00; // Base price for IPv4 US
        if (service === 'IPv6') base = 0.50;
        if (service === 'Mobile') base = 10.00;

        let multiplier = 1;
        if (period === '1 Week') multiplier = 0.25;
        if (period === '12 Months') multiplier = 10; // Discount

        return (base * multiplier * quantity).toFixed(2);
    };

    return (
        <div>
            {/* 1. HEADER (Matches Proxy Seller) */}
            <header className="header">
                <div className="header-container">
                    <div className="logo">
                        Super<span>Proxy</span>
                    </div>

                    <nav className="nav-menu">
                        <a href="#">IPv4 Proxy</a>
                        <a href="#">IPv6 Proxy</a>
                        <a href="#">Mobile 4G/5G</a>
                        <a href="#">ISP Proxy</a>
                        <a href="#">Tools</a>
                        <a href="#">Blog</a>
                        <a href="#">FAQ</a>
                    </nav>

                    <div className="user-area">
                        <div className="btn-login">
                            <User size={18} /> Login
                        </div>
                        <button className="btn-contact">Contact sales</button>
                    </div>
                </div>
            </header>

            {/* 2. MAIN CONTENT AREA */}
            <div className="dashboard-container">

                <div className="page-title">
                    <h1>Buy private Socks5 & HTTPs proxies</h1>
                    <p>Trusted for web scraping, ad verification, price monitoring, and more.</p>
                </div>

                <div className="quick-order-wrapper">

                    {/* LEFT: THE ORDER FORM */}
                    <div className="order-form-card">

                        {/* Service Type */}
                        <div className="form-group">
                            <label className="form-label">Choose a service</label>
                            <select
                                className="custom-select"
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                            >
                                <option value="IPv4">Proxy IPv4</option>
                                <option value="IPv6">Proxy IPv6</option>
                                <option value="ISP">ISP Residential</option>
                                <option value="Mobile">Mobile 4G/5G</option>
                            </select>
                        </div>

                        {/* Country Selection */}
                        <div className="form-group">
                            <label className="form-label">Select location</label>
                            <div className="country-grid">
                                <CountryItem code="US" name="USA" active={country === 'US'} onClick={() => setCountry('US')} />
                                <CountryItem code="DE" name="Germany" active={country === 'DE'} onClick={() => setCountry('DE')} />
                                <CountryItem code="GB" name="England" active={country === 'GB'} onClick={() => setCountry('GB')} />
                                <CountryItem code="FR" name="France" active={country === 'FR'} onClick={() => setCountry('FR')} />
                                <CountryItem code="CA" name="Canada" active={country === 'CA'} onClick={() => setCountry('CA')} />
                                <CountryItem code="NL" name="Netherlands" active={country === 'NL'} onClick={() => setCountry('NL')} />
                                <CountryItem code="UA" name="Ukraine" active={country === 'UA'} onClick={() => setCountry('UA')} />
                                <CountryItem code="IN" name="India" active={country === 'IN'} onClick={() => setCountry('IN')} />
                            </div>
                        </div>

                        {/* Period & Quantity */}
                        <div style={{display: 'flex', gap: '20px'}}>
                            <div className="form-group" style={{flex: 1}}>
                                <label className="form-label">Select period</label>
                                <select
                                    className="custom-select"
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value)}
                                >
                                    <option>1 Week</option>
                                    <option>1 Month</option>
                                    <option>3 Months</option>
                                    <option>12 Months</option>
                                </select>
                            </div>

                            <div className="form-group" style={{flex: 1}}>
                                <label className="form-label">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="custom-select" // Reusing styling
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>

                    {/* RIGHT: SUMMARY WIDGET */}
                    <div className="order-summary-card">
                        <h3 style={{marginTop:0, fontSize:'24px', fontWeight:900, marginBottom:'20px'}}>Order Summary</h3>

                        <div className="summary-row">
                            <span>Service</span>
                            <strong>{service}</strong>
                        </div>
                        <div className="summary-row">
                            <span>Location</span>
                            <strong>{country}</strong>
                        </div>
                        <div className="summary-row">
                            <span>Period</span>
                            <strong>{period}</strong>
                        </div>
                        <div className="summary-row">
                            <span>IPs</span>
                            <strong>{quantity} pcs.</strong>
                        </div>

                        <div className="total-price-box">
                            <span className="total-label">Total price</span>
                            <div className="total-amount">${getPrice()}</div>
                        </div>

                        <button className="btn-checkout" onClick={() => navigate('/order')}>
                            Buy Proxy <ShieldCheck size={20} style={{marginLeft:'5px', verticalAlign:'text-bottom'}}/>
                        </button>

                        <p style={{fontSize:'12px', color:'#999', textAlign:'center', marginTop:'15px'}}>
                            By clicking "Buy Proxy" you agree to our Terms of Service.
                        </p>
                    </div>

                </div>

                {/* REVIEWS SECTION */}
                <div className="reviews-container">
                    <div style={{textAlign: 'center', marginBottom: '40px'}}>
                        <h2 style={{fontSize: '32px', fontWeight: 900}}>Reviews from our clients</h2>
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
                        <ReviewCard name="Alex D." text="Excellent speed and uptime. Support is always online to help." />
                        <ReviewCard name="Sarah J." text="Using these for SMM and they work perfectly. No blocks so far." />
                        <ReviewCard name="Michael B." text="Best price/quality ratio on the market. Highly recommended." />
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- HELPER COMPONENTS ---

const CountryItem = ({ code, name, active, onClick }) => (
    <div className={`country-option ${active ? 'active' : ''}`} onClick={onClick}>
        <span className="country-flag">{getFlagEmoji(code)}</span>
        <span className="country-name">{name}</span>
    </div>
);

const ReviewCard = ({ name, text }) => (
    <div className="review-card">
        <div className="review-stars">
            {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#00b67a" stroke="none" />)}
        </div>
        <p className="review-body">"{text}"</p>
        <p className="review-author">{name}</p>
    </div>
);

// Simple emoji flag helper
const getFlagEmoji = (countryCode) => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
};

export default DashboardHome;