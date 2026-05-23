import instance from "./instance"


/**
 * 채팅방 전체 목록 조회
 * @returns {Promise}
 */
export const getChatRoom = () => {
    return instance.get("/chat");
}

/**
 * 특정 채팅방 내용 조회
 * @param {number} sessionId 
 * @returns {Promise}
 */
export const getChatRoomMessages = (sessionId) => {
    return instance.get(`/chat/${sessionId}`);
}