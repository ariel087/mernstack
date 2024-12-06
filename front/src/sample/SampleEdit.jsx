import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Import Bootstrap JS (includes Popper.js)
import Navbar from "./Navbar";

const SampleEdit = () => {
  const [title, setTitle] = useState(""); // Track title input
  const [content, setContent] = useState(""); // Track content input
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // For programmatic navigation

  // Fetch the existing record to edit (replace with actual fetching logic)
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await fetch(`https://mernstack-vfpa.onrender.com/record/${id}`);
        const record = await response.json();

        if (response.ok) {
          setTitle(record.title); // Set existing title to state
          setContent(record.content); // Set existing content to state
        } else {
          alert("Record not found");
        }
      } catch (error) {
        console.error("Error fetching record:", error);
        alert("Error fetching record");
      }
    };

    if (id) {
      fetchRecord();
    }
  }, [id]); // Fetch when the component mounts or the id changes

  // Handle form input change for Title
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle form input change for Content
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Data to send to backend for updating the record
    const updatedRecord = {
      title: title,
      content: content,
    };

    try {
      const response = await fetch(`https://mernstack-vfpa.onrender.com/record/${id}`, {
        method: "PUT", // HTTP method for updating the record
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecord), // Send the updated data as JSON string
      });

      if (response) {
        alert("Record updated successfully!");
        navigate("/sample");  // Redirect to Home page after successful update
      } else {
        alert("Error updating record");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating record");
    }
  };

  return (
    <>
  <Navbar/>

      {/* Edit Form */}
      <div className="container mt-5">
        <h2>Edit Scratchpad</h2>
        <form className="p-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Title"
              value={title} // This is controlled by state
              onChange={handleTitleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              className="form-control"
              placeholder="Enter Content"
              value={content} // This is controlled by state
              onChange={handleContentChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Update
          </button>
        </form>

        {/* Home Button - Redirect to Home */}
        <div className="mt-3">
       
        </div>
      </div>
    </>
  );
};

export default SampleEdit;
