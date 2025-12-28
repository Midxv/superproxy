import React, { useState } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // 1. Handle Google Login
    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard'); // Redirect after success
        } catch (err) {
            setError(err.message);
        }
    };

    // 2. Handle Email/Pass Login & Register
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
            setError('Error: ' + err.message.replace('Firebase: ', ''));
        }
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>

                {/* Header */}
                <div style={{textAlign: 'center', marginBottom: '30px'}}>
                    <h2 style={{fontSize: '28px', margin: '0'}}>
                        {isRegistering ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p style={{color: 'var(--text-muted)'}}>
                        {isRegistering ? 'Join Super Proxy today' : 'Login to manage your proxies'}
                    </p>
                </div>

                {/* Google Button */}
                <button onClick={handleGoogleLogin} style={googleBtnStyle}>
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" alt="G" />
                    <span>Continue with Google</span>
                </button>

                <div style={dividerStyle}><span>OR</span></div>

                {/* Email Form */}
                <form onSubmit={handleEmailAuth} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>

                    {error && <p style={{color: '#ff4d4d', fontSize: '14px', textAlign: 'center'}}>{error}</p>}

                    <div style={inputGroupStyle}>
                        <Mail size={18} color="var(--text-muted)" />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={inputGroupStyle}>
                        <Lock size={18} color="var(--text-muted)" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <button type="submit" style={submitBtnStyle}>
                        {isRegistering ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>

                {/* Toggle Login/Register */}
                <p style={{textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text-muted)'}}>
                    {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                    <span
                        onClick={() => setIsRegistering(!isRegistering)}
                        style={{color: 'var(--primary)', cursor: 'pointer', marginLeft: '5px', fontWeight: 'bold'}}
                    >
            {isRegistering ? 'Login' : 'Sign Up'}
          </span>
                </p>

            </div>
        </div>
    );
};

// --- Styles ---
const containerStyle = {
    height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
    background: 'var(--bg-dark)'
};

const cardStyle = {
    background: 'var(--bg-card)', padding: '40px', borderRadius: '16px',
    border: '1px solid var(--border)', width: '100%', maxWidth: '400px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
};

const googleBtnStyle = {
    width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)',
    background: 'white', color: '#333', fontWeight: 'bold', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px'
};

const dividerStyle = {
    display: 'flex', alignItems: 'center', margin: '20px 0', color: 'var(--text-muted)', fontSize: '12px',
    gap: '10px'
};

const inputGroupStyle = {
    display: 'flex', alignItems: 'center', gap: '10px',
    background: '#121212', border: '1px solid var(--border)', borderRadius: '8px', padding: '0 12px'
};

const inputStyle = {
    width: '100%', padding: '14px 0', background: 'transparent', border: 'none',
    color: 'white', outline: 'none'
};

const submitBtnStyle = {
    width: '100%', padding: '14px', borderRadius: '8px', border: 'none',
    background: 'var(--primary)', color: '#000', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px'
};

export default LoginPage;