import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />

            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-5 mx-auto">
                        <div className="card border-3">
                            <div className="card-body p-5">
                                <h4 className="fw-bold">Get Started Now</h4>
                                <p className="mb-0">Enter your credentials to create your account</p>

                                <form className="row g-3 mt-2" onSubmit={submit}>
                                    <div className="col-12">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            placeholder="Jhon"
                                            value={data.name}
                                            autoComplete="name"
                                            autoFocus
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            placeholder="example@user.com"
                                            value={data.email}
                                            autoComplete="username"
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
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="password_confirmation" className="form-label">
                                            Confirm Password
                                        </label>
                                        <input
                                            id="password_confirmation"
                                            type="password"
                                            className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                                            placeholder="Confirm Password"
                                            value={data.password_confirmation}
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        {errors.password_confirmation && (
                                            <div className="invalid-feedback">{errors.password_confirmation}</div>
                                        )}
                                    </div>

                                    <div className="col-12">
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary" disabled={processing}>
                                                Register
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="text-start">
                                            <p className="mb-0">
                                                Already have an account?{' '}
                                                <Link href={route('login')}>Sign in here</Link>
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
