import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "regenerator-runtime/runtime"; // required polyfill;
import '../styles.css';

ReactDOM.render(<App />, document.getElementById("out"));
