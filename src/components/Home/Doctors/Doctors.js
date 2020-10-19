import React, { useEffect, useState } from "react";
import Axios from "axios";
import Loading from "../../Loading/Loading";
import Doctor from "../Doctor/Doctor";
const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getTableData = async () => {
            try {
                setIsLoading(true);
                const response = await Axios.get("http://localhost:5000/doctors");
                setDoctors(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };
        getTableData();
    }, []);

    return (
        <section className="doctors">
            <div className="container">
                <h5 className="text-center  text-primary mb-5">Our Doctors</h5>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="row">
                        {doctors.map((doctor) => (
                            <Doctor key={doctor._id} doctor={doctor} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Doctors;
