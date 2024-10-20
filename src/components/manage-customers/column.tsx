import { ColumnDef } from "@tanstack/react-table";

import { Switch } from "../ui/switch";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useUpdateStatusCustomer } from "@/hooks/query-customer/useUpdateStatusCustomer";
import { Customer } from "@/types/customer.type";

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
    cell: ({ cell, row }) => {
      const { _id, status } = row.original;
      const mutation = useUpdateStatusCustomer();
      function handleStatus() {
        mutation.mutate({ _id, status: !status });
      }
      return (
        <Switch
          checkedIcon={<FaCheck />}
          unCheckedIcon={<RxCross2 />}
          checked={status}
          onCheckedChange={handleStatus}
        />
      );
    },
  },
];
