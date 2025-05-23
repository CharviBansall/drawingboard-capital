import { useProfile } from '@/hooks/useProfile';
import Button from '@/components/Button';
import { ArrowRight } from '@phosphor-icons/react';
import PageTitle from '@/components/PageTitle';

export default function Home() {
  const { profile } = useProfile();
  function News() {
    const newsItems = [
      {
        headline: 'Vandelay Industries Launches Global Latex Initiative',
        image: 'https://picsum.photos/seed/george/400/400',
        subhead:
          'George Costanza named Chief Innovation Officer in surprise move.',
      },
      {
        headline: 'Bluth Company Secures Funding for Banana Stand Expansion',
        image: 'https://picsum.photos/seed/bluth/400/400',
        subhead:
          'Analysts question valuation as shares skyrocket 200% overnight.',
      },
      {
        headline: 'Pied Piper Raises $100M in Series B Funding',
        image: 'https://picsum.photos/seed/piedpiper/400/400',
        subhead: 'Valuation surges as investors flock to unicorn.',
      },
    ];
    return (
      <div className="col-span-1 rounded-md flex flex-col border p-3 border-gray-200 shadow-xs">
        <span className="font-medium">News</span>
        <span className="text-xs text-slate-500">
          Stay up-to-date with the latest news and insights.
        </span>
        <div className="flex select-none flex-col gap-4 pt-4">
          {newsItems.map((item, idx) => (
            <div
              key={idx}
              className="flex group hover:bg-slate-100 p-2 rounded-md flex-row gap-1"
            >
              <img
                src={item.image}
                alt={item.headline}
                className="rounded-md h-20 aspect-auto"
              />
              <div className="flex flex-col">
                <span className="font-semibold group-hover:underline text-sm">
                  {item.headline}
                </span>
                <span className="text-xs text-slate-500">{item.subhead}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full">
      {/* Welcome Header */}
      <PageTitle title={`Welcome, ${profile?.first_name}.`} />
      {/* Main Section */}
      <div className="grid grid-cols-3 gap-6">
        <span className="col-span-3 bg-blue-4 flex flex-row justify-between items-center text-sm rounded-md p-2 text-blue-12">
          2 opportunities on your watchlist are closing soon.
          <Button>
            Go To Watchlist
            <ArrowRight />
          </Button>
        </span>
        <News />
      </div>
      <ul className="list-disc">
        <li>Upcoming Raises</li>
        <li>Watchlist with fund raise progress</li>
        <li>Portfolio (What have you bought through our platform)</li>
        <li>Cash Management (Capital Calls)</li>
      </ul>
    </div>
  );
}
