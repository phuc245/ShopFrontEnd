import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetUser } from "@/hooks/query-users/useGetUser";
import { useUpdateUser } from "@/hooks/query-users/useUpdateUser";
import useToastMessage from "@/hooks/useToastMessage";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function UpdateUserPage() {
  const _id = useParams().id ?? "";
  const [name, setName] = useState("");
  const { data: user } = useGetUser(_id);
  const { toastLoading } = useToastMessage();

  const mutation = useUpdateUser();

  function handleUpdate() {
    toastLoading("Vui lòng đợi");
    mutation.mutate({ _id, name });
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Manager User</h1>{" "}
      <Link to={"/admin/users"}>
        <Button>Quay lại</Button>
      </Link>
      <div className="flex flex-col items-center gap-4 justify-center">
        <h1 className="text-xl">Update User {user?.name}</h1>
        <div className="flex gap-2">
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            defaultValue={user?.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <Button onClick={handleUpdate} className="self-end">
        Tạo
      </Button>
    </div>
  );
}

export default UpdateUserPage;
