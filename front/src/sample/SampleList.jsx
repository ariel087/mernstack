import React, { useEffect, useState } from "react";
import { getAll } from "../api/api"; // Import getAll from api.js
import { Link, useNavigate } from "react-router-dom";

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
        `https://mernstack-wsna.onrender.com/records/${selectedId}`,
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
      {/* Modal */}
      <div className="modal" id="exampleModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm</h5>
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
              <p>Are you sure you want to delete this item?</p>
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

      {/* Table */}
      <table className="table">
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
                <Link to={`/sample/${data._id}`}>{data.title}</Link>
              </td>
              <td>{data.content}</td>
              <td>
                <button
                  className="btn btn-primary" onClick={() => handleEditClick(data._id)}>
                  Edit
                </button>{" "}
                <button
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  // Set the selected ID for deletion
                  onClick={() => setSelectedId(data._id)} // Fix: Use an anonymous function here
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SampleList;
