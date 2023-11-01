import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Router from "./Router/Router"

import './App.css';
import './master.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Router />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
