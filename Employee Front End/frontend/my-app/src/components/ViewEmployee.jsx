import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ViewEmployee() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8099/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div style={{ padding: "30px" }}>

      <h1>Employee Details</h1>

      <hr />

      <h3>ID : {employee.id}</h3>

      <h3>Name : {employee.name}</h3>

      <h3>Email : {employee.email}</h3>

      <h3>Department : {employee.department}</h3>

      <h3>Salary : ₹{employee.salary}</h3>

      <br />

      <button onClick={() => navigate("/employees")}>
        Back
      </button>

    </div>
  );
}

export default ViewEmployee;