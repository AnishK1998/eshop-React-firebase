import React, { useState } from "react";
import registerImage from "../../assests/register.png";
import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/Loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [paswd, setPaswd] = useState("");
  const [confirmPaswd, setConfirmPaswd] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const history = useNavigate()
  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  };
  const handlePaswd = (event: any) => {
    setPaswd(event.target.value);
  };
  const handleConfirmPaswd = (event: any) => {
    setConfirmPaswd(event.target.value);
  };

  const handleRegister = (event: any) => {
    setIsLoading(true)
    event.preventDefault();
    if (paswd !== confirmPaswd) {
      toast.error("Passwords doesn't match");
    } else {
      createUserWithEmailAndPassword(auth, email, paswd)
        .then((userCredential) => {
          setIsLoading(false);
          toast.success("Registration Successful");
          history("/login")
        })
        .catch((error) => {
          toast.error("Failed in Registration");
          setIsLoading(false)
        });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div
        className="flex justify-center items-center w-screen h-screen"
        style={{ height: "82vh" }}
      >
        <div className="flex h-80" style={{ width: "40rem" }}>
          <div className="w-1/2 flex justify-center items-center ml-3 drop-shadow-lg">
            <div className="bg-white w-full h-full px-6 py-3 rounded-md">
              <h2 className="text-2xl my-4 text-center text-orange-600 font-bold">
                Register
              </h2>
              <form onSubmit={handleRegister}>
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
                <div className="mb-4">
                  <input
                    type="password"
                    id="password"
                    required
                    onChange={(e) => handlePaswd(e)}
                    value={paswd}
                    placeholder="Password"
                    className="w-full border border-gray-400 p-1 rounded-md placeholder:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    id="confirmPassword"
                    required
                    onChange={(e) => handleConfirmPaswd(e)}
                    value={confirmPaswd}
                    placeholder="Confirm Password"
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
                    <strong>Register</strong>
                  </Button>
                </div>
              </form>
              <span>
                already have an account?{" "}
                <NavLink to="/login" className="text-blue-600 mb-3">
                  Login
                </NavLink>
              </span>
            </div>
          </div>

          <div className="w-1/2 flex justify-center items-center">
            <img
              src={registerImage}
              alt="login_image"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
