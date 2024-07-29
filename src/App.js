import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import EmployeeDetails from "./components/EmployeeDetails";
import AddEditEmployee from "./components/AddEditEmployee";
import DeleteConfirmation from "./components/DeleteConfirmation";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="/add" element={<AddEditEmployee />} />
        <Route path="/edit/:id" element={<AddEditEmployee />} />
        <Route path="/delete/:id" element={<DeleteConfirmation />} />
      </Routes>
    </Router>
  );
};

export default App;
