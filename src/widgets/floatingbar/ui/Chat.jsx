import "./Chat.css";


export const Chat = ({ onClose }) => {
    return (
        <div className="chat-area">
            <div className="chat-header">
                <span className="material-symbols-outlined" style={{ cursor: "pointer" }}>
                    menu
                </span>
                <span>Chat</span>
                <span
                    className="material-symbols-outlined"
                    style={{ cursor: "pointer" }}
                    onClick={onClose}
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
    );
};