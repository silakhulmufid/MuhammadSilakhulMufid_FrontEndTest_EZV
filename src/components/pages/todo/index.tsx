"use client";

import BasicPagination from "@/components/mvpblocks/basic-pagination";
import { useGetTodosQuery } from "@/store/todo/api";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { todoColumns } from "./columns";
import TableData from "@/components/custom/table-data";
import { ITodo } from "@/types/todo";
import { Button } from "@/components/ui/button";
import useBreakpoint from "@/hooks/useBreakpoint";
import { DoorOpenIcon, Plus } from "lucide-react";
import { INIT_PAGE_META } from "@/constants";
import { IPageMeta } from "@/types/pagination";
import TodoForm from "./form";
import Menu from "@/components/custom/menu";

export default function TodoPage({
  initialTodosData = [],
  userId,
}: {
  initialTodosData?: ITodo[];
  userId?: string;
}) {
  const [pageMeta, setPageMeta] = useState<IPageMeta>(INIT_PAGE_META);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isMounted, setIsMounted] = useState(false);
  const [editData, setEditData] = useState<ITodo>();
  const [openModal, setOpenModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { md } = useBreakpoint();

  const { data: rtqData, isFetching } = useGetTodosQuery({
    start: pageMeta.start,
    limit: 10,
    userId: userId ? Number(userId) : undefined,
  });

  const data = rtqData || initialTodosData;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const menus = [
    {
      label: "Action",
      items: [
        {
          label: "Edit",
          onClick: () => setOpenModal(true),
        },
      ],
    },
  ];

  const withActionColumn: ColumnDef<ITodo>[] = [
    ...todoColumns,
    {
      id: "actions",
      maxSize: isMounted && md ? 100 : 30,
      header: isMounted && md ? "Actions" : "",
      enableHiding: false,
      cell: ({ row }) => (
        <Button
          size="xs"
          variant="default"
          onClick={() => {
            setEditData(row.original);
            setOpenModal(true);
          }}
        >
          <span>Edit</span>
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: data || [],
    columns: withActionColumn,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const onPageChange = (page: number) => {
    setPageMeta((prev) => ({
      ...prev,
      start: (page - 1) * 10,
      page,
    }));
  };

  return (
    <div className="w-full min-h-screen space-y-4 px-4 md:px-20 lg:px-40 py-16 bg-background">
      <div className="absolute top-1 right-1 lg:top-5 lg:right-5">
        <Button variant="ghost" size="icon_md" href="/">
          <DoorOpenIcon />
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Todo</h1>
        <Button onClick={() => setOpenModal(true)}>
          <Plus className="text-sm" />
          <span>New Todo</span>
        </Button>
      </div>
      <div className="rounded-md border shadow-md overflow-hidden">
        <TableData table={table} isLoading={isFetching} />
        <div className="px-4">
          <BasicPagination
            totalPages={10}
            initialPage={pageMeta.page}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      <TodoForm
        data={editData}
        openModal={openModal}
        toogleOpenModal={setOpenModal}
      />
      <Menu open={openMenu} onOpenChange={setOpenMenu} menus={menus} />
    </div>
  );
}
