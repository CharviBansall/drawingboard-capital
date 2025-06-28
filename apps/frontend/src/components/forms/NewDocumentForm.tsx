import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Link,
} from '@mui/material';

const NewDocumentForm: React.FC = () => {
  const handleGoToCustomDocuments = () => {
    console.log('Navigating to Custom Documents page');
    // Handle navigation logic here
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        New Document (2A, 2B, P&P, Wrap Fee Brochure)
      </Typography>

      <Box sx={{ mb: 3 }}>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          <li style={{ marginBottom: '16px' }}>
            <Typography variant="body1">
              If your firm wishes to create a <strong>completely new</strong> Form ADV Part 2A Brochure, Form ADV Part 2B Brochure, Wrap Fee 
              Brochure, or Policies and Procedures Manual, click the "Go to Custom Documents page" button below.
            </Typography>
          </li>
          
          <li style={{ marginBottom: '16px' }}>
            <Typography variant="body1">
              If you require changes to your ADV brochures (2A, 2B and/or Wrap), select from the available options in the 
              dropdown list above.
            </Typography>
          </li>
          
          <li style={{ marginBottom: '16px' }}>
            <Typography variant="body1">
              If you wish to register a new investment adviser representative (IAR) to your firm (a process that includes the 
              preparation of a new ADV Part 2B for that individual), please proceed to{' '}
              <Link href="#" underline="hover" color="primary">
                MyRIARegistration
              </Link>{' '}
              and click <em>Add/Drop Registrations</em>.
            </Typography>
          </li>
        </ul>
      </Box>

      {/* Go to Custom Documents Button */}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleGoToCustomDocuments}
          startIcon={<span>⊗</span>}
        >
          Go to Custom Documents page
        </Button>
      </Box>
    </Paper>
  );
};

export default NewDocumentForm; 