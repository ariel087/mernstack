import React from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";

const Navbar = () => {
  return (
<>
      {/* Navbar - Mobile Responsive */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/sample">MyApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/sample">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sample/new">Add New Scratch Pad</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
</>
)
}

export default Navbar