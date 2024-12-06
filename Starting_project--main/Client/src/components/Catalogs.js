import * as React from 'react'; 
import { useState } from 'react';
import axios from 'axios';
import logo from "../images/Logo...png"
import '../styles/Home.css'
import '../styles/Catalogs.css'
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';

//icons
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
// import MenuIcon from '@mui/icons-material/Menu'

//import context
import { AuthContext } from '../context/auth';
import { LogContext } from '../context/Log';

//import images
import aws from '../images/aws-logo.jpg';
import a1 from '../images/a1.png';
import ec2 from  '../images/ec2image.jpg';
import iam from '../images/iam.jpg'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function Catalogs() {

  const [auth,setAuth] = React.useContext(AuthContext);
  const [log,setLog] = React.useContext(LogContext);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

 const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    
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


//type of cloud from parameters
let {cloud} = useParams();

//handle logout
const handleLogout=()=>{
  console.log('logout')
  setAuth({
    user:null,
    token:'',
    role:"",
  })
  localStorage.removeItem('auth');
  setLog(true);
}

// Example card data 
// const cardData = [ 
//   { id: 1, title: 'Cloud', description: 'Description for card 1' }, 
//   { id: 2, title: 'Services', description: 'Description for card 2' }, 
//   { id: 3, title: 'Card 3', description: 'Description for card 3' }, 
//   { id: 4, title: 'Card 4', description: 'Description for card 4' }, 
//   { id: 5, title: 'Card 5', description: 'Description for card 5' }, 
//   { id: 2, title: 'Services', description: 'Description for card 6' }, 
// ]; 

const [cardData,setCardData] = useState([]);
const [imageinstance,setImageInstance] = useState();
let image;

React.useEffect(()=>{
  const catalogs = async()=>{
    const cats = await axios.get('http://localhost:5000/api/services/get_awsConfig');
    setCardData(cats.data.configs);
    setImageInstance(cats.data.configs.service)
    
  }
  catalogs();
},[])
console.log()

const [searchTerm, setSearchTerm] = useState(''); 
  const [isSliderOpen, setIsSliderOpen] = useState(true); 
 
  // Filter cards based on search term 
  console.log(cardData)
  const filteredCards = cardData.filter(card => 
    card.service.toLowerCase().includes(searchTerm.toLowerCase()) 
  ); 

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className='bg-light '>
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon className='text-dark' />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className='w-100 d-flex justify-content-between'>
            <img src={logo} alt='' className='img-fluid img'></img>
            <div className='d-flex fles-row mx-4 my-1'>
            {/* <Link to="/login" class="alert-link" className='text-end mx-4 my-1 '>
              <button type="button" class="btn btn-primary  " style={{ width: "100px" }}>
                Login
              </button>
            </Link> */}

            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"  />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                  {setting=='Logout' && <Link to='/login' className="text-decoration-none text-dark" onClick={handleLogout}>{setting} </Link>}
                  {setting=='Dashboard' && <Link to='/' className="text-decoration-none text-dark">{setting}</Link>}
                  {setting=='Profile' && <Link to='/' className="text-decoration-none text-dark">{setting}</Link>}
                  {setting=='Account' && <Link to='/' className="text-decoration-none text-dark">{setting}</Link>}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          </div>

          </Typography>
          {/* <div className="text-right "> */}


          {/* </div> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader className='bg-light'>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider className='bg-light' />
        <List >
          {['Home', 'Dashboard', 'All Clouds', "All Services", 'Site Administration'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                      justifyContent: 'initial',
                    }
                    : {
                      justifyContent: 'center',
                    },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                        mr: 3,
                      }
                      : {
                        mr: 'auto',
                      },
                  ]}
                >
                 {(text === 'Home' && <Link to='/' ><HomeIcon className='W-100'/></Link>)}
                  {(text === 'Dashboard' && <Link to="/"><DashboardIcon /></Link>)}
                  {(text === 'All Clouds' && <Link to="/services"><CloudQueueIcon /></Link>)}
                  {(text === "All Services" && <Link to="/services/aws"><ElectricalServicesIcon /></Link>)}
                  {(text === 'Site Administration' && <Link to="/"><SettingsIcon /></Link>)}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                        opacity: 1,
                      }
                      : {
                        opacity: 0,
                      },
                  ]}

                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }} >
        <DrawerHeader /> 
        <Typography sx={{ marginBottom: 2 }} >
          <div className='container'>
          <div className="app"> 
      {/* Search bar */} 
      <div className="search-bar "> 
        <input 
          type="text" 
          placeholder="Search Cards..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        /> 
      </div>  

      <div className='slider-container'> 
        {filteredCards.map(card => ( 
          <div class="card cardd" style={{width: "18rem;"}}>
          <div class="card-body">
            <h5 class="card-title"><span>Service: </span>{card.service}</h5>
            <p class="card-text"><span>Instance: </span>{card.instance}<br/><span>Operating System: </span>{card.os}<br/><span>Ram: </span>{card.ram}<br/><span>Storage: </span>{card.storage}GB.</p>
            <Link href="#" class="btn btn-primary">Process</Link>
          </div>
        </div>
        ))} 
      </div> 
    </div> 
          </div>
        </Typography>

       </Box> 
    </Box>
  );
}
