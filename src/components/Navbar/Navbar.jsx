import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const [logedUser, setLogedUser] = useState([]);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user?.email) {
      fetch('https://techhub-server-n5dugvzfl-mdjahedahmed12-gmailcom.vercel.app/users')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const matchedUser = data.find(
            (userData) => userData.email === user.email
          );
          console.log(matchedUser);
          if (matchedUser) {
            setLogedUser(matchedUser);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      // Set userData to a default value or an empty object
      setLogedUser([]);
    }
  }, [user]);

  const handleLogOut = () => {
    logOut()
      .then(
        Swal.fire({
          title: "Log Out",
          text: "Successfully logged out",
          icon: "Success",
          confirmButtonText: "ok",
        }),
        navigate("/")
      )
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };
  const navLinks = (
    <>
      <li className="text-lg">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="text-lg">
        <NavLink to="/allProducts">Products</NavLink>
      </li>
      {user ? (
        ""
      ) : (
        <li className="text-lg">
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          TechHub
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={logedUser.photo}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <p className="justify-between">{logedUser.name}</p>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link onClick={handleLogOut} to="/login">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
