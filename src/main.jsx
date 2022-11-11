import React from 'react'
import ReactDOM from "react-dom/client";
import {
  Routes,
  Route
} from "react-router-dom";
import { HashRouter } from "react-router-dom";

//styles
import './assets/styles/bootstrap.scss'
import './assets/styles/global.scss'

//components
import Layout from './components/Layout';

// views
import ErrorPage from './views/ErrorPage';
import HomePage from './views/HomePage';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/error" element={<ErrorPage />}></Route>
        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={<HomePage />}
          />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);