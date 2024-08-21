import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext, { UserContextType } from '../context/UserContext';
import { LuUser2 } from "react-icons/lu";


const Header: React.FC = () => {

  const { isAuthenticated, user, logout } = useContext(UserContext) as UserContextType

  return (

    // <div className="vh-100 overflow-hidden">
    // fixed-top => use margin in App.tsx
    <nav className="navbar navbar-expand-lg border-bottom bg-white sticky-top"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Back to Home"
    >
      <div className="container">
        <Link className="navbar-brand d-flex justify-content-center align-items-center gap-3" to="/">
          {/* <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" /> */}
          <span className="fs-4" style={{ fontFamily: 'Inter, sans-serif' }}>BTS
          </span>
        </Link>

        <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="sidebar offcanvas offcanvas-start" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Bao & Triet SEO</h5>
            <button type="button" className="btn-close shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>

          <div className="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
            <ul className="navbar-nav justify-content-center align-items-center fs-5 flex-grow-1 pe-3">

              {isAuthenticated ?
                // Comment Page
                <li className="nav-item mx-2">
                  <Link className="nav-link" aria-current="page" to="/comment">
                    Comment
                  </Link>
                </li>
                : null}

              {/* Profiles Page */}
              {/* <li className="nav-item mx-2">
                  <Link className="nav-link" to="/profiles">
                    Profiles
                  </Link>
                </li> */}
            </ul>

            {/* Login / Sign Up */}
            {isAuthenticated
              ?
              <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3'>
                <div>
                  <span className="text-dark">Welcome, {user?.username}</span>
                </div>
                <Link aria-current="page" to="/">
                  <button onClick={logout} type="button" className="btn btn-danger btn-sm">
                    Log Out
                  </button>
                </Link>
              </div>
              :
              <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3'>
                <Link aria-current="page" to="/login">
                  <button type="button" className="btn btn-outline-primary btn-sm">
                    {/* <i className="fa fa-user me-2" aria-hidden="true"></i> */}
                    <div className="d-flex align-items-center">
                      <LuUser2 className='me-1' size={18} />
                      Login
                    </div>
                  </button>
                </Link>
                <Link aria-current="page" to="/signup">
                  <button type="button" className="btn btn-secondary btn-sm">
                    Sign Up
                  </button>
                </Link>
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
    // </div>
  );
};

export default Header;