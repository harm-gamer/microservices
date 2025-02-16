import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1, textDecoration: 'none' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
        </Typography>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
      </Toolbar>
      
      {/* Drawer for small screens */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          <ListItem button component={Link} to="/" onClick={() => setDrawerOpen(false)}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/login" onClick={() => setDrawerOpen(false)}>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component={Link} to="/signup" onClick={() => setDrawerOpen(false)}>
            <ListItemText primary="Sign Up" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

const Dashboard = () => {
  return (
    <>
    
    <Typography variant="h4" style={{ padding: 20 }}>Welcome to the Dashboard!</Typography>
    </>
  )
    
}

const Login = () => (
  <Typography variant="h4" style={{ padding: 20 }}>Login Page</Typography>
);

const SignUp = () => (
  <Typography variant="h4" style={{ padding: 20 }}>Sign Up Page</Typography>
);


export default Dashboard