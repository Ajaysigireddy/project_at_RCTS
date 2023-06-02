import React from 'react';
import './styles/Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
      DataChartExcel
      </div>
      
      <ul>
        <li><a className="active" href="/">Home</a></li>
        <li><a href="#">About</a></li>
       
      </ul>
    </nav>
  );
};

export default Navbar;
