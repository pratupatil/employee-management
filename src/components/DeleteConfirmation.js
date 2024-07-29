import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "@mui/material";

const DeleteConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    axios
      .delete(
        `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`
      )
      .then(() => navigate("/"))
      .catch((error) => console.error("Error deleting employee:", error));
  };

  return (
    <Container>
      <h2>Are you sure you want to delete this employee?</h2>
      <Button onClick={handleDelete}>Yes</Button>
      <Button onClick={() => navigate("/")}>No</Button>
    </Container>
  );
};

export default DeleteConfirmation;
