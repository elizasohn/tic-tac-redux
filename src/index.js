import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Game from "./components/Game";
import reducer from "./reducers/reducer";

const store = createStore(reducer);

// ========================================

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById("root")
);
