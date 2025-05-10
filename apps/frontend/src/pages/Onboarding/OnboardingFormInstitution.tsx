import { useState } from 'react';
import Button from '@/components/Button';

export default function OnboardingFormInstitution() {
  const [orgName, setOrgName] = useState('');
  const [institutionType, setInstitutionType] = useState('');
  const [aum, setAum] = useState('');
  const [investmentFocus, setInvestmentFocus] = useState<string[]>([]);
  const [jurisdiction, setJurisdiction] = useState('');
  const [isDiscretionary, setIsDiscretionary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const institutionTypes = [
    'Family Office',
    'Pension Fund',
    'Endowment',
    'Foundation',
    'Sovereign Wealth Fund',
    'Other',
  ];
  const aumOptions = ['<$100M', '$100M–$500M', '$500M–$1B', '>$1B'];
  const investmentFocusOptions = [
    'Private Equity',
    'Venture Capital',
    'Real Estate',
    'Credit',
    'Hedge Funds',
    'Secondaries',
    'Other',
  ];

  return (
    <form className="flex flex-col gap-4 w-96">
      <h2 className="text-xl font-medium mb-2">Institution Details</h2>
      <label>
        Organization name
        <input
          className="input"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          placeholder="Organization name"
        />
      </label>
      <label>
        Type of institution
        <select
          className="input"
          value={institutionType}
          onChange={(e) => setInstitutionType(e.target.value)}
        >
          <option value="">Select type</option>
          {institutionTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label>
        AUM (Assets Under Management)
        <select
          className="input"
          value={aum}
          onChange={(e) => setAum(e.target.value)}
        >
          <option value="">Select AUM</option>
          {aumOptions.map((aum) => (
            <option key={aum} value={aum}>
              {aum}
            </option>
          ))}
        </select>
      </label>
      <label>
        Primary investment focus
        <select
          className="input"
          multiple
          value={investmentFocus}
          onChange={(e) =>
            setInvestmentFocus(
              Array.from(e.target.selectedOptions, (o) => o.value),
            )
          }
        >
          {investmentFocusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      <label>
        Jurisdiction of domicile
        <input
          className="input"
          value={jurisdiction}
          onChange={(e) => setJurisdiction(e.target.value)}
          placeholder="US, UK, EU, etc."
        />
      </label>
      <label>
        Do you act as a discretionary allocator?
        <div className="flex gap-4 mt-1">
          <label>
            <input
              type="radio"
              name="discretionary"
              value="yes"
              checked={isDiscretionary === 'yes'}
              onChange={() => setIsDiscretionary('yes')}
            />{' '}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="discretionary"
              value="no"
              checked={isDiscretionary === 'no'}
              onChange={() => setIsDiscretionary('no')}
            />{' '}
            No
          </label>
        </div>
      </label>
      <Button
        isLoading={isLoading}
        disabled={isLoading}
        onClick={(e) => {
          e.preventDefault();
          setIsLoading(true);
        }}
      >
        Continue
      </Button>
    </form>
  );
}
