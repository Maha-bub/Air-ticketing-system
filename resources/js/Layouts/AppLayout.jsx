import { Link, usePage } from '@inertiajs/react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
                <Link className="navbar-brand" href={route('dashboard')}>
                    Air Ticketing System
                </Link>

                <div className="d-flex align-items-center ms-auto">
                    <span className="text-light me-3 d-none d-md-inline">
                        {auth?.user?.name}
                        {auth?.user?.roles?.length > 0 && (
                            <span className="badge bg-secondary text-capitalize ms-2">
                                {auth.user.roles[0].name}
                            </span>
                        )}
                    </span>
                    <Link href={route('profile.edit')} className="btn btn-outline-light btn-sm me-2">
                        Profile
                    </Link>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="btn btn-outline-light btn-sm"
                    >
                        Logout
                    </Link>
                </div>
            </nav>

            <main>{children}</main>
        </>
    );
}
