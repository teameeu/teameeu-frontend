import "./Homepage.css";


export const Init = () => {
    return (
        <div className="column">
            <div className = "column">
                <div>
                    <h1>나를 알면 길이 보여요!</h1>
                    <p>웨이모의 진로 검사를 통해 나의 흥미와 적성, 가치관을 모두 파악해 보세요.
                        <br />검사 결과를 바탕으로 웨이모와 함께 진로를 설계할 수 있어요.</p>
                    <div className="row">
                        <div className="row">
                            <div></div>
                            <span>약 20분 소요</span>
                        </div>
                        <div className="row">
                            <div></div>
                            <span>무료</span>
                        </div>
                    </div>
                </div>
                <button className="start-btn">진로 검사 시작하기</button>
            </div>

            <div className = "column">
                <h2>진로 검사를 통해 알 수 있어요!</h2>
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
            </div>
        </div>
    );
};