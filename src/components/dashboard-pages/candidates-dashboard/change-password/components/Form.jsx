import { useState } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";

const Form = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    try {
      const token = localStorage.getItem(Constant.USER_INFO); // Replace this with your actual token
      const response = await axios.put(
        "https://api.sentryspot.co.uk/api/user/change-password",
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        setMessage("Password changed successfully.");
      }
    } catch (error) {
      setMessage("Error changing password. Please try again.");
    }
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-12 col-md-12">
          <label>Old Password </label>
          <input
            type={showOldPassword ? "text" : "password"}
            name="oldPassword"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <button
            type="button"
             className="border rounded-lg mt-2 float-end bg-blue-800 text-white"
            onClick={() => setShowOldPassword((prev) => !prev)}
          >
            {showOldPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>New Password</label>
          <input
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
             className="border rounded-lg mt-2 float-end bg-blue-800 text-white"
            onClick={() => setShowNewPassword((prev) => !prev)}
          >
            {showNewPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="border rounded-lg mt-2 float-end bg-blue-800 text-white"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        {message && (
          <div className="form-group col-lg-12">
            <p>{message}</p>
          </div>
        )}

        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
