import React from 'react';
import { useState } from 'react';
import { Container, Grid, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Footer = () => {

    // Email subcription
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        // Validate email and update validation status
        setIsEmailValid(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(event.target.value));
    };
    const handleSubscribe = (event) => {
        event.preventDefault();
        // Do something with the email, e.g., subscribe logic
        console.log('Subscribe:', email);
    };

    return (
        <footer style={{ backgroundColor: '#fff', color: '#212121', padding: '20px 0' }}>
            <Container maxWidth="xl">
                <Grid container spacing={8} style={{ padding: '60px'}}>
                    <Grid item xs={12} sm={12} md={4}>
                        <Typography variant="h4" gutterBottom>BitBrush</Typography>
                        <Typography variant="body2">The world's first and lagrest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.</Typography>
                        <Typography variant="body2" style={{ marginTop: '20px' }}>&copy; {new Date().getFullYear()} BitBrush. All rights reserved.</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={2}>
                        <Typography variant="h6" gutterBottom>Marketplace</Typography>
                        <Typography variant="body2">All NFTs</Typography>
                        <Typography variant="body2">Painting and drawing</Typography>
                        <Typography variant="body2">Vector art</Typography>
                        <Typography variant="body2">3D model</Typography>
                        <Typography variant="body2">Pixel art</Typography>
                        <Typography variant="body2">2D animation</Typography>
                        <Typography variant="body2">3D animarion</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={2}>
                        <Typography variant="h6" gutterBottom>My Account</Typography>
                        <Typography variant="body2">My profile</Typography>
                        <Typography variant="body2">My wallet</Typography>
                        <Typography variant="body2">Settings</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Typography variant="h6" gutterBottom>Stay in the loop</Typography>
                        <Typography variant="body2">Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating NFTs.</Typography>
                        <form style={{ marginTop: '20px' }} onSubmit={handleSubscribe}>
                            <TextField
                                type="email"
                                label="Email Address"
                                variant="outlined"
                                fullWidth
                                required
                                value={email}
                                onChange={handleEmailChange}
                                error={!isEmailValid}
                                helperText={!isEmailValid ? 'Enter a valid email address' : ''}
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                    <IconButton type="submit" edge="end" aria-label="subscribe">
                                        <SendIcon />
                                    </IconButton>
                                    </InputAdornment>
                                ),
                                }}
                            />
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
}
 
export default Footer;