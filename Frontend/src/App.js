import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/900.css';

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
import ResellNFT from "./ResellNFT";
import Wallet from "./Wallet";
import AccountSetting from "./AccountSetting";
import User from "./User";
import NFTDetail from "./NFTDetail";
import CollectionDetail from "./CollectionDetail";
import ConfirmPurchase from "./ConfirmPurchases";

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3D00B7',
    },
  },
  typography: {
    h2: {
      fontWeight: 900,
      fontSize: "3rem",
    },
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
              <Route exact path="/" element={<SignUpPage />} />
              <Route exact path="/home" element={<Homepage />} />
              <Route exact path="/marketplace" element={<Marketplace />} />
              <Route exact path="/collection" element={<Collection />} />
              <Route exact path="/ranking" element={<Ranking />} />
              <Route exact path="/create" element={<Create />} />
              <Route exact path="/create/createNFT" element={<CreateNFT />} />
              <Route exact path="/create/createCollection" element={<CreateCollection />} />
              <Route exact path="/create/resellNFT" element={<ResellNFT />} />
              <Route exact path="/accountsetting" element={<AccountSetting />} />
              <Route exact path="/user/:id" element={<User />} />
              <Route exact path="/wallet" element={<Wallet />} />
              <Route exact path="/nftdetail/:id" element={<NFTDetail />} />
              <Route exact path="/collectiondetail/:id" element={<CollectionDetail />} />
              <Route exact path="/confirmPurchase/:id" element={<ConfirmPurchase />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
