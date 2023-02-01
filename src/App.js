import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Layout from "./components/layout";
import Users from "./components/users/users";
import EditOrCreateUser from "./components/users/edit_create_user";
import Login from "./components/login";
import { useSelector } from "react-redux";
import { loggedInSelect } from "./login_slice";

function App() {
  const loggedIn = useSelector(loggedInSelect);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="users" element={<Users />}></Route>
          {loggedIn ? (
            <>
              <Route
                path="edit-create-user/:id"
                element={<EditOrCreateUser />}
              ></Route>
              <Route
                path="edit-create-user"
                element={<EditOrCreateUser />}
              ></Route>
            </>
          ) : (
            <>
              <Route path="login" element={<Login />}></Route>
            </>
          )}
        </Route>
        <Route
          path="*"
          element={
            <>
              <h1>Not found</h1>
              <Link to={"/"}>go to Home</Link>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
