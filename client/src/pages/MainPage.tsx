import backgroundImage from '../assets/DSC_0914.jpg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext, { UserContextType } from '../context/UserContext';
import './MainPage.css';

const MainPage = () => {
    const { isAuthenticated } = useContext(UserContext) as UserContextType
    return (
        <div
            className="d-flex justify-content-center align-items-center main-page"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <div className="text-center text-white">
                <h1 className="display-1 font-weight-bold mb-4 animate__animated animate__fadeInDown">
                    Welcome to the ultimate SEO tool
                </h1>
                <p className="lead mb-5 animate__animated animate__fadeInUp">
                    Unlock the power of search engine optimization and take your website to new heights.
                </p>

                {isAuthenticated
                    ? 
                    <Link className="" aria-current="page" to="/comment">
                        <button className="btn btn-outline-light btn-lg animate__animated animate__bounceIn">
                            Get Started
                        </button>
                    </Link>
                    :
                    <Link className="" aria-current="page" to="/login">
                        <button className="btn btn-outline-light btn-lg animate__animated animate__bounceIn">
                            Join Now
                        </button>
                    </Link>
                }
            </div>
        </div>
    );
};

export default MainPage;