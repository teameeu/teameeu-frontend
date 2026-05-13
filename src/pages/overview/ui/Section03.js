import React from "react";
import "./overview.css";


export const Section03 = () => {
    return (
        <div className="overview-section" style={{display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center", alignItems: "center", padding: "120px"}}>
            <div className="section-02-tag">
                <span>웨이모 기능 안내</span>
            </div>
            <h1 style={{fontSize: "32px", fontWeight: "700", color: "var(--color-cyan-900)", margin: "20px 0px"}}>웨이모는 이렇게 작동해요!</h1>
            <h4 style={{fontSize: "20px", fontWeight: "700", color: "var(--color-gray-500)", margin: "32px 0px"}}>복잡한 진로 설계를 웨이모를 통해 정리해 보세요.<br/>
            웨이모와 함께라면 단 3단계만으로 간단히 정리할 수 있어요.</h4>
            <div className="section-row" style={{gap: "24px", height: "fit-content", marginTop: "64px", width: "100%", maxWidth: "1500px", position: "relative"}}>
                <hr className="section-divider"></hr>
                <div className="section-03-description">
                    <div className="section-03-num"><h1>1</h1></div>
                    <h3>진로 검사</h3>
                    <p>검사 결과를 봐도 잘 와닿지 않아요. ‘그래서 지금 내가 뭘 해야 하는 건데?’ 라는 생각이 들어요. <br />계획을 어디서부터 어떻게 세울지 모르겠어요.</p>
                </div>
                <div className="section-03-description">
                    <div className="section-03-num"><h1>2</h1></div>
                    <h3>AI 챗봇</h3>
                    <p>하고 싶은 건 있지만, 전체적인 구조를 <br />어떻게 바라봐야 할지 모르겠어요. <br />지금 당장 눈 앞에 있는 것들만 바라보게 돼요.</p>
                </div>
                <div className="section-03-description">
                    <div className="section-03-num"><h1>3</h1></div>
                    <h3>로드맵</h3>
                    <p>내가 이전에 어떤 활동을 했고, <br />어떻게 설명할 수 있을지 잘 모르겠어요. <br />경험이나 감정도 잘 기억나지 않아서 어려워요.</p>
                </div>
            </div>
        </div>
    );
};