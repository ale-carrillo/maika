'use client';
import {
  Box,
  Container,
  IconButton,
  Paper,
  Chip,
  Avatar,
  Typography,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { initialRows } from "../constants/employee/constants"; 
import EmpDialog from "../components/emp-dialog";
import Alerts from "../components/alerts";

export default function EmployeeTable() {
  const [tabIndex, setTabIndex] = useState(0);
  const [action, setAction] = useState("");
  const [employee, setEmp] = useState({
    id: null,
    name: "",
    title: "",
    email: "",
    salary: "",
    birthdate: "",
    status: "Active",
    avatar: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [rows, setRows] = useState(initialRows);
  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
  });

  const handleEmp = ({ action, employee }) => {
    try {
      setAction(action);
      setOpenDialog(true);
      setEmp(action === "add" ? { ...employee, id: null } : employee);
    } catch (error) {
      setAlert({
        message: "Failed to open employee dialog",
        severity: "error",
      });
      setOpenAlert(true);
    }
  };

  const handleDelete = (id) => {
    try {
      setRows(rows.filter((row) => row.id !== id));
      setAlert({
        message: "Employee deleted successfully",
        severity: "success",
      });
    } catch (error) {
      setAlert({
        message: "Failed to delete employee",
        severity: "error",
      });
    }
    setOpenAlert(true);
  };

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          <Avatar alt={params.value} src={params.row.avatar} sx={{ width: 30, height: 30, mr: 1, mt: 0.5 }} />
          <Typography fontWeight="bold">{params.value}</Typography>
        </Box>
      ),
    },
    { field: "title", headerName: "Title", flex: 2 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "salary", headerName: "Salary", flex: 1 },
    { field: "birthdate", headerName: "Birthday", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Active" ? "success" : "error"}
          sx={{ color: "#FFF", fontWeight: "bold" }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <Box>
          <IconButton color="primary" onClick={() => handleEmp({ action: "edit", employee: params.row })}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon sx={{ color: "#F44336" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="lg" disableGutters>
      <Typography variant="h3" textAlign="center" sx={{ mt: 1, mb: 3 }}>
        Employee Management
      </Typography>

      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Table View" />
        <Tab label="Card View" />
      </Tabs>

      {tabIndex === 0 && (
        <Paper sx={{ padding: 2, borderRadius: 2, mt: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => handleEmp({ action: "add" })}
            >
              Add Employee
            </Button>
          </Box>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSizeOptions={[5, 10]}
            disableColumnMenu
            autoHeight
            sx={{
              "& .MuiDataGrid-columnHeaders": { backgroundColor: "#333", color: "#000", fontWeight: "bold" },
              "& .MuiDataGrid-row:hover": { backgroundColor: "#f5f5f5" },
            }}
          />
        </Paper>
      )}

      {tabIndex === 1 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3 }}>
          {rows.map((emp) => (
            <Card key={emp.id} sx={{ width: 250, padding: 2 }}>
              <CardContent>
                <Avatar src={emp.avatar} sx={{ width: 50, height: 50, mb: 2 }} />
                <Typography variant="h6">{emp.name}</Typography>
                <Typography variant="body2" color="textSecondary">Title: {emp.title}</Typography>
                <Typography variant="body2" color="textSecondary">Email: {emp.email}</Typography>
                <Typography variant="body2" color="textSecondary">Salary: ${emp.salary}</Typography>
                <Typography variant="body2" color="textSecondary">Birthday: {emp.birthdate}</Typography>
                <Chip label={emp.status} color={emp.status === "Active" ? "success" : "error"} />
              </CardContent>
              <CardActions>
                <IconButton color="primary" onClick={() => handleEmp({ action: "edit", employee: emp })}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(emp.id)}>
                  <DeleteIcon sx={{ color: "#F44336" }} />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

      <EmpDialog
        open={openDialog}
        setOPen={setOpenDialog}
        emp={employee}
        setemp={setEmp}
        action={action}
        rows={rows}
        setRows={setRows}
        setAlert={setAlert}
        setOpenAlert={setOpenAlert}
      />
      <Alerts open={openAlert} setOPen={setOpenAlert} alert={alert} setAlert={setAlert} />
    </Container>
  );
}
