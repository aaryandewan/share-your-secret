import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Confetti from "react-confetti";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function EncryptedMessage() {
  let { uniqueId } = useParams();
  const [error, setError] = useState("");
  const [data, setData] = useState({ message: "", password: "" });
  const [password, setPassword] = useState("");
  const [askPassword, setAskPassword] = useState("");
  const [showMessage, setShowMessage] = useState(null);
  const [open, setOpen] = React.useState(false);
  // const { width, height } = useWindowSize();
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    if (password === data.password) {
      setPassword("");
      setShowMessage(true);
      setAskPassword(null);
      await deleteDoc(doc(db, "messages", uniqueId.toString()));
    } else {
      handleClick();
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "messages", uniqueId.toString());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData({
          message: docSnap.data().message,
          password: docSnap.data().password,
        });
        setAskPassword(true);
      } else {
        setError("NO SUCH DOC");
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {askPassword && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          style={{ height: "100vh", backgroundColor: "" }}
        >
          {/* <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Wrong password!"
            action={action}
          /> */}

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Wrong password!
            </Alert>
          </Snackbar>
          <Grid
            container
            direction="row"
            justifyContent="center"
            // alignItems="center"
            alignItems="center"
            style={{ backgroundColor: "", height: "30vh" }}
          >
            <Grid item md={12} xs={12} style={{ backgroundColor: "" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography sx={{ typography: { sm: "h2", xs: "h6" } }}>
                  Enter the password to see the secret text
                </Typography>
              </div>
            </Grid>

            <Grid item md={4} xs={12} style={{ backgroundColor: "" }}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Enter your password..."
                rows={4}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  input: {
                    color: "black",

                    borderColor: "white",
                  },
                }}
                color="success"
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
              style={{
                backgroundColor: "",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button onClick={handleSubmit} variant="outlined">
                Check!
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {showMessage && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          style={{ height: "100vh", backgroundColor: "" }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            // alignItems="center"
            alignItems="center"
            style={{ backgroundColor: "", height: "30vh" }}
          >
            <Confetti
              width={windowDimensions.width}
              height={windowDimensions.height}
            />
            <Grid item md={12} xs={12} style={{ backgroundColor: "" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography sx={{ typography: { sm: "h2", xs: "h6" } }}>
                  Your secret message is 🤩
                </Typography>
              </div>
            </Grid>
            <Grid item md={12} xs={12} style={{ backgroundColor: "" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  sx={{ typography: { sm: "h1", xs: "h3" } }}
                  style={{
                    background: "rgb(131,58,180)",
                    background:
                      "linear-gradient(90deg, rgba(131,58,180,1) 13%, rgba(253,62,29,1) 67%, rgba(252,176,69,1) 100%)",
                    webkitBackgroundClip: "text",
                    webkitTextFillColor: "transparent",
                  }}
                >
                  {data.message}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Box>
      )}
      {error && (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "",
          }}
        >
          <Typography sx={{ typography: { sm: "h4", xs: "h6" } }}>
            Sorry 😞, this message has been removed or it might have never even
            existed!
          </Typography>
        </div>
      )}
    </div>
  );
}

export default EncryptedMessage;
