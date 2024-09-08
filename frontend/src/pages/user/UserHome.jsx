import UserLogoutButton from "../../components/user/UserLogoutButton";
import { useAuthStore } from "../../stores/useAuthStore";

const UserHome = () => {
  const authUser = useAuthStore((state) => state.authUser);
  return (
    <div>
      <p>Hello! {authUser.firstName + " " + authUser.lastName}</p>
      <p>Email: {authUser.email}</p>
      <p>Grade Level: {authUser.gradeLevel}</p>
      <p>Section: {authUser.section}</p>
      <p>Role: {authUser.role}</p>
      <UserLogoutButton />
    </div>
  );
};

export default UserHome;
