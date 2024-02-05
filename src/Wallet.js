import { useState } from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Wallet = () => {

    // Conncet wallet function
    const [isWalletConnected, setWalletConnected] = useState(false);
    const handleConnectWallet = (walletNumber) => {
        // Logic to connect wallet
        setWalletConnected(true);
    };

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
                        Connect wallet
                    </Typography>
                    <Typography variant="h5" gutterBottom>Connect your wallet to start trading NFTs now.</Typography>
                    <Button
                        variant="contained"
                        color={isWalletConnected ? 'success' : 'secondary'}
                        onClick={() => handleConnectWallet()}
                        size="large"
                        style={{
                            width: '100%',
                            marginTop: '1rem',
                        }}
                    >
                        {isWalletConnected ? (
                            <>
                                Wallet connected <CheckCircleIcon style={{ marginLeft: '0.5rem' }} />
                            </>
                        ) : ('Connect Wallet')}
                    </Button>
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

export default Wallet;
