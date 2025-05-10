import supabase from '@/lib/supabase';
import { QueryData } from '@supabase/supabase-js';
import { ChevronLeft, ChevronRight, ListFilter, SortDesc } from 'lucide-react';
import { Separator, DropdownMenu } from 'radix-ui';
import { useEffect, useState } from 'react';

export default function Funds() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fundsQuery = supabase.from('funds').select('*', { count: 'exact' });
  type funds = QueryData<typeof fundsQuery>;
  const [funds, setFunds] = useState<funds>([]);
  useEffect(() => {
    const fetchFunds = async () => {
      const { data, count, error } = await fundsQuery.range(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage - 1,
      );
      if (error) {
        console.error('Error fetching funds:', error);
        return;
      } else {
        console.log(data);
        setFunds(data);
        if (count) {
          setTotalPages(Math.ceil(count / itemsPerPage));
        }
      }
    };
    fetchFunds();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  function PaginationControls() {
    return (
      <div className="flex flex-row w-full items-center justify-center gap-4">
        {currentPage > 1 && (
          <button
            className="w-fit bg-white text-blue-12 font-medium p-2 hover:bg-slate-200 transition-all cursor-pointer rounded-md"
            onClick={handlePreviousPage}
          >
            <ChevronLeft size={20} />
          </button>
        )}
        <span>
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages && (
          <button
            className="w-fit bg-white text-blue-12 font-medium p-2 hover:bg-slate-200 transition-all cursor-pointer rounded-md"
            onClick={handleNextPage}
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    );
  }

  function FilterBar() {
    return (
      <div className="flex justify-between flex-row w-full">
        <FilterDropdown />
        <button
          className="rounded-full
       font-medium text-blue-9 w-fit flex flex-row 
       items-center gap-1 px-3 py-1 text-sm 
       bg-blue-4 hover:bg-blue-5 transition-all"
        >
          <SortDesc size={15} />
          Sort
        </button>
      </div>
    );
  }

  function FilterDropdown() {
    // const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    // const handleFilterToggle = (filter: string) => {
    //   setSelectedFilters((prev) => {
    //     if (prev.includes(filter)) {
    //       return prev.filter((f) => f !== filter);
    //     } else {
    //       return [...prev, filter];
    //     }
    //   });
    // };

    // const filterCount = selectedFilters.length;

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="rounded-full
       font-medium text-blue-9 w-fit flex flex-row 
       items-center gap-1 px-3 py-1 text-sm 
       bg-blue-4 hover:bg-blue-5 transition-all"
          >
            <ListFilter size={15} />
            Filters
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="w-52 rounded-md border text-xs border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-slate-900">
            <DropdownMenu.Item className="py-1 rounded-sm flex cursor-default flex-row items-center gap-2 px-4 hover:bg-gray-200 focus:outline-none">
              Account Settings
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="my-1 bg-gray-200 mx-2 h-px" />
            <DropdownMenu.Item className="py-1 rounded-sm flex cursor-default flex-row items-center gap-2 px-4 hover:bg-gray-200 focus:outline-none">
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }

  return (
    <div className="w-full px-8 py-6">
      <div className="w-full flex flex-col gap-6 h-full">
        <span className="font-ebgaramond text-4xl">Browse Funds</span>
        <Separator.Root
          orientation="horizontal"
          decorative
          className="bg-slate-200 h-px"
        />
        <FilterBar />
        {funds.map((fund) => (
          <div key={fund.fund_id}>{fund.name}</div>
        ))}
      </div>
      <PaginationControls />
    </div>
  );
}
