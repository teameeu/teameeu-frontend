import { useState } from "react";
import Draggable from "react-draggable";
import "./FloatingBar.css";
import "./Chat.css";

export const FloatingBar = () => {
    const defaultPosition = { x: 0, y: 0 };

    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState(defaultPosition);

    return (
        <Draggable
            position={position}
            onDrag={(e, data) => {
                setPosition({ x: data.x, y: data.y });
            }}
            handle={isOpen ? ".chat-header" : null}
            disabled={!isOpen}
        >
            <div className={`floating-container ${isOpen ? "open" : ""}`}>

                {/* 버튼 */}
                {!isOpen && (
                    <div
                        className="floating-btn"
                        onClick={() => setIsOpen(true)}
                    >
                        <span className="material-symbols-outlined">chat</span>
                    </div>
                )}

                {/* 채팅창 */}
                {isOpen && (
                    <div className="chat-area">
                        <div className="chat-header">
                            <span className="material-symbols-outlined"
                                style={{ "cursor": "pointer" }}
                                // onClick={() => {
                                //     setIsOpen(false);
                                //     setPosition(defaultPosition); // ⭐ 위치 초기화
                                // }}
                            >
                                menu
                            </span>
                            <span>Chat</span>
                            <span className="material-symbols-outlined"
                                style={{ "cursor": "pointer" }}
                                onClick={() => {
                                    setIsOpen(false);
                                    setPosition(defaultPosition); // ⭐ 위치 초기화
                                }}
                            >
                                close
                            </span>
                        </div>

                        <div className="chat-body typo-body-xsmall">
                            <div className="chat-message ai first">채팅 내용</div>
                            <div className="chat-message ai">채팅 내용</div>
                            <div className="chat-message user first">채팅 내용</div>
                            <div className="chat-message user">채팅 내용</div>
                        </div>
                    </div>
                )}

            </div>
        </Draggable>
    );
};