import { useState } from 'react';
import Button from '@/components/Button';

export default function OnboardingFormIndividual() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [accredited, setAccredited] = useState('');
  const [netWorth, setNetWorth] = useState('');
  const [goal, setGoal] = useState('');
  const [management, setManagement] = useState('');
  const [assetClasses, setAssetClasses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const netWorthOptions = ['<$1M', '$1M–$5M', '$5M–$25M', '>$25M'];
  const goalOptions = [
    'Diversification',
    'Long-term growth',
    'Income generation',
    'Tax optimization',
    'Estate planning',
  ];
  const managementOptions = [
    'Self-directed',
    'Through a wealth manager',
    'Through a family office',
  ];
  const assetClassOptions = [
    'Private Equity',
    'VC',
    'Real Estate',
    'Structured Products',
    'Hedge Funds',
  ];

  return (
    <form className="flex flex-col gap-4 w-96">
      <h2 className="text-xl font-medium mb-2">Individual Details</h2>
      <div className="flex gap-2">
        <label className="flex-1">
          First Name
          <input
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
          />
        </label>
        <label className="flex-1">
          Last Name
          <input
            className="input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
          />
        </label>
      </div>
      <label>
        Are you an accredited investor?
        <select
          className="input"
          value={accredited}
          onChange={(e) => setAccredited(e.target.value)}
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="unsure">Unsure</option>
        </select>
      </label>
      <label>
        Estimated net worth (USD)
        <select
          className="input"
          value={netWorth}
          onChange={(e) => setNetWorth(e.target.value)}
        >
          <option value="">Select</option>
          {netWorthOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      <label>
        Primary investment goal
        <select
          className="input"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="">Select</option>
          {goalOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      <label>
        How do you currently manage your investments?
        <select
          className="input"
          value={management}
          onChange={(e) => setManagement(e.target.value)}
        >
          <option value="">Select</option>
          {managementOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      <label>
        What asset classes interest you most?
        <select
          className="input"
          multiple
          value={assetClasses}
          onChange={(e) =>
            setAssetClasses(
              Array.from(e.target.selectedOptions, (o) => o.value),
            )
          }
        >
          {assetClassOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
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
