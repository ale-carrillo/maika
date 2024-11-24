"use client";
import * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { initialRows } from "../constants/menu/constants";
import Alerts from "../components/alerts";
import { Container, Typography, Paper , Box, useTheme, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import MenuDialog from '../components/menu-dialog';


export default function Menu(){

    const theme = useTheme();

    const columns = [
      // Image.
      {
          field: "image",
          headerName: "Image",
          width: 300,
          renderCell: (params) => {
              // Inventory element image render.
              return (
                  <Box
                      sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                      }}
                  >
                      <Box
                          sx={{
                              width: 250,
                              height: 150,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden",
                              borderRadius: 2,
                          }}
                      >
                          <Image
                              src={params.row.image}
                              alt={params.row.meal}
                              layout="responsive"
                              width={100}
                              height={100}
                              style={{ objectFit: "fill" }}
                          />
                      </Box>
                  </Box>
              )
          },
      },
      // Name.
      { field: "meal", headerName: "Meal", flex: 1 },
      // Unit.
      { field: "description", headerName: "Description", flex: 1 },
      {
        field: "price",
        headerName: "Price",
        flex: 1,
        renderCell: (params) => {
            // Existence inventory element render.
            return (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                        height: "100%",
                    }}
                >
                    {/* Current existence. */}
                    <Typography>
                        {params.row.price} $
                    </Typography>
                </Box>
            )
        },
    },
  ];
      
const [action, setAction] = useState("");
const [menu, setMenu] = useState({
  id: null,
  meal: "",
  description: "",
  price: 0,
  image: null
});

const [openDialog, setOpenDialog] = useState(false);
const [rows, setRows] = useState(initialRows);
const [openAlert, setOpenAlert] = useState(false);
const [alert, setAlert] = useState({
    message: "",
    severity: "",
});


const handleMenu = ({ action, menu }) => {
  // Update action.
  setAction(action);

  // Open dialog.
  setOpenDialog(true);

  // Select action.
  if (action == "add") {
      setMenu({
          id: null,
          meal: "",
          description: "",
          price: 0,
          image: null
      });
  } 
  else {
      console.warn("Unknown action:", action);
  }
};


    return(

      <Box
      maxWidth="xl"
      sx={{ mx: "10%" }}
  >

          {/*In this grid we use a background image with rounded borders the make a better presentation*/}
              <Grid
                sx={{
                  backgroundImage: "url('/Imageback.jpg')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover", // Here we cover al the grid with the image
                  borderRadius: "5px",
                  width: "100%",
                  height: "450px", // Here we adjust the heigt 
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center", 
                }}
              >
                {/*Here we have the title of the page.*/}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Typography variant="h3" color="white" sx={{ fontWeight: "bold" }}>
                    MAIKA RESTAURANT
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography variant="h4" color="white" sx={{ fontWeight: "bold" }}>
                    MENU
                  </Typography>
                </Box>
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt:8,mb:4 }}>
              <RestaurantIcon sx={{ display: { xs: 'flex' }, mr: 1, fontSize: '6rem', color: theme.palette.secondary.main }} />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", mb:6 }}>
                  <Typography variant="h5" color="black" sx={{ fontWeight: "bold" }}>
                  MAIKA Menú 2024
                  </Typography>
              </Box>
              
            {/* Add meal button. */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    sx={{ borderRadius: 3 }}
                    onClick={() => handleMenu({ action: "add" })}
                >
                    Add Meal
                </Button>
            </Box>

              <Grid xs={6} sx={{ border: "solid black 5px",display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              </Grid>

            {/*Here we have the container with the menu items, where we have divided it into columns to provide a better view.*/}
            
            <Paper
                              sx={{
                                  padding: 2,
                                  borderRadius: 2,
                                  maxWidth: "80%",
                                  margin: "0 auto",
                                  height: "600px",
                              }}
                          >
                              {/* Meals table. */}
                              <DataGrid
                                  columns={columns}
                                  rows={rows}
                                  rowHeight={180}
                                  initialState={{
                                      pagination: {
                                          paginationModel: { page: 0, pageSize: 5 },
                                      },
                                  }}
                                  pageSizeOptions={[5, 10]}
                                  sx={{
                                      border: "1px solid #DDD",
                                      backgroundColor: "#F9F9F9",
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
                                          borderRight: "1px solid #DDD",
                                      },
                                      "& .MuiDataGrid-footerContainer": {
                                          backgroundColor: "#F1F1F1",
                                      },
                                  }}
                              />
                          </Paper>
        
         {/* Creation dialog. */}
         <MenuDialog
                open={openDialog}
                setOpen={setOpenDialog}
                menu={menu}
                setMenu={setMenu}
                action={action}
                rows={rows}
                setRows={setRows}
                setAlert={setAlert}
                setOpenAlert={setOpenAlert}
            />
            {/* Alert. */}
            <Alerts open={openAlert} setOpen={setOpenAlert} alert={alert} />
    </Box>
    );
};