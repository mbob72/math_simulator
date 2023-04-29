import * as React from 'react'

import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

export default function LessonDiagram() {
    const bubbleRadius = 3;
    const iconSize = 2;
    const bubbles = [
        { cx: 25, fill: "gray", digit: 1, icon: <CheckIcon sx={{ fontSize: `${bubbleRadius * iconSize / 3}px`, color: "green", stroke: "green", strokeWidth: "2px" }} /> },
        { cx: 50, fill: "gray", digit: 2, icon: <CancelIcon sx={{ fontSize: `${bubbleRadius * iconSize / 3}px`, color: "red" }} /> },
        { cx: 75, fill: "gray", digit: 3, icon: <CheckIcon sx={{ fontSize: `${bubbleRadius * iconSize / 3}px`, color: "green", stroke: "green", strokeWidth: "2px"  }} /> },
    ];

    return (
        <svg viewBox="0 0 100 10">
            <path d="M 10 5 L 90 5" stroke="black" strokeWidth="1" />
            {bubbles.map((bubble, index) => (
                <g key={index}>
                    <circle cx={bubble.cx} cy="5" r={bubbleRadius} fill={bubble.fill} />
                    <text x={bubble.cx} y="5.25" textAnchor="middle" dominantBaseline="middle" fontSize={bubbleRadius}>
                        {bubble.digit}
                    </text>
                    <text x={bubble.cx + bubbleRadius} y={bubbleRadius * 2 + 2} textAnchor="middle" dominantBaseline="middle" fontSize={bubbleRadius}>
                        {bubble.digit}
                    </text>
                    <text x={bubble.cx - bubbleRadius} y={bubbleRadius * 2 + 2} textAnchor="middle" dominantBaseline="middle" fontSize={bubbleRadius}>
                        {bubble.digit}
                    </text>
                    {bubble.icon && (
                        <svg x={bubble.cx} y={1} width={bubbleRadius * 4 / 3} height={bubbleRadius * 4 / 3}>
                            {bubble.icon}
                        </svg>
                    )}
                </g>
            ))}
        </svg>
    );
}