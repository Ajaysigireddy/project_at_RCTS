import React, { useState, useRef } from "react";
import "./styles/upload.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Upload = () => {
    const navigate=useNavigate()
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleViewAll=()=>{
          navigate('/view_all_excels')
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    if (!name || !file) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all the fields.",
      });
      return;
    }

    formRef.current.reset();
    setName(null);
    setFile(null);

    // Create a FormData object
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    // Show loading alert
    Swal.fire({
      title: "Saving Data",
      text: "Please wait while the data is being saved...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
        setLoading(true);
      },
    });

    // Make an API call to upload the file
    fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: data.message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: data.message,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="form-container">
        <div className="form-container__details">
          <div className="form-container__title">Upload Excel</div>
        </div>
        <form className="form" ref={formRef} onSubmit={handleSubmit}>
          <div className="form__field">
            <div className="form__label">Name</div>
            <input
              className="form__input"
              onChange={handleNameChange}
              value={name || ""}
            />
          </div>
          <div className="form__field">
            <div className="form__label">Choose file</div>
            <input
              className="form__input"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <button className="form__submit">Upload</button>
          
        </form>
        <button className="form__viewall" onClick={handleViewAll}>View All</button>
      </div>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      
    </div>
  );
};

export default Upload;
