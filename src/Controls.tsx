import React from "react";
import { Point } from "./Editor";
import { range } from "./Util";

function NumberInput({
    value,
    onChange
}: {
    value: number;
    onChange: (e: number) => void;
}) {
    return (
        <input
            type="number"
            value={value}
            onChange={e => {
                const number = parseInt(e.target.value);
                if (!isNaN(number)) {
                    onChange(number);
                }
            }}
        />
    );
}

export function Controls({
    onSelect,
    point1,
    point2,
    cellCount,
    setCellCount,
    file,
    startExtra,
    endExtra,
    setStartExtra,
    setEndExtra
}: {
    onSelect: (file: File) => void;
    point1: Point;
    point2: Point;
    cellCount: Point;
    setCellCount: (point: Point) => void;
    file: File | null;
    startExtra: Point;
    endExtra: Point;
    setStartExtra: (e: Point) => void;
    setEndExtra: (e: Point) => void;
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

    const outCount = cellCount.sub(startExtra).add(endExtra);

    async function render() {
        if (!file || !canvas.current) {
            return;
        }
        const diff = point1.sub(point2).abs();
        const outputCellSize = outputSize();
        const scale = diff.divide(cellCount);
        const source = point1.add(startExtra.multiply(scale));
        const sourceSize = diff
            .sub(startExtra.multiply(scale))
            .add(endExtra.multiply(scale));
        const outSize = outCount.multiply(outputCellSize);
        canvas.current.width = outSize.x;
        canvas.current.height = outSize.y;
        const ctx = canvas.current.getContext("2d");
        if (ctx == null) {
            return;
        }
        const bitmap = await createImageBitmap(file);
        ctx.drawImage(
            bitmap,
            source.x,
            source.y,
            sourceSize.x,
            sourceSize.y,
            0,
            0,
            outSize.x,
            outSize.y
        );
        range(outCount.x * 2).forEach(i => {
            ctx.beginPath();
            ctx.moveTo((i * outputCellSize.x) / 2, 0);
            ctx.lineTo((i * outputCellSize.x) / 2, outSize.y);
            ctx.stroke();
        });
        range(outCount.y * 2).forEach(i => {
            ctx.beginPath();
            ctx.moveTo(0, (i * outputCellSize.y) / 2);
            ctx.lineTo(outSize.x, (i * outputCellSize.y) / 2);
            ctx.stroke();
        });
    }

    return (
        <div className="controls">
            <input type="file" ref={ref} onChange={handleSelect} />
            <div>
                <p>Point 1: {point1.toString(0)}</p>
                <p>Point 2: {point2.toString(0)}</p>
                X:{" "}
                <NumberInput
                    value={cellCount.x}
                    onChange={v => setCellCount(new Point(v, cellCount.y))}
                />
                Y:{" "}
                <NumberInput
                    value={cellCount.y}
                    onChange={v => setCellCount(new Point(cellCount.x, v))}
                />
                <p>Square Size: {outputSize().toString(0)}</p>
                <p>Output Grid Size: {outCount.scale(2).toString(0)}</p>
            </div>
            <div>
                <div>
                    Top:
                    <NumberInput
                        value={startExtra.y}
                        onChange={y =>
                            setStartExtra(new Point(startExtra.x, y))
                        }
                    />
                </div>
                <div>
                    Left:
                    <NumberInput
                        value={startExtra.x}
                        onChange={x =>
                            setStartExtra(new Point(x, startExtra.y))
                        }
                    />
                </div>
                <div>
                    Bottom:
                    <NumberInput
                        value={endExtra.y}
                        onChange={y => setEndExtra(new Point(endExtra.x, y))}
                    />
                </div>
                <div>
                    Right:
                    <NumberInput
                        value={endExtra.x}
                        onChange={x => setEndExtra(new Point(x, endExtra.y))}
                    />
                </div>
            </div>
            <button onClick={render}>Render</button>
            <div style={{ width: "100%", height: "500px", overflow: "auto" }}>
                <canvas ref={canvas} width="1000" height="1000"></canvas>
            </div>
        </div>
    );
}
