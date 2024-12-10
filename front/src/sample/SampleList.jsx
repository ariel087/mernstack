import React, { useEffect, useState } from "react";
import { getAll } from "../api/api"; // Import getAll from api.js
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const SampleList = () => {
  const [scratchpad, setScratchPad] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // Store selected ID for deletion
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAll(); // Call API
        setScratchPad(result); // Set state with API data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [scratchpad]);

  const handleDelete = async () => {
    if (!selectedId) return; // If no ID is selected, exit

    try {
      const response = await fetch(
        `https://mernstack-vfpa.onrender.com/records/${selectedId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Successfully deleted the record
        alert("Record deleted successfully");
        // Optionally, remove the deleted record from the UI
        setScratchPad(scratchpad.filter((record) => record._id !== selectedId));
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error deleting record");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Error deleting record");
    }
  };

  const handleEditClick = (id) => {
    if (!id) return; // If no ID is provided, exit

    // Use navigate to go to the edit page with the record ID
    navigate(`/sample/edit/${id}`);
  };

  return (
    <>
      <Navbar />

      {/* Modal for Delete Confirmation */}
      <div className="modal" id="exampleModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this Scratch Pad?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table for displaying Scratchpads */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Scratchpad List</h2>
        <span className="text-center mb-4">April Roxas - BSIT - 3B</span>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {scratchpad.map((data, index) => (
                <tr key={index}>
                  <td>
                    <Link
                      to={`/sample/${data._id}`}
                      className="text-decoration-none text-primary"
                    >
                      {data.title}
                    </Link>
                  </td>
                  <td>{data.content}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm mx-1"
                      onClick={() => handleEditClick(data._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => setSelectedId(data._id)} // Set the selected ID for deletion
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SampleList;
