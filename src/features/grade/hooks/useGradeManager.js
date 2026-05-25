import { useCallback, useEffect, useMemo, useState } from "react";
import { gradeApi } from "@/shared/api";

export const useGradeManager = () => {
    const [grade, setGrades] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleLoadGrades = useCallback(async () => {
        setIsLoading(true);
        setError("");

        try {
            const { data } = await gradeApi.getGrades();
            const nextGrades = Array.isArray(data) ? data : data?.grade ?? [];
            setGrades(nextGrades);

        } catch (err) {
            setError("성적 목록을 불러오지 못했습니다.")
            setGrades([]);

        } finally {
            setIsLoading(false);
        }
    }, []);

    
    useEffect(() => {
        handleLoadGrades();
    }, [handleLoadGrades]);

    const handleCreateGrade = useCallback(async (payload) => {
        setIsSubmitting(true);
        setError("");

        try {
            await gradeApi.createGrade(payload);
            await handleLoadGrades;
            return true;

        } catch (err) {
            setError("성적 등록에 실패했습니다.");
            return false;

        } finally {
            setIsSubmitting(false);
        }
    }, [handleLoadGrades]);


    const handleDeleteGrade = useCallback(async (gradeId) => {
        setIsSubmitting(true);
        setError("");

        try {
            await gradeApi.deleteGrade(gradeId);
            await handleLoadGrades();
            return true;

        } catch(err) {
            setError("성적 삭제에 실패했습니다.")
            return false;

        } finally {
            setIsSubmitting(false);
        }
    }, [handleLoadGrades]);


    const handleUpdateGrade = useCallback(async (gradeId) => {
        setIsSubmitting(true);
        setError("");

        try {
            await gradeApi.updateGrade(gradeId);
            await handleLoadGrades();
            return true;

        } catch(err) {
            setError("성적 수정에 실패했습니다.");
            return false;

        } finally {
            setIsSubmitting(false);
        }
    }, [handleLoadGrades]);

    const hasGrades = useMemo(() => grade.length > 0, [grade]);

    return {
        grade,
        isLoading,
        isSubmitting,
        error,
        hasGrades,
        handleLoadGrades,
        handleCreateGrade,
        handleDeleteGrade,
        handleUpdateGrade
    };
};