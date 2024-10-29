export default function ServicesOutput() {
  let services = [];
  let servicesList = services.map((service)=>{
    return(
      <tr key={service.code}>
        <td>{service.name}</td>
        <td>{service.code}</td>
        <td>{service.time}</td>
        <td><button className="btn" style={{background:"crimson"}}>Del</button></td>
      </tr>
    );
  })
  return <div className="services-output">
    <h2>Services Table</h2>
    <div className="container-table">
      <table aria-hidden="true">
        <tr>
          <th>Code</th>
          <th>Title</th>
          <th>Time</th>
          <th>Delete</th>
        </tr>
        {servicesList}

      </table>
    </div>
  </div>;
}