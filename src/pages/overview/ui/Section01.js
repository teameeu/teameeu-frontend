import React from "react";
import "./Overview.css";


export const Section01 = () => {
    return (
        <div className="overview-section gradation-bg section-row">
            <div>
                <h4 className="section-01-subtitle">데이터로 그리는</h4>
                <h4 className="section-01-subtitle">당신만의 가장 빠른 진로 지도</h4>
                <img src="./img/logo/logo02.svg" alt="logo" style={{ height: '50px', margin: '32px 0' }} />
                <div className="section-column" style={{margin: "40px 0px"}}>
                    <div className="section-01-description"><p>AI와 함께하는 진로 설계</p></div>
                    <div className="section-01-description"><p>성적, 적성을 고려한 진로 설계</p></div>
                    <div className="section-01-description"><p>학창 시절을 아우르는 진로 설계</p></div>
                </div>
                <div className="section-column">
                    <button className="section-01-btn btn-primary">
                        <p style={{color:"var(--color-base-000)"}}>시작하기</p>
                    </button>
                    <button className="section-01-btn btn-secondary">
                        <p>둘러보기</p>
                    </button>
                </div>
            </div>
            <img src="./img/overview-img.png" alt="overview" style={{ height: '100%' }} />
        </div>
    );
};