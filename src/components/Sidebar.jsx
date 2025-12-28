// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Home, Server, PenTool, HelpCircle, Lightbulb, Users, ChevronDown, ChevronRight, X } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    // State for collapsible menus
    const [showProxies, setShowProxies] = useState(true);
    const [showTools, setShowTools] = useState(false);

    return (
        <>
            {/* Mobile Overlay (Dark background when menu is open on phone) */}
            <div
                className={`overlay ${isOpen ? 'active' : ''}`}
                onClick={toggleSidebar}
            ></div>

            <div className={`sidebar ${isOpen ? 'open' : ''}`}>

                {/* Header (Logo + Close Button for Mobile) */}
                <div className="sidebar-header">
                    <h2>Super<span style={{color: 'var(--primary)'}}>Proxy</span></h2>
                    <button className="close-btn" onClick={toggleSidebar}>
                        <X size={24} />
                    </button>
                </div>

                {/* Balance Card (Matches Screenshot top left) */}
                <div className="balance-card">
                    <div className="balance-info">
                        <span className="balance-label">Balance</span>
                        <span className="balance-amount">$0.00</span>
                    </div>
                    <button className="btn-small">Add funds</button>
                </div>

                {/* Navigation */}
                <div className="nav-container">

                    <NavItem icon={<Home size={20} />} text="Home" active />

                    {/* Proxies Section (Collapsible) */}
                    <div className="nav-group">
                        <div
                            className="nav-item group-header"
                            onClick={() => setShowProxies(!showProxies)}
                        >
                            <div className="flex-center">
                                <Server size={20} />
                                <span>Proxies</span>
                            </div>
                            {showProxies ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </div>

                        {/* Dropdown Items */}
                        <div className={`sub-menu ${showProxies ? 'show' : ''}`}>
                            <a href="#" className="sub-item">Residential</a>
                            <a href="#" className="sub-item">ISP</a>
                            <a href="#" className="sub-item">Datacenter</a>
                            <a href="#" className="sub-item">Mobile</a>
                            <a href="#" className="sub-item">Web Unblocker</a>
                        </div>
                    </div>

                    {/* Tools Section (Collapsible) */}
                    <div className="nav-group">
                        <div
                            className="nav-item group-header"
                            onClick={() => setShowTools(!showTools)}
                        >
                            <div className="flex-center">
                                <PenTool size={20} />
                                <span>Tools</span>
                            </div>
                            {showTools ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </div>
                        <div className={`sub-menu ${showTools ? 'show' : ''}`}>
                            <a href="#" className="sub-item">API Tester</a>
                            <a href="#" className="sub-item">Proxy Checker</a>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <NavItem icon={<HelpCircle size={20} />} text="Help Center" />
                    <NavItem icon={<Lightbulb size={20} />} text="Got a Suggestion?" />
                    <NavItem icon={<Users size={20} />} text="Referral program" />

                </div>

                {/* Bottom Call to Action (Sales Card) */}
                <div className="sales-card">
                    <p>Have a large project?</p>
                    <button className="btn-outline">Contact sales</button>
                </div>

            </div>
        </>
    );
};

// Helper Component for simple items
const NavItem = ({ icon, text, active }) => (
    <div className={`nav-item ${active ? 'active' : ''}`}>
        <div className="flex-center">
            {icon}
            <span>{text}</span>
        </div>
    </div>
);

export default Sidebar;