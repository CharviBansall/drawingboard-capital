import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';

interface PerformanceBasedFeeFormData {
  managementFee: string;
  performanceFee: string;
  paymentMethods: {
    withdrawnDirectly: boolean;
    invoicedPayable: boolean;
  };
  managementFeeFrequency: string;
  managementFeeTiming: string;
  performanceFeeFrequency: string;
  portfolioManagementOffered: string;
  additionalInfo: string;
  additionalNotes: string;
}

const PerformanceBasedFeeForm: React.FC = () => {
  const [formData, setFormData] = useState<PerformanceBasedFeeFormData>({
    managementFee: '',
    performanceFee: '',
    paymentMethods: {
      withdrawnDirectly: false,
      invoicedPayable: false,
    },
    managementFeeFrequency: 'Daily',
    managementFeeTiming: 'In Advance',
    performanceFeeFrequency: 'Daily',
    portfolioManagementOffered: 'Yes',
    additionalInfo: '',
    additionalNotes: '',
  });

  const handleInputChange =
    (field: keyof Omit<PerformanceBasedFeeFormData, 'paymentMethods'>) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any,
    ) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handlePaymentMethodChange =
    (method: keyof PerformanceBasedFeeFormData['paymentMethods']) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        paymentMethods: {
          ...prev.paymentMethods,
          [method]: event.target.checked,
        },
      }));
    };

  const handleSubmit = () => {
    console.log('Submitting performance-based fee form:', formData);
    // Handle form submission logic here
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Fee Structure: Performance-based fee update
      </Typography>

      {/* Section 1 - Management Fee */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>1.</strong> Management Fee [
          <em>
            Note: This is the annual % of AUM that will be paid by the client.
          </em>
          ]:
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            variant="outlined"
            size="small"
            value={formData.managementFee}
            onChange={handleInputChange('managementFee')}
            sx={{ width: '120px' }}
          />
          <Typography>%</Typography>
        </Box>
      </Box>

      {/* Section 2 - Performance Fee */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>2.</strong> Performance Fee [
          <em>
            Note: This is the % on capital appreciation that will be paid by the
            client.
          </em>
          ]:
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            variant="outlined"
            size="small"
            value={formData.performanceFee}
            onChange={handleInputChange('performanceFee')}
            sx={{ width: '120px' }}
          />
          <Typography>%</Typography>
        </Box>
      </Box>

      {/* Section 3 - Method of Fee Payment */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>3.</strong> Method of Fee Payment: (
          <em>Select all that apply</em>)
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.paymentMethods.withdrawnDirectly}
              onChange={handlePaymentMethodChange('withdrawnDirectly')}
            />
          }
          label="Withdrawn directly from client account with client written authorization"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.paymentMethods.invoicedPayable}
              onChange={handlePaymentMethodChange('invoicedPayable')}
            />
          }
          label={
            <span>
              Invoiced and payable via cash, check, or wire [
              <em>
                Note: Credit card payment is <strong>not</strong> recommended
                because it is typically deemed <strong>custody</strong> of
                client assets.
              </em>
              ]
            </span>
          }
          sx={{ display: 'block', mb: 1 }}
        />
      </Box>

      {/* Section 4 - Frequency of Payment of Management Fee */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>4.</strong> Frequency of Payment of Management Fee:
        </Typography>
        <FormControl size="small">
          <Select
            value={formData.managementFeeFrequency}
            onChange={handleInputChange('managementFeeFrequency')}
            sx={{ minWidth: '120px' }}
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Quarterly">Quarterly</MenuItem>
            <MenuItem value="Semi-annually">Semi-annually</MenuItem>
            <MenuItem value="Annually">Annually</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Section 5 - Timing of Payment of Management Fee */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>5.</strong> Timing of Payment of Management Fee:
        </Typography>
        <FormControl size="small">
          <Select
            value={formData.managementFeeTiming}
            onChange={handleInputChange('managementFeeTiming')}
            sx={{ minWidth: '120px' }}
          >
            <MenuItem value="In Advance">In Advance</MenuItem>
            <MenuItem value="In Arrears">In Arrears</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Section 6 - Frequency of Payment of Performance Fee */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>6.</strong> Frequency of Payment of Performance Fee [
          <em>
            Note: This fee is payable in arrears <u>only</u>.
          </em>
          ]:
        </Typography>
        <FormControl size="small">
          <Select
            value={formData.performanceFeeFrequency}
            onChange={handleInputChange('performanceFeeFrequency')}
            sx={{ minWidth: '120px' }}
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Quarterly">Quarterly</MenuItem>
            <MenuItem value="Semi-annually">Semi-annually</MenuItem>
            <MenuItem value="Annually">Annually</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Section 7 - Portfolio Management Question */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>7.</strong> Does the firm also offer portfolio management to
          accounts that are <strong>not</strong> charged a Performance Fee,
          instead charging <strong>only</strong> the "Management Fee" specified
          above?
        </Typography>
        <FormControl size="small">
          <Select
            value={formData.portfolioManagementOffered}
            onChange={handleInputChange('portfolioManagementOffered')}
            sx={{ minWidth: '120px' }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Section 8 - Additional Information */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>8.</strong> <strong>IT IS ASSUMED</strong> that a{' '}
          <u>high water mark</u> will be utilized -{' '}
          <strong>but not a hurdle rate</strong> - and that a Performance Fee
          will be charged to <strong>only</strong> <u>qualified clients</u>.
          Please advise if there is any additional relevant information.
        </Typography>
        <TextField
          multiline
          minRows={4}
          fullWidth
          variant="outlined"
          value={formData.additionalInfo}
          onChange={handleInputChange('additionalInfo')}
        />
      </Box>

      {/* Section 9 - Additional Notes */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>9.</strong> Additional notes from firm to RIA in a Box:
          (optional)
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

export default PerformanceBasedFeeForm;
