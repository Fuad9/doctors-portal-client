import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import Loading from "../../Loading/Loading";
import Sidebar from "../Sidebar/Sidebar";
import DashboardDataTable from "./DashboardDataTable";

const DashboardDataInfo = () => {
    const [dashboardInfo, setdashboardInfo] = useState([]);
    const [loggedInUser] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const response = await Axios.get("http://localhost:5000/appointments");
                setdashboardInfo(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };
        getData();
    }, []);

    return (
        <section className="container-fluid row">
            <Sidebar />
            <div className="ml-auto col-8 col-md-10 col-lg-10">
                <div className="d-flex justify-content-between mt-4">
                    <h5 className="text-brand">Order</h5>
                    <h4>{loggedInUser.name}</h4>
                </div>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div
                        className="mt-5"
                        style={{
                            backgroundColor: "#F4FDFB",
                            height: "100vh",
                        }}
                    >
                        <table className="table table-borderless">
                            <thead style={{ backgroundColor: "lightgray" }}>
                                <tr>
                                    <th className="text-secondary" style={{ width: "10%" }} scope="col">
                                        Sr No
                                    </th>
                                    <th className="text-secondary" scope="col">
                                        Date
                                    </th>
                                    <th className="text-secondary" scope="col">
                                        Name
                                    </th>
                                    <th className="text-secondary" scope="col">
                                        Contact
                                    </th>
                                    <th className="text-secondary" scope="col">
                                        Prescriptions
                                    </th>
                                    <th className="text-secondary" style={{ width: "8.3em" }} scope="col">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <DashboardDataTable dashboardInfo={dashboardInfo} />
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DashboardDataInfo;
