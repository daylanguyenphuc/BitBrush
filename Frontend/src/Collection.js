import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, InputAdornment, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
import useFetch from './useFetch';
import useFetchParam from './useFetchParam';

const Collection = () => {

    // Search by name function
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        // Add your search logic here
    };

    // Get data
    const [filterParam, setFilterParam] = useState({});
    useEffect(() => {
        setFilterParam({
            name: searchTerm,
        });
    }, [searchTerm]);
    const {data: collections, isLoading, error} = useFetchParam('https://localhost:7145/Collection', filterParam);

    // Pagination
    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => { setPage(value); }

    return (  
        <>
        <Container maxWidth="xl" style={{ marginTop: '50px', marginBottom: '20px' }}>
            <Typography
            variant="h2"
            style={{
                textTransform: 'uppercase',
                fontSize: '3rem',
            }}
            gutterBottom
            >
            Browse Collections
            </Typography>
            <Typography variant="h5" gutterBottom>Browse through more than 30k NFT Collections on NFTers.</Typography>
        </Container>


        <Container
            maxWidth="xl"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                marginTop: '3rem',
                marginBottom: '3rem'
            }}
        >
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
        </Container>
            
        <Container  maxWidth="xl" style = {{ marginBottom: '50px' }}>
            <Grid container spacing={2}>
                { collections && collections.map( collection => (
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
                                {/* <Typography variant="body2" color="text.secondary">5 items</Typography> */}
                                <Typography variant="body2" color="text.secondary">by {collection.creator.firstName} {collection.creator.lastName}</Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/collectiondetail/${collection.id}`}><Button size="small" color="primary">Discover collection</Button></Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>

        {/* <Container
            maxWidth="xl"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                height: '20vh',
            }}
        >
            <Pagination count={10} page={page} onChange={handlePageChange} />
        </Container> */}
        </>
    );
}
 
export default Collection;