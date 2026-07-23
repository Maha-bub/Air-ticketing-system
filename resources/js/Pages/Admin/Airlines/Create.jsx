import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        logo: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.airlines.store'));
    };

    return (
        <AdminLayout>
            <Head title="Add Airline" />

            <div className="container-fluid py-4">
                <h4 className="fw-bold mb-4">Add Airline</h4>

                <div className="card" style={{ maxWidth: '600px' }}>
                    <div className="card-body">
                        <form onSubmit={submit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    placeholder="US-Bangla Airlines"
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
                                    placeholder="e.g. BS"
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
                                    placeholder="https://..."
                                    value={data.logo}
                                    onChange={(e) => setData('logo', e.target.value)}
                                />
                                {errors.logo && <div className="invalid-feedback">{errors.logo}</div>}
                            </div>

                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-primary" disabled={processing}>
                                    Save
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
