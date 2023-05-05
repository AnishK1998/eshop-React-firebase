import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/Slice/authSlice";

const Navbar = () => {
  const userName = useSelector(selectUserName);
  return (
    <div>
      <div className="flex flex-col justify-center h-40 items-center bg-blue-600">
      <p><i className="fa-sharp fa-solid fa-user-tie text-5xl text-white mb-2" /></p>
      <p className="text-white">{userName}</p>
      </div>
      <div>
        <ul>
          <li className="px-6 py-4 border-b-2 border-slate-200 drop-shadow-lg transition duration-300 ease-in-out hover:-translate-y-2">
            <NavLink to="/admin/home" className={({isActive}) => isActive ? "text-orange-600" : ""}>Home</NavLink>
          </li>
          <li className="px-6 py-4 border-b-2 border-slate-200 drop-shadow-lg transition duration-300 ease-in-out hover:-translate-y-2">
            <NavLink to="/admin/add-product/add" className={({isActive}) => isActive ? "text-orange-600" : ""}>Add Product</NavLink>
          </li>
          <li className="px-6 py-4 border-b-2 border-slate-200 drop-shadow-lg transition duration-300 ease-in-out hover:-translate-y-2">
            <NavLink to="/admin/all-products" className={({isActive}) => isActive ? "text-orange-600" : ""}>View Products</NavLink>
          </li>
          <li className="px-6 py-4 border-b-2 border-slate-200 drop-shadow-lg transition duration-300 ease-in-out hover:-translate-y-2">
            <NavLink to="/admin/order" className={({isActive}) => isActive ? "text-orange-600" : ""}>orders</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
