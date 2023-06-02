import React from "react";
import './styles/home.css';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    const navigateToExcelForm = () => {
        // Redirect to form.js or the desired destination
        navigate("/excelupload");
      };
      const navigateToForm = () => {
        // Redirect to form.js or the desired destination
        navigate("/enrollment");
      };
    return (
      <div>
        <title>Button and Heading Example</title>
        <link rel="stylesheet" type="text/css" href="main.css" />
        <h1 className="center-top">Visualize Everything</h1>
        <div className="button-container">
          <button className="button" onClick={navigateToForm}>Visualize Form</button>
          <button className="button" onClick={navigateToExcelForm}>Visualize Excel</button>
        </div>
      </div>
    );
  }

  export default Home;