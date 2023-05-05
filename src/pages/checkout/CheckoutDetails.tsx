import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  save_billing_address,
  save_shipping_address,
} from "../../redux/Slice/checkoutSlice";
import CheckoutSummary from "./CheckoutSummary";

export const initalAdress = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({ ...initalAdress });
  const [billingAddress, setBillingAddress] = useState({ ...initalAdress });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShipping = (event: any) => {
    const { name, value } = event.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };
  const handleBilling = (event: any) => {
    const { name, value } = event.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(save_shipping_address(shippingAddress));
    dispatch(save_billing_address(billingAddress));
    navigate("/checkout");
  };
  return (
    <div className="w-full bg-slate-100">
      <div className="mx-10 pb-5">
        <p className="text-2xl font-bold py-4">Checkout Details</p>
        <div className="md:flex flex-row">
          <div className="drop-shadow-lg rounded-md bg-white w-full md:w-1/2 mr-5">
            <div className="px-7">
              <p className="text-xl text-slate-600 my-2">Shipping Adress</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 mt-5">
                  <label className="font-semibold">Recipient Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    onChange={(e) => handleShipping(e)}
                    value={shippingAddress.name}
                    placeholder="Recipient Name"
                    className="w-full border border-gray-400 py-1 px-3 rounded-md "
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Address Line1:</label>
                  <input
                    type="text"
                    id="line1"
                    name="line1"
                    required
                    onChange={(e) => handleShipping(e)}
                    value={shippingAddress.line1}
                    placeholder="Address Line1"
                    className="w-full border border-gray-400 py-1 px-3 rounded-md "
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Address Line2:</label>
                  <input
                    type="text"
                    id="line2"
                    name="line2"
                    required
                    onChange={(e) => handleShipping(e)}
                    value={shippingAddress.line2}
                    placeholder="Address Line2"
                    className="w-full border border-gray-400 py-1 px-3 rounded-md "
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">City:</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    onChange={(e) => handleShipping(e)}
                    value={shippingAddress.city}
                    placeholder="City"
                    className="w-full border border-gray-400 py-1 px-3 rounded-md "
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">State:</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    required
                    onChange={(e) => handleShipping(e)}
                    value={shippingAddress.state}
                    placeholder="State"
                    className="w-full border border-gray-400 py-1 px-3 rounded-md "
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Postal Code:</label>
                  <input
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    required
                    onChange={(e) => handleShipping(e)}
                    value={shippingAddress.postal_code}
                    placeholder="Postal Code"
                    className="w-full border border-gray-400 py-1 px-3 rounded-md "
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Country:</label>
                  <CountryDropdown
                    valueType="short"
                    value={shippingAddress.country}
                    onChange={(val) =>
                      handleShipping({
                        target: {
                          name: "country",
                          value: val,
                        },
                      })
                    }
                    classes="w-full border border-gray-400 py-1 px-3 rounded-md text-slate-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Phone:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    required
                    onChange={(e) => handleShipping(e)}
                    value={shippingAddress.phone}
                    placeholder="Phone"
                    className="w-full border border-gray-400 py-1 px-3 rounded-md "
                  />
                </div>
                {/* billing addres */}
                <p className="text-xl text-slate-600 my-2">Shipping Adress</p>

                <div className="mb-4 mt-5">
                  <label className="font-semibold">Recipient Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    onChange={(e) => handleBilling(e)}
                    value={billingAddress.name}
                    placeholder="Recipient Name"
                    className="w-full border border-gray-400 py-1 px-3 rounded-md "
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Address Line1:</label>
                  <input
                    type="text"
                    id="line1"
                    name="line1"
                    required
                    onChange={(e) => handleBilling(e)}
                    value={billingAddress.line1}
                    placeholder="Address Line1"
                    className="w-full border border-gray-400 py-1 px-3 rounded-md "
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Address Line2:</label>
                  <input
                    type="text"
                    id="line2"
                    name="line2"
                    required
                    onChange={(e) => handleBilling(e)}
                    value={billingAddress.line2}
                    placeholder="Address Line2"
                    className="w-full border border-gray-400 py-1 px-3 rounded-md "
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">City:</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    onChange={(e) => handleBilling(e)}
                    value={billingAddress.city}
                    placeholder="City"
                    className="w-full border border-gray-400 py-1 px-3 rounded-md "
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">State:</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    required
                    onChange={(e) => handleBilling(e)}
                    value={billingAddress.state}
                    placeholder="State"
                    className="w-full border border-gray-400 py-1 px-3 rounded-md "
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Postal Code:</label>
                  <input
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    required
                    onChange={(e) => handleBilling(e)}
                    value={billingAddress.postal_code}
                    placeholder="Postal Code"
                    className="w-full border border-gray-400 py-1 px-3 rounded-md "
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Country:</label>
                  <CountryDropdown
                    valueType="short"
                    value={billingAddress.country}
                    onChange={(val) =>
                      handleBilling({
                        target: {
                          name: "country",
                          value: val,
                        },
                      })
                    }
                    classes="w-full border border-gray-400 py-1 px-3 rounded-md text-slate-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Phone:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    required
                    onChange={(e) => handleBilling(e)}
                    value={billingAddress.phone}
                    placeholder="Phone"
                    className="w-full border border-gray-400 py-1 px-3 rounded-md "
                  />
                </div>
                <div className="pb-3">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Proceed To Checkout
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-4">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
