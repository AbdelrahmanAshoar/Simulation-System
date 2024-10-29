import { useState } from 'react';

export default function AddServices({onAddService}) {
  const [services, setServices] = useState({name:"", code:"", time:""})
  return (
    <div className="services-input">
      <h2>Services Creation</h2>
      <hr className="hr" />
      <div className="row">
        <label htmlFor="nameService">Name:</label>
        <input
          id="age"
          type="text"
          value={services.name}
          onChange={(ele) => setServices({...services, name:ele.target.value})}
        />
      </div>
      <div className="row">
        <label htmlFor="codeService">Code:</label>
        <input
          id="codeService"
          type="text"
          name="codeService"
          value={services.code}
          onChange={(ele) => setServices({...services, code:ele.target.value})}
        />
      </div>
      <div className="row">
        <label htmlFor="timeService">Arrival Time:</label>
        <input
          type="number"
          name="timeService"
          id="timeService"
          value={services.time}
          onChange={(ele) => setServices({...services, time:ele.target.value})}
        />
      </div>
      <button className="btn" style={{ margin: "20px" }}
        onClick={() => {
          onAddService(services.name, services.code, services.time);
          setServices({name:"", code:"", time:""})
        }}>
        Add To The Table
      </button>
    </div>
  );
}
