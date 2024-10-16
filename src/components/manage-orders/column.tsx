import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "@/types/customer.type";
import { Order } from "@/types/order.type";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone_number",
    header: "Phone number",
  },
  {
    accessorKey: "created_at",
    header: "Date",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
];
