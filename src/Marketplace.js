import React, { useState } from "react";
import { Container, Grid, Typography, TextField, InputAdornment, IconButton, Chip, Select, MenuItem, InputLabel, Box, FormControl, Slider, Pagination, Paper, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Marketplace = () => {

    // Search by name function
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        // Add your search logic here
    };

    // Filter by tags function
    const [unselectedTags, setUnselectedTags] = useState(['Painting and drawing','Vector art','3D model','Pixel art','2D animation','3D animation']);
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
        return `${value} ETH`;
    }
    const minDistance = 10;
    const [priceFilterRange, setFilterPriceRange] = React.useState([20, 37]);
    const handleChangePriceRange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
          return;
        }
        if (newValue[1] - newValue[0] < minDistance) {
          if (activeThumb === 0) {
            const clamped = Math.min(newValue[0], 100 - minDistance);
            setFilterPriceRange([clamped, clamped + minDistance]);
          } else {
            const clamped = Math.max(newValue[1], minDistance);
            setFilterPriceRange([clamped - minDistance, clamped]);
          }
        } else {
            setFilterPriceRange(newValue);
        }
    };

    // Pagination
    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => { setPage(value); }

    return (  
        <>
        <Container maxWidth="xl">
            <Typography variant="h1" gutterBottom>Marketplace</Typography>
            <Typography variant="h3" gutterBottom>Browse through more than 50K NFTs on the BrushBit Marketplace.</Typography>
        </Container>
        <Container
            maxWidth="xl"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '35vh',
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={8} sm={8} md={8}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Search for collections"
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
                    <Typography variant="body" gutterBottom>Tags: </Typography>
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
                        <Typography variant="body" sx={{ marginRight: '16px' }}>Price range: from {valuetext(priceFilterRange[0])}</Typography>
                        <Slider
                            getAriaLabel={() => 'Minimum distance shift'}
                            value={priceFilterRange}
                            onChange={handleChangePriceRange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            disableSwap
                            sx={{ width: '300px' }}
                        />
                        <Typography variant="body" sx={{ marginLeft: '16px' }}>to {valuetext(priceFilterRange[1])}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper style={{ padding: '5%'}}>
                        <Box style={{ width: '100%', overflow: 'hidden', borderRadius: '2.5px'}}>
                            <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="image.jpg" alt="image"/>
                        </Box>
                        <Box style={{ width: '100%', margin: '15px 0' }}>
                            <Typography variant="h5" gutterBottom>Heading</Typography>
                            <Typography variant="body2">Created by: Nguyen Phuc</Typography>
                            <Typography variant="subtitle1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                        </Box>
                        <Box style={{ width: '100%' }}>
                            <Button variant="contained">Buy now</Button>
                            <Button variant="text">View details</Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper style={{ padding: '5%'}}>
                        <Box style={{ width: '100%', overflow: 'hidden', borderRadius: '2.5px'}}>
                            <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="image.jpg" alt="image"/>
                        </Box>
                        <Box style={{ width: '100%', margin: '15px 0' }}>
                            <Typography variant="h5" gutterBottom>Heading</Typography>
                            <Typography variant="body2">Created by: Nguyen Phuc</Typography>
                            <Typography variant="subtitle1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                        </Box>
                        <Box style={{ width: '100%' }}>
                            <Button variant="contained">Buy now</Button>
                            <Button variant="text">View details</Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper style={{ padding: '5%'}}>
                        <Box style={{ width: '100%', overflow: 'hidden', borderRadius: '2.5px'}}>
                            <img style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center center' }} src="image.jpg" alt="image"/>
                        </Box>
                        <Box style={{ width: '100%', margin: '15px 0' }}>
                            <Typography variant="h5" gutterBottom>Heading</Typography>
                            <Typography variant="body2">Created by: Nguyen Phuc</Typography>
                            <Typography variant="subtitle1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                        </Box>
                        <Box style={{ width: '100%' }}>
                            <Button variant="contained">Buy now</Button>
                            <Button variant="text">View details</Button>
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
                height : '20vh',
            }}
        >
            <Pagination count={10} page={page} onChange={handlePageChange} />
        </Container>
        </>
    );
}
 
export default Marketplace;