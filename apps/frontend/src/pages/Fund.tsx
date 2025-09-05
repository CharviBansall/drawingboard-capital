import { useParams } from 'react-router';
import { useEffect } from 'react';
import Button from '@/components/Button';
import { ArrowRight } from 'lucide-react';
import EChartPie from '@/components/PieChart';
import PageTitle from '@/components/PageTitle';

export default function Fund() {
  const { slug } = useParams<{ slug: string }>();
  const fund = {
    imageUrl: 'https://picsum.photos/id/10/2000',
    status: 'new',
    name: 'Cal Varnsen Growth Fund I',
    link: '/funds/cal-varnsen-growth-fund-i',
    description:
      'Invests in mid-market SaaS and healthcare companies across North America.',
    tags: ['Global', 'Buyout', 'Portfolio'],
    metrics: [
      { label: 'Target Deals', value: '12-15' },
      { label: 'Target Fund Size', value: '$80 Million' },
      { label: 'Deals Sourced', value: '100+' },
      { label: 'Min. investment', value: '$50,000' },
    ],
    fundOverview: {
      title: 'Vandelay Core Opportunities Fund',
      subtitle: 'Diversified Access to Global Private Markets',
      vehicle: 'LP',
      stage: 'Open for Commitments',
      region: 'Global',
      minInvestment: '$100,000',
      commitmentDeadline: '2025-09-30',
      closingDate: '2025-10-15',
      targetReturn: '14% IRR Net',
    },
    investmentObjectives: [
      'Gain exposure to global private equity with institutional-quality access',
      'Target top-decile managers across multiple vintages',
      'Reduce volatility through strategy diversification',
      'Capture long-term illiquidity premium',
      'Provide access to co-investment opportunities',
      'Blend growth and yield-focused strategies',
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      ' Earum provident itaque, tempore repellat molestias blanditiis vero enim autem animi ipsam eaque nihil aspernatur temporibus dicta quasi aliquid maiores dolore possimus.',
    ],
    highlights: [
      'Flagship diversified fund designed for high-net-worth individuals and family offices.',
      'Investments span buyout, growth equity, secondaries, and special situations.',
      'Early commitments receive reduced management fees and priority allocation.',
      'Lead sponsor is Art Vandelay Capital, with over $10B in AUM and a 20-year track record.',
      'Backed by Seinfeld Foundation and regulated under Section 12B of the Investor Act.',
      '10+ underlying funds with access to side letters negotiated for fee discounts.',
      '100% of deals reviewed by the VCO Investment Committee with quarterly transparency reports.',
      'Semi-annual liquidity windows with rolling redemptions subject to gate provisions.',
    ],
    portfolioDiversification: {
      geography: {
        'North America': 40,
        Europe: 30,
        Asia: 20,
        'Rest of World': 10,
      },
      strategy: {
        Buyout: 35,
        'Growth Equity': 25,
        Secondaries: 20,
        'Special Situations': 15,
        Venture: 5,
      },
      vintage: {
        '2023': 20,
        '2024': 40,
        '2025': 40,
      },
    },
    pipeline: [
      {
        fundName: 'Geller Capital Fund V',
        category: 'Buyout',
        geography: 'North America',
        status: 'Evaluating',
      },
      {
        fundName: 'Kramer Growth Select II',
        category: 'Growth Equity',
        geography: 'Asia',
        status: 'Committed',
      },
      {
        fundName: 'Tribbiani Partners Co-Invest',
        category: 'Co-Investment',
        geography: 'Europe',
        status: 'Final Diligence',
      },
      {
        fundName: 'Fonz Secondaries I',
        category: 'Secondaries',
        geography: 'Global',
        status: 'LOI Signed',
      },
    ],
    insights: [
      {
        title: 'Why Multi-Strategy Funds May Outperform in Volatile Markets',
        summary:
          'A brief on how combining buyout, venture, and secondaries can smooth performance.',
        image: '/assets/images/insight-volatility.jpg',
        link: '/insights/multi-strategy-benefits',
      },
    ],
    howItWorks: {
      structure: 'Limited Partnership',
      sponsor: 'Art Vandelay Capital',
      legalJurisdiction: 'Delaware, USA',
      custodian: 'Costanza Trust Bank',
      auditor: 'Monk & Monk LLP',
      minimumCommitment: '$100,000',
      managementFees: '1.5% per annum',
      carry: '10% after 8% preferred return',
      liquidity: 'Semi-annual redemption window with 90-day notice',
      reporting:
        'Quarterly NAVs, investor letters, and audited financials annually',
      subscriptionProcess: [
        'Investor completes KYC and AML onboarding',
        'Subscription documents signed electronically',
        'Capital called on a quarterly basis',
        'Investor portal access provided post-close',
      ],
      keyRisks: [
        'Illiquidity – early redemption may not be possible',
        'Manager selection risk – underperformance of underlying GPs',
        'Market cycles – downturns may reduce distributions or delay exits',
        'Valuation – NAVs based on estimates and not marked-to-market',
      ],
    },
    documents: [
      {
        name: 'Offering Memorandum',
        url: '/docs/vcof_offering_memorandum.pdf',
      },
      {
        name: 'Subscription Agreement',
        url: '/docs/vcof_subscription_agreement.pdf',
      },
      {
        name: 'Quarterly Report - Q1 2025',
        url: '/docs/vcof_q1_2025_report.pdf',
      },
    ],
    disclaimers: [
      'Past performance is not indicative of future results.',
      'Investments in private markets are speculative and involve substantial risk.',
      'This content is for illustrative purposes only and does not constitute an offer.',
      'All investors must qualify as Accredited Investors or equivalent under local regulations.',
      'Fees, terms, and conditions are subject to change and final legal documentation.',
    ],
  };
  useEffect(() => {
    console.log(slug);
  }, [slug]);
  return (
    <div className="w-full px-8 py-6 gap-4 flex flex-col">
      <PageTitle title={fund.name} />
      <div className="grid grid-cols-3 gap-8 h-fit overflow-hidden">
        <div className="col-span-2 h-full rounded-md overflow-hidden">
          <img
            className="object-cover aspect-auto w-full h-96"
            src={fund.imageUrl}
            alt={fund.name}
          />
        </div>
        <div className="col-span-1">
          <div className="h-full flex flex-col gap-3">
            <div className="rounded-md border flex p-3 justify-center flex-col h-full border-gray-200">
              <h2 className="text-2xl  font-ebgaramond">
                {fund.metrics[0].value}
              </h2>
              <span className="text-lg text-slate-600 font-ebgaramond">
                {fund.metrics[0].label}
              </span>
            </div>
            <div className="rounded-md border flex p-3 justify-center flex-col h-full border-gray-200">
              <h2 className="text-2xl font-ebgaramond">
                {fund.metrics[1].value}
              </h2>
              <span className="text-lg text-slate-600 font-ebgaramond">
                {fund.metrics[1].label}
              </span>
            </div>
            <div className="rounded-md border flex p-3 justify-center flex-col h-full border-gray-200">
              <h2 className="text-2xl font-ebgaramond">
                {fund.metrics[2].value}
              </h2>
              <span className="text-lg text-slate-600 font-ebgaramond">
                {fund.metrics[2].label}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col col-span-2 gap-3">
          <div className="flex flex-row gap-2">
            {fund.tags.map((tag) => (
              <span
                key={tag}
                className="text-slate-600 bg-slate-100 text-sm px-2 py-1 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-slate-600 text-sm">
            {fund.description} Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Nisi repudiandae exercitationem blanditiis? Velit
            accusamus, officia ab molestias saepe distinctio incidunt esse
            deserunt ducimus. Repellat ratione deserunt impedit quae, vel
            perspiciatis?
          </p>
        </div>
        <div className="col-span-1 row-span-2 border p-3 text-sm border-gray-200 rounded-md">
          <h2 className="text-xl">Fund Overview</h2>
          <div className="flex flex-col gap-2 py-2">
            <div className="flex flex-row w-full justify-between">
              <p className="text-slate-600">Vehicle</p>
              <p className="text-black">{fund.fundOverview.vehicle}</p>
            </div>
            <div className="flex flex-row w-full justify-between">
              <p className="text-slate-600">Stage</p>
              <p className="text-black">{fund.fundOverview.stage}</p>
            </div>
            <div className="flex flex-row w-full justify-between">
              <p className="text-slate-600">Region</p>
              <p className="text-black">{fund.fundOverview.region}</p>
            </div>
            <div className="flex flex-row w-full justify-between">
              <p className="text-slate-600">Min. Investment</p>
              <p className="text-black">{fund.fundOverview.minInvestment}</p>
            </div>
            <div className="flex flex-row w-full justify-between">
              <p className="text-slate-600">Commitment Deadline</p>
              <p className="text-black">
                {fund.fundOverview.commitmentDeadline}
              </p>
            </div>
            <div className="flex flex-row w-full justify-between">
              <p className="text-slate-600">Closing Date</p>
              <p className="text-black">{fund.fundOverview.closingDate}</p>
            </div>
            <div className="flex flex-row w-full justify-between">
              <p className="text-slate-600">Target Return</p>
              <p className="text-black">{fund.fundOverview.targetReturn}</p>
            </div>
            <Button>
              Request Access <ArrowRight />
            </Button>
            <span className="text-sm text-slate-600">
              To get access to fund documents, we require you to sign an NDA.
            </span>
          </div>
        </div>
        <div className="col-span-2 row-span-2 flex flex-col gap-3">
          <h2 className="text-3xl">Investment Objectives</h2>
          <div className="grid grid-cols-2 gap-3">
            {fund.investmentObjectives.map((objective) => (
              <div
                key={objective}
                className="bg-blue-4 text-blue-12 p-3 rounded-md"
              >
                {objective}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <h2 className="text-3xl">Highlights</h2>
          <div className="flex flex-col gap-4">
            {fund.highlights.map((highlight) => (
              <div key={highlight} className="text-sm">
                {highlight} Lorem ipsum, dolor sit amet consectetur adipisicing
                elit. Aliquam, sint earum tempore nobis esse reiciendis iusto id
                velit repellendus fugit dolores, omnis iure quod. Vel
                consequatur nihil quas quis est.
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <h2 className="text-3xl">Illustrative Portfolio Diversification</h2>
          <div className="grid grid-cols-1 gap-3">
            <div className="aspect-square w-full">
              <EChartPie
                title="Geographic Allocation"
                data={fund.portfolioDiversification.geography}
              />
            </div>
            <div className="aspect-square w-full">
              <EChartPie
                title="Vintage"
                data={fund.portfolioDiversification.vintage}
              />
            </div>
            <div className="aspect-square w-full">
              <EChartPie
                title="Strategy Allocation"
                data={fund.portfolioDiversification.strategy}
              />
            </div>
          </div>
          <span className="text-sm text-slate-600">
            *Illustrative only. Subject to change.
          </span>
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <h2 className="text-3xl">Pipeline</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border text-sm border-gray-200 rounded-md bg-white">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-2 font-medium text-slate-700">
                    Fund Name
                  </th>
                  <th className="px-4 py-2 font-medium text-slate-700">
                    Category
                  </th>
                  <th className="px-4 py-2 font-medium text-slate-700">
                    Geography
                  </th>
                  <th className="px-4 py-2 font-medium text-slate-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {fund.pipeline.map((item) => (
                  <tr key={item.fundName} className="border-t border-gray-200">
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.fundName}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.category}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.geography}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <h2 className="text-3xl">How it Works</h2>
          <div className="flex flex-col gap-2 text-sm w-full">
            <div className="flex flex-row justify-between">
              <p className="text-slate-600">Structure</p>
              <p className="text-black">{fund.howItWorks.structure}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-slate-600">Sponsor</p>
              <p className="text-black">{fund.howItWorks.sponsor}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-slate-600">Legal Jurisdiction</p>
              <p className="text-black">{fund.howItWorks.legalJurisdiction}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-slate-600">Custodian</p>
              <p className="text-black">{fund.howItWorks.custodian}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-slate-600">Auditor</p>
              <p className="text-black">{fund.howItWorks.auditor}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-slate-600">Minimum Commitment</p>
              <p className="text-black">{fund.howItWorks.minimumCommitment}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-slate-600">Management Fees</p>
              <p className="text-black">{fund.howItWorks.managementFees}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-slate-600">Carry</p>
              <p className="text-black">{fund.howItWorks.carry}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-slate-600">Liquidity</p>
              <p className="text-black">{fund.howItWorks.liquidity}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-slate-600">Reporting</p>
              <p className="text-black">{fund.howItWorks.reporting}</p>
            </div>
            <div className="flex flex-col mt-2">
              <p className="text-slate-600 mb-1">Subscription Process</p>
              <ul className="list-disc list-inside text-black">
                {fund.howItWorks.subscriptionProcess.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col mt-2">
              <p className="text-slate-600 mb-1">Key Risks</p>
              <ul className="list-disc list-inside text-black">
                {fund.howItWorks.keyRisks.map((risk, idx) => (
                  <li key={idx}>{risk}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
