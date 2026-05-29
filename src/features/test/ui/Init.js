import React, { useEffect, useRef } from "react";
import "./testStyles.css";

const STARS_DATA = [
    { top: "8%", left: "5%", size: "size-sm", delay: "0.2s" },
    { top: "12%", left: "45%", size: "size-md", delay: "1.5s" },
    { top: "5%", left: "80%", size: "size-lg", delay: "0.8s" },
    { top: "25%", left: "18%", size: "size-md", delay: "2.4s" },
    { top: "18%", left: "62%", size: "size-sm", delay: "0.5s" },
    { top: "30%", left: "88%", size: "size-md", delay: "1.1s" },
    { top: "42%", left: "12%", size: "size-lg", delay: "3.0s" },
    { top: "38%", left: "35%", size: "size-sm", delay: "1.8s" },
    { top: "55%", left: "78%", size: "size-md", delay: "2.1s" },
    { top: "48%", left: "52%", size: "size-sm", delay: "0.7s" },
    { top: "62%", left: "22%", size: "size-md", delay: "1.3s" },
    { top: "70%", left: "6%", size: "size-sm", delay: "2.7s" },
    { top: "68%", left: "40%", size: "size-lg", delay: "0.4s" },
    { top: "82%", left: "16%", size: "size-md", delay: "1.9s" },
    { top: "75%", left: "85%", size: "size-sm", delay: "3.2s" },
    { top: "88%", left: "60%", size: "size-md", delay: "0.9s" },
    { top: "90%", left: "30%", size: "size-lg", delay: "2.5s" },
    { top: "28%", left: "70%", size: "size-sm", delay: "1.6s" },
    { top: "15%", left: "28%", size: "size-md", delay: "2.0s" },
    { top: "52%", left: "93%", size: "size-sm", delay: "0.3s" },
    { top: "60%", left: "66%", size: "size-md", delay: "1.0s" },
    { top: "78%", left: "48%", size: "size-sm", delay: "2.2s" },
    { top: "84%", left: "95%", size: "size-md", delay: "1.4s" },
    { top: "35%", left: "3%", size: "size-sm", delay: "0.6s" },
    { top: "45%", left: "25%", size: "size-lg", delay: "1.7s" },
    { top: "92%", left: "75%", size: "size-sm", delay: "2.9s" },
    { top: "67%", left: "90%", size: "size-md", delay: "0.1s" },
    { top: "3%", left: "32%", size: "size-sm", delay: "2.3s" }
];

const DUST_DATA = [
    { top: "15%", left: "12%", delay: "0.5s" },
    { top: "8%", left: "38%", delay: "1.2s" },
    { top: "22%", left: "55%", delay: "0.2s" },
    { top: "10%", left: "88%", delay: "1.8s" },
    { top: "35%", left: "20%", delay: "2.5s" },
    { top: "28%", left: "42%", delay: "0.9s" },
    { top: "45%", left: "62%", delay: "1.5s" },
    { top: "32%", left: "95%", delay: "0.7s" },
    { top: "58%", left: "8%", delay: "2.1s" },
    { top: "50%", left: "30%", delay: "1.1s" },
    { top: "65%", left: "52%", delay: "2.7s" },
    { top: "52%", left: "84%", delay: "0.4s" },
    { top: "72%", left: "18%", delay: "1.9s" },
    { top: "78%", left: "62%", delay: "1.3s" },
    { top: "85%", left: "45%", delay: "2.3s" },
    { top: "90%", left: "12%", delay: "0.8s" },
    { top: "95%", left: "88%", delay: "3.0s" },
    { top: "62%", left: "75%", delay: "1.6s" },
    { top: "20%", left: "78%", delay: "2.2s" },
    { top: "40%", left: "8%", delay: "0.6s" },
    { top: "82%", left: "32%", delay: "1.4s" },
    { top: "88%", left: "78%", delay: "2.9s" },
    { top: "5%", left: "68%", delay: "0.1s" },
    { top: "70%", left: "95%", delay: "2.4s" }
];

export const Init = ({ onStart }) => {
    const spaceRef = useRef(null);

    useEffect(() => {
        const space = spaceRef.current;
        if (!space) return;

        let lastSpawnTime = 0;

        const handleMouseMove = (e) => {
            const now = Date.now();
            if (now - lastSpawnTime < 45) return;
            lastSpawnTime = now;

            const rect = space.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

            const particle = document.createElement("div");
            particle.className = "stardust-particle";

            const size = Math.floor(Math.random() * 5) + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x - size / 2}px`;
            particle.style.top = `${y - size / 2}px`;

            const duration = (Math.random() * 0.3 + 0.7).toFixed(2);
            particle.style.animationDuration = `${duration}s`;

            space.appendChild(particle);

            const cleanUp = () => {
                particle.removeEventListener("animationend", cleanUp);
                particle.remove();
            };
            particle.addEventListener("animationend", cleanUp);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (space) {
                const remnants = space.querySelectorAll(".stardust-particle");
                remnants.forEach((el) => el.remove());
            }
        };
    }, []);

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>

            <div
                className="column"
                style={{
                    width: "100%",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "calc(100vh - 56px)",
                    boxSizing: "border-box",
                    padding: "40px 0 60px 0",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div className="dream-space-container" ref={spaceRef}>
                    <div className="aurora-sphere aurora-sphere-1"></div>
                    <div className="aurora-sphere aurora-sphere-2"></div>
                    <div className="aurora-sphere aurora-sphere-3"></div>
                    <div className="aurora-sphere aurora-sphere-4"></div>

                    {STARS_DATA.map((star, idx) => (
                        <div
                            key={`star-${idx}`}
                            className={`dream-star ${star.size}`}
                            style={{
                                top: star.top,
                                left: star.left,
                                animationDelay: star.delay
                            }}
                        ></div>
                    ))}

                    {DUST_DATA.map((dust, idx) => (
                        <div
                            key={`dust-${idx}`}
                            className="dream-dust"
                            style={{
                                top: dust.top,
                                left: dust.left,
                                animationDelay: dust.delay
                            }}
                        ></div>
                    ))}
                </div>


                <div style={{ maxWidth: "1248px", margin: "0 auto", width: "100%", padding: "0 24px", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 2 }}>
                    <div className="init-gradient" style={{ marginBottom: "36px", width: "100%", padding: "40px 0" }}>
                        <div className="init-gradient-content">
                            <h1 style={{ fontSize: "40px", color: "var(--color-cyan-900)", marginBottom: "12px" }}>
                                나를 알면 길이 보여요!
                            </h1>
                            <p style={{ fontSize: "16px", fontWeight: "400", color: "var(--color-cyan-900)", lineHeight: "1.6" }}>
                                웨이모의 진로 검사를 통해 나의 흥미와 적성, 가치관을 모두 파악해 보세요.
                                <br />검사 결과를 바탕으로 웨이모와 함께 진로를 설계할 수 있어요.
                            </p>
                            <div className="row" style={{ alignItems: "center", justifyContent: "center", gap: "24px", marginTop: "20px" }}>
                                <div className="row" style={{ alignItems: "center", justifyContent: "center", gap: "6px" }}>
                                    <div className="init-circle"></div>
                                    <span style={{ fontSize: "14px", color: "var(--color-cyan-700)" }}>약 20분 소요</span>
                                </div>
                                <div className="row" style={{ alignItems: "center", justifyContent: "center", gap: "6px" }}>
                                    <div className="init-circle"></div>
                                    <span style={{ fontSize: "14px", color: "var(--color-cyan-700)" }}>무료</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="init-btn" onClick={onStart}>
                        <span>진로 검사 시작하기</span>
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>

            <div
                className="column"
                style={{
                    backgroundColor: "var(--color-cyan-200)",
                    height: "fit-content",
                    position: "relative",
                    padding: "120px 0",
                    width: "100%",
                }}
            >
                <div style={{ maxWidth: "1248px", margin: "0 auto", width: "100%", padding: "0 24px", boxSizing: "border-box" }}>
                    <h2 style={{ textAlign: "center", color: "var(--color-cyan-900)", fontSize: "28px", marginBottom: "8px" }}>
                        진로 검사를 통해 알 수 있어요!
                    </h2>

                    <div className="section-row" style={{ gap: "24px", height: "fit-content", marginTop: "40px" }}>
                        <div className="init-section2-card">
                            <h3>01</h3>
                            <div>
                                <h4>직업 흥미 유형</h4>
                                <p>학생이 어떤 활동에 흥미를 느끼고, 어떤 환경에서 몰입하는지 분석해요.</p>
                            </div>
                        </div>
                        <div className="init-section2-card">
                            <h3>02</h3>
                            <div>
                                <h4>직업 적성 유형</h4>
                                <p>언어 및 수리, 예술 등 다양한 영역 중에서 학생이 특히 강한 분야는 어디인지 파악해요.</p>
                            </div>
                        </div>
                        <div className="init-section2-card">
                            <h3>03</h3>
                            <div>
                                <h4>직업 가치관 유형</h4>
                                <p>인정 및 성취, 기여 등 다양한 가치 중에서 어떤 가치를 제일 우선시하는지 확인해요.</p>
                            </div>
                        </div>
                    </div>

                    <div className="init-description" style={{ marginTop: "40px" }}>
                        <h4>진로 검사 주의사항</h4>
                        <p>* 진로 검사는 참고 용도일 뿐, 꼭 이대로 따라야 하는 것은 아니에요.</p>
                        <p>* 모든 문항에 정답은 없어요. 솔직하게 답할 수록 나에게 딱 맞는 결과가 나올 수 있어요.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};
