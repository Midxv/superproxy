import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { Menu } from 'lucide-react'; // Hamburger Icon

// Import Pages
import Sidebar from './components/Sidebar';
import DashboardHome from './pages/DashboardHome';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';

// --- COMPONENT 1: LAYOUT (Handles Sidebar & Mobile Toggle) ---
const Layout = ({ children }) => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Logic: Hide Sidebar/TopBar if we are on the Login page
    const isLoginPage = location.pathname === '/login';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-dark)' }}>

            {/* Mobile Top Bar (Only visible on Phones AND if logged in) */}
            {!isLoginPage && (
                <div className="mobile-topbar">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                        <Menu size={24} />
                    </button>
                    <span style={{ fontWeight: 'bold', fontSize: '18px' }}>SuperProxy</span>
                    <div style={{ width: '24px' }}></div> {/* Spacer to center title */}
                </div>
            )}

            <div style={{ display: 'flex', flex: 1, position: 'relative' }}>

                {/* Sidebar (Only if logged in) */}
                {!isLoginPage && (
                    <Sidebar
                        isOpen={sidebarOpen}
                        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    />
                )}

                {/* Main Content Area */}
                <main
                    className={!isLoginPage ? "main-content-with-sidebar" : "main-content-full"}
                    style={{
                        flex: 1,
                        marginLeft: !isLoginPage ? '280px' : '0', // Desktop margin matching sidebar width
                        transition: 'margin-left 0.3s ease',
                        width: '100%',
                        overflowX: 'hidden' // Prevents horizontal scroll on mobile
                    }}
                >
                    {children}
                </main>

            </div>

            {/* CSS Overrides for Mobile (Add this to App.css ideally, but here ensures it works) */}
            <style>{`
        @media (max-width: 768px) {
          .main-content-with-sidebar { margin-left: 0 !important; }
        }
        .mobile-topbar {
          display: none; /* Hidden on Desktop */
          align-items: center;
          justify-content: space-between;
          padding: 15px 20px;
          background: var(--bg-card);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        @media (max-width: 768px) {
          .mobile-topbar { display: flex; }
        }
      `}</style>
        </div>
    );
};

// --- COMPONENT 2: PROTECTED ROUTE (Security Check) ---
const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Firebase listener to check if user is logged in
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            Loading SuperProxy...
        </div>
    );

    // If no user found, kick them to Login
    if (!user) return <Navigate to="/login" replace />;

    return children;
};

// --- COMPONENT 3: MAIN APP (Routing) ---
function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {/* Public Route */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Protected Routes (Must be logged in) */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardHome />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/order"
                        element={
                            <ProtectedRoute>
                                <OrderPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Catch-all: Redirect unknown links to Dashboard */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;