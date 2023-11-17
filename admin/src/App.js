import { BrowserRouter } from "react-router-dom";
import NavBar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Footer from "./Components/Footer/Footer";
import Router from "./Router/Router"
import './App.css';
import './master.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="d-flex">
          <div style={{width: "15.9%"}}>
            <Sidebar />
          </div>
          <div className="flex-grow-1">
            <NavBar />
            <div className="container-fluid p-0">
              <Router />
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
