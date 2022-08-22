import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { createEncryptedMessage } from "../services/firebase";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Link } from "react-router-dom";

const theme = createTheme();

// theme.typography.h2 = {
//   fontSize: "1.2rem",
//   "@media (min-width:600px)": {
//     fontSize: "1.5rem",
//     fontFamily: "Raleway",
//   },
//   [theme.breakpoints.up("md")]: {
//     fontSize: "3rem",
//   },
// };

function Dashboard() {
  const [value, setValue] = useState("");
  const [encryptedURL, setEncryptedURL] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("subit pressed");

    try {
      let docRefId = await createEncryptedMessage(value, "");
      setEncryptedURL(
        "http://localhost:3000/messages/" + docRefId.toString() + "/"
      );
    } catch (e) {
      console.error("zyzz err", e);
    }

    //TODO: Password
    // await createEncryptedMessage(value, "");
    // console.log("Message has been written successfully");
    // setValue("");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      style={{ height: "100vh", backgroundColor: "" }}
    >
      <ThemeProvider theme={theme}>
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
          // alignItems="center"
          alignItems="center"
          style={{ backgroundColor: "", height: "50vh" }}
        >
          <Grid item xs={12} md={6} style={{ backgroundColor: "" }}>
            <Typography
              gutterBottom
              textAlign="center"
              sx={{ typography: { sm: "h2", xs: "h4" } }}
            >
              Share your secret below!
            </Typography>
          </Grid>

          <Grid item md={7} xs={9} style={{ backgroundColor: "" }}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Add your secret message here..."
              multiline
              rows={4}
              onChange={(e) => setValue(e.target.value)}
              // style={{ backgroundColor: "pink" }}
            />
          </Grid>
          <Grid
            item
            md={6}
            justifyContent="center"
            style={{
              backgroundColor: "",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button onClick={handleSubmit} variant="outlined">
              Submit your secret message!
            </Button>
          </Grid>
          {encryptedURL && (
            <Grid
              item
              xs={12}
              justifyContent="center"
              style={{
                backgroundColor: "",
                display: "flex",
                flexDirection: "row",
                justifyContet: "center",
              }}
            >
              <div>
                {/* <Typography variant="h6"> Your link is availabe at: </Typography> */}
                <Typography sx={{ typography: { sm: "h6", xs: "body2" } }}>
                  Your link is availabe at: {encryptedURL}
                </Typography>
              </div>
            </Grid>
          )}
        </Grid>
      </ThemeProvider>
    </Box>
  );
}

export default Dashboard;
