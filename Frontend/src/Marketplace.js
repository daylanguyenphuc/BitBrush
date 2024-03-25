import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, TextField, InputAdornment, IconButton, Chip, Select, MenuItem, InputLabel, Box, FormControl, Slider, Pagination, Paper, Button, Accordion, AccordionDetails, AccordionSummary, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useFetch from "./useFetch";
import useFetchParam from "./useFetchParam";
import { curentUser } from './Const';

const Marketplace = () => {

    // Search by name function
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        // Add your search logic here
    };

    // // Filter by tags function
    // const [unselectedTags, setUnselectedTags] = useState(['Painting and drawing', 'Vector art', '3D model', 'Pixel art', '2D animation', '3D animation']);
    // const [selectedTags, setSelectedTags] = useState([]);
    // const handleTagClick = (tag) => {
    //     setUnselectedTags((prevTags) => prevTags.filter((t) => t !== tag));
    //     setSelectedTags((prevTags) => [...prevTags, tag]);
    // };
    // const handleTagDelete = (tag) => {
    //     setUnselectedTags((prevTags) => [...prevTags, tag]);
    //     setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
    // };

    // Sort function
    const [sort, setSort] = useState('');
    const handleSort = (event) => {
        setSort(event.target.value);
    };

    // Filter by price range function
    function valuetext(value) {
        return `${value.toFixed(2)} ETH`; // Format value to display two decimal places
    }
    const minDistance = 0.5;
    const maxPrice = 10;
    const [priceFilterRange, setFilterPriceRange] = React.useState([0, 10]); // Set initial range
    const handleChangePriceRange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        // Clamp values within the specified range
        const clampedValue = (value) => Math.min(Math.max(value, 0), maxPrice);
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = clampedValue(newValue[0]);
                setFilterPriceRange([clamped, clamped + minDistance]);
            } else {
                const clamped = clampedValue(newValue[1] - minDistance);
                setFilterPriceRange([clamped, clamped + minDistance]);
            }
        } else {
            setFilterPriceRange([clampedValue(newValue[0]), clampedValue(newValue[1])]);
        }
    };

    // Get data
    const [filterParam, setFilterParam] = useState({});
    useEffect(() => {
        setFilterParam({
            name: searchTerm,
            sort: sort,
            minPrice: priceFilterRange[0],
            maxPrice: priceFilterRange[1],
            sellingStatus: true
        });
    }, [searchTerm, sort, priceFilterRange]);
    const {data: nfts, isLoading, error} = useFetchParam('https://localhost:7145/Product', filterParam);

    // Pagination
    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => { setPage(value); }

    return (
        <>
            <Container maxWidth="xl" style={{ marginTop: '50px', marginBottom: '20px' }}>
                <Typography
                    variant="h2"
                    style={{
                        textTransform: 'uppercase',
                        fontSize: '3rem',
                    }}
                    gutterBottom
                >
                    Marketplace
                </Typography>
                <Typography variant="h5" gutterBottom>Browse through more than 50K NFTs on the BrushBit Marketplace.</Typography>
            </Container>

            <Container
                maxWidth="xl"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '3rem',
                    marginBottom: '1rem'
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={8} sm={8} md={8}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Search for NFTs"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sort}
                                    label="Sort by"
                                    onChange={handleSort}
                                >
                                    <MenuItem value={'dateNew'}>Newest</MenuItem>
                                    <MenuItem value={'dateOld'}>Oldest</MenuItem>
                                    <MenuItem value={'priceLow'}>Price: Low to high</MenuItem>
                                    <MenuItem value={'priceHigh'}>Price: High to low</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={12}>
                        <Typography variant="body2" style={{ display: 'inline' }} gutterBottom>Tags: </Typography>
                        {selectedTags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                onDelete={() => handleTagDelete(tag)}
                                color="primary"
                                style={{ margin: '4px' }}
                            />
                        ))}
                        {unselectedTags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                onClick={() => handleTagClick(tag)}
                                style={{ margin: '4px', cursor: 'pointer' }}
                            />
                        ))}
                    </Grid> */}
                    <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: '16px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ marginRight: '16px' }}>Price range: from {valuetext(priceFilterRange[0])}</Typography>
                            <Slider
                                getAriaLabel={() => 'Minimum distance shift'}
                                value={priceFilterRange}
                                onChange={handleChangePriceRange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                min={0}
                                max={maxPrice}
                                step={0.01}
                                disableSwap
                                sx={{ width: '300px' }}
                            />
                            <Typography variant="body2" sx={{ marginLeft: '16px' }}>to {valuetext(priceFilterRange[1])}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="xl" style={{ marginBottom: '50px' }}>
                <Grid container spacing={2}>
                    { nfts && nfts.map (nft => (
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
            </Container>
            {/* <Container
                maxWidth="xl"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    height: '20vh',
                }}
            >
                <Pagination count={10} page={page} onChange={handlePageChange} />
            </Container> */}

        </>
    );
}

export default Marketplace;