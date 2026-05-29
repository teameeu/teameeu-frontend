import React, { useEffect, useRef } from "react";
import "./testStyles.css";

export const Init = ({ onStart }) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId;
        let particles = [];
        let mouse = { x: null, y: null };
        let lastTrailTime = 0;

        const resizeCanvas = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const createStar = (x, y) => {
            return {
                x,
                y,
                size: Math.random() * 8 + 4,
                alpha: Math.random() * 0.7 + 0.25,
                angle: Math.random() * Math.PI,
                spin: (Math.random() - 0.5) * 0.02,
                duration: Math.random() * 150 + 150,
                time: Math.random() * 150,
                type: "star",
                driftX: (Math.random() - 0.5) * 0.05,
                driftY: -Math.random() * 0.05
            };
        };

        for (let i = 0; i < 36; i++) {
            particles.push(createStar(Math.random() * canvas.width, Math.random() * canvas.height));
        }

        const createTrail = (x, y) => {
            return {
                x,
                y,
                size: Math.random() * 6 + 4,
                alpha: 1,
                angle: Math.random() * Math.PI,
                spin: (Math.random() - 0.5) * 0.1,
                vx: (Math.random() - 0.5) * 0.8 + 0.3,
                vy: Math.random() * 0.8 + 0.8,
                life: 1,
                decay: Math.random() * 0.015 + 0.015,
                type: "trail"
            };
        };

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

            mouse.x = x;
            mouse.y = y;

            const now = Date.now();
            if (now - lastTrailTime > 25) {
                lastTrailTime = now;
                for (let i = 0; i < 3; i++) {
                    particles.push(createTrail(x, y));
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        const drawSparkle = (x, y, size, alpha, angle) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.globalAlpha = alpha;
            ctx.shadowBlur = size * 1.2;
            ctx.shadowColor = "rgba(34, 211, 238, 0.95)";
            ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.quadraticCurveTo(0, 0, size, 0);
            ctx.quadraticCurveTo(0, 0, 0, size);
            ctx.quadraticCurveTo(0, 0, -size, 0);
            ctx.quadraticCurveTo(0, 0, 0, -size);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                if (p.type === "star") {
                    p.time += 1;
                    p.angle += p.spin;
                    p.x += p.driftX;
                    p.y += p.driftY;

                    if (p.x < 0) p.x = canvas.width;
                    if (p.x > canvas.width) p.x = 0;
                    if (p.y < 0) p.y = canvas.height;
                    if (p.y > canvas.height) p.y = 0;

                    const pulse = Math.sin((p.time / p.duration) * Math.PI * 2);
                    const currentAlpha = Math.max(0.18, p.alpha + pulse * 0.3);
                    const currentSize = Math.max(2, p.size * (0.8 + pulse * 0.2));

                    drawSparkle(p.x, p.y, currentSize, currentAlpha, p.angle);
                } else if (p.type === "trail") {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.alpha -= p.decay;
                    p.angle += p.spin;

                    if (p.alpha > 0) {
                        drawSparkle(p.x, p.y, p.size, p.alpha, p.angle);
                    }
                }
            });

            particles = particles.filter(p => p.type === "star" || p.alpha > 0);

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>

            <div
                className="column"
                ref={containerRef}
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
                <div className="dream-space-container">
                    <div className="aurora-sphere aurora-sphere-1"></div>
                    <div className="aurora-sphere aurora-sphere-2"></div>
                </div>

                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                        zIndex: 1
                    }}
                />

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
