import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignOutAlt, faCalendar, faGripHorizontal, faUsers, faUserPlus, faHome } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useContext } from "react";
import { DoctorsContext, UserContext } from "../../../App";
import Axios from "axios";

const Sidebar = () => {
    const [loggedInUser] = useContext(UserContext);
    const [isDoctor, setIsDoctor] = useContext(DoctorsContext);

    useEffect(() => {
        const postDoctorData = async () => {
            try {
                const response = await Axios.post("https://desolate-anchorage-37987.herokuapp.com/isDoctor", {
                    email: loggedInUser.email,
                });
                setIsDoctor(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        postDoctorData();
    }, [loggedInUser.email, setIsDoctor]);

    return (
        <div className="sidebar d-flex flex-column justify-content-between col-md-2 py-5 px-4" style={{ height: "100vh" }}>
            <ul className="list-unstyled">
                <li>
                    <Link to="/" className="text-white">
                        <FontAwesomeIcon icon={faHome} /> <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/appointments" className="text-white">
                        <FontAwesomeIcon icon={faGripHorizontal} /> <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/allAppointments" className="text-white">
                        <FontAwesomeIcon icon={faCalendar} /> <span>Appointments</span>
                    </Link>
                </li>
                {isDoctor && (
                    <div>
                        <li>
                            <Link to="/allPatients" className="text-white">
                                <FontAwesomeIcon icon={faUsers} /> <span>Patients</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/prescriptions" className="text-white">
                                <FontAwesomeIcon icon={faFileAlt} /> <span>Prescriptions</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/addDoctor" className="text-white">
                                <FontAwesomeIcon icon={faUserPlus} /> <span>Add Doctor</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" className="text-white">
                                <FontAwesomeIcon icon={faCog} /> <span>Settings</span>
                            </Link>
                        </li>
                    </div>
                )}
            </ul>
            <div>
                <Link to="/" className="text-white">
                    <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
