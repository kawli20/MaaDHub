import { useEffect, useState } from "react";

const BG_IMAGE = "https://i.pinimg.com/1200x/f5/a6/a8/f5a6a839e3a7bc769edd82e903240134.jpg";

export default function ScrollingBackground() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = BG_IMAGE;
    const activate = () => setReady(true);
    const fail = () => setError(true);
    img.addEventListener("load", activate);
    img.addEventListener("error", fail);
    if (img.complete) {
      if (img.naturalWidth > 0) activate();
      else fail();
    }
    return () => {
      img.removeEventListener("load", activate);
      img.removeEventListener("error", fail);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: ready && !error ? 1 : 0,
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          animation: "bg-scroll 15s linear infinite alternate",
        }}
      />

      <div className="absolute inset-0 bg-black/70" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.04) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(255,255,255,0.03) 0%, transparent 45%)",
          animation: "fogDrift1 20s ease-in-out infinite",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.03) 0%, transparent 45%)",
          animation: "fogDrift2 24s ease-in-out infinite",
        }}
      />

      {error && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, #0a0a0a 0%, #020203 100%)",
          }}
        />
      )}
    </div>
  );
}
