import React, { useEffect, useState } from "react";
import PrescriptionsDataTable from "../PrescriptionsDataTable/PrescriptionsDataTable";
import Sidebar from "../Sidebar/Sidebar";

const Prescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/appointments")
            .then((res) => res.json())
            .then((data) => setPrescriptions(data));
    }, []);

    return (
        <div className="container-fluid row ">
            <Sidebar></Sidebar>
            <div className="col-md-10 p-4 pr-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <h5 className="text-brand">All Patients</h5>
                <PrescriptionsDataTable prescriptions={prescriptions} />
            </div>
        </div>
    );
};

export default Prescriptions;
