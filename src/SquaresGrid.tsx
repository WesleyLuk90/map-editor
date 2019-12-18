import React from "react";
import { Point, View } from "./Editor";
import { range } from "./Util";

const count = 100;

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
    const width = (diff.x / Math.round(diff.x / size)) * view.scale;
    const height = (diff.y / Math.round(diff.y / size)) * view.scale;
    const topLeft = view.pixelToDisplay(
        new Point(Math.min(point1.x, point2.x), Math.min(point1.y, point2.y))
    );
    const start = new Point(
        topLeft.x - Math.floor(topLeft.x / width) * width,
        topLeft.y - Math.floor(topLeft.y / height) * height
    );
    return (
        <g>
            {range(count).map(i => (
                <line
                    x1={start.x + i * width}
                    x2={start.x + i * width}
                    y1={0}
                    y2={2000}
                    stroke="black"
                ></line>
            ))}
            {range(count).map(i => (
                <line
                    x1={0}
                    x2={2000}
                    y1={start.y + i * height}
                    y2={start.y + i * height}
                    stroke="black"
                ></line>
            ))}
        </g>
    );
}
