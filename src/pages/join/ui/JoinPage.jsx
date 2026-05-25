import React, { useMemo, useState } from "react";
import { Step01 } from "../ui/Step01";
import { Step02 } from "../ui/Step02";
import { authApi } from "@/shared/api";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import { useAuth } from "@/features/auth/hooks/useAuth";
import "./JoinPage.css";
import { useNavigate } from "react-router-dom";


export const JoinPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [step, setStep] = useState(1);
    const [isChecked, setIsChecked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState("");


    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        birth: "",
        dreamJob: "",
        dreamDepartment: "",
    });

    const alertTypes = useMemo(
        () => ({
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
        })
    );

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSignup = async () => {
        setSubmitError("");
        setSubmitSuccess("");

        if (form.password !== form.confirmPassword) {
            setSubmitError("비밀번호가 일치하지 않습니다.");
            return;
        }

        setIsSubmitting(true);

        try {
            const { data } = await authApi.signup({
                userName: form.name,
                email: form.email,
                password: form.password,
                passwordCheck: form.confirmPassword,
                birthday: form.birth,
                department: form.dreamDepartment,
                career: form.dreamJob,
            });

            // 회원가입 후, accessToken 발급됨
            const accessToken = data?.accessToken;
            const userData = data?.user ?? data?.member ?? data?.profile ?? { email: form.email, name: form.name };

            if (accessToken) {
                login(accessToken, userData);
                setSubmitSuccess("회원가입이 완료되었습니다!");
                setTimeout(() => navigate("/dashboard", { replace: true }), 700);
                return;
            }

        } catch (error) {
            setSubmitError("회원가입 중 오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page column">
            {isSubmitting && <LoadingSpinner label="회원가입 중..." fullscreen />}
            {step === 1 && (
                <Step01
                    form={form}
                    alertTypes={alertTypes}
                    handleChange={handleChange}
                    setStep={setStep}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                    setSubmitError={setSubmitError}
                />
            )}

            {step === 2 && (
                <Step02
                    form={form}
                    alertTypes={alertTypes}
                    handleChange={handleChange}
                    setStep={setStep}
                    onSubmit={handleSignup}
                    submitError={submitError}
                    submitSuccess={submitSuccess}
                    isSubmitting={isSubmitting}
                />
            )}
        </div>
    );
};