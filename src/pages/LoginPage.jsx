// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, CreditCard, Bitcoin, CheckCircle } from 'lucide-react';

const LoginPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard');
        } catch (err) { setError(err.message); }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.message.replace('Firebase: ', '').replace('auth/', '').split('-').join(' '));
        }
    };

    return (
        <div className="login-page-wrapper">

            {/* MAIN LOGIN CARD */}
            <div className="login-card animate-fade-in">

                {/* Header */}
                <div className="login-header">
                    <h1 className="brand-text">Super<span style={{color:'var(--primary)'}}>Proxy</span></h1>
                    <h2 className="title">{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
                    <p className="subtitle">Login to manage your proxies</p>
                </div>

                {/* 1. Google Button (Top) */}
                <button onClick={handleGoogleLogin} className="google-btn">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="24" alt="G" />
                    <span>Continue with Google</span>
                </button>

                <div className="divider"><span>OR CONTINUE WITH EMAIL</span></div>

                {/* 2. Vertical Form (Email -> Pass -> Button) */}
                <form onSubmit={handleEmailAuth} className="login-form">
                    {error && <div className="error-box">{error}</div>}

                    <div className="input-group">
                        <Mail size={22} className="input-icon" />
                        <input
                            type="email" placeholder="Email address" value={email}
                            onChange={(e) => setEmail(e.target.value)} required
                            className="modern-input"
                        />
                    </div>

                    <div className="input-group">
                        <Lock size={22} className="input-icon" />
                        <input
                            type="password" placeholder="Password" value={password}
                            onChange={(e) => setPassword(e.target.value)} required
                            className="modern-input"
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        {isRegistering ? 'Sign Up' : 'Log In'} <ArrowRight size={20} />
                    </button>
                </form>

                <p className="toggle-text">
                    {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                    <span onClick={() => {setIsRegistering(!isRegistering); setError('')}} className="toggle-link">
            {isRegistering ? 'Log In' : 'Sign Up'}
          </span>
                </p>

            </div>

            {/* 3. Supported Payments Banner (Bottom) */}
            <div className="payment-footer">
                <p>Secured Payment Methods Supported</p>
                <div className="payment-icons">
                    <div className="pay-badge"><CreditCard size={16}/> VISA</div>
                    <div className="pay-badge"><CreditCard size={16}/> MasterCard</div>
                    <div className="pay-badge crypto"><Bitcoin size={16}/> Bitcoin</div>
                    <div className="pay-badge crypto">ETH</div>
                    <div className="pay-badge crypto">LTC</div>
                    <div className="pay-badge crypto">USDT</div>
                </div>
            </div>

            <style jsx>{`
                .login-page-wrapper {
                    min-height: 100vh; display: flex; flex-direction: column;
                    justify-content: center; align-items: center;
                    background: var(--bg-main); padding: 20px;
                }

                /* CARD STYLES (Bigger for PC) */
                .login-card {
                    background: white;
                    padding: 60px; /* Increased padding */
                    width: 100%;
                    max-width: 520px; /* Increased width */
                    border-radius: 32px;
                    box-shadow: 0 20px 40px rgba(124, 58, 237, 0.15); /* Stronger shadow */
                    text-align: center; margin-bottom: 40px;
                }

                .brand-text { font-size: 36px; margin-bottom: 10px; font-weight: 900; }
                .title { font-size: 26px; font-weight: 800; color: var(--text-main); margin: 0; }
                .subtitle { color: var(--text-muted); font-size: 16px; margin-top: 5px; margin-bottom: 30px; }

                /* Google Button */
                .google-btn {
                    width: 100%; padding: 16px; border-radius: 16px;
                    border: 1px solid var(--border); background: white;
                    color: var(--text-main); font-weight: 700; font-size: 16px;
                    display: flex; align-items: center; justify-content: center; gap: 12px;
                    transition: 0.2s; cursor: pointer;
                }
                .google-btn:hover { background: #f9fafb; border-color: #d1d5db; transform: translateY(-1px); }

                .divider { display: flex; align-items: center; margin: 30px 0; color: var(--text-muted); font-size: 12px; font-weight: 700; letter-spacing: 1px; }
                .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
                .divider span { padding: 0 15px; }

                /* INPUTS (Bigger & Clearer) */
                .login-form { display: flex; flexDirection: column; gap: 20px; } /* More gap */
                .input-group { position: relative; }

                .modern-input {
                    width: 100%;
                    padding: 18px 18px 18px 55px; /* Increased padding */
                    background: #f8f9fa; /* Slightly darker white for contrast */
                    border: 2px solid #e5e7eb;
                    border-radius: 16px;
                    outline: none;
                    font-size: 16px; /* Bigger text */
                    color: #111; /* Darker text color */
                    font-weight: 500;
                    transition: 0.2s;
                }
                .modern-input:focus { background: white; border-color: var(--primary); box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1); }
                .input-icon { position: absolute; left: 18px; top: 18px; color: #9ca3af; }

                /* Submit Button */
                .submit-btn {
                    width: 100%; padding: 18px; border-radius: 16px; border: none;
                    background: var(--primary); color: white; font-weight: 800; font-size: 18px;
                    display: flex; align-items: center; justify-content: center; gap: 10px;
                    transition: 0.2s; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3); margin-top: 10px;
                    cursor: pointer;
                }
                .submit-btn:hover { background: var(--primary-hover); transform: translateY(-2px); }

                .toggle-text { margin-top: 30px; font-size: 15px; color: var(--text-muted); }
                .toggle-link { color: var(--primary); font-weight: 700; cursor: pointer; margin-left: 5px; }
                .error-box { background: #fee2e2; color: #991b1b; padding: 12px; border-radius: 12px; font-size: 14px; font-weight: 500; }

                /* PAYMENT FOOTER */
                .payment-footer {
                    text-align: center;
                    opacity: 0.8;
                }
                .payment-footer p {
                    font-size: 12px; text-transform: uppercase; letter-spacing: 1px;
                    font-weight: 700; color: var(--text-muted); margin-bottom: 15px;
                }
                .payment-icons {
                    display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;
                }
                .pay-badge {
                    background: white; border: 1px solid var(--border);
                    padding: 8px 12px; border-radius: 8px; font-size: 12px; font-weight: 700;
                    color: #374151; display: flex; align-items: center; gap: 6px;
                }
                .pay-badge.crypto { background: #f0fdf4; color: #15803d; border-color: #dcfce7; }

                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); }}

                /* Mobile Adjustments */
                @media (max-width: 600px) {
                    .login-card { padding: 30px; }
                    .brand-text { font-size: 28px; }
                }
            `}</style>
        </div>
    );
};

export default LoginPage;