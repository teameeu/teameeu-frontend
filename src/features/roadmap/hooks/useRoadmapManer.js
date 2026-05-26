import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { roadmapApi } from "@/shared/api";
import { unwrapApiData } from "@/shared/api/unwrapApiData";

export const ROADMAP_STATUS = {
    TODO: "TODO",
    IN_PROGRESS: "IN_PROGRESS",
    DONE: "DONE",
};

export const STATUS_LABEL = {
    [ROADMAP_STATUS.TODO]: "예정된 항목",
    [ROADMAP_STATUS.IN_PROGRESS]: "진행 중 항목",
    [ROADMAP_STATUS.DONE]: "완료된 항목",
};

export const useRoadmapManager = () => {
    const [items, setItems] = useState([]);
    const [roadmapMeta, setRoadmapMeta] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const itemsRef = useRef([]);
    useEffect(() => {
        itemsRef.current = items;
    }, [items]);

    const normalizeItems = useCallback((payload) => {
        if (Array.isArray(payload?.items)) return payload.items;
        if (Array.isArray(payload)) return payload;
        return [];
    }, []);

    const loadRoadmap = useCallback(async (silent = false) => {
        if (!silent) {
            setIsLoading(true);
        }
        setError("");

        try {
            const { data } = await roadmapApi.getRoadmap();
            const payload = unwrapApiData(data);
            const nextItems = normalizeItems(payload);

            setItems(nextItems);
            setRoadmapMeta({
                roadmapId: payload?.roadmapId ?? null,
                title: payload?.title ?? "",
                createdAt: payload?.createdAt ?? null,
            });
        } catch (err) {
            setError("로드맵 로드 실패");
            if (!silent) {
                setItems([]);
                setRoadmapMeta(null);
            }
        } finally {
            if (!silent) {
                setIsLoading(false);
            }
        }
    }, [normalizeItems]);

    useEffect(() => {
        loadRoadmap();
    }, [loadRoadmap]);

    const createItem = useCallback(async (payload) => {
        setIsSubmitting(true);
        setError("");

        try {
            await roadmapApi.createRoadmapItem(payload);
            await loadRoadmap(true);
            return true;
        } catch (err) {
            setError("항목 추가에 실패했습니다.");
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, [loadRoadmap]);

    const updateItem = useCallback(async (roadmapItemId, payload) => {
        setIsSubmitting(true);
        setError("");

        try {
            await roadmapApi.updateRoadmapItem(roadmapItemId, payload);
            await loadRoadmap(true);
            return true;
        } catch (err) {
            setError("항목 수정에 실패했습니다.");
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, [loadRoadmap]);

    const changeStatus = useCallback(async (roadmapItemId, nextStatus) => {
        const currentItems = itemsRef.current;
        const currentItem = currentItems.find((item) => item.roadmapItemId === roadmapItemId);
        if (!currentItem) return false;

        if (currentItem.status === nextStatus) return true;

        const previousStatus = currentItem.status;

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.roadmapItemId === roadmapItemId
                    ? { ...item, status: nextStatus }
                    : item
            )
        );

        setIsSubmitting(true);
        setError("");

        try {
            await roadmapApi.updateRoadmapItem(roadmapItemId, {
                title: currentItem.title ?? "",
                description: currentItem.description ?? "",
                startedAt: currentItem.startedAt,
                endedAt: currentItem.endedAt,
                status: nextStatus,
            });
            await loadRoadmap(true);
            return true;
        } catch (err) {
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.roadmapItemId === roadmapItemId
                        ? { ...item, status: previousStatus }
                        : item
                )
            );
            setError("상태 변경에 실패했습니다. 이전 상태로 롤백됩니다.");
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, [loadRoadmap]);

    const deleteItem = useCallback(async (roadmapItemId) => {
        setIsSubmitting(true);
        setError("");

        try {
            await roadmapApi.deleteRoadmapItem(roadmapItemId);
            await loadRoadmap(true);
            return true;
        } catch (err) {
            setError("항목 삭제에 실패했습니다.");
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, [loadRoadmap]);


    // TODO: - 연산로직 shared 승격(임시) / 백엔드에 연산 로직 구현 완료 시, 삭제
    const todoCount = useMemo(
        () => items.filter((item) => item.status === ROADMAP_STATUS.TODO).length,
        [items]
    );
    const inProgressCount = useMemo(
        () => items.filter((item) => item.status === ROADMAP_STATUS.IN_PROGRESS).length,
        [items]
    );
    const doneCount = useMemo(
        () => items.filter((item) => item.status === ROADMAP_STATUS.DONE).length,
        [items]
    );

    const achievement = useMemo(() => {
        if (items.length === 0) return 0;
        return Math.round((doneCount / items.length) * 100);
    }, [items, doneCount]);

    const hasItems = useMemo(() => items.length > 0, [items]);

    return {
        items,
        roadmapMeta,
        todoCount,
        inProgressCount,
        doneCount,
        achievement,
        hasItems,
        isLoading,
        isSubmitting,
        error,
        loadRoadmap,
        createItem,
        updateItem,
        changeStatus,
        deleteItem,
    };
};