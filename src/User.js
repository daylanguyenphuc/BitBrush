import { useState } from "react";
import React from "react";
import { Container, Box, Typography, Avatar, Tab, Grid, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Chip, Slider, Paper, Button, Pagination, IconButton, Card, CardMedia, CardContent, CardActions, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SearchIcon from '@mui/icons-material/Search';

const User = () => {

    // Change tab function
    const [tab, setTab] = useState('1');
    const handleChangeTab = (event, newTab) => {
        setTab(newTab);
    };

    // Created by me tab functions
    // Search by name function
    const [createSearchTerm, setCreateSearchTerm] = useState('');
    const handleCreateSearchChange = (event) => {
        setCreateSearchTerm(event.target.value);
        // Add your search logic here
    };

    // Filter by tags function
    const [unselectedCreateTags, setCreateUnselectedTags] = useState(['Painting and drawing', 'Vector art', '3D model', 'Pixel art', '2D animation', '3D animation']);
    const [selectedCreateTags, setCreateSelectedTags] = useState([]);
    const handleCreateTagClick = (tag) => {
        setCreateUnselectedTags((prevTags) => prevTags.filter((t) => t !== tag));
        setCreateSelectedTags((prevTags) => [...prevTags, tag]);
    };
    const handleCreateTagDelete = (tag) => {
        setCreateUnselectedTags((prevTags) => [...prevTags, tag]);
        setCreateSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
    };

    // Sort function
    const [createSort, setCreateSort] = useState('');
    const handleCreateSort = (event) => {
        setCreateSort(event.target.value);
    };

    // Filter by price range function
    function valuetext(value) {
        return `${value.toFixed(2)} ETH`; // Format value to display two decimal places
    }
    const minCreateDistance = 0.5;
    const maxCreatePrice = 10;
    const [createPriceFilterRange, setCreatePriceFilterRange] = React.useState([0, 5]); // Set initial range
    const handleChangeCreatePriceRange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        // Clamp values within the specified range
        const clampedValue = (value) => Math.min(Math.max(value, 0), maxCreatePrice);
        if (newValue[1] - newValue[0] < minCreateDistance) {
            if (activeThumb === 0) {
                const clamped = clampedValue(newValue[0]);
                setCreatePriceFilterRange([clamped, clamped + minCreateDistance]);
            } else {
                const clamped = clampedValue(newValue[1] - minCreateDistance);
                setCreatePriceFilterRange([clamped, clamped + minCreateDistance]);
            }
        } else {
            setCreatePriceFilterRange([clampedValue(newValue[0]), clampedValue(newValue[1])]);
        }
    };

    // Pagination
    const [createPage, setCreatePage] = useState(1);
    const handleCreatePageChange = (event, value) => { setCreatePage(value); }

    // Owned by me tab functions
    // Search by name function
    const [ownedSearchTerm, setOwnedSearchTerm] = useState('');
    const handleOwnedSearchChange = (event) => {
        setOwnedSearchTerm(event.target.value);
        // Add your search logic here
    };

    // Filter by tags function
    const [unselectedOwnedTags, setUnselectedOwnedTags] = useState(['Painting and drawing', 'Vector art', '3D model', 'Pixel art', '2D animation', '3D animation']);
    const [selectedOwnedTags, setSelectedOwnedTags] = useState([]);
    const handleOwnedTagClick = (tag) => {
        setUnselectedOwnedTags((prevTags) => prevTags.filter((t) => t !== tag));
        setSelectedOwnedTags((prevTags) => [...prevTags, tag]);
    };
    const handleOwnedTagDelete = (tag) => {
        setUnselectedOwnedTags((prevTags) => [...prevTags, tag]);
        setSelectedOwnedTags((prevTags) => prevTags.filter((t) => t !== tag));
    };

    // Sort function
    const [ownedSort, setOwnedSort] = useState('');
    const handleOwnedSort = (event) => {
        setOwnedSort(event.target.value);
    };

    // Filter by price range function
    const minOwnedDistance = 0.5;
    const maxOwnedPrice = 10;
    const [ownedPriceFilterRange, setOwnedFilterPriceRange] = React.useState([0, 5]); // Set initial range
    const handleChangeOwnedPriceRange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        // Clamp values within the specified range
        const clampedValue = (value) => Math.min(Math.max(value, 0), maxOwnedPrice);
        if (newValue[1] - newValue[0] < minOwnedDistance) {
            if (activeThumb === 0) {
                const clamped = clampedValue(newValue[0]);
                setOwnedFilterPriceRange([clamped, clamped + minOwnedDistance]);
            } else {
                const clamped = clampedValue(newValue[1] - minOwnedDistance);
                setOwnedFilterPriceRange([clamped, clamped + minOwnedDistance]);
            }
        } else {
            setOwnedFilterPriceRange([clampedValue(newValue[0]), clampedValue(newValue[1])]);
        }
    };

    // Pagination
    const [ownedPage, setOwnedPage] = useState(1);
    const handleOwnedPageChange = (event, value) => { setOwnedPage(value); }

    // Collection tab functions
    // Search by name function
    const [collectionSearchTerm, setCollectionSearchTerm] = useState('');
    const handleCollectionSearchChange = (event) => {
        setCollectionSearchTerm(event.target.value);
        // Add your search logic here
    };

    // Pagination
    const [collectionPage, setCollectionPage] = useState(1);
    const handleCollectionPageChange = (event, value) => { setCollectionPage(value); }

    // Transaction history tab functions
    const transactionHistory = [
        { id: 1, event: 'Buy', itemId: 12, itemName: 'CosmicArt Ephemerals', price: '0.007 ETH', from: '0x173f...4k8df', to: '0x417f...c8883', date: '30/01/2024 14:51:13 PM', transactionId: '0xa3f4...e47c24' },
        { id: 2, event: 'Buy', itemId: 12381, itemName: 'Quantum Visions', price: '1.27 ETH', from: '0x173f...4k8df', to: '0x417f...c8883', date: '30/01/2024 14:51:13 PM', transactionId: '0xa3f4...e47c24' },
        { id: 3, event: 'Sell', itemId: 39, itemName: 'NeonDream Synchronicity', price: '0.21 ETH', from: '0x173f...4k8df', to: '0x417f...c8883', date: '30/01/2024 14:51:13 PM', transactionId: '0xa3f4...e47c24' },
        { id: 4, event: 'Buy', itemId: 13, itemName: 'CelestrialHarmony Creations', price: '0.11 ETH', from: '0x173f...4k8df', to: '0x417f...c8883', date: '30/01/2024 14:51:13 PM', transactionId: '0xa3f4...e47c24' },
        { id: 5, event: 'Buy', itemId: 107, itemName: 'RetroFuturist Realms', price: '0.02 ETH', from: '0x173f...4k8df', to: '0x417f...c8883', date: '30/01/2024 14:51:13 PM', transactionId: '0xa3f4...e47c24' },
        { id: 6, event: 'Sell', itemId: 9807, itemName: 'EtherealEcho Explorations', price: '1.39 ETH', from: '0x173f...4k8df', to: '0x417f...c8883', date: '30/01/2024 14:51:13 PM', transactionId: '0xa3f4...e47c24' },
    ]

    return (

        <>
            <Container
                maxWidth="xl"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginTop: '50px',
                    marginBottom: '50px'
                }}
            >
                <Box style={{ textAlign: 'center' }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" style={{ margin: '0 auto', height: '120px', width: '120px' }} />
                    <Typography variant="h2" gutterBottom style={{ marginTop: '20px' }} >John Doe</Typography>
                    <Typography variant="subtitle1" gutterBottom >User ID: 564a3c5f-784c-40ed-b46d-6a1f5ef0f1cd</Typography>
                </Box>
            </Container>
            <Container maxWidth="xl">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                                <Tab label="Personal information" value="1" />
                                <Tab label="Created NFTs" value="2" />
                                <Tab label="Owned NFTs" value="3" />
                                <Tab label="Collections" value="4" />
                                <Tab label="Transaction history" value="5" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Typography variant="body1" gutterBottom><b>User ID: </b>564a3c5f-784c-40ed-b46d-6a1f5ef0f1cd</Typography>
                            <Typography variant="body1" gutterBottom><b>Phone number: </b><a href="tel:1234567890">1234567890</a></Typography>
                            <Typography variant="body1" gutterBottom><b>Email: </b><a href="mailto:johndoe@gmail.com">johndoe@gmail.com</a></Typography>
                            <Typography variant="body1" gutterBottom><b>Gender: </b>Male</Typography>
                            <Typography variant="body1" gutterBottom><b>Birthdate: </b>01/01/1990</Typography>
                            <Typography variant="body1" gutterBottom><b>Join date: </b>01/01/2020</Typography>
                        </TabPanel>
                        <TabPanel value="2">
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: '20px'
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={8} sm={8} md={8}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            label="Search for NFTs"
                                            value={createSearchTerm}
                                            onChange={handleCreateSearchChange}
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
                                                    value={createSort}
                                                    label="Sort by"
                                                    onChange={handleCreateSort}
                                                >
                                                    <MenuItem value={'newest'}>Newest</MenuItem>
                                                    <MenuItem value={'oldest'}>Oldest</MenuItem>
                                                    <MenuItem value={'priceLow'}>Price: Low to high</MenuItem>
                                                    <MenuItem value={'priceHigh'}>Price: High to low</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography variant="body2" style={{ display: 'inline' }} gutterBottom>Tags: </Typography>
                                        {selectedCreateTags.map((tag, index) => (
                                            <Chip
                                                key={index}
                                                label={tag}
                                                onDelete={() => handleCreateTagDelete(tag)}
                                                color="primary"
                                                style={{ margin: '4px' }}
                                            />
                                        ))}
                                        {unselectedCreateTags.map((tag, index) => (
                                            <Chip
                                                key={index}
                                                label={tag}
                                                onClick={() => handleCreateTagClick(tag)}
                                                style={{ margin: '4px', cursor: 'pointer' }}
                                            />
                                        ))}
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: '16px' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="body2" sx={{ marginRight: '16px' }}>Price range: from {valuetext(createPriceFilterRange[0])}</Typography>
                                            <Slider
                                                getAriaLabel={() => 'Minimum distance shift'}
                                                value={createPriceFilterRange}
                                                onChange={handleChangeCreatePriceRange}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                                min={0}
                                                max={maxCreatePrice}
                                                step={0.01}
                                                disableSwap
                                                sx={{ width: '300px' }}
                                            />
                                            <Typography variant="body2" sx={{ marginLeft: '16px' }}>to {valuetext(createPriceFilterRange[1])}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper style={{ padding: '5%' }}>
                                            <Box style={{ width: '100%', overflow: 'hidden', borderRadius: '2.5px' }}>
                                                <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="img-01.jpg" alt="image" />
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
                                                <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="img-05.jpg" alt='image' />
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
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    height: '20vh',
                                }}
                            >
                                <Pagination count={10} page={createPage} onChange={handleCreatePageChange} />
                            </Box>
                        </TabPanel>
                        <TabPanel value="3">
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: '20px'
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={8} sm={8} md={8}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            label="Search for NFTs"
                                            value={ownedSearchTerm}
                                            onChange={handleOwnedSearchChange}
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
                                                    value={ownedSort}
                                                    label="Sort by"
                                                    onChange={handleOwnedSort}
                                                >
                                                    <MenuItem value={'newest'}>Newest</MenuItem>
                                                    <MenuItem value={'oldest'}>Oldest</MenuItem>
                                                    <MenuItem value={'priceLow'}>Price: Low to high</MenuItem>
                                                    <MenuItem value={'priceHigh'}>Price: High to low</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography variant="body2" style={{ display: 'inline' }} gutterBottom>Tags: </Typography>
                                        {selectedOwnedTags.map((tag, index) => (
                                            <Chip
                                                key={index}
                                                label={tag}
                                                onDelete={() => handleOwnedTagDelete(tag)}
                                                color="primary"
                                                style={{ margin: '4px' }}
                                            />
                                        ))}
                                        {unselectedOwnedTags.map((tag, index) => (
                                            <Chip
                                                key={index}
                                                label={tag}
                                                onClick={() => handleOwnedTagClick(tag)}
                                                style={{ margin: '4px', cursor: 'pointer' }}
                                            />
                                        ))}
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: '16px' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="body2" sx={{ marginRight: '16px' }}>Price range: from {valuetext(ownedPriceFilterRange[0])}</Typography>
                                            <Slider
                                                getAriaLabel={() => 'Minimum distance shift'}
                                                value={ownedPriceFilterRange}
                                                onChange={handleChangeOwnedPriceRange}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                                min={0}
                                                max={maxOwnedPrice}
                                                step={0.01}
                                                disableSwap
                                                sx={{ width: '300px' }}
                                            />
                                            <Typography variant="body2" sx={{ marginLeft: '16px' }}>to {valuetext(ownedPriceFilterRange[1])}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper style={{ padding: '5%' }}>
                                            <Box style={{ width: '100%', overflow: 'hidden', borderRadius: '2.5px' }}>
                                                <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="img-06.jpg" alt="image" />
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
                                                <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="img-07.jpg" alt="image" />
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
                                                <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="img-08.jpg" alt="image" />
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
                                                <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="img-09.jpg" alt="image" />
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
                                                <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="img-10.jpg" alt='product' />
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
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    height: '20vh',
                                }}
                            >
                                <Pagination count={10} page={ownedPage} onChange={handleOwnedPageChange} />
                            </Box>
                        </TabPanel>
                        <TabPanel value="4">
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: '20px'
                                }}
                            >
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Search for collections"
                                    value={collectionSearchTerm}
                                    onChange={handleCollectionSearchChange}
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
                            </Box>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image="collection-01.jpg"
                                                alt="test image"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">Collection</Typography>
                                                <Typography variant="body2" color="text.secondary">Collection description here</Typography>
                                                <Typography variant="body2" color="text.secondary">54 items</Typography>
                                                <Typography variant="body2" color="text.secondary">by Nguyen Phuc</Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary">Discover collection</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image="collection-02.jpg"
                                                alt="test image"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">Collection</Typography>
                                                <Typography variant="body2" color="text.secondary">Collection description here</Typography>
                                                <Typography variant="body2" color="text.secondary">54 items</Typography>
                                                <Typography variant="body2" color="text.secondary">by Nguyen Phuc</Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary">Discover collection</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image="collection-03.jpg"
                                                alt="test image"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">Collection</Typography>
                                                <Typography variant="body2" color="text.secondary">Collection description here</Typography>
                                                <Typography variant="body2" color="text.secondary">54 items</Typography>
                                                <Typography variant="body2" color="text.secondary">by Nguyen Phuc</Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary">Discover collection</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    height: '20vh',
                                }}
                            >
                                <Pagination count={10} page={collectionPage} onChange={handleCollectionPageChange} />
                            </Box>
                        </TabPanel>
                        <TabPanel value="5">
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Event</TableCell>
                                            <TableCell align="left">Item ID</TableCell>
                                            <TableCell align="left">Asset name</TableCell>
                                            <TableCell align="left">Price</TableCell>
                                            <TableCell align="left">From</TableCell>
                                            <TableCell align="left">To</TableCell>
                                            <TableCell align="left">Date</TableCell>
                                            <TableCell align="left">Transaction ID</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {transactionHistory.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.event}</TableCell>
                                                <TableCell>{row.itemId}</TableCell>
                                                <TableCell>{row.itemName}</TableCell>
                                                <TableCell>{row.price}</TableCell>
                                                <TableCell>{row.from}</TableCell>
                                                <TableCell>{row.to}</TableCell>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell>{row.transactionId}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                    </TabContext>
                </Box>
            </Container>
        </>
    );
}

export default User;