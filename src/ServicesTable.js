export default function ServicesTable({ services, onDeleteService }) {
  let servicesList = services.map((service) => {
    return (
      <tr key={service.code}>
        <td>{service.name}</td>
        <td>{service.code}</td>
        <td>{service.time}</td>
        <td>
          <button className="btn" style={{ background: "crimson" }}
            onClick={()=>{onDeleteService(service.code)}}
          >
            Del
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="services-output">
      <h2>Services Table</h2>
      <div className="container-table">
        <table aria-hidden="true">
          <thead>
          <tr>
            <th>Code</th>
            <th>Title</th>
            <th>Time</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
            {servicesList}
          </tbody>
        </table>
      </div>
    </div>
  );
}
