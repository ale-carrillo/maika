"use client";

// Imports.
import { Typography, Box, Paper, IconButton, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import Image from "next/image";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { initialRows } from "../constants/inventory/constants";
import InventoryDialog from "../components/inventory-dialog";
import Alerts from "../components/alerts";

// Inventory page.
export default function Inventory() {
    // DataGrid columns.
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
                                alt={params.row.name}
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
        { field: "name", headerName: "Name", flex: 1 },
        // Unit.
        { field: "unit", headerName: "Unit", flex: 1 },
        // Existence.
        {
            field: "existence",
            headerName: "Existence",
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
                        {/* Decrease existence. */}
                        <IconButton
                            onClick={() => decreaseInventory(params.row.id)}
                            color="primary"
                        >
                            <RemoveIcon />
                        </IconButton>
                        {/* Current existence. */}
                        <Typography>
                            {params.row.existence}
                        </Typography>
                        {/* Increase existence. */}
                        <IconButton
                            onClick={() => increaseInventory(params.row.id)}
                            color="primary"
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>
                )
            },
        },
        // Actions
        {
            field: "actions",
            headerName: "Actions",
            width: 110,
            renderCell: (params) => (
                <Box>
                    {/* Edit. */}
                    <IconButton
                        onClick={() => handleInventory({ action: "edit", inventory: params.row })}
                        color="primary"
                    >
                        <EditIcon />
                    </IconButton>
                    {/* Delete. */}
                    <IconButton
                        onClick={() => deleteInventory(params.row.id)}
                        color="secondary"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    // States.
    const [action, setAction] = useState("");
    const [inventory, setInventory] = useState({
        id: null,
        name: "",
        unit: "",
        existence: "",
        image: null
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [rows, setRows] = useState(initialRows);
    const [openAlert, setOpenAlert] = useState(false);
    const [alert, setAlert] = useState({
        message: "",
        severity: "",
    });

    // Handle functions.

    // Decrease existence where id matches.
    const decreaseInventory = (id) => {
        // Validate index.
        const index = rows.findIndex((item) => item.id === id);

        if (index === -1) {
            setAlert({
                message: "Inventory not found.",
                severity: "error",
            });
            setOpenAlert(true);
            console.warn("ID not found:", id);
            return;
        }

        // Decrease existence or delete item if existence is zero.
        if (rows[index].existence > 1) {
            rows[index].existence--;
            setRows(rows);
            setAlert({
                message: "Inventory decreased successfully!",
                severity: "success",
            });
            setOpenAlert(true);
            console.info("Inventory decreased successfully!");
        } else {
            deleteInventory(id);
        }
    };

    // Increase existence where id matches.
    const increaseInventory = (id) => {
        // Validate index.
        const index = rows.findIndex((item) => item.id === id);

        if (index === -1) {
            setAlert({
                message: "Inventory not found.",
                severity: "error",
            });
            setOpenAlert(true);
            console.warn("ID not found:", id);
            return;
        }

        // Increase existence.
        rows[index].existence++;
        setRows(rows);
        setAlert({
            message: "Inventory increased successfully!",
            severity: "success",
        });
        setOpenAlert(true);
        console.info("Inventory increased successfully!");
    };

    // Edit or add inventory.
    const handleInventory = ({ action, inventory }) => {
        // Update action.
        setAction(action);

        // Open dialog.
        setOpenDialog(true);

        // Select action.
        if (action == "add") {
            setInventory({
                id: null,
                name: "",
                unit: "",
                existence: 0,
                image: null
            });
        } else if (action == "edit") {
            setInventory(inventory);
        } else {
            console.warn("Unknown action:", action);
        }
    };

    // Delete inventory where id matches.
    const deleteInventory = (id) => {
        // Delete inventory.
        setRows(rows.filter((row) => row.id !== id));
        setAlert({
            message: "Inventory deleted successfully!",
            severity: "success",
        });
        setOpenAlert(true);
        console.info("Inventory deleted successfully!");
    };

    // Component.
    return (
        <Box
            sx={{ mx: "10%" }}
        >
            <Typography
                variant="h4"
                textAlign="center"
            >
                Inventory
            </Typography>
            {/* Add inventory button. */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    sx={{ borderRadius: 3 }}
                    onClick={() => handleInventory({ action: "add" })}
                >
                    Add Item
                </Button>
            </Box>
            <Paper
                sx={{
                    padding: 2,
                    borderRadius: 2,
                    maxWidth: "80%",
                    margin: "0 auto",
                    height: "600px",
                }}
            >
                {/* Inventory table. */}
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
            {/* Inventory for creation/edition dialog. */}
            <InventoryDialog
                open={openDialog}
                setOpen={setOpenDialog}
                inventory={inventory}
                setInventory={setInventory}
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
}