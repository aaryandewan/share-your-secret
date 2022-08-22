import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createEncryptedMessage } from "../services/firebase";

function Dashboard() {
  const [value, setValue] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("subit pressed");

    try {
      await createEncryptedMessage(value, "");
      console.log("Success");
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
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-multiline-static"
        label="Add your secret message here..."
        multiline
        rows={4}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={handleSubmit} variant="outlined">
        Submit
      </Button>
    </Box>
  );
}

export default Dashboard;
