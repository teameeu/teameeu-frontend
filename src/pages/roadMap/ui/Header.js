import { useAuth } from "@/features/auth/hooks/useAuth";

export const Header = ({ dDay, inProgressCount, scheduledCount, completedCount, achievement, useAddRoadmapItem }) => {
  const { user } = useAuth();

  return (
    <div className="row" style={{ alignItems: "center", justifyContent: "space-between" }}>
      <div className="row" style={{ gap: "24px" }}>
        <div className="row" style={{ gap: "12px", alignItems: "center", justifyContent: "center" }}>
          <span className="typo-body-small" style={{ color: "var(--color-gray-700)" }}>학년종료</span>
          <span className="typo-body-small" style={{ color: "var(--color-gray-700)" }}>|</span>
          <span className="typo-heading-small" style={{ color: "var(--color-gray-900)" }}>D-{dDay}</span>
        </div>
        <div className="row" style={{ gap: "12px", alignItems: "center", justifyContent: "center" }}>
          <span className="typo-body-small" style={{ color: "var(--color-gray-700)" }}>목표 진로</span>
          <span className="typo-body-small" style={{ color: "var(--color-gray-700)" }}>|</span>
          <span className="typo-heading-small" style={{ color: "var(--color-gray-900)" }}>{user?.career ?? "-"}</span>
        </div>
      </div>
      <div className="row" style={{ gap: "24px", alignItems: "center", justifyContent: "center", padding: "4px 40px", borderRadius: "9999px", backgroundColor: "var(--color-gray-050)", border: "1px solid var(--color-gray-200)" }}>
        <div className="row" style={{ gap: "12px", alignItems: "center", justifyContent: "center" }}>
          <span className="typo-body-small" style={{ color: "var(--color-gray-900)" }}>진행중</span>
          <span className="typo-heading-small" style={{ color: "var(--color-cyan-700)" }}>{inProgressCount}</span>
        </div>
        <span className="typo-body-small" style={{ color: "var(--color-gray-500)" }}>|</span>
        <div className="row" style={{ gap: "12px", alignItems: "center", justifyContent: "center" }}>
          <span className="typo-body-small" style={{ color: "var(--color-gray-900)" }}>예정</span>
          <span className="typo-heading-small" style={{ color: "var(--color-cyan-700)" }}>{scheduledCount}</span>
        </div>
        <span className="typo-body-small" style={{ color: "var(--color-gray-500)" }}>|</span>
        <div className="row" style={{ gap: "12px", alignItems: "center", justifyContent: "center" }}>
          <span className="typo-body-small" style={{ color: "var(--color-gray-900)" }}>완료</span>
          <span className="typo-heading-small" style={{ color: "var(--color-cyan-700)" }}>{completedCount}</span>
        </div>
        <span className="typo-body-small" style={{ color: "var(--color-gray-500)" }}>|</span>
        <div className="row" style={{ gap: "12px", alignItems: "center", justifyContent: "center" }}>
          <span className="typo-body-small" style={{ color: "var(--color-gray-900)" }}>달성도</span>
          <span className="typo-heading-small" style={{ color: "var(--color-cyan-700)" }}>{achievement}%</span>
        </div>
      </div>
      <button className="row btn-primary" style={{ gap: "8px", alignItems: "center", justifyContent: "center", padding: "16px 20px", borderRadius: "16px" }} onClick={useAddRoadmapItem}>
        <span className="typo-body-small" style={{ color: "var(--color-base-000)" }}>항목 추가하기</span>
        <span className="material-symbols-outlined typo-body-small" style={{ color: "var(--color-base-000)" }}>add</span>
      </button>
    </div>
  );
};