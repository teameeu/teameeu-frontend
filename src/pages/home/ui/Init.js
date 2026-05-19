import "./Homepage.css";


export const Init = () => {
    return (
        <div className="column" style={{ gap: "64px"}}>
            <div className="column" style={{ textAlign: "center", justifyContent: "center", alignItems: "center", alignContent: "center", gap: "16px", padding: "75px 0" }}>
                <div className="init-gradient" style={{ marginBottom: "64px", width: "100%" }}>
                    <h1 style={{ fontSize: "40px", color: "var(--color-cyan-900)" }}>나를 알면 길이 보여요!</h1>
                    <p style={{ fontSize: "16px", fontWeight: "400", color: "var(--color-cyan-900)" }}>웨이모의 진로 검사를 통해 나의 흥미와 적성, 가치관을 모두 파악해 보세요.
                        <br />검사 결과를 바탕으로 웨이모와 함께 진로를 설계할 수 있어요.</p>
                    <div className="row" style={{ alignItems: "center", justifyContent: "center", gap: "24px", marginTop: "32px" }}>
                        <div className="row" style={{ alignItems: "center", justifyContent: "center", gap: "6px" }}>
                            <div className="init-circle"></div>
                            <span>약 20분 소요</span>
                        </div>
                        <div className="row" style={{ alignItems: "center", justifyContent: "center", gap: "6px" }}>
                            <div className="init-circle"></div>
                            <span>무료</span>
                        </div>
                    </div>
                </div>
                <button className="init-btn">
                    <span>진로 검사 시작하기</span>
                    <span class="material-symbols-outlined">
                        chevron_right
                    </span>
                </button>
            </div>

            <div className="column" style={{backgroundColor:"var(--color-cyan-200)", height: "fit-content", position: "relative", padding: "120px 0"}}>
                <div class="cyan-200-full-bg"></div>
                <h2 style={{textAlign: "center", color: "var(--color-cyan-900)"}}>진로 검사를 통해 알 수 있어요!</h2>
                <div className="section-row" style={{ gap: "24px", height: "fit-content", marginTop: "40px" }}>
                    <div className="section-02-description">
                        <h3>01</h3>
                        <div>
                        <h4>직업 흥미 유형</h4>
                        <p>학생이 어떤 활동에 흥미를 느끼고, 어떤 환경에서 몰입하는지 분석해요.</p>
                        </div>
                    </div>
                    <div className="section-02-description">
                        <h3>02</h3>
                        <div>
                        <h4>직업 적성 유형</h4>
                        <p>언어 및 수리, 예술 등 다양한 영역 중에서 학생이 특히 강한 분야는 어디인지 파악해요.</p>
                        </div>
                    </div>
                    <div className="section-02-description">
                        <h3>03</h3>
                        <div>
                        <h4>직업 가치관 유형</h4>
                        <p>인정 및 성취, 기여 등 다양한 가치 중에서 어떤 가치를 제일 우선시하는지 확인해요.</p>
                        </div>
                    </div>
                </div>
                <div className="init-description">
                    <h4>진로 검사 주의사항</h4>
                    <p>* 진로 검사는 참고 용도일 뿐, 꼭 이대로 따라야 하는 것은 아니에요.</p>
                    <p>* 모든 문항에 정답은 없어요. 솔직하게 답할 수록 나에게 딱 맞는 결과가 나올 수 있어요.</p>
                </div>
            </div>
        </div>
    );
};