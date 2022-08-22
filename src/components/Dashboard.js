import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { createEncryptedMessage } from "../services/firebase";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function Dashboard() {
  const [value, setValue] = useState("");
  const [encryptedURL, setEncryptedURL] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit pressed");
    setDisabled(true);

    try {
      let docRefId = await createEncryptedMessage(value, password);
      setEncryptedURL(
        window.location.origin + "/messages/" + docRefId.toString() + "/"
      );
    } catch (e) {
      console.error("zyzz err", e);
    }
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
              style={{
                background: "rgb(131,58,180)",
                background:
                  "linear-gradient(90deg, rgba(131,58,180,1) 13%, rgba(253,62,29,1) 67%, rgba(252,176,69,1) 100%)",
                webkitBackgroundClip: "text",
                webkitTextFillColor: "transparent",
              }}
            >
              Share your secret!
            </Typography>
          </Grid>

          <Grid item xs={12} md={12} style={{ backgroundColor: "" }}>
            <Typography
              gutterBottom
              textAlign="center"
              sx={{ typography: { sm: "h6", xs: "body2" } }}
              style={{}}
            >
              Type in a secret message and share that link with someone...Once
              they see that message, the link will self destruct!
            </Typography>
          </Grid>

          <Grid item md={7} xs={9} style={{ backgroundColor: "" }}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Add your secret message here..."
              rows={4}
              onChange={(e) => setValue(e.target.value)}
              sx={{
                input: {
                  color: "black",

                  borderColor: "white",
                },
              }}
              color="success"
            />
          </Grid>

          <Grid item md={7} xs={9} style={{ backgroundColor: "" }}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Enter a password to encrypt this file"
              type="password"
              rows={4}
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
            md={6}
            justifyContent="center"
            style={{
              backgroundColor: "",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={handleSubmit}
              variant="outlined"
              disabled={disabled}
            >
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
                <Typography sx={{ typography: { sm: "h6", xs: "body2" } }}>
                  Your link is availabe at:
                  <div
                    style={{
                      background: "rgb(131,58,180)",
                      background:
                        "linear-gradient(90deg, rgba(131,58,180,1) 13%, rgba(253,62,29,1) 67%, rgba(252,176,69,1) 100%)",
                      webkitBackgroundClip: "text",
                      webkitTextFillColor: "transparent",
                    }}
                  >
                    {encryptedURL}
                  </div>
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
