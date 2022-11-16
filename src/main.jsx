import React from 'react'
import ReactDOM from "react-dom/client";
import {
  Routes,
  Route
} from "react-router-dom";
import { HashRouter } from "react-router-dom";

//styles
import './assets/styles/main.scss'

//components
import Layout from './components/Layout';

//redux
import { Provider } from "react-redux";
import store from "./stores";

// views
import ErrorPage from './views/ErrorPage';
import HomePage from './views/HomePage';
import EditPage from './views/EditPage';

ReactDOM.createRoot(document.getElementById("root")).render(
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/error" element={<ErrorPage />}></Route>
          <Route path='/' element={<Layout />}>
            <Route path="editor" element={<EditPage />} />
            <Route path="" element={<HomePage />} />
          </Route>
        </Routes>
      </Provider>
    </HashRouter>
);