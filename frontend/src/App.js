import { BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Router from "./Router/Router"
import './App.css';
import './master.css';
import './style.css';
import { Token } from "./Context/Token";
import { EmailAddress } from "./Context/EmailAddress";
import { AutoLogin } from "./Context/AutoLogin";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [emailAddress, setEmailAddress] = useState(null);
  const [userNameAndPassword, setUserNameAndPassword] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <AutoLogin.Provider value={{ userNameAndPassword, setUserNameAndPassword }}>
        <Token.Provider value={{ token, setToken }}>
        <EmailAddress.Provider value={{ emailAddress, setEmailAddress }}>
          <NavBar />
          <div className="container-fluid p-0">
            <Router />
          </div>
          <Footer />
        </EmailAddress.Provider>
        </Token.Provider>
        </AutoLogin.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
