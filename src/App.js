import { app } from "./firebase.config";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import EncryptedMessage from "./components/EncryptedMessage";
import NotFound from "./components/NotFound";

function App() {
  console.log(app);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/message/:id" element={<EncryptedMessage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
