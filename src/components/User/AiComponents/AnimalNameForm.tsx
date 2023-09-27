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
  breed: string;
}

function AnimalNameForm(props: AnimalNameDialogProps) {
  const { open, onClose, onNameSubmit, breed } = props;
  const [animalName, setAnimalName] = useState("");

  const handleNameSubmit = () => {
    if (animalName.trim() !== "") {
      onNameSubmit(animalName);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Set a Name for your <br />
        {breed}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Pet Name"
          fullWidth
          value={animalName}
          required
          onChange={(e) => setAnimalName(e.target.value)}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <Button onClick={handleNameSubmit} color="primary">
        Submit
      </Button>
    </Dialog>
  );
}

export default AnimalNameForm;
