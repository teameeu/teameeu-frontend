import React, { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import "./testStyles.css";

export const TestForm = ({ test, targetSe, onBack, onSubmit }) => {
    const { user } = useAuth();

    const [gender, setGender] = useState("");
    const [grade, setGrade] = useState("1");
    const [school, setSchool] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const getTargetName = () => {
        switch (targetSe) {
            case "100205": return "초등학생";
            case "100206": return "중학생";
            case "100207": return "고등학생";
            case "100208": return "대학생";
            case "100209": return "일반 성인";
            default: return "일반";
        }
    };

    const isSchoolGradeNeeded = ["100205", "100206", "100207"].includes(targetSe);

    const getGradeOptions = () => {
        if (targetSe === "100205") {
            return [
                { value: "1", label: "1학년" },
                { value: "2", label: "2학년" },
                { value: "3", label: "3학년" },
                { value: "4", label: "4학년" },
                { value: "5", label: "5학년" },
                { value: "6", label: "6학년" }
            ];
        }
        return [
            { value: "1", label: "1학년" },
            { value: "2", label: "2학년" },
            { value: "3", label: "3학년" }
        ];
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!gender) return;

        onSubmit({
            qno: test.qno,
            targetSe,
            gender,
            grade: isSchoolGradeNeeded ? grade : "1",
            school: isSchoolGradeNeeded ? school.trim() : "",
            startDtm: Date.now()
        });
    };

    return (
        <div className="test-container">
            <button className="test-btn-back" style={{ marginBottom: "24px" }} onClick={onBack}>
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                    chevron_left
                </span>
                이전으로
            </button>

            <div className="glass-panel" style={{ maxWidth: "600px", margin: "0 auto" }}>
                <div className="test-header">
                    <span className="test-badge" style={{ marginBottom: "12px", display: "inline-block" }}>
                        {getTargetName()}
                    </span>
                    <h1 className="test-title-main" style={{ fontSize: "28px" }}>기본 인적사항 입력</h1>
                    <p className="test-subtitle-main">
                        커리어넷 진로 심리검사 결과를 발급받기 위해<br />
                        아래의 기본 정보들을 정확히 입력해 주세요.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>

                    <div className="result-card" style={{ marginBottom: "24px", padding: "16px 20px" }}>
                        <p style={{ fontWeight: "700", color: "var(--color-cyan-800)", marginBottom: "4px" }}>
                            선택한 검사: {test.name}
                        </p>
                        <p style={{ fontSize: "13px", color: "var(--color-cyan-900)", opacity: 0.8 }}>
                            {user?.userName ? `${user.userName}님, ` : ""}검사 결과를 커리어넷 공식 데이터베이스와 대조해 정밀 맞춤 보고서를 준비합니다.
                        </p>
                    </div>

                    <div className="form-group">
                        <label className="form-label">성별 <span style={{ color: "var(--color-red-500)" }}>*</span></label>
                        <div className="gender-cards-grid">
                            <div
                                className={`gender-card ${gender === "100323" ? "active" : ""}`}
                                onClick={() => setGender("100323")}
                            >
                                <span className="material-symbols-outlined gender-vector-icon">male</span>
                                <span className="gender-label">남성</span>
                            </div>
                            <div
                                className={`gender-card ${gender === "100324" ? "active" : ""}`}
                                onClick={() => setGender("100324")}
                            >
                                <span className="material-symbols-outlined gender-vector-icon">female</span>
                                <span className="gender-label">여성</span>
                            </div>
                        </div>
                    </div>

                    {isSchoolGradeNeeded && (
                        <>
                            <div className="form-group">
                                <label className="form-label">학교명 <span style={{ color: "var(--color-gray-400)", fontSize: "12px", fontWeight: "normal" }}>(선택 사항)</span></label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="예: 웨이모중학교"
                                    value={school}
                                    onChange={(e) => setSchool(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">학년 <span style={{ color: "var(--color-red-500)" }}>*</span></label>
                                <div className="dropdown" style={{ width: "100%", position: "relative" }}>
                                    <button
                                        type="button"
                                        className="form-input"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            textAlign: "left",
                                            cursor: "pointer",
                                            backgroundColor: "var(--color-base-000)",
                                            borderColor: isDropdownOpen ? "var(--color-cyan-400)" : "var(--color-gray-200)",
                                            boxShadow: isDropdownOpen ? "0 0 0 4px rgba(3, 149, 181, 0.12)" : "none"
                                        }}
                                    >
                                        <span>{getGradeOptions().find(opt => opt.value === grade)?.label || `${grade}학년`}</span>
                                        <span
                                            className="material-symbols-outlined"
                                            style={{
                                                fontSize: "22px",
                                                color: "var(--color-gray-500)",
                                                transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                                                transition: "transform 0.2s ease"
                                            }}
                                        >
                                            expand_more
                                        </span>
                                    </button>

                                    {isDropdownOpen && (
                                        <>
                                            <div
                                                onClick={() => setIsDropdownOpen(false)}
                                                style={{
                                                    position: "fixed",
                                                    inset: 0,
                                                    zIndex: 150,
                                                    backgroundColor: "transparent"
                                                }}
                                            />
                                            <ul
                                                style={{
                                                    position: "absolute",
                                                    top: "58px",
                                                    left: 0,
                                                    right: 0,
                                                    backgroundColor: "var(--color-base-000)",
                                                    border: "1.5px solid var(--color-cyan-200)",
                                                    borderRadius: "14px",
                                                    boxShadow: "0 12px 32px rgba(3, 149, 181, 0.1)",
                                                    padding: "6px 0",
                                                    margin: 0,
                                                    listStyle: "none",
                                                    zIndex: 200,
                                                    animation: "testSlideFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                                                }}
                                            >
                                                {getGradeOptions().map((opt) => (
                                                    <li
                                                        key={opt.value}
                                                        onClick={() => {
                                                            setGrade(opt.value);
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        style={{
                                                            padding: "12px 18px",
                                                            fontSize: "15px",
                                                            fontWeight: grade === opt.value ? "800" : "600",
                                                            color: grade === opt.value ? "var(--color-cyan-800)" : "var(--color-gray-700)",
                                                            backgroundColor: grade === opt.value ? "var(--color-cyan-050)" : "transparent",
                                                            cursor: "pointer",
                                                            transition: "all 0.15s ease"
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            if (grade !== opt.value) {
                                                                e.currentTarget.style.backgroundColor = "var(--color-gray-050)";
                                                                e.currentTarget.style.color = "var(--color-gray-900)";
                                                            }
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            if (grade !== opt.value) {
                                                                e.currentTarget.style.backgroundColor = "transparent";
                                                                e.currentTarget.style.color = "var(--color-gray-700)";
                                                            }
                                                        }}
                                                    >
                                                        {opt.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: "100%", height: "54px", justifyContent: "center", marginTop: "20px", fontSize: "16px" }}
                        disabled={!gender}
                    >
                        <span>진로 심리검사 시작하기</span>
                    </button>
                </form>
            </div>
        </div>
    );
};
