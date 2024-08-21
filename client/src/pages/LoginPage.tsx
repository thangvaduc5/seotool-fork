import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import UserContext from '../context/UserContext';

const LoginPage: React.FC = () => {
    const { login } = useContext(UserContext) ?? { login: async () => { } };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError(null);
            await login(email, password);

            // Redirect or perform other actions after successful login
            navigate('/comment');
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-body">
                    <h3 className="text-center mb-4">Welcome Back</h3>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group form-floating mb-3">
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                            <label htmlFor="email" className="form-label text-black-50">Enter your email</label>
                        </div>
                        <div className="form-group form-floating mb-3">
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                            <label htmlFor="password" className="form-label text-black-50">Enter your password</label>
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
                    </form>
                    <div className="text-center mt-3">
                        <span>Don't have an account? </span>
                        <Link to="/signup" className='text-decoration-none'>Sign up!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
