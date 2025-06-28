import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Link,
  Paper,
  Button,
  InputAdornment,
} from '@mui/material';

interface ClientTypeEntry {
  count: string;
  amount: string;
}

interface AUMFormData {
  clientTypes: {
    [key: string]: ClientTypeEntry;
  };
  discretionaryAUM: string;
  discretionaryAccounts: string;
  nonDiscretionaryAUM: string;
  nonDiscretionaryAccounts: string;
  nonUSClientsAUM: string;
  custodians: Array<{
    name: string;
    aum: string;
  }>;
  calculationDate: string;
  additionalNotes: string;
}

const clientTypeLabels: { [key: string]: string } = {
  individuals: 'Individuals (other than high net worth individuals)',
  highNetWorth: 'High net worth individuals',
  bankingInstitutions: 'Banking or thrift institutions',
  investmentCompanies: 'Investment companies',
  businessDevelopment: 'Business development companies',
  pooledInvestment: 'Pooled investment vehicles (other than investment companies)',
  pensionPlans: 'Pension and profit sharing plans',
  charitable: 'Charitable organizations',
  government: 'State or municipal government entities',
  otherInvestmentAdvisers: 'Other investment advisers',
  insuranceAdvisors: 'Insurance advisors',
  sovereignWealth: 'Sovereign wealth funds and foreign official institutions',
  corporations: 'Corporations or other businesses not listed above',
  other: 'Other',
};

const AUMUpdateForm: React.FC = () => {
  const [formData, setFormData] = useState<AUMFormData>({
    clientTypes: Object.keys(clientTypeLabels).reduce((acc, key) => ({
      ...acc,
      [key]: { count: '', amount: '' }
    }), {}),
    discretionaryAUM: '',
    discretionaryAccounts: '',
    nonDiscretionaryAUM: '',
    nonDiscretionaryAccounts: '',
    nonUSClientsAUM: '',
    custodians: [{ name: '', aum: '' }],
    calculationDate: '',
    additionalNotes: '',
  });

  const [totalClientAUM, setTotalClientAUM] = useState('0');
  const [totalAccountAUM, setTotalAccountAUM] = useState('0');
  const [totalAccounts, setTotalAccounts] = useState('0');

  const handleClientTypeChange = (type: string, field: 'count' | 'amount', value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setFormData(prev => ({
      ...prev,
      clientTypes: {
        ...prev.clientTypes,
        [type]: {
          ...prev.clientTypes[type],
          [field]: numericValue
        }
      }
    }));
  };

  const handleCustodianChange = (index: number, field: 'name' | 'aum', value: string) => {
    const newCustodians = [...formData.custodians];
    newCustodians[index] = {
      ...newCustodians[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      custodians: newCustodians
    }));
  };

  const addCustodian = () => {
    setFormData(prev => ({
      ...prev,
      custodians: [...prev.custodians, { name: '', aum: '' }]
    }));
  };

  useEffect(() => {
    // Calculate total client AUM
    const clientAUMTotal = Object.values(formData.clientTypes)
      .reduce((sum, entry) => sum + (parseInt(entry.amount) || 0), 0);
    setTotalClientAUM(clientAUMTotal.toString());

    // Calculate total account AUM
    const accountAUMTotal = (parseInt(formData.discretionaryAUM) || 0) +
      (parseInt(formData.nonDiscretionaryAUM) || 0);
    setTotalAccountAUM(accountAUMTotal.toString());

    // Calculate total accounts
    const accountsTotal = (parseInt(formData.discretionaryAccounts) || 0) +
      (parseInt(formData.nonDiscretionaryAccounts) || 0);
    setTotalAccounts(accountsTotal.toString());
  }, [formData]);

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Instructions
        </Typography>
        <Typography variant="body1" paragraph>
          Form ADV requires (and thus we are requesting) the following information regarding firm's
          AUM by client type and by account type. Since it is just different ways of breaking out AUM, the totals AUM
          in Section A must match that of Section B. All fields must be completed. Any dollar amount ($) fields
          must be whole positive integers without decimals, commas, or other non-numeric characters.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          A. AUM by Client Type
        </Typography>
        
        <Typography variant="body1" paragraph>
          <strong>Clients vs. Accounts:</strong> Please be mindful of the difference between accounts and clients.
          For example, one husband and wife couple constitutes one single client for the purpose of your ADV filing.
          That client may have several accounts e.g. separate 401k accounts and general investment accounts.
          Information on the definition of a client, applicable to both U.S. and foreign advisers, can be found{' '}
          <Link href="#" color="primary">HERE</Link>.
        </Typography>

        <Box sx={{ display: 'flex', mb: 2 }}>
          <Box sx={{ flex: 6 }}>
            <Typography variant="subtitle1">Type of Client</Typography>
          </Box>
          <Box sx={{ flex: 3, textAlign: 'center' }}>
            <Typography variant="subtitle1">Number of Clients</Typography>
          </Box>
          <Box sx={{ flex: 3, textAlign: 'center' }}>
            <Typography variant="subtitle1">AUM</Typography>
          </Box>
        </Box>

        {Object.entries(clientTypeLabels).map(([key, label]) => (
          <Box key={key} sx={{ display: 'flex', mb: 2, gap: 2 }}>
            <Box sx={{ flex: 6 }}>
              <Typography variant="body1">{label}</Typography>
            </Box>
            <Box sx={{ flex: 3 }}>
              <TextField
                fullWidth
                size="small"
                value={formData.clientTypes[key].count}
                onChange={(e) => handleClientTypeChange(key, 'count', e.target.value)}
                inputProps={{ inputMode: 'numeric' }}
              />
            </Box>
            <Box sx={{ flex: 3 }}>
              <TextField
                fullWidth
                size="small"
                value={formData.clientTypes[key].amount}
                onChange={(e) => handleClientTypeChange(key, 'amount', e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Box>
          </Box>
        ))}

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">
            Total AUM by Client Type: ${totalClientAUM}
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          B. AUM by Accounts
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
            <Typography variant="subtitle1" gutterBottom>
              1. Discretionary AUM:
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={formData.discretionaryAUM}
              onChange={(e) => setFormData(prev => ({ ...prev, discretionaryAUM: e.target.value }))}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
            />
          </Box>
          <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
            <Typography variant="subtitle1" gutterBottom>
              2. Number of Discretionary Accounts:
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={formData.discretionaryAccounts}
              onChange={(e) => setFormData(prev => ({ ...prev, discretionaryAccounts: e.target.value }))}
              InputProps={{
                endAdornment: <InputAdornment position="end">Accounts</InputAdornment>
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
          <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
            <Typography variant="subtitle1" gutterBottom>
              3. Non-Discretionary AUM:
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={formData.nonDiscretionaryAUM}
              onChange={(e) => setFormData(prev => ({ ...prev, nonDiscretionaryAUM: e.target.value }))}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
            />
          </Box>
          <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
            <Typography variant="subtitle1" gutterBottom>
              4. Number of Non-Discretionary Accounts:
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={formData.nonDiscretionaryAccounts}
              onChange={(e) => setFormData(prev => ({ ...prev, nonDiscretionaryAccounts: e.target.value }))}
              InputProps={{
                endAdornment: <InputAdornment position="end">Accounts</InputAdornment>
              }}
            />
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">
            Total AUM by Account: ${totalAccountAUM}
          </Typography>
          <Typography variant="subtitle1">
            Total Number of Accounts: {totalAccounts}
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          C. Additional Information
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Please provide the AUM attributable to Non-U.S. clients to be disclosed in Form ADV Part 1A:
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={formData.nonUSClientsAUM}
            onChange={(e) => setFormData(prev => ({ ...prev, nonUSClientsAUM: e.target.value }))}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Please provide the AUM for each custodian to be disclosed in Form ADV Part 1A.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • applicable for separately managed account AUM for custodians that hold 10% or more of your firm's
            separately managed account AUM
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • enter N/A if there is no update to be made regarding custodian AUM
          </Typography>

          {formData.custodians.map((custodian, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Custodian Name"
                  value={custodian.name}
                  onChange={(e) => handleCustodianChange(index, 'name', e.target.value)}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="AUM"
                  value={custodian.aum}
                  onChange={(e) => handleCustodianChange(index, 'aum', e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                />
              </Box>
            </Box>
          ))}
          
          <Button
            variant="outlined"
            color="primary"
            onClick={addCustodian}
            sx={{ mt: 1 }}
          >
            Add another custodian
          </Button>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Date of AUM calculation (MM/YYYY):
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={formData.calculationDate}
            onChange={(e) => setFormData(prev => ({ ...prev, calculationDate: e.target.value }))}
            placeholder="MM/YYYY"
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Additional notes from firm to RIA in a Box: (optional)
          </Typography>
          <TextField
            multiline
            minRows={4}
            fullWidth
            variant="outlined"
            value={formData.additionalNotes}
            onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
            sx={{ mb: 2 }}
          />
        </Box>
      </Paper>

      <Box sx={{ mt: 3, mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            // Handle form submission
            console.log('Form data:', formData);
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AUMUpdateForm; 