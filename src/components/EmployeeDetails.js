import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "@mui/material";
import backgroundImage from "../Assets/Employee_Details_bg.jpg";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`)
      .then((response) => setEmployee(response.data))
      .catch((error) => console.error("Error fetching employee:", error));
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  return (
    <>
      <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}>
        Employee Details
      </h2>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          //   border: "1px solid black",
          marginTop: "3%",
          fontSize: "20px",
        }}
      >
        <h2>Name: {employee.name}</h2>
        <p>Email: {employee.email}</p>
        <p>Mobile: {employee.mobile}</p>
        <p>Country: {employee.country}</p>
        <p>State: {employee.state}</p>
        <p>District: {employee.district}</p>
        <Button
          style={{
            width: "200px",
            height: "50px",
            color: "white",
            backgroundColor: "black",
            fontSize: "25px",
            fontWeight: "bold",
          }}
          onClick={() => navigate(`/edit/${employee.id}`)}
        >
          Edit
        </Button>
      </div>
    </>
  );
};

export default EmployeeDetails;
