import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ flightSchedule, routes }) {
    const { data, setData, put, processing, errors } = useForm({
        route_id: flightSchedule.route_id,
        flight_number: flightSchedule.flight_number,
        departure_date: flightSchedule.departure_date,
        departure_time: flightSchedule.departure_time,
        arrival_time: flightSchedule.arrival_time,
        base_price: flightSchedule.base_price,
        status: flightSchedule.status,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.flight-schedules.update', flightSchedule.id));
    };

    return (
        <AdminLayout>
            <Head title="Edit Flight Schedule" />

            <div className="container-fluid py-4">
                <h4 className="fw-bold mb-4">Edit Flight Schedule</h4>

                <div className="card" style={{ maxWidth: '700px' }}>
                    <div className="card-body">
                        <form onSubmit={submit}>
                            <div className="mb-3">
                                <label className="form-label">Route</label>
                                <select
                                    className={`form-select ${errors.route_id ? 'is-invalid' : ''}`}
                                    value={data.route_id}
                                    onChange={(e) => setData('route_id', e.target.value)}
                                >
                                    {routes.map((r) => (
                                        <option key={r.id} value={r.id}>
                                            {r.airline?.name}: {r.originAirport?.code} → {r.destinationAirport?.code}
                                        </option>
                                    ))}
                                </select>
                                {errors.route_id && <div className="invalid-feedback">{errors.route_id}</div>}
                            </div>

                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Flight Number</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.flight_number ? 'is-invalid' : ''}`}
                                        value={data.flight_number}
                                        onChange={(e) => setData('flight_number', e.target.value)}
                                    />
                                    {errors.flight_number && (
                                        <div className="invalid-feedback">{errors.flight_number}</div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Departure Date</label>
                                    <input
                                        type="date"
                                        className={`form-control ${errors.departure_date ? 'is-invalid' : ''}`}
                                        value={data.departure_date}
                                        onChange={(e) => setData('departure_date', e.target.value)}
                                    />
                                    {errors.departure_date && (
                                        <div className="invalid-feedback">{errors.departure_date}</div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Departure Time</label>
                                    <input
                                        type="time"
                                        className={`form-control ${errors.departure_time ? 'is-invalid' : ''}`}
                                        value={data.departure_time}
                                        onChange={(e) => setData('departure_time', e.target.value)}
                                    />
                                    {errors.departure_time && (
                                        <div className="invalid-feedback">{errors.departure_time}</div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Arrival Time</label>
                                    <input
                                        type="time"
                                        className={`form-control ${errors.arrival_time ? 'is-invalid' : ''}`}
                                        value={data.arrival_time}
                                        onChange={(e) => setData('arrival_time', e.target.value)}
                                    />
                                    {errors.arrival_time && (
                                        <div className="invalid-feedback">{errors.arrival_time}</div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Base Price (৳)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className={`form-control ${errors.base_price ? 'is-invalid' : ''}`}
                                        value={data.base_price}
                                        onChange={(e) => setData('base_price', e.target.value)}
                                    />
                                    {errors.base_price && <div className="invalid-feedback">{errors.base_price}</div>}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Status</label>
                                    <select
                                        className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                    >
                                        <option value="scheduled">Scheduled</option>
                                        <option value="delayed">Delayed</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                                </div>
                            </div>

                            <hr />

                            <label className="form-label fw-bold">Seat Classes (read-only)</label>
                            <div className="table-responsive mb-3">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Class</th>
                                            <th>Price</th>
                                            <th>Total Seats</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {flightSchedule.flightClasses.map((cls) => (
                                            <tr key={cls.id}>
                                                <td>{cls.name}</td>
                                                <td>৳{cls.price}</td>
                                                <td>{cls.total_seats}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-muted small mb-4">
                                Seat classes can't be edited here yet — changing seat counts after seats may
                                already be booked needs safe migration logic (a later phase).
                            </p>

                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-primary" disabled={processing}>
                                    Update
                                </button>
                                <Link href={route('admin.flight-schedules.index')} className="btn btn-outline-secondary">
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
