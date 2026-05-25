import React from "react";

export const LoadingSpinner = (
    { label = "로딩 중", fullscreen = false }
) => {
    const containerStyle = fullscreen
        ? {
            position: "fixed",
            insetL: 0,
            disply: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 9999,
        }

        : {
            disply: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            minHeight: "160px",
        };


    // JSX
    return (
        <div style={containerStyle} role="status" aria-live="polite">
            <div
                style={{
                    width: "28px",
                    height: "28px",
                    border: "3px solid var(--color-gray-200)",
                    borderTopColor: "var(--color-cyan-500)",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                }}
            />
            <span className="typo-body-small" style={{ color: "var(--color-gray-700)" }}>
                {label}
            </span>
            <style>
                {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
            </style>
        </div>
    );
};