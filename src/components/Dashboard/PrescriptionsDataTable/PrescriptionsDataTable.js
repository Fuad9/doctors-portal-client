import { Modal } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PrescriptionForm from "../PrescriptionForm/PrescriptionForm";

const PrescriptionsDataTable = ({ prescriptions }) => {
    const { register, handleSubmit, errors } = useForm();

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
                    <tr>
                        <td>{index + 1}</td>
                        <td>{prescription.date}</td>
                        <td>{prescription.name}</td>
                        <td>{prescription.phone}</td>
                        <td>
                            <button onClick={openModal} className="btn btn-brand text-uppercase">
                                View
                            </button>
                            <PrescriptionForm modalIsOpen={modalIsOpen} prescription={prescription} closeModal={closeModal}></PrescriptionForm>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PrescriptionsDataTable;
