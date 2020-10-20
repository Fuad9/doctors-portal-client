import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

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

const PrescriptionForm = ({ modalIsOpen, closeModal, modalData }) => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        // data.name = name;
        // data.date = date;

        fetch("http://localhost:5000/addPrescriptions", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((success) => {
                if (success) {
                    closeModal();
                    alert("Prescription added successfully.");
                }
            });
    };

    return (
        <div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                <div className="d-flex justify-content-between">
                    <p className="text-brand font-weight-bold">{modalData.name}</p>
                    <p>
                        Age: <small className="text-secondary text-center">{modalData.age}</small>
                    </p>
                    <p>
                        Weight: <small className="text-secondary text-center">{modalData.weight}</small>
                    </p>
                    <p>
                        Date: <small className="text-secondary text-center">{modalData.date}</small>
                    </p>
                </div>
                <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group row">
                        <div className="col-4">
                            <input ref={register({ required: true })} className="form-control" name="medicine" placeholder="Medicine" type="text" />
                            {errors.age && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="col-4">
                            <input ref={register({ required: true })} className="form-control" name="dose" placeholder="Dose" type="text" />
                            {errors.age && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="col-4">
                            <input ref={register({ required: true })} className="form-control" name="days" placeholder="Days" type="number" />
                            {errors.weight && <span className="text-danger">This field is required</span>}
                        </div>
                    </div>
                    <button className="btn btn-brand">Submit</button>
                </form>
            </Modal>
        </div>
    );
};

export default PrescriptionForm;
