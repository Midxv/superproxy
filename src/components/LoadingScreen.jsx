// src/components/LoadingScreen.jsx
import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="loader-container">
            <div className="spinner"></div>
            <style jsx>{`
                .loader-container {
                    position: fixed;
                    top: 0; left: 0; width: 100%; height: 100vh;
                    /* NEW: White background */
                    background-color: var(--bg-main);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    animation: fadeOut 0.5s ease-out 1.5s forwards;
                }

                .spinner {
                    width: 50px;
                    height: 50px;
                    /* NEW: Light gray base, Violet spinner */
                    border: 4px solid #e5e7eb;
                    border-left-color: var(--primary);
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @keyframes fadeOut {
                    0% { opacity: 1; }
                    90% { opacity: 1; pointer-events: none; }
                    100% { opacity: 0; visibility: hidden; pointer-events: none; }
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;