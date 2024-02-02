import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Typography, Grid, Paper, FormControl, InputLabel, InputAdornment, OutlinedInput, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails, TextField, Chip, Button, Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const CreateNFT = () => {
    
    // Upload artwork function
    const [uploadedFile, setUploadedFile] = useState(null);
    const onDrop = (acceptedFiles) => {
        setUploadedFile(acceptedFiles[0]);
    };
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
    });

    // Artwork properties function
    const [ownedNFT, setOwnedNFT] = useState('');
    const handleChangeSellOwnedNFT = (event) => {
        setOwnedNFT(event.target.value);
        // fill in all info and disable inputs exepts for price
    };

    // New artwork name
    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    // New artwork descreption
    const [descreption, setDescreption] = useState('');
    const handleDescreptionChange = (event) => {
        setDescreption(event.target.value);
    };

    // New artwork tags
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

    // New artwork collection
    const [collection, setCollection] = useState('');
    const handleChangeCollection = (event) => {
        setCollection(event.target.value);
        // fill in all info and disable inputs exepts for price
    };
    const [collectionName, setCollectionName] = useState('');
    const handleCollectionNameChange = (event) => {
        setCollectionName(event.target.value);
    };
    const [collectionDescription, setCollectionDescription] = useState('');
    const handleCollectionDescriptionChange = (event) => {
        setCollectionDescription(event.target.value);
    };

    // New artwork price
    const [price, setPrice] = useState('');
    const handlePriceChange = (event) => {
    const inputValue = event.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
        setPrice(inputValue);
    }};

    return (  
        <>

        <Container maxWidth="xl" style={{ marginTop: '50px', marginBottom: '20px' }}>
            <Typography variant="h2">Create an NFT</Typography>
            <Typography variant="h5" gutterBottom>Create a collection and mint NFT directly to your wallet.</Typography>
        </Container>
        <Container maxWidth="xl" style={{ marginTop: '100px', marginBottom: '200px' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6}>
                    <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '2px dashed #ccc', cursor: 'pointer', aspectRatio: '1 / 1', textAlign: 'center', color: '#abaaa9'}} {...getRootProps()}>
                        <input {...getInputProps()} />
                        {uploadedFile ? (
                            <img src={URL.createObjectURL(uploadedFile)} alt="uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover',}} />
                        ) : (
                            <Typography variant="subtitle1">Drag & drop an image here, or click to select an image</Typography>
                        )}
                    </Paper>
                    <Typography variant="body2" style={{ color: 'gray', marginTop: '25px'}}>* Once your item is minted you will not be able to change any of its information</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12}>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header"><Typography variant="subtitle1">Resell owned NFT (optional)</Typography></AccordionSummary>
                                <AccordionDetails>
                                    <FormControl fullWidth>
                                        <InputLabel id="ownedNFT">Owned NFT</InputLabel>
                                        <Select
                                            labelId="ownedNFT"
                                            id="demo-simple-select"
                                            value={ownedNFT}
                                            label="Owned NFT"
                                            onChange={handleChangeSellOwnedNFT}
                                            style={{ marginBottom: '20px' }}
                                        >
                                            <MenuItem value={''}>I want to sell my new NFT</MenuItem>
                                            <MenuItem value={1}>NFT1</MenuItem>
                                            <MenuItem value={2}>NFT2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header"><Typography variant="subtitle1">NFT's informations</Typography></AccordionSummary>
                                <AccordionDetails>
                                    <FormControl fullWidth>
                                        <TextField
                                            required
                                            id="newNFTname"
                                            label="Name"
                                            defaultValue=""
                                            fullWidth
                                            value={name}
                                            onChange={handleNameChange}
                                            style={{ marginBottom: '20px' }}
                                        />
                                        <TextField
                                            required
                                            id="newNFTDesc"
                                            label="Descreption"
                                            multiline
                                            rows={3}
                                            defaultValue=""
                                            fullWidth
                                            value={descreption}
                                            onChange={handleDescreptionChange}
                                            style={{ marginBottom: '20px' }}
                                        />
                                    </FormControl>
                                    <Box style={{ marginBottom: '20px' }}>
                                        <Typography variant="body2" style={{ display: 'inline' }} gutterBottom>Tags (optional): </Typography>
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
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header"><Typography variant="subtitle1">Choose a collection</Typography></AccordionSummary>
                                <AccordionDetails>
                                    <FormControl fullWidth>
                                        <InputLabel id="ownedNFT">Collection</InputLabel>
                                        <Select
                                            labelId="Collection"
                                            id="demo-simple-select"
                                            value={collection}
                                            label="Collection"
                                            onChange={handleChangeCollection}
                                            style={{ marginBottom: '20px' }}
                                        >
                                            <MenuItem value={''}>No collection</MenuItem>
                                            <MenuItem value={0}>Create my new collection</MenuItem>
                                            <MenuItem value={1}>Colllection 1</MenuItem>
                                            <MenuItem value={2}>Colllection 2</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {collection === 0 && (
                                        <FormControl fullWidth>
                                        <TextField
                                            required
                                            id="newCollectionName"
                                            label="Collection name"
                                            defaultValue=""
                                            fullWidth
                                            value={collectionName}
                                            onChange={handleCollectionNameChange}
                                            style={{ marginBottom: '20px' }}
                                        />
                                        <TextField
                                            required
                                            id="newCollectionDesc"
                                            label="Collection description"
                                            multiline
                                            rows={3}
                                            defaultValue=""
                                            fullWidth
                                            value={collectionDescription}
                                            onChange={handleCollectionDescriptionChange}
                                            style={{ marginBottom: '20px' }}
                                        />
                                        </FormControl>
                                    )}

                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header"><Typography variant="subtitle1">Price</Typography></AccordionSummary>
                                <AccordionDetails>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="price">Price *</InputLabel>
                                    <OutlinedInput
                                        required
                                        id="price"
                                        startAdornment={<InputAdornment position="start">ETH</InputAdornment>}
                                        label="Price"
                                        value={price}
                                        onChange={handlePriceChange}
                                        inputProps={{ pattern: /^\d*\.?\d*$/, title: 'Enter a valid float number' }}
                                        style={{ marginBottom: '20px' }}
                                    />
                                </FormControl>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} style={{ textAlign: 'right' }}>
                            <Button variant="contained">Create new NFT</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>

        </>
    );
}
 
export default CreateNFT;