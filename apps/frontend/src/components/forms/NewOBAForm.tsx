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
  RadioGroup,
  Radio,
  InputLabel,
  InputAdornment,
} from '@mui/material';

interface OBAFormData {
  individualName: string;
  businessName: string;
  businessCategories: {
    brokerDealer: boolean;
    registeredInvestmentAdviser: boolean;
    investmentAdviserExempt: boolean;
    registeredMunicipalAdvisor: boolean;
    registeredSecurityBasedSwapDealer: boolean;
    majorSecurityBasedSwapParticipant: boolean;
    commodityPoolOperator: boolean;
    futuresCommissionMerchant: boolean;
    bankingThriftInstitution: boolean;
    trustCompany: boolean;
    accountant: boolean;
    accountingFirm: boolean;
    lawyer: boolean;
    lawFirm: boolean;
    insuranceCompanyAgency: boolean;
    pensionConsultant: boolean;
    realEstateBrokerDealer: boolean;
    sponsorSyndicatorLimitedPartnerships: boolean;
    sponsorGeneralPartnerPooledVehicles: boolean;
    qualifiedCustodian: boolean;
    noneOfThese: boolean;
  };
  isPrincipalControlPerson: string;
  entailsServiceOnBoard: string;
  isInvestmentRelated: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  businessDescription: string;
  positionTitle: string;
  responsibilities: string;
  startDate: string;
  tradingHours: string;
  outsideTradingHours: string;
  compensationPercentage: string;
  receivesIRSForm: string;
  contactPerson: string;
  websiteAddress: string;
  additionalNotes: string;
}

const NewOBAForm: React.FC = () => {
  const [formData, setFormData] = useState<OBAFormData>({
    individualName: '',
    businessName: '',
    businessCategories: {
      brokerDealer: false,
      registeredInvestmentAdviser: false,
      investmentAdviserExempt: false,
      registeredMunicipalAdvisor: false,
      registeredSecurityBasedSwapDealer: false,
      majorSecurityBasedSwapParticipant: false,
      commodityPoolOperator: false,
      futuresCommissionMerchant: false,
      bankingThriftInstitution: false,
      trustCompany: false,
      accountant: false,
      accountingFirm: false,
      lawyer: false,
      lawFirm: false,
      insuranceCompanyAgency: false,
      pensionConsultant: false,
      realEstateBrokerDealer: false,
      sponsorSyndicatorLimitedPartnerships: false,
      sponsorGeneralPartnerPooledVehicles: false,
      qualifiedCustodian: false,
      noneOfThese: false,
    },
    isPrincipalControlPerson: '',
    entailsServiceOnBoard: '',
    isInvestmentRelated: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    businessDescription: '',
    positionTitle: '',
    responsibilities: '',
    startDate: '',
    tradingHours: '',
    outsideTradingHours: '',
    compensationPercentage: '',
    receivesIRSForm: '',
    contactPerson: '',
    websiteAddress: '',
    additionalNotes: '',
  });

  // Mock list of individuals - in real app this would come from API
  const individuals = [
    'Albin Scaria',
    'John Smith',
    'Jane Doe',
    'Michael Johnson',
    'Sarah Wilson',
  ];

  const handleInputChange =
    (field: string) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any,
    ) => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent as keyof OBAFormData],
            [child]: event.target.value,
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [field]: event.target.value,
        }));
      }
    };

  const handleCategoryChange =
    (category: keyof OBAFormData['businessCategories']) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        businessCategories: {
          ...prev.businessCategories,
          [category]: event.target.checked,
        },
      }));
    };

  const handleSubmit = () => {
    console.log('Submitting OBA form:', formData);
    // Handle form submission logic here
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        New Outside Business Activity (OBA)
      </Typography>

      {/* Section 1 - Name of Individual */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>
            1. Name of individual(s) disclosing this outside business
          </strong>
        </Typography>
        <FormControl fullWidth>
          <Select
            value={formData.individualName}
            onChange={handleInputChange('individualName')}
            displayEmpty
            sx={{ backgroundColor: '#f5f5f5' }}
          >
            <MenuItem value="" disabled>
              Select an individual
            </MenuItem>
            {individuals.map((individual) => (
              <MenuItem key={individual} value={individual}>
                {individual}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Section 2 - Name of Business */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>2. Name of the outside business</strong>
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={formData.businessName}
          onChange={handleInputChange('businessName')}
        />
      </Box>

      {/* Section 3 - Business Categories */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>
            3. Which of the following categories apply to the outside business?
          </strong>
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Check off all that apply for the outside business being disclosed or,
          if none, then check off option 'none of these'
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.businessCategories.brokerDealer}
              onChange={handleCategoryChange('brokerDealer')}
            />
          }
          label="a. broker-dealer, municipal securities dealer, or government securities broker or dealer"
          sx={{ display: 'block', mb: 1 }}
        />

        <Box sx={{ ml: 2, mb: 1 }}>
          <Typography variant="body2" gutterBottom>
            <strong>b.</strong>
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  formData.businessCategories.registeredInvestmentAdviser
                }
                onChange={handleCategoryChange('registeredInvestmentAdviser')}
              />
            }
            label="registered investment adviser (separate from this RIA) or"
            sx={{ display: 'block' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.businessCategories.investmentAdviserExempt}
                onChange={handleCategoryChange('investmentAdviserExempt')}
              />
            }
            label="investment adviser exempt from registration (separate from this RIA)"
            sx={{ display: 'block', ml: 2 }}
          />
        </Box>

        <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
          <strong>
            Under what exemption is the investment adviser exempt from
            registration?
          </strong>
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.businessCategories.registeredMunicipalAdvisor}
              onChange={handleCategoryChange('registeredMunicipalAdvisor')}
            />
          }
          label="c. registered municipal advisor"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={
                formData.businessCategories.registeredSecurityBasedSwapDealer
              }
              onChange={handleCategoryChange(
                'registeredSecurityBasedSwapDealer',
              )}
            />
          }
          label="d. registered security-based swap dealer"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={
                formData.businessCategories.majorSecurityBasedSwapParticipant
              }
              onChange={handleCategoryChange(
                'majorSecurityBasedSwapParticipant',
              )}
            />
          }
          label="e. major security-based swap participant"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.businessCategories.commodityPoolOperator}
              onChange={handleCategoryChange('commodityPoolOperator')}
            />
          }
          label="f. commodity pool operator or commodity trading advisor (whether registered or exempt from registration)"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.businessCategories.futuresCommissionMerchant}
              onChange={handleCategoryChange('futuresCommissionMerchant')}
            />
          }
          label="g. futures commission merchant"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.businessCategories.bankingThriftInstitution}
              onChange={handleCategoryChange('bankingThriftInstitution')}
            />
          }
          label="h. banking or thrift institution"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.businessCategories.trustCompany}
              onChange={handleCategoryChange('trustCompany')}
            />
          }
          label="i. trust company"
          sx={{ display: 'block', mb: 1 }}
        />

        <Box sx={{ ml: 2, mb: 1 }}>
          <Typography variant="body2" gutterBottom>
            <strong>j.</strong>
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.businessCategories.accountant}
                onChange={handleCategoryChange('accountant')}
              />
            }
            label="accountant or"
            sx={{ display: 'block' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.businessCategories.accountingFirm}
                onChange={handleCategoryChange('accountingFirm')}
              />
            }
            label="accounting firm"
            sx={{ display: 'block', ml: 2 }}
          />
        </Box>

        <Box sx={{ ml: 2, mb: 1 }}>
          <Typography variant="body2" gutterBottom>
            <strong>k.</strong>
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.businessCategories.lawyer}
                onChange={handleCategoryChange('lawyer')}
              />
            }
            label="lawyer or"
            sx={{ display: 'block' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.businessCategories.lawFirm}
                onChange={handleCategoryChange('lawFirm')}
              />
            }
            label="law firm"
            sx={{ display: 'block', ml: 2 }}
          />
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.businessCategories.insuranceCompanyAgency}
              onChange={handleCategoryChange('insuranceCompanyAgency')}
            />
          }
          label="l. insurance company or agency"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.businessCategories.pensionConsultant}
              onChange={handleCategoryChange('pensionConsultant')}
            />
          }
          label="m. pension consultant"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.businessCategories.realEstateBrokerDealer}
              onChange={handleCategoryChange('realEstateBrokerDealer')}
            />
          }
          label="n. real estate broker or dealer"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={
                formData.businessCategories.sponsorSyndicatorLimitedPartnerships
              }
              onChange={handleCategoryChange(
                'sponsorSyndicatorLimitedPartnerships',
              )}
            />
          }
          label="o. sponsor or syndicator of limited partnerships (or equivalent), excluding pooled investment vehicles"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={
                formData.businessCategories.sponsorGeneralPartnerPooledVehicles
              }
              onChange={handleCategoryChange(
                'sponsorGeneralPartnerPooledVehicles',
              )}
            />
          }
          label="p. sponsor, general partner, managing member (or equivalent) of pooled investment vehicles"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.businessCategories.qualifiedCustodian}
              onChange={handleCategoryChange('qualifiedCustodian')}
            />
          }
          label="q. qualified custodian for client assets in connection with the RIA's advisory services"
          sx={{ display: 'block', mb: 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.businessCategories.noneOfThese}
              onChange={handleCategoryChange('noneOfThese')}
            />
          }
          label="r. none of these"
          sx={{ display: 'block', mb: 1 }}
        />
      </Box>

      {/* Section 4 - Principal/Control Person */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>
            4. Is the individual a principal/control person of the outside
            business?
          </strong>
        </Typography>
        <RadioGroup
          value={formData.isPrincipalControlPerson}
          onChange={handleInputChange('isPrincipalControlPerson')}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Box>

      {/* Section 5 - Service on Board */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>
            5. Does this activity entail Service on Board of Directors for a
            Publicly Traded Company?
          </strong>
        </Typography>
        <RadioGroup
          value={formData.entailsServiceOnBoard}
          onChange={handleInputChange('entailsServiceOnBoard')}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Box>

      {/* Section 6 - Investment Related */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>6. Is the business "investment-related?"</strong>
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          This is defined as activities that pertain to securities, commodities,
          banking, insurance, or real estate (including, but not limited to,
          acting as or being associated with an investment adviser,
          broker-dealer, municipal securities dealer, government securities
          broker or dealer, issuer, investment company, futures sponsor, bank,
          or savings association).
        </Typography>
        <RadioGroup
          value={formData.isInvestmentRelated}
          onChange={handleInputChange('isInvestmentRelated')}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Box>

      {/* Section 7 - Location and Description */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>7. Location and description of business</strong>
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            Street name and number
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={formData.address.street}
            onChange={handleInputChange('address.street')}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            City
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={formData.address.city}
            onChange={handleInputChange('address.city')}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            State
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={formData.address.state}
            onChange={handleInputChange('address.state')}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            Zip code
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={formData.address.zipCode}
            onChange={handleInputChange('address.zipCode')}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            Country
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={formData.address.country}
            onChange={handleInputChange('address.country')}
          />
        </Box>

        <TextField
          multiline
          minRows={4}
          fullWidth
          variant="outlined"
          placeholder="Please describe the business"
          value={formData.businessDescription}
          onChange={handleInputChange('businessDescription')}
        />
      </Box>

      {/* Section 8 - Position/Title */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>8. Position/Title</strong>
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={formData.positionTitle}
          onChange={handleInputChange('positionTitle')}
        />
      </Box>

      {/* Section 9 - Responsibilities */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>9. Responsibilities/Duties</strong>
        </Typography>
        <TextField
          multiline
          minRows={4}
          fullWidth
          variant="outlined"
          value={formData.responsibilities}
          onChange={handleInputChange('responsibilities')}
        />
      </Box>

      {/* Section 10 - Start Date */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>10. Start Date</strong>
        </Typography>
        <TextField
          variant="outlined"
          placeholder="06/22/2025"
          value={formData.startDate}
          onChange={handleInputChange('startDate')}
          sx={{ width: '200px' }}
        />
      </Box>

      {/* Section 11 - Hours per Month */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>11. Hours per month devoted to the business:</strong>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="body2" sx={{ minWidth: '150px' }}>
            During trading hours
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            value={formData.tradingHours}
            onChange={handleInputChange('tradingHours')}
            sx={{ width: '100px' }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ minWidth: '150px' }}>
            Outside trading hours
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            value={formData.outsideTradingHours}
            onChange={handleInputChange('outsideTradingHours')}
            sx={{ width: '100px' }}
          />
        </Box>
      </Box>

      {/* Section 12 - Compensation Percentage */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>
            12. Percentage of total yearly compensation expected to be derived
            from the business:
          </strong>
        </Typography>
        <TextField
          variant="outlined"
          value={formData.compensationPercentage}
          onChange={handleInputChange('compensationPercentage')}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          sx={{ width: '150px' }}
        />
      </Box>

      {/* Section 13 - IRS Form */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>
            13. Will you receive an IRS form for the income earned from this
            outside business? (Optional)
          </strong>
        </Typography>
        <RadioGroup
          value={formData.receivesIRSForm}
          onChange={handleInputChange('receivesIRSForm')}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Box>

      {/* OBA Contact Details */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
        OBA contact details
      </Typography>

      {/* Section 14 - Contact Person */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>14. Contact Person at the organization (Optional)</strong>
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={formData.contactPerson}
          onChange={handleInputChange('contactPerson')}
        />
      </Box>

      {/* Section 15 - Website Address */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>15. Website Address for the organization (Optional)</strong>
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={formData.websiteAddress}
          onChange={handleInputChange('websiteAddress')}
        />
      </Box>

      {/* Additional Notes */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Additional notes: (optional)</strong>
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

export default NewOBAForm;
