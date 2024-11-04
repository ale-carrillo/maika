"use client";
import {
    Box,
    Container,
    IconButton,
    Paper,
    Chip,
    Avatar,
    Typography,
    Button,
  } from "@mui/material";
  import { DataGrid } from "@mui/x-data-grid";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { useState } from "react";
  import { initialRows } from "../constants/employee/constants"; 
  import EmpDialog from "../components/emp-dialog";
  import Alerts from "../components/alerts";
  import AddIcon from "@mui/icons-material/Add";

  
  export default function EmployeeTable() {
    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
      {
        field: "name",
        headerName: "Name",
        flex: 2,
        color: "#000",
        renderCell: (params) => (
          <Box display="flex" alignItems="center">
            <Avatar
              alt={params.value}
              src={params.row.avatar} // Usa el campo avatar para mostrar la imagen
              sx={{ width: 30, height: 30, mr: 1, mt: 0.5 }}
            />
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
            sx={{
              color: "#FFF",
              fontWeight: "bold",
              backgroundColor: params.value === "Active" ? "#4CAF50" : "#F44336",
            }}
          />
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        renderCell: (params) => (
          <Box>
            <IconButton
              color="primary"
              onClick={() => handleEmp({ action: "edit", employee: params.row })}
              sx={{ color: "#4CAF50" }}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon sx={{ color: "#F44336" }} />
            </IconButton>
          </Box>
        ),
      },
    ];

    const [action, setAction] = useState("");
    const [emp, setEmp] = useState({
        id: null,
        name: "",
        title: "",
        email: "",
        salary: "",
        birthdate: "",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    });
  
    const [rows, setRows] = useState(initialRows);

    const handleEmp = ({ action, employee }) => {
        //Funcion anonima
        console.info("handle book action", action);
        setAction(action);
        setOpenDialog(true);
        if (action == "add") {
          console.info("Preparing to add a new book");
    
          setEmp({
            id: null,
            name: "",
            title: "",
            email: "",
            salary: "",
            birthdate: "",
            status: "Active",
            avatar: "https://randomuser.me/api/portraits/women/3.jpg"
          });
        } else if (action == "edit") {
          console.info("book details", employee);
          console.info("Preparing to edit a new book");
    
          setEmp(employee);
        } else {
          console.warn("Unknown action", action);
        }
      };
    
  
    
  
    const handleDelete = (id) => {
      setRows(rows.filter((row) => row.id !== id));
    };
  
    return (
      <Container maxWidth="md" disableGutters>
          <Typography variant="h3" textAlign='center' sx={{mt:1, mb:3}}>
                Employee Managment 
            </Typography>
        <Paper
          sx={{
            padding: 2,
            borderRadius: 2,
            maxWidth: "100%",
            margin: "0 auto",
            height: "auto",
            overflow: "hidden",
          }}
        >
          
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ borderRadius: 3 }}
          onClick={() => handleEmp({ action: "add" })}
        >
          Add Book
        </Button>
      </Box>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSizeOptions={[5, 10]}
            disableColumnMenu
            autoHeight
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#333",
                color: "#000",
                fontWeight: "bold",
                fontSize: "1rem",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #DDD",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#F1F1F1",
              },
              "& .MuiDataGrid-row": {
                "&:hover": {
                  backgroundColor: "#F5F5F5",
                },
              },
            }}
          />
        </Paper>
      </Container>
    );
  }
  
/*

"use client";


export default function Home() {
  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "title", headerName: "Title", flex: 2 },
    { field: "author", headerName: "Author", flex: 1 },

    { field: "year", headerName: "Year", flex: 1 },

    { field: "edition", headerName: "Edition", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="primary"
            onClick={() => handleBook({ action: "edit", book: params.row })}
          >
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon
              color="secondary"
              onClick={() => deleteBook(params.row.id)}
            />
          </IconButton>
        </Box>
      ),
    },
  ];

  

  const [openDialog, setOpenDialog] = useState(false);
  const [rows, setRows] = useState(initialRows);
  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState({
    mesagge: "",
    severity: "",
  });

  const handleBook = ({ action, book }) => {
    //Funcion anonima
    console.info("handle book action", action);
    setAction(action);
    setOpenDialog(true);
    if (action == "add") {
      console.info("Preparing to add a new book");

      setBook({
        id: null,
        title: "",
        author: "",
        year: "",
        edition: "",
      });
    } else if (action == "edit") {
      console.info("book details", book);
      console.info("Preparing to edit a new book");

      setBook(book);
    } else {
      console.warn("Unknown action", action);
    }
  };

  const deleteBook = (id) => {
    setRows(rows.filter((row) => row.id !== id));
    setAlert({
      message: "Book deleted succesfully",
      severity: "success",
    });
    setOpenAlert(true);
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ borderRadius: 3 }}
          onClick={() => handleBook({ action: "add" })}
        >
          Add Book
        </Button>
      </Box>
      <Paper
        sx={{
          padding: 2,
          borderRadius: 2,
          maxWidth: "80%",
          margin: "0 auto",
          height: "400px",
        }}
      >
        <DataGrid
          columns={columns}
          rows={rows}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{
            border: "1px solid #ddd",
            backgroundColor: "F9F9F9",
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "2px solid #DDD",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#F5F5F5",
            },
            "& .MuiDataGrid-cell": {
              borderRight: "1 px solid #DDD",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#F1F1F1",
            },
          }}
        />
      </Paper>
      <BookDialog
        open={openDialog}
        setOPen={setOpenDialog}
        book={book}
        setBook={setBook}
        action={action}
        rows={rows}
        setRows={setRows}
        setAlert={setAlert}
        setOpenAlert={setOpenAlert}
      />

      <Alerts
        open={openAlert}
        setOPen={setOpenAlert}
        alert={alert}
        setAlert={setAlert}
      />
    </Container>
  );
}

*/