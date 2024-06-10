import React from 'react';
import { Box } from "@mui/system";

const ColorField = ({ color }) => {
  const colorStyles = {
    width: '100%',
    padding: '1rem',
    backgroundColor: color,
    color: 'white', // You can adjust text color based on the background color
  };

  return (
    <Box sx={colorStyles}>
      This is the ColorField component with a background color based on the form submission.
      
    </Box>
  );
};

export default ColorField;
