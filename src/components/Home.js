import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  };

  const handleSearch = () => {
    if (searchId) {
      axios
        .get(
          `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${searchId}`
        )
        .then((response) => setEmployees([response.data]))
        .catch((error) => console.error("Error searching employee:", error));
    } else {
      fetchEmployees();
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        margin: "3%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <TextField
          label="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ width: "40%" }}
        />
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={() => navigate("/add")}>Add Employee</Button>
      </div>
      <TableContainer component={Paper}>
        <Table style={{ border: "1px solid black" }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>
                Id
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>
                Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>
                Email
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>
                Mobile
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>
                Country
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>
                State
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>
                District
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  textAlign: "center",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.mobile}</TableCell>
                  <TableCell>{employee.country}</TableCell>
                  <TableCell>{employee.state}</TableCell>
                  <TableCell>{employee.district}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => navigate(`/employee/${employee.id}`)}
                    >
                      View
                    </Button>
                    <Button onClick={() => navigate(`/edit/${employee.id}`)}>
                      Edit
                    </Button>
                    <Button onClick={() => navigate(`/delete/${employee.id}`)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default Home;
