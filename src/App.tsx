import React, { useState } from "react";
import "./App.css";
import { Controls } from "./Controls";
import { Editor, Point } from "./Editor";
export class Bounds {
    constructor(
        readonly left: number,
        readonly right: number,
        readonly top: number,
        readonly bottom: number
    ) {}
}

function App() {
    const [file, setFile] = useState<null | File>(null);
    const [point1, setPoint1] = useState(new Point(100, 100));
    const [point2, setPoint2] = useState(new Point(500, 500));
    const [cellCount, setCellCount] = useState(new Point(20, 20));
    const [startExtra, setStartExtra] = useState(new Point(0, 0));
    const [endExtra, setEndExtra] = useState(new Point(0, 0));

    function update(p1: Point, p2: Point) {
        const p = p1.sub(p2).abs();
        setCellCount(new Point(Math.round(p.x / 22), Math.round(p.y / 22)));
    }

    return (
        <div className="App">
            <Editor
                file={file}
                point1={point1}
                point2={point2}
                setPoint1={p => {
                    setPoint1(p);
                    update(p, point2);
                }}
                setPoint2={p => {
                    setPoint2(p);
                    update(point1, p);
                }}
                cellCount={cellCount}
                startExtra={startExtra}
                endExtra={endExtra}
            />
            <Controls
                onSelect={setFile}
                point1={point1}
                point2={point2}
                file={file}
                cellCount={cellCount}
                setCellCount={setCellCount}
                startExtra={startExtra}
                endExtra={endExtra}
                setStartExtra={setStartExtra}
                setEndExtra={setEndExtra}
            />
        </div>
    );
}

export default App;
