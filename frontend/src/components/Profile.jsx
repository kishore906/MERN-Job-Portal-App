import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../redux/api/userApi";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [userDetails, setUserDetails] = useState({});
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profilePhotoPreview, setProfilePhotoPreview] = useState("");

  const [updateProfile, { isLoading, error, isSuccess, data }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (user) {
      setUserDetails({
        fullName: user?.fullName,
        email: user?.email,
        address: user?.address,
      });
      setProfilePhotoPreview(
        user?.profilePhoto ? user?.profilePhoto?.url : "/default_avatar.jpg"
      );
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }

    if (error) {
      toast.error(error.data.error);
    }
  }, [isSuccess, error, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handlePhotoUpdate = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfilePhotoPreview(reader.result);
        setProfilePhoto(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const userDataToUpdate = {
      fullName: userDetails.fullName,
      email: userDetails.email,
      address: userDetails.address,
      profilePhoto: profilePhoto !== "" ? profilePhoto : user?.profilePhoto,
    };
    // console.log(userDataToUpdate);
    updateProfile(userDataToUpdate);
  };

  return (
    <form className="profile_form" onSubmit={handleUpdate}>
      <h4 className="text-center mb-4">Profile</h4>

      <label htmlFor="fullName" className="form-label">
        <b>FullName:</b>
      </label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        className="form-control mb-4"
        value={userDetails.fullName}
        onChange={handleChange}
      />

      <label htmlFor="email" className="form-label">
        <b>Email:</b>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="form-control mb-4"
        value={userDetails.email}
        onChange={handleChange}
      />

      <label htmlFor="address" className="form-label">
        <b>Address:</b>
      </label>
      <input
        type="text"
        id="address"
        name="address"
        className="form-control mb-4"
        value={userDetails.address}
        onChange={handleChange}
      />

      <label className="form-label" htmlFor="profilePhoto">
        <b>Profile Pic:</b>
      </label>
      <div className="d-flex align-items-center flex-md-row flex-column gap-2">
        <img
          src={profilePhotoPreview}
          alt="user_img"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "5px",
          }}
        />
        <input
          type="file"
          id="profilePhoto"
          name="profilePhoto"
          className="form-control"
          accept="images/*"
          onChange={handlePhotoUpdate}
        />
      </div>

      <button
        className="bgColor d-block mx-auto px-3 py-2 border-0 rounded mt-4"
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update"}
      </button>
    </form>
  );
}

export default Profile;
