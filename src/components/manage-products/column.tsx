import { useProductStore } from "@/store/useProductStore";
import { Product } from "@/types/product.type";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "../table/action";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
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
  {
    accessorKey: "",
    header: "actions",
    cell: ({ cell, row }) => {
      const { _id, name } = row.original;
      const { setModalDelete } = useProductStore();

      return (
        <Actions
          link_update={`/admin/products/${_id}`}
          setModalDelete={setModalDelete}
          _id={_id}
          name={name}
        />
      );
    },
  },
];
