import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import EmployeeChart from "./EmployeeChart";

function Dashboard() {

  const [employees, setEmployees] = useState([]);
  

  useEffect(() => {
    axios.get("http://localhost:8099/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const totalEmployees = employees.length;

  const totalSalary = employees.reduce(
    (sum, emp) => sum + Number(emp.salary || 0),
    0
  );

  const totalDepartments = new Set(
    employees.map(emp => emp.department)
  ).size;

  const highestSalary =
    employees.length > 0
      ? Math.max(...employees.map(emp => Number(emp.salary)))
      : 0;

  return (
  <>
    <Navbar />

    <div style={{ padding: "20px" }}>
      <h1>Employee Management Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px"
        }}
      >
        {/* Your 4 dashboard cards */}
      </div>

      <br />
      <br />

      <EmployeeChart />

    </div>
  </>
);
}

export default Dashboard;