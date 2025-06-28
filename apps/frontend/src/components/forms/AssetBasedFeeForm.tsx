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
  FormControlLabel,
  Checkbox,
  SelectChangeEvent,
} from '@mui/material';
import { Send } from '@mui/icons-material';

interface FeeStructure {
  feeType: string;
  minFee: string;
  maxFee: string;
  breakpoints: {
    amount: string;
    percentage: string;
  }[];
  hasNegotiableFees: boolean;
  hasPerformanceFees: boolean;
  additionalNotes: string;
}

const AssetBasedFeeForm: React.FC = () => {
  const [feeStructure, setFeeStructure] = useState<FeeStructure>({
    feeType: 'tiered',
    minFee: '',
    maxFee: '',
    breakpoints: [{ amount: '', percentage: '' }],
    hasNegotiableFees: false,
    hasPerformanceFees: false,
    additionalNotes: '',
  });

  const handleFeeTypeChange = (event: SelectChangeEvent) => {
    setFeeStructure({
      ...feeStructure,
      feeType: event.target.value,
    });
  };

  const handleBreakpointChange = (index: number, field: 'amount' | 'percentage', value: string) => {
    const newBreakpoints = [...feeStructure.breakpoints];
    newBreakpoints[index] = {
      ...newBreakpoints[index],
      [field]: value,
    };
    setFeeStructure({
      ...feeStructure,
      breakpoints: newBreakpoints,
    });
  };

  const addBreakpoint = () => {
    setFeeStructure({
      ...feeStructure,
      breakpoints: [...feeStructure.breakpoints, { amount: '', percentage: '' }],
    });
  };

  const removeBreakpoint = (index: number) => {
    const newBreakpoints = feeStructure.breakpoints.filter((_, i) => i !== index);
    setFeeStructure({
      ...feeStructure,
      breakpoints: newBreakpoints,
    });
  };

  const handleSubmit = () => {
    // Validate and submit the form
    console.log('Fee structure:', feeStructure);
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f8fafc' }}>
        <Typography variant="h6" gutterBottom>
          Asset-Based Fee Structure Update
        </Typography>

        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Fee Structure Type</InputLabel>
            <Select
              value={feeStructure.feeType}
              label="Fee Structure Type"
              onChange={handleFeeTypeChange}
            >
              <MenuItem value="tiered">Tiered Fee Schedule</MenuItem>
              <MenuItem value="flat">Flat Fee Schedule</MenuItem>
              <MenuItem value="custom">Custom Fee Schedule</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Minimum Fee (if applicable)"
              value={feeStructure.minFee}
              onChange={(e) => setFeeStructure({ ...feeStructure, minFee: e.target.value })}
              placeholder="e.g., $1,000 annually"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Maximum Fee (if applicable)"
              value={feeStructure.maxFee}
              onChange={(e) => setFeeStructure({ ...feeStructure, maxFee: e.target.value })}
              placeholder="e.g., $100,000 annually"
            />
          </Box>

          <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
            Fee Schedule Breakpoints
          </Typography>

          {feeStructure.breakpoints.map((breakpoint, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                label="Asset Amount"
                value={breakpoint.amount}
                onChange={(e) => handleBreakpointChange(index, 'amount', e.target.value)}
                placeholder="e.g., $1,000,000"
                sx={{ flex: 1 }}
              />
              <TextField
                label="Fee Percentage"
                value={breakpoint.percentage}
                onChange={(e) => handleBreakpointChange(index, 'percentage', e.target.value)}
                placeholder="e.g., 1.00%"
                sx={{ flex: 1 }}
              />
              {index > 0 && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeBreakpoint(index)}
                >
                  Remove
                </Button>
              )}
            </Box>
          ))}

          <Button
            variant="outlined"
            onClick={addBreakpoint}
            sx={{ mb: 3 }}
          >
            Add Breakpoint
          </Button>

          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={feeStructure.hasNegotiableFees}
                  onChange={(e) => setFeeStructure({ ...feeStructure, hasNegotiableFees: e.target.checked })}
                />
              }
              label="Fees are negotiable"
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={feeStructure.hasPerformanceFees}
                  onChange={(e) => setFeeStructure({ ...feeStructure, hasPerformanceFees: e.target.checked })}
                />
              }
              label="Performance fees are charged for certain accounts"
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
              value={feeStructure.additionalNotes}
              onChange={(e) => setFeeStructure({ ...feeStructure, additionalNotes: e.target.value })}
              placeholder="Enter any additional details about the fee structure"
              sx={{ mb: 2 }}
            />
          </Box>

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
      </Paper>
    </Box>
  );
};

export default AssetBasedFeeForm; 