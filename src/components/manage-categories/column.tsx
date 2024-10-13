import Actions from "../table/action";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Switch } from "../ui/switch";
import { useUserStore } from "@/store/useUserStore";
import { Category } from "@/types/category.type";
import { ColumnDef } from "@tanstack/react-table";
import { useCategoryStore } from "@/store/useCategotyStore";

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
            {row.getIsExpanded() ? "👇" : "👉"}
          </button>
        ) : (
          "🔵"
        )}{" "}
        {getValue<boolean>()}
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: "status",
    cell: ({ cell, row }) => {
      const { _id, status } = row.original;
      return (
        <Switch
          checkedIcon={<FaCheck />}
          unCheckedIcon={<RxCross2 />}
          checked={status}
        />
      );
    },
  },

  {
    accessorKey: "",
    header: "actions",
    cell: ({ cell, row }) => {
      const { _id, name } = row.original;
      const { setModalDelete } = useCategoryStore();

      return <Actions setModalDelete={setModalDelete} _id={_id} name={name} />;
    },
  },
];
