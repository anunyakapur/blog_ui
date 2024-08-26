// components/Footer.js
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      mt={5}
      py={3}
      px={2}
      bgcolor="primary.main"
      color="white"
      textAlign="center"
    >
      <Typography variant="body1">© 2024 Anunya's Blog Dashboard. All rights reserved.</Typography>
      <Typography variant="body2">
        <Link href="/privacy" color="inherit">Privacy Policy</Link> | <Link href="/terms" color="inherit">Terms of Service</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
