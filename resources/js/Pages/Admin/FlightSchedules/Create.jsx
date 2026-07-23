import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Create({ routes }) {
    const { data, setData, post, processing, errors } = useForm({
        route_id: '',
        flight_number: '',
        departure_date: '',
        departure_time: '',
        arrival_time: '',
        base_price: '',
        status: 'scheduled',
        classes: [
            { name: 'Economy', price: '', total_seats: '' },
            { name: 'Business', price: '', total_seats: '' },
        ],
    });

    const updateClass = (index, field, value) => {
        const updated = [...data.classes];
        updated[index] = { ...updated[index], [field]: value };
        setData('classes', updated);
    };

    const addClass = () => {
        setData('classes', [...data.classes, { name: '', price: '', total_seats: '' }]);
    };

    const removeClass = (index) => {
        setData('classes', data.classes.filter((_, i) => i !== index));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.flight-schedules.store'));
    };

    return (
        <AdminLayout>
            <Head title="Add Flight Schedule" />

            <div className="container-fluid py-4">
                <h4 className="fw-bold mb-4">Add Flight Schedule</h4>

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
                                    <option value="">Select route</option>
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
                                        placeholder="e.g. BS-147"
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

                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <label className="form-label mb-0 fw-bold">Seat Classes</label>
                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={addClass}>
                                    + Add Class
                                </button>
                            </div>

                            {data.classes.map((cls, index) => (
                                <div className="row g-2 mb-2 align-items-start" key={index}>
                                    <div className="col-4">
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                errors[`classes.${index}.name`] ? 'is-invalid' : ''
                                            }`}
                                            placeholder="Class name (e.g. Economy)"
                                            value={cls.name}
                                            onChange={(e) => updateClass(index, 'name', e.target.value)}
                                        />
                                        {errors[`classes.${index}.name`] && (
                                            <div className="invalid-feedback">{errors[`classes.${index}.name`]}</div>
                                        )}
                                    </div>
                                    <div className="col-3">
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className={`form-control ${
                                                errors[`classes.${index}.price`] ? 'is-invalid' : ''
                                            }`}
                                            placeholder="Price (৳)"
                                            value={cls.price}
                                            onChange={(e) => updateClass(index, 'price', e.target.value)}
                                        />
                                        {errors[`classes.${index}.price`] && (
                                            <div className="invalid-feedback">{errors[`classes.${index}.price`]}</div>
                                        )}
                                    </div>
                                    <div className="col-3">
                                        <input
                                            type="number"
                                            min="1"
                                            max="200"
                                            className={`form-control ${
                                                errors[`classes.${index}.total_seats`] ? 'is-invalid' : ''
                                            }`}
                                            placeholder="Total seats"
                                            value={cls.total_seats}
                                            onChange={(e) => updateClass(index, 'total_seats', e.target.value)}
                                        />
                                        {errors[`classes.${index}.total_seats`] && (
                                            <div className="invalid-feedback">
                                                {errors[`classes.${index}.total_seats`]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-2">
                                        {data.classes.length > 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger w-100"
                                                onClick={() => removeClass(index)}
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <p className="text-muted small mt-2 mb-4">
                                Seats will be auto-generated (e.g. 1E, 2E... for Economy, 1B, 2B... for Business)
                                based on the total seats you enter for each class.
                            </p>

                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-primary" disabled={processing}>
                                    Save Flight Schedule
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
