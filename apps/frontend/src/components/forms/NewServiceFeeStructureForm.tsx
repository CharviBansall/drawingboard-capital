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

interface ServiceFeeFormData {
  feeStructure: string;
  feeAmount: string;
  paymentMethods: {
    withdrawnDirectly: boolean;
    invoicedPayable: boolean;
  };
  paymentTiming: string;
  services: {
    investmentPlanning: boolean;
    lifeInsurance: boolean;
    taxConcerns: boolean;
    retirementPlanning: boolean;
    educationPlanning: boolean;
    debtCreditPlanning: boolean;
  };
  additionalServices: string;
  additionalNotes: string;
}

const NewServiceFeeStructureForm: React.FC = () => {
  const [formData, setFormData] = useState<ServiceFeeFormData>({
    feeStructure: 'Fixed',
    feeAmount: '',
    paymentMethods: {
      withdrawnDirectly: false,
      invoicedPayable: false,
    },
    paymentTiming: 'In Advance',
    services: {
      investmentPlanning: false,
      lifeInsurance: false,
      taxConcerns: false,
      retirementPlanning: false,
      educationPlanning: false,
      debtCreditPlanning: false,
    },
    additionalServices: '',
    additionalNotes: '',
  });

  const handleInputChange =
    (field: keyof Omit<ServiceFeeFormData, 'paymentMethods' | 'services'>) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any,
    ) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handlePaymentMethodChange =
    (method: keyof ServiceFeeFormData['paymentMethods']) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        paymentMethods: {
          ...prev.paymentMethods,
          [method]: event.target.checked,
        },
      }));
    };

  const handleServiceChange =
    (service: keyof ServiceFeeFormData['services']) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        services: {
          ...prev.services,
          [service]: event.target.checked,
        },
      }));
    };

  const handleSubmit = () => {
    console.log('Submitting service fee structure form:', formData);
    // Handle form submission logic here
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        New Service & Fee Structure: Financial Planning
      </Typography>

      {/* Section 1 - Fee Structure */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>1. Fee Structure:</strong>
        </Typography>
        <FormControl size="small" sx={{ minWidth: '120px' }}>
          <Select
            value={formData.feeStructure}
            onChange={handleInputChange('feeStructure')}
            sx={{ backgroundColor: 'white' }}
          >
            <MenuItem value="Fixed">Fixed</MenuItem>
            <MenuItem value="Hourly">Hourly</MenuItem>
            <MenuItem value="Percentage">Percentage</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Section 2 - Fee For Financial Planning */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>2. Fee For Financial Planning:</strong>
        </Typography>
        <TextField
          value={formData.feeAmount}
          onChange={handleInputChange('feeAmount')}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          sx={{ width: '300px' }}
        />
      </Box>

      {/* Section 3 - Method of Fee Payment */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>3. Method of Fee Payment:</strong> (
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

      {/* Section 4 - Timing of Payment of Fees */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>4. Timing of Payment of Fees:</strong>
        </Typography>
        <FormControl size="small" sx={{ minWidth: '120px' }}>
          <Select
            value={formData.paymentTiming}
            onChange={handleInputChange('paymentTiming')}
            sx={{ backgroundColor: 'white' }}
          >
            <MenuItem value="In Advance">In Advance</MenuItem>
            <MenuItem value="In Arrears">In Arrears</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Section 5 - Services Included */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>
            5. Select all services that will be included as part of your firm's
            larger financial planning offering:
          </strong>
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.services.investmentPlanning}
              onChange={handleServiceChange('investmentPlanning')}
            />
          }
          label="Investment Planning"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.services.lifeInsurance}
              onChange={handleServiceChange('lifeInsurance')}
            />
          }
          label="Life Insurance"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.services.taxConcerns}
              onChange={handleServiceChange('taxConcerns')}
            />
          }
          label="Tax Concerns"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.services.retirementPlanning}
              onChange={handleServiceChange('retirementPlanning')}
            />
          }
          label="Retirement Planning"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.services.educationPlanning}
              onChange={handleServiceChange('educationPlanning')}
            />
          }
          label="Education Planning"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.services.debtCreditPlanning}
              onChange={handleServiceChange('debtCreditPlanning')}
            />
          }
          label="Debt/Credit Planning"
          sx={{ display: 'block', mb: 1 }}
        />

        {/* Additional Services Text Field */}
        <Box sx={{ mt: 2 }}>
          <TextField
            value={formData.additionalServices}
            onChange={handleInputChange('additionalServices')}
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Please list all additional services you wish to include, each separated by a semi-colon ';')"
            sx={{ fontStyle: 'italic' }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, fontStyle: 'italic' }}
          >
            (Please list all additional services you wish to include, each
            separated by a semi-colon ';')
          </Typography>
        </Box>
      </Box>

      {/* Section 6 - Additional Notes */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>6. Additional notes from firm to RIA in a Box:</strong>{' '}
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

export default NewServiceFeeStructureForm;
