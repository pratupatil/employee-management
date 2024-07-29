import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[aA-zZ\s]+$/, "Name should contain only letters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  district: yup.string().required("District is required"),
});

const AddEditEmployee = () => {
  const { id } = useParams();
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const isEdit = !!id;

  // Initialize form handling with validation
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // Fetch countries
    axios
      .get("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.error("Error fetching countries:", error));

    // Fetch employee data if in edit mode
    if (isEdit) {
      axios
        .get(
          `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`
        )
        .then((response) => {
          const { name, email, mobile, country, state, district } =
            response.data;
          console.log("Fetched employee data:", response.data); // Debugging line
          reset({
            name,
            email,
            mobile,
            country,
            state,
            district,
          });
        })
        .catch((error) => console.error("Error fetching employee:", error));
    }
  }, [id, isEdit, reset]);

  const onSubmit = (data) => {
    if (isEdit) {
      axios
        .put(
          `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`,
          data
        )
        .then(() => navigate("/"))
        .catch((error) => console.error("Error updating employee:", error));
    } else {
      axios
        .post(
          "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee",
          data
        )
        .then(() => navigate("/"))
        .catch((error) => console.error("Error creating employee:", error));
    }
  };

  return (
    <Container>
      <h2>{isEdit ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Employee Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Mobile"
                  fullWidth
                  error={!!errors.mobile}
                  helperText={errors.mobile ? errors.mobile.message : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.country}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Country"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.id} value={country.country}>
                        {country.country}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.country && (
                <p style={{ color: "red" }}>{errors.country.message}</p>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="State"
                  fullWidth
                  error={!!errors.state}
                  helperText={errors.state ? errors.state.message : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="district"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="District"
                  fullWidth
                  error={!!errors.district}
                  helperText={errors.district ? errors.district.message : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isEdit ? "Update" : "Create"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddEditEmployee;
