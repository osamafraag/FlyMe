import { BrowserRouter } from "react-router-dom";
import NavBar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Footer from "./Components/Footer/Footer";
import Router from "./Router/Router"
import './App.css';
import './master.css';
// import { Token } from "./Context/Token";
// import { useState } from "react";

function App() {
  // const [token, setToken] = useState(1);
  return (
    <div className="App">
      <BrowserRouter>
      {/* <Token.Provider value={{ token, setToken }}> */}
        <div className="d-flex">
          <div style={{width: "17%"}}>
            <Sidebar />
          </div>
          <div style={{width: "83%"}}>
            <NavBar />
            <div className="container-fluid p-0">
              <Router />
            </div>
            <Footer />
          </div>
        </div>
        {/* </Token.Provider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
