// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
            setError(err.message.replace('Firebase: ', '').replace('auth/', ''));
        }
    };

    return (
        <div className="login-page-wrapper">

            {/* 1. MASSIVE BRAND HEADER (Outside the box) */}
            <h1 className="brand-header-big">
                Super<span style={{color:'var(--primary)'}}>Proxy</span>
            </h1>

            <div className="login-card animate-fade-in">

                <div className="card-content">

                    {/* 2. WELCOME TITLE (Now at the top of card) */}
                    <h2 className="welcome-title">
                        {isRegistering ? 'Create an Account' : 'Welcome Back!'}
                    </h2>
                    <p className="welcome-subtitle">
                        {isRegistering ? 'Start using premium proxies today.' : 'Please enter your details to continue.'}
                    </p>

                    {/* 3. TABS (Moved below title) */}
                    <div className="auth-tabs">
                        <div
                            className={`tab ${!isRegistering ? 'active' : ''}`}
                            onClick={() => setIsRegistering(false)}
                        >
                            Login
                        </div>
                        <div
                            className={`tab ${isRegistering ? 'active' : ''}`}
                            onClick={() => setIsRegistering(true)}
                        >
                            Register
                        </div>
                    </div>

                    {error && <div className="error-alert">{error}</div>}

                    {/* 4. FORM */}
                    <form onSubmit={handleEmailAuth} className="main-form">

                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="modern-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter secure password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="modern-input"
                                />
                                <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={20} color="#666"/> : <Eye size={20} color="#666"/>}
                                </button>
                            </div>
                        </div>

                        {!isRegistering && (
                            <div className="forgot-link">
                                <span>Forgot password?</span>
                            </div>
                        )}

                        <button type="submit" className="btn-submit">
                            {isRegistering ? 'Sign Up' : 'Log In'}
                        </button>

                    </form>

                    {/* 5. GOOGLE & LEGAL TEXT */}
                    <div className="social-section">
                        <div className="divider">
                            <span>OR CONTINUE WITH</span>
                        </div>

                        <button className="social-btn google-big" onClick={handleGoogleLogin}>
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="24" />
                            <span>Sign in with Google</span>
                        </button>

                        {/* NEW LEGAL TEXT */}
                        <p className="legal-text">
                            By using this site, you agree to the <a href="#">Privacy policy</a> and <a href="#">Public offer</a>.
                        </p>
                    </div>

                </div>

            </div>

            <style jsx>{`
        /* Page Layout */
        .login-page-wrapper {
          min-height: 100vh;
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          background: var(--bg-main);
          padding: 20px;
        }

        /* 1. BIG HEADER STYLES */
        .brand-header-big {
          font-size: 72px; /* 3x bigger */
          font-weight: 900;
          color: var(--text-main);
          letter-spacing: -2px;
          margin: 0 0 40px 0; /* Space below header */
          text-align: center;
        }
        @media (max-width: 600px) { .brand-header-big { font-size: 48px; } }

        /* Card Container */
        .login-card {
          width: 100%;
          max-width: 480px;
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(124, 58, 237, 0.12);
          border: 1px solid white;
          overflow: hidden;
        }
        .card-content { padding: 40px; }

        /* 2. Title Styles */
        .welcome-title {
          font-size: 28px; font-weight: 800; color: var(--text-main);
          margin: 0 0 8px 0; text-align: center;
        }
        .welcome-subtitle {
          color: var(--text-muted); font-size: 15px; text-align: center;
          margin-bottom: 25px;
        }

        /* 3. Tabs Styles */
        .auth-tabs {
          display: flex;
          background: #f8f9fa;
          padding: 6px;
          border-radius: 16px;
          margin-bottom: 30px;
        }
        .tab {
          flex: 1;
          text-align: center;
          padding: 12px;
          font-size: 16px;
          font-weight: 600;
          color: #888;
          cursor: pointer;
          border-radius: 12px;
          transition: 0.2s;
        }
        .tab.active {
          background: white;
          color: var(--primary);
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          font-weight: 800;
        }

        /* Form Styles */
        .main-form { display: flex; flex-direction: column; gap: 20px; }
        .form-group label {
          display: block; font-size: 14px; font-weight: 700; color: var(--text-main);
          margin-bottom: 8px;
        }
        .modern-input {
          width: 100%; padding: 16px 18px; font-size: 16px;
          border: 2px solid #eef2ff; border-radius: 16px; outline: none;
          color: var(--text-main); background: #f8f9ff; transition: 0.2s; font-weight: 500;
        }
        .modern-input:focus {
          border-color: var(--primary); background: white;
          box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1);
        }
        .password-wrapper { position: relative; }
        .eye-btn {
          position: absolute; right: 15px; top: 50%; transform: translateY(-50%);
          background: none; border: none; padding: 0; cursor: pointer;
        }
        .forgot-link { text-align: right; margin-top: -10px; }
        .forgot-link span { font-size: 14px; color: var(--primary); font-weight: 700; cursor: pointer; }

        .btn-submit {
          width: 100%; padding: 18px; background: var(--primary);
          color: white; font-size: 18px; font-weight: 800;
          border: none; border-radius: 16px; cursor: pointer;
          transition: 0.2s; box-shadow: 0 8px 20px rgba(124, 58, 237, 0.25);
        }
        .btn-submit:hover { 
          background: var(--primary-hover); transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(124, 58, 237, 0.35);
        }

        /* Social & Legal */
        .divider {
          display: flex; align-items: center; margin: 30px 0 20px 0;
          color: #aaa; font-size: 12px; font-weight: 700; letter-spacing: 1px;
        }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: #eee; }
        .divider span { padding: 0 15px; }

        .social-btn.google-big {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 12px;
          padding: 16px; background: white; border: 2px solid #f3f4f6;
          border-radius: 16px; font-size: 16px; font-weight: 700; color: #4b5563;
          transition: 0.2s; cursor: pointer;
        }
        .social-btn.google-big:hover { 
          background: #f9fafb; border-color: #d1d5db; transform: translateY(-1px);
        }

        .legal-text {
          margin-top: 20px; text-align: center; font-size: 13px; color: #9ca3af;
          line-height: 1.5;
        }
        .legal-text a { color: var(--primary); text-decoration: none; font-weight: 600; }
        .legal-text a:hover { text-decoration: underline; }

        .error-alert {
          background: #fee2e2; color: #b91c1c; padding: 12px;
          border-radius: 12px; font-size: 14px; margin-bottom: 20px; font-weight: 500;
        }
        
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); }}
      `}</style>
        </div>
    );
};

export default LoginPage;