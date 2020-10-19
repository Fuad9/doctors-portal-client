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

const PrescriptionForm = ({ modalIsOpen, prescriptionOn, closeModal }) => {
    const { register, handleSubmit, errors } = useForm();
    // const { name, age, weight } = prescriptionOn;

    console.log(prescriptionOn);

    const onSubmit = (data) => {
        data.name = prescriptionOn;

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
                    <p className="text-brand">Name: {prescriptionOn}</p>
                </div>
                <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group row">
                        <div className="col-4">
                            <input ref={register({ required: true })} className="form-control" name="medicine" placeholder="Medicine" type="text" />
                            {errors.age && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="col-4">
                            <input ref={register({ required: true })} className="form-control" name="frequency" placeholder="" type="text" />
                            {errors.age && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="col-4">
                            <input ref={register({ required: true })} className="form-control" name="days" placeholder="Days" type="number" />
                            {errors.weight && <span className="text-danger">This field is required</span>}
                        </div>
                    </div>
                    <button>Submit</button>
                </form>
            </Modal>
        </div>
    );
};

export default PrescriptionForm;
