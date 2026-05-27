import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./SplashPage.css"

export const SplashPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/overview");
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);


    return (
        <div className="splash">
            <main className="splash-content">
                <img src="./img/logo/logo02.svg" alt="logo" />
                <p className="typo-display-small subtitle">데이터로 그리는 당신만의 가장 빠른 진로 지도</p>
            </main>
        </div>
    );
};