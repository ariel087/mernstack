import React, { useState } from "react";

const SampleNew = () => {
  const [title, setTitle] = useState(""); // Track title input
  const [content, setContent] = useState(""); // Track content input

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

    // Data to send to backend
    const newRecord = {
      title: title,
      content: content,
    };

    try {
      const response = await fetch("https://mernstack-vfpa.onrender.com", {
        method: "POST", // HTTP method for creating a new record
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecord), // Send the data as a JSON string
      });

      if (response.ok) {
        alert("Record added successfully!");
        setTitle(""); // Clear title field
        setContent(""); // Clear content field
      } else {
        alert("Error adding record");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding record");
    }
  };

  return (
    <>
      <h2>Add Scratchpad</h2>
      <form className="p-3" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Content</label>
          <textarea
            className="form-control"
            placeholder="Enter Content"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default SampleNew;
