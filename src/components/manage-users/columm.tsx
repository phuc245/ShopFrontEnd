import { User } from "@/types/user.type";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "../table/action";
import { useUpdateStatusUser } from "@/hooks/query-users/useUpdateStatusUser";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Switch } from "../ui/switch";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { GrDisabledOutline } from "react-icons/gr";
import { useUserStore } from "@/store/useUserStore";

export const columns: ColumnDef<User>[] = [
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
    header: "name",
  },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ cell, row }) => {
      const { _id, status } = row.original;
      const mutation = useUpdateStatusUser();
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
    accessorKey: "role",
    header: "role",

    cell: ({ cell, row }) => {
      const { role } = row.original;
      return (
        <>
          {role.includes("ADMIN") ? (
            <MdOutlineAdminPanelSettings size={30} />
          ) : (
            role
          )}
        </>
      );
    },
  },
  {
    accessorKey: "",
    header: "actions",
    cell: ({ cell, row }) => {
      const { _id, role, email } = row.original;
      const { setModalDelete } = useUserStore();

      return !role.includes("ADMIN") ? (
        <Actions
          setModalDelete={setModalDelete}
          _id={_id}
          name={email}
          link_update={`/admin/users/${_id}`}
        />
      ) : (
        <Button variant={"ghost"} disabled={true} size={"icon"}>
          <GrDisabledOutline />
        </Button>
      );
    },
  },
];
