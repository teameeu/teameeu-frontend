import instance from "./instance";

/**
 * 회원가입
 * @param {Object} form 
 * @returns {Promise} 서버 응답
 */
export const signup = (form) => {
    return instance.post("/auth/join", form);
};

/**
 * 로그인
 * - 성공 시 accessToken은 body, refreshToken은 httpOnly 쿠키로 응답
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
export const login = (email, password) => {
    return instance.post("/auth/login", { email, password });
}

/**
 * 토큰 갱신
 * @returns {Promise}
 */
export const refresh = () => {
    return instance.post("/auth/refresh");
}

/**
 * 사용자 정보 조회
 */
export const gertUser = () => {
    return instance.get("/auth/user");
}

/**
 * 로그아웃
 * - refresh 삭제
 * - access 메모리에서 삭제
 * @returns {Promise} 
 */
export const logout = () => {
    return instance.post("/auth/logout");
}

