import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/montserrat';

import Header from "./Header";
import Footer from './Footer';

import SignUpPage from "./SignUpPage";
import Homepage from "./Homepage";
import Marketplace from "./Marketplace";
import Collection from "./Collection";
import Ranking from "./Ranking";
import Create from "./Create";
import CreateNFT from "./CreateNFT";
import CreateCollection from "./CreateCollection";
import AccountSetting from "./AccountSetting";
import User from "./User";

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3D00B7',
    },
  },
  typography: {
    fontFamily: [
      'Montserrat', 
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Header />
          <div className="contents">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/signup" element={<SignUpPage />} />
              <Route exact path="/marketplace" element={<Marketplace />} />
              <Route exact path="/collection" element={<Collection />} />
              <Route exact path="/ranking" element={<Ranking />} />
              <Route exact path="/create" element={<Create />} />
              <Route exact path="/create/createNFT" element={<CreateNFT />} />
              <Route exact path="/create/createCollection" element={<CreateCollection />} />
              <Route exact path="/accountsetting" element={<AccountSetting />} />
              <Route exact path="/user" element={<User />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
