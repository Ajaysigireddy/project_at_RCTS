import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Pie } from "react-chartjs-2";

const PieChartPage = () => {
  const location = useLocation();
  const { itemName } = useParams();
  const data = location.state.data;

  return (
    <div>
      <h1>{itemName}</h1>
      {data && (
        <div className="pie-chart-container">
          <Pie data={data} />
        </div>
      )}
    </div>
  );
};

export default PieChartPage;
