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
            <Container maxWidth="xl"
                sx={{
                    margin: { xs: '2rem auto', sm: '2rem auto', md: '4rem auto', lg: '8rem auto' }
                }}>
                <Grid container spacing={2} style={{ padding: '0' }}>
                    <Grid item xs={12} sm={12} md={7}>
                        <Grid container style={{ margin: '30px 0', padding: '0 5%' }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography variant="h2" style={{ textTransform: 'uppercase', marginBottom: '1rem' }} >Discover and collect digital art NTFs</Typography>
                                <Typography variant="h5" gutterBottom>Digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell and discover exclusive digital assets.</Typography>
                            </Grid>
                            <Grid item xs={12} sm={10} md={10} lg={7}>
                                <Grid container style={{ margin: '15px 0' }}>
                                    <Grid item xs={4} sm={4} md={4}>
                                        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>98K</Typography>
                                        <Typography variant="h6" gutterBottom>Artworks</Typography>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4}>
                                        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>12K</Typography>
                                        <Typography variant="h6" gutterBottom>Collections</Typography>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4}>
                                        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>15K</Typography>
                                        <Typography variant="h6" gutterBottom>Artists</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container spacing={6}>
                                    <Grid item xs={5} sm={5} md={5}><Link to='/marketplace' style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}><Button variant="contained" size="large"><Typography variant="button" display="block">Explore now</Typography></Button></Link></Grid>
                                    <Grid item xs={5} sm={5} md={5}><Button variant="outlined" size="large" onClick={scrollToSection}><Typography variant="button" display="block" style={{ whiteSpace: 'nowrap' }}>Learn more</Typography></Button></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                        <Box
                            style={{
                                backgroundImage: `url(${'./homepageCover.jpg'})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                height: '100%',
                                maxWidth: '100%',
                            }}
                        ></Box>
                    </Grid>
                </Grid>
            </Container>

            <Container maxWidth="xl" style={{ padding: '3rem 4rem', backgroundColor: 'rgba(217, 224, 236, 0.20)' }} id="learnMore">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={4}>
                        <Typography variant="h3" style={{ fontWeight: 'bold' }} gutterBottom>The amazing NFT art of the world is here</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <CreditScoreIcon sx={{ fontSize: 40 }} />
                        <Typography variant="h5" style={{ fontWeight: 'bold' }} gutterBottom>Fast transaction</Typography>
                        <Typography variant="body1" gutterBottom>Experience seamless and swift transactions with our cutting-edge technology, immersing yourself in the captivating world of digital art. Enjoy the thrill of instant transactions, putting the power of NFTs at your fingertips.</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <TrendingUpIcon sx={{ fontSize: 40 }} />
                        <Typography variant="h5" style={{ fontWeight: 'bold' }} gutterBottom>Growth transaction</Typography>
                        <Typography variant="body1" gutterBottom>Invest in the evolution of NFT art with our empowering platform. We foster an environment where the value of digital creations flourishes, creating a symbiotic relationship between artists and collectors.</Typography>
                    </Grid>
                </Grid>
            </Container>

            <Container maxWidth="xl" style={{ textAlign: 'center', padding: '3rem 4rem' }}>
                <Typography variant="h3" gutterBottom>How it works?</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={4}>
                        <Card>
                            <CardActionArea>
                                <CardMedia component="img" width="250" image="./Setupwallet.png" alt="Setup your wallet" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">Setup your wallet</Typography>
                                    <Typography variant="body2" color="text.secondary">Set up your wallet of choice. Connect it to the Animerket by access to My wallet page.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Card>
                            <CardActionArea>
                                <CardMedia component="img" width="250" image="./Createcollection.png" alt="Create collection" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">Create collection</Typography>
                                    <Typography variant="body2" color="text.secondary">Upload your work and setup your collection. Add a description, identify tags and price.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Card>
                            <CardActionArea>
                                <CardMedia component="img" width="250" image="./Startearning.png" alt="Start earning" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">Start earning</Typography>
                                    <Typography variant="body2" color="text.secondary">Choose between auctions and fixed-price listing. Start earning by selling your NFTs of trading others.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            
            <Container maxWidth="xl" style={{ textAlign: 'center', padding: '3rem 4rem', backgroundColor: 'rgba(217, 224, 236, 0.20)' }}>
                <Typography variant="h2" style={{ fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '1rem' }} gutterBottom>Cannot wait any longer?</Typography>
                <Typography variant="h5" gutterBottom>Start trading NFTs now.</Typography>
                <Link to='/marketplace' style={{ textDecoration: 'none' }}><Button variant="contained" size="large" style={{ margin: '25px 0' }}><Typography variant="button" display="block">Explore now</Typography></Button></Link>
            </Container>
        </>
    );
}

export default Homepage;