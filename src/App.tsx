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
    const [size, setSize] = useState<number | null>(null);

    return (
        <div className="App">
            <Editor
                file={file}
                point1={point1}
                point2={point2}
                setPoint1={p => {
                    setPoint1(p);
                    setSize(null);
                }}
                setPoint2={p => {
                    setPoint2(p);
                    setSize(null);
                }}
                size={size}
            />
            <Controls
                onSelect={setFile}
                point1={point1}
                point2={point2}
                size={size}
                setSize={setSize}
            />
        </div>
    );
}

export default App;
