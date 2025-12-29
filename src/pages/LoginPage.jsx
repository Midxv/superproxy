// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

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
            // Simplified error message
            setError(err.message.replace('Firebase: ', '').replace('auth/', '').split('-').join(' '));
        }
    };

    return (
        <div className="login-container animate-fade-in">
            <div className="login-card">

                {/* Header */}
                <div className="login-header">
                    <h1 style={{fontSize: '32px'}}>Super<span style={{color:'var(--primary)'}}>Proxy</span></h1>
                    <h2 className="title">
                        {isRegistering ? 'Create your account' : 'Welcome back!'}
                    </h2>
                    <p className="subtitle">
                        {isRegistering ? 'Start using professional proxies today.' : 'Please enter your details to log in.'}
                    </p>
                </div>

                {/* Google Button */}
                <button onClick={handleGoogleLogin} className="google-btn">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" alt="G" />
                    <span>Continue with Google</span>
                </button>

                <div className="divider"><span>OR</span></div>

                {/* Email Form */}
                <form onSubmit={handleEmailAuth} className="login-form">
                    {error && <div className="error-box">{error}</div>}

                    <div className="input-group">
                        <Mail size={20} className="input-icon" />
                        <input
                            type="email" placeholder="Email address" value={email}
                            onChange={(e) => setEmail(e.target.value)} required
                            className="modern-input"
                        />
                    </div>

                    <div className="input-group">
                        <Lock size={20} className="input-icon" />
                        <input
                            type="password" placeholder="Password" value={password}
                            onChange={(e) => setPassword(e.target.value)} required
                            className="modern-input"
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        {isRegistering ? 'Sign Up' : 'Sign In'} <ArrowRight size={18} />
                    </button>
                </form>

                {/* Toggle */}
                <p className="toggle-text">
                    {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                    <span onClick={() => {setIsRegistering(!isRegistering); setError('')}} className="toggle-link">
            {isRegistering ? 'Log In' : 'Sign Up'}
          </span>
                </p>

            </div>

            <style jsx>{`
        .login-container {
          min-height: 100vh; display: flex; justify-content: center; align-items: center;
          background-color: var(--bg-main); padding: 20px;
        }
        
        /* CUTE, ROUND CARD */
        .login-card {
          background: white; padding: 50px; width: 100%; max-width: 450px;
          border-radius: 32px; /* Very round corners */
          box-shadow: var(--shadow-hover); /* Soft floating shadow */
          text-align: center;
        }

        .login-header { margin-bottom: 30px; }
        .title { font-size: 24px; font-weight: 800; margin: 15px 0 5px 0; color: var(--text-main); }
        .subtitle { color: var(--text-muted); margin: 0; }

        /* Modern Google Button */
        .google-btn {
          width: 100%; padding: 14px; border-radius: 16px;
          border: 1px solid var(--border); background: white;
          color: var(--text-main); font-weight: 600; font-size: 15px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: all 0.2s;
        }
        .google-btn:hover { background: #f9fafb; border-color: #d1d5db; transform: translateY(-1px); }

        .divider {
          display: flex; align-items: center; margin: 25px 0; color: var(--text-muted); font-size: 12px;
          font-weight: 600;
        }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .divider span { padding: 0 15px; }

        /* CUTE BUBBLE INPUTS */
        .login-form { display: flex; flexDirection: column; gap: 15px; }
        .input-group { position: relative; }
        .modern-input {
          width: 100%; padding: 16px 16px 16px 48px; /* Room for icon */
          background: #f3f4f6; /* Light gray bubble */
          border: 2px solid transparent;
          border-radius: 16px; /* Round inputs */
          outline: none; font-size: 15px; color: var(--text-main); transition: 0.2s;
        }
        .modern-input:focus { background: white; border-color: var(--primary); box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1); }
        .input-icon { position: absolute; left: 16px; top: 16px; color: var(--text-muted); }

        .submit-btn {
          width: 100%; padding: 16px; border-radius: 16px; border: none;
          background: var(--primary); color: white; font-weight: 700; font-size: 16px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: 0.2s;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
        }
        .submit-btn:hover { background: var(--primary-hover); transform: translateY(-2px); }

        .toggle-text { margin-top: 25px; font-size: 14px; color: var(--text-muted); }
        .toggle-link { color: var(--primary); font-weight: 700; cursor: pointer; margin-left: 5px; }
        .error-box { background: #fee2e2; color: #991b1b; padding: 10px; border-radius: 12px; font-size: 13px; text-transform: capitalize; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); }}
      `}</style>
        </div>
    );
};

export default LoginPage;