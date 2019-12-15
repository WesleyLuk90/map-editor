import React from "react";
import { View } from "./Editor";

const COUNT = Math.ceil(2000 / 32);

export function Grid({ view }: { view: View }) {
    if (view.scale < 32) {
        return null;
    }
    const firstX =
        view.point.x - Math.floor(view.point.x / view.scale) * view.scale;
    const firstY =
        view.point.y - Math.floor(view.point.y / view.scale) * view.scale;
    return (
        <g>
            {new Array(COUNT).fill(0).map((x, i) => (
                <line
                    x1={firstX + i * view.scale}
                    y1={0}
                    x2={firstX + i * view.scale}
                    y2={2000}
                    stroke="rgb(200,200,200)"
                />
            ))}
            {new Array(COUNT).fill(0).map((x, i) => (
                <line
                    x1={0}
                    y1={firstY + i * view.scale}
                    x2={2000}
                    y2={firstY + i * view.scale}
                    stroke="rgb(200,200,200)"
                />
            ))}
        </g>
    );
}
