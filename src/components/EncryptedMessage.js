import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getEncryptedMessage } from "../services/firebase";

function EncryptedMessage() {
  let { uniqueId } = useParams();
  let [encryptedMessage, setEncryptedMessage] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    async function fetchData() {
      let result = await getEncryptedMessage(uniqueId);
      setEncryptedMessage(result.message);
      setPassword(result.password);
      console.log("MSSG: ", encryptedMessage);
      console.log("Password: ", password);
    }

    fetchData();
  }, []);

  return <div>{!password && encryptedMessage}</div>;
}

export default EncryptedMessage;
