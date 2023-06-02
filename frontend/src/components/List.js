import React, { useState, useEffect } from "react";
import './styles/list.css';
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();
  const [excelList, setExcelList] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/excels")
      .then((response) => response.json())
      .then((data) => {
        setExcelList(data.excels);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleItemClick = (item) => {
    const { username, datasetName, date } = extractInfoFromFilename(item);
    const formattedDatasetName = `${username}_${datasetName}_${date}`;
    
    fetch(`http://127.0.0.1:5000/excel/${encodeURIComponent(formattedDatasetName)}`)
      .then((response) => response.json())
      .then((data) => {
        const chartData = extractChartData(data);
        console.log(chartData)
        navigate(`/excel/${encodeURIComponent(formattedDatasetName)}`, { state: { chartData } });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const extractInfoFromFilename = (filename) => {
    const parts = filename.split('_');
    const username = parts[0];
    const datasetName = parts.slice(1, -1).join('_');
    const datePart = parts[parts.length - 1].split('.')[0];
    const date = datePart.split('_').join('-');

    return {
      username,
      datasetName,
      date
    };
  };

  const extractChartData = (data) => {
    const chartData = {};

    Object.entries(data).forEach(([key, subObject]) => {
      const values = Object.values(subObject);
      const hasValueGreaterThanOne = values.some(value => value > 1);

      if (hasValueGreaterThanOne) {
        chartData[key] = subObject;
      }
    });
 
    return chartData;
    
  };

  return (
    <div>
      <h2>Excel Info</h2>
      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Data Set Name</th>
              <th>Date of Upload</th>
              <th>Visualize</th>
            </tr>
          </thead>
          <tbody>
            {excelList && excelList.map((item, index) => {
              const { username, datasetName, date } = extractInfoFromFilename(item);
              return (
                <tr key={index}>
                  <td>{username}</td>
                  <td>{datasetName}</td>
                  <td>{date}</td>
                  <td>
                    <button className="list-button" onClick={() => handleItemClick(item)}>
                      Visualize
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
