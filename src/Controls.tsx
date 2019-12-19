import React from "react";
import { Point } from "./Editor";

export function Controls({
    onSelect,
    point1,
    point2,
    cellCount,
    setCellCount,
    file
}: {
    onSelect: (file: File) => void;
    point1: Point;
    point2: Point;
    cellCount: Point;
    setCellCount: (point: Point) => void;
    file: File | null;
}) {
    const ref = React.createRef<HTMLInputElement>();

    function handleSelect() {
        if (ref.current == null) {
            return;
        }
        const file = ref.current.files && ref.current.files[0];
        if (!file) {
            return;
        }
        onSelect(file);
    }

    const canvas = React.createRef<HTMLCanvasElement>();

    function outputSize() {
        const diff = point1.sub(point2).abs();
        return new Point(
            Math.round(diff.x / cellCount.x),
            Math.round(diff.y / cellCount.y)
        );
    }

    async function render() {
        if (!file || !canvas.current) {
            return;
        }
        const ctx = canvas.current.getContext("2d");
        if (ctx == null) {
            return;
        }
        const bitmap = await createImageBitmap(file);
        const diff = point1.sub(point2).abs();
        const outputCellSize = outputSize();
        ctx.drawImage(
            bitmap,
            point1.x,
            point1.y,
            diff.x,
            diff.y,
            0,
            0,
            cellCount.x * outputCellSize.x,
            cellCount.y * outputCellSize.y
        );
    }

    return (
        <div className="controls">
            <input type="file" ref={ref} onChange={handleSelect} />
            <div>
                <p>Point 1: {point1.toString(0)}</p>
                <p>Point 2: {point2.toString(0)}</p>
                X:{" "}
                <input
                    type="number"
                    value={cellCount.x || ""}
                    onChange={e => {
                        const v = parseInt(e.target.value);
                        if (v && v > 0) {
                            setCellCount(new Point(v, cellCount.y));
                        }
                    }}
                />
                Y:{" "}
                <input
                    type="number"
                    value={cellCount.x || ""}
                    onChange={e => {
                        const v = parseInt(e.target.value);
                        if (v && v > 0) {
                            setCellCount(new Point(cellCount.x, v));
                        }
                    }}
                />
                <p>Output: {outputSize().toString(0)}</p>
            </div>
            <button onClick={render}>Render</button>
            <div style={{ width: "100%", height: "500px", overflow: "auto" }}>
                <canvas ref={canvas} width="1000" height="1000"></canvas>
            </div>
        </div>
    );
}
