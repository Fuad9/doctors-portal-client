import React, { useEffect, useState } from "react";
import Axios from "axios";
import BookingCard from "../BookingCard/BookingCard";
import Loading from "../../Loading/Loading";

const BookAppointment = ({ date }) => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getTableData = async () => {
            try {
                setIsLoading(true);
                const response = await Axios.get("https://desolate-anchorage-37987.herokuapp.com/showBookings");
                setBookings(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };
        getTableData();
    }, []);

    console.log(bookings);

    return (
        <section>
            <h2 className="text-center text-brand mb-5">Available Appointments on {date.toDateString()}</h2>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="row">
                    {bookings.map((booking) => (
                        <BookingCard booking={booking} date={date} key={booking.id}></BookingCard>
                    ))}
                </div>
            )}
        </section>
    );
};

export default BookAppointment;
