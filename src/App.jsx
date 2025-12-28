// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

import DashboardHome from './pages/DashboardHome';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';
import LoadingScreen from './components/LoadingScreen';

function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setTimeout(() => setLoading(false), 2000);
        });
        return () => unsubscribe();
    }, []);

    return (
        <BrowserRouter>
            <LoadingScreen />

            {/* Main Layout - Now uses CSS background instead of inline styles */}
            <div className="app-container">

                {!loading && (
                    <Routes>
                        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
                        <Route path="/dashboard" element={user ? <DashboardHome /> : <Navigate to="/login" />} />
                        <Route path="/order" element={user ? <OrderPage /> : <Navigate to="/login" />} />
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                )}

            </div>

            {/* Ensure full height background */}
            <style jsx>{`
        .app-container {
          min-height: 100vh;
          background-color: var(--bg-main);
        }
      `}</style>
        </BrowserRouter>
    );
}

export default App;