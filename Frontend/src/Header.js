import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import { curentUser } from './Const';
import useFetch from './useFetch';

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const {data: user, isLoading: isUserLoading, error: userError} = useFetch(`https://localhost:7145/User/${curentUser}`);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
              <img
                src={process.env.PUBLIC_URL + '/logo.png'}
                alt="BitBrush Logo"
                style={{
                  height: '35px',
                  marginTop: '2px',
                  marginRight: '8px',
                  display: { xs: 'none', md: 'flex' },
                }}
              />
            </Link>
          {/* <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'roboto',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              BitBrush
            </Typography>
          </Link> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', justifyContent: 'flex-end' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link to='/' style={{textDecoration:'none', color:'#4a4a4a'}}><MenuItem><Typography textAlign="center">Homepage</Typography></MenuItem></Link>
              <Link to='/marketplace' style={{textDecoration:'none', color:'#4a4a4a'}}><MenuItem><Typography textAlign="center">Marketplace</Typography></MenuItem></Link>
              <Link to='/collection' style={{textDecoration:'none', color:'#4a4a4a'}}><MenuItem><Typography textAlign="center">Collection</Typography></MenuItem></Link>
              <Link to='/ranking' style={{textDecoration:'none', color:'#4a4a4a'}}><MenuItem><Typography textAlign="center">Ranking</Typography></MenuItem></Link>
              <Link to='/create' style={{textDecoration:'none', color:'#4a4a4a'}}><MenuItem><Typography textAlign="center">Create</Typography></MenuItem></Link>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'flex-start'  } }}>
            <Link to='/marketplace' style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Marketplace</Button></Link>
            <Link to='/collection' style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Collection</Button></Link>
            <Link to='/ranking' style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Ranking</Button></Link>
            <Link to='/create' style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Create</Button></Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={ user && user.firstName} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >   
              <MenuItem><Link to='/wallet' style={{textDecoration:'none' , color:'#4a4a4a'}}><Typography textAlign="center">My Wallet</Typography></Link></MenuItem>
              <MenuItem><Link to={ user && `/user/${user.id}`} style={{textDecoration:'none' , color:'#4a4a4a'}}><Typography textAlign="center">My Profile</Typography></Link></MenuItem>
              <MenuItem><Link to='/accountsetting' style={{textDecoration:'none' , color:'#4a4a4a'}}><Typography textAlign="center">Account settings</Typography></Link></MenuItem>
              <MenuItem><Link to='/' style={{textDecoration:'none' , color:'#4a4a4a'}}><Typography textAlign="center">Log out</Typography></Link></MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;