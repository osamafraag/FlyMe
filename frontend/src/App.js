import { BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar"
import Footer from "./Components/Footer/Footer";
import Router from "./Router/Router"
import './App.css';
import './master.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="container-fluid p-0">
          <Router />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
