import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Typography, Grid, Paper, FormControl, InputLabel, InputAdornment, OutlinedInput, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails, TextField, Chip, Button, Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import { curentUser } from './Const';
import AWS from 'aws-sdk';
import Web3 from 'web3';
import NFTImagesJSON from './contracts/Artwork.json';



// Upload artwork function
const S3_BUCKET = 'bucketgroup1.4';
const REGION = 'ap-southeast-2';
const ACCESS_KEY = 'AKIAZQ3DN5QB5V4P5UHJ';
const SECRET_ACCESS_KEY = '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';

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION,
});

const s3 = new AWS.S3();
const CreateNFT = () => {
    const [web3Instance, setWeb3Instance] = useState(null);
    const [contract, setContract] = useState(null);

    // web3Instance & contract
    useEffect(() => {
        if (window.ethereum) {
          if (window.ethereum.selectedAddress) {
            const web3 = new Web3(window.ethereum);
            setWeb3Instance(web3);
          } else {
            window.ethereum.request({ method: 'eth_requestAccounts' })
              .then(async () => {
                const web3 = new Web3(window.ethereum);
                setWeb3Instance(web3);
              })
              .catch((err) => {
                console.error("User rejected request:", err);
              });
          }
        } else {
          console.log('Please install MetaMask to use this application.');
        }
    }, []);

    useEffect(() => {
        if (web3Instance) {
        (async () => {
            const networkId = await web3Instance.eth.net.getId();
            const deployedNetwork = NFTImagesJSON.networks[networkId];
            const instance = new web3Instance.eth.Contract(
            NFTImagesJSON.abi,
            deployedNetwork && deployedNetwork.address,
            );
            setContract(instance);
        })();
        }
    }, [web3Instance]);


    const navigate = useNavigate(); // Initialize useNavigate

    const [uploadedFile, setUploadedFile] = useState(null);
    const onDrop = (acceptedFiles) => {
        setUploadedFile(acceptedFiles[0]);
    };
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
    });

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
    };

    // New artwork price
    const [price, setPrice] = useState('');
    const handlePriceChange = (event) => {
    const inputValue = event.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
        setPrice(inputValue);
    }};

    // Handle submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const params = {
            Bucket: S3_BUCKET,
            Key: uploadedFile.name,
            Body: uploadedFile,
        };
        s3.upload(params, (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(data.Location);
            const nft = {
                "name": name,
                "description": descreption,
                "collectionId": collection,
                "thumbnailUrl": data.Location,
                "ownerId": curentUser,
                "creatorId": curentUser,
                "sellingStatus": true,
                "price": price
            }
            console.log(nft);
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
            .then( async (createdNFT) => {
                // Handle success 
                
                if (contract) {
                    try {
                        await contract.methods.mintNFT(createdNFT.id, web3Instance.utils.toWei(createdNFT.price, 'ether')).send({ from: window.ethereum.selectedAddress });
                        console.log('NFT minted successfully.');
                        navigate(`/NFTDetail/${createdNFT.id}`);
                    } catch (error) {
                        console.error('Error minting NFT:', error);
                    }
                } else {
                    console.log("contract is underdefined");
                    console.log(contract);
                }
            })
            .catch(error => {
                console.error('Error creating NFT:', error);
                // Handle error (e.g., show error message)
            })
            .finally(() => {
    
            });
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
                                        </Select>
                                    </FormControl>
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