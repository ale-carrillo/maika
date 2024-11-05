"use client"; // Indicates that this component is a client component (for frameworks like Next.js)
import { useState } from "react"; // Import useState hook for managing component state
import {
  Container,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'; 
import Grid from '@mui/material/Grid'; // Use the correct Grid import
import OrderForm from './OrderForm'; // Import components
import Alerts from '../components/alerts'; // Import the Alerts component

export default function App() {
  const [orders, setOrders] = useState([]); // State to manage the list of orders
  const [openDialog, setOpenDialog] = useState(false); // State to manage the visibility of the dialog
  const [currentOrderIndex, setCurrentOrderIndex] = useState(null); // State for the index of the current order
  const [alert, setAlert] = useState({ severity: "success", message: "" }); // State for alert messages
  const [openAlert, setOpenAlert] = useState(false); // State for alert visibility

  // Function to handle adding or updating an order
  const handleAddOrder = (newOrder) => {
    console.log("Adding/updating order:", newOrder); // Log the new order
    if (currentOrderIndex !== null) {
      const updatedOrders = [...orders]; // Create a copy of the current orders
      updatedOrders[currentOrderIndex] = newOrder; // Update the existing order
      setOrders(updatedOrders); // Set the updated orders to state
      setAlert({ severity: "success", message: "Order updated successfully!" });
      console.log("Order updated:", updatedOrders[currentOrderIndex]); // Log the updated order
    } else {
      setOrders([...orders, newOrder]); // Add a new order
      setAlert({ severity: "success", message: "New order added successfully!" });
      console.log("New order added:", newOrder); // Log the new order
    }
    setOpenDialog(false); // Close the dialog after adding/updating
    setCurrentOrderIndex(null); // Reset the index when closing the dialog
    setOpenAlert(true); // Show alert
  };

  // Function to handle deleting an order by index
  const handleDeleteOrder = (index) => {
    console.log("Deleting order at index:", index); // Log the index of the order to delete
    const updatedOrders = orders.filter((_, i) => i !== index); // Filter out the order to delete
    setOrders(updatedOrders); // Update the orders state
    setAlert({ severity: "success", message: "Order marked as done!" }); // Set success alert
    console.log("Updated orders after deletion:", updatedOrders); // Log the updated orders
    setOpenAlert(true); // Show alert
  };

  // Function to handle opening the edit dialog for an order
  const handleEditOrder = (index) => {
    console.log("Editing order at index:", index); // Log the index of the order to edit
    setCurrentOrderIndex(index); // Set the index of the order to edit
    setOpenDialog(true); // Open the dialog for editing
  };

  // Function to handle closing the alert
  const handleCloseAlert = () => {
    setOpenAlert(false); // Close the alert
  };

  return (
    <Container sx={{ minHeight: "500px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Orders
      </Typography>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => {
            console.log("Creating a new order"); // Log when the create button is clicked
            setOpenDialog(true); // Open the dialog for creating a new order
            setCurrentOrderIndex(null); // Ensure the index is null for a new order
          }}>
            Create New Order
          </Button>
        </Grid>
      </Grid>

      {/* Dialog for creating or editing an order */}
      <Dialog open={openDialog} onClose={() => {
        console.log("Closing dialog"); // Log when the dialog is closed
        setOpenDialog(false);
      }}>
        <DialogTitle>{currentOrderIndex !== null ? "Edit Order" : "New Order"}</DialogTitle>
        <DialogContent>
          <OrderForm 
            onAddOrder={handleAddOrder} 
            order={currentOrderIndex !== null ? orders[currentOrderIndex] : null} // Pass the order to edit
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            console.log("Cancelling operation"); // Log when cancel button is clicked
            setOpenDialog(false);
          }} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display orders in a responsive grid */}
      <Grid container spacing={2}>
        {orders.map((order, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}> {/* Display 3 orders per row on medium screens and above */}
            <Paper style={{ padding: '16px', margin: '8px 0' }}>
              <Typography variant="h6">Order #{index + 1}</Typography>
              <Typography>Name: {order.name}</Typography>
              <Typography>Table: {order.table}</Typography>
              <Typography>Dishes:</Typography>
              {order.dishes.map((dish, idx) => (
                <Typography key={idx}>
                  {dish.dish} - Quantity: {dish.quantity}
                </Typography>
              ))}
              <Grid container spacing={1} style={{ marginTop: '8px' }}>
                <Grid item>
                  <Button 
                    variant="contained" 
                    color="success" 
                    onClick={() => {
                      console.log("Marking order as done:", order); // Log the order being marked as done
                      handleDeleteOrder(index); // Call the function to delete the order
                    }}
                  >
                    Done
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    color="info" 
                    onClick={() => {
                      console.log("Opening edit dialog for order:", order); // Log when the edit button is clicked
                      handleEditOrder(index); // Call the function to edit the order
                    }}
                  >
                    Edit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Alerts for actions */}
      <Alerts open={openAlert} setOpen={setOpenAlert} alert={alert} setAlert={setAlert} />
    </Container>
  );
}
