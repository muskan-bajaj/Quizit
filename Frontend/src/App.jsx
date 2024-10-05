import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

const Login = React.lazy(() => import("./components/Login"));
const Profile = React.lazy(() => import("./components/Profile"));
const Assessment = React.lazy(() => import("./components/Assessment"));
const Result = React.lazy(() => import("./components/Result"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/assessment"
            element={
              <Suspense>
                <Assessment />
              </Suspense>
            }
          />
          <Route
            path="/results"
            element={
              <Suspense>
                <Result />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
