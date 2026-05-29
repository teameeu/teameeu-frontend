import React, { useState, useEffect } from "react";
import { careernetApi, unwrapApiData } from "@/shared/api";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import "./testStyles.css";

const TARGET_LEVELS = [
    { id: "elementary", name: "초등학생", icon: "child_care", badgeClass: "elementary-badge", code: "100205" },
    { id: "middle", name: "중학생", icon: "school", badgeClass: "middle-badge", code: "100206" },
    { id: "high", name: "고등학생", icon: "history_edu", badgeClass: "high-badge", code: "100207" },
    { id: "adult", name: "대학생 & 일반", icon: "business_center", badgeClass: "adult-badge", codes: ["100208", "100209", "100210", "100214", "100215"] }
];

export const TestSelect = ({ onBack, onSelect }) => {
    const [selectedLevel, setSelectedLevel] = useState("middle");
    const [tests, setTests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTests = async () => {
            try {
                setIsLoading(true);
                const res = await careernetApi.getTests();
                const data = unwrapApiData(res.data) || [];
                setTests(data);
            } catch (err) {
                console.error("검사 목록 조회 실패:", err);
                setError("진로 심리검사 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTests();
    }, []);

    const filteredTests = tests.filter(test => {
        const activeLevel = TARGET_LEVELS.find(l => l.id === selectedLevel);
        if (!activeLevel) return false;

        if (activeLevel.id === "adult") {
            return test.targetCodes.some(code => activeLevel.codes.includes(code));
        } else {
            return test.targetCodes.includes(activeLevel.code);
        }
    });

    const getTestDescription = (qno) => {
        const descriptions = {
            "30": "나의 흥미 분야를 분석하여 몰입하고 활약할 수 있는 직업군을 제안합니다.",
            "31": "학습과 실무에서 어떠한 분야에 흥미를 강하게 느끼는지 상세히 진단합니다.",
            "8": "진로 의사결정과 진로 개발 준비도가 얼마나 갖추어져 있는지 다차원 분석합니다.",
            "9": "이공계 학과 전공 및 연구 직무에 대한 흥미와 적성이 적합한지 정밀 파악합니다.",
            "10": "스스로 지닌 강점과 능력 수준을 성찰하여 자신감 있는 진로 영역을 선별합니다.",
            "19": "초등학생 시기에 어떤 직업군과 직업적 가치에 흥미를 지니는지 분석합니다.",
            "32": "자기 이해 능력, 진로 탐색 및 생애 계획 능력을 체계적으로 점검합니다.",
            "20": "수리, 예술, 과학 등 학생이 발휘할 수 있는 직성 잠재 영역을 도출합니다.",
            "21": "잠재적 역량과 소질에 딱 맞는 희망 진로 및 직업 계열을 추천합니다.",
            "35": "진로 성숙성 수준(자율성, 계획성, 태도)을 측정하여 학업 설계를 지원합니다.",
            "36": "고등학생이 갖추어야 할 자아 이해와 진로 태도 성숙도를 종합 평가합니다.",
            "24": "직업을 가질 때 본인이 최고로 중시하는 직업적 핵심 가치관을 탐색합니다.",
            "25": "자아 실현, 안정성, 인정 등 미래에 양보할 수 없는 가장 소중한 가치를 파악합니다.",
            "6": "현명한 직무 매칭과 의사결정을 돕는 직업 가치관 정렬을 보여줍니다.",
            "26": "스스로 문제를 해결하고 생애를 주도적으로 이끌어가는 직업 역량을 체크합니다.",
            "27": "진로 장벽을 극복하고 성장을 이뤄낼 수 있는 진로 개발 역량 수준을 확인합니다.",
            "37": "목표한 진로를 실제로 행동으로 옮겨내는 실천 및 실행력 수준을 점검합니다.",
            "38": "수립한 진로 로드맵을 꾸준히 이행하고 극복하는 실천 동기를 입증합니다."
        };
        return descriptions[qno] || "나에게 어울리는 분야와 자아 실현 기회를 발굴하는 종합 진로 심리검사입니다.";
    };

    const handleSelectTest = (test) => {
        const activeLevel = TARGET_LEVELS.find(l => l.id === selectedLevel);
        let targetSe = "100206";
        if (activeLevel.id === "elementary") targetSe = "100205";
        if (activeLevel.id === "high") targetSe = "100207";
        if (activeLevel.id === "adult") {
            targetSe = test.targetCodes.includes("100208") ? "100208" : "100209";
        }

        onSelect(test, targetSe);
    };

    return (
        <div className="test-container">
            <button className="test-btn-back" style={{ marginBottom: "24px" }} onClick={onBack}>
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                    chevron_left
                </span>
                이전으로
            </button>

            <div className="glass-panel">
                <div className="test-header">
                    <h1 className="test-title-main">나에게 맞는 진로 검사 선택하기</h1>
                    <p className="test-subtitle-main">현재 본인의 신분을 선택하시면 알맞은 맞춤 심리검사를 추천해 드립니다.</p>
                </div>

                <div className="target-cards-grid">
                    {TARGET_LEVELS.map((level) => (
                        <div
                            key={level.id}
                            className={`target-card ${selectedLevel === level.id ? "active" : ""}`}
                            onClick={() => setSelectedLevel(level.id)}
                        >
                            <span className={`material-symbols-outlined target-vector-icon ${level.badgeClass}`}>
                                {level.icon}
                            </span>
                            <span className="target-name">{level.name}</span>
                        </div>
                    ))}
                </div>

                {isLoading && (
                    <div style={{ padding: "60px 0" }}>
                        <LoadingSpinner label="심리검사 목록을 불러오고 있습니다..." />
                    </div>
                )}

                {error && (
                    <div style={{ textAlign: "center", color: "var(--color-red-500)", padding: "40px 0" }}>
                        <p>{error}</p>
                        <button className="btn-primary" style={{ marginTop: "16px" }} onClick={() => window.location.reload()}>
                            다시 시도
                        </button>
                    </div>
                )}

                {!isLoading && !error && (
                    <div>
                        <h2 className="typo-heading-small" style={{ marginBottom: "20px", color: "var(--color-cyan-900)" }}>
                            진행 가능한 검사 목록 ({filteredTests.length}개)
                        </h2>

                        {filteredTests.length === 0 ? (
                            <p style={{ textAlign: "center", color: "var(--color-gray-500)", padding: "40px 0" }}>
                                현재 선택한 구분으로 제공되는 추천 검사가 없습니다.
                            </p>
                        ) : (
                            <div className="test-list-grid">
                                {filteredTests.map((test) => (
                                    <div
                                        key={test.qno}
                                        className="test-card"
                                        onClick={() => handleSelectTest(test)}
                                    >
                                        <div>
                                            <div className="test-card-header">
                                                <span className="test-badge">
                                                    {TARGET_LEVELS.find(l => l.id === selectedLevel)?.name}
                                                </span>
                                                <div className="test-time-badge">
                                                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                                                        schedule
                                                    </span>
                                                    <span>약 {test.qno === "24" || test.qno === "25" || test.qno === "6" ? "15" : "20"}분 소요</span>
                                                </div>
                                            </div>
                                            <h3 className="test-card-title">{test.name}</h3>
                                            <p className="test-card-desc">{getTestDescription(test.qno)}</p>
                                        </div>
                                        <div className="test-card-footer">
                                            <span>검사 시작하기</span>
                                            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                                                chevron_right
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
