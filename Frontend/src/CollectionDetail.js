import React, { useState } from "react";
import { Container, Grid, Typography, TextField, InputAdornment, IconButton, Chip, Select, MenuItem, InputLabel, Box, FormControl, Slider, Pagination, Paper, Button, Accordion, AccordionDetails, AccordionSummary, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Dialog, DialogTitle, DialogActions, DialogContent  } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { curentUser } from './Const';

const CollectionDetail = () => {
    // Parameter
    const {id} = useParams();
    const { data: collection, collectionIsLoading, collectionError } = useFetch(`https://localhost:7145/Collection/${id}`);
    const { data: nfts, nftsIsLoading, nftsEror } = useFetch(`https://localhost:7145/Product?collectionId=${id}`);

    return (
        <>
            <Container maxWidth="xl" style={{ marginTop: '50px', marginBottom: '20px' }}>
                <Typography variant="h3" style={{ fontWeight: 'bold', textTransform: 'uppercase'}} gutterBottom>{collection && collection.name}</Typography>
                <Typography variant="body1" gutterBottom>Descreption: {collection && collection.description}</Typography>
            </Container>
            
            <Container maxWidth="xl" style={{ marginBottom: '50px' }}>
                <Grid container spacing={2}>
                    {nfts && nfts.length > 0 ? ( // Checking if createdNfts exists and is not empty
                        nfts.map(nft => (
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
                                        <Link to={`/nftdetail/${nft.id}`}><Button variant="contained">View details</Button></Link>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))
                    ) : ( // If createdNfts is empty or not yet fetched
                        <Grid item xs={12} sm={12} md={12} style={{ textAlign: 'center', margin: '100px auto' }}>
                            <Typography variant="h4" gutterBottom style={{ color: '#d6d6d6' }}>There's nothing to show here</Typography>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </>
    );
}

export default CollectionDetail;