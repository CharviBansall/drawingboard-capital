import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  IconButton,
} from '@mui/material';

interface AUMTranche {
  rangeMin: string;
  rangeMax: string;
  riaFeePercent: string;
  tpmmFeePercent: string;
  totalFeePercent: string;
}

interface TPMMFormData {
  tpmmLegalName: string;
  aumTranches: AUMTranche[];
  clientFeePaymentMethod: string;
  clientFeePaymentFrequency: string;
  clientFeePaymentTiming: string;
  additionalNotes: string;
}

const TPMMForm: React.FC = () => {
  const [formData, setFormData] = useState<TPMMFormData>({
    tpmmLegalName: '',
    aumTranches: [{
      rangeMin: '',
      rangeMax: '',
      riaFeePercent: '',
      tpmmFeePercent: '',
      totalFeePercent: ''
    }],
    clientFeePaymentMethod: '',
    clientFeePaymentFrequency: '',
    clientFeePaymentTiming: '',
    additionalNotes: '',
  });

  const handleInputChange = (field: keyof Omit<TPMMFormData, 'aumTranches'>) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleTrancheChange = (index: number, field: keyof AUMTranche) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedTranches = [...formData.aumTranches];
    updatedTranches[index] = {
      ...updatedTranches[index],
      [field]: event.target.value
    };
    setFormData(prev => ({
      ...prev,
      aumTranches: updatedTranches
    }));
  };

  const addAnotherTranche = () => {
    setFormData(prev => ({
      ...prev,
      aumTranches: [
        ...prev.aumTranches,
        { rangeMin: '', rangeMax: '', riaFeePercent: '', tpmmFeePercent: '', totalFeePercent: '' }
      ]
    }));
  };

  const deleteTranche = (index: number) => {
    if (formData.aumTranches.length > 1) {
      const updatedTranches = formData.aumTranches.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        aumTranches: updatedTranches
      }));
    }
  };

  const handleSubmit = () => {
    console.log('Submitting TPMM form:', formData);
    // Handle form submission logic here
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        TPMM: Adding a new third-party money manager / investment adviser
      </Typography>

      {/* Advisory Services Note */}
      <Box sx={{ mb: 3, p: 2, backgroundColor: '#f0f8ff', borderRadius: 1 }}>
        <Typography variant="body1" paragraph>
          <strong>Note for Advisory Services:</strong> If you have a TPMM (third-party money manager / investment adviser) 
          involved in the furnishing of investment advisory services to your clients, then the relationship would 
          typically be disclosed as "Selection of Other Advisers" on Form ADV. In order to add a TPMM relationship to 
          your Form ADV Part 2A, we would ask that you please provide the information indicated below. <em>Please 
          also note that you will likely have to update your investment advisory contract to reflect use of a TPMM if 
          this is the first one you are adding/utilizing.</em>
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>Note for Non-Advisory Services:</strong> If, however, the third-party is providing back office services (e.g., 
          billing/invoicing, reporting, account aggregation), then it typically would not be disclosed on Form ADV. 
          This is similar to other service providers, such as a CRM system, payroll company, or archiving service.
        </Typography>
      </Box>

      {/* Section 1 - Full Legal Name */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>1. Full legal name of TPMM:</strong>
        </Typography>
        <TextField
          value={formData.tpmmLegalName}
          onChange={handleInputChange('tpmmLegalName')}
          variant="outlined"
          size="small"
          fullWidth
          sx={{ maxWidth: '500px' }}
        />
      </Box>

      {/* Section 2 - Fee Split */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>2. Fee Split -</strong> The fees (typically annual % of AUM) that will be paid by clients broken out by tranche, if 
          applicable, across:
        </Typography>

        {/* Instructions */}
        <Box sx={{ mb: 2, p: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
          <Typography variant="body2" paragraph sx={{ fontStyle: 'italic' }}>
            <strong>Instructions for AUM Tranches:</strong> If your RIA will charge the same maximum fee to all account sizes, 
            leave the default range values and just complete the annual fee columns (3rd, 4th, 5th columns). 
            Keep in mind that this does not preclude your RIA from negotiating fees for specific clients.
          </Typography>
          
          <Typography variant="body2" paragraph sx={{ fontStyle: 'italic' }}>
            However, many RIAs charge AUM-based fees on a graduated scale. For example, a firm may 
            charge a 1.50% management fee on the first $1,000,000 placed under management by a client, 
            and then 1.25% on the assets between the levels of $1,000,001 and $2,000,000. Please use the below 
            fields to specify the fee schedule for your RIA and the TPMM. Add as many "tranches" to your 
            schedule as necessary. Note: Please <strong>do not indicate overlapping</strong> tranches (e.g., $1 - $1,000,000, 
            $1,000,000 - $2,000,000, $2,000,000 - AND UP); instead <strong>be sure to indicate consecutive tranches 
            (e.g., $1 - $1,000,000, $1,000,001 - $2,000,000, $2,000,001 - AND UP)</strong>.
          </Typography>
        </Box>

        {/* Fee Structure Table */}
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                  AUM Tranche
                </TableCell>
                <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }} colSpan={2}>
                  Fee Split
                </TableCell>
                                 <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }} colSpan={3}>
                   
                 </TableCell>
                 <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                   Actions
                 </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  AUM Range Min<br />
                  (in Dollars)
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  AUM Range Max<br />
                  (in Dollars)
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  Annual fee your RIA<br />
                  receives [your RIA's<br />
                  portion]<br />
                  (as a percent)
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  Annual fee the TPMM<br />
                  receives [TPMM's<br />
                  portion]<br />
                  (as a percent)
                </TableCell>
                                 <TableCell sx={{ fontWeight: 'bold' }}>
                   Total annual fee the<br />
                   client pays [your RIA's<br />
                   portion + TPMM's<br />
                   portion]<br />
                   (as a percent)
                 </TableCell>
                 <TableCell sx={{ fontWeight: 'bold' }}>
                   
                 </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.aumTranches.map((tranche, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      value={tranche.rangeMin}
                      onChange={handleTrancheChange(index, 'rangeMin')}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: '$'
                      }}
                      sx={{ width: '120px' }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={tranche.rangeMax}
                      onChange={handleTrancheChange(index, 'rangeMax')}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: '$'
                      }}
                      sx={{ width: '120px' }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={tranche.riaFeePercent}
                      onChange={handleTrancheChange(index, 'riaFeePercent')}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        endAdornment: '%'
                      }}
                      sx={{ width: '80px' }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={tranche.tpmmFeePercent}
                      onChange={handleTrancheChange(index, 'tpmmFeePercent')}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        endAdornment: '%'
                      }}
                      sx={{ width: '80px' }}
                    />
                  </TableCell>
                                     <TableCell>
                     <TextField
                       value={tranche.totalFeePercent}
                       onChange={handleTrancheChange(index, 'totalFeePercent')}
                       variant="outlined"
                       size="small"
                       InputProps={{
                         endAdornment: '%'
                       }}
                       sx={{ width: '80px' }}
                     />
                   </TableCell>
                   <TableCell>
                     {formData.aumTranches.length > 1 && (
                       <IconButton
                         onClick={() => deleteTranche(index)}
                         size="small"
                         sx={{ color: 'red' }}
                       >
                         ✕
                       </IconButton>
                     )}
                   </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Link
          component="button"
          variant="body2"
          onClick={addAnotherTranche}
          sx={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
        >
          &lt;Click here to add another tranche if needed&gt;
        </Link>
      </Box>

      {/* Section 3 - Method of Client's Fee Payment */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>3. Method of client's fee payment:</strong>
        </Typography>
        <FormControl fullWidth sx={{ maxWidth: '400px' }}>
                     <Select
             value={formData.clientFeePaymentMethod}
             onChange={handleInputChange('clientFeePaymentMethod')}
             displayEmpty
             sx={{ backgroundColor: 'white' }}
           >
            <MenuItem value="" disabled>Select payment method</MenuItem>
            <MenuItem value="Withdrawn directly from client account">Withdrawn directly from client account</MenuItem>
            <MenuItem value="Invoiced and payable">Invoiced and payable</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Section 4 - Frequency of Client's Fee Payment */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>4. Frequency of client's fee payment:</strong>
        </Typography>
        <FormControl fullWidth sx={{ maxWidth: '400px' }}>
                     <Select
             value={formData.clientFeePaymentFrequency}
             onChange={handleInputChange('clientFeePaymentFrequency')}
             displayEmpty
             sx={{ backgroundColor: 'white' }}
           >
            <MenuItem value="" disabled>Select frequency</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Quarterly">Quarterly</MenuItem>
            <MenuItem value="Semi-annually">Semi-annually</MenuItem>
            <MenuItem value="Annually">Annually</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Section 5 - Timing Client's Fee Payment */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>5. Timing client's fee payment:</strong>
        </Typography>
        <FormControl fullWidth sx={{ maxWidth: '400px' }}>
                     <Select
             value={formData.clientFeePaymentTiming}
             onChange={handleInputChange('clientFeePaymentTiming')}
             displayEmpty
             sx={{ backgroundColor: 'white' }}
           >
            <MenuItem value="" disabled>Select timing</MenuItem>
            <MenuItem value="In advance">In advance</MenuItem>
            <MenuItem value="In arrears">In arrears</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Section 6 - Additional Notes */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>6. Additional notes from firm to RIA in a Box:</strong> (optional)
        </Typography>
        <TextField
          multiline
          minRows={4}
          fullWidth
          variant="outlined"
          value={formData.additionalNotes}
          onChange={handleInputChange('additionalNotes')}
        />
      </Box>

      {/* Submit Button */}
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
    </Paper>
  );
};

export default TPMMForm; 