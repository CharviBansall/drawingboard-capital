import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Send } from '@mui/icons-material';

const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
  { code: 'DC', name: 'District of Columbia' },
];

interface AddressFormData {
  addressType: string;
  updateType: string;
  secondaryType: string;
  selectedOffice: string;
  startDate: Date | null;
  street1: string;
  street2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phone: string;
  fax: string;
  additionalNotes: string;
  branchType: string;
  supervisingOffice: string;
  primarySupervisor: string;
  operatingHours: string;
  isSharedSpace: boolean;
  sharedSpaceDetails?: string;
  custodianName: string;
  customCustodianName: string;
  customCustodianCRD: string;
  isRelatedPerson: string;
  holdsTenPercent: string;
  isTerminated: string;
}

// Mock data for existing offices - this would come from your backend in reality
const EXISTING_OFFICES = [
  { id: '1', name: 'Main Office - New York', address: '123 Wall Street, New York, NY' },
  { id: '2', name: 'Branch Office - Los Angeles', address: '456 Hollywood Blvd, Los Angeles, CA' },
  { id: '3', name: 'Secondary Office - Chicago', address: '789 Michigan Ave, Chicago, IL' },
];

// Mock data for supervisors - in reality this would come from your backend
const SUPERVISORS = [
  { id: '1', name: 'John Smith', title: 'Senior Supervisor' },
  { id: '2', name: 'Jane Doe', title: 'Regional Manager' },
  { id: '3', name: 'Mike Johnson', title: 'Branch Supervisor' },
];

// Mock data for custodians - exact match from the image
const CUSTODIANS = [
  { id: '47788', name: 'Betterment Securities (CRD# 47788)' },
  { id: 'schwab', name: 'Charles Schwab & Co., Inc. Advisor Services' },
  { id: 'equity', name: 'Equity Trust Company' },
  { id: '7784', name: 'Fidelity Brokerage Services LLC, (CRD# 7784)' },
  { id: '36418', name: 'Interactive Brokers LLC (CRD# 36418)' },
  { id: '36671', name: 'Pershing Advisor Solutions LLC (CRD# 36671)' },
  { id: '5393', name: 'Schwab Institutional, a division of Charles Schwab & Co., Inc., (CRD# 5393)' },
  { id: '8206', name: 'Scottrade, Inc. (CRD# 8206)' },
  { id: '125226', name: 'Shareholders Service Group, Inc. (CRD# 125226)' },
  { id: 'tdai', name: 'TD Ameritrade Institutional, a division of TD Ameritrade, Inc. Member FINRA/SIPC' },
  { id: 'trade', name: 'Trade-PMR Inc., Member FINRA SIPC' },
  { id: 'other', name: 'Other' }
];

const formatPhoneNumber = (value: string) => {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '');
  
  // Format the number as (XXX) XXX-XXXX
  if (numbers.length >= 10) {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  } else if (numbers.length > 6) {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  } else if (numbers.length > 3) {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  } else if (numbers.length > 0) {
    return `(${numbers}`;
  }
  return '';
};

interface AddressFormProps {
  updateType?: string;
}

const AddressUpdateForm: React.FC<AddressFormProps> = ({ updateType: initialUpdateType }) => {
  const [formData, setFormData] = useState<AddressFormData>({
    addressType: 'residential',
    updateType: initialUpdateType || '',
    secondaryType: '',
    selectedOffice: '',
    startDate: new Date('2025-06-10'),
    street1: '',
    street2: '',
    city: '',
    state: '',
    country: 'United States',
    zip: '',
    phone: '',
    fax: '',
    additionalNotes: '',
    branchType: '',
    supervisingOffice: '',
    primarySupervisor: '',
    operatingHours: '',
    isSharedSpace: false,
    sharedSpaceDetails: '',
    custodianName: '',
    customCustodianName: '',
    customCustodianCRD: '',
    isRelatedPerson: 'No',
    holdsTenPercent: 'No',
    isTerminated: 'No',
  });

  const handleChange = (field: keyof AddressFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    let value = event.target.value;

    // Format phone and fax numbers
    if (field === 'phone' || field === 'fax') {
      value = formatPhoneNumber(value);
    }

    // Format ZIP code (allow only numbers and limit to 5 digits)
    if (field === 'zip') {
      value = value.replace(/\D/g, '').slice(0, 5);
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      startDate: date
    }));
  };

  // Function to handle selecting an office to update
  const handleOfficeSelect = (event: SelectChangeEvent) => {
    const selectedId = event.target.value;
    const selectedOffice = EXISTING_OFFICES.find(office => office.id === selectedId);
    
    if (selectedOffice) {
      // In reality, you would fetch the full office details from your backend here
      setFormData(prev => ({
        ...prev,
        selectedOffice: selectedId,
        // Pre-fill the form with the selected office's current information
        // This is mock data - in reality you'd get this from your backend
        street1: selectedOffice.address.split(',')[0],
        city: selectedOffice.address.split(',')[1].trim(),
        state: selectedOffice.address.split(',')[2].trim(),
      }));
    }
  };

  const handleCheckboxChange = (field: keyof AddressFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['street1', 'city', 'state', 'zip', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof AddressFormData]);

    if (missingFields.length > 0) {
      alert('Please fill in all required fields: ' + missingFields.join(', '));
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('Please enter a valid phone number in the format (XXX) XXX-XXXX');
      return;
    }

    // Validate ZIP code
    if (formData.zip.length !== 5) {
      alert('Please enter a valid 5-digit ZIP code');
      return;
    }

    console.log('Form data:', formData);
    // Handle form submission
  };

  return (
    <>
      <Box sx={{ width: '100%', mt: 2 }}>
        <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f8fafc' }}>
          <Typography variant="h6" gutterBottom>
            Please select the type of change requested from the list below
          </Typography>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Type of Change</InputLabel>
            <Select
              value={formData.updateType}
              label="Type of Change"
              onChange={handleChange('updateType')}
            >
              <MenuItem value="address">Add new / update existing / remove existing address</MenuItem>
              <MenuItem value="custodian">Adding Additional Custodians</MenuItem>
            </Select>
          </FormControl>

          {formData.updateType === 'custodian' && (
            <>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Name of Custodian or BD Firm:
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Select
                    value={formData.custodianName}
                    onChange={handleChange('custodianName')}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 300 // Make dropdown scrollable
                        }
                      }
                    }}
                  >
                    {CUSTODIANS.map(custodian => (
                      <MenuItem 
                        key={custodian.id} 
                        value={custodian.name}
                        sx={{
                          whiteSpace: 'normal', // Allow text to wrap
                          wordBreak: 'break-word'
                        }}
                      >
                        {custodian.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {formData.custodianName === 'Other' && (
                  <>
                    <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
                      If not listed above, name of custodian and CRD number (4 to 6 digits) of custodian.
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <TextField
                        fullWidth
                        label="Name"
                        value={formData.customCustodianName}
                        onChange={handleChange('customCustodianName')}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="CRD"
                        value={formData.customCustodianCRD}
                        onChange={handleChange('customCustodianCRD')}
                        inputProps={{ 
                          maxLength: 6,
                          pattern: '[0-9]*',
                          inputMode: 'numeric'
                        }}
                        helperText="Enter a 4 to 6 digit number"
                      />
                    </Box>
                  </>
                )}

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                  Is the Custodian a Related Person of Your Firm?
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Select
                    value={formData.isRelatedPerson}
                    onChange={handleChange('isRelatedPerson')}
                  >
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                  </Select>
                </FormControl>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                  Additional details are required for all custodians that hold ten percent (10%) or more of the RIA's
                  regulatory assets under management (RAUM) attributable to separately managed accounts
                  (SMAs). Does this custodian hold ten percent (10%) or more of your SMA RAUM? (If the answer is "No"
                  then the custodian will appear in Part 2A of Form ADV but not Part 1A of Form ADV per the Form ADV
                  instructions.)
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Select
                    value={formData.holdsTenPercent}
                    onChange={handleChange('holdsTenPercent')}
                  >
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                  </Select>
                </FormControl>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                  Are any custodial relationships being terminated as part of this request?
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Select
                    value={formData.isTerminated}
                    onChange={handleChange('isTerminated')}
                  >
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                  </Select>
                </FormControl>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                  Additional notes from firm to RIA in a Box: (optional)
                </Typography>
                <TextField
                  multiline
                  minRows={4}
                  fullWidth
                  variant="outlined"
                  value={formData.additionalNotes}
                  onChange={handleChange('additionalNotes')}
                  sx={{ mb: 2 }}
                />

                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    startIcon={<Send />}
                    sx={{
                      backgroundColor: '#8B0000',
                      '&:hover': {
                        backgroundColor: '#6B0000',
                      },
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 'normal',
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </>
          )}

          {formData.updateType === 'address' && (
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Action</InputLabel>
              <Select
                value={formData.secondaryType}
                label="Select Action"
                onChange={handleChange('secondaryType')}
              >
                <MenuItem value="update-office">Update existing office location</MenuItem>
                <MenuItem value="remove-office">Remove existing office location</MenuItem>
                <MenuItem value="add-branch">Add new branch/secondary office location</MenuItem>
                <MenuItem value="update-iar">Update IAR residential address</MenuItem>
              </Select>
            </FormControl>
          )}

          {formData.secondaryType === 'update-iar' && (
            <>
              <Typography variant="body1" paragraph>
                Please select the IAR(s) to whom this new residential address applies and provide the information
                for the new address. If the location also serves as a branch office of the firm, please instead select
                "Update existing office address" from the dropdown as additional information may be required.
              </Typography>

              <Box sx={{ mb: 3 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Please verify the start date"
                    value={formData.startDate}
                    onChange={handleDateChange}
                    format="MM/dd/yy"
                  />
                </LocalizationProvider>
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="Street 1"
                  value={formData.street1}
                  onChange={handleChange('street1')}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Street 2"
                  value={formData.street2}
                  onChange={handleChange('street2')}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="City"
                  value={formData.city}
                  onChange={handleChange('city')}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <FormControl required fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select
                    value={formData.state}
                    label="State"
                    onChange={handleChange('state')}
                  >
                    {US_STATES.map(state => (
                      <MenuItem key={state.code} value={state.code}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={formData.country}
                    label="Country"
                    onChange={handleChange('country')}
                  >
                    <MenuItem value="United States">United States</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="ZIP"
                  value={formData.zip}
                  onChange={handleChange('zip')}
                  inputProps={{ maxLength: 5 }}
                  helperText="5-digit ZIP code"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="Phone"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  inputProps={{ maxLength: 14 }}
                  helperText="Format: (XXX) XXX-XXXX"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Fax"
                  value={formData.fax}
                  onChange={handleChange('fax')}
                  inputProps={{ maxLength: 14 }}
                  helperText="Format: (XXX) XXX-XXXX"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Additional notes from firm to RIA in a Box: (optional)
                </Typography>
                <TextField
                  multiline
                  minRows={4}
                  fullWidth
                  variant="outlined"
                  value={formData.additionalNotes}
                  onChange={handleChange('additionalNotes')}
                  sx={{ mb: 2 }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Box>
            </>
          )}

          {formData.secondaryType === 'update-office' && (
            <>
              <Typography variant="body1" paragraph>
                Please select the office location you would like to update and provide the updated information.
              </Typography>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Office Location</InputLabel>
                <Select
                  value={formData.selectedOffice}
                  label="Select Office Location"
                  onChange={handleOfficeSelect}
                >
                  {EXISTING_OFFICES.map(office => (
                    <MenuItem key={office.id} value={office.id}>
                      {office.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {formData.selectedOffice && (
                <>
                  <Box sx={{ mb: 3 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Effective Date of Change"
                        value={formData.startDate}
                        onChange={handleDateChange}
                        format="MM/dd/yy"
                      />
                    </LocalizationProvider>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <TextField
                      required
                      fullWidth
                      label="Street 1"
                      value={formData.street1}
                      onChange={handleChange('street1')}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Street 2"
                      value={formData.street2}
                      onChange={handleChange('street2')}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <TextField
                      required
                      fullWidth
                      label="City"
                      value={formData.city}
                      onChange={handleChange('city')}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <FormControl required fullWidth>
                      <InputLabel>State</InputLabel>
                      <Select
                        value={formData.state}
                        label="State"
                        onChange={handleChange('state')}
                      >
                        {US_STATES.map(state => (
                          <MenuItem key={state.code} value={state.code}>
                            {state.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel>Country</InputLabel>
                      <Select
                        value={formData.country}
                        label="Country"
                        onChange={handleChange('country')}
                      >
                        <MenuItem value="United States">United States</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <TextField
                      required
                      fullWidth
                      label="ZIP"
                      value={formData.zip}
                      onChange={handleChange('zip')}
                      inputProps={{ maxLength: 5 }}
                      helperText="5-digit ZIP code"
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <TextField
                      required
                      fullWidth
                      label="Phone"
                      value={formData.phone}
                      onChange={handleChange('phone')}
                      inputProps={{ maxLength: 14 }}
                      helperText="Format: (XXX) XXX-XXXX"
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Fax"
                      value={formData.fax}
                      onChange={handleChange('fax')}
                      inputProps={{ maxLength: 14 }}
                      helperText="Format: (XXX) XXX-XXXX"
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Additional notes from firm to RIA in a Box: (optional)
                    </Typography>
                    <TextField
                      multiline
                      minRows={4}
                      fullWidth
                      variant="outlined"
                      value={formData.additionalNotes}
                      onChange={handleChange('additionalNotes')}
                      sx={{ mb: 2 }}
                    />
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Submit Changes
                    </Button>
                  </Box>
                </>
              )}
            </>
          )}

          {formData.secondaryType === 'remove-office' && (
            <>
              <Typography variant="body1" paragraph color="error">
                Please select the office location you would like to remove. This action cannot be undone.
              </Typography>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Office to Remove</InputLabel>
                <Select
                  value={formData.selectedOffice}
                  label="Select Office to Remove"
                  onChange={handleOfficeSelect}
                >
                  {EXISTING_OFFICES.map(office => (
                    <MenuItem key={office.id} value={office.id}>
                      {office.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {formData.selectedOffice && (
                <>
                  <Box sx={{ mb: 3 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Effective Date of Removal"
                        value={formData.startDate}
                        onChange={handleDateChange}
                        format="MM/dd/yy"
                      />
                    </LocalizationProvider>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Reason for removal (required):
                    </Typography>
                    <TextField
                      multiline
                      minRows={4}
                      required
                      fullWidth
                      variant="outlined"
                      value={formData.additionalNotes}
                      onChange={handleChange('additionalNotes')}
                    />
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleSubmit}
                    >
                      Confirm Removal
                    </Button>
                  </Box>
                </>
              )}
            </>
          )}

          {formData.secondaryType === 'add-branch' && (
            <>
              <Typography variant="body1" paragraph>
                Please provide the information for the new branch or secondary office location.
              </Typography>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Branch Type</InputLabel>
                  <Select
                    value={formData.branchType}
                    label="Branch Type"
                    onChange={handleChange('branchType')}
                    required
                  >
                    <MenuItem value="main">Main Office</MenuItem>
                    <MenuItem value="branch">Branch Office</MenuItem>
                    <MenuItem value="satellite">Satellite Office</MenuItem>
                    <MenuItem value="temporary">Temporary Location</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Supervising Office</InputLabel>
                  <Select
                    value={formData.supervisingOffice}
                    label="Supervising Office"
                    onChange={handleChange('supervisingOffice')}
                    required
                  >
                    {EXISTING_OFFICES.map(office => (
                      <MenuItem key={office.id} value={office.id}>
                        {office.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Primary Supervisor</InputLabel>
                  <Select
                    value={formData.primarySupervisor}
                    label="Primary Supervisor"
                    onChange={handleChange('primarySupervisor')}
                    required
                  >
                    {SUPERVISORS.map(supervisor => (
                      <MenuItem key={supervisor.id} value={supervisor.id}>
                        {supervisor.name} - {supervisor.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Operating Hours"
                  value={formData.operatingHours}
                  onChange={handleChange('operatingHours')}
                  placeholder="e.g., Mon-Fri 9:00 AM - 5:00 PM"
                  sx={{ mb: 2 }}
                  required
                />

                <Box sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.isSharedSpace}
                        onChange={handleCheckboxChange('isSharedSpace')}
                      />
                    }
                    label="This is a shared office space"
                  />
                </Box>

                {formData.isSharedSpace && (
                  <TextField
                    fullWidth
                    label="Shared Space Details"
                    value={formData.sharedSpaceDetails}
                    onChange={handleChange('sharedSpaceDetails')}
                    placeholder="Please provide details about the shared space arrangement"
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                    required
                  />
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Effective Start Date"
                    value={formData.startDate}
                    onChange={handleDateChange}
                    format="MM/dd/yy"
                  />
                </LocalizationProvider>
              </Box>

              {/* Regular address fields */}
              <Box sx={{ mb: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="Street 1"
                  value={formData.street1}
                  onChange={handleChange('street1')}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Street 2"
                  value={formData.street2}
                  onChange={handleChange('street2')}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="City"
                  value={formData.city}
                  onChange={handleChange('city')}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <FormControl required fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select
                    value={formData.state}
                    label="State"
                    onChange={handleChange('state')}
                  >
                    {US_STATES.map(state => (
                      <MenuItem key={state.code} value={state.code}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={formData.country}
                    label="Country"
                    onChange={handleChange('country')}
                  >
                    <MenuItem value="United States">United States</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="ZIP"
                  value={formData.zip}
                  onChange={handleChange('zip')}
                  inputProps={{ maxLength: 5 }}
                  helperText="5-digit ZIP code"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="Phone"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  inputProps={{ maxLength: 14 }}
                  helperText="Format: (XXX) XXX-XXXX"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Fax"
                  value={formData.fax}
                  onChange={handleChange('fax')}
                  inputProps={{ maxLength: 14 }}
                  helperText="Format: (XXX) XXX-XXXX"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Additional notes: (optional)
                </Typography>
                <TextField
                  multiline
                  minRows={4}
                  fullWidth
                  variant="outlined"
                  value={formData.additionalNotes}
                  onChange={handleChange('additionalNotes')}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit New Branch Office
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>

      <Box sx={{ width: '100%', mt: 4 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: '1.25rem',
            fontWeight: 500,
            color: '#1a1a1a',
            mb: 2
          }}
        >
          Pending Requests
        </Typography>
        {/* Pending requests content will go here */}
      </Box>
    </>
  );
};

export default AddressUpdateForm; 