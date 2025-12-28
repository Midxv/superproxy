import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { Menu } from 'lucide-react';

// Import Pages
import Sidebar from './components/Sidebar';
import DashboardHome from './pages/DashboardHome';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';

// --- COMPONENT 1: LAYOUT ---
const Layout = ({ children }) => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Hide sidebar on Login page
    const isLoginPage = location.pathname === '/login';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-dark)' }}>

            {/* Mobile Top Bar */}
            {!isLoginPage && (
                <div className="mobile-topbar">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                        <Menu size={24} />
                    </button>
                    <span style={{ fontWeight: 'bold', fontSize: '18px' }}>SuperProxy</span>
                    <div style={{ width: '24px' }}></div>
                </div>
            )}

            <div style={{ display: 'flex', flex: 1, position: 'relative' }}>

                {/* Sidebar */}
                {!isLoginPage && (
                    <Sidebar
                        isOpen={sidebarOpen}
                        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    />
                )}

                {/* Main Content */}
                <main
                    className={!isLoginPage ? "main-content-with-sidebar" : "main-content-full"}
                    style={{
                        flex: 1,
                        marginLeft: !isLoginPage ? '280px' : '0',
                        transition: 'margin-left 0.3s ease',
                        width: '100%',
                        overflowX: 'hidden'
                    }}
                >
                    {children}
                </main>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .main-content-with-sidebar { margin-left: 0 !important; }
        }
        .mobile-topbar {
          display: none;
          align-items: center;
          justify-content: space-between;
          padding: 15px 20px;
          background: var(--bg-card);
          border-bottom: 1px solid var(--border);
          position: sticky; top: 0; z-index: 50;
        }
        @media (max-width: 768px) { .mobile-topbar { display: flex; } }
      `}</style>
        </div>
    );
};

// --- COMPONENT 2: PROTECTED ROUTE (If NOT logged in -> Go to Login) ---
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

    if (loading) return <div style={{color:'white', padding:'20px'}}>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;

    return children;
};

// --- COMPONENT 3: REDIRECT IF AUTHENTICATED (If ALREADY logged in -> Go to Dashboard) ---
// This is the new part that forces the "Refresh" behavior you asked for.
const RedirectIfAuthenticated = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return null; // Wait silently while checking status
    if (user) return <Navigate to="/dashboard" replace />; // If logged in, FORCE dashboard

    return children; // If not logged in, show the Login page
};

// --- MAIN APP ---
function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>

                    {/* WRAP LOGIN PAGE: If user is already logged in, they get kicked to Dashboard */}
                    <Route
                        path="/login"
                        element={
                            <RedirectIfAuthenticated>
                                <LoginPage />
                            </RedirectIfAuthenticated>
                        }
                    />

                    {/* PROTECTED ROUTES: Only accessible if logged in */}
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

                    {/* Root Path & Unknown Paths */}
                    {/* If user goes to root "/", check if logged in. If yes -> Dashboard. If no -> Login. */}
                    <Route
                        path="/"
                        element={
                            <RedirectIfAuthenticated>
                                <Navigate to="/login" replace />
                            </RedirectIfAuthenticated>
                        }
                    />

                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;