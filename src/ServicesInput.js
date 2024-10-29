import { useContext } from "react";
import { serviceData } from "./Services";
export default function ServicesInput() {
  const [setData] = useContext(serviceData);
  return (
    <div className="services-input">
      <h2>Services Creation</h2>
      <hr className="hr" />
      <div className="row">
        <label htmlFor="nameService">Name:</label>
        <input
          id="age"
          type="text"
          onChange={(ele) => {
            setData((parData)=>({ ...parData, name: ele.target.value }));
          }}
        />
      </div>
      <div className="row">
        <label htmlFor="codeService">Code:</label>
        <input
          id="codeService"
          type="text"
          name="codeService"
          onChange={(ele) => {
            setData((parData)=>({ ...parData, code: ele.target.value }));
          }}
        />
      </div>
      <div className="row">
        <label htmlFor="timeService">Arrival Time:</label>
        <input
          type="number"
          name="timeService"
          id="timeService"
          onChange={(ele) => {
            setData((parData)=>({ ...parData, arrivalTime: ele.target.value }));
          }}
        />
      </div>
      <button type="submit" className="btn" style={{ margin: "20px" }}>
        Add To The Table
      </button>
    </div>
  );
}
