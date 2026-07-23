import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ airport }) {
    const { data, setData, put, processing, errors } = useForm({
        name: airport.name,
        code: airport.code,
        city: airport.city,
        country: airport.country,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.airports.update', airport.id));
    };

    return (
        <AdminLayout>
            <Head title="Edit Airport" />

            <div className="container-fluid py-4">
                <h4 className="fw-bold mb-4">Edit Airport</h4>

                <div className="card" style={{ maxWidth: '600px' }}>
                    <div className="card-body">
                        <form onSubmit={submit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">IATA Code</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                />
                                {errors.code && <div className="invalid-feedback">{errors.code}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">City</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                />
                                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Country</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                                    value={data.country}
                                    onChange={(e) => setData('country', e.target.value)}
                                />
                                {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                            </div>

                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-primary" disabled={processing}>
                                    Update
                                </button>
                                <Link href={route('admin.airports.index')} className="btn btn-outline-secondary">
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
