import React, { useState } from 'react';
import { Container, Typography, FormControl, TextField, Button } from "@mui/material";

const CreateCollection = () => {

    const [collectionName, setCollectionName] = useState('');
    const handleCollectionNameChange = (event) => {
        setCollectionName(event.target.value);
    };
    const [collectionDescription, setCollectionDescription] = useState('');
    const handleCollectionDescriptionChange = (event) => {
        setCollectionDescription(event.target.value);
    };

    return (  
        <>
        
        <Container maxWidth="xl" style={{ marginTop: '50px', marginBottom: '20px' }}>
            <Typography variant="h2" style={{ fontWeight: 'bold', textTransform: 'uppercase' }} >Create a collection</Typography>
            <Typography variant="h5" gutterBottom>Launch your NFT collection for others to mint.</Typography>
        </Container>
        <Container maxWidth="xl" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
            <FormControl fullWidth>
                <TextField
                    required
                    id="newCollectionName"
                    label="Collection name"
                    fullWidth
                    value={collectionName}
                    onChange={handleCollectionNameChange}
                    style={{ marginBottom: '1rem' }}
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
                    style={{ marginBottom: '1rem' }}
                />
            </FormControl>
            <Button variant="contained">Create new collection</Button>

        </Container>
        
        </>
    );
}
 
export default CreateCollection;