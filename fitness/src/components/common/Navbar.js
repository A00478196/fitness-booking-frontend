import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { loggedUser } from "../helpers/common";
import instance from "../auth/axiosConfig";

const Navbar = () => {
  // useEffect(()=>{
  //   console.log(loggedUser)

  //   instance.get()
  // },[loggedUser])

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("userDetails"));
    if (items) {
      setIsLoggedIn(true);
    }
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage?.removeItem("userDetails");
    navigate("/");
    window?.location.reload();
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg sticky-top">
        <div class="container-fluid">
          <a class="navbar-brand fw-normal" href="/">
            Fitness Club
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div class="navbar-nav ">
              <li className="nav-item">
                <NavLink
                  to="/"
                  activeClassName="selected"
                  className={"nav-link"}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/programs"
                  activeClassName="selected"
                  className={"nav-link"}
                >
                  Programs
                </NavLink>
              </li>
              {loggedUser === "other" && (
                <li className="nav-item">
                  <NavLink to="/classes/view" className={"nav-link"}>
                    Classes
                  </NavLink>
                </li>
              )}
              {loggedUser === "instructor" && (
                <li class="nav-item dropdown ">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Instructors
                  </a>
                  <ul
                    class="dropdown-menu fw-9"
                    aria-labelledby="navbarDropdown"
                  >
                    <li className="">
                      <NavLink
                        className={"dropdown-item"}
                        to="/instructors/class"
                      >
                        View Classes
                      </NavLink>
                    </li>
                    <li className="">
                      <NavLink
                        className={"dropdown-item"}
                        to="/instructors/class/new"
                      >
                        Create New Class
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
              {isLoggedIn ? (
                <li className="nav-item">
                  <p className="nav-link mb-0" onClick={logout}>
                    Logout
                  </p>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className={"nav-link"}>
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/register" className={"nav-link"}>
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
