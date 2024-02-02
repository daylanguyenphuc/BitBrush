import { Link } from 'react-router-dom';
import { Container, Grid, Typography, Box, Button, Card, CardContent, CardMedia, CardActionArea } from "@mui/material";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const scrollToSection = () => {
    const element = document.getElementById('learnMore');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
};

const Homepage = () => {
    return ( 
        <>
        <Container maxWidth="xl" style={{ padding: '0'}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <Grid container style={{margin: '30px 0', padding: '0 5%'}}>
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography variant="h1" >Discover, and collect digital art NTFs</Typography>
                            <Typography variant="h3" gutterBottom>Digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell and discover exclusive digital assets.</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} id>
                            <Grid container style={{margin: '15px 0'}}>
                                <Grid item xs={4} sm={4} md={4}>
                                    <Typography variant="h4" gutterBottom>98K</Typography>
                                    <Typography variant="h5" gutterBottom>Artworks</Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4}>
                                    <Typography variant="h4" gutterBottom>12K</Typography>
                                    <Typography variant="h5" gutterBottom>Auction</Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4}>
                                    <Typography variant="h4" gutterBottom>15K</Typography>
                                    <Typography variant="h5" gutterBottom>Artists</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Grid container spacing={0} style={{margin: '20px 0'}}>
                                <Grid item xs={5} sm={5} md={5}><Link to='/marketplace' style={{textDecoration: 'none'}}><Button variant="contained" size="large"><Typography variant="button" display="block">Explore now</Typography></Button></Link></Grid>
                                <Grid item xs={5} sm={5} md={5}><Button variant="outlined" size="large" onClick={scrollToSection}><Typography variant="button" display="block">Learn more</Typography></Button></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Box style={{ backgroundImage: `url(${'./homepageCover.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%' }}></Box>
                </Grid>
            </Grid>
        </Container>
        <Container maxWidth="xl" style={{ padding: '80px 2%', backgroundColor: 'rgba(217, 224, 236, 0.20)' }} id="learnMore">
            <Grid container spacing={6}>
                <Grid item xs={4} sm={4} md={4}>
                    <Typography variant="h3" gutterBottom>The amazing NFT art of the world is here</Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                    <CreditScoreIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" gutterBottom>Fast transaction</Typography>
                    <Typography variant="body1" gutterBottom>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque odio non volutpat tempor. Aliquam mollis ex eleifend, placerat dolor non, viverra nisi.</Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                    <TrendingUpIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" gutterBottom>Growth transaction</Typography>
                    <Typography variant="body1" gutterBottom>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque odio non volutpat tempor. Aliquam mollis ex eleifend, placerat dolor non, viverra nisi.</Typography>
                </Grid>
            </Grid>
        </Container>
        <Container maxWidth="xl" style={{ textAlign: 'center', padding: '80px 2%'}}>
            <Typography variant="h3" gutterBottom>How it works?</Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardActionArea>
                            <CardMedia component="img" height="140" image="./homepageCover.jpg" alt="green iguana"/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">Setup your wallet</Typography>
                                <Typography variant="body2" color="text.secondary">Set up your wallet of choice. Connect it to the Animerket by access to My wallet page.</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardActionArea>
                            <CardMedia component="img" height="140" image="./homepageCover.jpg" alt="green iguana"/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">Create collection</Typography>
                                <Typography variant="body2" color="text.secondary">Upload your work and setup your collectin. Add a descreption, identify tags and price.</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Card>
                        <CardActionArea>
                            <CardMedia component="img" height="140" image="./homepageCover.jpg" alt="green iguana"/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">Start earning</Typography>
                                <Typography variant="body2" color="text.secondary">Choose between auctions and fixed-price listing. Start earning by selling your NFTs of trading others.</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Container>
        <Container maxWidth="xl" style={{ textAlign: 'center', padding: '80px 2%', backgroundColor: 'rgba(217, 224, 236, 0.20)' }}>
            <Typography variant="h1" gutterBottom>Can not wait any longer?</Typography>
            <Typography variant="h3" gutterBottom>Start trading NTFs now.</Typography>
            <Link to='/marketplace' style={{textDecoration: 'none'}}><Button variant="contained" size="large" style={{ margin: '25px 0' }}><Typography variant="button" display="block">Explore now</Typography></Button></Link>
        </Container>
        </>
    );
}
 
export default Homepage;