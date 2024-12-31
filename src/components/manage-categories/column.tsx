import Actions from "../table/action";
import { FaCheck, FaAngleDown, FaAngleRight, FaSquare } from "react-icons/fa"; // Thêm FaSquare
import { RxCross2 } from "react-icons/rx";
import { Switch } from "../ui/switch";
import { useCategoryStore } from "@/store/useCategotyStore";
import { useUpdateStatusCategory } from "@/hooks/query-categories/useUpdateStatusCategory";
import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/types/category.type";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row, getValue }) => (
      <div>
        {row.getCanExpand() ? (
          <button
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer" },
            }}
          >
            {/* Thay emoji bằng icon mũi tên từ react-icons */}
            {row.getIsExpanded() ? <FaAngleDown /> : <FaAngleRight />}
          </button>
        ) : (
          <FaSquare style={{ color: "#007bff" }} /> // Thay dấu chấm xanh bằng icon FaSquare
        )}{" "}
        {getValue<boolean>()}
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ cell, row }) => {
      const { _id, status } = row.original;
      const mutation = useUpdateStatusCategory();
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

  {
    accessorKey: "",
    header: "Actions",
    cell: ({ cell, row }) => {
      const { _id, name } = row.original;
      const { setModalDelete } = useCategoryStore();

      return (
        <Actions
          link_update={`/admin/categories/${_id}`}
          setModalDelete={setModalDelete}
          _id={_id}
          name={name}
        />
      );
    },
  },
];
