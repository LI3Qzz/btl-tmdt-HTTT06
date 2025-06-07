import { AppBar, Avatar, Box, Button, Container, Menu, MenuItem, Toolbar, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link, useNavigate } from 'react-router-dom';
import { selectLoggedInUser, logoutAsync } from '../../auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../cart/CartSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import { toggleFilters } from '../../products/ProductSlice';

const pages = [{
    name:"Home",
    path:"/"
},{
    name:"Products",
    path:"/products"
}];
const settings = [{
    name:"Profile",
    path:"/user/profile"
},
{
    name:"Orders",
    path:"/user/orders"
}
];


export const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const loggedInUser=useSelector(selectLoggedInUser)

    const rawCartItems=useSelector(selectCartItems)
    const cartItems=rawCartItems.filter(item => item && item.product);
    const rawWishlistItems=useSelector(selectWishlistItems)
    const wishlistItems=rawWishlistItems.filter(item => item && item.product);

    const isProductList=window.location.pathname.startsWith("/products")

    const theme=useTheme()
    const is500=useMediaQuery(theme.breakpoints.down(500))

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleLogout=()=>{
        dispatch(logoutAsync())
        setAnchorElUser(null)
        navigate("/")
    }

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

    const handleToggleFilters=()=>{
        dispatch(toggleFilters())
    }

  return (
    <AppBar position="sticky" sx={{bgcolor:"white",color:"black",borderBottom:'2px solid #f5f5f5'}} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,color:"primary.main" }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            MERN SHOP
          </Typography>

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
              {pages.map((page) => (
                <MenuItem component={Link} to={page.path} key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1,color:"primary.main" }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MERN SHOP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" >{loggedInUser?.name?.charAt(0) || ''}</Avatar>
              </IconButton>
            </Tooltip>
            <Typography variant='body2' display={is500?'none':'inline'} mr={2}>Hey 👋, {loggedInUser?.name || "demo user"}</Typography>
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
                {settings.map((setting) => (
                    <MenuItem key={setting.name} component={Link} to={setting.path}>
                        <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                ))}
                <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>

            </Menu>
            <IconButton onClick={()=>navigate("/cart")}>
                <ShoppingCartIcon />
                {cartItems.length>0 && <span style={{position:"absolute",right:0,top:0,backgroundColor:"#ff0000",color:"white",width:"1rem",height:"1rem",borderRadius:"50%",fontSize:".7rem",display:"flex",justifyContent:"center",alignItems:"center"}}>{cartItems.length}</span>}
            </IconButton>
            <IconButton component={Link} to={"/wishlist"}>
                <FavoriteBorderIcon />
                {wishlistItems.length>0 && <span style={{position:"absolute",right:0,top:0,backgroundColor:"#ff0000",color:"white",width:"1rem",height:"1rem",borderRadius:"50%",fontSize:".7rem",display:"flex",justifyContent:"center",alignItems:"center"}}>{wishlistItems.length}</span>}
            </IconButton>
            
        
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};