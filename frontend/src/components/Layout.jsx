import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="container">
      <header>
        <Link to="/" className="brand">Travel Guide</Link>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/businesses">Hotels & Restaurants</NavLink>
          <NavLink to="/transport">Transport</NavLink>
          <NavLink to="/reviews">Reviews</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
