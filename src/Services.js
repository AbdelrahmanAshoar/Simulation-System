// Services.js
import "./services.css";
import React, { useContext } from 'react';
import AddServices from "./AddServices";
import ServicesTable from "./ServicesTable";
import ServicesContext from './ServicesContext';

export default function Services() {
  const { services } = useContext(ServicesContext);

  return (
    <div className="container-services">
      <AddServices />
      <ServicesTable services={services} />
    </div>
  );
}
