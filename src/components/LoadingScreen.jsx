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
          background-color: #000;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: fadeOut 0.5s ease-out 2s forwards; /* Fades out after 2s */
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-left-color: var(--primary); /* Teal color */
          border-radius: 50%;
          animation: spin 1s linear infinite;
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