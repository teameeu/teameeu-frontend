import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/shared/api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import "./LoginPage.css";


export const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getLoginErrorMessage = (error) => {
        if (!error.response) {
            return "서버 응답을 받을 수 없습니다. API 주소 또는 CORS/HTTPS 설정을 확인해주세요.";
        }

        return error.response.data?.message ?? "로그인 중 오류가 발생했습니다.";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitting) return;
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            const { data } = await authApi.login(email, password);
            const payload = data?.data ?? data;
            const accessToken = payload?.accessToken;
            const userData = payload?.user ?? payload?.member ?? payload?.profile ?? { email };

            if (!accessToken) {
                throw new Error("accessToken 미발급");
            }

            await login(accessToken);
            navigate("/dashboard", { replace: true });

        } catch (error) {
            console.error("Login failed", {
                status: error.response?.status,
                code: error.code,
                message: error.response?.data?.message ?? error.message,
            });
            setErrorMessage(getLoginErrorMessage(error));

        } finally {
            setIsSubmitting(false);
        }
    }



    return (
        <div className="auth-page column">
            {isSubmitting && <LoadingSpinner label="로그인 중" fullscreen />}

            <div>
                <p style={{ fontSize: "14px", fontWeight: "700", textAlign: "center", color: "var(--color-gray-500)" }}>
                    웨이모와 함께 진로 지도를 그려요
                </p>
                <img src="/img/logo/logo03.svg" alt="Logo" />
            </div>

            <form className="column" style={{ gap: "20px" }} onSubmit={handleSubmit}>
                <div style={{ gap: "16px", alignItems: "center" }}>
                    <input
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                </div>

                {errorMessage ? (<p className="typo-caption-medium" style={{ color: "var(--color-red-600)", margin: 0 }}>{errorMessage}</p>) : null}

                <button
                    className="enabled"
                    type="submit"
                    disabled={isSubmitting}
                >
                    로그인
                </button>
            </form>

            <div className="row" style={{ display: "flex", gap: "16px", justifyContent: "center", width: "100%", alignItems: "center" }}>
                <hr />
                <span style={{ color: "var(--color-gray-500)", whiteSpace: "nowrap", fontWeight: "700", fontSize: "14px" }}>또는</span>
                <hr />
            </div>

            <button
                className="enabled"
                style={{ backgroundImage: "url('/img/btn/kakao_login_large_wide.svg')", backgroundSize: "cover" }}
            ></button>

            <div className="row" style={{ display: "flex", gap: "8px", justifyContent: "center", width: "100%" }}>
                <span>회원가입</span>
                <span>|</span>
                <span>비밀번호 찾기</span>
            </div>
        </div>
    )
}
