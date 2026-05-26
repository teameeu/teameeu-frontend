import instance from "./instance";

/**
 * 사용자의 모든 성적 조회
 * @returns {Promise}
 */
export const getGrades = () => {
    return instance.get("/grade/");
}

/**
 * 성적 등록
 * @param {Object} grade 
 * @returns {Promise} 생성된 성적 객체
 */
export const createGrade = (grade) => {
    return instance.post("/grade/", grade);
}

/**
 * 성적 삭제
 * @param {number} gradeId - 삭제할 성적 id
 * @returns {Promise}
 */
export const deleteGrade = (gradeId) => {
    return instance.delete(`/grade/${gradeId}`);
}

/**
 * 
 * @param {number} gradeId - 수정할 성적 id
 * @param {Object} data 
 * @returns {Promise}
 */
export const updateGrade = (gradeId, data) => {
    return instance.patch(`/grade/${gradeId}`, data);
}
