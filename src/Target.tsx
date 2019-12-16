import React from "react";
import { Point, View } from "./Editor";

export function Target({
    position,
    view,
    onMouseDown
}: {
    position: Point;
    view: View;
    onMouseDown: () => void;
}) {
    const screenPosition = view
        .pixelToDisplay(position)
        .add(new Point(view.scale / 2, view.scale / 2));

    function down(e: React.MouseEvent<SVGGElement>) {
        e.preventDefault();
        onMouseDown();
    }
    return (
        <g
            transform={`translate(${screenPosition.x} ${screenPosition.y})`}
            onMouseDown={down}
            cursor="move"
        >
            <rect
                width={view.scale}
                height={view.scale}
                x={-view.scale / 2}
                y={-view.scale / 2}
                stroke="rgb(0, 128, 256)"
                fill="none"
            />
            <circle r="30" stroke="rgb(0, 128, 256)" fill="transparent" />
            <line
                x1="-50"
                y1="0"
                x2="50"
                y2="0"
                stroke="rgb(0, 128, 256)"
                fill="none"
            />
            <line
                x1="0"
                y1="-50"
                x2="0"
                y2="50"
                stroke="rgb(0, 128, 256)"
                fill="none"
            />
        </g>
    );
}
