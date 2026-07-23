import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const statusColors = {
    scheduled: 'bg-primary',
    delayed: 'bg-warning text-dark',
    cancelled: 'bg-danger',
    completed: 'bg-success',
};

export default function Index({ flightSchedules }) {
    const handleDelete = (flight) => {
        if (confirm(`Delete flight "${flight.flight_number}"?`)) {
            router.delete(route('admin.flight-schedules.destroy', flight.id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Flight Schedules" />

            <div className="container-fluid py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0">Flight Schedules</h4>
                    <Link href={route('admin.flight-schedules.create')} className="btn btn-primary">
                        + Add Flight Schedule
                    </Link>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th>Flight No.</th>
                                        <th>Route</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Base Price</th>
                                        <th>Status</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {flightSchedules.data.map((flight) => (
                                        <tr key={flight.id}>
                                            <td>{flight.flight_number}</td>
                                            <td>
                                                {flight.route?.originAirport?.code} →{' '}
                                                {flight.route?.destinationAirport?.code}
                                                <div className="text-muted small">{flight.route?.airline?.name}</div>
                                            </td>
                                            <td>{flight.departure_date}</td>
                                            <td>
                                                {flight.departure_time} - {flight.arrival_time}
                                            </td>
                                            <td>৳{flight.base_price}</td>
                                            <td>
                                                <span className={`badge ${statusColors[flight.status] ?? 'bg-secondary'} text-capitalize`}>
                                                    {flight.status}
                                                </span>
                                            </td>
                                            <td className="text-end">
                                                <Link
                                                    href={route('admin.flight-schedules.edit', flight.id)}
                                                    className="btn btn-sm btn-outline-secondary me-2"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(flight)}
                                                    className="btn btn-sm btn-outline-danger"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {flightSchedules.data.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="text-center text-muted py-4">
                                                No flight schedules yet
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {flightSchedules.links && flightSchedules.links.length > 3 && (
                            <div className="d-flex flex-wrap gap-2 mt-3">
                                {flightSchedules.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`btn btn-sm ${link.active ? 'btn-primary' : 'btn-outline-secondary'} ${
                                            !link.url ? 'disabled' : ''
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
