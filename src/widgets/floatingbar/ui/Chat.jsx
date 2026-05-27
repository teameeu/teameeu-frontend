import { useEffect, useState, useRef } from "react";
import { useChatManager } from "@/features/chat/hooks/useChatManager";
import "./Chat.css";


export const Chat = ({ onClose }) => {

    const {
        rooms,
        activeSessionId,
        messages,
        isLoadingRooms,
        isLoadingMessages,
        isConnected,
        isStreaming,
        error,
        createNewRoom,
        selectRoom,
        sendMessage,
        retryMessage
    } = useChatManager();

    const [inputValue, setInputValue] = useState("");
    const [showRooms, setShowRooms] = useState(false);

    const chatBodyRef = useRef(null);
    const messagesEndRef = useRef(null);
    const isComposingRef = useRef(false);
    const lastSentTimeRef = useRef(0);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isStreaming]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const target = e.target;
        target.style.height = "20px";
        const nextHeight = Math.min(target.scrollHeight - 6, 60);
        target.style.height = `${nextHeight}px`;
    };

    const handleSend = () => {
        if (!inputValue || !inputValue.trim()) return;

        const now = Date.now();
        if (now - lastSentTimeRef.current < 200) {
            console.log("한글 IME 중복 전송 방지 작동");
            return;
        }
        lastSentTimeRef.current = now;

        sendMessage(inputValue);
        setInputValue("");

        const textarea = document.getElementById("chat-textarea-field");
        if (textarea) {
            textarea.style.height = "20px";
        }
    };

    const handleKeyDown = (e) => {
        if (isComposingRef.current || e.nativeEvent?.isComposing || e.keyCode === 229) return;
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        if (!activeSessionId && !isLoadingRooms) {
            if (rooms.length > 0) {
                selectRoom(rooms[0].sessionId);
            } else {
                createNewRoom();
            }
        }
    }, [rooms, activeSessionId, isLoadingRooms, createNewRoom, selectRoom]);

    const handleCreateNewChat = async () => {
        await createNewRoom();
        setShowRooms(false);
    };

    return (
        <div className="chat-area" style={{ position: "relative", display: "flex", flexDirection: "column" }}>
            <div className="chat-header" style={{ userSelect: "none" }}>
                <span
                    className="material-symbols-outlined"
                    style={{ cursor: "pointer", fontSize: "20px", color: "var(--color-gray-600)" }}
                    onClick={() => setShowRooms(prev => !prev)}
                >
                    menu
                </span>

                <span className="typo-body-small-bold" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span
                        style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: isConnected ? "var(--color-cyan-500)" : "var(--color-red-500)",
                            display: "inline-block"
                        }}
                        title={isConnected ? "실시간 연동 중" : "연결 대기 중"}
                    />
                </span>

                <span
                    className="material-symbols-outlined"
                    style={{ cursor: "pointer", fontSize: "20px", color: "var(--color-gray-600)" }}
                    onClick={onClose}
                >
                    close
                </span>
            </div>

            {showRooms && (
                <>
                    <div
                        onClick={() => setShowRooms(false)}
                        style={{
                            position: "absolute",
                            top: "50px",
                            left: 0,
                            width: "100%",
                            height: "calc(100% - 50px)",
                            background: "transparent",
                            zIndex: 99
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: "50px",
                            left: 0,
                            width: "240px",
                            height: "calc(100% - 50px)",
                            background: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(12px)",
                            borderRight: "1px solid var(--color-gray-200)",
                            zIndex: 100,
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: "4px 0 16px rgba(0,0,0,0.05)",
                            padding: "16px",
                            animation: "slideIn 0.2s ease-out"
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                            <span className="typo-body-small-bold" style={{ color: "var(--color-gray-800)" }}>나의 대화 목록</span>
                            <span
                                className="material-symbols-outlined"
                                style={{ cursor: "pointer", fontSize: "18px", color: "var(--color-gray-500)" }}
                                onClick={() => setShowRooms(false)}
                            >
                                close
                            </span>
                        </div>

                        <button
                            onClick={handleCreateNewChat}
                            style={{
                                background: "var(--color-cyan-500)",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                padding: "8px 12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                                cursor: "pointer",
                                marginBottom: "12px"
                            }}
                            className="typo-body-xsmall-bold"
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>add</span>
                            새 대화 시작
                        </button>

                        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "6px" }}>
                            {isLoadingRooms ? (
                                <span className="typo-body-xsmall" style={{ color: "var(--color-gray-400)", textAlign: "center", padding: "16px" }}>
                                    로딩 중...
                                </span>
                            ) : rooms.length === 0 ? (
                                <span className="typo-body-xsmall" style={{ color: "var(--color-gray-400)", textAlign: "center", padding: "16px" }}>
                                    개설된 방이 없습니다.
                                </span>
                            ) : (
                                rooms.map(room => {
                                    const isActive = room.sessionId === activeSessionId;
                                    return (
                                        <div
                                            key={room.sessionId}
                                            onClick={() => {
                                                selectRoom(room.sessionId);
                                                setShowRooms(false);
                                            }}
                                            style={{
                                                padding: "8px 10px",
                                                borderRadius: "6px",
                                                background: isActive ? "var(--color-cyan-050)" : "transparent",
                                                cursor: "pointer",
                                                border: isActive ? "1px solid var(--color-cyan-200)" : "1px solid transparent",
                                                transition: "background 0.2s"
                                            }}
                                            onMouseEnter={(e) => !isActive && (e.currentTarget.style.background = "var(--color-gray-050)")}
                                            onMouseLeave={(e) => !isActive && (e.currentTarget.style.background = "transparent")}
                                        >
                                            <div className="typo-body-xsmall-bold" style={{ color: isActive ? "var(--color-cyan-700)" : "var(--color-gray-700)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                                                {room.title || `대화방 #${room.sessionId}`}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </>
            )}

            <div
                ref={chatBodyRef}
                className="chat-body"
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    background: "var(--color-base-000)"
                }}
            >
                {error && (
                    <div
                        className="typo-body-xsmall"
                        style={{
                            background: "var(--color-red-050)",
                            color: "var(--color-red-600)",
                            border: "1px solid var(--color-red-200)",
                            padding: "8px 12px",
                            borderRadius: "6px"
                        }}
                    >
                        {error}
                    </div>
                )}

                {isLoadingMessages ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%", padding: "10px 0" }}>
                        {[1, 2, 3].map((n) => (
                            <div
                                key={n}
                                style={{
                                    alignSelf: n % 2 === 0 ? "flex-end" : "flex-start",
                                    width: n === 1 ? "60%" : n === 2 ? "40%" : "75%",
                                    height: "36px",
                                    borderRadius: "18px",
                                    background: "linear-gradient(90deg, var(--color-gray-100) 25%, var(--color-gray-050) 50%, var(--color-gray-100) 75%)",
                                    backgroundSize: "200% 100%",
                                    animation: "skeletonShimmer 1.5s infinite linear",
                                    opacity: 0.6
                                }}
                            />
                        ))}
                    </div>
                ) : messages.length === 0 ? (
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", padding: "40px 16px", textAlign: "center" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: "32px", color: "var(--color-cyan-300)" }}>smart_toy</span>
                        <div className="typo-body-xsmall-bold" style={{ color: "var(--color-gray-700)" }}>
                            안녕하세요! 무엇이든 물어보세요.
                        </div>
                        <div className="typo-body-xsmall" style={{ color: "var(--color-gray-400)", maxWidth: "90%" }}>
                            목표 달성에 필요한 진로 조언이나 로드맵 탐색 팁을 <br /> 인공지능이 친절히 안내해 드립니다!
                        </div>
                    </div>
                ) : (
                    messages.map((msg, index) => {
                        const isLastOfBlock = index === messages.length - 1 || messages[index + 1].role !== msg.role;
                        const isUser = msg.role === "user";

                        return (
                            <div
                                key={msg.messageId}
                                className="chat-message-wrapper"
                                style={{
                                    justifyContent: isUser ? "flex-end" : "flex-start",
                                }}
                            >
                                {isUser && msg.status === "failed" && (
                                    <button
                                        onClick={() => retryMessage(msg.messageId)}
                                        title="전송 실패. 다시 보내려면 클릭하세요."
                                        style={{
                                            background: "var(--color-red-050)",
                                            border: "1px solid var(--color-red-200)",
                                            borderRadius: "50%",
                                            width: "22px",
                                            height: "22px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "var(--color-red-500)",
                                            transition: "all 0.2s",
                                            boxShadow: "0 1px 3px rgba(244, 67, 54, 0.15)",
                                            padding: 0,
                                            marginRight: "4px"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "var(--color-red-100)";
                                            e.currentTarget.style.transform = "scale(1.08)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "var(--color-red-050)";
                                            e.currentTarget.style.transform = "scale(1)";
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: "14px", fontWeight: "bold" }}>
                                            refresh
                                        </span>
                                    </button>
                                )}

                                {isUser && msg.status === "sending" && (
                                    <span
                                        className="material-symbols-outlined spin-animation"
                                        style={{
                                            fontSize: "14px",
                                            color: "var(--color-gray-400)",
                                            userSelect: "none"
                                        }}
                                    >
                                        autorenew
                                    </span>
                                )}

                                <div
                                    className={`chat-message ${msg.role} ${isLastOfBlock ? "first" : ""}`}
                                    style={{
                                        fontSize: "12px",
                                        lineHeight: "1.5",
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-all",
                                        opacity: msg.status === "sending" ? 0.7 : 1,
                                    }}
                                >
                                    {msg.role === "ai" && msg.content === "" && msg.isStreaming ? (
                                        <span style={{ display: "flex", gap: "4px", padding: "4px 0" }}>
                                            <span className="dot-pulse" style={{ animation: "pulse 1.2s infinite ease-in-out" }}>●</span>
                                            <span className="dot-pulse" style={{ animation: "pulse 1.2s infinite ease-in-out", animationDelay: "0.2s" }}>●</span>
                                            <span className="dot-pulse" style={{ animation: "pulse 1.2s infinite ease-in-out", animationDelay: "0.4s" }}>●</span>
                                        </span>
                                    ) : (
                                        msg.content
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}

                {isStreaming && messages[messages.length - 1]?.role === "user" && (
                    <div className="chat-message-wrapper" style={{ justifyContent: "flex-start" }}>
                        <div className="chat-message ai first" style={{ fontSize: "12px" }}>
                            <span style={{ display: "flex", gap: "4px", padding: "4px 0" }}>
                                <span className="dot-pulse" style={{ animation: "pulse 1.2s infinite ease-in-out" }}>●</span>
                                <span className="dot-pulse" style={{ animation: "pulse 1.2s infinite ease-in-out", animationDelay: "0.2s" }}>●</span>
                                <span className="dot-pulse" style={{ animation: "pulse 1.2s infinite ease-in-out", animationDelay: "0.4s" }}>●</span>
                            </span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} style={{ float: "left", clear: "both" }} />
            </div>

            <div className="chat-input" style={{
                background: "var(--color-base-000)",
                borderTop: "1px solid var(--color-gray-100)",
                padding: "8px 12px",
                display: "flex",
                flexDirection: "column"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    background: "var(--color-gray-050)",
                    border: "1px solid var(--color-gray-200)",
                    borderRadius: "20px",
                    padding: "3px 4px 3px 10px",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    gap: "6px"
                }}
                    onFocusCapture={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-cyan-300)";
                        e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 188, 212, 0.1)";
                    }}
                    onBlurCapture={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-gray-200)";
                        e.currentTarget.style.boxShadow = "none";
                    }}
                >
                    <textarea
                        id="chat-textarea-field"
                        placeholder={
                            isStreaming
                                ? "답변을 수신하는 중입니다..."
                                : "메시지를 입력하세요."
                        }
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onCompositionStart={() => { isComposingRef.current = true; }}
                        onCompositionEnd={() => { isComposingRef.current = false; }}
                        disabled={isStreaming}
                        rows={1}
                        style={{
                            width: "100%",
                            height: "20px",
                            minHeight: "20px",
                            maxHeight: "60px",
                            background: "transparent",
                            border: "none",
                            padding: "2px 0",
                            fontSize: "12px",
                            outline: "none",
                            resize: "none",
                            fontFamily: "inherit",
                            lineHeight: "1.3",
                            boxSizing: "border-box",
                            color: "var(--color-gray-800)",
                            alignSelf: "center"
                        }}
                    />
                    <button
                        className="chat-send-btn"
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isStreaming}
                        style={{
                            background: (!inputValue.trim() || isStreaming) ? "var(--color-gray-200)" : "var(--color-cyan-500)",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s",
                            transform: "scale(1)",
                            opacity: (!inputValue.trim() || isStreaming) ? 0.6 : 1,
                            boxShadow: (!inputValue.trim() || isStreaming) ? "none" : "0 2px 4px rgba(0, 188, 212, 0.15)",
                            flexShrink: 0
                        }}
                        onMouseEnter={(e) => {
                            if (inputValue.trim() && !isStreaming) {
                                e.currentTarget.style.background = "var(--color-cyan-600)";
                                e.currentTarget.style.transform = "scale(1.05)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (inputValue.trim() && !isStreaming) {
                                e.currentTarget.style.background = "var(--color-cyan-500)";
                                e.currentTarget.style.transform = "scale(1)";
                            }
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                            send
                        </span>
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: scale(0.9); }
                    50% { opacity: 1; transform: scale(1.1); }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .dot-pulse {
                    color: var(--color-gray-500);
                    font-size: 8px;
                    display: inline-block;
                }
                .spin-animation {
                    animation: spin 1.5s linear infinite;
                    display: inline-block;
                }
            `}</style>
        </div>
    );
};