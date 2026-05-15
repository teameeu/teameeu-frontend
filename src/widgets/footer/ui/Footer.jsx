import "./Footer.css";


export const Footer = () => {
  return (
    <div className="footer">
        <img src="/img/logo/logo03.svg" alt="로고" className="footer-logo" />
        <h4 style={{ color: "var(--color-cyan-900)", fontSize: "16px", fontWeight: "700", margin: "0" }}>데이터로 그리는 당신만의 가장 빠른 진로 지도</h4>
       
        
        <div className="contents">
            <span>주소: 00000 서울시 웨이구 모어로 000, 웨이모</span>
            <div className="contents">
                <span>대표이사: 티미유</span>
                <span>|</span>
                <span>사업자등록번호: 000-00-00000</span>
                <span>|</span>
                <span>통신판매신고번호: 제 2026-서울-00000호</span>
            </div>
            <div className="item">
                <span>전화: 000-0000-0000</span>
                <span>|</span>
                <span>메일: 0000@email.com</span>
            </div>
        </div>
        <div className="contents">
            <div className="item">
                <span>공지사항</span>
                <span>|</span>
                <span>이용약관</span>
                <span>|</span>
                <span>개인정보처리방침</span>
                <span>|</span>
                <span>청소년보호정책</span>
                <span>|</span>
                <span>자주묻는질문</span>
            </div>
        </div>
        <p>Copyright © 2026 TMU. All rights reserved.</p>
    </div>
  );
};