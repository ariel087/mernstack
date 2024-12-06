import React, { useState } from "react";
import Navbar from "./Navbar";

const SampleNew = () => {
  const [title, setTitle] = useState(""); // Track title input
  const [content, setContent] = useState(""); // Track content input
  const [error, setError] = useState(""); // For error handling
  const [success, setSuccess] = useState(""); // For success message

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
    setError(""); // Reset any previous error message
    setSuccess(""); // Reset any previous success message

    // Basic validation for empty fields
    if (!title || !content) {
      setError("Title and Content are required.");
      return;
    }

    // Data to send to backend
    const newRecord = {
      title: title,
      content: content,
    };

    try {
<<<<<<< HEAD
      const response = await fetch("https://mernstack-vfpa.onrender.com/", {
=======
      const response = await fetch("https://mernstack-vfpa.onrender.com", {
>>>>>>> 5a8941fae6725bc385865c62060729c32c7338bb
        method: "POST", // HTTP method for creating a new record
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecord), // Send the data as a JSON string
      });

      if (response.ok) {
        setSuccess("Record added successfully!");
        setTitle(""); // Clear title field
        setContent(""); // Clear content field
      } else {
        setError("Error adding record");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error adding record");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Add Scratchpad</h2>
        {/* Display error or success message */}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form className="p-3" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter Title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="content" className="form-label">Content</label>
            <textarea
              className="form-control"
              id="content"
              placeholder="Enter Content"
              value={content}
              onChange={handleContentChange}
              rows="4"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default SampleNew;
