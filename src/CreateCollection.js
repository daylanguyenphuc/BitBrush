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
            <Typography variant="h2">Create a collection</Typography>
            <Typography variant="h5" gutterBottom>Launch your NFT collection for others to mint.</Typography>
        </Container>
        <Container maxWidth="xl" style={{ marginTop: '100px', marginBottom: '200px' }}>
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
            <Button variant="contained">Create new collection</Button>

        </Container>
        
        </>
    );
}
 
export default CreateCollection;