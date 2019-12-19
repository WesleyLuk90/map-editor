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
    const [xCells, setXCells] = useState(20);
    const [yCells, setYCells] = useState(20);

    function update(p1: Point, p2: Point) {
        const p = p1.sub(p2).abs();
        setXCells(Math.round(p.x / 20));
        setYCells(Math.round(p.y / 20));
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
                xCells={xCells}
                yCells={yCells}
            />
            <Controls
                onSelect={setFile}
                point1={point1}
                point2={point2}
                xCells={xCells}
                yCells={yCells}
                setXCells={setXCells}
                setYCells={setYCells}
            />
        </div>
    );
}

export default App;
