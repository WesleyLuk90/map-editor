import React, { useState } from "react";
import "./App.css";
import { Canvas } from "./Canvas";
import { Controls } from "./Controls";

function App() {
    const [file, setFile] = useState<null | File>(null);

    return (
        <div className="App">
            <Canvas image={file} />
            <Controls onSelect={setFile} />
        </div>
    );
}

export default App;
