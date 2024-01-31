import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Header from "./Header";
import Footer from './Footer';
import Homepage from "./Homepage";
import Marketplace from "./Marketplace";
import Collection from "./Collection";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <div className="contents">
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/marketplace" element={<Marketplace />} />
            <Route exact path="/collection" element={<Collection />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
