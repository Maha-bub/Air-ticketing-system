import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Create({ airlines, airports }) {
    const { data, setData, post, processing, errors } = useForm({
        airline_id: '',
        origin_airport_id: '',
        destination_airport_id: '',
        distance_km: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.routes.store'));
    };

    return (
        <AdminLayout>
            <Head title="Add Route" />

            <div className="container-fluid py-4">
                <h4 className="fw-bold mb-4">Add Route</h4>

                <div className="card" style={{ maxWidth: '600px' }}>
                    <div className="card-body">
                        <form onSubmit={submit}>
                            <div className="mb-3">
                                <label className="form-label">Airline</label>
                                <select
                                    className={`form-select ${errors.airline_id ? 'is-invalid' : ''}`}
                                    value={data.airline_id}
                                    onChange={(e) => setData('airline_id', e.target.value)}
                                >
                                    <option value="">Select airline</option>
                                    {airlines.map((airline) => (
                                        <option key={airline.id} value={airline.id}>
                                            {airline.name} ({airline.code})
                                        </option>
                                    ))}
                                </select>
                                {errors.airline_id && <div className="invalid-feedback">{errors.airline_id}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Origin Airport</label>
                                <select
                                    className={`form-select ${errors.origin_airport_id ? 'is-invalid' : ''}`}
                                    value={data.origin_airport_id}
                                    onChange={(e) => setData('origin_airport_id', e.target.value)}
                                >
                                    <option value="">Select origin</option>
                                    {airports.map((airport) => (
                                        <option key={airport.id} value={airport.id}>
                                            {airport.city} ({airport.code})
                                        </option>
                                    ))}
                                </select>
                                {errors.origin_airport_id && (
                                    <div className="invalid-feedback">{errors.origin_airport_id}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Destination Airport</label>
                                <select
                                    className={`form-select ${errors.destination_airport_id ? 'is-invalid' : ''}`}
                                    value={data.destination_airport_id}
                                    onChange={(e) => setData('destination_airport_id', e.target.value)}
                                >
                                    <option value="">Select destination</option>
                                    {airports.map((airport) => (
                                        <option key={airport.id} value={airport.id}>
                                            {airport.city} ({airport.code})
                                        </option>
                                    ))}
                                </select>
                                {errors.destination_airport_id && (
                                    <div className="invalid-feedback">{errors.destination_airport_id}</div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Distance (km, optional)</label>
                                <input
                                    type="number"
                                    min="0"
                                    className={`form-control ${errors.distance_km ? 'is-invalid' : ''}`}
                                    value={data.distance_km}
                                    onChange={(e) => setData('distance_km', e.target.value)}
                                />
                                {errors.distance_km && <div className="invalid-feedback">{errors.distance_km}</div>}
                            </div>

                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-primary" disabled={processing}>
                                    Save
                                </button>
                                <Link href={route('admin.routes.index')} className="btn btn-outline-secondary">
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
