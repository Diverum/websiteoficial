import { useState, useEffect, useRef } from "react";

const SITE_KEY = "0x4AAAAAAC9t5adb-l49YeoK";

const crawlerPattern = /(googlebot|adsbot-google|mediapartners-google|bingbot|slurp|duckduckbot|baiduspider|yandexbot|applebot|facebookexternalhit|facebot|twitterbot|linkedinbot|whatsapp|telegrambot|slackbot|discordbot|semrushbot|ahrefsbot|mj12bot)/i;

function isKnownCrawler() {
  return typeof navigator !== "undefined" && crawlerPattern.test(navigator.userAgent);
}

const LogoPlanet = ({ style }) => (
  <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" style={style}>
    <defs>
      <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7fb8b0" />
        <stop offset="40%" stopColor="#5a9e94" />
        <stop offset="100%" stopColor="#3d7a72" />
      </linearGradient>
    </defs>
    <path fill="url(#pg)" d="M763.11,554.53c0,0-239.59,383.65-541.91,428.22c0,0-73.01,13.69-134.87-14.82
      C64,957.64,27.55,926.53,24.05,902.2c-4.58-31.79-10.21-75.4,32.31-127.88c0,0,4.96,64.43,52.35,86.82
      c2.67,1.26,7.35,3.61,9.34,4.62c0.76,0.38,1.51,0.69,2.32,0.94c7.69,2.38,47.29,12.2,114.09-12.79
      c0,0-202.99-148.12-202.99-391.66c0-12.98,1.24-52.9,3.55-66.17c3.94-22.62,41.39-287.04,373.76-364.51
      c0,0,49.61-17.27-15.16,119.37c0,0-41.15,84.73-92.84,136.42c0,0,100.48-61.98,137.65-164.43c0,0,38.54-72.59,16.69-97.46
      c0,0,193.96-19.38,335.74,141.97c0,0,21.97,167.24-264.75,494.98c0,0,256.41-239.7,297.37-390.42c0,0,48.74-131.6,13.43-166.91
      c0,0-9.09-8.95-67.15-25.9c0,0-0.48-49.97,111.27-65.23c0,0,72.49,4.08,92.09,79.62c0,0,33.46,98.63-58.51,266.67
      c0,0,82.8,230.78-122.51,454.53c-14.05,15.31-60.29,56.92-78.83,66.29c-76.06,38.41-135.16,72.8-247.96,40.64
      C465.31,921.71,729.45,749.6,763.11,554.53z" />
  </svg>
);

export default function TurnstileGate({ children }) {
  const [verified, setVerified] = useState(() => isKnownCrawler());
  const [fadeOut, setFadeOut] = useState(false);
  const widgetRef = useRef(null);
  const rendered = useRef(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (verified) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        const alpha = 0.1 + 0.5 * ((Math.sin(t * s.speed * 60 + s.phase) + 1) / 2);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [verified]);

  useEffect(() => {
    if (verified) return;

    const interval = setInterval(() => {
      if (window.turnstile && widgetRef.current && !rendered.current) {
        clearInterval(interval);
        rendered.current = true;
        window.turnstile.render(widgetRef.current, {
          sitekey: SITE_KEY,
          callback: () => { setFadeOut(true); setTimeout(() => setVerified(true), 1200); },
          theme: "dark",
        });
      }
    }, 100);
    return () => clearInterval(interval);
  }, [verified]);

  if (verified) return children;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(ellipse at 50% 25%, #122a30 0%, #0B1215 60%, #060a0c 100%)",
      fontFamily: "'DM Sans', sans-serif",
      gap: 28,
      overflow: "hidden",
      position: "relative",
      opacity: fadeOut ? 0 : 1,
      transform: fadeOut ? "scale(1.08)" : "scale(1)",
      transition: "opacity 1.2s cubic-bezier(0.4,0,0.2,1), transform 1.2s cubic-bezier(0.4,0,0.2,1)",
    }}>
      <style>{`
        @keyframes planetWobble {
          0%   { transform: perspective(900px) rotateY(-20deg) rotateX(6deg); }
          25%  { transform: perspective(900px) rotateY(16deg) rotateX(-4deg); }
          50%  { transform: perspective(900px) rotateY(-10deg) rotateX(8deg); }
          75%  { transform: perspective(900px) rotateY(20deg) rotateX(-6deg); }
          100% { transform: perspective(900px) rotateY(-20deg) rotateX(6deg); }
        }

        @keyframes atmosPulse {
          0%, 100% {
            box-shadow:
              inset 0 0 20px rgba(127,184,176,0.15),
              0 0 35px 8px rgba(127,184,176,0.1),
              0 0 70px 18px rgba(127,184,176,0.05);
          }
          50% {
            box-shadow:
              inset 0 0 30px rgba(127,184,176,0.22),
              0 0 50px 15px rgba(127,184,176,0.15),
              0 0 100px 30px rgba(127,184,176,0.08);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }

        @keyframes nebulaBreathe {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.12); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes planetEntrance {
          0% { transform: perspective(900px) rotateY(-50deg) rotateX(15deg) scale(0.4); opacity: 0; }
          60% { transform: perspective(900px) rotateY(8deg) rotateX(-3deg) scale(1.04); opacity: 1; }
          100% { transform: perspective(900px) rotateY(-20deg) rotateX(6deg) scale(1); opacity: 1; }
        }

        @keyframes ringOrbit {
          0%   { transform: rotateX(68deg) rotateY(0deg); }
          100% { transform: rotateX(68deg) rotateY(360deg); }
        }

        @keyframes ringOrbit2 {
          0%   { transform: rotateX(72deg) rotateY(0deg) rotateZ(20deg); }
          100% { transform: rotateX(72deg) rotateY(-360deg) rotateZ(20deg); }
        }

        @keyframes dotTravel1 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes dotTravel2 { 0% { transform: rotate(180deg); } 100% { transform: rotate(540deg); } }
        @keyframes dotTravel3 { 0% { transform: rotate(90deg); } 100% { transform: rotate(450deg); } }

        @keyframes dotPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        @keyframes ghostPulse {
          0%, 100% { opacity: 0.06; transform: scale(1.15); }
          50% { opacity: 0.12; transform: scale(1.22); }
        }
      `}</style>

      {/* Canvas stars */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* Nebula */}
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(127,184,176,0.06) 0%, rgba(90,158,148,0.03) 30%, transparent 60%)",
        animation: "nebulaBreathe 6s ease-in-out infinite", pointerEvents: "none", zIndex: 1,
      }} />

      {/* Floating container */}
      <div style={{ animation: "float 6s ease-in-out infinite", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>

        <div style={{
          position: "relative", width: 260, height: 260,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>

          {/* === RING BEHIND PLANET === */}
          <div style={{
            position: "absolute", width: 240, height: 240,
            animation: "ringOrbit 12s linear infinite",
            transformStyle: "preserve-3d",
            zIndex: 1,
          }}>
            {/* Main ring — SOLID visible */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "2.5px solid rgba(180, 220, 215, 0.45)",
              boxShadow: "0 0 12px rgba(127,184,176,0.15), inset 0 0 12px rgba(127,184,176,0.08)",
            }} />
            {/* Second ring line */}
            <div style={{
              position: "absolute", inset: 6, borderRadius: "50%",
              border: "1.5px solid rgba(180, 220, 215, 0.2)",
            }} />
            {/* Third ring — outer glow */}
            <div style={{
              position: "absolute", inset: -4, borderRadius: "50%",
              border: "1px solid rgba(180, 220, 215, 0.12)",
            }} />

            {/* Dot 1 — main bright */}
            <div style={{ position: "absolute", inset: 0, animation: "dotTravel1 8s linear infinite" }}>
              <div style={{
                position: "absolute", top: -6, left: "50%", marginLeft: -6,
                width: 12, height: 12, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(200,230,225,1) 0%, rgba(127,184,176,0.4) 50%, transparent 100%)",
                boxShadow: "0 0 16px 6px rgba(127,184,176,0.5), 0 0 30px 10px rgba(127,184,176,0.2)",
                animation: "dotPulse 2s ease-in-out infinite",
              }} />
            </div>

            {/* Dot 2 */}
            <div style={{ position: "absolute", inset: 0, animation: "dotTravel2 8s linear infinite" }}>
              <div style={{
                position: "absolute", top: -4, left: "50%", marginLeft: -4,
                width: 8, height: 8, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(232,236,240,0.9) 0%, rgba(232,236,240,0.2) 50%, transparent 100%)",
                boxShadow: "0 0 12px 4px rgba(232,236,240,0.3)",
                animation: "dotPulse 3s ease-in-out infinite 1s",
              }} />
            </div>

            {/* Dot 3 */}
            <div style={{ position: "absolute", inset: 0, animation: "dotTravel3 12s linear infinite" }}>
              <div style={{
                position: "absolute", top: -3, left: "50%", marginLeft: -3,
                width: 6, height: 6, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(180,220,215,0.8) 0%, transparent 60%)",
                boxShadow: "0 0 8px 3px rgba(180,220,215,0.3)",
                animation: "dotPulse 2.5s ease-in-out infinite 0.5s",
              }} />
            </div>
          </div>

          {/* === SECOND RING === */}
          <div style={{
            position: "absolute", width: 200, height: 200,
            animation: "ringOrbit2 18s linear infinite",
            transformStyle: "preserve-3d",
            zIndex: 1,
          }}>
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "1px solid rgba(180, 220, 215, 0.12)",
            }} />
          </div>

          {/* Ghost depth */}
          <div style={{
            position: "absolute", width: 160, height: 160,
            animation: "ghostPulse 5s ease-in-out infinite",
            zIndex: 1, filter: "blur(15px)",
          }}>
            <LogoPlanet style={{ width: "100%", height: "100%" }} />
          </div>

          {/* === THE PLANET === */}
          <div style={{
            width: 140, height: 140,
            animation: "planetEntrance 1.5s cubic-bezier(0.34,1.56,0.64,1) forwards, planetWobble 10s ease-in-out 1.5s infinite",
            transformStyle: "preserve-3d",
            position: "relative",
            zIndex: 3,
          }}>
            <div style={{
              width: "100%", height: "100%", borderRadius: "50%",
              overflow: "hidden", position: "relative",
              animation: "atmosPulse 4s ease-in-out infinite",
              background: "radial-gradient(circle at 38% 32%, #8fc4bc 0%, #5a9e94 35%, #3d7a72 65%, #2a5c55 100%)",
            }}>
              {/* Logo texture */}
              <div style={{
                position: "absolute", inset: -12,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <LogoPlanet style={{
                  width: "118%", height: "118%",
                  filter: "brightness(1.4) saturate(0.8) contrast(0.9)",
                  opacity: 0.75,
                }} />
              </div>

              {/* Light — soft pastel highlight */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "radial-gradient(ellipse at 32% 28%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 25%, transparent 50%)",
                pointerEvents: "none",
              }} />

              {/* Shadow — softer */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "radial-gradient(ellipse at 78% 72%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 35%, transparent 60%)",
                pointerEvents: "none",
              }} />

              {/* Atmosphere rim — pastel teal */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "radial-gradient(circle, transparent 48%, rgba(180,220,215,0.05) 60%, rgba(180,220,215,0.12) 78%, rgba(180,220,215,0.25) 92%, rgba(180,220,215,0.1) 100%)",
                pointerEvents: "none",
              }} />

              {/* Specular — soft */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "radial-gradient(ellipse at 28% 18%, rgba(255,255,255,0.18) 0%, transparent 30%)",
                pointerEvents: "none",
              }} />
            </div>
          </div>

          {/* === RING IN FRONT === */}
          <div style={{
            position: "absolute", width: 240, height: 240,
            animation: "ringOrbit 12s linear infinite",
            transformStyle: "preserve-3d",
            zIndex: 5,
            clipPath: "polygon(0 0, 100% 0, 100% 42%, 0 42%)",
            pointerEvents: "none",
          }}>
            {/* Main ring front */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "2.5px solid rgba(180, 220, 215, 0.5)",
              boxShadow: "0 0 15px rgba(127,184,176,0.2), 0 0 30px rgba(127,184,176,0.08)",
            }} />
            <div style={{
              position: "absolute", inset: 6, borderRadius: "50%",
              border: "1.5px solid rgba(180, 220, 215, 0.25)",
            }} />
            <div style={{
              position: "absolute", inset: -4, borderRadius: "50%",
              border: "1px solid rgba(180, 220, 215, 0.15)",
            }} />

            {/* Front dots — brighter */}
            <div style={{ position: "absolute", inset: 0, animation: "dotTravel1 8s linear infinite" }}>
              <div style={{
                position: "absolute", top: -6, left: "50%", marginLeft: -6,
                width: 12, height: 12, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(220,245,240,1) 0%, rgba(180,220,215,0.5) 40%, transparent 100%)",
                boxShadow: "0 0 20px 8px rgba(180,220,215,0.6), 0 0 40px 12px rgba(127,184,176,0.25)",
                animation: "dotPulse 2s ease-in-out infinite",
              }} />
            </div>

            <div style={{ position: "absolute", inset: 0, animation: "dotTravel2 8s linear infinite" }}>
              <div style={{
                position: "absolute", top: -4, left: "50%", marginLeft: -4,
                width: 8, height: 8, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(240,245,244,1) 0%, rgba(232,236,240,0.3) 50%, transparent 100%)",
                boxShadow: "0 0 14px 4px rgba(232,236,240,0.4)",
                animation: "dotPulse 3s ease-in-out infinite 1s",
              }} />
            </div>

            <div style={{ position: "absolute", inset: 0, animation: "dotTravel3 12s linear infinite" }}>
              <div style={{
                position: "absolute", top: -3, left: "50%", marginLeft: -3,
                width: 6, height: 6, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(200,235,228,0.9) 0%, transparent 60%)",
                boxShadow: "0 0 10px 3px rgba(180,220,215,0.4)",
                animation: "dotPulse 2.5s ease-in-out infinite 0.5s",
              }} />
            </div>
          </div>

        </div>
      </div>

      {/* Brand name */}
      <div style={{ animation: "slideUp 0.8s ease-out 0.5s both", textAlign: "center", zIndex: 2 }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 50, margin: 0,
          background: "linear-gradient(90deg, #7a9e98, #a8d4cc, #E8ECF0, #a8d4cc, #7a9e98)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "shimmer 4s linear infinite", letterSpacing: 2,
        }}>
          Diverum
        </h1>
        <p style={{
          color: "rgba(232,236,240,0.45)", fontSize: 12, marginTop: 8,
          letterSpacing: 5, textTransform: "uppercase", fontWeight: 500,
        }}>
          Clinic Automation
        </p>
      </div>

      {/* Turnstile */}
      <div style={{ animation: "slideUp 0.8s ease-out 0.8s both", zIndex: 2 }}>
        <div ref={widgetRef}></div>
      </div>

      {/* Badge */}
      <div style={{
        animation: "slideUp 0.8s ease-out 1.1s both",
        display: "flex", alignItems: "center", gap: 8,
        color: "rgba(232,236,240,0.3)", fontSize: 10, letterSpacing: 2, zIndex: 2,
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        SECURED BY CLOUDFLARE
      </div>
    </div>
  );
}
