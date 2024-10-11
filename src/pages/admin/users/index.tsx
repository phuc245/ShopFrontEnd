import DialogDelete from "@/components/dialog-delete";
import { columns } from "@/components/manage-users/columm";
import DataTable from "@/components/table/data-table";
import { useDeleteUser } from "@/hooks/query-users/useDeleteUser";
import { useGetAllUser } from "@/hooks/query-users/useGetAllUsers";
import useDebounce from "@/hooks/useDebounce";
import { useUserStore } from "@/store/useUserStore";
import React, { useState } from "react";

function UsersPage() {
  const [keyword, setKeyword] = useState("");
  const debounced = useDebounce(keyword, 2000);

  const { modalDelete, setModalDelete, _id, name } = useUserStore();
  const mutation = useDeleteUser();

  const { data, isLoading } = useGetAllUser({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: debounced,
  });

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Manager User</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <DataTable
            data={data?.entities ?? []}
            columns={columns}
            setKeyword={setKeyword}
            keyword={keyword}
            link_create="/admin/users/create-user"
          />
        )}
      </div>
      <DialogDelete
        open={modalDelete}
        name={name}
        _id={_id}
        mutate={mutation.mutate}
        setModalDelete={setModalDelete}
      />
    </>
  );
}

export default UsersPage;
