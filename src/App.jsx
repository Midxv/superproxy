import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Pages
import DashboardHome from './pages/DashboardHome';
import OrderPage from './pages/OrderPage';
import AddFundsPage from './pages/AddFundsPage';
import PaymentProcessPage from './pages/PaymentProcessPage';
import LoginPage from './pages/LoginPage';
import LoadingScreen from './components/LoadingScreen';

// Security Wrappers
const RedirectIfAuthenticated = ({ children, user }) => {
    if (user) return <Navigate to="/dashboard" replace />;
    return children;
};

const ProtectedRoute = ({ children, user, loading }) => {
    if (loading) return null;
    if (!user) return <Navigate to="/login" replace />;
    return children;
};

function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setTimeout(() => setLoading(false), 1500);
        });
        return () => unsubscribe();
    }, []);

    return (
        <BrowserRouter>
            {loading && <LoadingScreen />}

            <div className="app-container">
                {!loading && (
                    <Routes>
                        {/* Public */}
                        <Route path="/login" element={
                            <RedirectIfAuthenticated user={user}><LoginPage /></RedirectIfAuthenticated>
                        } />

                        {/* Protected */}
                        <Route path="/dashboard" element={
                            <ProtectedRoute user={user} loading={loading}><DashboardHome /></ProtectedRoute>
                        } />

                        <Route path="/order" element={
                            <ProtectedRoute user={user} loading={loading}><OrderPage /></ProtectedRoute>
                        } />

                        <Route path="/add-funds" element={
                            <ProtectedRoute user={user} loading={loading}><AddFundsPage /></ProtectedRoute>
                        } />

                        <Route path="/payment-process" element={
                            <ProtectedRoute user={user} loading={loading}><PaymentProcessPage /></ProtectedRoute>
                        } />

                        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
                    </Routes>
                )}
            </div>
        </BrowserRouter>
    );
}

export default App;