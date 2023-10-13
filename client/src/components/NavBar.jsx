import { Link, Outlet } from 'react-router-dom';

export default function NavBar() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Book Journal App
          </Link>
          <div>
            <Link to="/add-book" className="btn btn-dark">
              Add Book
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
