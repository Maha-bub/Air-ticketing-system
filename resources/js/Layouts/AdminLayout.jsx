import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    const { flash } = usePage().props;

    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            <nav className="bg-dark text-white p-3" style={{ width: '230px', flexShrink: 0 }}>
                <h5 className="fw-bold mb-4 text-white">✈ Air Ticketing</h5>
                <ul className="nav nav-pills flex-column gap-1">
                    <li className="nav-item">
                        <Link href={route('admin.dashboard')} className="nav-link text-white-50">
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href={route('admin.airports.index')} className="nav-link text-white-50">
                            Airports
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href={route('admin.airlines.index')} className="nav-link text-white-50">
                            Airlines
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href={route('admin.routes.index')} className="nav-link text-white-50">
                            Routes
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href={route('admin.flight-schedules.index')} className="nav-link text-white-50">
                            Flight Schedules
                        </Link>
                    </li>
                    <li className="nav-item mt-4">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="nav-link text-white-50 border-0 bg-transparent w-100 text-start"
                        >
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>

            <main className="flex-grow-1 bg-light" style={{ minWidth: 0 }}>
                {flash?.success && (
                    <div className="alert alert-success rounded-0 mb-0 px-4 py-2">{flash.success}</div>
                )}
                {flash?.error && (
                    <div className="alert alert-danger rounded-0 mb-0 px-4 py-2">{flash.error}</div>
                )}
                {children}
            </main>
        </div>
    );
}
