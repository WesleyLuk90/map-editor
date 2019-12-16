import React, { useState } from "react";
import "./App.css";
import { Controls } from "./Controls";
import { Editor, Point } from "./Editor";

function App() {
    const [file, setFile] = useState<null | File>(null);
    const [point1, setPoint1] = useState(new Point(100, 100));
    const [point2, setPoint2] = useState(new Point(500, 500));

    return (
        <div className="App">
            <Editor
                file={file}
                point1={point1}
                point2={point2}
                setPoint1={setPoint1}
                setPoint2={setPoint2}
            />
            <Controls onSelect={setFile} point1={point1} point2={point2} />
        </div>
    );
}

export default App;
