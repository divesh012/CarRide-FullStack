import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user,setUser, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState(null);

  const updateImage = async () => {
    try {
      if (!image) {
        toast.error("No image selected");
        return;
      }

      console.log("Uploading image..."); // debug

      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post(
        "/api/owner/update-image",
        formData
      );

      console.log("Response:", data); // debug

      if (data.success) {
  toast.success(data.message)

  // ✅ instantly update UI
  setUser(prev => ({
    ...prev,
    image: data.image
  }))

  setImage(null)
} else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-8 max-w-[60px] md:max-w-[240px] w-full border-r border-gray-200 text-sm">
      
      <div className="relative group">
        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image || assets.defaultUserImage
            }
            alt="User"
            className="w-14 h-14 rounded-full object-cover cursor-pointer"
          />

          <input
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="absolute inset-0 hidden bg-black/20 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="" className="w-4 h-4" />
          </div>
        </label>
      </div>

      {image && (
        <button
          type="button"
          onClick={updateImage}
          className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded cursor-pointer"
        >
          Save
          <img src={assets.check_icon} width={13} alt="" />
        </button>
      )}

      <p className="mt-3 text-base font-medium max-md:hidden">
        {user?.name}
      </p>

      <div className="w-full mt-4">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`flex items-center gap-3 w-full py-3 pl-4 relative transition ${
              link.path === location.pathname
                ? "bg-primary text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <img
              src={
                link.path === location.pathname
                  ? link.coloredIcon
                  : link.icon
              }
              alt="icon"
              className="w-5 h-5"
            />

            <span className="max-md:hidden">{link.name}</span>

            {link.path === location.pathname && (
              <div className="bg-primary w-1.5 h-8 rounded-l absolute right-0"></div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;