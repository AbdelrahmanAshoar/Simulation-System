// ServicesContext.js
import React, { createContext, useState } from "react";

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState(initialServices);

  const handleAddService = (name, code, time) => {
    setServices([...services, { name, code, time }]);
  };

  const serviceIsExisted = (name, code) => {
    for (const s of services) {
      if(s.name === name || s.code === code) return true;
    }
  };

  const handleDeleteService = (serviceCode) => {
    setServices(services.filter((s) => s.code !== serviceCode));
  };

  return (
    <ServicesContext.Provider
      value={{
        services,
        handleAddService,
        serviceIsExisted,
        handleDeleteService,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesContext;

const initialServices = [
  { name: "HW", code: "1", time: "3" },
  { name: "SW", code: "2", time: "5" },
];
