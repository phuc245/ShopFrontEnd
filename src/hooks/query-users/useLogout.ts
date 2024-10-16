import { LocalUtils } from "@/utils/local-util";
import { useNavigate } from "react-router-dom";

export const useLogout = (url: string) => {
  const navigate = useNavigate();
  LocalUtils.removeLocalToken();
  navigate(url);
};
