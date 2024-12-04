import { FC, useState } from 'react'
import logo from '../assets/image/Logo.png'
import { Link } from 'react-router-dom';

const Header:FC = () => {
  const [open, setOpen] = useState(false);
  const [submenuMovies, setSubmenuMovies] = useState(false);
  const [submenuTVShows, setSubmenuTVShows] = useState(false);
  const [submenuPeople, setSubmenuPeople] = useState(false);

  return (
      <header className="navbar  bg-slate-700 flex justify-between">
  
  <div>

    <a className="btn btn-ghost relative left-5 md:left-0 text-xl">
      <img className='w-44' src={logo} alt="" />
    </a>

    {/* Mobile View */}

  <div className="flex md:hidden">
    <button className="btn btn-ghost text-white relative right-56" onClick={() => setOpen(!open)}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>
    
    {open && (
      <div className="absolute top-12 left-0 w-full bg-white mt-5 shadow-lg">
        <ul className="menu p-2">
          <li>
            <a onClick={() => setSubmenuMovies(!submenuMovies)}>Movies</a>
            {submenuMovies && (
              <ul className="p-2">
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
              <li><a>Item 3</a></li>
            </ul>
            )}
          </li>
          <li>
            <a onClick={() => setSubmenuTVShows(!submenuTVShows)}>TV Shows</a>
            {submenuTVShows && (
              <ul className="p-2">
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
              <li><a>Item 3</a></li>
            </ul>
            )}
          </li>
          <li>
            <a onClick={() => setSubmenuPeople(!submenuPeople)}>People</a>
            {submenuPeople && (
              <ul className="p-2">
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
              <li><a>Item 3</a></li>
            </ul>
            )}
          </li>
        </ul>
      </div>
    )}

  </div>


    {/* Dasktop View  page */}
    <div className="dropdown mx-2 hidden md:flex">
      <label tabIndex={0} className="text-white font-semibold cursor-pointer m-1" onClick={() => setOpen(!open)}>Movies</label>
      {open && (
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 mt-8">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
          <li><a>Item 3</a></li>
        </ul>
      )}
    </div>

    <div className="dropdown mx-2 hidden md:flex">
      <label tabIndex={0} className="text-white font-semibold cursor-pointer m-1" onClick={() => setOpen(!open)}>TV Shows</label>
      {open && (
        <ul tabIndex={0} className="dropdown-content  menu p-2 shadow bg-base-100 rounded-box w-32 mt-8">
          <li><a>Item 4</a></li>
          <li><a>Item 5</a></li>
          <li><a>Item 6</a></li>
        </ul>
      )}
    </div>

    <div className="dropdown mx-2 hidden md:flex">
      <label tabIndex={0} className="text-white font-semibold cursor-pointer m-1" onClick={() => setOpen(!open)}>People</label>
      {open && (
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 mt-8">
          <li><a>Item 7</a></li>
          <li><a>Item 8</a></li>
          <li><a>Item 9</a></li>
        </ul>
      )}
    </div>
  </div>


  <div >

    <ul className='flex text-white font-semibold mx-0 md:mx-10'>
      <li><Link className='mx-2 md:mx-4' to={'/login'}>Login</Link></li>
      <li><Link className='mx-2 md:mx-4' to={'/register'}>Join</Link></li>
    </ul>
    {/* <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div> */}
  </div>
  </header>
  )
}

export default Header



// import * as React from 'react';
// import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
// import AdbIcon from '@mui/icons-material/Adb';
// import MenuIcon from '@mui/icons-material/Menu';
// import logo from '../assets/image/Logo.png'


// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// function Header() {
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
//   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography> */}
//           <img src={logo} className='w-36 hidden md:flex ml-5 mr-10' alt="" />

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{ display: { xs: 'block', md: 'none' } }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>
//           {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box> */}
          
//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default Header;