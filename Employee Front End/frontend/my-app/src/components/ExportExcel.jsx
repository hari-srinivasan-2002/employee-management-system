import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportExcel({ employees }) {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(employees);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Employees"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(data, "employees.xlsx");
  };

  return (
    <button onClick={exportToExcel}>
      Export Excel
    </button>
  );
}

export default ExportExcel;