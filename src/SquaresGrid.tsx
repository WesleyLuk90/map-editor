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
    const squareSize = diff.divide(cellCount).scale(view.scale);
    const topLeft = view.pixelToDisplay(
        new Point(Math.min(point1.x, point2.x), Math.min(point1.y, point2.y))
    );
    const extra = topLeft.divide(squareSize).floor();
    const start = topLeft.sub(extra.multiply(squareSize));
    function isXBorder(i: number) {
        return (
            i === extra.x + startExtra.x ||
            i === extra.x + endExtra.x + cellCount.x
        );
    }
    function isYBorder(i: number) {
        return (
            i === extra.y + startExtra.y ||
            i === extra.y + endExtra.y + cellCount.y
        );
    }
    return (
        <g>
            {range(count).map(i => (
                <line
                    x1={start.x + i * squareSize.x}
                    x2={start.x + i * squareSize.x}
                    y1={0}
                    y2={2000}
                    stroke={isXBorder(i) ? "blue" : "black"}
                ></line>
            ))}
            {range(count).map(i => (
                <line
                    x1={0}
                    x2={2000}
                    y1={start.y + i * squareSize.y}
                    y2={start.y + i * squareSize.y}
                    stroke={isYBorder(i) ? "blue" : "black"}
                ></line>
            ))}
        </g>
    );
}
