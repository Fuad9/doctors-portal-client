import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Axios from "axios";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement("#root");

const PrescriptionsShortList = ({ modalIsOpen, closeModal }) => {
    const [isloading, setIsLoading] = useState(false);
    const [prescriptionsInfo, setPrescriptionsInfo] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const response = await Axios.get("http://localhost:5000/showPrescriptions");
                setPrescriptionsInfo(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };
        getData();
    }, []);

    return (
        <div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                {prescriptionsInfo.map((info) => (
                    <div className="d-flex justify-content-between">
                        <p className="text-brand">Name: {info.medicine}</p>
                    </div>
                ))}
            </Modal>
        </div>
    );
};

export default PrescriptionsShortList;
