
export const GradeEmptyPlaceholder = () => {
    return (
        <div>
            <svg width="164" height="164" viewBox="0 0 164 164" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="빈 성적 데이터 안내 아이콘" role="img">
                <circle cx="82" cy="82" r="74" fill="#E8FAFF" />
                <ellipse cx="82" cy="128" rx="46" ry="10" fill="#CDEFF9" />
                <rect x="46" y="40" width="72" height="92" rx="14" fill="#FFFFFF" stroke="#6FC7DF" strokeWidth="4" />
                <rect x="56" y="56" width="52" height="8" rx="4" fill="#D9F4FB" />
                <rect x="56" y="70" width="36" height="6" rx="3" fill="#E8F8FD" />
                <circle cx="70" cy="93" r="4" fill="#3F9CB8" />
                <circle cx="94" cy="93" r="4" fill="#3F9CB8" />
                <path d="M69 108C72 113 77 116 82 116C87 116 92 113 95 108" stroke="#3F9CB8" strokeWidth="4" strokeLinecap="round" />
                <circle cx="61" cy="101" r="4" fill="#FFCAE0" />
                <circle cx="103" cy="101" r="4" fill="#FFCAE0" />
            </svg>
            <p style={{ margin: 0, color: "var(--color-cyan-900)", fontWeight: "700" }}>등록된 성적이 없습니다.</p>
            <p style={{ margin: 0, color: "var(--color-gray-500)", fontSize: "14px" }}>로드맵 추천을 위한 성적을 등록해주세요.</p>
        </div>
    );
};