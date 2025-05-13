import Input from '@/components/Input';
import Button from '@/components/Button';
import PhoneInput from '@/components/PhoneInput';
import { useState } from 'react';

export default function OnboardingFormIntermediary() {
  const [phoneNumber, setPhoneNumber] = useState<any>();
  return (
    <form className="flex flex-col gap-4 w-96">
      <h2 className="text-xl font-medium">
        Tell us a little bit about yourself.
      </h2>
      <p className="text-slate-400">
        Access to DrawingBoard Capital is subject to eligibility. We'll review
        the information you provide and reach out to complete the onboarding
        process.
      </p>
      <div className="grid grid-cols-2 gap-2">
        <Input
          props={{
            label: 'First Name',
            type: 'text',
            placeholder: 'John',
            onChange: () => {},
          }}
        />
        <Input
          props={{
            label: 'Last Name',
            type: 'text',
            placeholder: 'Doe',
            onChange: () => {},
          }}
        />
        <div className="col-span-2">
          <PhoneInput
            onChange={(value) => setPhoneNumber(value)}
            value={phoneNumber}
          />
        </div>
        <div className="col-span-2">
          <Input
            props={{
              label: 'Company Name',
              type: 'text',
              onChange: () => {},
              placeholder: 'Berkshire Hathaway',
            }}
          />
        </div>
        <div className="col-span-2">
          <Input
            props={{
              label: 'Company Website/Social Media',
              type: 'text',
              onChange: () => {},
              placeholder: 'https://www.example.com',
            }}
          />
        </div>
      </div>
      <Button>Continue</Button>
    </form>
  );
}
