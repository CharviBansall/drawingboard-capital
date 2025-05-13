import Button from '@/ui/Button/Button';
import {
  Building2,
  Globe,
  TrendingUp,
  Calendar,
  DollarSign,
  Target,
  Briefcase,
  MapPin,
} from 'lucide-react';
// Import types from supabase and Funds component
import { Json } from '@/types/types-supabase';
import { FundArray } from './Funds';

// Define a proper TypeScript interface for fund details
interface FundDetails {
  fund_manager: string;
  target_irr_net_min: number;
  target_irr_net_max: number;
  final_close_date: string;
  industries: string;
  industry_verticals: string;
  tel: string;
  email: string;
  website: string;
  // Add any other properties that might be in the details object
  [key: string]: any; // Allow for other properties
}

// Type definitions for the FundCard component

// Interface that extends the base Fund type with properly typed details
type FundWithDetails = Omit<FundArray[number], 'details' | 'companies'> & {
  details: FundDetails;
  companies?: any; // Accept any form of companies data
};

/**
 * Helper function to extract logo URL from companies property which can be an object or array
 */
const getLogoUrl = (companies: any): string => {
  if (!companies) return '';

  // If companies is an array, get the first item's logo
  if (Array.isArray(companies)) {
    return companies[0]?.logo || '';
  }

  // If companies is an object with logo property
  return companies.logo || '';
};

/**
 * Parse and validate fund details to ensure type safety and provide defaults
 */
function parseFundDetails(fund: FundArray[number]): FundWithDetails {
  let details: FundDetails;

  try {
    // If details is a string, parse it, otherwise use as is
    details =
      typeof fund.details === 'string'
        ? JSON.parse(fund.details)
        : (fund.details as Json) || {};
  } catch (e) {
    console.error('Error parsing fund details:', e);
    details = {} as FundDetails;
  }

  // Ensure all required properties exist with defaults
  return {
    ...fund,
    companies: fund.companies || null,
    details: {
      ...details, // First spread original properties
      // Then override with defaults for missing properties
      fund_manager: details.fund_manager || 'N/A',
      target_irr_net_min: Number(details.target_irr_net_min || 0),
      target_irr_net_max: Number(details.target_irr_net_max || 0),
      final_close_date: details.final_close_date || 'N/A',
      industries: details.industries || 'N/A',
      industry_verticals: details.industry_verticals || '',
      tel: details.tel || 'N/A',
      email: details.email || 'N/A',
      website: details.website || '#',
    },
  };
}

export function FundCard({ fund }: { fund: FundArray[number] }) {
  // Process the fund to ensure details are properly structured
  const processedFund = parseFundDetails(fund);
  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="p-6 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-row gap-2 items-start justify-center">
            <div className="h-16 aspect-square">
              {getLogoUrl(processedFund.companies) ? (
                <img
                  src={getLogoUrl(processedFund.companies)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                  <span className="text-slate-500">No Logo</span>
                </div>
              )}
            </div>
            <div className="flex flex-col h-full">
              <h3 className="text-2xl font-medium text-slate-900">
                {processedFund.name}
              </h3>
              <div className="flex items-center text-sm text-slate-500">
                <Building2 className="h-4 w-4 mr-1" />
                {processedFund.details.fund_manager}
              </div>
            </div>
          </div>
          <div
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              processedFund.status === 'Closed'
                ? 'bg-slate-100 text-slate-800'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {processedFund.status}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 pt-2 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fund Overview */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-500">
              Fund Overview
            </h3>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-slate-400" />
                <span className="text-slate-500 mr-1">Asset Class:</span>
              </div>
              <div className="text-slate-900">{processedFund.asset_class}</div>

              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-slate-400" />
                <span className="text-slate-500 mr-1">Strategy:</span>
              </div>
              <div className="text-slate-900">{processedFund.strategy}</div>

              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                <span className="text-slate-500 mr-1">Vintage:</span>
              </div>
              <div className="text-slate-900">
                {processedFund.vintage_inception_year}
              </div>

              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-slate-400" />
                <span className="text-slate-500 mr-1">Size:</span>
              </div>
              <div className="text-slate-900">
                {processedFund.fund_size_usd_mn?.toFixed(2) || '0.00'}M{' '}
                {processedFund.fund_currency || 'USD'}
              </div>

              <div className="flex items-center">
                <Target className="h-4 w-4 mr-2 text-slate-400" />
                <span className="text-slate-500 mr-1">Target IRR:</span>
              </div>
              <div className="text-slate-900">
                {processedFund.details.target_irr_net_min}% -{' '}
                {processedFund.details.target_irr_net_max}%
              </div>

              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                <span className="text-slate-500 mr-1">Final Close:</span>
              </div>
              <div className="text-slate-900">
                {processedFund.details.final_close_date}
              </div>
            </div>
          </div>

          {/* Investment Focus */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-500">
              Investment Focus
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex items-start">
                <Globe className="h-4 w-4 mr-2 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-slate-500">Domicile:</span>
                  <div className="mt-0.5 text-slate-900">
                    {processedFund.country}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-slate-500">Geographic Focus:</span>
                  <div className="mt-0.5 text-slate-900">
                    {processedFund.geographic_focus}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <Briefcase className="h-4 w-4 mr-2 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-slate-500">Industries:</span>
                  <div className="mt-0.5 text-slate-900">
                    {processedFund.details.industries}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}

        {/* Industry Verticals */}
        {processedFund.details.industry_verticals && (
          <>
            <div className="h-px w-full bg-slate-200 my-2"></div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-slate-500">
                Industry Verticals
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {processedFund.details.industry_verticals
                  .split(', ')
                  .filter((vertical) => vertical.trim())
                  .map((vertical, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {vertical}
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-4 flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 border-t border-slate-200">
        <Button>View Details</Button>
      </div>
    </div>
  );
}
