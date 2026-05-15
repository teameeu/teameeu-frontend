import React, { useState } from "react";
import "./JoinPage.css";

export const JoinPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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
        }
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
            <form className="column" style={{ gap: "48px" }}>  
                <div>
                    <div style={{ gap: "8px", alignItems: "center" }}>
                        <p className="form-label">이름</p>

                        <input
                            name="name"
                            placeholder="이름을 입력하세요."
                            value={form.name}
                            onChange={handleChange}
                        />

                        <p className={`alert ${form.name ? "success" : "error"}`}>
                            {form.name
                                ? alertTypes.name.success
                                : alertTypes.name.error}
                        </p>
                    </div>
                    <div style={{ gap: "8px", alignItems: "center" }}>
                        <p className="form-label">이메일</p>

                        <input
                            name="email"
                            placeholder="example@email.com"
                            value={form.email}
                            onChange={handleChange}
                        />

                        <p className={`alert ${form.email ? "success" : "error"}`}>
                            {form.email
                                ? alertTypes.email.success
                                : alertTypes.email.error}
                        </p>
                    </div>
                    <div style={{ gap: "8px", alignItems: "center" }}>
                        <p className="form-label">비밀번호</p>

                        <input
                            type="password"
                            name="password"
                            placeholder="영문 ∙ 숫자 포함 8자 이상"
                            value={form.password}
                            onChange={handleChange}
                        />

                        <p className={`alert ${form.password ? "success" : "error"}`}>
                            {form.password
                                ? alertTypes.password.success
                                : alertTypes.password.error}
                        </p>
                    </div>
                    <div style={{ gap: "8px", alignItems: "center" }}>
                        <p className="form-label">비밀번호 확인</p>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="영문 ∙ 숫자 포함 8자 이상."
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />

                        <p className={`alert ${form.confirmPassword ? "success" : "error"}`}>
                            {form.confirmPassword
                                ? alertTypes.confirmPassword.success
                                : alertTypes.confirmPassword.error}
                        </p>
                    </div>
                </div>
                <div className="row todo-item" style={{ gap: "8px", alignItems: "left" }}>
                    <input type="checkbox" id={`rule`} />
                    <label htmlFor={`rule`} className="typo-body-small todo-label">이용 약관에 동의합니다.</label>
                </div>
                <button className={`auth-btn ${form.name && form.email && form.password && form.confirmPassword && document.getElementById('rule')?.checked ? "enabled" : "disabled"}`} disabled={!form.name || !form.email || !form.password || !form.confirmPassword || !document.getElementById('rule')?.checked}>
                    다음으로
                </button>
            </form>
        </div>
    );
};