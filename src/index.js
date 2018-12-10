import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import AppPlay from "./AppPlay";
import * as serviceWorker from "./serviceWorker";

/*
function App1() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
*/
//const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);
ReactDOM.render(<AppPlay />, document.getElementById("root"));
serviceWorker.unregister();
