import React from "react";
import { Point } from "./Editor";

export function Controls({
    onSelect,
    point1,
    point2,
    xCells,
    setXCells,
    yCells,
    setYCells
}: {
    onSelect: (file: File) => void;
    point1: Point;
    point2: Point;
    xCells: number;
    setXCells: (count: number) => void;
    yCells: number;
    setYCells: (count: number) => void;
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

    return (
        <div className="controls">
            <input type="file" ref={ref} onChange={handleSelect} />
            <div>
                <p>Point 1: {point1.toString(0)}</p>
                <p>Point 2: {point2.toString(0)}</p>
                X:{" "}
                <input
                    type="number"
                    value={xCells || ""}
                    onChange={e => {
                        const v = parseInt(e.target.value);
                        if (v && v > 0) {
                            setXCells(v);
                        }
                    }}
                />
                Y:{" "}
                <input
                    type="number"
                    value={yCells || ""}
                    onChange={e => {
                        const v = parseInt(e.target.value);
                        if (v && v > 0) {
                            setYCells(v);
                        }
                    }}
                />
            </div>
        </div>
    );
}
