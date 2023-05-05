import React, { useState } from "react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import forgotImage from "../../assests/forgot.png";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const handleReset = (event: any) => {
    setIsLoading(true)
    event.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Check your email for password resent link");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
    {isLoading && <Loader />}
    <div
      className="flex justify-center items-center w-screen h-screen"
      style={{ height: "82vh" }}
    >
      <div className="flex h-50" style={{ width: "40rem" }}>
        <div className="w-1/2 flex justify-center items-center">
          <img src={forgotImage} alt="login_image" className="h-full" />
        </div>
        <div className="w-1/2 flex justify-center items-center ml-3 drop-shadow-lg">
          <div className="bg-white w-full h-full px-6 py-3 rounded-md">
            <h2 className="text-2xl my-4 text-center text-orange-600 font-bold">
              Reset Password
            </h2>
            <form onSubmit={handleReset}>
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  required
                  onChange={(e) => handleEmail(e)}
                  value={email}
                  placeholder="Email"
                  className="w-full border border-gray-400 p-1 rounded-md placeholder:text-sm"
                />
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className="font-bold py-1 w-full px-4 rounded"
                >
                  <strong>Reset Password</strong>
                </Button>
              </div>
            </form>
            <div className="flex justify-between my-3">
              <NavLink to="/login" className="text-blue-600">
                Login
              </NavLink>
              <NavLink to="/register" className="text-blue-600">
                - Register
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default Reset;
