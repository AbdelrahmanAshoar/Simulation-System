import { useState, useContext } from "react";
import ServicesContext from "./ServicesContext";
import * as XLSX from "xlsx";

export default function CustomerTable() {
  const { getServicesByCode } = useContext(ServicesContext);
  const [rows, setRows] = useState([]);
  const [excelTable, setExcelTable] = useState([]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        no: "",
        interarrival: "",
        arrivalTime: "",
        code: "",
        title: "",
        begin: "",
        duration: "",
        end: "",
        systemState: "",
        customerState: "",
      },
    ]);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      let arr = [];
      json.forEach((row) => {
        const service = getServicesByCode(+row.code)[0];
        console.log(row);
        if (row.no && row.interarrival !== null && row.code) {
          arr.push({
            no: row.no,
            interarrival: row.interarrival,
            arrivalTime: "",
            code: row.code,
            title: service.name,
            begin: "",
            duration: service.time,
            end: "",
            systemState: "",
            customerState: "",
          });
        }
      });

      setRows([...arr]);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleCodeService = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    if (field === "code") {
      const service = getServicesByCode(+value)[0];
      if (service) {
        newRows[index].title = service.name;
        newRows[index].duration = service.time;
      } else {
        newRows[index].title = "";
        newRows[index].duration = "";
      }
    }
    setRows(newRows);
  };

  const recalculateTimes = () => {
    let cumulativeTime = 0;
    let prevEndTime = 0;

    const newRows = rows.map((row, index) => {
      cumulativeTime += parseFloat(row.interarrival || 0);
      row.arrivalTime = cumulativeTime;
      row.begin = Math.max(row.arrivalTime, prevEndTime);
      row.end = row.begin + parseFloat(row.duration || 0);

      // Updated Customer State Logic
      row.customerState =
        row.begin > row.arrivalTime ? row.begin - row.arrivalTime : "inservice";

      // Updated System State Logic
      row.systemState =
        index === 0 || row.begin > prevEndTime ? "idle" : "busy";
      prevEndTime = row.end;

      return row;
    });
    setRows(newRows);
  };

  const clearTable = () => {
    setRows([]);
  };

  return (
    <>
      <table aria-hidden="false">
        <thead>
          <tr>
            <th colSpan={3}>Customer</th>
            <th colSpan={2}>Service</th>
            <th colSpan={3}>In Service (Time)</th>
            <th>Customer</th>
            <th>System</th>
          </tr>
          <tr>
            <th>NO.</th>
            <th>Interarrival</th>
            <th>Arrival Time</th>
            <th>Code</th>
            <th>Title</th>
            <th>Begin</th>
            <th>Duration</th>
            <th>End</th>
            <th>State</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                {" "}
                <input
                  type="text"
                  value={row.no}
                  onChange={(e) =>
                    handleInputChange(index, "no", e.target.value)
                  }
                />{" "}
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  value={row.interarrival}
                  onChange={(e) =>
                    handleInputChange(index, "interarrival", e.target.value)
                  }
                />{" "}
              </td>
              <td>{row.arrivalTime}</td>
              <td>
                <input
                  type="number"
                  value={row.code}
                  onChange={(e) =>
                    handleCodeService(index, "code", e.target.value)
                  }
                />
              </td>
              <td>{row.title}</td>
              <td>{row.begin}</td>
              <td>{row.duration}</td>
              <td>{row.end}</td>
              <td>{row.customerState}</td>
              <td>{row.systemState}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              <button className="btn" onClick={addRow}>
                ADD CUSTOMER
              </button>
            </td>
            <td colSpan={4}></td>
            <td colSpan={4} className="excel-container">
              Upload Excel file:
              <button className="btn">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                />
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="btn" onClick={recalculateTimes}>
                SIMULATE
              </button>
            </td>
            <td colSpan={7}></td>
            <td colSpan={2}>
              {" "}
              <button className="btn" onClick={clearTable}>
                CLEAR TABLE
              </button>{" "}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
