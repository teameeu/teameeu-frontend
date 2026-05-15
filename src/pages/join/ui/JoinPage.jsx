import React, { useState } from "react";
import { Step01 } from "../ui/Step01";
import { Step02 } from "../ui/Step02";
import "./JoinPage.css";


export const JoinPage = () => {
    const [step, setStep] = useState(1);
    const [isChecked, setIsChecked] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        birth: "",
        dreamJob: "",
        dreamDepartment: "",
    });

    const alertTypes = {
        name: {
            error: "* 필수 입력란입니다.",
            success: "",
        },
        email: {
            error: "* 이메일을 입력해주세요.",
            success: "✓ 사용 가능한 이메일입니다.",
        },
        password: {
            error: "* 비밀번호를 입력해주세요.",
            success: "✓ 사용 가능한 비밀번호입니다.",
        },
        confirmPassword: {
            error: "* 비밀번호가 일치하지 않습니다.",
            success: "✓ 비밀번호가 일치합니다.",
        },
        birth: {
            error: "* 생년월일을 입력해주세요.",
            success: "✓ 생년월일이 입력되었습니다.",
        },
        dreamJob: {
            error: "* 희망 직업을 입력해주세요.",
            success: "✓ 희망 직업이 입력되었습니다.",
        },
        dreamDepartment: {
            error: "* 희망 학과를 입력해주세요.",
            success: "✓ 희망 학과가 입력되었습니다.",
        },
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="auth-page column">
            { step === 1 && <Step01 form={form} alertTypes={alertTypes} handleChange={handleChange} setStep={setStep} isChecked={isChecked} setIsChecked={setIsChecked} /> }
            { step === 2 && <Step02 form={form} alertTypes={alertTypes} handleChange={handleChange} setStep={setStep} /> }
        </div>
    );
};