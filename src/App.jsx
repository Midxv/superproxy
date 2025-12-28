import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';

// This component handles the layout logic
const Layout = ({ children }) => {
    const location = useLocation();
    // Only show Sidebar if we are NOT on the login page
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

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<OrderPage />} />
                    {/* Default to login for now */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;