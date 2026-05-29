import instance from "./instance";

/**
 * 커리어넷 심리검사 목록 조회
 * @returns {Promise}
 */
export const getTests = () => {
    return instance.get("/careernet/tests");
};

/**
 * 특정 심리검사 문항 조회
 * @param {string} qno 심리검사 번호
 * @returns {Promise}
 */
export const getQuestions = (qno) => {
    return instance.get(`/careernet/tests/${qno}/questions`);
};

/**
 * 심리검사 답변 제출 및 결과 리포트 생성
 * @param {Object} data 검사 데이터 
 * @returns {Promise}
 */
export const createReport = (data) => {
    return instance.post("/careernet/reports", data);
};
