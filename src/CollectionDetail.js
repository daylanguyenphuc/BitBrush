import React, { useState } from "react";
import { Container, Grid, Typography, TextField, InputAdornment, IconButton, Chip, Select, MenuItem, InputLabel, Box, FormControl, Slider, Pagination, Paper, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const CollectionDetail = () => {

    // Search by name function
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        // Add your search logic here
    };

    // Filter by tags function
    const [unselectedTags, setUnselectedTags] = useState(['Painting and drawing', 'Vector art', '3D model', 'Pixel art', '2D animation', '3D animation']);
    const [selectedTags, setSelectedTags] = useState([]);
    const handleTagClick = (tag) => {
        setUnselectedTags((prevTags) => prevTags.filter((t) => t !== tag));
        setSelectedTags((prevTags) => [...prevTags, tag]);
    };
    const handleTagDelete = (tag) => {
        setUnselectedTags((prevTags) => [...prevTags, tag]);
        setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
    };

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
    const [priceFilterRange, setFilterPriceRange] = React.useState([0, 5]); // Set initial range
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

    // Pagination
    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => { setPage(value); }

    return (
        <>
            <Container maxWidth="xl" style={{ marginTop: '50px', marginBottom: '20px' }}>
                <Typography variant="h3" style={{ fontWeight: 'bold', textTransform: 'uppercase'}} gutterBottom>Collection name here</Typography>
                <Typography variant="body1" gutterBottom>Descreption: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac tellus id risus gravida elementum eu nec ipsum. Maecenas dignissim sem scelerisque, finibus elit ac, consectetur eros. Pellentesque metus nibh, consequat at sodales fermentum, bibendum ut ante. Sed viverra imperdiet diam, quis ullamcorper ligula pharetra eget. Vestibulum tempus risus a urna dictum sollicitudin. Maecenas sagittis erat sed eros rutrum tempus.</Typography>
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
                    </Grid>
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
            <Container maxWidth="xl">
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
                                <Link to='/nftdetail'><Button variant="text">View details</Button></Link>
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
                                <Link to='/nftdetail'><Button variant="text">View details</Button></Link>
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
                                <Link to='/nftdetail'><Button variant="text">View details</Button></Link>
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
                                <Link to='/nftdetail'><Button variant="text">View details</Button></Link>
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
                                <Link to='/nftdetail'><Button variant="text">View details</Button></Link>
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
                                <Link to='/nftdetail'><Button variant="text">View details</Button></Link>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper style={{ padding: '5%' }}>
                            <Box style={{ width: '100%', overflow: 'hidden', borderRadius: '2.5px' }}>
                                <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="img-07.jpg" alt='product' />
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
                                <Link to='/nftdetail'><Button variant="text">View details</Button></Link>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper style={{ padding: '5%' }}>
                            <Box style={{ width: '100%', overflow: 'hidden', borderRadius: '2.5px' }}>
                                <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="img-08.jpg" alt='product' />
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
                                <Link to='/nftdetail'><Button variant="text">View details</Button></Link>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper style={{ padding: '5%' }}>
                            <Box style={{ width: '100%', overflow: 'hidden', borderRadius: '2.5px' }}>
                                <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="img-09.jpg" alt='product' />
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
                                <Link to='/nftdetail'><Button variant="text">View details</Button></Link>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Container
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
            </Container>
        </>
    );
}

export default CollectionDetail;