import React, { useState, useEffect, useRef } from "react";
import { careernetApi, unwrapApiData } from "@/shared/api";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import "./testStyles.css";
import "./TestActive.css";

export const TestActive = ({ test, info, onBack, onComplete }) => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const transitionTimeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setIsLoading(true);
                const res = await careernetApi.getQuestions(test.qno);
                const rawData = unwrapApiData(res.data);

                const list = rawData?.RESULT || rawData?.result || rawData || [];

                if (list.length === 0) {
                    throw new Error("문항을 찾을 수 없습니다.");
                }

                setQuestions(list);
            } catch (err) {
                setError("질문 데이터를 가져오는 데 실패했습니다. 다시 시도해 주세요.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, [test.qno]);

    const currentQuestion = questions[currentIndex];

    const getOptions = (q) => {
        if (!q) return [];
        const opts = [];
        for (let i = 1; i <= 10; i++) {
            const key = `answer${String(i).padStart(2, "0")}`;
            const scoreKey = `answerScore${String(i).padStart(2, "0")}`;
            if (q[key]) {
                opts.push({
                    label: q[key],
                    value: q[scoreKey] || String(i)
                });
            }
        }
        return opts;
    };

    const handleSelectOption = (value) => {
        setAnswers(prev => ({
            ...prev,
            [currentIndex]: value
        }));

        if (currentIndex < questions.length - 1) {
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
            }
            transitionTimeoutRef.current = setTimeout(() => {
                setCurrentIndex(prev => Math.min(prev + 1, questions.length - 1));
            }, 220);
        }
    };

    const handlePrev = () => {
        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
        }
        setCurrentIndex(prev => Math.max(prev - 1, 0));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError("");

        try {
            const usesEqualsFormat = test.answerExample && test.answerExample.includes("=");

            let answersString = "";
            if (usesEqualsFormat) {
                answersString = questions.map((q, idx) => {
                    const qNum = q.qitemNo || (idx + 1);
                    const val = answers[idx] || "1";
                    return `${qNum}=${val}`;
                }).join(" ");
            } else {
                answersString = questions.map((_, idx) => {
                    return answers[idx] || "1";
                }).join(",");
            }

            const payload = {
                qno: test.qno,
                trgetSe: info.targetSe,
                gender: info.gender,
                school: info.school || "",
                grade: info.grade || "1",
                startDtm: info.startDtm,
                answers: answersString
            };

            const res = await careernetApi.createReport(payload);
            const reportData = unwrapApiData(res.data);

            const resultUrl = reportData?.RESULT?.url || reportData?.result?.url || reportData?.url;

            if (!resultUrl) {
                throw new Error("결과 리포트 URL 발급 실패");
            }

            onComplete(resultUrl);
        } catch (err) {
            setError("답변 제출 중 오류가 발생했습니다. 다시 제출해 주십시오.");
            setIsSubmitting(false);
        }
    };

    const totalQuestions = questions.length;
    const progressPercent = totalQuestions > 0 ? Math.round(((currentIndex + 1) / totalQuestions) * 100) : 0;
    const isAllAnswered = Object.keys(answers).length === totalQuestions;

    if (isLoading) {
        return (
            <div className="test-container" style={{ padding: "100px 0" }}>
                <LoadingSpinner label="진로 검사 문항을 구성하고 있습니다..." />
            </div>
        );
    }

    if (isSubmitting) {
        return (
            <div className="test-container" style={{ padding: "100px 0" }}>
                <LoadingSpinner label="답변을 분석하여 정밀 맞춤 보고서를 발급받는 중입니다..." />
            </div>
        );
    }

    if (error && !questions.length) {
        return (
            <div className="test-container">
                <div className="glass-panel" style={{ textAlign: "center", padding: "40px" }}>
                    <p style={{ color: "var(--color-red-500)", fontWeight: "700" }}>{error}</p>
                    <button className="btn-primary" style={{ marginTop: "20px" }} onClick={onBack}>
                        돌아가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="test-container">
            <div className="row" style={{ justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span className="test-badge">{test.name}</span>
                <span className="typo-caption-medium" style={{ color: "var(--color-gray-500)" }}>
                    이전 정보 입력 양식으로 돌아가려면 상단 '이전'이 아닌 검사 취소를 해주세요.
                </span>
            </div>

            <div className="glass-panel" style={{ padding: "32px 40px" }}>

                <div className="progress-container">
                    <div className="progress-info">
                        <span>진행률: {progressPercent}%</span>
                        <span>{currentIndex + 1} / {totalQuestions} 문항</span>
                    </div>
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                </div>

                {currentQuestion && (
                    <div className="question-card" key={currentIndex}>
                        <span className="question-number">Q. {currentIndex + 1}</span>
                        <h2 className="question-text">{currentQuestion.question}</h2>
                    </div>
                )}

                <div className="options-grid">
                    {getOptions(currentQuestion).map((opt, idx) => {
                        const isSelected = answers[currentIndex] === opt.value;
                        return (
                            <button
                                key={idx}
                                className={`option-button ${isSelected ? "selected" : ""}`}
                                onClick={() => handleSelectOption(opt.value)}
                            >
                                <span className="option-index">{idx + 1}</span>
                                <span>{opt.label}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="nav-row">
                    <button
                        className="test-btn-back"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                            chevron_left
                        </span>
                        이전 문항
                    </button>

                    {error && (
                        <span style={{ color: "var(--color-red-500)", fontSize: "14px", fontWeight: "600" }}>
                            {error}
                        </span>
                    )}

                    {currentIndex >= totalQuestions - 1 ? (
                        <button
                            className="btn-primary"
                            onClick={handleSubmit}
                            disabled={!isAllAnswered || isSubmitting}
                        >
                            <span>검사 완료 및 제출</span>
                            <span className="material-symbols-outlined">
                                send
                            </span>
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
