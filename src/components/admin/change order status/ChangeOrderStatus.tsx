import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { Button } from "@mui/material";
import { changeOrderProps } from "../../models/models";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";

const ChangeOrderStatus = (props: changeOrderProps) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const order = {
    userId: props.orders?.userId,
    userEmail: props.orders?.userEmail,
    orderDate: props.orders?.orderDate ,
    orderTime:  props.orders?.orderTime,
    orderAmount: props.orders?.orderAmount,
    orderStatus: status,
    orderItems: props.orders?.orderItems ,
    shippingAddress: props.orders?.shippingAddress ,
    createdAt: props.orders?.createdAt,
    editedAt: Date.now()
  }
  const editOrderStatus = async (event: any, id: string | undefined)=> {
      event.preventDefault();
      setIsLoading(true)
      if(id !== undefined){
          try {
        await setDoc(doc(db, "orders",id), order);
        toast.success("Order status changed");
        setIsLoading(false);
        navigate("/admin/order");
      } catch (error) {
        setIsLoading(false);
        toast.error("Failed to update order status");
      }
      }
  }

  const handleSelect = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  return (
    <div className="px-4 py-2 my-4 bg-slate-100 border-2 border-blue-500">
      {isLoading && <Loader />}
      <div>
        <p className="text-lg font-semibold mb-3">Update Order Status</p>
        <form onSubmit={(e) => editOrderStatus(e, props.id)}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Order Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Select Order Status"
              onChange={handleSelect}
            >
               <MenuItem value={""} disabled>Choose One</MenuItem>
              <MenuItem value={"Order Placed"}>Order Placed</MenuItem>
              <MenuItem value={"Processing"}>Processing</MenuItem>
              <MenuItem value={"Shipped"}>Shipped</MenuItem>
              <MenuItem value={"Delivered"}>Delivered</MenuItem>
            </Select>
          </FormControl>
          <div className="mt-2">
            <Button variant="contained" color="primary" size="small" type="submit">Update Status</Button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default ChangeOrderStatus;
