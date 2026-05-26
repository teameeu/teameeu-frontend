import { useCallback, useEffect, useMemo, useState } from "react";
import { gradeApi } from "@/shared/api";
import { unwrapApiData } from "@/shared/api/unwrapApiData";

export const useGradeManager = () => {
    const [grade, setGrade] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    // TODO: - shared 승격(공통 응답 dto를 직렬화 해야함)
    const normalizeGrades = useCallback((payload) => {
        if (Array.isArray(payload)) return payload;
        if (Array.isArray(payload?.grades)) return payload.grades;
        if (Array.isArray(payload?.grade)) return payload.grade;
        if (Array.isArray(payload?.items)) return payload.items;
        if (Array.isArray(payload?.content)) return payload.content;
        if (Array.isArray(payload?.list)) return payload.list;
        if (payload && typeof payload === "object" && ("gradeId" in payload || "subject" in payload)) {
            return [payload];
        }
        if (payload && typeof payload === "object") {
            const nestedArray = Object.values(payload).find((value) => Array.isArray(value));
            if (nestedArray) return nestedArray;
        }
        return [];

    }, []);

    const loadGrades = useCallback(async () => {
        setIsLoading(true);
        setError("");

        try {
            const { data } = await gradeApi.getGrades();
            const rawPayload = unwrapApiData(data);
            const nextGrades = normalizeGrades(rawPayload);
            setGrade(nextGrades);

        } catch (err) {
            setError("성적 목록을 불러오지 못했습니다.")
            setGrade([]);

        } finally {
            setIsLoading(false);
        }
    }, [normalizeGrades]);

    
    useEffect(() => {
        loadGrades();
    }, [loadGrades]);

    const createGrade = useCallback(async (payload) => {
        setIsSubmitting(true);
        setError("");

        try {
            await gradeApi.createGrade(payload);
            await loadGrades();
            return true;

        } catch (err) {
            setError("성적 등록에 실패했습니다.");
            return false;

        } finally {
            setIsSubmitting(false);
        }
    }, [loadGrades]);


    const deleteGrade = useCallback(async (gradeId) => {
        setIsSubmitting(true);
        setError("");

        try {
            await gradeApi.deleteGrade(gradeId);
            await loadGrades();
            return true;

        } catch(err) {
            setError("성적 삭제에 실패했습니다.")
            return false;

        } finally {
            setIsSubmitting(false);
        }
    }, [loadGrades]);


    const updateGrade = useCallback(async (gradeId, payload) => {
        setIsSubmitting(true);
        setError("");

        try {
            await gradeApi.updateGrade(gradeId, payload);
            await loadGrades();
            return true;

        } catch(err) {
            setError("성적 수정에 실패했습니다.");
            return false;

        } finally {
            setIsSubmitting(false);
        }
    }, [loadGrades]);

    const hasGrades = useMemo(() => grade.length > 0, [grade]);

    return {
        grade,
        grades: grade,
        isLoading,
        isSubmitting,
        error,
        hasGrades,
        loadGrades,
        createGrade,
        deleteGrade,
        updateGrade
    };
};
