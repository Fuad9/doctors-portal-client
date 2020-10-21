import React, { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home/Home";
import Appointment from "./components/Appointment/Appointment/Appointment";
import Dashboard from "./components/Dashboard/Dashboard/Dashboard";
import Login from "./components/Login/Login/Login";
import AllPatients from "./components/AllPatients/AllPatients/AllPatients";
import DashboardDataInfo from "./components/Dashboard/Dashboard/DashboardDataInfo";
import AddDoctor from "./components/AddDoctor/AddDoctor";
import PrivateRoute from "./components/Login/PrivateRoute/PrivateRoute";
import Prescriptions from "./components/Dashboard/Prescriptions/Prescriptions";

export const UserContext = createContext();
export const DoctorsContext = createContext();
export const DateContext = createContext();
export const ModalDataContext = createContext();

function App() {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [isDoctor, setIsDoctor] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [modalData, setModalData] = useState({});

    return (
        <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
            <DoctorsContext.Provider value={[isDoctor, setIsDoctor]}>
                <DateContext.Provider value={[selectedDate, setSelectedDate]}>
                    <ModalDataContext.Provider value={[modalData, setModalData]}>
                        <Router>
                            <Switch>
                                <Route path="/bookAppointment">
                                    <Appointment></Appointment>
                                </Route>
                                <PrivateRoute path="/appointments">
                                    <Dashboard></Dashboard>
                                </PrivateRoute>
                                <PrivateRoute path="/allAppointments">
                                    <DashboardDataInfo />
                                </PrivateRoute>
                                <PrivateRoute path="/allPatients">
                                    <AllPatients></AllPatients>
                                </PrivateRoute>
                                <PrivateRoute path="/prescriptions">
                                    <Prescriptions />
                                </PrivateRoute>
                                <PrivateRoute path="/addDoctor">
                                    <AddDoctor />
                                </PrivateRoute>
                                <Route path="/login">
                                    <Login></Login>
                                </Route>
                                <Route exact path="/">
                                    <Home></Home>
                                </Route>
                            </Switch>
                        </Router>
                    </ModalDataContext.Provider>
                </DateContext.Provider>
            </DoctorsContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
