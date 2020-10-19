import React, { useContext } from "react";
import { DoctorsContext, UserContext } from "../../../App";
import { Form } from "react-bootstrap";

const DashboardDataTable = ({ info, index }) => {
    const [loggedInUser] = useContext(UserContext);
    const [isDoctor] = useContext(DoctorsContext);

    const handleStatus = (e) => {
        fetch("http://localhost:5000/statusUpdate", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: e.target.value,
                id: info._id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
            });
    };

    return (
        <>
            {isDoctor && (
                <tr key={Math.random()}>
                    <td>{index + 1}</td>
                    <td>{info.appointment.date}</td>
                    <td>{info.appointment.name}</td>
                    <td>{info.appointment.phone}</td>
                    <td>Prescriptions</td>
                    <td>
                        {info.status == "Pending" && (
                            <Form.Control as="select" className="text-danger" onChange={handleStatus}>
                                <option selected style={{ color: "#FF4545" }}>
                                    Pending
                                </option>
                                <option style={{ color: "#009444" }}>Approved</option>
                                <option style={{ color: "#FFBD3E" }}>Cancelled</option>
                            </Form.Control>
                        )}
                        {info.status == "Approved" && (
                            <Form.Control as="select" className="text-success" onChange={handleStatus}>
                                <option style={{ color: "#FF4545" }}>Pending</option>
                                <option selected style={{ color: "#009444" }}>
                                    Approved
                                </option>
                                <option style={{ color: "#FFBD3E" }}>Cancelled</option>
                            </Form.Control>
                        )}
                        {info.status == "Cancelled" && (
                            <Form.Control as="select" className="text-warning" onChange={handleStatus}>
                                <option style={{ color: "#FF4545" }}>Pending</option>
                                <option style={{ color: "#009444" }}>Approved</option>
                                <option selected style={{ color: "#FFBD3E" }}>
                                    Cancelled
                                </option>
                            </Form.Control>
                        )}
                    </td>
                </tr>
            )}
        </>
    );
};

export default DashboardDataTable;
