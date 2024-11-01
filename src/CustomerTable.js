import { useState, useContext } from "react";
import ServicesContext from "./ServicesContext";

export default function CustomerTable() {
  const { getServicesByCode } = useContext(ServicesContext);
  const [rows, setRows] = useState([]);

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

  const clearTable = () => { setRows([]); };

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

  return (
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
                onChange={(e) => handleInputChange(index, "no", e.target.value)}
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
          <td colSpan={2}></td>
          <td style={{ textAlign: "center" }}>
            <button className="btn" onClick={recalculateTimes}>
              SIMULATE
            </button>
          </td>
          <td colSpan={3}></td>
          <td colSpan={2} style={{ textAlign: "right" }}>
            {" "}
            <button className="btn" onClick={clearTable}>
              CLEAR TABLE
            </button>{" "}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
