// Importing required Material UI components and icons
import { Box, Container, Link, Typography, TextField, Button, IconButton, MenuItem, Select } from '@mui/material';
import { Facebook, Twitter, LinkedIn, YouTube } from '@mui/icons-material';
import Grid from "@mui/material/Grid2"

// Defining the Footer component as the default export of this module
export default function Footer() {
  return (
    // Setting up a container with maximum width, background color, padding, and margin
    <Container maxWidth="lg" sx={{ bgcolor: '#f8f9fa', py: 4 , mt:4}}>
      
      {/* Defining a grid container to arrange the footer sections */}
      <Grid container spacing={4}>
        
        {/* Logo Section */}
        <Grid xs={12} md={3}>
          <Typography variant="h6" component="div" gutterBottom>
            <img src="logo.jpg" alt="Logo" style={{ width: '50px' }} />
          </Typography>
        </Grid>

        {/* "Our Services" Section with links */}
        <Grid xs={6} md={2}>
          <Typography variant="subtitle1" gutterBottom>
             Our Services
          </Typography>
          <Link href="#" variant="body2" display="block" color="textSecondary">Features</Link>
          <Link href="#" variant="body2" display="block" color="textSecondary">Pricing</Link>
        </Grid>

        {/* "Resources" Section with links */}
        <Grid xs={6} md={2}>
          <Typography variant="subtitle1" gutterBottom>
            Resources
          </Typography>
          <Link href="#" variant="body2" display="block" color="textSecondary">Blog</Link>
          <Link href="#" variant="body2" display="block" color="textSecondary">User guides</Link>
          <Link href="#" variant="body2" display="block" color="textSecondary">Webinars</Link>
        </Grid>

        {/* "Company" Section with links */}
        <Grid xs={6} md={2}>
          <Typography variant="subtitle1" gutterBottom>
            Company
          </Typography>
          <Link href="#" variant="body2" display="block" color="textSecondary">About</Link>
          <Link href="#" variant="body2" display="block" color="textSecondary">Join us</Link>
        </Grid>

        {/* Newsletter Subscription Section */}
        <Grid xs={12} ml='auto'>
          <Typography variant="subtitle1" gutterBottom>
            Subscribe to our newsletter
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            For product announcements and exclusive insights
          </Typography>
          
          {/* Email input field with a subscribe button */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Input your email"
              size="small"
              sx={{ mr: 1, flexGrow: 1 }}
            />
            <Button variant="contained" color="primary" sx={{
              "&:hover": {
                backgroundColor: "#e3f2fd",
                color: "#1DA1F2",
                transform: "scale(1.2)",
                transition: "transform 0.3s ease-in-out",
              },
            }}>Subscribe</Button>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Bottom Section with Language Selector, Links, and Social Icons */}
      <Box sx={{ borderTop: 1, borderColor: '#e0e0e0', mt: 4, pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Language selection dropdown */}
        <Select defaultValue="English" size="small" sx={{ minWidth: 100 }}>
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Spanish">Spanish</MenuItem>
        </Select>

        {/* Footer links for privacy, terms, and sitemap */}
        <Typography variant="body2" color="textSecondary">
          © 2024 Maika, Inc. • <Link href="#">Privacy</Link> • <Link href="#">Terms</Link> • <Link href="#">Sitemap</Link>
        </Typography>

        {/* Social media icon buttons with hover effects */}
        <Box>
          <IconButton
            href="#"
            color="inherit"
            sx={{
              "&:hover": {
                backgroundColor: "#e3f2fd",
                color: "#1DA1F2",
                transform: "scale(1.2)",
                transition: "transform 0.3s ease-in-out",
              },
            }}
          >
            <Twitter />
          </IconButton>
          <IconButton
            href="#"
            color="inherit"
            sx={{
              "&:hover": {
                backgroundColor: "#e3f2fd",
                color: "#1DA1F2",
                transform: "scale(1.2)",
                transition: "transform 0.3s ease-in-out",
              },
            }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            href="#"
            color="inherit"
            sx={{
              "&:hover": {
                backgroundColor: "#e3f2fd",
                color: "#0077B5",
                transform: "scale(1.2)",
                transition: "transform 0.3s ease-in-out",
              },
            }}
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            href="#"
            color="inherit"
            sx={{
              "&:hover": {
                backgroundColor: "#e3f2fd",
                color: "#FF0000",
                transform: "scale(1.2)",
                transition: "transform 0.3s ease-in-out",
              },
            }}
          >
            <YouTube />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
}
