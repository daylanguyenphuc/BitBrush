import React, { useState } from 'react';
import { Container, Typography, FormControl, TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const CreateCollection = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const [collectionName, setCollectionName] = useState('');
    const handleCollectionNameChange = (event) => {
        setCollectionName(event.target.value);
    };
    const [collectionDescription, setCollectionDescription] = useState('');
    const handleCollectionDescriptionChange = (event) => {
        setCollectionDescription(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const collection = {
            "name": collectionName,
            "description": collectionDescription,
            "creatorId": "b4606ec1-2899-4416-45b9-08dc4b9ca01d",
        }
        fetch('https://localhost:7145/Collection', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(collection),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create collection');
            }
            return response.json();
        })
        .then((createdCollection) => {
            // Handle success (e.g., show success message)
            // Navigate to CollectionDetail page with the newly created collection id
            navigate(`/CollectionDetail/${createdCollection.id}`);
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
            <Button variant="contained" onClick={handleSubmit}>Create new collection</Button>

        </Container>
        
        </>
    );
}
 
export default CreateCollection;
