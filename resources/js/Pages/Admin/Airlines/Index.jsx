import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ airlines }) {
    const handleDelete = (airline) => {
        if (confirm(`Delete airline "${airline.name}"?`)) {
            router.delete(route('admin.airlines.destroy', airline.id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Airlines" />

            <div className="container-fluid py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0">Airlines</h4>
                    <Link href={route('admin.airlines.create')} className="btn btn-primary">
                        + Add Airline
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
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {airlines.data.map((airline) => (
                                        <tr key={airline.id}>
                                            <td>{airline.name}</td>
                                            <td>
                                                <span className="badge bg-secondary">{airline.code}</span>
                                            </td>
                                            <td className="text-end">
                                                <Link
                                                    href={route('admin.airlines.edit', airline.id)}
                                                    className="btn btn-sm btn-outline-secondary me-2"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(airline)}
                                                    className="btn btn-sm btn-outline-danger"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {airlines.data.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="text-center text-muted py-4">
                                                No airlines yet
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {airlines.links && airlines.links.length > 3 && (
                            <div className="d-flex flex-wrap gap-2 mt-3">
                                {airlines.links.map((link, i) => (
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
