import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8099/employees")
      .then((response) => {

        const employees = response.data;

        const deptCount = {};

        employees.forEach((emp) => {
          deptCount[emp.department] =
            (deptCount[emp.department] || 0) + 1;
        });

        const chartData = Object.keys(deptCount).map((dept) => ({
          name: dept,
          value: deptCount[dept]
        }));

        setData(chartData);
      });
  }, []);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF"
  ];

  return (
    <div>
      <h2>Department Wise Employees</h2>

      <PieChart width={500} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default EmployeeChart;