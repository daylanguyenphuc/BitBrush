import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Button, TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { curentUser } from './Const';
import Web3 from 'web3';
import NFTImagesJSON from './contracts/Artwork.json';

const Wallet = () => {
  const [web3Instance, setWeb3Instance] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // validate if metamask is installed and wallet is connected
  useEffect(() => {
    if (window.ethereum) {
      if (window.ethereum.selectedAddress) {
        setIsWalletConnected(true);
        const web3 = new Web3(window.ethereum);
        setWeb3Instance(web3);
      }
    } else {
      console.log('Please install MetaMask to use this application.');
    }
  }, [])

  const handleConnectWallet = () => {
    if (!isWalletConnected) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
                      .then(async () => {
                        setIsWalletConnected(true);
                        const web3 = new Web3(window.ethereum);
                        setWeb3Instance(web3);
                      })
                      .catch((err) => {
                        console.error("User rejected request:", err);
                      });
    }
  }

  const [balance, setBalance] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  // Update selected address
  useEffect(() => {
    if (web3Instance && isWalletConnected) {
      setSelectedAddress(web3Instance.currentProvider.selectedAddress);
    }
  }, [web3Instance, isWalletConnected]);

  // Update balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (web3Instance && selectedAddress) {
        try {
          const result = await web3Instance.eth.getBalance(selectedAddress);
          const balanceInEther = web3Instance.utils.fromWei(result, "ether");
          setBalance(balanceInEther);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    fetchBalance();
  }, [web3Instance, selectedAddress]);

  return (
    <Container maxWidth="xl" style={{ padding: '0' }} >
      <Grid container spacing={2}>
        { isWalletConnected ? (
          <Grid item xs={12} sm={12} md={6.5} style={{ padding: '200px 5%' }}>
            <Typography
              variant="h2"
              style={{
                  textTransform: 'uppercase',
                  fontSize: '3rem',
              }}
              gutterBottom
            >
              Wallet Information
            </Typography>
        
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ fontSize: '1rem' }}>Wallet Address</TableCell>
                    <TableCell style={{ fontSize: '1rem' }}>{ window.ethereum.selectedAddress }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: '1rem' }}>Wallet Balance</TableCell>
                    <TableCell style={{ fontSize: '1rem' }}>{ balance } ETH</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
        </Grid>
        ) : (
          <Grid item xs={12} sm={12} md={6.5} style={{ padding: '200px 5%' }}>
            <Typography
              variant="h2"
              style={{
                textTransform: 'uppercase',
                fontSize: '3rem',
              }}
              gutterBottom
            >Connect wallet</Typography>
            <Typography variant="h5" gutterBottom>Connect your wallet to start trading NFTs now.</Typography>
            <Button
                variant="contained"
                color={'primary'}
                onClick={() => handleConnectWallet()}
                size="large"
                style={{
                    width: '100%',
                    marginTop: '1rem',
                }}
            >Connect wallet</Button>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={5.5}>
          <Box
            style={{
                backgroundImage: `url(${'./walletimg.png'})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100%',
                maxWidth: '100%',
            }}
          >
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Wallet;
