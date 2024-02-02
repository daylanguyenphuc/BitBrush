import React, { useState } from 'react';
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

const Collection = () => {

    // Search by name function
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        // Add your search logic here
    };

    // Pagination
    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => { setPage(value); }

    return (  
        <>
        <Container maxWidth="xl" style={{ marginTop: '50px', marginBottom: '20px' }}>
            <Typography variant="h1" gutterBottom>Browse collections</Typography>
            <Typography variant="h3" gutterBottom>Browse through more than 30k NFT Collections on NFTers.</Typography>
        </Container>


        <Container
            maxWidth="xl"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                marginTop: '100px',
                marginBottom: '50px'
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
            
        <Container  maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image="image.jpg"
                            alt="test image"        
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">Collection</Typography>
                            <Typography variant="body2" color="text.secondary">Collection description here</Typography>
                            <Typography variant="body2" color="text.secondary">54 items</Typography>
                            <Typography variant="body2" color="text.secondary">by Nguyen Phuc</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">Discover collection</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image="image.jpg"
                            alt="test image"        
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">Collection</Typography>
                            <Typography variant="body2" color="text.secondary">Collection description here</Typography>
                            <Typography variant="body2" color="text.secondary">54 items</Typography>
                            <Typography variant="body2" color="text.secondary">by Nguyen Phuc</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">Discover collection</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image="image.jpg"
                            alt="test image"        
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">Collection</Typography>
                            <Typography variant="body2" color="text.secondary">Collection description here</Typography>
                            <Typography variant="body2" color="text.secondary">54 items</Typography>
                            <Typography variant="body2" color="text.secondary">by Nguyen Phuc</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">Discover collection</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image="image.jpg"
                            alt="test image"        
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">Collection</Typography>
                            <Typography variant="body2" color="text.secondary">Collection description here</Typography>
                            <Typography variant="body2" color="text.secondary">54 items</Typography>
                            <Typography variant="body2" color="text.secondary">by Nguyen Phuc</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">Discover collection</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image="image.jpg"
                            alt="test image"        
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">Collection</Typography>
                            <Typography variant="body2" color="text.secondary">Collection description here</Typography>
                            <Typography variant="body2" color="text.secondary">54 items</Typography>
                            <Typography variant="body2" color="text.secondary">by Nguyen Phuc</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">Discover collection</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image="image.jpg"
                            alt="test image"        
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">Collection</Typography>
                            <Typography variant="body2" color="text.secondary">Collection description here</Typography>
                            <Typography variant="body2" color="text.secondary">54 items</Typography>
                            <Typography variant="body2" color="text.secondary">by Nguyen Phuc</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">Discover collection</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image="image.jpg"
                            alt="test image"        
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">Collection</Typography>
                            <Typography variant="body2" color="text.secondary">Collection description here</Typography>
                            <Typography variant="body2" color="text.secondary">54 items</Typography>
                            <Typography variant="body2" color="text.secondary">by Nguyen Phuc</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">Discover collection</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image="image.jpg"
                            alt="test image"        
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">Collection</Typography>
                            <Typography variant="body2" color="text.secondary">Collection description here</Typography>
                            <Typography variant="body2" color="text.secondary">54 items</Typography>
                            <Typography variant="body2" color="text.secondary">by Nguyen Phuc</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">Discover collection</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image="image.jpg"
                            alt="test image"        
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">Collection</Typography>
                            <Typography variant="body2" color="text.secondary">Collection description here</Typography>
                            <Typography variant="body2" color="text.secondary">54 items</Typography>
                            <Typography variant="body2" color="text.secondary">by Nguyen Phuc</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">Discover collection</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image="image.jpg"
                            alt="test image"        
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">Collection</Typography>
                            <Typography variant="body2" color="text.secondary">Collection description here</Typography>
                            <Typography variant="body2" color="text.secondary">54 items</Typography>
                            <Typography variant="body2" color="text.secondary">by Nguyen Phuc</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">Discover collection</Button>
                        </CardActions>
                    </Card>
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
                height: '20vh',
            }}
        >
            <Pagination count={10} page={page} onChange={handlePageChange} />
        </Container>
        </>
    );
}
 
export default Collection;