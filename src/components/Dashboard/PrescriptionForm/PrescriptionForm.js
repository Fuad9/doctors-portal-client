import React from "react";
import { Modal } from "@material-ui/core";
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

// Modal.setAppElement("#root");

const PrescriptionForm = ({ modalIsOpen, prescription, closeModal }) => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        fetch("http://localhost:5000/addPrescriptions", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((success) => {
                console.log(success);
            });
    };

    return (
        <div>
            <Modal isOpen={modalIsOpen} style={customStyles} contentLabel="Example Modal">
                <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group row">
                        <div className="col-4">
                            <input ref={register({ required: true })} className="form-control" name="age" placeholder="Your Age" type="number" />
                            {errors.age && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="col-4">
                            <select className="form-control" name="gender" ref={register({ required: true })}>
                                <option disabled={true} value="Not set">
                                    1-1-1
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Not set">Other</option>
                            </select>
                            {errors.gender && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="col-4">
                            <input ref={register({ required: true })} className="form-control" name="days" placeholder="Days" type="number" />
                            {errors.weight && <span className="text-danger">This field is required</span>}
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default PrescriptionForm;
