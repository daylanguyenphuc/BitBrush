import { Link } from 'react-router-dom';
import { Container, Grid, Box, Typography, Stack, Paper, Button } from "@mui/material";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import PhotoIcon from '@mui/icons-material/Photo';

const Create = () => {
    return (
        <Container maxWidth="xl" style={{ padding: '0' }} >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} style={{ padding: '0 5%' }}>
                    <Grid container spacing={10}>
                        <Grid item xs={12} sm={12} md={12} style={{ marginTop: '20vh' }}>
                            <Typography
                            variant="h2"
                            style={{
                                textTransform: 'uppercase',
                                fontSize: '3rem',
                            }}
                            gutterBottom
                            >
                            Create
                            </Typography>
                            <Typography variant="h5" gutterBottom>Create your items by dropping a collection or minting an NFT</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} style={{ marginBottom: '20vh', display: 'flex' }}>
                            <Stack spacing={2}>
                                <Link to='/create/createCollection' style={{ textDecoration: 'none' }}>
                                    <Paper elevation={3}>
                                        <Grid container spacing={0} alignItems="center" justifyContent="center" style={{ height: '120px' }}>
                                            <Grid item xs={1} sm={1} md={1} style={{ display: 'flex', alignItems: 'center', display: 'block', margin: 'auto' }}>
                                                <AutoAwesomeMosaicIcon style={{ fontSize: 40 }} />
                                            </Grid>
                                            <Grid item xs={9} sm={9} md={9}>
                                                <Typography variant="h6">Drop a collection</Typography>
                                                <Typography variant="subtitle1" gutterBottom>Launch your NFT collection for others to mint.</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Link>
                                <Link to='/create/createNFT' style={{ textDecoration: 'none' }}>
                                    <Paper elevation={3} style={{ maxWidth: '500px' }}>
                                        <Grid container spacing={0} alignItems="center" justifyContent="center" style={{ height: '120px' }}>
                                            <Grid item xs={1} sm={1} md={1} style={{ display: 'flex', alignItems: 'center', display: 'block', margin: 'auto' }}>
                                                <PhotoIcon style={{ fontSize: 40 }} />
                                            </Grid>
                                            <Grid item xs={9} sm={9} md={9}>
                                                <Typography variant="h6">Mint an NFT</Typography>
                                                <Typography variant="subtitle1" gutterBottom>Create a collection and mint NFT directly to your wallet.</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Link>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Box style={{ backgroundImage: `url(${'./createimg.png'})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%' }}></Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Create;