import React, { useState } from 'react';
import './styles/couse.css';

const CourseEnrollmentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [ugCourses, setUGCourses] = useState([]);
  const [ugMarks, setUGMarks] = useState('');
  const [pgCourses, setPGCourses] = useState([]);
  const [ugAcademicYear, setUGAcademicYear] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'phoneNumber') {
      setPhoneNumber(value);
    } else if (name === 'gender') {
      setGender(value);
    } else if (name === 'ugCourses') {
      setUGCourses(Array.from(event.target.selectedOptions, (option) => option.value));
    } else if (name === 'ugMarks') {
      setUGMarks(value);
    } else if (name === 'pgCourses') {
      setPGCourses(Array.from(event.target.selectedOptions, (option) => option.value));
    } else if (name === 'ugAcademicYear') {
      setUGAcademicYear(value);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
    console.log('Gender:', gender);
    console.log('Selected Option:', selectedOption);
    console.log('UG Courses:', ugCourses);
    console.log('UG Marks:', ugMarks);
    console.log('PG Courses:', pgCourses);
    console.log('UG Academic Year:', ugAcademicYear);
  };

  return (
    <div className="container">
      <div className="title">Course Enrollment for PG and UG</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Full Name</span>
              <input type="text" name="name" placeholder="Enter your name" value={name} onChange={handleInputChange} required />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input type="email" name="email" placeholder="Enter your email" value={email} onChange={handleInputChange} required />
            </div>
            <div className="input-box">
              <span className="details">Phone Number</span>
              <input type="tel" name="phoneNumber" placeholder="Enter your number" value={phoneNumber} onChange={handleInputChange} required />
            </div>
            <div className="gender-details">
              <span className="details">Gender</span>
              <div className="category">
                <label>
                  <input type="radio" name="gender" value="Male" checked={gender === 'Male'} onChange={handleInputChange} />
                  <span className="gender">Male</span>
                </label>
                <label>
                  <input type="radio" name="gender" value="Female" checked={gender === 'Female'} onChange={handleInputChange} />
                  <span className="gender">Female</span>
                </label>
                <label>
                  <input type="radio" name="gender" value="Other" checked={gender === 'Other'} onChange={handleInputChange} />
                  <span className="gender">Prefer not to say</span>
                </label>
              </div>
            </div>
          </div>

          <div className="option">
            <label>
              <input type="radio" name="option" value="UG" checked={selectedOption === 'UG'} onChange={handleOptionChange} />
              <span className="option-label">UG</span>
            </label>
            <label>
              <input type="radio" name="option" value="PG" checked={selectedOption === 'PG'} onChange={handleOptionChange} />
              <span className="option-label">PG</span>
            </label>
          </div>

          {selectedOption === 'UG' && (
            <div className="ug-form">
              <h3>UG Form</h3>
              <div className="input-box">
                <span className="details">UG Courses</span>
                <select name="ugCourses" multiple value={ugCourses} onChange={handleInputChange}>
                  <option value="AI">AI</option>
                  <option value="ML">ML</option>
                  <option value="Cyber">Cyber</option>
                  <option value="DataScience">Data Science</option>
                </select>
              </div>
              <div className="input-box">
                <span className="details">UG Marks</span>
                <input type="text" name="ugMarks" placeholder="Enter your UG marks" value={ugMarks} onChange={handleInputChange} />
              </div>
            </div>
          )}

          {selectedOption === 'PG' && (
            <div className="pg-form">
              <h3>PG Form</h3>
              <div className="input-box">
                <span className="details">PG Courses</span>
                <select name="pgCourses" multiple value={pgCourses} onChange={handleInputChange}>
                  <option value="Statistics">Statistics</option>
                  <option value="Cyber">Cyber</option>
                  <option value="Blockchain">Blockchain</option>
                </select>
              </div>
              <div className="input-box">
                <span className="details">UG Academic Year</span>
                <input type="text" name="ugAcademicYear" placeholder="Enter your UG academic year" value={ugAcademicYear} onChange={handleInputChange} />
              </div>
            </div>
          )}

          <div className="button">
            <input type="submit" value="Enroll" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseEnrollmentForm;
