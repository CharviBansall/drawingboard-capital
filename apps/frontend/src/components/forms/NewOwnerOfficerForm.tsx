import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Link,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';

const NewOwnerOfficerForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Submitting new owner/officer form:', selectedOption);
    // Handle form submission logic here
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        New Owner, Officer, or Management Person
      </Typography>

      {/* Instructions */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" paragraph>
          Please note that any officer (including the CCO), management person,
          5+% direct owner (individuals and entities), or 25+% indirect owner of
          the RIA should be disclosed.
        </Typography>

        <Typography variant="body1" paragraph>
          To <strong>remove</strong> or change the information for an existing
          owner, please instead select "Other" from the dropdown, as this form
          is only necessary for <strong>new</strong> owners. To view a list of
          the owners, officers and management persons currently listed on the
          firm's Form ADV, please visit the{' '}
          <Link href="#" underline="hover" color="primary">
            ADV 1 Status Monitors
          </Link>{' '}
          page.
        </Typography>

        <Typography variant="body1" paragraph>
          If the addition of this new owner/officer will necessitate any{' '}
          <em>registration</em> changes (i.e. if the new owner is buying out
          John Doe, and John Doe will thereafter no longer be an IAR of the
          firm), <em>after submission of this new owner/officer request</em>,
          please visit{' '}
          <Link href="#" underline="hover" color="primary">
            MyRIARegistration
          </Link>
          , click Add/Drop Registrations, and then click the red X next to the
          name of the individual whose registration is to be withdrawn.
        </Typography>

        <Typography variant="body1" paragraph>
          The entity licensed as the RIA (e.g., Common Financial Inc.) is not an
          "owner" of itself, so typically it will just be one or more individual{' '}
          <strong>direct owners</strong>, <strong>officers</strong>, and{' '}
          <strong>management persons</strong> of the RIA listed on Schedule A.
          This situation is reflected in Option 1 below.
        </Typography>

        <Typography variant="body1" paragraph>
          Some RIAs have trusts, holding companies, or other entities as direct
          owners, in which case both the direct owner (Schedule A) and the{' '}
          <strong>indirect owners</strong> (Schedule B), meaning the individual
          owners of that direct owner, must be disclosed. This situation is
          reflected in Option 2 below.{' '}
          <strong>
            Please note that you will have to complete Option 1 for the direct
            owner(s) and then return to this page and complete Option 2 for the
            indirect owner(s).
          </strong>
        </Typography>

        <Typography variant="body1" paragraph>
          If you want to take a look, additional resources are available at:
        </Typography>

        <Box component="ul" sx={{ pl: 4, mb: 3 }}>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              Form ADV instructions for Schedule A:{' '}
              <Link
                href="https://www.iard.com/adv_schedulea"
                target="_blank"
                underline="hover"
                color="primary"
              >
                https://www.iard.com/adv_schedulea
              </Link>
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              Form ADV instructions for Schedule B:{' '}
              <Link
                href="https://www.iard.com/adv_scheduleb"
                target="_blank"
                underline="hover"
                color="primary"
              >
                https://www.iard.com/adv_scheduleb
              </Link>
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              FAQs for Schedule A and B:{' '}
              <Link
                href="https://www.sec.gov/divisions/investment/iard/iardfaq.shtml#schedab"
                target="_blank"
                underline="hover"
                color="primary"
              >
                https://www.sec.gov/divisions/investment/iard/iardfaq.shtml#schedab
              </Link>
            </Typography>
          </Box>
        </Box>

        <Typography variant="body1" paragraph>
          <strong>
            Please select the appropriate option and complete the information
            below:
          </strong>
        </Typography>
      </Box>

      {/* Option Selection */}
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <Select
            value={selectedOption}
            onChange={handleOptionChange}
            displayEmpty
            sx={{ backgroundColor: '#f0f8ff' }}
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
            <MenuItem value="option1">
              Option 1: Direct Owner/Officer/Management Person (Schedule A)
            </MenuItem>
            <MenuItem value="option2">
              Option 2: Indirect Owner (Schedule B)
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Conditional Form Content */}
      {selectedOption === 'option1' && (
        <Box sx={{ p: 3, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Option 1: Direct Owner/Officer/Management Person (Schedule A)
          </Typography>
          <Typography variant="body1">
            Form content for direct owners, officers, and management persons
            would appear here. This would include fields for personal
            information, ownership percentage, roles, etc.
          </Typography>
        </Box>
      )}

      {selectedOption === 'option2' && (
        <Box sx={{ p: 3, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Option 2: Indirect Owner (Schedule B)
          </Typography>
          <Typography variant="body1">
            Form content for indirect owners would appear here. This would
            include fields for the individual owners of direct owner entities.
          </Typography>
        </Box>
      )}

      {/* Submit Button - only show when option is selected */}
      {selectedOption && (
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleSubmit}
            startIcon={<span>⊗</span>}
          >
            Submit
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default NewOwnerOfficerForm;
