import AdminLogoutButton from "../../components/admin/AdminLogoutButton";
import { useAuthStore } from "../../stores/useAuthStore";

const AdminHome = () => {
  const authUser = useAuthStore((state) => state.authUser);
  return (
    <div>
      <p>Hello! {authUser.firstName + " " + authUser.lastName}</p>
      <p>Email: {authUser.email}</p>
      <p>Role: {authUser.role}</p>
      <AdminLogoutButton />
    </div>
  );
};

export default AdminHome;
