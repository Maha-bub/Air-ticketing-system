import { Head } from '@inertiajs/react';

export default function Dashboard({ stats, recentBookings }) {
    return (
        <>
            <Head title="Agent Dashboard" />

            <div className="container-fluid py-4">
                <h4 className="fw-bold mb-4">Agent Dashboard</h4>

                <div className="row g-3 mb-4">
                    <div className="col-6 col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <p className="mb-1 text-muted">Total Bookings</p>
                                <h4 className="fw-bold mb-0">{stats.totalBookings}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <p className="mb-1 text-muted">Pending Bookings</p>
                                <h4 className="fw-bold mb-0">{stats.pendingBookings}</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h6 className="fw-bold mb-3">Bookings</h6>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Reference</th>
                                        <th>Customer</th>
                                        <th>Flight No.</th>
                                        <th>Status</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentBookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td>{booking.booking_reference}</td>
                                            <td>{booking.user?.name}</td>
                                            <td>{booking.flightSchedule?.flight_number}</td>
                                            <td className="text-capitalize">{booking.status}</td>
                                            <td>৳{booking.total_amount}</td>
                                        </tr>
                                    ))}
                                    {recentBookings.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="text-center text-muted">
                                                No bookings yet
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
