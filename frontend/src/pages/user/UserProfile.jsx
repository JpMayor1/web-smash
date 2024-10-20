import { useState } from "react";
import UserLogoutButton from "../../components/user/UserLogoutButton";
import { useAuthStore } from "../../stores/useAuthStore";
import {
  EmailIcon,
  GraduationScrollIcon,
  Mortarboard01Icon,
  UserIcon,
} from "../../components/svg/svg";
import useUpdateProfile from "../../hooks/user/useUpdateProfile";

const UserProfile = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserDetails, setUpdatedUserDetails] = useState({
    firstName: authUser.firstName,
    lastName: authUser.lastName,
    email: authUser.email,
    gradeLevel: authUser.gradeLevel,
    section: authUser.section,
  });

  const { loading, updateProfile } = useUpdateProfile();

  // Handle input change for all form fields
  const handleChange = (e) => {
    setUpdatedUserDetails({
      ...updatedUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfileCall = (e) => {
    e.preventDefault();
    const seccess = updateProfile(updatedUserDetails);
    if (seccess) {
      setIsEditing(false);
    }
  };

  return (
    <div className="h-full w-full max-w-screen-sm pt-5 px-5">
      <h1 className="text-white text-center font-semibold text-2xl">Profile</h1>
      <div className="h-full flex items-center justify-center">
        <div className="h-fit w-full flex flex-col gap-4">
          {/* First Name */}
          <label
            className={` flex items-center gap-2 ${
              isEditing
                ? "input input-bordered"
                : "bg-white text-black h-[3rem] px-[1rem] rounded-md"
            }`}
          >
            <UserIcon />
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={updatedUserDetails.firstName}
                onChange={handleChange}
                className="grow"
                placeholder="First Name"
                required
              />
            ) : (
              <p className="grow">{authUser.firstName}</p>
            )}
          </label>

          {/* Last Name */}
          <label
            className={` flex items-center gap-2 ${
              isEditing
                ? "input input-bordered"
                : "bg-white text-black h-[3rem] px-[1rem] rounded-md"
            }`}
          >
            <UserIcon />
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={updatedUserDetails.lastName}
                onChange={handleChange}
                className="grow"
                placeholder="Last Name"
                required
              />
            ) : (
              <p className="grow">{authUser.lastName}</p>
            )}
          </label>

          {/* Email */}
          <label
            className={` flex items-center gap-2 ${
              isEditing
                ? "input input-bordered"
                : "bg-white text-black h-[3rem] px-[1rem] rounded-md"
            }`}
          >
            <EmailIcon />
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={updatedUserDetails.email}
                onChange={handleChange}
                className="grow"
                placeholder="Email"
                required
              />
            ) : (
              <p className="grow">{authUser.email}</p>
            )}
          </label>

          {/* Grade Level */}
          <label
            className={` flex items-center gap-2 ${
              isEditing
                ? "input input-bordered"
                : "bg-white text-black h-[3rem] px-[1rem] rounded-md"
            }`}
          >
            <Mortarboard01Icon />
            {isEditing ? (
              <input
                type="number"
                name="gradeLevel"
                value={updatedUserDetails.gradeLevel}
                onChange={handleChange}
                className="grow"
                placeholder="Grade Level"
              />
            ) : (
              <p className="grow">{authUser.gradeLevel}</p>
            )}
          </label>

          {/* Section */}
          <label
            className={` flex items-center gap-2 ${
              isEditing
                ? "input input-bordered"
                : "bg-white text-black h-[3rem] px-[1rem] rounded-md"
            }`}
          >
            <GraduationScrollIcon />
            {isEditing ? (
              <input
                type="text"
                name="section"
                value={updatedUserDetails.section}
                onChange={handleChange}
                className="grow"
                placeholder="Section"
              />
            ) : (
              <p className="grow">{authUser.section}</p>
            )}
          </label>

          {/* Buttons for saving or canceling */}
          {isEditing ? (
            <>
              <button
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/80 transition duration-300"
                onClick={updateProfileCall}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Save"
                )}
              </button>
              <button
                type="button"
                className="w-full bg-red text-white py-2 px-4 rounded-lg hover:bg-red/90 transition duration-300"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/80 transition duration-300"
                onClick={() => setIsEditing(true)}
              >
                Update
              </button>
              <UserLogoutButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;