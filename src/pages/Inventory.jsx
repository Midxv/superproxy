// src/pages/Inventory.jsx
import React, { useState, useEffect } from 'react';
import { PackageOpen, Copy, Power, Clock } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { db, auth } from '../firebaseConfig';
import { collection, onSnapshot, query, where, updateDoc, doc } from 'firebase/firestore';

const Inventory = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [proxies, setProxies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (auth.currentUser) {
            const inventoryRef = collection(db, "users", auth.currentUser.uid, "inventory");

            // --- THE MAGIC FILTER: Only show where isPurchased == true ---
            const q = query(inventoryRef, where("isPurchased", "==", true));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const items = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProxies(items);
                setLoading(false);
            });

            return () => unsubscribe();
        }
    }, []);

    const toggleProxy = async (id, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'off' : 'active';
        const itemRef = doc(db, "users", auth.currentUser.uid, "inventory", id);
        await updateDoc(itemRef, { status: newStatus });
    };

    const getTimeLeft = (expiryString) => {
        const total = Date.parse(expiryString) - Date.parse(new Date());
        if (total <= 0) return "Expired";
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        return `${days}d ${hours}h`;
    };

    return (
        <div className="page-container animate-fade-in">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <Header onOpenSidebar={() => setSidebarOpen(true)} />

            <div className="inventory-content">

                <div className="page-header">
                    <h1 className="title">My Proxies</h1>
                </div>

                {proxies.length === 0 && !loading ? (
                    // --- EMPTY STATE (Shows initially when boolean is false) ---
                    <div className="empty-state">
                        <div className="icon-box"><PackageOpen size={48} color="#d1d5db" /></div>
                        <h3>No orders made yet!</h3>
                        <p>Your active proxies and purchase history will appear here.</p>
                        <button className="btn-browse" onClick={() => window.location.href='/dashboard'}>
                            Browse Products
                        </button>
                    </div>
                ) : (
                    // --- PROXY CARDS (Shows when you change boolean to true) ---
                    <div className="proxy-grid">
                        {proxies.map((proxy) => (
                            <div key={proxy.id} className={`proxy-card ${proxy.status === 'off' ? 'disabled' : ''}`}>

                                <div className="card-top">
                                    <div className="ip-badge">
                                        <span className="type-label">{proxy.type}</span>
                                        <span className="ip-text">{proxy.ip}:{proxy.port}</span>
                                    </div>

                                    <button
                                        className={`toggle-btn ${proxy.status === 'active' ? 'on' : 'off'}`}
                                        onClick={() => toggleProxy(proxy.id, proxy.status)}
                                    >
                                        <Power size={16} />
                                        {proxy.status === 'active' ? 'ON' : 'OFF'}
                                    </button>
                                </div>

                                <div className="card-details">
                                    <div className="detail-row">
                                        <span className="label">User:</span>
                                        <code className="value">{proxy.username}</code>
                                        <Copy size={12} className="copy-icon" onClick={() => navigator.clipboard.writeText(proxy.username)}/>
                                    </div>
                                    <div className="detail-row">
                                        <span className="label">Pass:</span>
                                        <code className="value">{proxy.password}</code>
                                        <Copy size={12} className="copy-icon" onClick={() => navigator.clipboard.writeText(proxy.password)}/>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <Clock size={14} />
                                    <span>Expires in: <strong>{getTimeLeft(proxy.expiresAt)}</strong></span>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </div>

            <style jsx>{`
                .page-container { min-height: 100vh; background: var(--bg-main); padding-bottom: 40px; }
                .inventory-content { max-width: 1000px; margin: 0 auto; padding: 20px; }

                .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .title { font-size: 28px; font-weight: 800; color: var(--text-main); margin: 0; }

                /* Grid */
                .proxy-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }

                /* Card */
                .proxy-card { background: white; border: 1px solid var(--border); border-radius: 16px; padding: 20px; transition: 0.3s; position: relative; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
                .proxy-card.disabled { opacity: 0.7; background: #f9fafb; border-color: #e5e7eb; }
                .proxy-card.disabled .ip-text { text-decoration: line-through; color: #9ca3af; }

                .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; }
                .type-label { font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--primary); background: #f5f3ff; padding: 2px 6px; border-radius: 4px; display: block; width: fit-content; margin-bottom: 4px; }
                .ip-text { font-family: monospace; font-size: 16px; font-weight: 700; color: var(--text-main); }

                .toggle-btn { border: none; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; display: flex; align-items: center; gap: 4px; cursor: pointer; transition: 0.2s; }
                .toggle-btn.on { background: #dcfce7; color: #166534; }
                .toggle-btn.off { background: #fee2e2; color: #991b1b; }

                .card-details { background: #f8f9ff; padding: 12px; border-radius: 10px; margin-bottom: 15px; }
                .detail-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; font-size: 13px; }
                .detail-row:last-child { margin-bottom: 0; }
                .label { color: var(--text-muted); font-weight: 600; }
                .value { font-family: monospace; color: var(--text-main); background: rgba(255,255,255,0.5); padding: 2px 6px; border-radius: 4px; }
                .copy-icon { cursor: pointer; color: var(--primary); margin-left: 8px; opacity: 0.7; }
                .copy-icon:hover { opacity: 1; }

                .card-footer { border-top: 1px solid #f3f4f6; padding-top: 12px; display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-muted); }
                .card-footer strong { color: var(--primary); }

                /* Empty State */
                .empty-state { text-align: center; margin-top: 80px; display: flex; flex-direction: column; align-items: center; }
                .icon-box { background: white; padding: 20px; border-radius: 50%; box-shadow: var(--shadow-card); margin-bottom: 20px; }
                .btn-browse { background: var(--primary); color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; margin-top: 20px; }
                .btn-browse:hover { transform: translateY(-2px); }

                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity:0; } to { opacity:1; }}
            `}</style>
        </div>
    );
};

export default Inventory;