// src/components/SupportChat.jsx
import React, { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Mail, Loader2 } from 'lucide-react'; // Added Loader icon

const SupportChat = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { text: "Hi! I'm the SuperProxy Bot. How can I help you today?", isBot: true }
    ]);
    const [isTyping, setIsTyping] = useState(false); // New state for typing indicator
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const faqs = [
        "How do I buy proxies?",
        "Payment issue",
        "Request refund",
        "Setup guide"
    ];

    const handleFaqClick = (question) => {
        // 1. Add User Question immediately
        setMessages(prev => [...prev, { text: question, isBot: false }]);
        setIsTyping(true); // Show typing...

        // 2. Realistic "Reading/Typing" Delay (1.2 seconds)
        setTimeout(() => {
            let answer = "Please click 'Contact Support' below for detailed help.";
            if (question.includes("buy")) answer = "Navigate to the Dashboard and click on any product card (Residential, ISP, etc.) to start an order.";
            if (question.includes("Payment")) answer = "We accept Cards, Crypto, and Alipay. If one method fails, please try Crypto as it is our most stable option.";
            if (question.includes("refund")) answer = "We offer a 24-hour money-back guarantee if the proxies are non-functional. Contact support to initiate.";
            if (question.includes("Setup")) answer = "You can find your proxy credentials (IP:Port:User:Pass) in the 'Orders' tab after purchase.";

            setMessages(prev => [...prev, { text: answer, isBot: true }]);
            setIsTyping(false); // Hide typing
        }, 1200);
    };

    const handleContactSupport = () => {
        // 1. User Action
        setMessages(prev => [...prev, { text: "I need to speak to an agent.", isBot: false }]);
        setIsTyping(true);

        // 2. Initial "Connecting" message (1.5s delay)
        setTimeout(() => {
            setMessages(prev => [...prev, { text: "Connecting you to the next available agent...", isBot: true }]);

            // Keep typing indicator on to simulate "Waiting"
            setIsTyping(true);

            // 3. LONG DELAY (4 seconds) - Simulates searching for agent
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, {
                    text: "All our agents are currently assisting other customers. Please email us directly at support@superproxy.store for priority assistance.",
                    isBot: true
                }]);
            }, 4000);

        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="chat-overlay">
            <div className="chat-window animate-slide-up">

                <div className="chat-header">
                    <div className="flex-align">
                        <div className="bot-avatar"><MessageCircle size={20} color="white" /></div>
                        <span>Support Assistant</span>
                    </div>
                    <button onClick={onClose} className="close-btn"><X size={20} /></button>
                </div>

                <div className="chat-body">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                            {msg.text}
                        </div>
                    ))}

                    {/* Typing Indicator Bubble */}
                    {isTyping && (
                        <div className="message bot typing">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="faq-area">
                    {faqs.map((faq, i) => (
                        <button key={i} className="faq-chip" onClick={() => !isTyping && handleFaqClick(faq)} disabled={isTyping}>
                            {faq}
                        </button>
                    ))}
                </div>

                <div className="chat-footer">
                    <button className="btn-contact-support" onClick={!isTyping ? handleContactSupport : undefined} disabled={isTyping}>
                        <Mail size={16} /> Contact Support
                    </button>
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

                .chat-body { flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background: #f8f9ff; scroll-behavior: smooth; }

                .message { max-width: 80%; padding: 10px 14px; border-radius: 12px; font-size: 14px; line-height: 1.4; animation: popIn 0.2s ease-out; }
                .message.bot { background: white; border: 1px solid #e5e7eb; align-self: flex-start; color: var(--text-main); border-bottom-left-radius: 2px; }
                .message.user { background: var(--primary); color: white; align-self: flex-end; border-bottom-right-radius: 2px; }

                /* Typing Dots Animation */
                .message.typing { display: flex; gap: 4px; align-items: center; padding: 12px 16px; width: fit-content; }
                .dot { width: 6px; height: 6px; background: #ccc; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; }
                .dot:nth-child(1) { animation-delay: -0.32s; }
                .dot:nth-child(2) { animation-delay: -0.16s; }

                @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
                @keyframes popIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

                .faq-area { padding: 10px 15px; display: flex; flex-wrap: wrap; gap: 8px; border-top: 1px solid #eee; }
                .faq-chip {
                    background: white; border: 1px solid var(--primary); color: var(--primary);
                    padding: 6px 12px; border-radius: 15px; font-size: 12px; cursor: pointer;
                    transition: 0.2s;
                }
                .faq-chip:hover { background: var(--primary); color: white; }
                .faq-chip:disabled { opacity: 0.5; cursor: default; }

                .chat-footer { padding: 15px; background: white; border-top: 1px solid #eee; text-align: center; }
                .btn-contact-support {
                    width: 100%; padding: 12px; background: var(--text-main); color: white;
                    border: none; border-radius: 12px; font-weight: 700; cursor: pointer;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    transition: 0.2s;
                }
                .btn-contact-support:hover { opacity: 0.9; }
                .btn-contact-support:disabled { background: #ccc; cursor: not-allowed; }

                .animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; }}
            `}</style>
        </div>
    );
};

export default SupportChat;