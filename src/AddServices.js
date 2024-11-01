import React, { useState, useContext } from "react";
import ServicesContext from "./ServicesContext";


export default function AddServices() {
  const { handleAddService, serviceIsExisted } = useContext(ServicesContext);
  const [toolTip, setToolTip] = useState("");
  const [service, setService] = useState({ name: "", code: "", time: "" });
  const [serviceExist, setServiceExist] = useState({nameEx: false,codeEx: false,});
  let   isDisableBtn = service.name === "" || service.code === "" || service.time === "";

  return (
    <div className="services-input">
      <h2>Services Creation</h2>
      <hr className="hr" />
      <div className="row">
        <label htmlFor="nameService">Name:</label>
        <input
          type="text"
          value={service.name}
          onChange={(e) => {
            setServiceExist({
              nameEx: serviceIsExisted(e.target.value.trim()),
              codeEx: false,
            });
            setService({ ...service, name: e.target.value });
          }}
        />

        {serviceExist.nameEx ? (
          <div className="warning">Services name is already present</div>
        ) : (
          <></>
        )}

      </div>
      <div className="row">
        <label htmlFor="codeService">Code: </label>
        <input
          type="text"
          value={service.code}
          onChange={(e) => {
            setServiceExist({
              ...serviceExist,
              codeEx: serviceIsExisted("", e.target.value.trim()),
            });
            setService({ ...service, code: e.target.value });
          }}
        />

        {serviceExist.codeEx ? (
          <div className="warning">Services code is already present</div>
        ) : (
          <></>
        )}
        
      </div>
      <div className="row">
        <label htmlFor="timeService">Duration:</label>
        <input
          type="number"
          value={service.time}
          onChange={(e) => setService({ ...service, time: e.target.value })}
        />
      </div>


      <button
        className="btn"
        disabled={isDisableBtn}
        title={toolTip}
        
        onClick={() => {
          handleAddService(service.name, service.code, service.time);
          setService({ name: "", code: "", time: "" });
        }}
        onMouseOver={() => {
          isDisableBtn ? setToolTip("fill in the feilds") : setToolTip("");
        }}
      >
        Add To The Table
      </button>


    </div>
  );
}
