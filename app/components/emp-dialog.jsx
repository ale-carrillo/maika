// Importing necessary Material UI components and hooks
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";

// Defining the EmpDialog component, which receives props for managing employee data and dialog visibility
export default function EmpDialog({
  open, // Controls whether the dialog is open or closed
  setOpen, // Function to set the open state of the dialog
  emp, // Current employee data object
  setemp, // Function to update the employee data object
  action, // Action type, either "add" or "edit" to determine the dialog purpose
  rows, // Array of all employee records
  setRows, // Function to update the rows array
  setAlert, // Function to configure alert messages
  setOpenAlert, // Function to control the visibility of the alert
}) {
  // State to manage avatar image preview
  const [previewAvatar, setPreviewAvatar] = useState(emp.avatar || "");

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpen(false); // Closes the dialog
    setPreviewAvatar(emp.avatar || ""); // Resets the avatar preview to the current employee's avatar
  };

  // Function to save or update employee data
  const saveEmp = () => {
    if (action === "add") {
      // If action is "add", set a new ID and add the employee to the rows array
      emp.id = rows.length + 1;
      setRows([...rows, emp]);
      setAlert({
        message: "Employee added successfully", // Success message
        severity: "success",
      });
      setOpenAlert(true); // Shows the alert
    } else if (action === "edit") {
      // If action is "edit", find and update the existing employee
      setRows(rows.map((row) => (row.id === emp.id ? emp : row)));
      setAlert({
        message: "Employee edited successfully", // Success message
        severity: "success",
      });
      setOpenAlert(true); // Shows the alert
    }
    handleCloseDialog(); // Close the dialog after saving
  };

  // Function to handle form field changes
  const handleChange = (event) => {
    setemp({
      ...emp, // Keeps the current employee data
      [event.target.name]: event.target.value, // Updates the specific field with the new value
    });
  };

  // Function to handle avatar image file changes
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result); // Sets the preview image
        setemp({
          ...emp,
          avatar: reader.result, // Updates the avatar in the employee data
        });
      };
      reader.readAsDataURL(file); // Reads the file as a data URL
    }
  };

  return (
    // Dialog component for adding/editing employee details
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>{action === "add" ? "Add Employee" : "Edit Employee"}</DialogTitle>
      <DialogContent>
        {/* Text fields for employee details */}
        <TextField
          margin="dense"
          name="name"
          label="Name"
          fullWidth
          value={emp.name || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="title"
          label="Title"
          fullWidth
          value={emp.title || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          fullWidth
          value={emp.email || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="salary"
          label="Salary"
          fullWidth
          value={emp.salary || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="birthdate"
          label="Birthdate"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={emp.birthdate || ""}
          onChange={handleChange}
        />

        {/* Radio buttons for employee status */}
        <RadioGroup
          name="status"
          value={emp.status || ""}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value="Active"
            control={<Radio />}
            label="Active"
          />
          <FormControlLabel
            value="Inactive"
            control={<Radio />}
            label="Inactive"
          />
        </RadioGroup>

        {/* Button to upload avatar image */}
        <Button variant="outlined" component="label" sx={{ mt: 2 }}>
          Upload Avatar
          <input type="file" hidden accept="image/*" onChange={handleFileChange} />
        </Button>
        {/* Displaying the preview of the uploaded avatar */}
        {previewAvatar && (
          <img
            src={previewAvatar}
            alt="Avatar Preview"
            style={{ width: "80px", height: "80px", borderRadius: "50%", marginTop: "10px" }}
          />
        )}
      </DialogContent>
      <DialogActions>
        {/* Cancel button to close the dialog without saving */}
        <Button color="secondary" onClick={handleCloseDialog}>
          Cancel
        </Button>
        {/* Save button to add or edit employee data */}
        <Button color="primary" onClick={saveEmp}>
          {action === "add" ? "Add" : "Edit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

