import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Page Imports
import DashboardHome from './pages/DashboardHome';
import OrderPage from './pages/OrderPage';
import PaymentProcessPage from './pages/PaymentProcessPage'; // New Crypto Timer Page
import LoginPage from './pages/LoginPage';
import LoadingScreen from './components/LoadingScreen';

// --- COMPONENT: REDIRECT IF LOGGED IN (For Login Page) ---
const RedirectIfAuthenticated = ({ children, user }) => {
    if (user) return <Navigate to="/dashboard" replace />;
    return children;
};

// --- COMPONENT: PROTECTED ROUTE (For Secure Pages) ---
const ProtectedRoute = ({ children, user, loading }) => {
    if (loading) return null; // Wait for auth check
    if (!user) return <Navigate to="/login" replace />;
    return children;
};

// --- MAIN APP COMPONENT ---
function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Listen to Firebase Auth state
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // Keep loader visible for a moment for smooth UX
            setTimeout(() => setLoading(false), 1500);
        });
        return () => unsubscribe();
    }, []);

    return (
        <BrowserRouter>

            {/* 1. Global Loading Overlay */}
            {loading && <LoadingScreen />}

            {/* 2. Main App Container */}
            <div className="app-container">
                {!loading && (
                    <Routes>

                        {/* PUBLIC ROUTE: Login (Redirects to Dashboard if already logged in) */}
                        <Route
                            path="/login"
                            element={
                                <RedirectIfAuthenticated user={user}>
                                    <LoginPage />
                                </RedirectIfAuthenticated>
                            }
                        />

                        {/* PROTECTED ROUTE: Dashboard */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute user={user} loading={loading}>
                                    <DashboardHome />
                                </ProtectedRoute>
                            }
                        />

                        {/* PROTECTED ROUTE: Order Page */}
                        <Route
                            path="/order"
                            element={
                                <ProtectedRoute user={user} loading={loading}>
                                    <OrderPage />
                                </ProtectedRoute>
                            }
                        />

                        {/* PROTECTED ROUTE: Payment Process (Authentic Crypto Timer) */}
                        <Route
                            path="/payment-process"
                            element={
                                <ProtectedRoute user={user} loading={loading}>
                                    <PaymentProcessPage />
                                </ProtectedRoute>
                            }
                        />

                        {/* CATCH-ALL: Redirect unknown URLs */}
                        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />

                    </Routes>
                )}
            </div>

        </BrowserRouter>
    );
}

export default App;