import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser, removeActiveUser } from "../../redux/Slice/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../hidden links/HiddenLinks";
import { AdminOnlyLink } from "../adminOnlyRouts/AdminOnlyRoute";
import { Button } from "@mui/material";
import { selectCartItems } from "../../redux/Slice/cartSlice";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>("");
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems).length

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const newName = user.email?.substring(0, user.email.indexOf("@"));
          const capitalizedUserName = newName?.replace(/^\w/, (c) =>
            c.toUpperCase()
          );
          if (capitalizedUserName) {
            setUserName(capitalizedUserName);
          }
          dispatch(
            setActiveUser({
              email: user.email,
              userName:
                user.displayName !== null
                  ? user.displayName
                  : capitalizedUserName,
              userId: user.uid,
            })
          );
        } else {
          setUserName(user.displayName);
          dispatch(
            setActiveUser({
              email: user.email,
              userName: user.displayName !== null ? user.displayName : userName,
              userId: user.uid,
            })
          );
        }
      } else {
        setUserName("");
        dispatch(removeActiveUser(""));
      }
    });
  }, [dispatch, userName]);

  const history = useNavigate();
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Logout Successfuly");
        history("/");
      })
      .catch((error) => {
        toast.error("User Logout failed");
      });
  };

  return (
    <div className="w-full bg-blue-950 text-white h-auto">
      <div className="flex justify-between items-center px-4 py-3">
        <div>
          <Link to="/">
            <p className="text-3xl">
              e<span className="text-orange-700">Shop</span>.
            </p>
          </Link>
        </div>
        <nav className="hidden md:block">
          <ul className="flex ">
            <AdminOnlyLink >
              <li className="mx-2 hover:text-orange-700 ">
                <Link to="/admin/home">
                  <Button variant="contained" color="primary" size="small">
                      Admin
                  </Button>
                </Link>
              </li>
            </AdminOnlyLink>
            
            <li className="mx-2 hover:text-orange-700">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "underline text-orange-700 "
                    : "no-underline text-white"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="mx-2 hover:text-orange-700">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "underline text-orange-700 "
                    : "no-underline text-white"
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </nav>
        <nav className="hidden md:block">
          <ul className="flex">
            <ShowOnLogin>
              <li className="mx-2 hover:text-orange-700">
                <NavLink
                  to="/"
                  className="mx-2 text-orange-700"
                >
                  <i className="fa-solid fa-user"></i> Hi {userName}
                </NavLink>
              </li>
            </ShowOnLogin>

            <ShowOnLogout>
              <li className="mx-2 hover:text-orange-700">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "underline text-orange-700 "
                      : "no-underline text-white"
                  }
                >
                  Login
                </NavLink>
              </li>
            </ShowOnLogout>
            <ShowOnLogin>
            <li className="mx-2 hover:text-orange-700">
              <NavLink
                to="/order-history"
                className={({ isActive }) =>
                  isActive
                    ? "underline text-orange-700 "
                    : "no-underline text-white"
                }
              >
                Order
              </NavLink>
            </li>
            </ShowOnLogin>
            <ShowOnLogin>
              <li className="mx-2 hover:text-orange-700">
                <p
                  className="hover:text-orange-700 text-white cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </li>
            </ShowOnLogin>
            <li className="mx-2 hover:text-orange-700">
              <NavLink to="/cart">
                <Badge badgeContent={cartItems} color="primary">
                  <i className="fa-solid fa-cart-shopping text-lg"></i>
                </Badge>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="md:hidden sm:block">
          <span>
            <Link to="/cart">
              <Badge
                badgeContent={cartItems}
                color="primary"
                className="hover:text-orange-700 mx-3"
              >
                <i className="fa-solid fa-cart-shopping text-lg"></i>
              </Badge>
            </Link>
            <i
              className="fa-solid fa-outdent mx-2 text-lg hover:text-orange-700"
              onClick={handleSidebarToggle}
            ></i>
          </span>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-50 z-30"
          onClick={handleCloseSidebar}
        >
          <div className="fixed left-0 top-0 bottom-0 bg-blue-950 text-white w-1/2 p-4">
            <ul>
              <li className="flex justify-between">
                <div>
                  <NavLink to="/">
                    <p className="text-3xl">
                      e<span className="text-orange-700">Shop</span>.{" "}
                    </p>
                  </NavLink>
                </div>
                <div>
                  <i
                    className="fa-solid fa-xmark text-2xl"
                    onClick={handleCloseSidebar}
                  ></i>
                </div>
              </li>
              <hr className="mb-3 w-3/4 border-slate-500 hover:border-white" />
              <div className="group">
                <li className="mx-2 group-hover:text-orange-700 text-xl">
                  <NavLink to="/admin">Admin</NavLink>
                </li>
                <hr className="mb-3 w-3/4 border-slate-500 group-hover:border-white" />
              </div>

              <div className="group">
                <li className="mx-2 group-hover:text-orange-700 text-xl">
                  <NavLink to="/">Home</NavLink>
                </li>
                <hr className="mb-3 w-3/4 border-slate-500 group-hover:border-white" />
              </div>

              <div className="group">
                <li className="mx-2 group-hover:text-orange-700 text-xl">
                  <NavLink to="/contact">Contact Us</NavLink>
                </li>
                <hr className="mb-5 w-3/4 border-slate-500 group-hover:border-white" />
              </div>

              <li className="mx-2 hover:text-orange-700 text-xl">
                <Link to="/cart">
                  <Badge badgeContent={cartItems} color="primary">
                    <i className="fa-solid fa-cart-shopping text-2xl"></i>
                  </Badge>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
