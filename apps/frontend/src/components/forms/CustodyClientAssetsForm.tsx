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
  Link,
} from '@mui/material';

interface CustodyFormData {
  description: string;
  clientFunds: string;
  numberOfClients: string;
  qualifiedCustodians: string;
  safeguards: {
    pooledVehicleStatements: boolean;
    pooledVehicleAudit: boolean;
    surpriseExamination: boolean;
    internalControlReport: boolean;
    standingLetterAuth: boolean;
  };
  additionalNotes: string;
}

const CustodyClientAssetsForm: React.FC = () => {
  const [formData, setFormData] = useState<CustodyFormData>({
    description: '',
    clientFunds: '',
    numberOfClients: '',
    qualifiedCustodians: '',
    safeguards: {
      pooledVehicleStatements: false,
      pooledVehicleAudit: false,
      surpriseExamination: false,
      internalControlReport: false,
      standingLetterAuth: false,
    },
    additionalNotes: '',
  });

  const handleInputChange = (field: keyof Omit<CustodyFormData, 'safeguards'>) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSafeguardChange = (safeguard: keyof CustodyFormData['safeguards']) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      safeguards: {
        ...prev.safeguards,
        [safeguard]: event.target.checked,
      },
    }));
  };

  const handleSubmit = () => {
    console.log('Submitting custody form:', formData);
    // Handle form submission logic here
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Adding Custody of Client Assets
      </Typography>

      {/* Section A - Description */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>A.</strong> Please provide a description of <strong>why</strong> the firm has custody:
        </Typography>
        <TextField
          multiline
          minRows={4}
          fullWidth
          variant="outlined"
          value={formData.description}
          onChange={handleInputChange('description')}
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          (Some examples: Affiliate acts as trustee to a trust client; Related to sponsor and manager of a 
          private fund/pooled investment vehicle; Affiliate has bill-pay or signatory authority for client 
          accounts; <strong>Standing Letter of Authorization</strong>; etc.)
        </Typography>
      </Box>

      {/* Section B - Client Funds Amount */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>B.</strong> What is the approximate amount of client funds for which you have custody?
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={formData.clientFunds}
          onChange={handleInputChange('clientFunds')}
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          (Note: The RIA will have to tally up the assets over which it has custody. However, if the RIA has 
          custody over all regulatory AUM listed in Form ADV, then please indicate "ALL FIRM AUM" in the text 
          box below and the regulatory AUM figure from Form ADV will be used rather than having to re-
          calculate AUM for all accounts.)
        </Typography>
      </Box>

      {/* Section C - Number of Clients */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>C.</strong> What is the total number of clients for which you have custody?
        </Typography>
        <TextField
          type="number"
          variant="outlined"
          value={formData.numberOfClients}
          onChange={handleInputChange('numberOfClients')}
          sx={{ width: '200px' }}
        />
      </Box>

      {/* Section D - Qualified Custodians */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>D.</strong> How many persons/firms (including related persons) act as qualified custodians in connection 
          with advisory services the RIA provide to clients?
        </Typography>
        <TextField
          type="number"
          variant="outlined"
          value={formData.qualifiedCustodians}
          onChange={handleInputChange('qualifiedCustodians')}
          sx={{ width: '200px' }}
        />
      </Box>

      {/* Section E - Custody Safeguards */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>E.</strong> Please select all of the custody safeguards that the RIA will use:
        </Typography>
        
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.safeguards.pooledVehicleStatements}
              onChange={handleSafeguardChange('pooledVehicleStatements')}
            />
          }
          label="The RIA manages a pooled investment vehicle and a qualified custodian(s) sends account statements at least quarterly to the fund's investors."
          sx={{ display: 'block', mb: 2 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.safeguards.pooledVehicleAudit}
              onChange={handleSafeguardChange('pooledVehicleAudit')}
            />
          }
          label="The RIA manages a pooled investment vehicle, an independent public accountant audits annually the pooled investment vehicle, and the audited financial statements are distributed to the fund's investors."
          sx={{ display: 'block', mb: 2 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.safeguards.surpriseExamination}
              onChange={handleSafeguardChange('surpriseExamination')}
            />
          }
          label="An independent public accountant conducts an annual surprise examination of client funds and securities."
          sx={{ display: 'block', mb: 2 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.safeguards.internalControlReport}
              onChange={handleSafeguardChange('internalControlReport')}
            />
          }
          label={
            <span>
              An independent public accountant prepares an internal control report with respect to custodial services when the 
              RIA or a <Link href="#" underline="hover">related persons</Link> are qualified custodians for client funds and securities.
            </span>
          }
          sx={{ display: 'block', mb: 2 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.safeguards.standingLetterAuth}
              onChange={handleSafeguardChange('standingLetterAuth')}
            />
          }
          label={
            <span>
              The RIA has custody due to a Standing Letter of Authorization (SLOA) and will follow the 7-step safeguards outlined 
              in the SEC's February 2017 No Action Letter. [see <Link href="#" underline="hover">RIA in a Box blog</Link>]
            </span>
          }
          sx={{ display: 'block', mb: 2 }}
        />
      </Box>

      {/* Section F - Additional Notes */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>F.</strong> Additional notes from firm to RIA in a Box: (optional)
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

export default CustodyClientAssetsForm; 