import { useState } from "react";

function EmployeeForm({ onSave, selectedEmployee }) {
  const [employee, setEmployee] = useState(
    selectedEmployee || {
      name: "",
      email: "",
      department: "",
      salary: "",
    }
  );

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(employee);

    setEmployee({
      name: "",
      email: "",
      department: "",
      salary: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Employee Form</h3>

      <input
        name="name"
        placeholder="Name"
        value={employee.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={employee.email}
        onChange={handleChange}
      />

      <input
        name="department"
        placeholder="Department"
        value={employee.department}
        onChange={handleChange}
      />

      <input
        name="salary"
        placeholder="Salary"
        value={employee.salary}
        onChange={handleChange}
      />

      <button type="submit">Save</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "15px",
    background: "#f1f5f9",
    borderRadius: "10px",
    marginBottom: "20px",
  },
};

export default EmployeeForm;