import { useCallback, useState } from "react";
import { getAllUsersApi } from "../../../api/user.api";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllUsersApi();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, users, getUsers };
};

export default useGetAllUsers;
