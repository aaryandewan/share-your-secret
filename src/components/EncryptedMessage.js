import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";

// import { getEncryptedMessage } from "../services/firebase";

function EncryptedMessage() {
  let { uniqueId } = useParams();
  // let [encryptedMessage, setEncryptedMessage] = useState("");
  // const [password, setPassword] = useState("");
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
      {!data.password && data.message}
      {error && <h1>{error}</h1>}
    </div>
  );
  // return <div>Hello</div>;
}

export default EncryptedMessage;
