import React, { useState } from "react";
import PrescriptionModal from "../PrescriptionModal/PrescriptionModal";

const PrescriptionsDataTable = ({ prescriptions }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    function openModal(id) {
        const p = prescriptions.find((a) => a._id === id);
        setModalData(p.appointment);
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
                    <tr key={prescription._id}>
                        <td>{index + 1}</td>
                        <td>{prescription.appointment.date}</td>
                        <td>{prescription.appointment.name}</td>
                        <td>{prescription.appointment.phone}</td>
                        <td>
                            <div>
                                <button onClick={() => openModal(prescription._id)} className="btn btn-brand text-uppercase">
                                    View
                                </button>
                                <PrescriptionModal modalData={modalData} modalIsOpen={modalIsOpen} closeModal={closeModal} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PrescriptionsDataTable;
