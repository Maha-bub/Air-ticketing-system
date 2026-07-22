import { Head } from '@inertiajs/react';

function StatCard({ label, value }) {
    return (
        <div className="col-6 col-md-3">
            <div className="card">
                <div className="card-body">
                    <p className="mb-1 text-muted">{label}</p>
                    <h4 className="fw-bold mb-0">{value}</h4>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard({ stats, recentBookings }) {
    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="container-fluid py-4">
                <h4 className="fw-bold mb-4">Admin Dashboard</h4>

                <div className="row g-3 mb-4">
                    <StatCard label="Total Flights" value={stats.totalFlights} />
                    <StatCard label="Total Bookings" value={stats.totalBookings} />
                    <StatCard label="Confirmed Bookings" value={stats.confirmedBookings} />
                    <StatCard label="Total Customers" value={stats.totalCustomers} />
                    <StatCard label="Revenue" value={`৳${stats.totalRevenue}`} />
                </div>

                <div className="card">
                    <div className="card-body">
                        <h6 className="fw-bold mb-3">Recent Bookings</h6>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Reference</th>
                                        <th>Customer</th>
                                        <th>Route</th>
                                        <th>Status</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentBookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td>{booking.booking_reference}</td>
                                            <td>{booking.user?.name}</td>
                                            <td>
                                                {booking.flightSchedule?.route?.originAirport?.code} →{' '}
                                                {booking.flightSchedule?.route?.destinationAirport?.code}
                                            </td>
                                            <td>
                                                <span className="badge bg-primary text-capitalize">
                                                    {booking.status}
                                                </span>
                                            </td>
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
