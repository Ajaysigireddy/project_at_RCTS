var NewComponent = React.createClass({
    render: function() {
      return (
        <div>
          <h2>Responsive Table</h2>
          <div className="table-wrapper">
            <table className="fl-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Data set Name</th>
                  <th>Date of upload</th>
                  <th>Visualize</th>
                </tr>
              </thead>
              <tbody>
              {excelList && excelList.map((item, index) => (
            <tr key={index}>
              <td>{item.username}</td>
              <td>{item.datasetname}</td>
              <td>{item.date}</td>
              <td>
                <button className="list-button" onClick={() => handleVisualizeClick(item)}>
                  Visualize
                </button>
              </td>
            </tr>
          ))}
              </tbody></table>
          </div>
        </div>
      );
    }
  });