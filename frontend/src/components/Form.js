import React, { useState,useRef ,createRef } from 'react';
import './styles/form.css'
import Swal from "sweetalert2";
import { json } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const RegistrationForm = () => {
  const navigate = useNavigate();
  
  const formRef = createRef();
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    mobileNumber: '',
    gender: '',
    occupation: '',
    course: '',
    RollNumber: '',
    collegename: '',
   Statename: '',
    yearofgraduation: '',
    percentage: '',
    
  });
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    try {
      const response = await fetch('http://127.0.0.1:5000/save_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert formData to JSON
      });

      const data = await response.json();

      if (response.ok) {
        // Form data saved successfully
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Form data saved successfully!',
        });
     formRef.current.reset()  } else {
        // Display the error message
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message,
        });
      }
    } catch (error) {
      // Handle any network or server errors
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while saving the form data. Please try again later.',
      });
    }
  };

  const handleviewClick = (e) => {
   e.preventDefault();
    
    fetch('http://127.0.0.1:5000/formdata')
      .then((response) => response.json())
      .then((data) => {
        const chartData = extractChartData(data);
        console.log(chartData)
        navigate('/formdata',{ state: { chartData } });
      })
      .catch((error) => {
        console.log(error);
      });
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
    <div className="formcontainer">
      <header>Course Registartion</header>
      <form  ref={formRef}> 

        <div className="form first">
          <div className="details personal">
            <span className="title">Personal Details</span>
            <div className="fields">
              <div className="input-field">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  placeholder="Enter birth date"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <label>Mobile Number</label>
                <input
                  type="number"
                  name="mobileNumber"
                  placeholder="Enter mobile number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option disabled value="">
                    Select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="input-field">
                <label>Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  placeholder="Enter your occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="details ID">
            <span className="title">PG course Registartion</span>
            <div className="fields">
              <div className="input-field">
                <label>Select course</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >
                  <option disabled value="">
                    Select Course
                  </option>
                  <option value="ML">ML</option>
                  <option value="AI">AI</option>
                  <option value="CYBER">CYBER</option>
                  <option value="DS">DS</option>
                  <option value="IOT">IOT</option>
                </select>
              </div>

              <div className="input-field">
                <label>UG Roll Number</label>
                <input
                  type="number"
                  name="RollNumber"
                  placeholder="Enter roll number"
                  value={formData.RollNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <label>University/College Name</label>
                <input
                  type="text"
                  name="collegename"
                  placeholder="Enter your institute name"
                  value={formData.collegename}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <label> State of your university</label>
                <input
                  type="text"
                  name="Statename"
                  placeholder="Enter state"
                  value={formData.Statename}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <label>Year of Graduation</label>
                <input
                  type="date"
                  name="yearofgraduation"
                  placeholder="Enter your Graduation Year"
                  value={formData.yearofgraduation}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <label>UG percentage</label>
                <input
                  type="number"
                  name="percentage"
                  placeholder="Enter percentage"
                  min="0"
                  max="100"
                  step="0.01"
                  value={formData.percentage}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>
            <div className="buttons">
      <button className="nextBtn" onClick={handleSubmit}>
        <span className="btnText">Submit</span>
        <i className="uil uil-navigator"></i>
      </button>
      <button type="button" className="viewBtn" onClick={handleviewClick} >
        <span className="btnText">View</span>
        <i className="uil uil-eye"></i>
      </button>
    </div>
           
            
          </div>
         

        </div>
       
      </form>
    </div>
  );
};

export default RegistrationForm;
