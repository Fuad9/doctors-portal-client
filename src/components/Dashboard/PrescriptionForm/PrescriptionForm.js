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

const PrescriptionForm = ({ prescription, modalIsOpen, closeModal }) => {
    const { register, handleSubmit, errors } = useForm();
    const { name, date } = prescription;

    const onSubmit = (data) => {
        data.name = name;
        data.date = date;

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

    console.log(name, date);

    return (
        <div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                <div className="d-flex justify-content-between">
                    <p className="text-brand">{name}</p>
                    <p className="text-secondary text-center">
                        <small>{date}</small>
                    </p>
                </div>
                <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group row">
                        <div className="col-4">
                            <input ref={register({ required: true })} className="form-control" name="medicine" placeholder="Medicine" type="text" />
                            {errors.age && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="col-4">
                            <input ref={register({ required: true })} className="form-control" name="dose" placeholder="" type="text" />
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
