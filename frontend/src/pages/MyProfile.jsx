import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const {
    userData,
    setUserData,
    token,
    backendUrl,
    loadUserProfileData,
  } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        setImage(null);
        await loadUserProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile. Please try again later.");
    }
  };

  return (
    userData && (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4 sm:p-6 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4 mb-6">
          {isEdit ? (
            <label htmlFor="image">
              <div className="inline-block relative cursor-pointer">
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                  className="w-24 sm:w-28 h-24 sm:h-28 rounded-full border-4 border-purple-400 shadow-md transition-transform duration-300 hover:scale-105"
                />
                {!image && (
                  <img
                    src={assets.upload_icon}
                    alt="Upload Icon"
                    className="absolute bottom-0 right-0 w-6 h-6"
                  />
                )}
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              src={userData.image}
              alt="Profile"
              className="w-24 sm:w-28 h-24 sm:h-28 rounded-full border-4 border-purple-400 shadow-md transition-transform duration-300 hover:scale-105"
            />
          )}

          {isEdit ? (
            <input
              type="text"
              className="text-xl font-semibold text-center border-b border-gray-300 focus:outline-none focus:border-blue-400 w-full sm:w-auto"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              {userData.name}
            </h2>
          )}
        </div>

        <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-4 sm:p-8 transform transition-all duration-700 opacity-100">
          {/* Contact Information */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-blue-600 mb-3">
              Contact Information
            </h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium break-words">{userData.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Phone</label>
                {isEdit ? (
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded-lg mt-1"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="font-medium">{userData.phone}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-500">Address</label>
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded-lg mt-1 mb-2"
                      value={userData.address.line1}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line1: e.target.value,
                          },
                        }))
                      }
                    />
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded-lg"
                      value={userData.address.line2}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line2: e.target.value,
                          },
                        }))
                      }
                    />
                  </>
                ) : (
                  <p className="font-medium">
                    {userData.address.line1}
                    <br />
                    {userData.address.line2}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Basic Information */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-blue-600 mb-3">
              Basic Information
            </h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <label className="text-sm text-gray-500">Gender</label>
                {isEdit ? (
                  <select
                    className="w-full border px-3 py-2 rounded-lg mt-1"
                    value={userData.gender}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className="font-medium">{userData.gender}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-500">Date of Birth</label>
                {isEdit ? (
                  <input
                    type="date"
                    className="w-full border px-3 py-2 rounded-lg mt-1"
                    value={userData.dob}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        dob: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="font-medium">{userData.dob}</p>
                )}
              </div>
            </div>
          </section>

          {/* Action Button */}
          <button
            onClick={() => {
              if (isEdit) {
                updateUserProfileData();
              } else {
                setIsEdit(true);
              }
            }}
            className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {isEdit ? "Save Information" : "Edit Profile"}
          </button>
        </div>
      </div>
    )
  );
};

export default MyProfile;
