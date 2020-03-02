import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import {
  setLocale,
  loadTranslations,
  syncTranslationWithStore
} from "react-redux-i18n";

import translations from "./i18n/translations.json";

import reducer from "./reducers";
import App from "./Components/App";

import "./index.scss";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale("en"));

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
