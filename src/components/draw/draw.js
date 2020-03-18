import React from "react";
import ReactDOM from "react-dom";
import { LiterallyCanvasReactComponent } from "literallycanvas";

import "./styles.css";

export default function App() {
    const canvasInit = lc => {
        console.log(lc);
    };

    return (
        <div className="App literally-canvas">
            <LiterallyCanvasReactComponent
                onInit={canvasInit}
                imageURLPrefix="https://cdn.jsdelivr.net/npm/literallycanvas@0.5.2/lib/img/"
            />
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
