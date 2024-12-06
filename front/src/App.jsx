import { BrowserRouter as Router, Routes,Route } from "react-router-dom"
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import SampleList from "./sample/SampleList";
import SampleNew from "./sample/SampleNew";
import SampleEdit from "./sample/SampleEdit";
import SampleView from "./sample/SampleView";
import "./App.css"
function App() {

  return (
    <Router>
      <Routes>
      <Route path="/sample" element={<SampleList />} />
      <Route path="/sample/:id" element={<SampleView />} />
      <Route path="/sample/new" element={<SampleNew />} />
      <Route path="/sample/edit/:id" element={<SampleEdit />} />
      </Routes>
    </Router>
  );
}

export default App
