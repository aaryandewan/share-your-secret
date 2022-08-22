import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function Navbar() {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Stack
        direction="row"
        spacing={2}
        style={{
          marginTop: "20px",
          marginLeft: "20px",
        }}
      >
        <Button variant="outlined">Share your secret</Button>
      </Stack>
    </Link>
  );
}

export default Navbar;
