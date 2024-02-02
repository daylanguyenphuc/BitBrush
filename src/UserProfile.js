import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, InputAdornment, IconButton, Chip, Select, MenuItem, InputLabel, Box, FormControl, Slider, Pagination, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';

const UserProfile = () => {
  const transactionHistoryData = [
    { event: 'Buy', itemId: '12345', assetName: 'Image Name 1', price: '2.5 ETH', from: '2x291487931', to: 'xh149199231', date: '30/01/2024 14:51:13 PM' },
    { event: 'Sell', itemId: '67890', assetName: 'Image Name 2', price: '1.8 ETH', from: 'xh149199231', to: '2x291487931', date: '30/01/2024 15:30:45 PM' },
    { event: 'Buy', itemId: '24680', assetName: 'Image Name 3', price: '3.2 ETH', from: 'xh149199231', to: '2x291487931', date: '30/01/2024 16:20:22 PM' },
    { event: 'Sell', itemId: '13579', assetName: 'Image Name 4', price: '4.7 ETH', from: '2x291487931', to: 'xh149199231', date: '30/01/2024 17:15:18 PM' },
    { event: 'Buy', itemId: '54321', assetName: 'Image Name 5', price: '2.9 ETH', from: 'xh149199231', to: '2x291487931', date: '30/01/2024 18:42:10 PM' },
    { event: 'Sell', itemId: '98765', assetName: 'Image Name 6', price: '1.5 ETH', from: '2x291487931', to: 'xh149199231', date: '30/01/2024 19:01:55 PM' },
    { event: 'Buy', itemId: '11223', assetName: 'Image Name 7', price: '3.0 ETH', from: 'xh149199231', to: '2x291487931', date: '30/01/2024 20:30:33 PM' },
    { event: 'Sell', itemId: '33445', assetName: 'Image Name 8', price: '2.2 ETH', from: '2x291487931', to: 'xh149199231', date: '30/01/2024 21:11:47 PM' },
    { event: 'Buy', itemId: '55667', assetName: 'Image Name 9', price: '4.1 ETH', from: '2x291487931', to: 'xh149199231', date: '30/01/2024 22:45:29 PM' },
    { event: 'Sell', itemId: '77889', assetName: 'Image Name 10', price: '1.9 ETH', from: 'xh149199231', to: '2x291487931', date: '30/01/2024 23:58:14 PM' },
    { event: 'Buy', itemId: '99000', assetName: 'Image Name 11', price: '3.5 ETH', from: 'xh149199231', to: '2x291487931', date: '31/01/2024 00:25:59 AM' },
    { event: 'Sell', itemId: '11223', assetName: 'Image Name 12', price: '2.6 ETH', from: '2x291487931', to: 'xh149199231', date: '31/01/2024 01:40:42 AM' },
    { event: 'Buy', itemId: '33445', assetName: 'Image Name 13', price: '4.3 ETH', from: 'xh149199231', to: '2x291487931', date: '31/01/2024 02:15:30 AM' },
    { event: 'Sell', itemId: '55667', assetName: 'Image Name 14', price: '2.0 ETH', from: '2x291487931', to: 'xh149199231', date: '31/01/2024 03:12:55 AM' },
    { event: 'Buy', itemId: '77889', assetName: 'Image Name 15', price: '3.8 ETH', from: 'xh149199231', to: '2x291487931', date: '31/01/2024 04:05:29 AM' },
    { event: 'Sell', itemId: '99000', assetName: 'Image Name 16', price: '1.7 ETH', from: '2x291487931', to: 'xh149199231', date: '31/01/2024 05:20:14 AM' },
    { event: 'Buy', itemId: '11223', assetName: 'Image Name 17', price: '3.2 ETH', from: '2x291487931', to: 'xh149199231', date: '31/01/2024 06:35:59 AM' },
    { event: 'Sell', itemId: '33445', assetName: 'Image Name 18', price: '2.5 ETH', from: 'xh149199231', to: '2x291487931', date: '31/01/2024 07:50:42 AM' },
    { event: 'Buy', itemId: '55667', assetName: 'Image Name 19', price: '4.0 ETH', from: 'xh149199231', to: '2x291487931', date: '31/01/2024 08:25:30 AM' },
    { event: 'Sell', itemId: '77889', assetName: 'Image Name 20', price: '1.8 ETH', from: '2x291487931', to: 'xh149199231', date: '31/01/2024 09:12:55 AM' },
  ];

  // Pagination
  const [tablePage, setTablePage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setTablePage(0);
  };

  const [userInfo, setUserInfo] = useState({
    id: '2X84182',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    dob: '01/01/1990',
    gender: 'Male',
  });

  const [validationError, setValidationError] = useState({
    name: '',
    email: '',
  });

  const handleInputChange = (field, value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Validation logic
    const updatedValidationError = {};

    if (!userInfo.name.trim()) {
      updatedValidationError.name = 'Name cannot be empty';
    }

    if (!userInfo.email.trim()) {
      updatedValidationError.email = 'Email cannot be empty';
    }

    if (Object.keys(updatedValidationError).length > 0) {
      // There are validation errors
      setValidationError(updatedValidationError);
      return;
    }

    // Save changes logic
    console.log('Changes saved:', userInfo);

    // Clear validation errors
    setValidationError({});
  };

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
  
  const generateUserId = () => {
    const userIdPrefix = Math.random().toString(36).substring(2, 4);
    const userIdSuffix = Math.floor(Math.random() * 1000000).toString();
    const userId = `${userIdPrefix}${userIdSuffix}`;
    return userId.toUpperCase();
  };

  const userId = generateUserId();
  const userName = 'John Doe';
  const coverPhotoUrl = 'https://i.ebayimg.com/images/g/aAQAAOSwdahjaq8W/s-l1600.png';
  const avatarUrl = 'https://i.pinimg.com/736x/57/fb/31/57fb3190d0cc1726d782c4e25e8561e9.jpg';

  const [currentSection, setCurrentSection] = useState('info');

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  // Placeholder data for sections
  const nftCountCreated = 25;
  const nftCountOwned = 15;
  const collectionCount = 5;

  return (
    <Container>
      <Grid container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Cover Photo */}
        <Grid item style={{ display: 'flex', height: '200px', maxWidth: '100%', overflow: 'hidden', alignItems: 'center', borderRadius: '20px' }}>
          <img src={coverPhotoUrl} alt="Cover Photo" style={{ width: '100%'}} />
        </Grid>

        {/* Avatar */}
        <Grid item style={{ margin: '0 auto', marginTop: '-90px', border: '3px solid #e4e4e6', borderRadius: '50%' }}>
          <Avatar alt="Avatar" src={avatarUrl} style={{ width: '120px', height: '120px' }} />
        </Grid>

        {/* Name, User ID, and Subtitle */}
        <Grid item style={{ margin: '0 auto', color: 'white', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom style={{ color: 'black', fontWeight: 'bold' }}>
            {userName}
          </Typography>
          <Typography variant="subtitle1" style={{ color: 'black', fontSize: '0.8rem', fontWeight: '600' }}>
            {`#${userId}`}
          </Typography>
        </Grid>

        {/* Chips with Horizontal Line */}
        <Grid item container spacing={2} style={{ margin: '0 auto', marginTop: '16px', textAlign: 'center'}}>
          {[
            { section: 'info', label: 'Your information' },
            { section: 'created', label: 'Created' },
            { section: 'owned', label: 'Owned' },
            { section: 'collections', label: 'Collections' },
            { section: 'history', label: 'Transaction history' },
          ].map((item) => (
            <Grid item key={item.section}>
              <Chip
                label={item.label}
                onClick={() => handleSectionChange(item.section)}
                style={{
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: currentSection === item.section ? '#f3f3f3' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                }}
                icon={(currentSection === item.section && (item.section === 'created' || item.section === 'owned' || item.section === 'collections')) ? (
                  <div style={{ marginLeft: '8px', width: '24px', height: '16px', borderRadius: '3rem', background: '#c1c1c1', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', padding: '2px' }}>
                    <span style={{ color: 'black', fontSize: '12px' }}>{item.section === 'created' ? nftCountCreated : (item.section === 'owned' ? nftCountOwned : collectionCount)}</span>
                  </div>
                ) : null}
              />
            </Grid>
          ))}
        </Grid>

        {/* Horizontal Line */}
        <hr style={{ width: '100%', margin: '16px 0', borderTop: '0.01px #e4e4e6' }} />
      </Grid>
      
      {/* Display different content based on the selected section */}
      {currentSection === 'info' && (
        <div>
          {/* First Row */}
          <Grid container spacing={2} style={{ marginTop: '6px', marginBottom: '16px' }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="ID"
                value={userInfo.id}
                fullWidth
                InputProps={{
                  readOnly: true,
                  style: {
                    borderRadius: "50px",
                    paddingLeft: '5px',
                    marginBottom: '16px'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone Number"
                value={userInfo.phoneNumber}
                fullWidth
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                InputProps={{
                  style: {
                    borderRadius: "30px",
                    paddingLeft: '5px',
                    marginBottom: '16px'
                  }
                }}
              />
            </Grid>
          </Grid>
    
          {/* Second Row */}
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                value={userInfo.name}
                fullWidth
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={Boolean(validationError.name)}
                helperText={validationError.name}
                InputProps={{
                  style: {
                    borderRadius: "30px",
                    paddingLeft: '5px',
                    marginBottom: '16px'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date of Birth"
                value={userInfo.dob}
                fullWidth
                onChange={(e) => handleInputChange('dob', e.target.value)}
                InputProps={{
                  style: {
                    borderRadius: "30px",
                    paddingLeft: '5px',
                    marginBottom: '16px'
                  }
                }}
              />
            </Grid>
          </Grid>
    
          {/* Third Row */}
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                value={userInfo.email}
                fullWidth
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={Boolean(validationError.email)}
                helperText={validationError.email}
                InputProps={{
                  style: {
                    borderRadius: "30px",
                    paddingLeft: '5px',
                    marginBottom: '16px'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Gender"
                value={userInfo.gender}
                fullWidth
                onChange={(e) => handleInputChange('gender', e.target.value)}
                InputProps={{
                  style: {
                    borderRadius: "30px",
                    paddingLeft: '5px',
                    marginBottom: '16px'
                  }
                }}
              />
            </Grid>
          </Grid>
    
          {/* Centered Save Changes button */}
          <div style={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              onClick={handleSaveChanges}
              style={{ borderRadius: '10px', marginBottom: '16px' }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      )}

      {currentSection === 'created' && (
        <div>
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
        </div>
      )}

      {currentSection === 'owned' && (
        <div>
        </div>
      )}

      {currentSection === 'collections' && (
        <div>
        </div>
      )}

      {currentSection === 'history' && (
        <div>
          <Container maxWidth="xl" style={{ marginTop: '16px' }}>
            <TableContainer component={Paper} style={{ borderRadius: '15px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Event</TableCell>
                    <TableCell>Item ID</TableCell>
                    <TableCell>Asset Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? transactionHistoryData.slice(tablePage * rowsPerPage, tablePage * rowsPerPage + rowsPerPage)
                    : transactionHistoryData
                  ).map((row) => (
                    <TableRow key={row.date}>
                      <TableCell>{row.event}</TableCell>
                      <TableCell>{row.itemId}</TableCell>
                      <TableCell>{row.assetName}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>{row.from}</TableCell>
                      <TableCell>{row.to}</TableCell>
                      <TableCell>{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
      
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={transactionHistoryData.length}
              rowsPerPage={rowsPerPage}
              page={tablePage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Container>
        </div>
      )}
    </Container>
  );
};

export default UserProfile;
