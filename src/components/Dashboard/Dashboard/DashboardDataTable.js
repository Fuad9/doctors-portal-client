import React, { useContext, useState } from "react";
import { DoctorsContext, UserContext } from "../../../App";
import { Form } from "react-bootstrap";
import PrescriptionsShortList from "./PrescriptionsShortList";

const DashboardDataTable = ({ info, index }) => {
    const [loggedInUser] = useContext(UserContext);
    const [isDoctor] = useContext(DoctorsContext);
    const [modalDataInfo, setModalDataInfo] = useState({});

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
        setModalDataInfo(info.appointment);
    }

    function closeModal() {
        setIsOpen(false);
    }

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
            {(info.appointment.email === loggedInUser.email || isDoctor) && (
                <tr key={Math.random()}>
                    <td>{index + 1}</td>
                    <td>{info.appointment.date}</td>
                    <td>{info.appointment.name}</td>
                    <td>{info.appointment.phone}</td>
                    <td>
                        <button onClick={openModal} className="btn btn-brand text-uppercase">
                            View
                        </button>
                        <PrescriptionsShortList modalDataInfo={modalDataInfo} modalIsOpen={modalIsOpen} prescriptionOn={info.appointment.name} closeModal={closeModal} />
                    </td>
                    <td>
                        {isDoctor ? (
                            info.status == "Pending" ? (
                                <Form.Control as="select" className="text-danger" onChange={handleStatus}>
                                    <option selected style={{ color: "#FF4545" }}>
                                        Pending
                                    </option>
                                    <option style={{ color: "#009444" }}>Approved</option>
                                    <option style={{ color: "#FFBD3E" }}>Cancelled</option>
                                </Form.Control>
                            ) : info.status == "Approved" ? (
                                <Form.Control as="select" className="text-success" onChange={handleStatus}>
                                    <option style={{ color: "#FF4545" }}>Pending</option>
                                    <option selected style={{ color: "#009444" }}>
                                        Approved
                                    </option>
                                    <option style={{ color: "#FFBD3E" }}>Cancelled</option>
                                </Form.Control>
                            ) : (
                                <Form.Control as="select" className="text-warning" onChange={handleStatus}>
                                    <option style={{ color: "#FF4545" }}>Pending</option>
                                    <option style={{ color: "#009444" }}>Approved</option>
                                    <option selected style={{ color: "#FFBD3E" }}>
                                        Cancelled
                                    </option>
                                </Form.Control>
                            )
                        ) : (
                            <p
                                style={{
                                    background: info.status == "Pending" ? "#FFE3E3" : info.status == "Approved" ? "#C6FFE0" : "#fff6e5",
                                    color: info.status == "Pending" ? "#FF4545" : info.status == "Approved" ? "#009444" : "#FFBD3E",
                                    borderRadius: "5px",
                                    padding: "5px 8px",
                                }}
                            >
                                {info.status}
                            </p>
                        )}
                    </td>
                </tr>
            )}
        </>
    );
};

export default DashboardDataTable;
