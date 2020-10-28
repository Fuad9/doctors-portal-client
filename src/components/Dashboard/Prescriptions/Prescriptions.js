import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import PrescriptionsDataTable from "../PrescriptionsDataTable/PrescriptionsDataTable";
import Sidebar from "../Sidebar/Sidebar";

const Prescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch("https://desolate-anchorage-37987.herokuapp.com/appointments")
            .then((res) => res.json())
            .then((data) => setPrescriptions(data));
    }, []);

    return (
        <section className="container-fluid row ">
            <Sidebar />
            <div className="ml-auto col-8 col-md-10 col-lg-10" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <div className="d-flex justify-content-between mt-4">
                    <h5 className="text-brand">All Patients</h5>
                    <h4>{loggedInUser.name}</h4>
                </div>
                <PrescriptionsDataTable prescriptions={prescriptions} />
            </div>
        </section>
    );
};

export default Prescriptions;
