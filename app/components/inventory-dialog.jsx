// Imports.
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Typography
} from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";

// Inventory dialog.
export default function InventoryDialog({
  open,
  setOpen,
  inventory,
  setInventory,
  action,
  rows,
  setRows,
  setAlert,
  setOpenAlert,
}) {
  // States.
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  // Handle functions.

  //Close dialog.
  const handleCloseDialog = () => {
    setSelectedImage(null);
    setErrors({});
    setOpen(false);
  };

  // Validate fields.
  const validateFields = () => {
    // Build error object.
    const newErrors = {};
    if (!inventory.name) newErrors.name = "Name is required.";
    if (!inventory.unit) newErrors.unit = "Unit is required.";
    if (!inventory.existence || inventory.existence < 0) newErrors.existence = "Existence must be a non-negative number.";
    if (!inventory.image && !selectedImage) newErrors.image = "Image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save inventory.
  const saveInventory = () => {
    // Validate fields.
    if (!validateFields()) {
      setAlert({
        message: "Please fill all required fields correctly.",
        severity: "error",
      });
      setOpenAlert(true);
      console.warn("Please fill all required fields correctly.");
      return;
    }

    // Build the new object for inventory.
    const updatedInventory = {
      ...inventory,
      existence: +inventory.existence,
      image: selectedImage ? URL.createObjectURL(selectedImage) : inventory.image,
    };

    // Select if add or edit the inventory.
    if (action === "add") {
      updatedInventory.id = Math.max(...rows.map((i) => i.id), 1) + 1;
      setRows([...rows, updatedInventory]);
      setAlert({
        message: "Inventory added successfully!",
        severity: "success",
      });
      setOpenAlert(true);
      console.info("Inventory added successfully!");
    } else if (action === "edit") {
      setRows(rows.map((e) => (e.id === updatedInventory.id ? updatedInventory : e)));
      setAlert({
        message: "Inventory saved successfully!",
        severity: "success",
      });
      setOpenAlert(true);
      console.info("Inventory saved successfully!");
    }

    handleCloseDialog();
  };

  // Handle text inputs change.
  const handleChange = (event) => {
    setInventory({
      ...inventory,
      [event.target.name]: event.target.value,
    });
  };

  // Handle image change.
  const handleImageChange = (event) => {
    // If a image was selected.
    const file = event.target.files[0];
    if (file) {
      // Validate file type.
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
      } else {
        setAlert({
          message: "Please upload a valid image file.",
          severity: "error",
        });
        setOpenAlert(true);
        console.warn("Please upload a valid image file.");
      }
    }
  };

  // Display current image always if edition is else displays nothing.
  useEffect(() => {
    if (action === "edit" && inventory.image) {
      setImagePreview(inventory.image);
    } else {
      setImagePreview("");
    }
  }, [inventory, action]);

  // Component.
  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>{action === "add" ? "Add" : "Edit"} Inventory</DialogTitle>
      <DialogContent>
        {/* Name field. */}
        <TextField
          margin="dense"
          name="name"
          label="Name"
          fullWidth
          value={inventory.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        {/* Unit field. */}
        <TextField
          margin="dense"
          name="unit"
          label="Unit"
          fullWidth
          value={inventory.unit}
          onChange={handleChange}
          error={!!errors.unit}
          helperText={errors.unit}
        />
        {/* Existence field. */}
        <TextField
          margin="dense"
          name="existence"
          label="Existence"
          type="number"
          fullWidth
          value={inventory.existence}
          onChange={handleChange}
          error={!!errors.existence}
          helperText={errors.existence}
          inputProps={{ min: 0 }}
        />
        {/* Image field. */}
        <TextField
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          error={!!errors.image}
          helperText={errors.image}
          sx={{ mb: 2 }}
        />
        {/* Image preview. */}
        {imagePreview && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">Image Preview:</Typography>
            <Image
              src={imagePreview}
              alt="Selected Image"
              width={200}
              height={200}
              style={{ objectFit: "cover" }}
            />
          </Box>
        )}
      </DialogContent>
      {/* Action buttons. */}
      <DialogActions>
        <Button color="secondary" onClick={handleCloseDialog}>
          Cancel
        </Button>
        <Button color="primary" onClick={saveInventory}>
          {action === "add" ? "Add" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}