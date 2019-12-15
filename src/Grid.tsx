import React from "react";
import { Point, View } from "./Editor";

const MIX_PIXEL_SIZE = 8;
const COUNT = Math.ceil(2000 / MIX_PIXEL_SIZE);

export function Grid({ view }: { view: View }) {
    if (view.scale < MIX_PIXEL_SIZE) {
        return null;
    }
    const start = view.pixelToDisplay(view.nearestImagePixel(new Point(0, 0)));
    return (
        <g>
            {new Array(COUNT).fill(0).map((x, i) => (
                <line
                    x1={start.x + i * view.scale}
                    y1={0}
                    x2={start.x + i * view.scale}
                    y2={2000}
                    stroke="rgb(200,200,200)"
                />
            ))}
            {new Array(COUNT).fill(0).map((x, i) => (
                <line
                    x1={0}
                    y1={start.y + i * view.scale}
                    x2={2000}
                    y2={start.y + i * view.scale}
                    stroke="rgb(200,200,200)"
                />
            ))}
        </g>
    );
}
