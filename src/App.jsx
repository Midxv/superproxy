// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

import DashboardHome from './pages/DashboardHome';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';
import LoadingScreen from './components/LoadingScreen';

// --- MAIN APP ---
function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Initial Auth Check
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // Keep loading screen for at least 2 seconds for effect
            setTimeout(() => setLoading(false), 2000);
        });
        return () => unsubscribe();
    }, []);

    return (
        <BrowserRouter>
            {/* 1. Global Loading Screen (Shows on every refresh) */}
            <LoadingScreen />

            {/* 2. Main Layout (No Sidebar) */}
            <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'white' }}>

                {!loading && (
                    <Routes>
                        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />

                        <Route path="/dashboard" element={user ? <DashboardHome /> : <Navigate to="/login" />} />

                        <Route path="/order" element={user ? <OrderPage /> : <Navigate to="/login" />} />

                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                )}

            </div>
        </BrowserRouter>
    );
}

export default App;