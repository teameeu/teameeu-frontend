import React from "react";
import "./LoginPage.css";


export const LoginPage = () => {
    return(
        <div className="auth-page column">
            <div>
                <p style={{ fontSize: "14px", fontWeight: "700", textAlign: "center", color: "var(--color-gray-500)"}}>웨이모와 함께 진로 지도를 그려요</p>
                <img src="/img/logo/logo03.svg" alt="Logo" />
            </div>
            <form className="column" style={{ gap: "20px" }}>
                <div style={{ gap: "16px", alignItems: "center" }}>
                    <input placeholder="이메일" />
                    <input type="password" placeholder="비밀번호" />
                </div>
                <button>로그인</button>
            </form>
            <div className="row" style={{ display: "flex", gap: "16px", justifyContent: "center", width: "100%", alignItems: "center" }}>
                <hr />
                <span style={{ color: "var(--color-gray-500)", whiteSpace: "nowrap", fontWeight: "700", fontSize: "14px" }}>또는</span>
                <hr />
            </div>
            <button style={{ backgroundImage: "url('/img/btn/kakao_login_large_wide.svg')", backgroundSize: "cover" }}></button>
            <div className="row" style={{ display: "flex", gap: "8px", justifyContent: "center", width: "100%" }}>
                <span>회원가입</span>
                <span>|</span>
                <span>비밀번호 찾기</span>
            </div>

        </div>
    )
}