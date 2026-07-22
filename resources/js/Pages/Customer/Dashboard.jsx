import { Head } from '@inertiajs/react';

export default function Dashboard({ bookings }) {
    return (
        <>
            <Head title="My Dashboard" />

            <div className="container-fluid py-4">
                <h4 className="fw-bold mb-4">My Bookings</h4>

                <div className="row g-3">
                    {bookings.map((booking) => (
                        <div className="col-12 col-md-6 col-lg-4" key={booking.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="fw-bold mb-1">{booking.booking_reference}</h6>
                                    <p className="mb-1 text-muted">
                                        {booking.flightSchedule?.route?.originAirport?.code} →{' '}
                                        {booking.flightSchedule?.route?.destinationAirport?.code}
                                    </p>
                                    <p className="mb-1">Flight: {booking.flightSchedule?.flight_number}</p>
                                    <p className="mb-2">Amount: ৳{booking.total_amount}</p>
                                    <span className="badge bg-primary text-capitalize">{booking.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {bookings.length === 0 && (
                        <div className="col-12">
                            <p className="text-muted">You haven't booked any flights yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
