import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Button } from "./components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

const funds = [
  {
    uid: "uuid-vandelay-fund",
    name: "Vandelay Public Growth Fund",
    manager: { name: "Vandelay Capital" },
    fund_type: "PE",
    description:
      "Invests in publicly listed companies with strong export potential.",
    target_size: 50000000.0,
    minimum_investment: 100000.0,
    is_active: true,
  },
  {
    uid: "uuid-peterman-emerging",
    name: "Peterman Frontier Opportunities Fund",
    manager: { name: "Peterman Global" },
    fund_type: "VC",
    description:
      "Targets early-stage companies innovating in supply chain tech.",
    target_size: 30000000.0,
    minimum_investment: 50000.0,
    is_active: true,
  },
  {
    uid: "uuid-kramer-syndicate",
    name: "Kramerica Energy Syndicate",
    manager: { name: "Kramerica Ventures" },
    fund_type: "PE",
    description: "Invests in renewable and alternative energy plays.",
    target_size: 45000000.0,
    minimum_investment: 100000.0,
    is_active: true,
  },
  {
    uid: "uuid-costanza-turnaround",
    name: "Costanza Distressed Assets Fund",
    manager: { name: "Vandelay Capital" },
    fund_type: "PE",
    description: "Acquires and restructures underperforming mid-market firms.",
    target_size: 75000000.0,
    minimum_investment: 200000.0,
    is_active: false,
  },
  {
    uid: "uuid-lippman-consumer",
    name: "Lippman Consumer Growth Fund",
    manager: { name: "Lippman Partners" },
    fund_type: "VC",
    description: "Focuses on D2C consumer brands with viral growth.",
    target_size: 40000000.0,
    minimum_investment: 50000.0,
    is_active: true,
  },
  {
    uid: "uuid-mayor-art-debt",
    name: "Mayor Art Credit Opportunities",
    manager: { name: "ArtVandelay Capital" },
    fund_type: "Private Credit",
    description: "Provides structured debt to late-stage startups.",
    target_size: 60000000.0,
    minimum_investment: 150000.0,
    is_active: true,
  },
  {
    uid: "uuid-babalu-realty",
    name: "Babalu Global Real Estate",
    manager: { name: "Babalu Partners" },
    fund_type: "RE",
    description: "Global REIT focusing on logistics hubs and industrial parks.",
    target_size: 100000000.0,
    minimum_investment: 250000.0,
    is_active: false,
  },
  {
    uid: "uuid-delboca-tech",
    name: "Del Boca Vista AI Fund",
    manager: { name: "DBV Capital" },
    fund_type: "VC",
    description: "Invests in applied AI startups in enterprise SaaS.",
    target_size: 35000000.0,
    minimum_investment: 75000.0,
    is_active: true,
  },
  {
    uid: "uuid-frasier-healthcare",
    name: "Frasier Biotech & Wellness Fund",
    manager: { name: "Crane Brothers Capital" },
    fund_type: "PE",
    description: "Growth capital for biotech and preventive wellness ventures.",
    target_size: 80000000.0,
    minimum_investment: 100000.0,
    is_active: true,
  },
  {
    uid: "uuid-cheers-infra",
    name: "Cheers Core Infrastructure Fund",
    manager: { name: "Sam & Co. Infra" },
    fund_type: "Infra",
    description: "Invests in toll roads, bridges, and ports across South Asia.",
    target_size: 120000000.0,
    minimum_investment: 300000.0,
    is_active: true,
  },
  {
    uid: "uuid-puddy-ev",
    name: "Puddy Mobility Fund",
    manager: { name: "Eight Ball Ventures" },
    fund_type: "VC",
    description: "Seed and Series A investments in EV ecosystem startups.",
    target_size: 25000000.0,
    minimum_investment: 50000.0,
    is_active: false,
  },
  {
    uid: "uuid-newman-logistics",
    name: "Newman Cross-Border Logistics Fund",
    manager: { name: "Newman Global Logistics" },
    fund_type: "PE",
    description: "Backs digitized logistics platforms across emerging markets.",
    target_size: 65000000.0,
    minimum_investment: 100000.0,
    is_active: true,
  },
  {
    uid: "uuid-elaine-fashion",
    name: "Elaine Women's Innovation Fund",
    manager: { name: "J. Peterman Holdings" },
    fund_type: "VC",
    description: "Invests in women-led fashion-tech startups.",
    target_size: 20000000.0,
    minimum_investment: 25000.0,
    is_active: true,
  },
  {
    uid: "uuid-bania-wellness",
    name: "Bania Longevity Fund",
    manager: { name: "Bania Wellness Capital" },
    fund_type: "VC",
    description:
      "Focuses on longevity science, anti-aging biotech, and supplements.",
    target_size: 18000000.0,
    minimum_investment: 30000.0,
    is_active: true,
  },
  {
    uid: "uuid-niles-ai",
    name: "Niles Cognitive AI Ventures",
    manager: { name: "Crane Brothers Capital" },
    fund_type: "VC",
    description:
      "AI/ML investments with emphasis on neuro-linguistic learning.",
    target_size: 40000000.0,
    minimum_investment: 60000.0,
    is_active: true,
  },
  {
    uid: "uuid-roxbury-real-assets",
    name: "Roxbury Hard Assets Fund",
    manager: { name: "Melville Asset Group" },
    fund_type: "PE",
    description: "Focuses on mining, energy, and rare earth assets.",
    target_size: 110000000.0,
    minimum_investment: 500000.0,
    is_active: false,
  },
  {
    uid: "uuid-steinbrenner-sports",
    name: "Steinbrenner Sports & Media Ventures",
    manager: { name: "Yankee Holdings" },
    fund_type: "PE",
    description:
      "Invests in sports teams, media rights, and esports properties.",
    target_size: 150000000.0,
    minimum_investment: 1000000.0,
    is_active: true,
  },
  {
    uid: "uuid-lane-clean-energy",
    name: "David Lane Green Future Fund",
    manager: { name: "EcoUrban Capital" },
    fund_type: "Infra",
    description:
      "Invests in solar farms, green hydrogen, and climate tech infra.",
    target_size: 130000000.0,
    minimum_investment: 200000.0,
    is_active: true,
  },
  {
    uid: "uuid-kacl-digital-assets",
    name: "KACL Digital Assets Fund",
    manager: { name: "KACL Finance" },
    fund_type: "Hedge",
    description: "Invests in tokenized assets, stablecoin yield strategies.",
    target_size: 90000000.0,
    minimum_investment: 150000.0,
    is_active: true,
  },
  {
    uid: "uuid-rebecca-hospitality",
    name: "Rebecca Hospitality Growth Fund",
    manager: { name: "Cheers Capital Partners" },
    fund_type: "PE",
    description: "Mid-cap hospitality chains in India and SEA.",
    target_size: 70000000.0,
    minimum_investment: 100000.0,
    is_active: true,
  },
  {
    uid: "uuid-monk-tech-alpha",
    name: "Monk AI Alpha Fund",
    manager: { name: "MonkBridge Capital" },
    fund_type: "Hedge",
    description: "Quant-driven investments in frontier tech equities.",
    target_size: 85000000.0,
    minimum_investment: 120000.0,
    is_active: false,
  },
  {
    uid: "uuid-cheers-fund",
    name: "Cheers Real Asset Fund",
    manager: { name: "Cheers Asset Management" },
    fund_type: "PRA",
    description: "Targets vineyards and brewery real estate.",
    target_size: 20000000.0,
    minimum_investment: 50000.0,
    is_active: true,
  },
  {
    uid: "uuid-frasier-fund",
    name: "Frasier Hedge Opportunities",
    manager: { name: "Frasier Financials" },
    fund_type: "HF",
    description: "Event-driven strategy for media conglomerates.",
    target_size: 120000000.0,
    minimum_investment: 250000.0,
    is_active: true,
  },
];
function App() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filteredData = useMemo(() => {
    if (!typeFilter) return funds;
    return funds.filter((fund) => fund.fund_type === typeFilter);
  }, [funds, typeFilter]);

  const columns: ColumnDef<(typeof funds)[0]>[] = useMemo(
    () => [
      { accessorKey: "name", header: "Fund Name" },
      {
        accessorKey: "manager",
        header: "Manager",
        cell: (info) => info.getValue().name,
      },
      { accessorKey: "fund_type", header: "Type" },
      { accessorKey: "description", header: "Description" },
      {
        accessorKey: "target_size",
        header: "Target Size",
        cell: (info) =>
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(info.getValue()),
      },
      {
        accessorKey: "minimum_investment",
        header: "Min Investment",
        cell: (info) =>
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(info.getValue()),
      },
      {
        accessorKey: "is_active",
        header: "Active",
        cell: (info) => (info.getValue() ? "Yes" : "No"),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="h-screen bg-gray-100 items-center justify-center flex w-screen">
      <div className="w-2/3 bg-white h-[90%] rounded-md border overflow-hidden shadow-md flex flex-col">
        <div className="w-full h-fit flex items-center justify-between flex-row p-2">
          <div className="flex flex-row w-fit gap-1 items-center">
            <Button variant="outline" onClick={() => setTypeFilter("")}>
              All - {funds.length}
            </Button>
            <Button variant="outline" onClick={() => setTypeFilter("PRA")}>
              Private Markets
            </Button>
            <Button variant="outline" onClick={() => setTypeFilter("HF")}>
              Hedge Fund
            </Button>
          </div>
          <div className="flex flex-row w-fit gap-1 items-center">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md px-2 py-1 text-sm"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <Button variant="outline">Export</Button>
            <Button variant="outline">Overview</Button>
            <Button variant="outline">Filters</Button>
          </div>
        </div>

        <div className="overflow-auto px-4 py-2 flex-1">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-3 py-2 border cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="even:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3 py-2 border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {table.getRowModel().rows.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-4 text-gray-500"
                  >
                    No results
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-3 border-t bg-gray-50">
          <div className="text-sm text-gray-700">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
