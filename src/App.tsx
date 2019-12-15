import React, { useState } from "react";
import "./App.css";
import { Controls } from "./Controls";
import { Editor } from "./Editor";

function App() {
    const [file, setFile] = useState<null | File>(null);

    return (
        <div className="App">
            <Editor file={file} />
            <Controls onSelect={setFile} />
        </div>
    );
}

export default App;
