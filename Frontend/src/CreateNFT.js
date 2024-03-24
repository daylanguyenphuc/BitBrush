import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Typography, Grid, Paper, FormControl, InputLabel, InputAdornment, OutlinedInput, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails, TextField, Chip, Button, Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
//import AWS from 'aws-sdk';


const CreateNFT = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    
    // Upload artwork function
    // const S3_BUCKET = 'bucketgroup1.4';
    // const REGION = 'ap-southeast-2';
    // const ACCESS_KEY = 'AKIAZQ3DN5QB5V4P5UHJ';
    // const SECRET_ACCESS_KEY = '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';
    
    // AWS.config.update({
    //   accessKeyId: ACCESS_KEY,
    //   secretAccessKey: SECRET_ACCESS_KEY,
    //   region: REGION,
    // });
    
    // const s3 = new AWS.S3();

    const [uploadedFile, setUploadedFile] = useState(null);
    const onDrop = (acceptedFiles) => {
        setUploadedFile(acceptedFiles[0]);
    };
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
    });

    console.log(uploadedFile);

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
    const {data: collections, isCollectionLoading, errorCollection} = useFetch('https://localhost:7145/Collection');
    const [collection, setCollection] = useState('');
    const handleChangeCollection = (event) => {
        setCollection(event.target.value);
        // fill in all info and disable inputs exepts for price
    };
    // const [collectionName, setCollectionName] = useState('');
    // const handleCollectionNameChange = (event) => {
    //     setCollectionName(event.target.value);
    // };
    // const [collectionDescription, setCollectionDescription] = useState('');
    // const handleCollectionDescriptionChange = (event) => {
    //     setCollectionDescription(event.target.value);
    // };

    // New artwork price
    const [price, setPrice] = useState('');
    const handlePriceChange = (event) => {
    const inputValue = event.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
        setPrice(inputValue);
    }};

    // // Artwork properties function
    // const [ownedNFT, setOwnedNFT] = useState('');
    // const handleChangeSellOwnedNFT = (event) => {
    //     setOwnedNFT(event.target.value);
    //     // fill in all info and disable inputs exepts for price
    // };

    // Handle submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // const params = {
        //     Bucket: S3_BUCKET,
        //     Key: uploadedFile.name,
        //     Body: uploadedFile,
        // };
        // s3.upload(params, (err, data) => {
        //     if (err) {
        //       console.error(err);
        //       return;
        //     }
        //     setLink(data.location);
        // });
        const nft = {
            "name": name,
            "description": descreption,
            "collectionId": collection,
            "thumbnailUrl": 'https://s3.ap-southeast-2.amazonaws.com/bucketgroup1.4/collection-02.jpg',
            "ownerId": "b4606ec1-2899-4416-45b9-08dc4b9ca01d",
            "creatorId": "b4606ec1-2899-4416-45b9-08dc4b9ca01d",
            "sellingStatus": true,
            "price": price
        }
        fetch('https://localhost:7145/Product', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(nft),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to mint NFT');
            }
            return response.json();
        })
        .then((createdNFT) => {
            // Handle success (e.g., show success message)
            // Navigate to CollectionDetail page with the newly created collection id
            navigate(`/NFTDetail/${createdNFT.id}`);
        })
        .catch(error => {
            console.error('Error creating collection:', error);
            // Handle error (e.g., show error message)
        })
        .finally(() => {

        });
    }

    return (  
        <>

        <Container maxWidth="xl" style={{ marginTop: '50px', marginBottom: '20px' }}>
            <Typography variant="h2" style={{ fontWeight: 'bold', textTransform: 'uppercase' }} >Create an NFT</Typography>
            <Typography variant="h5" gutterBottom>Create a collection and mint NFT directly to your wallet.</Typography>
        </Container>
        <Container maxWidth="xl" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
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
                            {/* <Accordion>
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
                            </Accordion> */}
                            <Accordion defaultExpanded>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header"><Typography variant="subtitle1">NFT's informations</Typography></AccordionSummary>
                                <AccordionDetails>
                                    <FormControl fullWidth>
                                        <TextField
                                            required
                                            id="newNFTname"
                                            label="Name"
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
                                            fullWidth
                                            value={descreption}
                                            onChange={handleDescreptionChange}
                                            style={{ marginBottom: '20px' }}
                                        />
                                    </FormControl>
                                    {/* <Box style={{ marginBottom: '20px' }}>
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
                                    </Box> */}
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
                                            { collections && collections.map( collection => (
                                                <MenuItem value={collection.id}>{collection.name}</MenuItem>
                                            ))}
                                            {/* <MenuItem value={0}>Create my new collection</MenuItem> */}
                                        </Select>
                                    </FormControl>
                                    {/* {collection === 0 && (
                                        <FormControl fullWidth>
                                        <TextField
                                            required
                                            id="newCollectionName"
                                            label="Collection name"
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
                                            fullWidth
                                            value={collectionDescription}
                                            onChange={handleCollectionDescriptionChange}
                                            style={{ marginBottom: '20px' }}
                                        />
                                        </FormControl>
                                    )} */}

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
                            <Button variant="contained" onClick={handleSubmit}>Create new NFT</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>

        </>
    );
}
 
export default CreateNFT;