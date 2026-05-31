import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import ExportExcel from "./ExportExcel";

function EmployeeList() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get("http://localhost:8099/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:8099/employees/${id}`)
      .then(() => {
        alert("Employee Deleted Successfully");
        fetchEmployees();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee =
    indexOfLastEmployee - employeesPerPage;

  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(
    filteredEmployees.length / employeesPerPage
  );

  return (
    <div style={{ padding: "20px" }}>

      <h1>Employee Management System</h1>

      <input
        type="text"
        placeholder="Search Employee..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "20px"
        }}
      />

      <br />

     <Link to="/add-employee">
  <button>Add Employee</button>
</Link>

&nbsp;&nbsp;

<ExportExcel employees={employees} />

      <br /><br />

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>

              <td>
                <Link to={`/view-employee/${employee.id}`}>
                  <button>View</button>
                </Link>

                <Link to={`/update-employee/${employee.id}`}>
                  <button style={{ marginLeft: "5px" }}>
                    Update
                  </button>
                </Link>

                <button
                  onClick={() => deleteEmployee(employee.id)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <div>
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          Previous
        </button>

        <span
          style={{
            marginLeft: "15px",
            marginRight: "15px"
          }}
        >
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default EmployeeList;