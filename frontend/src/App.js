import { BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Router from "./Router/Router"
import './App.css';
import './master.css';
import { Token } from "./Context/Token";
import { EmailAddress } from "./Context/EmailAddress";
import { useState } from "react";

function App() {
  const [token, setToken] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [userId, setUserId] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <Token.Provider value={{ token, setToken }}>
        <EmailAddress.Provider value={{ emailAddress, setEmailAddress }}>
          <NavBar />
          <div className="container-fluid p-0">
            <Router />
          </div>
          <Footer />
        </EmailAddress.Provider>
        </Token.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
