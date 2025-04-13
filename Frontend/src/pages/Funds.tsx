import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Download, ListFilter, AArrowUp, AArrowDown } from "lucide-react";
import supabase from "@/lib/supabase";
import { Tables } from "@/lib/types-supabase";

export default function Funds() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [funds, setFunds] = useState<Tables<"funds">[]>([]);
  async function getFunds() {
    const { data, error } = await supabase.from("funds").select(`
        *,
        fund_managers:fund_manager_id(name)
      `);
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      setFunds(data);
    }
  }
  useEffect(() => {
    getFunds();
  }, []);

  const filteredData = useMemo(() => {
    if (!typeFilter) return funds;
    return funds.filter((fund) => fund.fund_type === typeFilter);
  }, [funds, typeFilter]);

  const columns: ColumnDef<Tables<"funds">>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Fund Name",
      },
      {
        accessorKey: "fund_managers",
        header: "Manager",
        cell: (info) => (info.getValue() as { name: string }).name,
      },
      { accessorKey: "fund_type", header: "Type" },
      {
        accessorKey: "description",
        header: "Description",
        cell: (info) => (
          <div className="line-clamp-2 max-h-[48px]">
            {info.getValue() as string}
          </div>
        ),
      },
      // {
      //   accessorKey: "objective",
      //   header: "Objective",
      //   cell: (info) =>
      //     info.getValue()
      //       ? new Intl.NumberFormat("en-US", {
      //           style: "currency",
      //           currency: "USD",
      //           maximumFractionDigits: 0,
      //         }).format(info.getValue() as number)
      //       : "N/A",
      // },
      // Empty
      {
        accessorKey: "strategy",
        header: "Strategy",
      },
      {
        accessorKey: "minimum_investment",
        header: "Min Investment",
        cell: (info) =>
          info.getValue()
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(info.getValue() as number)
            : "N/A",
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
    <div className="h-full flex-grow bg-gray-100 items-center justify-center flex w-screen">
      <div className="w-10/12 bg-white h-fit rounded-md border overflow-hidden shadow-md flex flex-col">
        <div className="w-full h-fit flex items-center justify-between flex-row p-2">
          <div className="flex flex-row w-fit gap-1 items-center">
            <Button
              variant={typeFilter === "" ? "default" : "outline"}
              onClick={() => setTypeFilter("")}
            >
              All
            </Button>
            <Button
              variant={typeFilter === "PRA" ? "default" : "outline"}
              onClick={() => setTypeFilter("PRA")}
            >
              Private Markets
            </Button>
            <Button
              variant={typeFilter === "HF" ? "default" : "outline"}
              onClick={() => setTypeFilter("HF")}
            >
              Hedge Fund
            </Button>
          </div>
          <div className="flex flex-row w-fit gap-1.5 items-center">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md px-2 py-1.5 text-sm"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <Button variant="outline">
              <Download />
              Export
            </Button>
            <Button variant="outline">Overview</Button>
            <Button variant="outline">
              <ListFilter />
              Filters
            </Button>
          </div>
        </div>

        <div className="overflow-auto px-4 py-2 flex-1">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className=" bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-3 bg-black text-white py-2 border cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <AArrowUp />,
                          desc: <AArrowDown />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="even:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3 py-2 border h-[60px]">
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
