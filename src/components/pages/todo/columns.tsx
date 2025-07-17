import { Badge } from "@/components/ui/badge";
import { ITodo } from "@/types/todo";
import { ColumnDef } from "@tanstack/react-table";
import { BadgeCheckIcon, BadgeXIcon } from "lucide-react";

export const todoColumns: ColumnDef<ITodo>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="capitalize truncate max-w-xs md:max-w-fit">{row.original.title}</div>,
  },
  {
    accessorKey: "completed",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.completed ? (
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600"
          >
            <BadgeCheckIcon />
            <span className="sr-only md:not-sr-only">
              Completed
            </span>
          </Badge>
        ) : (
          <Badge variant="destructive">
            <BadgeXIcon />
            <span className="sr-only md:not-sr-only">
              Not Completed
            </span>
          </Badge>
        )}
      </div>
    ),
  },
];
