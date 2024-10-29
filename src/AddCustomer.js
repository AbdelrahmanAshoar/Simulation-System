import "./CustomerInfo.css"
import { useState } from "react";
export default function CustomerInfo(){

  return (
    <>
      <form onSubmit={(ev)=>{ev.preventDefault()}}>
        <div>
          <label htmlFor="noCustomer">No.Customer</label>
          <input type="number"  name="noCustomer" id="noCustomer" />
        </div>
        <div>
          <label htmlFor="arrivalTime">Arrival Time</label>
          <input type="time" name="arrivalTime" id="arrivalTime" />
        </div>
        <div>
          <span>Operation:</span>
          <select name="operation" id="">
            <option value="HW">Hardware</option>
            <option value="SW">Software</option>
            <option value="Network">Network</option>
          </select>
        </div>
        <button>ADD</button>
        <button>Simulate</button>
      </form>
      <table  aria-hidden="true">
      <th>
        <td>No.</td>
        <td>Interarrival</td>
        <td>Arrival Time</td>
        <td>Code Services</td>
        <td>Arrival Time</td>
        <td>Arrival Time</td>
        <td>Arrival Time</td>
      </th>
      </table>
    </>
  );
}