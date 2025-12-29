// src/components/SupportChat.jsx
import React, { useState } from 'react';
import { X, MessageCircle, Send, Mail } from 'lucide-react';

const SupportChat = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { text: "Hi! I'm the SuperProxy Bot. How can I help you today?", isBot: true }
    ]);

    const faqs = [
        "How do I buy proxies?",
        "Why is my payment failing?",
        "Do you offer refunds?"
    ];

    const handleFaqClick = (question) => {
        setMessages([...messages, { text: question, isBot: false }]);

        // Simulate Bot Response
        setTimeout(() => {
            let answer = "Please contact support@superproxy.store for detailed assistance.";
            if (question.includes("buy")) answer = "You can buy proxies from the Dashboard by selecting a product card.";
            if (question.includes("payment")) answer = "If card payment fails, please try using Cryptocurrency. It is our most stable method.";
            if (question.includes("refunds")) answer = "We offer a 24-hour money-back guarantee for technical issues.";

            setMessages(prev => [...prev, { text: answer, isBot: true }]);
        }, 600);
    };

    if (!isOpen) return null;

    return (
        <div className="chat-overlay">
            <div className="chat-window animate-slide-up">

                {/* Header */}
                <div className="chat-header">
                    <div className="flex-align">
                        <div className="bot-avatar"><MessageCircle size={20} color="white" /></div>
                        <span>Support Assistant</span>
                    </div>
                    <button onClick={onClose} className="close-btn"><X size={20} /></button>
                </div>

                {/* Messages Area */}
                <div className="chat-body">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>

                {/* FAQ Buttons */}
                <div className="faq-area">
                    {faqs.map((faq, i) => (
                        <button key={i} className="faq-chip" onClick={() => handleFaqClick(faq)}>
                            {faq}
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div className="chat-footer">
                    <div className="support-email">
                        <Mail size={16} /> support@superproxy.store
                    </div>
                </div>

            </div>

            <style jsx>{`
        .chat-overlay {
          position: fixed; bottom: 20px; right: 20px; z-index: 1000;
          display: flex; flex-direction: column; align-items: flex-end;
        }
        .chat-window {
          width: 350px; height: 500px; background: white;
          border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          display: flex; flex-direction: column; overflow: hidden;
          border: 1px solid var(--border);
        }
        
        .chat-header {
          background: var(--primary); color: white; padding: 15px;
          display: flex; justify-content: space-between; align-items: center; font-weight: 700;
        }
        .flex-align { display: flex; align-items: center; gap: 10px; }
        .bot-avatar { background: rgba(255,255,255,0.2); padding: 5px; border-radius: 50%; display:flex; }
        .close-btn { background: none; border: none; color: white; cursor: pointer; }

        .chat-body { flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background: #f8f9ff; }
        
        .message { max-width: 80%; padding: 10px 14px; border-radius: 12px; font-size: 14px; line-height: 1.4; }
        .message.bot { background: white; border: 1px solid #e5e7eb; align-self: flex-start; color: var(--text-main); border-bottom-left-radius: 2px; }
        .message.user { background: var(--primary); color: white; align-self: flex-end; border-bottom-right-radius: 2px; }

        .faq-area { padding: 10px 15px; display: flex; flex-wrap: wrap; gap: 8px; border-top: 1px solid #eee; }
        .faq-chip {
          background: white; border: 1px solid var(--primary); color: var(--primary);
          padding: 6px 12px; border-radius: 15px; font-size: 12px; cursor: pointer;
          transition: 0.2s;
        }
        .faq-chip:hover { background: var(--primary); color: white; }

        .chat-footer { padding: 15px; background: white; border-top: 1px solid #eee; text-align: center; }
        .support-email { display: flex; align-items: center; justify-content: center; gap: 8px; color: var(--text-muted); font-size: 13px; font-weight: 600; }

        .animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; }}
      `}</style>
        </div>
    );
};

export default SupportChat;