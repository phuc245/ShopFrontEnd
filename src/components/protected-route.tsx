import { useGetMeUser } from "@/hooks/query-users/useGetMeUser";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { isError } = useGetMeUser();
  const navigate = useNavigate();
  // console.log(isError);
  useEffect(() => {
    if (isError) {
      navigate("/admin/login");
    }
  }, [isError]);

  return children;
}

export default ProtectedRoute;
