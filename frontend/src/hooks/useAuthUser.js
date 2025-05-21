import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const authUserQuery = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, // auth check
  });

  // Add logging for debugging
  console.log("Auth user data:", authUserQuery.data);
  console.log("Auth user error:", authUserQuery.error);
  console.log("Auth user status:", authUserQuery.status);

  return { 
    isLoading: authUserQuery.isLoading, 
    authUser: authUserQuery.data?.user,
    error: authUserQuery.error,
    status: authUserQuery.status 
  };
};
export default useAuthUser;
