import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <a className="nav-link mr-5" href="#">
                            Home <span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link mr-5" href="#">
                            About
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link mr-5" href="#services">
                            Dental Services
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link mr-5 text-white" href="#reviews">
                            Reviews
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link mr-5 text-white" href="#blogs">
                            Blogs
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link mr-5 text-white" href="#contact">
                            Contact Us
                        </a>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link mr-5 text-dark text-none" to="/appointments">
                            Dashboard
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
