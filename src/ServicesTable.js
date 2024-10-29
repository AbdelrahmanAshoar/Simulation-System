// ServicesTable.js
import React, { useContext } from 'react';
import ServicesContext from './ServicesContext';

export default function ServicesTable() {
  const { services, handleDeleteService } = useContext(ServicesContext);

  return (
    <div className="services-output">
      <h2>Services Table</h2>
      <div className="container-table">
        <table aria-hidden="true">
          <thead>
            <tr>
              <th>Code</th>
              <th>Title</th>
              <th>Duration</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.code}>
                <td>{service.code}</td>
                <td>{service.name}</td>
                <td>{service.time}</td>
                <td>
                  <button
                    className="btn"
                    style={{ background: "crimson" }}
                    onClick={() => handleDeleteService(service.code)}
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
