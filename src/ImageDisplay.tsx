import React from "react";
import { View } from "./Editor";

export function ImageDisplay({ view, url }: { view: View; url: string }) {
    return (
        <g transform={`translate(${view.point.x} ${view.point.y})`}>
            <image href={url} transform={`scale(${view.scale})`} />
        </g>
    );
}
