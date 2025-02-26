import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideNav from "../Components/SideNav";
import UpperNav from "../Components/UpperNav";
import Footer from "../Components/Footer";
import "./AddEvents.css";

const AddEvents = () => {
  const navigate = useNavigate();
  const tenant_id = 2; // update this as needed
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageName: "",
    imageNameContents: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Save file name
      setForm((prev) => ({ ...prev, imageName: file.name }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          imageNameContents: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload per API requirements.
    const payload = {
      tenant_id: tenant_id,
      event_id: "", // leave blank for Add
      title: form.title,
      description: form.description,
      imageName: form.imageName,
      imageNameContents: form.imageNameContents
    };

    try {
      // Using the relative path to work with your proxy configuration.
      const response = await axios.post("/api/addeditevent", payload);
      if (
        response.data.details &&
        response.data.details[0] &&
        response.data.details[0].status === 1
      ) {
        alert("Event added successfully.");
        setForm({
          title: "",
          description: "",
          imageName: "",
          imageNameContents: ""
        });
        navigate("/DashEvents");
      } else {
        alert("Failed to add event. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error adding event:",
        error.response ? error.response.data : error
      );
      alert("Error adding event. Please try again.");
    }
  };

  return (
    <div className="ae-app">
      <SideNav />
      <div className="ae-main-content">
        <UpperNav />
        <h1 className="ae-form-title-top">Add Event</h1>
        <div className="ae-contbox">
          <form onSubmit={handleSubmit}>
            <div className="ae-row">
              <div className="ae-col-md-12">
                <label className="ae-labelStyle">
                  Event Name<span className="ae-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="ae-row">
              <div className="ae-col-md-12">
                <label className="ae-labelStyle">
                  Event Description<span className="ae-asterisk">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
            <div className="ae-row">
              <div className="ae-col-md-12">
                <label className="ae-labelStyle">
                  Add Event Image<span className="ae-asterisk">*</span>
                </label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>
            <div className="ae-row ae-btn-row">
              <button className="ae-sbmt" type="submit">
                Add Event
              </button>
              <button
                type="button"
                className="ae-back-btn"
                onClick={() => navigate("/DashEvents")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AddEvents;
