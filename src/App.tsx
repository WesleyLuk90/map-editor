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
    const [xCells, setXCells] = useState<number | null>(null);
    const [yCells, setYCells] = useState<number | null>(null);

    return (
        <div className="App">
            <Editor
                file={file}
                point1={point1}
                point2={point2}
                setPoint1={p => {
                    setPoint1(p);
                    setXCells(null);
                }}
                setPoint2={p => {
                    setPoint2(p);
                    setYCells(null);
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
