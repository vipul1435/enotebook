import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import Alert from "./Alert";
export default function Navbar() {
  const context = useContext(noteContext);
  const { alert,showAlert} = context;
  const navigate = useNavigate();
  const handelLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    showAlert("Logout successfully","success");
  };
  let location = useLocation();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <h6 className="navbar-brand">eNoteboook</h6>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <div className="f-flex">
                <Link
                  className="btn btn-primary me-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="f-flex">
                <button className="btn btn-primary mx-2" onClick={handelLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <Alert alert={alert} />
    </>
  );
}
