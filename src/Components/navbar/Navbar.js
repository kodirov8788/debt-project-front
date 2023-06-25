import React from 'react';
import { Link } from 'react-router-dom';
// import { useAuthContext } from '../../hooks/useAuthContext';
import './Navbar.css';

const Navbar = () => {
  // const { user, dispatch } = useAuthContext();

  // const logout = () => {
  //   localStorage.removeItem('user')
  //   dispatch({ type: 'LOGOUT' })
  // }

  // const handleClick = () => {
  //   logout();
  // };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Qarz daftari</h1>
        </Link>
        <nav>
          {/* {user ? (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )} */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
