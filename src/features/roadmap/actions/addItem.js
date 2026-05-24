import { useState } from "react";


export const AddItemModal = ({ onClose, onAdd, defaultStatus="scheduled" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [status, setStatus] = useState(defaultStatus);


    return (
        <div style={{ zIndex: 1000, position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", backdropFilter: "blur(5px)" }} onClick={() => { onClose() }}>
            <div className="column" style={{ backgroundColor: "white", padding: "36px 24px", borderRadius: "32px", width: "fit-content", minWidth: "400px", height: "fit-content", gap: "16px" }} onClick={(e) => e.stopPropagation()}>
                <h3 className="typo-heading-medium">새 항목 추가</h3>
                <div className="auth-page column" style={{ gap: "0px" }}>
                <input
                    type="text"
                    placeholder="항목 제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="datetime-local"
                    placeholder="시작 시간"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
                <input
                    type="datetime-local"
                    placeholder="종료 시간"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />
                <div className="dropdown">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <span>
                            {status === "scheduled" ? "예정됨" : status === "in-progress" ? "진행 중" : "완료"}
                        </span>
                        <span className="material-symbols-outlined">expand_more</span>
                    </button>
                    
                    {isOpen && (
                        <ul>
                            <li onClick={() => {
                                setStatus("scheduled");
                                setIsOpen(false);
                            }}>예정됨</li>
                            <li onClick={() => {
                                setStatus("in-progress");
                                setIsOpen(false);
                            }}>진행 중</li>
                            <li onClick={() => {
                                setStatus("done");
                                setIsOpen(false);
                            }}>완료</li>
                        </ul>
                    )}
                </div>
                <button className={`${title && startTime && endTime ? "enabled" : "disabled"}`} disabled={!(title && startTime && endTime)} style={{ margin: "8px 0px" }} onClick={() => onAdd({ title, startTime, endTime, status })}>
                    추가
                </button>
                </div>
            </div>
        </div>
    );
}