import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./javascript";

function Navbar() {
  const { logout } = useContext(UserContext);
  const { currentUser, currentYear } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary navbar-dark"
        // data-bs-theme="dark"
        id="my-navbar"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            E.H
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0  navbar-nav-scroll">
              <li className="nav-item">
                <Link className="nav-link active mx-2" to="/">
                  الرئيسية
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active mx-2"
                  to="/secondaryfirst"
                  onClick={() => currentYear("الأول الثانوي")}
                >
                  الأول الثانوي
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active mx-2"
                  to="/secondarysecond"
                  onClick={() => currentYear("الثاني الثانوي")}
                >
                  الثاني الثانوي
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active mx-2"
                  to="/secondarythird"
                  onClick={() => currentYear("الثالث الثانوي")}
                >
                  الثالث الثانوي
                </Link>
              </li>
            </ul>

            {currentUser ? (
              <>
                <button
                  type="submit"
                  className="btn btn-light me-auto mb-2"
                  onClick={handleClick}
                >
                  تسجيل الخروج
                </button>
                <Link
                  className="btn btn-outline-light me-2 ms-2 mb-2"
                  to="/profile"
                >
                  {currentUser.username ? currentUser.username : currentUser}
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="my-btn btn btn-success me-auto mb-2"
                  to="/login"
                >
                  تسجيل الدخول
                </Link>

                <Link
                  className="my-btn btn btn-success me-2 ms-2 mb-2"
                  to="/register"
                >
                  تسجيل
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
