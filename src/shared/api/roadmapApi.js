import instance from "./instance";

// TODO: - 로드맵 아이템 추천
export const recommendRoadmapItem = () => {
    return instance.post("/roadmap/recommend");
}

// TODO: - 로드맵 아이템 추가
export const createRoadmapItem = (data) => {
    return instance.post("/roadmap/item", data);
}

// TODO: - 로드맵 아이템 삭제
export const deleteRoadmapItem = (roadmapItemId) => {
    return instance.delete(`/roadmap/item/${roadmapItemId}`);
}

// TODO: - 로드맵 아이템 수정
export const updateRoadmapItem = (roadmapItemId, data) => {
    return instance.patch(`/roadmap/item/${roadmapItemId}`, data);
}

// TODO: - 로드맵 아이템 내용 조회
export const getRoadmapItem = (itemId) => {
    return instance.get(`/roadmap/${itemId}`);
}

// TODO: - 로드맵 조회
export const getRoadmap = () => {
    return instance.get('/roadmap/');
}

// TODO: - 로드맵 삭제
export const deleteRoadmap = (roadmapId) => {
    return instance.delete(`/roadmap/${roadmapId}`);
}