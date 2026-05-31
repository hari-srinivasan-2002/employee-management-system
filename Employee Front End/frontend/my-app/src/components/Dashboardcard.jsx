function DashboardCards({ employees }) {
  const total = employees.length;

  const highestSalary = employees.reduce(
    (max, emp) => Math.max(max, emp.salary || 0),
    0
  );

  const averageSalary =
    total > 0
      ? employees.reduce((sum, e) => sum + Number(e.salary || 0), 0) / total
      : 0;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>Total Employees</h3>
        <h2>{total}</h2>
      </div>

      <div style={styles.card}>
        <h3>Highest Salary</h3>
        <h2>{highestSalary}</h2>
      </div>

      <div style={styles.card}>
        <h3>Average Salary</h3>
        <h2>{averageSalary.toFixed(2)}</h2>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    flex: 1,
    padding: "20px",
    background: "#e2e8f0",
    borderRadius: "10px",
    textAlign: "center",
  },
};

export default DashboardCards;