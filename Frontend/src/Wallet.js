import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Container, Grid, Typography, Box, TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { curentUser } from './Const';

const WalletConnected = () => {

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(web3Instance);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('Web3 is not installed');
      }
    };
    initWeb3();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (web3) {
        try {
          const accounts = await web3.eth.requestAccounts();
          setAccounts(accounts);

          const balance = await web3.eth.getBalance(accounts[0]);
          setWalletBalance(web3.utils.fromWei(balance, 'ether'));
        } catch (error) {
          console.error(error);
          setMessage(`Error connecting wallet: ${error.message}`);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [web3]);    

    return (
        <Container maxWidth="xl" style={{ padding: '0' }} >
            <Grid container spacing={2}>
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
                
                    {loading && <Typography variant="h6" gutterBottom>Loading...</Typography>}
                    {message && <Typography variant="h6" gutterBottom>{message}</Typography>}
                    <TableContainer>
                        <Table>
                        <TableBody>
                            <TableRow>
                            <TableCell style={{ fontSize: '1rem' }}>Wallet Address</TableCell>
                            <TableCell style={{ fontSize: '1rem' }}>{accounts.length > 0 ? accounts[0] : 'Not Connected'}</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell style={{ fontSize: '1rem' }}>Wallet Balance</TableCell>
                            <TableCell style={{ fontSize: '1rem' }}>{walletBalance} ETH</TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={5.5}>
                    <Box
                        style={{
                            backgroundImage: `url(${'./walletimg.png'})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            height: '100%',
                            maxWidth: '100%',
                        }}></Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default WalletConnected;
