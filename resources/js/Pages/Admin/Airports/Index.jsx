import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ airports }) {
    const handleDelete = (airport) => {
        if (confirm(`Delete airport "${airport.name}"?`)) {
            router.delete(route('admin.airports.destroy', airport.id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Airports" />

            <div className="container-fluid py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0">Airports</h4>
                    <Link href={route('admin.airports.create')} className="btn btn-primary">
                        + Add Airport
                    </Link>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Code</th>
                                        <th>City</th>
                                        <th>Country</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {airports.data.map((airport) => (
                                        <tr key={airport.id}>
                                            <td>{airport.name}</td>
                                            <td>
                                                <span className="badge bg-secondary">{airport.code}</span>
                                            </td>
                                            <td>{airport.city}</td>
                                            <td>{airport.country}</td>
                                            <td className="text-end">
                                                <Link
                                                    href={route('admin.airports.edit', airport.id)}
                                                    className="btn btn-sm btn-outline-secondary me-2"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(airport)}
                                                    className="btn btn-sm btn-outline-danger"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {airports.data.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="text-center text-muted py-4">
                                                No airports yet
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {airports.links && airports.links.length > 3 && (
                            <div className="d-flex flex-wrap gap-2 mt-3">
                                {airports.links.map((link, i) => (
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
