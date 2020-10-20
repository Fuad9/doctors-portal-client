import React, { useContext, useState } from "react";
import { DateContext } from "../../../App";
import PrescriptionForm from "../PrescriptionForm/PrescriptionForm";

const PrescriptionsDataTable = ({ prescriptions }) => {
    const [selectedDate] = useContext(DateContext);

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <table className="table table-borderless">
            <thead>
                <tr>
                    <th className="text-secondary text-left" scope="col">
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
                        Prescription
                    </th>
                </tr>
            </thead>
            <tbody>
                {prescriptions.map((prescription, index) => (
                    <tr key={Math.random()}>
                        <td>{index + 1}</td>
                        <td>{prescription.appointment.date}</td>
                        <td>{prescription.appointment.name}</td>
                        <td>{prescription.appointment.phone}</td>
                        <td>
                            <button onClick={openModal} className="btn btn-brand text-uppercase">
                                View
                            </button>
                            <PrescriptionForm prescription={prescription.appointment} modalIsOpen={modalIsOpen} closeModal={closeModal}></PrescriptionForm>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PrescriptionsDataTable;
