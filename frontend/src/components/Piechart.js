import React, { useRef } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, LabelList } from 'recharts';
import { useLocation, useParams } from 'react-router-dom';
import './styles/piechart.css';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PieChartComponent = () => {
  const location = useLocation();
  const { itemName } = useParams();
  const chartData = location.state.chartData;
  console.log(chartData);

  const chartContainerRefs = useRef([]);

  const handleDownload = () => {
    // Create a new PDF document
    const pdf = new jsPDF();

    chartContainerRefs.current.forEach((chartContainerRef, index) => {
      const key = Object.keys(chartData)[index];
      const value = Object.values(chartData)[index];

      const pieChartData = Object.entries(value).map(([subKey, subValue]) => ({
        name: subKey,
        value: subValue,
      }));

      // Generate a color scale using the schemeCategory10 color scheme
      const colorScale = scaleOrdinal(schemeCategory10).domain(pieChartData.map((entry) => entry.name));
      const COLORS = pieChartData.map((entry) => colorScale(entry.name));

      // Capture the chart container as an image using html2canvas
      html2canvas(chartContainerRef).then((canvas) => {
        const chartImage = canvas.toDataURL('image/png');

        // Calculate the dimensions of the PDF page based on the chart container size
        const chartWidth = chartContainerRef.offsetWidth;
        const chartHeight = chartContainerRef.offsetHeight;
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (chartHeight / chartWidth) * pdfWidth;

        // Add the chart image to the PDF
        pdf.addPage();
        pdf.addImage(chartImage, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);

        // Add chart title as PDF text
        pdf.text(10, pdfHeight + 30, key);

        // Save the PDF file after adding all the pie charts
        if (index === chartContainerRefs.current.length - 1) {
          pdf.save('charts.pdf');
        }
      });
    });
  };

  const renderCharts = () => {
    if (!chartData) {
      return <p>Loading data...</p>;
    }

    return Object.entries(chartData).map(([key, value], index) => {
      const pieChartData = Object.entries(value).map(([subKey, subValue]) => ({
        name: subKey,
        value: subValue,
      }));

      // Generate a color scale using the schemeCategory10 color scheme
      const colorScale = scaleOrdinal(schemeCategory10).domain(pieChartData.map((entry) => entry.name));
      const COLORS = pieChartData.map((entry) => colorScale(entry.name));

      // Prepare data for the bar graph
      const barChartData = pieChartData.map((entry) => ({
        name: entry.name,
        value: entry.value,
      }));

      return (
        <div key={key} className="chart-container" ref={(ref) => (chartContainerRefs.current[index] = ref)}>
          <h2>{key}</h2> {/* Display the object name as the chart title */}
          <PieChart width={400} height={300}>
            <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
              <LabelList dataKey="value" position="inside" />
            </Pie>
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              wrapperStyle={{ overflow: 'auto', maxHeight: 300 }}
              payload={pieChartData.map((entry, index) => ({
                value: entry.name,
                type: 'circle',
                color: COLORS[index],
              }))}
            />
            <Tooltip />
          </PieChart>

          <BarChart width={400} height={300} data={barChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value">
              {barChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
              <LabelList dataKey="value" position="top" />
            </Bar>
            <Tooltip />
          </BarChart>
        </div>
      );
    });
  };

  return (
    <div className="total_box">
      {renderCharts()}
      <button className="button-download" onClick={handleDownload}>
        Download PDF
      </button>
    </div>
  );
};

export default PieChartComponent;
