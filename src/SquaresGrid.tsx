import React from "react";
import { Point, View } from "./Editor";
import { range } from "./Util";

export function SquaresGrid({
    point1,
    point2,
    view,
    size
}: {
    point1: Point;
    point2: Point;
    view: View;
    size: number | null;
}) {
    if (size == null) {
        return null;
    }
    const diff = point1.sub(point2).abs();
    const width = diff.x / Math.floor(diff.x / size);
    const height = diff.y / Math.floor(diff.y / size);
    return (
        <g>
            {range(40).map(i => (
                <line
                    x1={i * width}
                    x2={i * width}
                    y1={0}
                    y2={2000}
                    stroke="black"
                ></line>
            ))}
        </g>
    );
}
