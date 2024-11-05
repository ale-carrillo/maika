import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Box, Grid } from '@mui/material';
import { dishes } from '../constants/dishes'; // Adjust the path according to your project structure

function OrderForm({ onAddOrder }) {
  const [name, setName] = useState('');
  const [table, setTable] = useState('');
  const [selectedDishes, setSelectedDishes] = useState([{ dish: '', quantity: 1 }]); // Initial state for selected dishes

  const handleDishChange = (index, value) => {
    const newSelectedDishes = [...selectedDishes];
    newSelectedDishes[index].dish = value; // Update the selected dish
    setSelectedDishes(newSelectedDishes); // Update state
  };

  const handleQuantityChange = (index, value) => {
    const newSelectedDishes = [...selectedDishes];
    newSelectedDishes[index].quantity = value; // Update the quantity
    setSelectedDishes(newSelectedDishes); // Update state
  };

  const handleAddDish = () => {
    setSelectedDishes([...selectedDishes, { dish: '', quantity: 1 }]); // Add a new empty dish selection
  };

  const handleSubmit = () => {
    const orderDetails = {
      name,
      table,
      dishes: selectedDishes.filter(item => item.dish), // Filter out empty selections
    };
    onAddOrder(orderDetails); // Send the complete order details
    // Reset state
    setName('');
    setTable('');
    setSelectedDishes([{ dish: '', quantity: 1 }]); // Reset dishes
  };

  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        label="Order Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Table"
        fullWidth
        value={table}
        onChange={(e) => setTable(e.target.value)}
        margin="normal"
      />
      {selectedDishes.map((item, index) => (
        <Grid container spacing={2} key={index} style={{ marginBottom: '16px' }}>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel id={`dish-select-label-${index}`}>Select Dish</InputLabel>
              <Select
                labelId={`dish-select-label-${index}`}
                value={item.dish}
                onChange={(e) => handleDishChange(index, e.target.value)}
              >
                {dishes.map((dish) => (
                  <MenuItem key={dish.id} value={dish.name}>
                    {dish.name} - ${dish.price.toFixed(2)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              value={item.quantity}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              inputProps={{ min: 1 }} // Set minimum quantity to 1
            />
          </Grid>
        </Grid>
      ))}
      <Box sx={{ display: 'flex', gap: 2, marginTop: '16px' }}> {/* Use Box to wrap buttons with gap */}
        <Button variant="contained" color="secondary" onClick={handleAddDish}>
          Add Another Dish
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Order
        </Button>
      </Box>
    </Box>
  );
}

export default OrderForm;
