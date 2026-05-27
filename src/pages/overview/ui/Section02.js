import React from "react";
import { ScrollArrow } from "@/shared/ui/ScrollArrow";
import "./Overview.css";


export const Section02 = () => {
    return (
        <div id="overview-section-02" className="overview-section" style={{display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center", alignItems: "center", padding: "120px", position: "relative"}}>
            <div className="section-02-tag">
                <span>웨이모 추천 대상</span>
            </div>
            <h1 style={{fontSize: "32px", fontWeight: "700", color: "var(--color-cyan-900)", margin: "20px 0px"}}>이런 경험이 있다면 웨이모를 추천해요!</h1>
            <h4 style={{fontSize: "20px", fontWeight: "700", color: "var(--color-gray-500)", margin: "32px 0px"}}>다양한 학생분들이 비슷한 어려움을 겪고 있어요.<br/>
            웨이모는 이런 문제를 겪는 학생들을 도와주기 위해서 생겨났어요.</h4>
            <div className="section-row" style={{gap: "24px", height: "fit-content", marginTop: "64px"}}>
                <div className="section-02-description">
                    <h3>01</h3>
                    <p>검사 결과를 봐도 잘 와닿지 않아요. ‘그래서 지금 내가 뭘 해야 하는 건데?’ 라는 생각이 들어요. 계획을 어디서부터 어떻게 세울지 모르겠어요.</p>
                </div>
                <div className="section-02-description">
                    <h3>02</h3>
                    <p>하고 싶은 건 있지만, 전체적인 구조를 어떻게 바라봐야 할지 모르겠어요. 지금 당장 눈 앞에 있는 것들만 바라보게 돼요.</p>
                </div>
                <div className="section-02-description">
                    <h3>03</h3>
                    <p>내가 이전에 어떤 활동을 했고, 어떻게 설명할 수 있을지 잘 모르겠어요. 경험이나 감정도 잘 기억나지 않아서 표현하기 어려워요.</p>
                </div>
            </div>
            <ScrollArrow targetId="overview-section-03" />
        </div>
    );
};