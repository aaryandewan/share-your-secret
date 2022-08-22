import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function EncryptedMessage() {
  let { uniqueId } = useParams();
  const [error, setError] = useState("");
  const [data, setData] = useState({ message: "", password: "" });

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "messages", uniqueId.toString());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setData({
          message: docSnap.data().message,
          password: docSnap.data().password,
        });
        await deleteDoc(doc(db, "messages", uniqueId.toString()));
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setError("NO SUCH DOC");
      }
      //TODO: WHY THE HELL IS THE BELOW CODE NOT WORKING!?????
      //I NEED TO WORK ON ASYNC FUNCTIONS MAN
      // try {
      //   let result = await getEncryptedMessage(uniqueId);
      //   // setData({ message: result.message, password: result.password });
      //   console.log("RESULT IS !!", result);
      //   if (result === 123) {
      //     console.log("FFFF");
      //     setError("Page doesn't exist");
      //   }

      //   console.log("MSSG: ", data?.message);
      //   console.log("Password: ", data?.password);
      // } catch (err) {
      //   console.log("ERROR BABY!", err);
      // }
    }

    fetchData();
  }, []);

  return (
    <div>
      {/*  */}
      {/* {!data.password && data.message} */}
      {/*  */}
      {/*  */}
      {/*  */}
      {data.message && (
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
