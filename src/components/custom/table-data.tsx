import { flexRender, Table as ITable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScaleLoader } from "react-spinners";

export default function TableData<T>({
  table,
  isLoading,
}: {
  table: ITable<T>;
  isLoading?: boolean;
}) {
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  style={{ width: `${header.getSize()}px` }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {isLoading && (
          <TableRow>
            <TableCell 
              colSpan={table.getAllColumns().length} 
              className="relative h-60 text-center"
            >
              <div className="absolute inset-0 flex justify-center items-center text-primary">
                <ScaleLoader color="currentColor" />
              </div>
            </TableCell>
          </TableRow>
        )}
        {!!table.getRowModel().rows?.length && !isLoading && (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
        {table.getRowModel().rows.length === 0 && !isLoading && (
          <TableRow>
            <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
