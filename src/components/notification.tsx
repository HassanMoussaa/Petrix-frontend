import { onMessageListener } from "../../src/firebase";

import { Alert, AlertTitle } from "@mui/material";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

import { useState } from "react";

const Notfication = () => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  onMessageListener()
    .then((payload: any) => {
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      setShow(true);
    })
    .catch((err: any) => console.log("failed", err));
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={show}
      onClose={() => setShow(false)}
      autoHideDuration={6000}
    >
      <Alert
        onClose={() => setShow(false)}
        severity="info"
        variant="filled"
        sx={{ width: "100%" }}
      >
        <AlertTitle>{notification.title}</AlertTitle>
        {notification.body}
      </Alert>
    </Snackbar>
  );
};

export default Notfication;
