import { useState, useEffect, useRef, useCallback } from "react";
import {
    getChatRoom,
    getChatRoomMessages,
    createChatSession
} from "@/shared/api/chatApi";
import { getToken } from "@/shared/api";
import { StompClient } from "../lib/stompClient";

const getWebSocketUrl = () => {
    const apiUrl = process.env.REACT_APP_WAYMORE_API_URL || process.env.WAYMORE_API_URL || "";
    const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";

    if (!apiUrl) {
        return `${wsProtocol}//${window.location.host}/ws/chat`;
    }

    const host = apiUrl.replace(/^https?:\/\//, "");
    return `${wsProtocol}//${host}/ws/chat`;
};


export const useChatManager = () => {
    const [rooms, setRooms] = useState([]);
    const [activeSessionId, setActiveSessionId] = useState(null);
    const [messages, setMessages] = useState([]);

    const [isLoadingRooms, setIsLoadingRooms] = useState(false);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState(null);

    const stompClientRef = useRef(null);
    const activeSessionIdRef = useRef(activeSessionId);

    useEffect(() => {
        activeSessionIdRef.current = activeSessionId;

    }, [activeSessionId]);

    const fetchRooms = useCallback(async () => {
        setIsLoadingRooms(true);
        setError(null);

        try {
            const response = await getChatRoom();
            const payload = response.data?.data ?? response.data;
            const chatRooms = Array.isArray(payload) ? payload : (payload?.chatSessions || []);
            setRooms(chatRooms);
        } catch (err) {
            setError("채팅방 목록을 불러오는데 실패했습니다.");
        } finally {
            setIsLoadingRooms(false);
        }
    }, []);


    // 최초 마운트
    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);


    // MARK: - 특정 채팅방 조회
    const fetchMessages = useCallback(async (sessionId) => {
        if (!sessionId) return;
        setIsLoadingMessages(true);
        setError(null);

        try {
            const response = await getChatRoomMessages(sessionId);
            const payload = response.data?.data ?? response.data;
            const history = payload?.messages || [];

            const normalized = history.map(msg => ({
                messageId: msg.messageId,
                role: msg.role === "USER" ? "user" : "ai",
                content: msg.content,
                createdAt: msg.createdAt
            }));

            setMessages(normalized);

        } catch (err) {
            setError("대화 내용을 불러오는데 실패했습니다.");
        } finally {
            setIsLoadingMessages(false);
        }
    }, []);


    const handleSocketEvent = useCallback((event) => {
        const { type, content, assistantMessageId } = event;

        switch (type) {
            case "ai.start":
                setIsStreaming(true);
                setMessages(prev => [
                    ...prev,
                    {
                        messageId: "temp-ai-bubble",
                        role: "ai",
                        content: "",
                        isStreaming: true
                    }
                ]);
                break;
            case "ai.chunk":
                setMessages(prev => prev.map(msg => {
                    if (msg.messageId === "temp-ai-bubble") {
                        return {
                            ...msg,
                            content: msg.content + (content || "")
                        };
                    }
                    return msg;
                }));
                break;

            case "ai.done":
                setIsStreaming(false);
                setMessages(prev => prev.map(msg => {
                    if (msg.messageId === "temp-ai-bubble") {
                        return {
                            ...msg,
                            messageId: assistantMessageId || Date.now(),
                            isStreaming: false
                        };
                    }
                    return msg;
                }));
                fetchRooms();
                break;

            case "ai.error":
                setIsStreaming(false);
                setError("AI 서버 연동 중 오류가 발생했습니다.");
                setMessages(prev => prev.map(msg => {
                    if (msg.messageId === "temp-ai-bubble") {
                        return {
                            ...msg,
                            content: msg.content + "\n⚠️ [답변을 불러오는 중 오류가 발생했습니다]",
                            isStreaming: false
                        };
                    }
                    return msg;
                }));
                break;

            case "chat.ack":
                setMessages(prev => prev.map(msg => {
                    if (msg.role === "user" && msg.status === "sending") {
                        return {
                            ...msg,
                            messageId: event.userMessageId || msg.messageId,
                            status: "sent"
                        };
                    }
                    return msg;
                }));
                break;

            default:
                console.warn("정의되지 않은 소켓 이벤트 수신:", type);
                break;

        }
    }, [fetchRooms]);


    useEffect(() => {

        if (!activeSessionId) {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect();
                stompClientRef.current = null;
                setIsConnected(false);
            }
            return;
        }

        const token = getToken();
        if (!token) {
            return;
        }


        if (stompClientRef.current) {
            stompClientRef.current.disconnect();
            stompClientRef.current = null;
            setIsConnected(false);
        }

        const wsUrl = getWebSocketUrl();
        const client = new StompClient(wsUrl, token);
        stompClientRef.current = client;


        client.connect(
            () => {
                setIsConnected(true);
                setError(null);

                const topic = `/sub/chats/${activeSessionId}`;
                client.subscribe(topic, (event) => {
                    handleSocketEvent(event);
                });
            },

            (err) => {
                setIsConnected(false);
                setError("실시간 챗봇 서버와 연결이 불안정합니다.");
            }
        );

        // 자원 정리
        return () => {
            if (client) {
                client.disconnect();
                setIsConnected(false);
            }
        };


    }, [activeSessionId, handleSocketEvent]);


    // MARK: - 신규 세션 생성
    const createNewRoom = async () => {
        setError(null);

        try {
            const response = await createChatSession();
            const payload = response.data?.data ?? response.data;
            const newSessionId = payload?.sessionId;

            if (!newSessionId) {
                throw new Error("[Failed] ")
            }

            await fetchRooms();
            setActiveSessionId(newSessionId);
            setMessages([]);
            return newSessionId;

        } catch (err) {
            setError("새로운 대화방을 시작할 수 없습니다.");
        } finally {

        }
    };

    const selectRoom = (sessionId) => {
        if (sessionId === activeSessionId) return;
        setActiveSessionId(sessionId);
        fetchMessages(sessionId);
    };

    // MARK: - 메세지 전송
    const sendMessage = (content) => {
        if (!content || !content.trim()) return;
        if (!activeSessionId) {
            setError("활성화된 채팅 세션이 존재하지 않습니다.");
            return;
        }

        const shouldSimulateFailure = content.trim().startsWith("!fail") || !isConnected;

        const tempId = `temp-user-${Date.now()}`;
        const userMsg = {
            messageId: tempId,
            role: "user",
            content: content.trim(),
            status: shouldSimulateFailure ? "failed" : "sending",
            createdAt: new Date().toISOString()
        };
        setMessages(prev => [...prev, userMsg]);

        if (shouldSimulateFailure) {
            console.log("[useChatManager] 모의 실패 전송 스킵 (UI 테스트용)");
            return;
        }

        if (!stompClientRef.current || !isConnected) {
            setError("실시간 챗봇 서버와 연결이 유실되었습니다. 재연결 중입니다.");
            return;
        }

        const destination = "/pub/api/chat/message";
        const payload = {
            sessionId: activeSessionId,
            content: content.trim()
        };

        stompClientRef.current.send(destination, payload);
    };

    const retryMessage = (messageId) => {
        const failedMsg = messages.find(msg => msg.messageId === messageId);
        if (!failedMsg) return;

        setMessages(prev => prev.map(msg => {
            if (msg.messageId === messageId) {
                return { ...msg, status: "sending" };
            }
            return msg;
        }));

        if (!stompClientRef.current || !isConnected) {
            setError("실시간 챗봇 서버와 연결이 유실되었습니다.");
            setMessages(prev => prev.map(msg => {
                if (msg.messageId === messageId) {
                    return { ...msg, status: "failed" };
                }
                return msg;
            }));
            return;
        }

        const destination = "/pub/api/chat/message";
        const payload = {
            sessionId: activeSessionId,
            content: failedMsg.content
        };

        stompClientRef.current.send(destination, payload);
    };

    return {
        rooms,
        activeSessionId,
        messages,
        isLoadingRooms,
        isLoadingMessages,
        isConnected,
        isStreaming,
        error,
        fetchRooms,
        createNewRoom,
        selectRoom,
        sendMessage,
        retryMessage
    };
};
