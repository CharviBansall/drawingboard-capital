import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';

interface OtherFormData {
  requestType: string;
  description: string;
  urgency: string;
  additionalNotes: string;
}

const OtherForm: React.FC = () => {
  const [formData, setFormData] = useState<OtherFormData>({
    requestType: '',
    description: '',
    urgency: '',
    additionalNotes: '',
  });

  const handleInputChange = (field: keyof OtherFormData) => (event: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log('Other form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: '#f8f9fa' }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
        Other Request Details
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
          1. Type of Request:
        </Typography>
        <FormControl fullWidth>
          <Select
            value={formData.requestType}
            onChange={handleInputChange('requestType')}
            displayEmpty
            sx={{ backgroundColor: 'white' }}
          >
            <MenuItem value="" disabled>
              Select request type
            </MenuItem>
            <MenuItem value="address_change">Address Change</MenuItem>
            <MenuItem value="business_name_change">
              Business Name Change
            </MenuItem>
            <MenuItem value="contact_information">
              Contact Information Update
            </MenuItem>
            <MenuItem value="regulatory_question">Regulatory Question</MenuItem>
            <MenuItem value="compliance_clarification">
              Compliance Clarification
            </MenuItem>
            <MenuItem value="form_amendment">Form Amendment</MenuItem>
            <MenuItem value="general_inquiry">General Inquiry</MenuItem>
            <MenuItem value="other">Other (specify in description)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
          2. Detailed Description:
        </Typography>
        <TextField
          value={formData.description}
          onChange={handleInputChange('description')}
          multiline
          rows={4}
          fullWidth
          placeholder="Please provide a detailed description of your request, including any specific changes needed, relevant dates, and background information..."
          sx={{ backgroundColor: 'white' }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
          3. Urgency Level:
        </Typography>
        <FormControl fullWidth>
          <Select
            value={formData.urgency}
            onChange={handleInputChange('urgency')}
            displayEmpty
            sx={{ backgroundColor: 'white' }}
          >
            <MenuItem value="" disabled>
              Select urgency level
            </MenuItem>
            <MenuItem value="low">Low - No specific deadline</MenuItem>
            <MenuItem value="medium">Medium - Within 2-4 weeks</MenuItem>
            <MenuItem value="high">High - Within 1-2 weeks</MenuItem>
            <MenuItem value="urgent">Urgent - Within 1 week</MenuItem>
            <MenuItem value="critical">
              Critical - Immediate attention required
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
          4. Additional Notes or Supporting Information: (optional)
        </Typography>
        <TextField
          value={formData.additionalNotes}
          onChange={handleInputChange('additionalNotes')}
          multiline
          rows={3}
          fullWidth
          placeholder="Any additional context, supporting documents needed, or special considerations..."
          sx={{ backgroundColor: 'white' }}
        />
      </Box>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: '#dc2626',
            color: 'white',
            '&:hover': {
              backgroundColor: '#b91c1c',
            },
            px: 4,
            py: 1,
          }}
        >
          Submit Request
        </Button>
      </Box>
    </Paper>
  );
};

export default OtherForm;
