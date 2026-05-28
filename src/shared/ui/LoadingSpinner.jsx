import React from "react";

export const LoadingSpinner = (
    { label = "로딩 중", fullscreen = false }
) => {
    if (fullscreen) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.03)",
                    zIndex: 9999,
                }}
                role="status"
                aria-live="polite"
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "16px",
                        padding: "28px 48px",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.6)",
                        borderRadius: "24px",
                        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02)",
                    }}
                >
                    <div
                        style={{
                            width: "36px",
                            height: "36px",
                            border: "3.5px solid var(--color-gray-150, #EAECEF)",
                            borderTopColor: "var(--color-cyan-500)",
                            borderRadius: "50%",
                            animation: "spin 0.8s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite",
                        }}
                    />
                    <span
                        className="typo-body-small"
                        style={{
                            color: "var(--color-gray-800)",
                            fontWeight: 600,
                            letterSpacing: "-0.3px"
                        }}
                    >
                        {label}
                    </span>
                </div>
                <style>
                    {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
                </style>
            </div>
        );
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                minHeight: "160px",
            }}
            role="status"
            aria-live="polite"
        >
            <div
                style={{
                    width: "36px",
                    height: "36px",
                    border: "3.5px solid var(--color-gray-200)",
                    borderTopColor: "var(--color-cyan-500)",
                    borderRadius: "50%",
                    animation: "spin 0.8s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite",
                }}
            />
            <span
                className="typo-body-small"
                style={{
                    color: "var(--color-gray-700)",
                    fontWeight: 500,
                    letterSpacing: "-0.3px"
                }}
            >
                {label}
            </span>
            <style>
                {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
            </style>
        </div>
    );
};