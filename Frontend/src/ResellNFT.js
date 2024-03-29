import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Typography, Grid, Paper, FormControl, InputLabel, InputAdornment, OutlinedInput, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails, TextField, Chip, Button, Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import { curentUser } from './Const';
import Web3 from 'web3';
import NFTImagesJSON from './contracts/Artwork.json';


const ResellNFT = () => {

    // web3instance && contract
    const [web3Instance, setWeb3Instance] = useState(null);
    const [contract, setContract] = useState(null);
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

    // Initialize useNavigate
    const navigate = useNavigate(); 
    // image URL
    const [uploadedFile, setUploadedFile] = useState(null);

    // New artwork name
    const [name, setName] = useState('');

    // New artwork descreption
    const [descreption, setDescreption] = useState('');

    // New artwork tags
    // const [unselectedTags, setUnselectedTags] = useState(['Painting and drawing','Vector art','3D model','Pixel art','2D animation','3D animation']);
    // const [selectedTags, setSelectedTags] = useState([]);
    // const handleTagClick = (tag) => {
    //     setUnselectedTags((prevTags) => prevTags.filter((t) => t !== tag));
    //     setSelectedTags((prevTags) => [...prevTags, tag]);
    // };
    // const handleTagDelete = (tag) => {
    //     setUnselectedTags((prevTags) => [...prevTags, tag]);
    //     setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
    // };

    // New artwork collection
    const {data: collections, isCollectionLoading, errorCollection} = useFetch('https://localhost:7145/Collection');
    const [collection, setCollection] = useState('');

    // New artwork price
    const [price, setPrice] = useState('');
    const handlePriceChange = (event) => {
        const inputValue = event.target.value;
        if (/^\d*\.?\d*$/.test(inputValue)) {
            setPrice(inputValue);
        }
    };

    // Artwork properties function
    const { data: ownedNFTList, isLoading: ownedNFTListIsLoading, error: ownedNFTListError } = useFetch(`https://localhost:7145/Product?ownerId=${curentUser}&sellingStatus=false`);
    const [selectedOwnedNFT, setSelectedOwnedNFT] = useState({});
    
    const handleChangeSellOwnedNFT = (event) => {
        setSelectedOwnedNFT(event.target.value);
    };
    
    // Update details based on NFT options
    React.useEffect(() => {
        if (selectedOwnedNFT) {
            setUploadedFile(selectedOwnedNFT.thumbnailUrl);
            setName(selectedOwnedNFT.name);
            setDescreption(selectedOwnedNFT.description);
            { selectedOwnedNFT.collection && setCollection(selectedOwnedNFT.collection.id); }
            console.log(selectedOwnedNFT);
        }
    }, [selectedOwnedNFT]);

    // Handle submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (contract) {
            try {
                await contract.methods.resellNFT(selectedOwnedNFT.id, web3Instance.utils.toWei(price, 'ether')).send({ from: window.ethereum.selectedAddress });
                console.log('NFT reselled successfully.');
            } catch (error) {
                console.error('Error reselling NFT:', error);
            }
        } else {
        console.log("contract is underdefined");
        console.log(contract);
        }
        const nftBody = {
            "price": price
        }
        fetch(`https://localhost:7145/Product/ResellProduct?id=${selectedOwnedNFT.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(nftBody),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to resell NFT');
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
            <Typography variant="h2" style={{ fontWeight: 'bold', textTransform: 'uppercase' }} >Resell a NFT</Typography>
            <Typography variant="h5" gutterBottom>Resell your owned NFT for others to buy.</Typography>
        </Container>
        <Container maxWidth="xl" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12}>
                <FormControl fullWidth>
                    <InputLabel id="ownedNFT">Select your owned NFT</InputLabel>
                    <Select
                        labelId="ownedNFT"
                        id="demo-simple-select"
                        value={selectedOwnedNFT}
                        label="Select your owned NFT"
                        onChange={handleChangeSellOwnedNFT} // Corrected onChange handler
                        style={{ marginBottom: '20px' }}
                    >
                        {ownedNFTList && ownedNFTList.map(nft => (
                            <MenuItem key={nft.id} value={nft}>
                                {nft.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Paper
                        elevation={3}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '2px dashed #ccc',
                            cursor: 'pointer',
                            aspectRatio: '1 / 1',
                            textAlign: 'center',
                            color: '#abaaa9'
                        }}
                    >
                        {uploadedFile ? (
                            <img
                            src={uploadedFile}
                            alt="uploaded"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <Typography variant="subtitle1">Image here</Typography>
                        )}
                    </Paper>
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
                                            disabled
                                            // onChange={handleNameChange}
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
                                            disabled
                                            // onChange={handleDescreptionChange}
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
                                            disabled
                                            // onChange={handleChangeCollection}
                                            style={{ marginBottom: '20px' }}
                                        >
                                            {collections && collections.map(collection => (
                                                <MenuItem key={collection.id} value={collection.id}>
                                                    {collection.name}
                                                </MenuItem>
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
                            <Button variant="contained" onClick={handleSubmit}>Resell my NFT</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>

        </>
    );
}
 
export default ResellNFT;