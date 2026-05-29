import React from "react";
import { Link } from "react-router-dom";
import "./testStyles.css";
import "./TestResult.css";

export const TestResult = ({ resultUrl, onRestart }) => {
    return (
        <div className="test-container">
            <div className="glass-panel" style={{ textAlign: "center", padding: "60px 40px", maxWidth: "700px", margin: "0 auto" }}>

                <div className="result-success-ring">
                    <div className="result-success-inner">
                        <span className="material-symbols-outlined result-success-vector">
                            verified
                        </span>
                    </div>
                </div>

                <h1 className="test-title-main" style={{ fontSize: "32px", marginBottom: "16px" }}>
                    진로 심리검사 완료!
                </h1>

                <p className="test-subtitle-main" style={{ fontSize: "16px", marginBottom: "32px", lineHeight: "1.6" }}>
                    성공적으로 답변 제출을 완료하였습니다.<br />
                    커리어넷의 정밀 진단 시스템을 기반으로 유저님의 특성, 흥미,<br />
                    가치관에 부합하는 분석 데이터 보고서가 발급되었습니다.
                </p>

                <div className="result-card">
                    <h3>
                        <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                            info
                        </span>
                        알아두기
                    </h3>
                    <p style={{ fontSize: "14px", opacity: 0.9 }}>
                        아래의 <strong>'자세한 결과 리포트 확인하기'</strong> 버튼을 클릭하시면 커리어넷에서 발행한 공식 진단 결과를 그래프 및 도표와 함께 깊이 있게 조회하실 수 있습니다.
                        결과를 충분히 정독해 보신 후, <strong>'나만의 맞춤형 로드맵 설계하기'</strong>를 클릭하여 웨이모의 미래 로드맵 설계 서비스를 연계해 보세요!
                    </p>
                </div>

                <div className="result-ctas">
                    <a
                        href={resultUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-button cta-report"
                    >
                        <span className="material-symbols-outlined">
                            open_in_new
                        </span>
                        자세한 결과 리포트 확인하기
                    </a>

                    <Link
                        to="/roadmap"
                        className="cta-button cta-roadmap"
                    >
                        <span className="material-symbols-outlined">
                            route
                        </span>
                        나만의 맞춤형 로드맵 설계하기
                    </Link>
                </div>

                <button
                    onClick={onRestart}
                    className="test-btn-back"
                    style={{ marginTop: "40px", height: "40px", padding: "0 16px", borderRadius: "10px", fontSize: "13px" }}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                        restart_alt
                    </span>
                    다른 진로 검사하러 가기
                </button>

            </div>
        </div>
    );
};
