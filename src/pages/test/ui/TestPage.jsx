import React, { useState } from "react";
import { Init, TestSelect, TestForm, TestActive, TestResult } from "@/features/test";
import "@/features/test/ui/testStyles.css";

export const TestPage = () => {
    const [step, setStep] = useState("init");
    const [selectedTest, setSelectedTest] = useState(null);
    const [targetSe, setTargetSe] = useState("");
    const [testInfo, setTestInfo] = useState(null);
    const [resultUrl, setResultUrl] = useState("");

    const handleStartSelect = () => {
        setStep("select");
    };

    const handleSelectTest = (test, chosenTargetSe) => {
        setSelectedTest(test);
        setTargetSe(chosenTargetSe);
        setStep("form");
    };

    const handleStartTest = (formData) => {
        setTestInfo(formData);
        setStep("active");
    };

    const handleTestComplete = (url) => {
        setResultUrl(url);
        setStep("result");
    };

    const handleRestart = () => {
        setSelectedTest(null);
        setTargetSe("");
        setTestInfo(null);
        setResultUrl("");
        setStep("select");
    };

    return (
        <div className="test-page-layout">
            {step === "init" && (
                <Init onStart={handleStartSelect} />
            )}

            {step === "select" && (
                <TestSelect
                    onBack={() => setStep("init")}
                    onSelect={handleSelectTest}
                />
            )}

            {step === "form" && (
                <TestForm
                    test={selectedTest}
                    targetSe={targetSe}
                    onBack={() => setStep("select")}
                    onSubmit={handleStartTest}
                />
            )}

            {step === "active" && (
                <TestActive
                    test={selectedTest}
                    info={testInfo}
                    onBack={() => setStep("form")}
                    onComplete={handleTestComplete}
                />
            )}

            {step === "result" && (
                <TestResult
                    resultUrl={resultUrl}
                    onRestart={handleRestart}
                />
            )}
        </div>
    );
};