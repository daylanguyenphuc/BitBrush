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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
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
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to='/marketplace' style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Marketplace</Button></Link>
            <Link to='/collection' style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Collection</Button></Link>
            <Link to='/ranking' style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Ranking</Button></Link>
            <Link to='/create' style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Create</Button></Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              <MenuItem><Typography textAlign="center">My wallet</Typography></MenuItem>
              <MenuItem><Typography textAlign="center">My profile</Typography></MenuItem>
              <MenuItem><Typography textAlign="center">Account settings</Typography></MenuItem>
              <MenuItem><Typography textAlign="center">Logout</Typography></MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;