import React from "react";
import { Point } from "./Editor";
import { range } from "./Util";

export function Controls({
    onSelect,
    point1,
    point2,
    size,
    setSize
}: {
    onSelect: (file: File) => void;
    point1: Point;
    point2: Point;
    size: number | null;
    setSize: (size: number | null) => void;
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

                <label>
                    None
                    <input
                        type="radio"
                        checked={size == null}
                        onClick={() => setSize(null)}
                    />
                </label>
                {range(16, 26).map(i => (
                    <div>
                        <label>
                            {i}
                            <input
                                type="radio"
                                checked={size === i}
                                onClick={() => setSize(i)}
                            />
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
