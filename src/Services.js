import "./services.css";
import ServicesInput from "./ServicesInput";
import ServicesOutput from "./ServicesOutput";
import { createContext, useState } from "react";


export const serviceData = createContext();
export default function Services() {
  const [data, setData] = useState({ name: '', code: '', time: '' });
  return (
    <div className="container-services">
      <serviceData.Provider value={{ data, setData }}>
        <ServicesInput />
        <ServicesOutput />
      </serviceData.Provider>
    </div>
  );
}
