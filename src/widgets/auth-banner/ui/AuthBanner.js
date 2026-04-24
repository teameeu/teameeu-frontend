import "./AuthBanner.css"


export const AuthBanner = () => {
  return (
    <div className="auth-banner">
      
      {/* 상단 텍스트 */}
      <div className="auth-banner__top">
        <p>
          데이터로 그리는 <br />
          당신만의 가장 빠른 진로 지도
        </p>
        <img src="./logo_2.svg" />
      </div>

      {/* 중앙 로고 */}

      {/* 하단 리스트 */}
      <div className="auth-banner__bottom">
        <div className="auth-banner__pill">AI와 함께하는 진로 설계</div>
        <div className="auth-banner__pill">성적, 적성을 고려한 진로 설계</div>
        <div className="auth-banner__pill">학창 시절을 아우르는 진로 설계</div>
      </div>

    </div>
  );
};