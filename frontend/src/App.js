

import { PieChart } from 'recharts';
import { BrowserRouter, Form, Route , Router, Routes } from 'react-router-dom'
import Home from './components/Home';
import Upload from './components/Upload';
import List from './components/List';
import PieChartPage from './components/piechart2';
import PieChartComponent from './components/Piechart';
import CourseEnrollmentForm from './components/CourseEnrollment';
import RegistrationForm from './components/Form';
import './App.css'
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="appjscontainer">
    <div className='Navbar'>
    <Navbar/>
    </div>
    <div className='components.container'>
    <BrowserRouter>
    <Routes>
    <Route path="/" exact element={<Home/>}></Route>
    <Route path="/enrollment" exact element={<RegistrationForm/>}></Route>
    <Route path="/excelupload" exact element={<Upload/>}></Route>
    <Route path="/view_all_excels" exact element={<List/>}></Route>
    <Route path="/excel/:itemName" exact element={<PieChartComponent/>}></Route>
    <Route path="/formdata" exact element={<PieChartComponent/>}></Route>
  

    </Routes>
    </BrowserRouter> 
     </div></div>
    
  );
}

export default App;
