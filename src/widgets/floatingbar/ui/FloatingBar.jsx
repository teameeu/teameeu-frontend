import { useState } from "react";
import Draggable from "react-draggable";
import "./FloatingBar.css";
import { Chat } from "./Chat";


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

                {!isOpen && (
                    <div
                        className="floating-btn"
                        onClick={() => setIsOpen(true)}
                    >
                        <span className="material-symbols-outlined">chat</span>
                    </div>
                )}

                {isOpen && (
                    <Chat
                        onClose={() => {
                            setIsOpen(false);
                            setPosition(defaultPosition);
                        }}
                    />
                )}

            </div>
        </Draggable>
    );
};