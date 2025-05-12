import supabase from '@/lib/supabase';
import { QueryData } from '@supabase/supabase-js';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ListFilter,
  SortDesc,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Separator, DropdownMenu } from 'radix-ui';
import { useEffect, useState, useCallback, memo } from 'react';
import { FundCard } from './FundCard';

const fundsQuery = supabase.from('funds').select('*', { count: 'exact' });
type FundArray = QueryData<typeof fundsQuery>;

// Define FilterOption type outside the component so it's available to all components
type FilterOption = {
  category: string;
  displayName: string;
  options: string[];
};

type SortOption = {
  column: string;
  displayName: string;
};

// Define sort state types
type SortDirection = 'asc' | 'desc' | null;
type SortState = {
  column: string | null;
  displayName: string | null;
  direction: SortDirection;
};

// FilterDropdown component extracted outside the main component
const FilterDropdown = memo(
  ({
    filterOptions,
    filterCount,
    selectedFilters,
    handleFilterToggle,
  }: {
    filterOptions: FilterOption[];
    filterCount: number;
    selectedFilters: Record<string, string[]>;
    handleFilterToggle: (category: string, option: string) => void;
  }) => {
    // Add state to control dropdown open state
    const [open, setOpen] = useState(false);

    // Check if a filter option is selected
    const isFilterSelected = (category: string, option: string) => {
      return selectedFilters[category]?.includes(option) || false;
    };

    return (
      <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenu.Trigger asChild>
          <button
            className="rounded-full
         font-medium text-blue-9 w-fit flex flex-row 
         items-center gap-1 px-3 py-1 text-sm 
         bg-blue-4 hover:bg-blue-5 transition-all"
          >
            <ListFilter size={15} />
            Filters {filterCount > 0 && `(${filterCount})`}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            side="bottom"
            sideOffset={5}
            align="start"
            onCloseAutoFocus={(event) => event.preventDefault()}
            className="min-w-36 w-full rounded-md border text-sm border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-slate-900"
          >
            {filterOptions.map((filterOption) => (
              <div key={filterOption.category}>
                <DropdownMenu.Group>
                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="px-2 py-0.5 gap-1 items-center flex flex-row focus:outline-none hover:bg-blue-3 text-blue-12 rounded-sm">
                      {filterOption.displayName}
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.SubContent
                        sideOffset={8}
                        className="min-w-36 rounded-md border text-sm border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-slate-900"
                      >
                        {filterOption.options.map((option: string) => (
                          <DropdownMenu.CheckboxItem
                            className="px-2 py-0.5 gap-1 items-center flex flex-row focus:outline-none hover:bg-blue-3 text-blue-12 rounded-sm"
                            key={option}
                            checked={isFilterSelected(
                              filterOption.category,
                              option,
                            )}
                            onCheckedChange={() => {
                              handleFilterToggle(filterOption.category, option);
                              // No need to return false anymore as we're controlling the open state
                            }}
                          >
                            <div className="h-4 w-4 flex items-center justify-center rounded-xs border border-blue-10">
                              <DropdownMenu.ItemIndicator className="p-0">
                                <Check
                                  size={13}
                                  className="text-white rounded-xs bg-blue-12"
                                />
                              </DropdownMenu.ItemIndicator>
                            </div>
                            {option}
                          </DropdownMenu.CheckboxItem>
                        ))}
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Sub>
                </DropdownMenu.Group>
                <DropdownMenu.Separator />
              </div>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  },
);

// SortDropdown component for sorting data
// This component prevents the dropdown from closing when items are clicked
const SortDropdown = memo(
  ({
    sortOptions,
    sortState,
    setSortState,
  }: {
    sortOptions: SortOption[];
    sortState: SortState;
    setSortState: React.Dispatch<React.SetStateAction<SortState>>;
  }) => {
    // Add state to control dropdown open state
    const [open, setOpen] = useState(false);

    const handleSortChange = useCallback(
      (column: string) => {
        setSortState((prev) => {
          // If clicking the same column, cycle through: asc -> desc -> null
          // Find displayName for the column from sortOptions
          const displayName =
            sortOptions.find((option) => option.column === column)
              ?.displayName || null;

          if (prev.column === column) {
            if (prev.direction === 'asc') {
              return { column, displayName, direction: 'desc' };
            } else if (prev.direction === 'desc') {
              return { column: null, displayName: null, direction: null };
            } else {
              return { column, displayName, direction: 'asc' };
            }
          }
          // If clicking a different column, set to asc
          return { column, displayName, direction: 'asc' };
        });
      },
      [setSortState],
    );

    return (
      <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenu.Trigger asChild>
          <button
            className="rounded-full
         font-medium text-blue-9 w-fit flex flex-row 
         items-center gap-1 px-3 py-1 text-sm 
         bg-blue-4 hover:bg-blue-5 transition-all"
          >
            <SortDesc size={15} />
            Sort {sortState.column && `(${sortState.displayName})`}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            side="bottom"
            sideOffset={5}
            align="end"
            onCloseAutoFocus={(event) => event.preventDefault()}
            className="min-w-36 w-full rounded-md border text-sm border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-slate-900"
          >
            {sortOptions.map((sortOption) => (
              <DropdownMenu.Item
                key={sortOption.column}
                className="px-2 py-1.5 gap-2 items-center flex flex-row focus:outline-none hover:bg-blue-3 text-blue-12 rounded-sm cursor-pointer"
                onClick={() => {
                  handleSortChange(sortOption.column);
                  // Open state is controlled, no need to prevent default or stop propagation
                }}
              >
                {sortState.column === sortOption.column &&
                  (sortState.direction === 'asc' ? (
                    <ArrowUp size={15} className="text-blue-12" />
                  ) : sortState.direction === 'desc' ? (
                    <ArrowDown size={15} className="text-blue-12" />
                  ) : null)}
                <span>{sortOption.displayName}</span>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  },
);

// FilterBar component extracted outside the main component
const FilterBar = memo(
  ({
    filterOptions,
    sortOptions,
    filterCount,
    selectedFilters,
    setSelectedFilters,
    sortState,
    setSortState,
  }: {
    filterOptions: FilterOption[];
    sortOptions: SortOption[];
    filterCount: number;
    selectedFilters: Record<string, string[]>;
    setSelectedFilters: React.Dispatch<
      React.SetStateAction<Record<string, string[]>>
    >;
    sortState: SortState;
    setSortState: React.Dispatch<React.SetStateAction<SortState>>;
  }) => {
    // Handle toggling a filter option
    const handleFilterToggle = useCallback(
      (category: string, option: string) => {
        setSelectedFilters((prev) => {
          const prevSelected = prev[category] || [];

          // If already selected, remove it
          if (prevSelected.includes(option)) {
            const newSelected = prevSelected.filter((item) => item !== option);

            // If category now has no selected options, remove the category
            if (newSelected.length === 0) {
              const { [category]: _, ...rest } = prev;
              return rest;
            }

            // Otherwise update the category's selected options
            return { ...prev, [category]: newSelected };
          }

          // If not selected, add it
          return {
            ...prev,
            [category]: [...prevSelected, option],
          };
        });
      },
      [setSelectedFilters],
    );

    return (
      <div className="flex justify-between flex-row w-full">
        <FilterDropdown
          filterOptions={filterOptions}
          filterCount={filterCount}
          selectedFilters={selectedFilters}
          handleFilterToggle={handleFilterToggle}
        />
        <SortDropdown
          sortOptions={sortOptions}
          sortState={sortState}
          setSortState={setSortState}
        />
      </div>
    );
  },
);

export default function Funds() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [funds, setFunds] = useState<FundArray>([]);

  // Track selected filters as a map of category -> selected options
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);

  const sortOptions: SortOption[] = [
    {
      column: 'fund_size_usd_mn',
      displayName: 'Fund Size',
    },
    { column: 'name', displayName: 'Fund Name' },
  ];

  // Track sort state
  const [sortState, setSortState] = useState<SortState>({
    column: 'name',
    direction: 'asc',
    displayName: 'Fund Name',
  });

  // Calculate total number of selected filters across all categories
  const filterCount = Object.values(selectedFilters).reduce(
    (count, options) => count + options.length,
    0,
  );

  async function fetchFilters() {
    const { data, error } = await supabase
      .from('fund_filter_options')
      .select('*');

    if (error) {
      console.error('Error fetching filters:', error);
      return;
    }

    const formattedFilterOptions = data.map((item) => ({
      category: item.column_name!,
      displayName: item.display_name!,
      options: item.distinct_values!,
    }));

    setFilterOptions(formattedFilterOptions);
  }

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchFunds = async () => {
      let query = supabase
        .from('funds')
        .select('*', { count: 'exact' })
        .range(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage - 1,
        );

      // Apply filters
      for (const [category, options] of Object.entries(selectedFilters)) {
        if (options.length > 0) {
          query = query.in(category, options);
        }
      }

      // Apply sorting if a column is selected
      if (sortState.column && sortState.direction) {
        query = query.order(sortState.column, {
          ascending: sortState.direction === 'asc',
        });
      }

      const { data, count, error } = await query;

      if (error) {
        console.error('Error fetching funds:', error);
        return;
      }
      console.log(data);
      setFunds(data || []);
      if (typeof count === 'number') {
        setTotalPages(Math.ceil(count / itemsPerPage));
      }
    };
    fetchFunds();
  }, [currentPage, selectedFilters, sortState]); // Added sortState as a dependency

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

  const PaginationControls = memo(() => {
    return (
      <div className="flex flex-row mt-auto w-full items-center justify-center gap-4">
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
  });

  return (
    <div className="w-full px-8 py-6">
      <div className="w-full flex flex-col gap-6 h-full">
        <span className="font-ebgaramond text-4xl">Browse Funds</span>
        <Separator.Root
          orientation="horizontal"
          decorative
          className="bg-slate-200 h-px"
        />
        <FilterBar
          sortOptions={sortOptions}
          filterOptions={filterOptions}
          filterCount={filterCount}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          sortState={sortState}
          setSortState={setSortState}
        />
        <div className="h-fit grid gap-3 grid-cols-1">
          {funds.map((fund) => (
            <FundCard key={fund.fund_id} fund={fund} />
          ))}
        </div>
        <PaginationControls />
      </div>
    </div>
  );
}
