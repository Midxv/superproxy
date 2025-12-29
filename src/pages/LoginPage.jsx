// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { auth, googleProvider, db } from '../firebaseConfig';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, addDoc } from 'firebase/firestore'; // Added collection, addDoc
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // --- DATABASE & PRELOAD LOGIC ---
    const createUserDocument = async (user) => {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        // Only run this for NEW users
        if (!userSnap.exists()) {
            // 1. Create Main User Doc
            await setDoc(userRef, {
                email: user.email,
                balance: 0.00,
                createdAt: new Date()
            });

            // 2. Pre-fill Inventory with 5 HIDDEN Proxies
            const inventoryRef = collection(db, "users", user.uid, "inventory");

            // Generate 5 Mock Proxies
            for (let i = 1; i <= 5; i++) {
                // Random IP Generator
                const ip = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;

                // Expiry date (30 days from now)
                const expiry = new Date();
                expiry.setDate(expiry.getDate() + 30);

                await addDoc(inventoryRef, {
                    ip: ip,
                    port: 8000 + i, // e.g., 8001, 8002
                    username: `user${Math.random().toString(36).substring(7)}`,
                    password: Math.random().toString(36).slice(-8),
                    type: 'Residential US',
                    status: 'active', // For the On/Off switch
                    expiresAt: expiry.toISOString(),
                    createdAt: new Date().toISOString(),

                    // --- THE MAGIC BOOLEAN ---
                    isPurchased: false // <--- This hides it initially! Change to TRUE in Console to show.
                });
            }
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            await createUserDocument(result.user);
            navigate('/dashboard');
        } catch (err) { setError(err.message); }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setError('');
        try {
            let result;
            if (isRegistering) {
                result = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                result = await signInWithEmailAndPassword(auth, email, password);
            }
            await createUserDocument(result.user);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message.replace('Firebase: ', '').replace('auth/', ''));
        }
    };

    return (
        <div className="login-page-wrapper">
            <h1 className="brand-header-big">Super<span style={{color:'var(--primary)'}}>Proxy</span></h1>
            <div className="login-card animate-fade-in">
                <div className="card-content">
                    <h2 className="welcome-title">{isRegistering ? 'Create an Account' : 'Welcome Back!'}</h2>
                    <p className="welcome-subtitle">{isRegistering ? 'Start using premium proxies today.' : 'Please enter your details to continue.'}</p>

                    <div className="auth-tabs">
                        <div className={`tab ${!isRegistering ? 'active' : ''}`} onClick={() => setIsRegistering(false)}>Login</div>
                        <div className={`tab ${isRegistering ? 'active' : ''}`} onClick={() => setIsRegistering(true)}>Register</div>
                    </div>

                    {error && <div className="error-alert">{error}</div>}

                    <form onSubmit={handleEmailAuth} className="main-form">
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="modern-input"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <div className="password-wrapper">
                                <input type={showPassword ? "text" : "password"} placeholder="Enter secure password" value={password} onChange={(e) => setPassword(e.target.value)} required className="modern-input"/>
                                <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={20} color="#666"/> : <Eye size={20} color="#666"/>}
                                </button>
                            </div>
                        </div>
                        {!isRegistering && <div className="forgot-link"><span>Forgot password?</span></div>}
                        <button type="submit" className="btn-submit">{isRegistering ? 'Sign Up' : 'Log In'}</button>
                    </form>

                    <div className="social-section">
                        <div className="divider"><span>OR CONTINUE WITH</span></div>
                        <button className="social-btn google-big" onClick={handleGoogleLogin}>
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="24" />
                            <span>Sign in with Google</span>
                        </button>
                        <p className="legal-text">By using this site, you agree to the <a href="#">Privacy policy</a> and <a href="#">Public offer</a>.</p>
                    </div>
                </div>
            </div>
            <style jsx>{`
                /* (Same CSS as previous step - preserved for layout consistency) */
                .login-page-wrapper { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: var(--bg-main); padding: 20px; }
                .brand-header-big { font-size: 72px; font-weight: 900; color: var(--text-main); letter-spacing: -2px; margin: 0 0 40px 0; text-align: center; }
                .login-card { width: 100%; max-width: 480px; background: white; border-radius: 24px; box-shadow: 0 20px 60px rgba(124, 58, 237, 0.12); border: 1px solid white; overflow: hidden; }
                .card-content { padding: 40px; }
                .welcome-title { font-size: 28px; font-weight: 800; color: var(--text-main); margin: 0 0 8px 0; text-align: center; }
                .welcome-subtitle { color: var(--text-muted); font-size: 15px; text-align: center; margin-bottom: 25px; }
                .auth-tabs { display: flex; background: #f8f9fa; padding: 6px; border-radius: 16px; margin-bottom: 30px; }
                .tab { flex: 1; text-align: center; padding: 12px; font-size: 16px; font-weight: 600; color: #888; cursor: pointer; border-radius: 12px; transition: 0.2s; }
                .tab.active { background: white; color: var(--primary); box-shadow: 0 2px 10px rgba(0,0,0,0.05); font-weight: 800; }
                .main-form { display: flex; flex-direction: column; gap: 20px; }
                .form-group label { display: block; font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 8px; }
                .modern-input { width: 100%; padding: 16px 18px; font-size: 16px; border: 2px solid #eef2ff; border-radius: 16px; outline: none; color: var(--text-main); background: #f8f9ff; transition: 0.2s; font-weight: 500; }
                .modern-input:focus { border-color: var(--primary); background: white; box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1); }
                .password-wrapper { position: relative; }
                .eye-btn { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); background: none; border: none; padding: 0; cursor: pointer; }
                .forgot-link { text-align: right; margin-top: -10px; }
                .forgot-link span { font-size: 14px; color: var(--primary); font-weight: 700; cursor: pointer; }
                .btn-submit { width: 100%; padding: 18px; background: var(--primary); color: white; font-size: 18px; font-weight: 800; border: none; border-radius: 16px; cursor: pointer; transition: 0.2s; box-shadow: 0 8px 20px rgba(124, 58, 237, 0.25); }
                .btn-submit:hover { background: var(--primary-hover); transform: translateY(-2px); box-shadow: 0 12px 25px rgba(124, 58, 237, 0.35); }
                .divider { display: flex; align-items: center; margin: 30px 0 20px 0; color: #aaa; font-size: 12px; font-weight: 700; letter-spacing: 1px; }
                .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: #eee; }
                .divider span { padding: 0 15px; }
                .social-btn.google-big { width: 100%; display: flex; align-items: center; justify-content: center; gap: 12px; padding: 16px; background: white; border: 2px solid #f3f4f6; border-radius: 16px; font-size: 16px; font-weight: 700; color: #4b5563; transition: 0.2s; cursor: pointer; }
                .social-btn.google-big:hover { background: #f9fafb; border-color: #d1d5db; transform: translateY(-1px); }
                .legal-text { margin-top: 20px; text-align: center; font-size: 13px; color: #9ca3af; line-height: 1.5; }
                .legal-text a { color: var(--primary); text-decoration: none; font-weight: 600; }
                .error-alert { background: #fee2e2; color: #b91c1c; padding: 12px; border-radius: 12px; font-size: 14px; margin-bottom: 20px; font-weight: 500; }
                .animate-fade-in { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); }}
            `}</style>
        </div>
    );
};

export default LoginPage;