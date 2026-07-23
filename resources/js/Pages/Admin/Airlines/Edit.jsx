import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ airline }) {
    const { data, setData, put, processing, errors } = useForm({
        name: airline.name,
        code: airline.code,
        logo: airline.logo ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.airlines.update', airline.id));
    };

    return (
        <AdminLayout>
            <Head title="Edit Airline" />

            <div className="container-fluid py-4">
                <h4 className="fw-bold mb-4">Edit Airline</h4>

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
                                <label className="form-label">Airline Code</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                />
                                {errors.code && <div className="invalid-feedback">{errors.code}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Logo URL (optional)</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.logo ? 'is-invalid' : ''}`}
                                    value={data.logo}
                                    onChange={(e) => setData('logo', e.target.value)}
                                />
                                {errors.logo && <div className="invalid-feedback">{errors.logo}</div>}
                            </div>

                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-primary" disabled={processing}>
                                    Update
                                </button>
                                <Link href={route('admin.airlines.index')} className="btn btn-outline-secondary">
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
