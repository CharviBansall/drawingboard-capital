import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Link,
  SelectChangeEvent,
} from '@mui/material';
import AUMUpdateForm from '../components/forms/AUMUpdateForm';
import AddressUpdateForm from '../components/forms/AddressUpdateForm';
import AssetBasedFeeForm from '../components/forms/AssetBasedFeeForm';
import CustodyClientAssetsForm from '../components/forms/CustodyClientAssetsForm';
import PerformanceBasedFeeForm from '../components/forms/PerformanceBasedFeeForm';
import NewDocumentForm from '../components/forms/NewDocumentForm';
import NewOBAForm from '../components/forms/NewOBAForm';
import NewOwnerOfficerForm from '../components/forms/NewOwnerOfficerForm';
import NewPrivateFundForm from '../components/forms/NewPrivateFundForm';
import NewServiceFeeStructureForm from '../components/forms/NewServiceFeeStructureForm';
import TPMMForm from '../components/forms/TPMMForm';
import OtherForm from '../components/forms/OtherForm';

const RequestAdvU4: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string>('');

  const handleFormChange = (event: SelectChangeEvent<string>) => {
    setSelectedForm(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 4 }}
      >
        Request ADV/U4 Changes
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Please select the type of change requested from the list below
        </Typography>

        <FormControl fullWidth>
          <InputLabel>Select Form Type</InputLabel>
          <Select
            value={selectedForm}
            label="Select Form Type"
            onChange={handleFormChange}
          >
            <MenuItem value="aum-update">AUM Update</MenuItem>
            <MenuItem value="address-update">
              Add new / update existing / remove existing address
            </MenuItem>
            <MenuItem value="additional-custodians">
              Adding Additional Custodians
            </MenuItem>
            <MenuItem value="custody-client-assets">
              Adding Custody of Client Assets
            </MenuItem>
            <MenuItem value="asset-based-fee">
              Fee Structure: Asset-based fee update
            </MenuItem>
            <MenuItem value="performance-based-fee">
              Fee Structure: Performance-based fee update
            </MenuItem>
            <MenuItem value="new-document">
              New Document (2A, 2B, P&P, Wrap Fee Brochure)
            </MenuItem>
            <MenuItem value="new-oba">
              New Outside Business Activity (OBA)
            </MenuItem>
            <MenuItem value="new-management">
              New Owner, Officer, or Management Person
            </MenuItem>
            <MenuItem value="new-private-fund">New Private Fund</MenuItem>
            <MenuItem value="new-service-fee">
              New Service & Fee Structure: Financial Planning
            </MenuItem>
            <MenuItem value="tpmm">
              TPMM: Adding a new third-party money manager / investment adviser
            </MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {selectedForm === 'aum-update' && (
        <Box>
          <AUMUpdateForm />
        </Box>
      )}

      {selectedForm === 'address-update' && (
        <Box>
          <AddressUpdateForm />
        </Box>
      )}

      {selectedForm === 'additional-custodians' && (
        <Box>
          <AddressUpdateForm updateType="custodian" />
        </Box>
      )}

      {selectedForm === 'asset-based-fee' && (
        <Box>
          <AssetBasedFeeForm />
        </Box>
      )}

      {selectedForm === 'custody-client-assets' && (
        <Box>
          <CustodyClientAssetsForm />
        </Box>
      )}

      {selectedForm === 'performance-based-fee' && (
        <Box>
          <PerformanceBasedFeeForm />
        </Box>
      )}

      {selectedForm === 'new-document' && (
        <Box>
          <NewDocumentForm />
        </Box>
      )}

      {selectedForm === 'new-oba' && (
        <Box>
          <NewOBAForm />
        </Box>
      )}

      {selectedForm === 'new-management' && (
        <Box>
          <NewOwnerOfficerForm />
        </Box>
      )}

      {selectedForm === 'new-private-fund' && (
        <Box>
          <NewPrivateFundForm />
        </Box>
      )}

      {selectedForm === 'new-service-fee' && (
        <Box>
          <NewServiceFeeStructureForm />
        </Box>
      )}

      {selectedForm === 'tpmm' && (
        <Box>
          <TPMMForm />
        </Box>
      )}

      {selectedForm === 'other' && (
        <Box>
          <OtherForm />
        </Box>
      )}

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Pending Requests
        </Typography>
        <Typography variant="body1" color="text.secondary">
          There are no pending requests.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          In-Progress Requests
        </Typography>
        <Typography variant="body1" color="text.secondary">
          There are no in-progress requests.
        </Typography>
      </Paper>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          * In order to close ANY case or change an in-progress request, please{' '}
          <Link href="#" underline="hover">
            contact our team
          </Link>
          .
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ** Closed Requests appear in your{' '}
          <Link href="#" underline="hover">
            Compliance Log
          </Link>{' '}
          in the Registration Changes section.
        </Typography>
      </Box>
    </Container>
  );
};

export default RequestAdvU4;
