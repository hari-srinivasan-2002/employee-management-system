import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav
      style={{
        backgroundColor: "#2c3e50",
        padding: "15px",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link
        to="/dashboard"
        style={{ color: "white", textDecoration: "none" }}
      >
        Dashboard
      </Link>

      <Link
        to="/employees"
        style={{ color: "white", textDecoration: "none" }}
      >
        Employees
      </Link>

      <Link
        to="/add-employee"
        style={{ color: "white", textDecoration: "none" }}
      >
        Add Employee
      </Link>

      <button
        onClick={logout}
        style={{
          marginLeft: "auto",
          background: "red",
          color: "white",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;