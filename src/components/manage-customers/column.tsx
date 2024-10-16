import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "@/types/custoner.type";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone_number",
    header: "phone number",
  },
  {
    accessorKey: "image_url",
    header: "ảnh chính",
    cell: ({ row }) => {
      const { image_url } = row.original;

      return <img className="w-10 h-10 object-cover" src={image_url} alt="" />;
    },
  },
  {
    accessorKey: "status",
    header: "status",
  },
];
