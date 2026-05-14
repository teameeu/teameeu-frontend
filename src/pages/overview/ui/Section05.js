import React from "react";
import "./Overview.css";


export const Section05 = () => {
    return (
        <div className="overview-section revert-gradation-bg section-column" style={{gap: "64px", maxHeight: "fit-content", padding: "120px", position: "relative", textAlign: "center", justifyContent: "center", alignItems: "center"}}>
            <h4 style={{color: "var(--color-cyan-900)", marginBottom: "-30px", fontSize: "20px", fontWeight: "700"}}>데이터로 그리는 당신만의 가장 빠른 진로 지도</h4>
            <img src="./logo_login.svg" alt="logo" style={{ height: '50px', margin: "0" }} />
            <button className="section-01-btn btn-primary" style={{margin: "45px 120px", width: "calc(100% - 240px)"}}>
                <p>바로 시작하기</p>
            </button>
        </div>
    )
}