import React from 'react';
import Sidebar from './components/Sidebar';
import OrderPage from './pages/OrderPage';

function App() {
    return (
        <div style={{display: 'flex', minHeight: '100vh'}}>
            <Sidebar />
            <main style={{flex: 1, marginLeft: '250px'}}>
                <OrderPage />
            </main>
        </div>
    );
}

export default App;