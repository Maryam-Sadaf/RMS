import React, { useState, useEffect } from "react";
import { SC } from "../../../src/services/serverCall";
import "./Popup.css";

const Popup = ({ onClose, todo }) => {
  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    slag: "",
    apkLink: "",
    iosLink: "",
    bgColor: "",
    description: "",
  });

  // Effect to load todo data for editing
  useEffect(() => {
    if (todo) {
      console.log("Todo prop:", todo); // Check if todo is passed correctly
      setFormData({
        name: todo.name || "",
        icon: todo.icon || "",
        slag: todo.slag || "",
        apkLink: todo.apkLink || "",
        iosLink: todo.iosLink || "",
        bgColor: todo.bgColor || "",
        description: todo.description || "",
      });
    }
  }, [todo]);
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (POST or PUT depending on edit or create)
  const handleSubmit = async () => {
    if (!todo?.id) {
      console.log("No ID found for todo, creating a new one...");
      // POST request for new todo
      const response = await SC.postCall("/todos", formData);
      if (response.status === 200) {
        console.log("Todo created successfully");
        onClose();
      }
    } else {
      console.log(`Updating todo with ID: ${todo.id}`);
      // PUT request to update the existing todo
      const response = await SC.putCall(`/todos/${todo.id}`, formData);
      if (response.status === 200) {
        console.log("Todo updated successfully");
        onClose();
      }
    }
  };

  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <button className="closeButton" onClick={onClose}>
          X
        </button>
        <h2>{todo ? "Edit Todo" : "Create Todo"}</h2>
        <div className="formFlex">
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Icon</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Slag</label>
            <input
              type="text"
              name="slag"
              value={formData.slag}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>APK Link</label>
            <input
              type="text"
              name="apkLink"
              value={formData.apkLink}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>IOS Link</label>
            <input
              type="text"
              name="iosLink"
              value={formData.iosLink}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Background Color</label>
            <input
              type="text"
              name="bgColor"
              value={formData.bgColor}
              onChange={handleChange}
            />
          </div>
          <div className="field fullWidth">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <button className="createbutton fullWidth" onClick={handleSubmit}>
            {todo ? "Update Todo" : "Create Todo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
