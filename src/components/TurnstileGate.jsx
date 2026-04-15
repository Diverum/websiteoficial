import { useState, useEffect, useRef } from "react";

const SITE_KEY = "0x4AAAAAAC9t5adb-l49YeoK";

export default function TurnstileGate({ children }) {
  const [verified, setVerified] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const widgetRef = useRef(null);
  const rendered = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.turnstile && widgetRef.current && !rendered.current) {
        clearInterval(interval);
        rendered.current = true;
        window.turnstile.render(widgetRef.current, {
          sitekey: SITE_KEY,
          callback: () => {
            setFadeOut(true);
            setTimeout(() => setVerified(true), 800);
          },
          theme: "auto",
        });
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (verified) return children;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0B1215 0%, #0F2B3C 50%, #0D7C66 100%)",
      fontFamily: "'DM Sans', sans-serif",
      gap: 32,
      overflow: "hidden",
      position: "relative",
      opacity: fadeOut ? 0 : 1,
      transition: "opacity 0.8s ease",
    }}>
      {/* Animated background particles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
        }
        @keyframes logo3d {
          0% { transform: perspective(800px) rotateY(-15deg) rotateX(5deg) scale(1); }
          25% { transform: perspective(800px) rotateY(15deg) rotateX(-5deg) scale(1.05); }
          50% { transform: perspective(800px) rotateY(-5deg) rotateX(3deg) scale(1); }
          75% { transform: perspective(800px) rotateY(10deg) rotateX(-3deg) scale(1.03); }
          100% { transform: perspective(800px) rotateY(-15deg) rotateX(5deg) scale(1); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(13, 124, 102, 0.3), 0 0 60px rgba(13, 124, 102, 0.1); }
          50% { box-shadow: 0 0 40px rgba(13, 124, 102, 0.5), 0 0 80px rgba(13, 124, 102, 0.2); }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(16, 184, 146, 0.4);
          border-radius: 50%;
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${3 + Math.random() * 4}s`,
          width: `${2 + Math.random() * 4}px`,
          height: `${2 + Math.random() * 4}px`,
        }} />
      ))}

      {/* 3D Logo Container */}
      <div style={{
        animation: "logo3d 6s ease-in-out infinite",
        transformStyle: "preserve-3d",
      }}>
        {/* Pulse rings behind logo */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            position: "absolute",
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: "2px solid rgba(13, 124, 102, 0.3)",
            animation: "pulseRing 2s ease-out infinite",
          }} />
          <div style={{
            position: "absolute",
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: "2px solid rgba(13, 124, 102, 0.3)",
            animation: "pulseRing 2s ease-out infinite 0.5s",
          }} />

          {/* Logo icon */}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: "linear-gradient(135deg, #0D7C66 0%, #10B892 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "glow 3s ease-in-out infinite",
            position: "relative",
            zIndex: 2,
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Brand name with shimmer */}
      <div style={{ animation: "slideUp 0.8s ease-out 0.3s both" }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: 42,
          margin: 0,
          background: "linear-gradient(90deg, #E8ECF0, #10B892, #E8ECF0)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shimmer 3s linear infinite",
        }}>
          Diverum
        </h1>
        <p style={{
          color: "rgba(232, 236, 240, 0.6)",
          fontSize: 14,
          textAlign: "center",
          marginTop: 4,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}>
          Healthcare Automation
        </p>
      </div>

      {/* Turnstile widget */}
      <div style={{ animation: "slideUp 0.8s ease-out 0.6s both" }}>
        <div ref={widgetRef}></div>
      </div>

      {/* Security badge */}
      <div style={{
        animation: "slideUp 0.8s ease-out 0.9s both",
        display: "flex",
        alignItems: "center",
        gap: 6,
        color: "rgba(232, 236, 240, 0.4)",
        fontSize: 12,
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        Protected by Cloudflare
      </div>
    </div>
  );
}