import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Sidebar from './components/Sidebar';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';

// 1. Component to Layout the Sidebar
const Layout = ({ children }) => {
    const location = useLocation();
    const showSidebar = location.pathname !== '/login';

    return (
        <div style={{display: 'flex', minHeight: '100vh'}}>
            {showSidebar && <Sidebar />}
            <main style={{flex: 1, marginLeft: showSidebar ? '250px' : '0'}}>
                {children}
            </main>
        </div>
    );
};

// 2. Component to Protect Routes
const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen for login state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return <div style={{color: 'white', padding: '20px'}}>Loading...</div>;

    // If not logged in, kick them back to login
    if (!user) return <Navigate to="/login" replace />;

    return children;
};

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    {/* Wrap Dashboard in ProtectedRoute */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <OrderPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Redirect random URLs to dashboard (which handles the auth check) */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;