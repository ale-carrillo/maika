import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box, Typography
} from "@mui/material";

import Image from "next/image";
import { useState, useEffect } from "react";

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
  const handeCloseDialog = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  const saveInventory = () => {
    const updatedInventory = {
      ...inventory,
      image: selectedImage ? URL.createObjectURL(selectedImage) : inventory.image,
    };

    if (action == "add") {
      updatedInventory.id = rows.length + 1;
      setRows([...rows, updatedInventory]);
      setAlert({
        message: "Inventory added successfully!",
        severity: "success",
      });
      setOpenAlert(true);
    } else if (action == "edit") {
      setRows(rows.map((e) => (e.id === updatedInventory.id ? updatedInventory : e)));
      setAlert({
        message: "Inventory saved successfully!",
        severity: "success",
      });
      setOpenAlert(true);
    }
    handeCloseDialog();
  };

  const handleChange = (event) => {
    setInventory({
      ...inventory,
      [event.target.name]: event.target.value,
    });
    console.log(inventory);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
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
      }
    }
  };

  useEffect(() => {
    if (action === "edit" && inventory.image) {
      setImagePreview(inventory.image); // Assuming inventory.image is a URL
    } else {
      setImagePreview(""); // Reset preview when adding new item
    }
  }, [inventory, action]);

  return (
    <Dialog open={open} onClose={handeCloseDialog}>
      <DialogTitle>{action === "add" ? "Add" : "Edit"} Inventory</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Name"
          fullWidth
          value={inventory.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="unit"
          label="Unit"
          fullWidth
          value={inventory.unit}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="existence"
          label="Existence"
          type="number"
          fullWidth
          value={inventory.existence}
          onChange={handleChange}
          slotProps={{ min: 0 }}
        />
        <TextField
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          sx={{ mb: 2 }}
        />
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
      <DialogActions>
        <Button color="secondary" onClick={handeCloseDialog}>
          Cancel
        </Button>
        <Button color="primary" onClick={saveInventory}>
          {action === "add" ? "Add" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
