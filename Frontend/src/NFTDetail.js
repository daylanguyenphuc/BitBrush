import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Container, Typography, Grid, Box, Avatar, Chip, Button, Paper, Pagination, Accordion, AccordionDetails, AccordionSummary, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import useFetchParam from "./useFetchParam";

const NFTDetail = () => {
    // Parameter
    const {id} = useParams();
    const { data: nft, isLoading, error } = useFetch(`https://localhost:7145/Product/${id}`);

    // Explore more funcition
    const [filterParam, setFilterParam] = useState({});
    useEffect(() => {
        setFilterParam({
            creatorId: id,
        });
    }, []);
    const {data: exploreNfts, isLoading: exploreNftsIsLoading, error: exploreNftsError} = useFetchParam('https://localhost:7145/Product', filterParam);


    // Confirm purchase function
    // const [confirmPurchase, setConfirmPurchase] = React.useState(false);
    // const handleNoConirmPurchase = () => {
    //     setConfirmPurchase(false);
    // };
    const handleConfirmPurchase = () => {
        // setConfirmPurchase(true);
    };
    // const handlePurchase = () => {
    //     console.log("purcharse");
    // };

    return (

        <>

            <Container maxWidth="xl" style={{ marginTop: '50px', marginBottom: '20px' }}>
                <Typography variant="h2" style={{ fontWeight: 'bold', textTransform: 'uppercase' }} gutterBottom>NFT details</Typography>
            </Container>
            <Container maxWidth="xl" style={{ marginBottom: '50px' }}>
                <Grid container spacing={10}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Box style={{ width: '100%', overflow: 'hidden', borderRadius: '2.5px' }}>
                            <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src={nft && nft.thumbnailUrl} alt="image" />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Box>
                            <Typography variant="h4" style={{ fontWeight: 'bold' }}>{nft && nft.name}</Typography>
                            <Typography variant="subtitle1" gutterBottom>Created date: 20/01/2024 15:19:13</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={6} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar alt='created artist' src={``} />
                                    <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>Created: <Link to={ nft && `/user/${nft.creator.id}`}>{nft && nft.creator.firstName} {nft && nft.creator.lastName}</Link></Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar alt='owned' src={``} />
                                    <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>Owned: <Link to={ nft && `/user/${nft.owner.id}`}>{nft && nft.owner.firstName} {nft && nft.owner.lastName}</Link></Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="h4" color='primary' gutterBottom style={{ fontWeight: 'bold', margin: '30px 0' }}>{nft && nft.price} ETH</Typography>
                            <Typography variant="h6">Description</Typography>
                            <Typography variant="body1" gutterBottom >{nft && nft.description}</Typography>
                            <Typography variant="h6">Collection</Typography>
                            <Typography variant="body1" gutterBottom >{nft && nft.collection.name}</Typography>
                            <Typography variant="h6">Tags</Typography>
                            <Chip key={1} label={'Vector art'} color="primary" style={{ margin: '4px' }} />
                            <Chip key={2} label={'2D animation'} color="primary" style={{ margin: '4px' }} />
                            <Button variant="contained" color="primary" fullWidth style={{ marginTop: '50px' }} onClick={handleConfirmPurchase}>Buy now</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            {/* <Container maxWidth="xl">
                <Box style={{ margin: '60px 0', textAlign: 'center' }}>
                    <Typography variant="h3" gutterBottom>More from this creator</Typography>
                </Box>
                <Box>
                <Grid container spacing={2}>
                        {exploreNfts && exploreNfts.map( nft => (
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper style={{ padding: '5%' }}>
                                    <Box style={{ width: '100%', overflow: 'hidden', borderRadius: '2.5px' }}>
                                        <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src={nft.thumbnailUrl} alt="image" />
                                    </Box>
                                    <Box style={{ width: '100%', margin: '15px 0' }}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={9} sm={9} md={9}>
                                                <Typography variant="h5" gutterBottom>{nft.name}</Typography>
                                            </Grid>
                                            <Grid item xs={3} sm={3} md={3} style={{ textAlign: 'right', alignSelf: 'center' }}>
                                                <Typography variant="subtitle2" color='primary'>{nft.price} ETH</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12}>
                                                <Typography variant="body2">Created by: {nft.creator.firstName} {nft.creator.lastName}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box style={{ width: '100%' }}>
                                        <Link to={`/nftdetail/${nft.id}`} style={{ textDecoration: 'none' }}><Button variant="contained"><Typography variant="button" display="block">View details</Typography></Button></Link>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container> */}

            {/* <Dialog open={confirmPurchase} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Confirm your purchase"}</DialogTitle>
                <DialogContent>
                    <Box style={{ margin: '30px' }}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header"><Typography variant="subtitle1">NFT's information</Typography></AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3} md={3}>
                                        <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="img-03.jpg" alt='product' />
                                    </Grid>
                                    <Grid item xs={8} sm={6} md={6} >
                                        <Typography variant="subtitle1">NFT's name here</Typography>
                                        <Typography variant="body1">Created by: Nguyen Phuc</Typography>
                                        <Typography variant="body2" gutterBottom >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac tellus id risus gravida elementum eu nec ipsum. Maecenas dignissim sem scelerisque, finibus elit ac, consectetur eros. Pellentesque metus nibh, consequat at sodales fermentum, bibendum ut ante.</Typography>
                                    </Grid>
                                    <Grid item xs={4} sm={3} md={3} style={{ textAlign: 'center' }}>
                                        <Typography variant="body1" color='primary' >0.007 ETH</Typography>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header"><Typography variant="subtitle1">Purchase information</Typography></AccordionSummary>
                            <AccordionDetails>
                                <TableContainer>
                                    <Table size="small" aria-label="table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">Category</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell align="left">NFT's name here</TableCell>
                                                <TableCell align="right">0.007 ETH</TableCell>
                                            </TableRow>
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell align="left">Network fee</TableCell>
                                                <TableCell align="right">+ 0.02 ETH</TableCell>
                                            </TableRow>
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell align="left">Processing fee</TableCell>
                                                <TableCell align="right">+ 0.005 ETH</TableCell>
                                            </TableRow>
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell align="left">Total:</TableCell>
                                                <TableCell align="right">0.212 ETH</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header"><Typography variant="subtitle1">Address information</Typography></AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1" gutterBottom><b>From: </b>564a3c...f0f1cd</Typography>
                                <Typography variant="body1" gutterBottom><b>To: </b>4c40ed...f0f1cd</Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNoConirmPurchase} variant="text">Cancel purchase</Button>
                    <Button onClick={handlePurchase} variant="contained" autoFocus><Link to='/purchasecompleted' style={{ color: 'white', textDecoration: 'none' }}>Confirm purchase</Link></Button>
                </DialogActions>
            </Dialog> */}

        </>
    );
}

export default NFTDetail;