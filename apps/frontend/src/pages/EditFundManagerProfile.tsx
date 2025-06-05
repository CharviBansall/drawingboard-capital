import { Tables } from '@/types/types-supabase';
import { useState } from 'react';
import PageTitle from '@/components/PageTitle';
import Tabs from '@/components/Tabs';
import Input from '@/components/Input';
import Button from '@/components/Button';

// Tab types for the fund manager profile
type FundManagerTabs = 'general' | 'financial' | 'structure' | 'performance';

export default function EditFundManagerProfile() {
  const [fundManagerProfile, setFundManagerProfile] =
    useState<Tables<'fund_managers'>>({} as Tables<'fund_managers'>);
  const [activeTab, setActiveTab] = useState<FundManagerTabs>('general');
  const [isLoading, setIsLoading] = useState(false);

  // Tabs configuration
  const tabs = [
    { value: 'general', label: 'General Information' },
    { value: 'financial', label: 'Financial Details' },
    { value: 'structure', label: 'Fund Structure' },
    { value: 'performance', label: 'Performance Metrics' },
  ];

  // Handle input change
  const handleInputChange = (field: keyof Tables<'fund_managers'>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFundManagerProfile(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Here you would implement the API call to update the fund manager profile
      console.log('Submitting fund manager profile:', fundManagerProfile);
      // Mock success
      setTimeout(() => {
        setIsLoading(false);
        alert('Fund manager profile updated successfully!');
      }, 1000);
    } catch (error) {
      console.error('Error updating fund manager profile:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Edit Fund Manager Profile" />
      
      <form onSubmit={handleSubmit} className="mt-6">
        <Tabs
          tabs={tabs}
          value={activeTab}
          onChange={(value) => setActiveTab(value as FundManagerTabs)}
          className="mb-8"
        >
          {/* General Information Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fund Manager Name
                  </label>
                  <Input
                    value={fundManagerProfile.fund_manager || ''}
                    onChange={handleInputChange('fund_manager')}
                    placeholder="Enter fund manager name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={fundManagerProfile.email || ''}
                    onChange={handleInputChange('email')}
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <Input
                    type="url"
                    value={fundManagerProfile.website || ''}
                    onChange={handleInputChange('website')}
                    placeholder="Enter website URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Domicile
                  </label>
                  <Input
                    value={fundManagerProfile.domicile || ''}
                    onChange={handleInputChange('domicile')}
                    placeholder="Enter domicile location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Region Focus
                  </label>
                  <Input
                    value={fundManagerProfile.primary_region_focus || ''}
                    onChange={handleInputChange('primary_region_focus')}
                    placeholder="Enter primary region focus"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Secondary Locations
                  </label>
                  <Input
                    value={fundManagerProfile.secondary_locations || ''}
                    onChange={handleInputChange('secondary_locations')}
                    placeholder="Enter secondary locations"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Financial Details Tab */}
          {activeTab === 'financial' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total AUM (USD mn)
                  </label>
                  <Input
                    type="text"
                    value={fundManagerProfile.fund_manager_total_aum_usd_mn || ''}
                    onChange={handleInputChange('fund_manager_total_aum_usd_mn')}
                    placeholder="Enter total AUM in USD"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total AUM (EUR mn)
                  </label>
                  <Input
                    type="text"
                    value={fundManagerProfile.fund_manager_total_aum_eur_mn || ''}
                    onChange={handleInputChange('fund_manager_total_aum_eur_mn')}
                    placeholder="Enter total AUM in EUR"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Co-Investment Capital (USD mn)
                  </label>
                  <Input
                    type="text"
                    value={fundManagerProfile.co_investment_capital_amount_usd_mn || ''}
                    onChange={handleInputChange('co_investment_capital_amount_usd_mn')}
                    placeholder="Enter co-investment capital in USD"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Co-Investment Capital (EUR mn)
                  </label>
                  <Input
                    type="text"
                    value={fundManagerProfile.co_investment_capital_amount_eur_mn || ''}
                    onChange={handleInputChange('co_investment_capital_amount_eur_mn')}
                    placeholder="Enter co-investment capital in EUR"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Co-Investment Capital (Currency mn)
                  </label>
                  <Input
                    type="text"
                    value={fundManagerProfile.co_investment_capital_amount_curr_mn || ''}
                    onChange={handleInputChange('co_investment_capital_amount_curr_mn')}
                    placeholder="Enter co-investment capital in local currency"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Private Wealth
                  </label>
                  <Input
                    type="text"
                    value={fundManagerProfile.private_wealth || ''}
                    onChange={handleInputChange('private_wealth')}
                    placeholder="Enter private wealth details"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Fund Structure Tab */}
          {activeTab === 'structure' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fund Structure
                  </label>
                  <Input
                    type="text"
                    value={fundManagerProfile.fund_structure || ''}
                    onChange={handleInputChange('fund_structure')}
                    placeholder="Enter fund structure"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lifespan Extension
                  </label>
                  <Input
                    type="text"
                    value={fundManagerProfile.lifespan_extension || ''}
                    onChange={handleInputChange('lifespan_extension')}
                    placeholder="Enter lifespan extension details"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Single Deal Fund
                  </label>
                  <Input
                    type="text"
                    value={fundManagerProfile.single_deal_fund || ''}
                    onChange={handleInputChange('single_deal_fund')}
                    placeholder="Enter single deal fund details"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Solely Financed By
                  </label>
                  <Input
                    type="text"
                    value={fundManagerProfile.solely_financed_by || ''}
                    onChange={handleInputChange('solely_financed_by')}
                    placeholder="Enter financing source"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subscription Credit Facility
                  </label>
                  <Input
                    type="text"
                    value={fundManagerProfile.subscription_credit_facility || ''}
                    onChange={handleInputChange('subscription_credit_facility')}
                    placeholder="Enter subscription credit facility details"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Performance Metrics Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target IRR Gross Min (%)
                  </label>
                  <Input
                    type="text"
                    value={fundManagerProfile.target_irr_gross_min || ''}
                    onChange={handleInputChange('target_irr_gross_min')}
                    placeholder="Enter target IRR gross min"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target IRR Net Min (%)
                  </label>
                  <Input
                    type="text"
                    value={fundManagerProfile.target_irr_net_min || ''}
                    onChange={handleInputChange('target_irr_net_min')}
                    placeholder="Enter target IRR net min"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target IRR Net Max (%)
                  </label>
                  <Input
                    type="text"
                    value={fundManagerProfile.target_irr_net_max || ''}
                    onChange={handleInputChange('target_irr_net_max')}
                    placeholder="Enter target IRR net max"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end space-x-4">
            <Button type="button" variant="secondary" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Tabs>
      </form>
    </div>
  );
}
