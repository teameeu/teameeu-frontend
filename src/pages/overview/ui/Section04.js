import React from "react";
import { ScrollArrow } from "@/shared/ui/ScrollArrow";
import "./Overview.css";


export const Section04 = () => {
    return (
        <div id="overview-section-04" className="overview-section" style={{display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center", alignItems: "center", padding: "120px", position: "relative"}}>
            <div className="section-02-tag">
                <span>웨이모 데이터 안내</span>
            </div>
            <h1 style={{fontSize: "32px", fontWeight: "700", color: "var(--color-cyan-900)", margin: "20px 0px"}}>웨이모는 믿을 수 있어요!</h1>
            <h4 style={{fontSize: "20px", fontWeight: "700", color: "var(--color-gray-500)", margin: "32px 0px"}}>안정성과 기술력을 결합하여 서비스를 구축했어요.<br/>
            개인정보보호와 신뢰성있는 진로 설계가 웨이모의 최우선 목표예요.</h4>
            <div className="section-row" style={{gap: "24px", height: "fit-content", marginTop: "64px"}}>
                <div className="section-04-description">
                    <h3>믿을 수 있는 진로 검사</h3>
                    <p>
                        커리어넷의 공식적인 진로 검사 데이터와 연동되어 있어, 보다 효과적이고 신뢰도 높은 결과를 제공받을 수 있어요.</p>
                </div>
                <div className="section-04-description">
                    <h3>개인정보보호</h3>
                    <p>성적과 AI 채팅 내용 등 모든 개인정보는 안전하게 관리하고 있어요. 외부 단체 및 특정 인물에게 정보를 제공하지 않아요.</p>
                </div>
            </div>
            <div className="section-row" style={{gap: "24px", height: "fit-content", marginTop: "24px"}}>
                <div className="section-04-description">
                    <h3>교육부 디지털 혁신 방향</h3>
                    <p>고교학점제 및 AI 디지털 교과서 등 최신 교육 정책 방향에 맞춰 설계하고 있어요. 최신 동향에 맞닿아 있기 때문에 진로 설계에 효과적이에요.</p>
                </div>
                <div className="section-04-description">
                    <h3>온라인 접근성</h3>
                    <p>누구나 무료로 시작할 수 있어요. 고비용 진로 컨설팅의 정보 격차를 해소하는 게 웨이모의 목표예요. 어느 학교, 어느 지역에 있든 동등한 진로 설계 기회를 드려요.</p>
                </div>
            </div>
            <ScrollArrow targetId="overview-section-05" />
        </div>
    );
};