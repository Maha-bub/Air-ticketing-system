import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4 mx-auto">
                        <div className="card border-3">
                            <div className="card-body p-5">
                                <h4 className="fw-bold">Get Started Now</h4>
                                <p className="mb-0">Enter your credentials to login your account</p>

                                {status && (
                                    <div className="alert alert-success mt-3 mb-0">{status}</div>
                                )}

                                <form className="row g-3 mt-2" onSubmit={submit}>
                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            placeholder="jhon@example.com"
                                            value={data.email}
                                            autoComplete="username"
                                            autoFocus
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            placeholder="Enter Password"
                                            value={data.password}
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                            />
                                            <label className="form-check-label" htmlFor="remember">
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>

                                    {canResetPassword && (
                                        <div className="col-md-6 text-end">
                                            <Link href={route('password.request')}>Forgot Password?</Link>
                                        </div>
                                    )}

                                    <div className="col-12">
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary" disabled={processing}>
                                                Login
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="text-start">
                                            <p className="mb-0">
                                                Don't have an account yet?{' '}
                                                <Link href={route('register')}>Sign up here</Link>
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
