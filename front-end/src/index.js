// import React from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
//
// import App from "./App";
// import * as serviceWorker from "./serviceWorker";
//
// const container = document.getElementById("root");
// const root = createRoot(container);
//
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );
//
// serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById("root")
);

serviceWorker.unregister();
