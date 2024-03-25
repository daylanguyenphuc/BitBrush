import { useState } from "react";
import React from "react";
import { Container, Box, Typography, Avatar, Tab, Grid, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Chip, Slider, Paper, Button, Pagination, IconButton, Card, CardMedia, CardContent, CardActions, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Accordion, AccordionDetails, AccordionSummary, Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const User = () => {
    // Param
    const {id} = useParams();
    const { data: user, userIsLoading, usetError } = useFetch(`https://localhost:7145/User/${id}`);

    // Confirm purchase function
    const [confirmPurchase, setConfirmPurchase] = React.useState(false);
    const handleNoConirmPurchase = () => {
        setConfirmPurchase(false);
    };
    const handleConfirmPurchase = () => {
        setConfirmPurchase(true);
    };
    const handlePurchase = () => {
        console.log("purcharse");
    };

    // Change tab function
    const [tab, setTab] = useState('1');
    const handleChangeTab = (event, newTab) => {
        setTab(newTab);
    };

    // Created by me tab functions
    // Get data
    const { data: createdNfts, isLoading: isCreatedNftsLoading, error: createdNftsError } = useFetch(`https://localhost:7145/Product?creatorId=${id}`);

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
    // Get data
    const { data: ownedNfts, isLoading: isOwnedNftsLoading, error: ownedNftsError } = useFetch(`https://localhost:7145/Product?ownerId=${id}`);

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
    // Get data
    const { data: collections, collectionIsLoading, collecctionError } = useFetch(`https://localhost:7145/Collection?creatorId=${id}`);

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
    const { data: transactions, transactionsIsLoading, transactionsError } = useFetch(`https://localhost:7145/Transaction/GetTransactionsByUserId?id=${id}`);

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
                    <Avatar alt={ user && user.firstName} src="/static/images/avatar/2.jpg" style={{ margin: '0 auto', height: '120px', width: '120px' }} />
                    <Typography variant="h2" gutterBottom style={{ marginTop: '20px' }} >{ user && user.firstName} { user && user.lastName}</Typography>
                    <Typography variant="subtitle1" gutterBottom >User ID: { user && user.id}</Typography>
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
                            <Typography variant="body1" gutterBottom><b>User ID: </b>{ user && user.id}</Typography>
                            <Typography variant="body1" gutterBottom><b>Phone number: </b>{ user && <a href={`tel:${user.phone}`}>{user.phone}</a> }</Typography>
                            <Typography variant="body1" gutterBottom><b>Email: </b>{ user && <a href={`mailto:${user.mail}`}>{user.mail}</a> }</Typography>
                            <Typography variant="body1" gutterBottom><b>Gender: </b>{ user && user.gender == 'm' ? 'Male' : 'Female'}</Typography>
                            <Typography variant="body1" gutterBottom><b>Birthdate: </b>{ user && user.birthdate}</Typography>
                            <Typography variant="body1" gutterBottom><b>Join date: </b>{ user && user.joinDate}</Typography>
                        </TabPanel>
                        <TabPanel value="2">
                            <Box>
                                <Grid container spacing={2}>
                                    { createdNfts && createdNfts.map( nft => (
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
                                    ))}
                                </Grid>
                            </Box>
                        </TabPanel>
                        <TabPanel value="3">
                            <Box>
                                <Grid container spacing={2}>
                                    { ownedNfts && ownedNfts.map( nft => (
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
                                    ))}
                                </Grid>
                            </Box>
                        </TabPanel>
                        <TabPanel value="4">
                            <Box>
                                <Grid container spacing={2}>
                                    {collections && collections.map( collection => (
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Card>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image="https://i.pinimg.com/564x/02/ff/1f/02ff1feafd330a5e3e7010554c8f0941.jpg"
                                                    alt="test image"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">{collection.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">{collection.description}</Typography>
                                                    {/* <Typography variant="body2" color="text.secondary">54 items</Typography> */}
                                                    <Typography variant="body2" color="text.secondary">by {collection.creator.firstName} {collection.creator.lastName}</Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Link to={`/collectiondetail/${collection.id}`}><Button size="small" color="primary">Discover collection</Button></Link>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </TabPanel>
                        <TabPanel value="5">
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Transaction ID</TableCell>
                                            <TableCell align="left">NFT ID</TableCell>
                                            <TableCell align="left">Asset name</TableCell>
                                            <TableCell align="left">Price</TableCell>
                                            <TableCell align="left">From</TableCell>
                                            <TableCell align="left">To</TableCell>
                                            <TableCell align="left">Date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {transactions && transactions.map((transaction) => (
                                            <TableRow key={transaction.id}>
                                                <TableCell>{transaction.id}</TableCell>
                                                <TableCell>{transaction.product.id}</TableCell>
                                                <TableCell>{transaction.product.name}</TableCell>
                                                <TableCell>{transaction.price} ETH</TableCell>
                                                <TableCell>{transaction.seller.id}</TableCell>
                                                <TableCell>{transaction.buyer.id}</TableCell>
                                                <TableCell>{transaction.time}</TableCell>
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