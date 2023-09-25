import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

interface AnimalNameDialogProps {
  open: boolean;
  onClose: () => void;
  onNameSubmit: (name: string) => void;
}

function AnimalNameForm(props: AnimalNameDialogProps) {
  const { open, onClose, onNameSubmit } = props;
  const [animalName, setAnimalName] = useState("");

  const handleNameSubmit = () => {
    if (animalName.trim() !== "") {
      onNameSubmit(animalName);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter Animal Name</DialogTitle>
      <DialogContent>
        <TextField
          label="Animal Name"
          fullWidth
          value={animalName}
          required
          onChange={(e) => setAnimalName(e.target.value)}
        />
      </DialogContent>
      <Button onClick={handleNameSubmit} color="primary">
        Submit
      </Button>
    </Dialog>
  );
}

export default AnimalNameForm;
