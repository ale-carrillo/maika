import React, { useState } from 'react';
import {
  Container,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import { orders as initialOrders } from '../constants/home/orders'; // Adjust the path to the orders file
import Grid from "@mui/material/Grid2";
import Alerts from '../components/alerts'; // Import the Alerts component

function TicketPage() {
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // State to hold the selected order
  const [paymentMethod, setPaymentMethod] = useState(''); // State for payment method
  const [fiscalData, setFiscalData] = useState({ rfc: '' }); // State for fiscal data fields
  const [alert, setAlert] = useState({ severity: "success", message: "" }); // State for alert messages
  const [openAlert, setOpenAlert] = useState(false); // State for alert visibility
  const [orders, setOrders] = useState(initialOrders); // Initialize orders state with constants

  const handleGenerateTicket = (order) => {
    setSelectedOrder(order); // Set the selected order
    console.log("Generating ticket for order:", order); // Log the selected order for ticket generation
    setOpenDialog(true); // Open the dialog
  };

  const handlePayment = () => {
    // Logic for payment confirmation
    console.log("Processing payment for:", selectedOrder); // Log the selected order details
    console.log("Payment details:", paymentMethod, fiscalData); // Log payment method and fiscal data
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.filter(order => order !== selectedOrder); // Remove the order from the list
      console.log("Updated orders after payment:", updatedOrders); // Log updated orders
      return updatedOrders;
    });
    setOpenDialog(false); // Close the dialog

    // Set alert message for successful payment
    setAlert({ severity: "success", message: "Payment successful for order!" });
    setOpenAlert(true); // Show alert
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Select an Order to Generate a Ticket
      </Typography>
      <Grid container spacing={2}>
        {orders.map((order, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
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
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleGenerateTicket(order)} // Generate ticket for this order
              >
                Generate Ticket
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Payment Dialog */}
      <Dialog open={openDialog} onClose={() => {
        console.log("Closing payment dialog"); // Log when the dialog is closed
        setOpenDialog(false);
      }}>
        <DialogTitle>Payment for Order</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Total Price: ${selectedOrder ? selectedOrder.totalPrice.toFixed(2) : 0}</Typography>
          <Typography variant="subtitle1">Customer Name: {selectedOrder ? selectedOrder.name : ''}</Typography> {/* Display name from selected order */}
          <TextField
            select
            label="Payment Method"
            value={paymentMethod}
            onChange={(e) => {
              setPaymentMethod(e.target.value);
              console.log("Selected payment method:", e.target.value); // Log the selected payment method
            }}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="PayPal">PayPal</MenuItem>
          </TextField>
          <TextField
            label="RFC"
            value={fiscalData.rfc}
            onChange={(e) => {
              setFiscalData({ ...fiscalData, rfc: e.target.value });
              console.log("RFC updated:", e.target.value); // Log the updated RFC
            }}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            console.log("Payment dialog canceled"); // Log when cancel button is clicked
            setOpenDialog(false);
          }} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePayment} color="primary">
            Pay
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alerts for payment actions */}
      <Alerts open={openAlert} setOpen={setOpenAlert} alert={alert} setAlert={setAlert} />
    </Container>
  );
}

export default TicketPage;