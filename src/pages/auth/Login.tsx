import React, { useState } from "react";
import loginImage from "../../assests/login.png";
import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSelector } from "react-redux";
import { selectPreviousUrl } from "../../redux/Slice/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [paswd, setPaswd] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const url = useSelector(selectPreviousUrl);
  const history = useNavigate();

  const handleRedirectUser = ()=>{
      if(url.includes("cart")){
        return history("/cart");
      }
      history("/")
  }

  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePaswd = (event: any) => {
    setPaswd(event.target.value);
  };

  //Sign in with google 
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = ()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    toast.success("User logged in");
    handleRedirectUser();
  }).catch((error) => {
      toast.error("login fail ")
  });
  }

  const handleLogin = (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, paswd)
      .then((userCredential) => {
        toast.success("Login Successful...");
        setIsLoading(false);
        handleRedirectUser();
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
        <div className="flex h-80" style={{ width: "40rem" }}>
          <div className="w-1/2 flex justify-center items-center">
            <img src={loginImage} alt="login_image" className="h-full" />
          </div>
          <div className="w-1/2 flex justify-center items-center ml-3 drop-shadow-lg">
            <div className="bg-white w-full h-full px-6 py-3 rounded-md">
              <h2 className="text-2xl mb-4 text-center text-orange-600 font-bold">
                Login
              </h2>
              <form onSubmit={handleLogin}>
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
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    className="font-bold py-1 w-full px-4 rounded"
                  >
                    <strong>Login</strong>
                  </Button>
                </div>
              </form>
              <NavLink to="/reset" className="text-blue-600 mb-3">
                Forgot Password
              </NavLink>
              <p className="text-center text-slate-600 mb-2">-- or --</p>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  color="warning"
                  variant="contained"
                  className="py-1 w-full px-4 rounded"
                  onClick={signInWithGoogle}
                >
                  <span>
                    <i className="fa-brands fa-google"></i>{" "}
                    <strong>Login with Google</strong>{" "}
                  </span>
                </Button>
              </div>
              <span>
                Don't have an account{" "}
                <NavLink to="/register" className="text-blue-600 mb-3">
                  Register
                </NavLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
