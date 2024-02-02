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
import Create from "./Create";
import CreateNFT from "./CreateNFT";

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
            <Route exact path="/create" element={<Create />} />
            <Route exact path="/create/createNFT" element={<CreateNFT />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
