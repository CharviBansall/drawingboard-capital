import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

interface ManagerTrusteeDirector {
  firstName: string;
  middleInitial: string;
  lastName: string;
  title: string;
}

interface PrivateFundFormData {
  firmIARDNumber: string;
  emailAddress: string;
  fundLegalName: string;
  hasSECIdentificationNumber: string;
  fundCountry: string;
  fundState: string;
  isUmbrellaRegistration: string;
  generalPartnerName: string;
  managersDirectors: ManagerTrusteeDirector[];
  // Investment Company Act questions
  qualifiesSection3c1: string;
  qualifiesSection3c7: string;
  registeredWithForeignAuthority: string;
  isMasterFund: string;
  isFeederFund: string;
  isFundOfFunds: string;
  investedInRegisteredCompanies: string;
  fundType: string;
  // Page 2 fields
  currentGrossAssetValue: string;
  minimumInvestmentCommitment: string;
  beneficialOwnersCount: string;
  percentageOwnedByRelatedPersons: string;
  percentageOwnedByFundsOfFunds: string;
  hasNonUSOwners: string;
  isSubAdviser: string;
  otherAdvisersManage: string;
  clientsCanInvest: string;
  reliedOnRegulationD: string;
  // Page 3 fields
  subjectToAnnualAudit: string;
  // Page 4 fields
  usesPrimeBrokers: string;
  // Page 5 fields
  usesCustodian: string;
  // Page 6 fields
  usesAdministrator: string;
  assetsValuedByAdministrator: string;
  // Page 7 fields
  usesMarketingServices: string;
}

const NewPrivateFundForm: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<PrivateFundFormData>({
    firmIARDNumber: '',
    emailAddress: '',
    fundLegalName: '',
    hasSECIdentificationNumber: '',
    fundCountry: 'United States',
    fundState: '',
    isUmbrellaRegistration: '',
    generalPartnerName: '',
    managersDirectors: [{
      firstName: '',
      middleInitial: '',
      lastName: '',
      title: ''
    }],
    qualifiesSection3c1: '',
    qualifiesSection3c7: '',
    registeredWithForeignAuthority: '',
    isMasterFund: '',
    isFeederFund: '',
    isFundOfFunds: '',
    investedInRegisteredCompanies: '',
    fundType: '',
    // Page 2 fields
    currentGrossAssetValue: '',
    minimumInvestmentCommitment: '',
    beneficialOwnersCount: '',
    percentageOwnedByRelatedPersons: '',
    percentageOwnedByFundsOfFunds: '',
    hasNonUSOwners: '',
    isSubAdviser: '',
    otherAdvisersManage: '',
    clientsCanInvest: '',
    reliedOnRegulationD: '',
    // Page 3 fields
    subjectToAnnualAudit: '',
    // Page 4 fields
    usesPrimeBrokers: '',
    // Page 5 fields
    usesCustodian: '',
    // Page 6 fields
    usesAdministrator: '',
    assetsValuedByAdministrator: '',
    // Page 7 fields
    usesMarketingServices: ''
  });

  const handleInputChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleManagerChange = (index: number, field: keyof ManagerTrusteeDirector) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedManagers = [...formData.managersDirectors];
    updatedManagers[index] = {
      ...updatedManagers[index],
      [field]: event.target.value
    };
    setFormData(prev => ({
      ...prev,
      managersDirectors: updatedManagers
    }));
  };

  const addAnotherManager = () => {
    setFormData(prev => ({
      ...prev,
      managersDirectors: [
        ...prev.managersDirectors,
        { firstName: '', middleInitial: '', lastName: '', title: '' }
      ]
    }));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => prev - 1);
  };

  const handleSaveProgress = () => {
    console.log('Saving progress:', formData);
    // Handle save progress
  };

  const handleResumeForm = () => {
    console.log('Resuming previously saved form');
    // Handle resume form
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        New Private Fund
      </Typography>

      {/* Page Indicator */}
      <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
        Page {currentPage} of 7
        {currentPage === 3 ? ' - Auditors' : 
         currentPage === 4 ? ' - Prime Broker(s)' : 
         currentPage === 5 ? ' - Custodian(s)' : 
         currentPage === 6 ? ' - Administrator(s)' : 
         currentPage === 7 ? ' - Marketer(s)' : ''}
      </Typography>

      {currentPage === 1 && (
        <>
          {/* Page 1 Content */}

      {/* Instructions */}
      <Box sx={{ mb: 3, p: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Instructions
        </Typography>
        <Typography variant="body1" paragraph>
          Please answer the following questions. This information will be used to disclose the firm's advisory relationship with its clients that are 
          pooled investment vehicles. <strong>We would also request that you send us a copy of the private fund documents (e.g., PPM, LPA, 
          subscription agreement) to us by e-mail.</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Please note:</strong> A separate form must be completed for EACH pooled investment vehicle with which your firm maintains an advisory 
          relationship.
        </Typography>
      </Box>

      {/* Firm Information */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" gutterBottom>
            Your firm's IARD number: <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            value={formData.firmIARDNumber}
            onChange={handleInputChange('firmIARDNumber')}
            variant="outlined"
            size="small"
            sx={{ width: '150px' }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" gutterBottom>
            Your email address: <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            value={formData.emailAddress}
            onChange={handleInputChange('emailAddress')}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Box>
      </Box>

      {/* Questions about your fund */}
      <Box sx={{ border: '1px solid #ccc', borderRadius: 1, p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Questions about your fund
        </Typography>

        {/* Fund Legal Name */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            What is the full LEGAL name (including punctuation) of the private fund? <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            value={formData.fundLegalName}
            onChange={handleInputChange('fundLegalName')}
            variant="outlined"
            size="small"
            sx={{ width: '300px' }}
          />
        </Box>

        {/* SEC Private Fund Identification Number */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Have you obtained an SEC Private Fund Identification Number for this fund? <span style={{ color: 'red' }}>*</span>
          </Typography>
          <RadioGroup
            value={formData.hasSECIdentificationNumber}
            onChange={handleInputChange('hasSECIdentificationNumber')}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Box>

        {/* Country */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Under the laws of what country is the private fund organized? <span style={{ color: 'red' }}>*</span>
          </Typography>
          <FormControl size="small" sx={{ minWidth: '200px' }}>
            <Select
              value={formData.fundCountry}
              onChange={handleInputChange('fundCountry')}
              sx={{ backgroundColor: '#e3f2fd' }}
            >
              <MenuItem value="United States">United States</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="United Kingdom">United Kingdom</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* State */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Under the laws of what state is the private fund organized <span style={{ color: 'red' }}>*</span>
          </Typography>
          <FormControl size="small" sx={{ minWidth: '200px' }}>
            <Select
              value={formData.fundState}
              onChange={handleInputChange('fundState')}
              displayEmpty
              sx={{ backgroundColor: '#e3f2fd' }}
            >
              <MenuItem value="" disabled>Please select...</MenuItem>
              <MenuItem value="Delaware">Delaware</MenuItem>
              <MenuItem value="New York">New York</MenuItem>
              <MenuItem value="California">California</MenuItem>
              <MenuItem value="Texas">Texas</MenuItem>
              {/* Add more states as needed */}
            </Select>
          </FormControl>
        </Box>

        {/* Umbrella Registration */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Are you filing an umbrella registration? <span style={{ color: 'red' }}>*</span>
          </Typography>
          <RadioGroup
            value={formData.isUmbrellaRegistration}
            onChange={handleInputChange('isUmbrellaRegistration')}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Box>
      </Box>

      {/* General Partner Section */}
      <Box sx={{ border: '1px solid #ccc', borderRadius: 1, p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          General Partner to the Fund
        </Typography>
        <Typography variant="body1" paragraph>
          Please list the full LEGAL name of the entity serving as General Partner (or equivalent) to this fund. Note that the next 
          question asks about individual managers, trustees, and directors.
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Partner, Manager, Trustee, or Director</strong>
        </Typography>
        <Typography variant="body1" gutterBottom>
          General Partner (full LEGAL name of the entity, including punctuation) <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          value={formData.generalPartnerName}
          onChange={handleInputChange('generalPartnerName')}
          variant="outlined"
          size="small"
          sx={{ width: '400px' }}
        />
      </Box>

      {/* Managers, Trustees, and/or Directors Section */}
      <Box sx={{ border: '1px solid #ccc', borderRadius: 1, p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Managers, Trustees, and/or Directors of the Fund
        </Typography>
        <Typography variant="body1" paragraph>
          Please list the names and titles of any Managers, Trustees, or Directors of this fund
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Manager, Trustee, or Director</strong>
        </Typography>

        {formData.managersDirectors.map((manager, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'end' }}>
            <Box>
              <Typography variant="body2" gutterBottom>
                First Name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                value={manager.firstName}
                onChange={handleManagerChange(index, 'firstName')}
                variant="outlined"
                size="small"
                sx={{ width: '150px' }}
              />
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>
                MI
              </Typography>
              <TextField
                value={manager.middleInitial}
                onChange={handleManagerChange(index, 'middleInitial')}
                variant="outlined"
                size="small"
                sx={{ width: '60px' }}
              />
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>
                Last Name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                value={manager.lastName}
                onChange={handleManagerChange(index, 'lastName')}
                variant="outlined"
                size="small"
                sx={{ width: '150px' }}
              />
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>
                Title <span style={{ color: 'red' }}>*</span>
              </Typography>
              <FormControl size="small" sx={{ minWidth: '150px' }}>
                <Select
                  value={manager.title}
                  onChange={(e) => handleManagerChange(index, 'title')(e as any)}
                  displayEmpty
                  sx={{ backgroundColor: '#e3f2fd' }}
                >
                  <MenuItem value="" disabled>Please select...</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Trustee">Trustee</MenuItem>
                  <MenuItem value="Director">Director</MenuItem>
                  <MenuItem value="Managing Partner">Managing Partner</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        ))}

        <Button
          variant="text"
          color="primary"
          onClick={addAnotherManager}
          sx={{ mt: 1, textDecoration: 'underline' }}
        >
          Add another manager, trustee, or director
        </Button>
      </Box>

      {/* Investment Company Act Questions */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
          <strong>Note:</strong> Please keep in mind that Form ADV <u>requires</u> that at least one of the following two questions <strong>[3(c)(1) or 3(c)(7)]</strong> must be 
          answered "yes." These exemptions from the <strong>Investment Company Act of 1940</strong> are different than (and are in addition to) the 
          Regulation D exemption from the <strong>Securities Act of 1933</strong>.
        </Typography>

        {/* Section 3(c)(1) Question */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            1) Does this Private Fund qualify for exclusion form the definition of investment company under section 3(c)(1) of the Investment 
            Company Act of 1940? <span style={{ color: 'red' }}>*</span>
          </Typography>
          <RadioGroup
            value={formData.qualifiesSection3c1}
            onChange={handleInputChange('qualifiesSection3c1')}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Box>

        {/* Section 3(c)(7) Question */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            2) Does this Private Fund qualify for exclusion form the definition of investment company under section 3(c)(7) of the Investment 
            Company Act of 1940? <span style={{ color: 'red' }}>*</span>
          </Typography>
          <RadioGroup
            value={formData.qualifiesSection3c7}
            onChange={handleInputChange('qualifiesSection3c7')}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Box>

        {/* Foreign Regulatory Authority */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Is this Private Fund registered with a foreign regulatory authority? <span style={{ color: 'red' }}>*</span>
          </Typography>
          <RadioGroup
            value={formData.registeredWithForeignAuthority}
            onChange={handleInputChange('registeredWithForeignAuthority')}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Box>

        {/* Master Fund */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Is this Private Fund a "Master Fund" in a master-feeder arrangement? <span style={{ color: 'red' }}>*</span>
          </Typography>
          <RadioGroup
            value={formData.isMasterFund}
            onChange={handleInputChange('isMasterFund')}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Box>

        {/* Feeder Fund */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Is this Private Fund a "Feeder Fund" in a master-feeder arrangement? <span style={{ color: 'red' }}>*</span>
          </Typography>
          <RadioGroup
            value={formData.isFeederFund}
            onChange={handleInputChange('isFeederFund')}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Box>

        {/* Fund of Funds */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Is this private fund a "fund of funds"? <span style={{ color: 'red' }}>*</span>
          </Typography>
          <RadioGroup
            value={formData.isFundOfFunds}
            onChange={handleInputChange('isFundOfFunds')}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Box>

        {/* Investment in Registered Companies */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            During your last fiscal year, did the private fund invest in securities issued by investment companies registered under the 
            Investment Company Act of 1940? <span style={{ color: 'red' }}>*</span>
          </Typography>
          <RadioGroup
            value={formData.investedInRegisteredCompanies}
            onChange={handleInputChange('investedInRegisteredCompanies')}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 4, fontStyle: 'italic' }}>
            other than "money market funds"
          </Typography>
        </Box>

        {/* Fund Type */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            What type of fund is this private fund? <span style={{ color: 'red' }}>*</span>
          </Typography>
          <RadioGroup
            value={formData.fundType}
            onChange={handleInputChange('fundType')}
          >
            <FormControlLabel value="Hedge fund" control={<Radio />} label="Hedge fund" />
            <FormControlLabel value="Liquidity fund" control={<Radio />} label="Liquidity fund" />
            <FormControlLabel value="Private equity fund" control={<Radio />} label="Private equity fund" />
            <FormControlLabel value="Real estate fund" control={<Radio />} label="Real estate fund" />
            <FormControlLabel value="Securitized asset fund" control={<Radio />} label="Securitized asset fund" />
            <FormControlLabel value="Venture capital fund" control={<Radio />} label="Venture capital fund" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
          </RadioGroup>
        </Box>
      </Box>

      {/* Submission Tracking */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Submission Tracking
        </Typography>
      </Box>

        </>
      )}

      {currentPage === 2 && (
        <>
          {/* Page 2 Content - Investors Section */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 1, p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Investors
            </Typography>

            {/* Current Gross Asset Value */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                What is the current gross asset value of the private fund? <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                value={formData.currentGrossAssetValue}
                onChange={handleInputChange('currentGrossAssetValue')}
                variant="outlined"
                size="small"
                sx={{ width: '200px' }}
              />
            </Box>

            {/* Minimum Investment Commitment */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                What is the minimum investment commitment required of an investor in the private fund? <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                value={formData.minimumInvestmentCommitment}
                onChange={handleInputChange('minimumInvestmentCommitment')}
                variant="outlined"
                size="small"
                sx={{ width: '200px' }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                Please report the amount routinely required of investors who are not your related persons
              </Typography>
            </Box>

            {/* Beneficial Owners Count */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                Approximately how many beneficial owners does this private fund have? <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                value={formData.beneficialOwnersCount}
                onChange={handleInputChange('beneficialOwnersCount')}
                variant="outlined"
                size="small"
                sx={{ width: '200px' }}
              />
            </Box>

            {/* Percentage Owned by Related Persons */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                What is the approximate percentage of the private fund beneficially owned by you and your related persons? <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                value={formData.percentageOwnedByRelatedPersons}
                onChange={handleInputChange('percentageOwnedByRelatedPersons')}
                variant="outlined"
                size="small"
                sx={{ width: '200px' }}
              />
            </Box>

            {/* Percentage Owned by Funds of Funds */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                What is the approximate percentage of the private fund beneficially owner (in the aggregate) by funds of funds? <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                value={formData.percentageOwnedByFundsOfFunds}
                onChange={handleInputChange('percentageOwnedByFundsOfFunds')}
                variant="outlined"
                size="small"
                sx={{ width: '200px' }}
              />
            </Box>

            {/* Non-US Owners */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                Does this private fund have any non-United States persons as owners? <span style={{ color: 'red' }}>*</span>
              </Typography>
              <RadioGroup
                value={formData.hasNonUSOwners}
                onChange={handleInputChange('hasNonUSOwners')}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>
          </Box>

          {/* Your RIA's relationship with this fund */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 1, p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your RIA's relationship with this fund
            </Typography>

            {/* Sub-adviser Question */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                Are you a sub-adviser to this private fund? <span style={{ color: 'red' }}>*</span>
              </Typography>
              <RadioGroup
                value={formData.isSubAdviser}
                onChange={handleInputChange('isSubAdviser')}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>

            {/* Other Advisers Question */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                Do any other advisers manage this private fund? <span style={{ color: 'red' }}>*</span>
              </Typography>
              <RadioGroup
                value={formData.otherAdvisersManage}
                onChange={handleInputChange('otherAdvisersManage')}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>

            {/* Clients Investment Opportunity */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                Will the clients of your advisory firm have the opportunity to invest in the fund? <span style={{ color: 'red' }}>*</span>
              </Typography>
              <RadioGroup
                value={formData.clientsCanInvest}
                onChange={handleInputChange('clientsCanInvest')}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>
          </Box>

          {/* Questions about your fund's private offering */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 1, p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Questions about your fund's private offering
            </Typography>

            {/* Regulation D Question */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                Has the private fund ever relied on an exemption from registration of its securities under Regulation D of the Securities Act of 1933? <span style={{ color: 'red' }}>*</span>
              </Typography>
              <RadioGroup
                value={formData.reliedOnRegulationD}
                onChange={handleInputChange('reliedOnRegulationD')}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>
          </Box>
        </>
      )}

      {currentPage === 3 && (
        <>
          {/* Page 3 Content - Auditors */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 1, p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Basic information
            </Typography>

            {/* Annual Audit Question */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                Are the private fund's financial statements subject to an annual audit? <span style={{ color: 'red' }}>*</span>
              </Typography>
              <RadioGroup
                value={formData.subjectToAnnualAudit}
                onChange={handleInputChange('subjectToAnnualAudit')}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>
          </Box>
        </>
      )}

      {currentPage === 4 && (
        <>
          {/* Page 4 Content - Prime Broker(s) */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 1, p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Basic information
            </Typography>

            {/* Prime Brokers Question */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                Does the private fund use one or more prime brokers? <span style={{ color: 'red' }}>*</span>
              </Typography>
              <RadioGroup
                value={formData.usesPrimeBrokers}
                onChange={handleInputChange('usesPrimeBrokers')}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>
          </Box>
        </>
      )}

      {currentPage === 5 && (
        <>
          {/* Page 5 Content - Custodian(s) */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 1, p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Basic information
            </Typography>

            {/* Custodian Question */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                Does this private fund use any custodian (including the prime brokers listed on the previous page) to hold some or all of its assets? <span style={{ color: 'red' }}>*</span>
              </Typography>
              <RadioGroup
                value={formData.usesCustodian}
                onChange={handleInputChange('usesCustodian')}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>
          </Box>
        </>
      )}

      {currentPage === 6 && (
        <>
          {/* Page 6 Content - Administrator(s) */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 1, p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Basic information
            </Typography>

            {/* Administrator Question */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                Does this private fund use an administrator other than your firm? <span style={{ color: 'red' }}>*</span>
              </Typography>
              <RadioGroup
                value={formData.usesAdministrator}
                onChange={handleInputChange('usesAdministrator')}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>

            {/* Assets Valued by Administrator */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                During the last fiscal year, what percentage of the private fund's assets (by value) was valued by a person, such as an administrator, that is not your related person? <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                value={formData.assetsValuedByAdministrator}
                onChange={handleInputChange('assetsValuedByAdministrator')}
                variant="outlined"
                size="small"
                sx={{ width: '150px' }}
              />
            </Box>
          </Box>
        </>
      )}

      {currentPage === 7 && (
        <>
          {/* Page 7 Content - Marketer(s) */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 1, p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Basic information
            </Typography>

            {/* Marketing Services Question */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                Does this private fund use the services of someone other than you or your employees for marketing purposes? <span style={{ color: 'red' }}>*</span>
              </Typography>
              <RadioGroup
                value={formData.usesMarketingServices}
                onChange={handleInputChange('usesMarketingServices')}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>
          </Box>
        </>
      )}

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {currentPage > 1 && (
          <Button
            variant="contained"
            onClick={handlePreviousPage}
            sx={{ backgroundColor: '#9e9e9e', color: 'white' }}
          >
            Previous Page
          </Button>
        )}
        {currentPage < 7 && (
          <Button
            variant="contained"
            onClick={handleNextPage}
            sx={{ backgroundColor: '#9e9e9e', color: 'white' }}
          >
            Next Page
          </Button>
        )}
        {currentPage === 7 && (
          <Button
            variant="contained"
            onClick={() => console.log('Form submitted:', formData)}
            sx={{ backgroundColor: '#9e9e9e', color: 'white' }}
          >
            Submit
          </Button>
        )}
      </Box>

      {/* Save Progress Links */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Button
          variant="text"
          onClick={handleSaveProgress}
          sx={{ textDecoration: 'underline', mr: 2 }}
        >
          Save my progress and resume later
        </Button>
        <span>|</span>
        <Button
          variant="text"
          onClick={handleResumeForm}
          sx={{ textDecoration: 'underline', ml: 2 }}
        >
          Resume a previously saved form
        </Button>
      </Box>

      {/* Contact Information */}
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="text"
          sx={{ textDecoration: 'underline' }}
        >
          Contact Information
        </Button>
      </Box>
    </Paper>
  );
};

export default NewPrivateFundForm; 