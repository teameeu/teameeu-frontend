import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import "./PreparingPage.css";

export const PreparingPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleBackClick = () => {
        if (isAuthenticated) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="preparing-page column">
            <div className="preparing-card column">
                <div className="illustration-container">
                    <svg
                        width="160"
                        height="160"
                        viewBox="0 0 160 160"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="preparing-svg"
                    >
                        <circle cx="80" cy="80" r="50" fill="var(--color-cyan-050)" opacity="0.6" className="glow-circle" />

                        <path
                            d="M35 110 C50 80, 70 120, 95 70 C105 50, 115 65, 125 45"
                            stroke="var(--color-cyan-200)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray="8 6"
                            className="dashed-path"
                        />

                        <circle cx="95" cy="70" r="14" fill="var(--color-cyan-100)" opacity="0.4" className="pulse-ring" />
                        <circle cx="95" cy="70" r="8" fill="var(--color-cyan-500)" />

                        <circle cx="35" cy="110" r="6" fill="var(--color-cyan-300)" />

                        <circle cx="125" cy="45" r="6" fill="var(--color-cyan-400)" />

                        <g className="gear-group">
                            <circle cx="80" cy="80" r="28" stroke="var(--color-cyan-500)" strokeWidth="5" fill="white" />
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                                <rect
                                    key={angle}
                                    x="76"
                                    y="46"
                                    width="8"
                                    height="10"
                                    rx="2"
                                    fill="var(--color-cyan-500)"
                                    transform={`rotate(${angle} 80 80)`}
                                />
                            ))}
                            <circle cx="80" cy="80" r="12" fill="var(--color-cyan-100)" />
                            <circle cx="80" cy="80" r="6" fill="var(--color-cyan-500)" />
                        </g>

                        <g className="sparkle-group">
                            <path d="M125 110 L127 115 L132 117 L127 119 L125 124 L123 119 L118 117 L123 115 Z" fill="var(--color-cyan-300)" />
                            <path d="M45 45 L46 48 L49 49 L46 50 L45 53 L44 50 L41 49 L44 48 Z" fill="var(--color-cyan-400)" />
                        </g>
                    </svg>
                </div>

                <div className="text-container column">
                    <h2 className="typo-heading-medium title">서비스 준비 중입니다</h2>
                    <p className="typo-body-medium desc-main">
                        {isAuthenticated 
                            ? "더 나은 서비스를 위해 진로검사 기능을 준비하고 있어요!" 
                            : "더 나은 서비스를 위해 소셜 로그인 기능을 준비하고 있어요!"}
                    </p>
                    <p className="typo-body-small desc-sub">
                        {isAuthenticated ? (
                            <>
                                학습 성향 진단 및 정밀 적성 검사를 바탕으로 한 진로 분석 기능은
                                <br />
                                현재 열심히 구축 중에 있습니다. 조금만 기다려 주시면
                                <br />
                                더욱 고도화된 맞춤형 분석 서비스로 찾아뵙겠습니다.
                            </>
                        ) : (
                            <>
                                카카오 로그인을 포함한 소셜 연동 기능은 현재 구축 중입니다.
                                <br />
                                불편하시겠지만 <strong>이메일 로그인</strong>을 통해
                                <br />
                                웨이모의 진로 설계 서비스를 먼저 빠르게 이용해 보세요.
                            </>
                        )}
                    </p>
                </div>

                <button className="back-btn btn-primary" onClick={handleBackClick}>
                    {isAuthenticated ? "대시보드로 돌아가기" : "이메일 로그인으로 돌아가기"}
                </button>
            </div>
        </div>
    );
};
