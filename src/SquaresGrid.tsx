import React from "react";
import { Point, View } from "./Editor";
import { range } from "./Util";

const count = 100;

export function SquaresGrid({
    point1,
    point2,
    view,
    cellCount,
    startExtra,
    endExtra
}: {
    point1: Point;
    point2: Point;
    view: View;
    cellCount: Point;
    startExtra: Point;
    endExtra: Point;
}) {
    const diff = point1.sub(point2).abs();
    const width = (diff.x / cellCount.x) * view.scale;
    const height = (diff.y / cellCount.y) * view.scale;
    const topLeft = view.pixelToDisplay(
        new Point(Math.min(point1.x, point2.x), Math.min(point1.y, point2.y))
    );
    const extraX = Math.floor(topLeft.x / width);
    const extraY = Math.floor(topLeft.y / height);
    const start = new Point(
        topLeft.x - extraX * width,
        topLeft.y - extraY * height
    );
    function isXBorder(i: number) {
        return (
            i === extraX + startExtra.x ||
            i === extraX + endExtra.x + cellCount.x
        );
    }
    function isYBorder(i: number) {
        return (
            i === extraY + startExtra.y ||
            i === extraY + endExtra.y + cellCount.y
        );
    }
    return (
        <g>
            {range(count).map(i => (
                <line
                    x1={start.x + i * width}
                    x2={start.x + i * width}
                    y1={0}
                    y2={2000}
                    stroke={isXBorder(i) ? "blue" : "black"}
                ></line>
            ))}
            {range(count).map(i => (
                <line
                    x1={0}
                    x2={2000}
                    y1={start.y + i * height}
                    y2={start.y + i * height}
                    stroke={isYBorder(i) ? "blue" : "black"}
                ></line>
            ))}
        </g>
    );
}
