// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { Menu } from 'lucide-react'; // Hamburger Icon

import Sidebar from './components/Sidebar';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';

// Layout handles the Mobile Toggle Logic
const Layout = ({ children }) => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const showSidebar = location.pathname !== '/login';

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>

            {/* 1. Mobile Top Bar (Only visible on Phone) */}
            {showSidebar && (
                <div className="mobile-topbar">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}
                    >
                        <Menu size={24} />
                    </button>
                    <span style={{fontWeight: 'bold'}}>SuperProxy</span>
                    <div style={{width: '24px'}}></div> {/* Spacer to center title */}
                </div>
            )}

            <div style={{display: 'flex', flex: 1}}>
                {/* 2. Sidebar (Passed isOpen state) */}
                {showSidebar && (
                    <Sidebar
                        isOpen={sidebarOpen}
                        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    />
                )}

                {/* 3. Main Content Area */}
                <main style={{
                    flex: 1,
                    marginLeft: showSidebar ? '280px' : '0', // 280px matches CSS width
                    transition: 'margin-left 0.3s ease'
                }} className="main-content-mobile-fix">
                    {children}
                </main>
            </div>

            {/* CSS fix for mobile main content margin */}
            <style>{`
        @media (max-width: 768px) {
          .main-content-mobile-fix { margin-left: 0 !important; }
        }
      `}</style>
        </div>
    );
};

// ... (Rest of your ProtectedRoute and App logic remains the same)
const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return <div style={{color: 'white', padding: '20px'}}>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    return children;
};

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;