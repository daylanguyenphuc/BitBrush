import React from "react";
import { useState } from "react";
import { Container, Typography, Grid, Box, Avatar, Chip, Button, Paper, Pagination, Backdrop } from "@mui/material";

const NFTDetail = () => {

    // Explore more funcition
        // Pagination
        const [page, setPage] = useState(1);
        const handlePageChange = (event, value) => { setPage(value); }

    // Confirm purchase function
    const [confirmPurchase, setConfirmPurchase] = React.useState(false);
    const handleNoConirmPurchase = () => {
        setConfirmPurchase(false);
    };
    const handleConfirmPurchase = () => {
        setConfirmPurchase(true);
    };

    return (  

        <>

        <Container maxWidth="xl" style={{ marginTop: '50px', marginBottom: '20px' }}>
            <Typography variant="h2" style={{ fontWeight: 'bold', textTransform: 'uppercase'}} gutterBottom>NFT details</Typography>
        </Container>
        <Container maxWidth="xl">
            <Grid container spacing={10}>
                <Grid item  xs={12} sm={6} md={6}>
                    <Box style={{ width: '100%', overflow: 'hidden', borderRadius: '2.5px' }}>
                        <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="img-03.jpg" alt="image" />
                    </Box>
                </Grid>
                <Grid item  xs={12} sm={6} md={6}>
                    <Box>
                        <Typography variant="h4" style={{ fontWeight: 'bold'}}>NFT's name here</Typography>
                        <Typography variant="subtitle1" gutterBottom>Created date: 20/01/2024 15:19:13</Typography>
                        <Grid container spacing={2}>
                            <Grid item  xs={12} sm={12} md={6} style={{display: 'flex', alignItems: 'center' }}>
                                <Avatar alt='created artist' src={``} />
                                <Typography variant="subtitle1" style={{marginLeft: '10px' }}>Created: Arkhan</Typography>
                            </Grid>
                            <Grid item  xs={12} sm={12} md={6} style={{display: 'flex', alignItems: 'center' }}>
                                <Avatar alt='owned' src={``} />
                                <Typography variant="subtitle1" style={{marginLeft: '10px' }}>Owned: Khanar</Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="h4" color='primary' gutterBottom style={{ fontWeight: 'bold', margin: '30px 0' }}>0.007 ETH</Typography>
                        <Typography variant="h6">Description</Typography>
                        <Typography variant="body1" gutterBottom >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac tellus id risus gravida elementum eu nec ipsum. Maecenas dignissim sem scelerisque, finibus elit ac, consectetur eros. Pellentesque metus nibh, consequat at sodales fermentum, bibendum ut ante.</Typography>
                        <Typography variant="h6">Tags</Typography>
                        <Chip key={1} label={'Vector art'} color="primary" style={{ margin: '4px' }} />
                        <Chip key={2} label={'2D animation'} color="primary" style={{ margin: '4px' }} />
                        <Button variant="contained" color="primary" fullWidth style={{ marginTop: '50px' }} onClick={handleConfirmPurchase}>Buy now</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
        <Container maxWidth="xl">
            <Box style={{ margin: '60px 0', textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>More from this creator</Typography>
            </Box>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper style={{ padding: '5%' }}>
                            <Box style={{ width: '100%', overflow: 'hidden', borderRadius: '2.5px' }}>
                                <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="img-02.jpg" alt="image" />
                            </Box>
                            <Box style={{ width: '100%', margin: '15px 0' }}>
                                <Grid container spacing={0}>
                                    <Grid item xs={9} sm={9} md={9}>
                                        <Typography variant="h5" gutterBottom>Artwork title</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={3} style={{ textAlign: 'right', alignSelf: 'center' }}>
                                        <Typography variant="subtitle2" color='primary'>0.5ETH</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography variant="body2">Created by: Nguyen Phuc</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box style={{ width: '100%' }}>
                                <Button variant="contained">Buy now</Button>
                                <Button variant="text">View details</Button>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper style={{ padding: '5%' }}>
                            <Box style={{ width: '100%', overflow: 'hidden', borderRadius: '2.5px' }}>
                                <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="img-03.jpg" alt="image" />
                            </Box>
                            <Box style={{ width: '100%', margin: '15px 0' }}>
                                <Grid container spacing={0}>
                                    <Grid item xs={9} sm={9} md={9}>
                                        <Typography variant="h5" gutterBottom>Artwork title</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={3} style={{ textAlign: 'right', alignSelf: 'center' }}>
                                        <Typography variant="subtitle2" color='primary'>0.5ETH</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography variant="body2">Created by: Nguyen Phuc</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box style={{ width: '100%' }}>
                                <Button variant="contained">Buy now</Button>
                                <Button variant="text">View details</Button>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper style={{ padding: '5%' }}>
                            <Box style={{ width: '100%', overflow: 'hidden', borderRadius: '2.5px' }}>
                                <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="img-04.jpg" alt="image" />
                            </Box>
                            <Box style={{ width: '100%', margin: '15px 0' }}>
                                <Grid container spacing={0}>
                                    <Grid item xs={9} sm={9} md={9}>
                                        <Typography variant="h5" gutterBottom>Artwork title</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={3} style={{ textAlign: 'right', alignSelf: 'center' }}>
                                        <Typography variant="subtitle2" color='primary'>0.5ETH</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography variant="body2">Created by: Nguyen Phuc</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box style={{ width: '100%' }}>
                                <Button variant="contained">Buy now</Button>
                                <Button variant="text">View details</Button>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper style={{ padding: '5%' }}>
                            <Box style={{ width: '100%', overflow: 'hidden', borderRadius: '2.5px' }}>
                                <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="img-05.jpg" alt='product' />
                            </Box>
                            <Box style={{ width: '100%', margin: '15px 0' }}>
                                <Grid container spacing={0}>
                                    <Grid item xs={9} sm={9} md={9}>
                                        <Typography variant="h5" gutterBottom>Artwork title</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={3} style={{ textAlign: 'right', alignSelf: 'center' }}>
                                        <Typography variant="subtitle2" color='primary'>0.5ETH</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography variant="body2">Created by: Nguyen Phuc</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box style={{ width: '100%' }}>
                                <Button variant="contained">Buy now</Button>
                                <Button variant="text">View details</Button>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper style={{ padding: '5%' }}>
                            <Box style={{ width: '100%', overflow: 'hidden', borderRadius: '2.5px' }}>
                                <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="img-06.jpg" alt='product' />
                            </Box>
                            <Box style={{ width: '100%', margin: '15px 0' }}>
                                <Grid container spacing={0}>
                                    <Grid item xs={9} sm={9} md={9}>
                                        <Typography variant="h5" gutterBottom>Artwork title</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={3} style={{ textAlign: 'right', alignSelf: 'center' }}>
                                        <Typography variant="subtitle2" color='primary'>0.5ETH</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography variant="body2">Created by: Nguyen Phuc</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box style={{ width: '100%' }}>
                                <Button variant="contained">Buy now</Button>
                                <Button variant="text">View details</Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', margin: '30px 0' }}>
                <Pagination count={10} page={page} onChange={handlePageChange} />
            </Box>
        </Container>

        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={confirmPurchase} onClick={handleNoConirmPurchase}>
            <Paper elevation={3}>hello</Paper>
        </Backdrop>

        </>
    );
}
 
export default NFTDetail;