import "./services.css";
import React, { useContext } from 'react';
import ServicesContext from './ServicesContext';
import AddServices from "./AddServices";
import ServicesTable from "./ServicesTable";

export default function Services() {
  const { services } = useContext(ServicesContext);

  return (
    <div className="container-services">
      <AddServices />
      <ServicesTable services={services} />
    </div>
  );
}
