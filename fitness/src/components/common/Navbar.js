import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
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
                <NavLink to="/classes/view" className={"nav-link"}>
                  Classes
                </NavLink>
              </li>
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
                <ul class="dropdown-menu fw-9" aria-labelledby="navbarDropdown">
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
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
