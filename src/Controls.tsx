import React from "react";
import { Point } from "./Editor";

export function Controls({
    onSelect,
    point1,
    point2
}: {
    onSelect: (file: File) => void;
    point1: Point;
    point2: Point;
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

                {[19, 20, 21, 22].map(p => (
                    <p key={p}>
                        {p}:{" "}
                        {point2
                            .sub(point1)
                            .abs()
                            .mod(p)
                            .toString()}
                    </p>
                ))}
            </div>
        </div>
    );
}
