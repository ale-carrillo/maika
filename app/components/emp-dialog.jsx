import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Radio,
    RadioGroup,
    TextField,
  } from "@mui/material";
  
  export default function EmpDialog({
    open,
    setOPen,
    emp,
    setemp,
    action,
    rows,
    setAlert,
    setOpenAlert,
  }) {
    const handleCloseDialog = () => {
      setOPen(false);
    };
    const saveemp = () => {
      if (action == "add") {
        emp.id = rows.length + 1;
        setRows([...rows, emp]);
  
        setAlert({
          message: "emp added succesfully",
          severity: "success",
        });
        setOpenAlert(true);
      } else if (action == "edit") {
        setRows(rows.map((row) => (row.id == emp.id ? emp : row)));
        setAlert({
          message: "emp edited succesfully",
          severity: "success",
        });
        setOpenAlert(true);
      }
  
      handleCloseDialog();
    };
    const handleChange = (event) => {
      setemp({
        ...emp,
        [event.target.name]: event.target.value,
      });
    };
  
    return (
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{action === "add" ? "Add emp" : "Edit emp"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            value={emp.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            value={emp.author}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            fullWidth
            value={emp.year}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="salary"
            label="Salary"
            fullWidth
            value={emp.edition}
            onChange={handleChange}
          />
            <TextField
                margin="dense"
                name="birthdate"
                label="Birthdate"
                fullWidth
                value={emp.edition}
                onChange={handleChange}
            />
            <RadioGroup>
                <Radio value="Active" checked={emp.status === "Active"} onChange={handleChange}>
                    Active
                </Radio>
                <Radio value="Inactive" checked={emp.status === "Inactive"} onChange={handleChange}>
                    Inactive
                </Radio>
            </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button color="primary" onClick={saveemp}>
            {action === "add" ? "Add" : "Edit"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  