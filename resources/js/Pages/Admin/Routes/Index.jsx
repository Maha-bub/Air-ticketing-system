import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ routes }) {
    const handleDelete = (route) => {
        if (confirm('Delete this route?')) {
            router.delete(window.route('admin.routes.destroy', route.id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Routes" />

            <div className="container-fluid py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0">Routes</h4>
                    <Link href={route('admin.routes.create')} className="btn btn-primary">
                        + Add Route
                    </Link>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th>Airline</th>
                                        <th>Origin</th>
                                        <th>Destination</th>
                                        <th>Distance</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {routes.data.map((r) => (
                                        <tr key={r.id}>
                                            <td>{r.airline?.name}</td>
                                            <td>
                                                {r.originAirport?.city} ({r.originAirport?.code})
                                            </td>
                                            <td>
                                                {r.destinationAirport?.city} ({r.destinationAirport?.code})
                                            </td>
                                            <td>{r.distance_km ? `${r.distance_km} km` : '—'}</td>
                                            <td className="text-end">
                                                <Link
                                                    href={route('admin.routes.edit', r.id)}
                                                    className="btn btn-sm btn-outline-secondary me-2"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(r)}
                                                    className="btn btn-sm btn-outline-danger"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {routes.data.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="text-center text-muted py-4">
                                                No routes yet
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {routes.links && routes.links.length > 3 && (
                            <div className="d-flex flex-wrap gap-2 mt-3">
                                {routes.links.map((link, i) => (
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
