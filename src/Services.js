import "./services.css";
import { useState } from "react";
import AddServices from "./AddServices";
import ServicesTable from "./ServicesTable";


export default function Services() {
  const [services, setServices] = useState(initialServices);

  function handleAddService(name, code, time) {
    setServices([
      ...services,
      {
        name: name,
        code: code,
        time: time,
      },
    ]);
  }

  function handleDeleteService(serviceCode) {
    setServices(services.filter((s) => s.code !== serviceCode));
  }

  return (
    <div className="container-services">
        <AddServices onAddService={handleAddService}/>
        <ServicesTable 
          services={services}
          onDeleteService={handleDeleteService}
        />
    </div>
  );
}

const initialServices = [
  { name: 'HW', code: '1', time: '3' },
  { name: 'SW', code: '2', time: '5' },
];