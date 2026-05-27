import { useEffect, useState } from "react";
import "./Overview.css";
import { Section01 } from "./Section01";
import { Section02 } from "./Section02";
import { Section03 } from "./Section03";
import { Section04 } from "./Section04";
import { Section05 } from "./Section05";


export const Overview = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 50);

    const removeTimer = setTimeout(() => {
      setShowOverlay(false);
    }, 850);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {showOverlay && (
        <div className={`transition-overlay ${isFading ? "fade-out" : ""}`} />
      )}
      <div className="section-column" style={{ gap: "120px" }}>
        <Section01 />
        <Section02 />
        <Section03 />
        <Section04 />
        <Section05 />
      </div>
    </div>
  );
};