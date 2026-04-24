import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./SplashPage.css"

export const SplashPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            const splash = document.querySelector('.splash');
            splash.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = "/login";
            }, 3000); // CSS duration과 맞추기
        }, 3000);
    }, []);


    return (
        <div className="splash">
            <main className="splash-content">
                <img src="./logo_2.svg" alt="logo" />
                <p className="typo-display-small subtitle">데이터로 그리는 당신만의 가장 빠른 진로 지도</p>
            </main>
        </div>
    );
};