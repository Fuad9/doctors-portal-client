import React, { useEffect, useState } from "react";
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

const PrescriptionsShortList = ({ modalDataInfo, modalIsOpen, closeModal }) => {
    const [prescriptionsInfo, setPrescriptionsInfo] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await Axios.get("https://desolate-anchorage-37987.herokuapp.com/showPrescriptions");
                setPrescriptionsInfo(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    return (
        <div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                {prescriptionsInfo.map(
                    (info) =>
                        modalDataInfo.date === info.date && (
                            <div key={Math.random()}>
                                <h5 className="text-brand text-center">Date: {info.date}</h5>
                                <div className="d-flex justify-content-between" key={Math.random()}>
                                    <p>
                                        Medicine: <small className="text-brand">{info.medicine}</small>
                                    </p>
                                    <p>
                                        Dose: <small className="text-brand">{info.dose}</small>
                                    </p>
                                    <p>
                                        Days: <small className="text-brand">{info.days}</small>
                                    </p>
                                </div>
                            </div>
                        )
                )}
            </Modal>
        </div>
    );
};

export default PrescriptionsShortList;
