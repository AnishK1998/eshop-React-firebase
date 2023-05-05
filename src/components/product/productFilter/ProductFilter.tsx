import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../../redux/Slice/productSlice";
import { filterByBrand, filterByCategory, filterByPrice } from "../../../redux/Slice/filterSlice";
import { selectMinPrice, selectMaxPrice } from "../../../redux/Slice/productSlice";

const ProductFilter = () => {
  
  const [brand, setBrand] = useState("All");
  const [category, setCategory] = useState("All");
  const products = useSelector(selectProduct).products;
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const [price, setPrice] = useState(maxPrice ? maxPrice : 4000);
  const dispatch = useDispatch();

  const categories = [
    "All",
    ...new Set(products?.map((item: any) => item.category)),
  ];

  const allBrands = [
    "All",
    ...new Set(products?.map((item: any) => item.brand)),
  ];

  const handleFilterProduct = (category: string) => {
    setCategory(category);
    dispatch(filterByCategory({ products, category }));
  };

  useEffect(() =>{
    dispatch(filterByPrice({products, price}))
  },[dispatch, products, price, maxPrice]);

  useEffect(() =>{
    dispatch(filterByBrand({products, brand}))
  },[dispatch, products,brand]);

  const handleClearFilter = ()=>{
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  }

  return (
    <div className="w-full bg-slate-100 flex justify-center mt-8">
      <div className="w-1/2 py-3">
        <p className="text-xl font-semibold pb-5">Categories</p>
        <div>
          {categories?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={
                  item === category ? "translate-x-2" : "hover:translate-y-1"
                }
              >
                <button
                  className={
                    item === category
                      ? `text-orange-700 text-lg`
                      : `text-slate-700 text-lg`
                  }
                  onClick={() => handleFilterProduct(item)}
                >
                  &#8250; {item}
                </button>
                <hr
                  className={
                    item === category
                      ? "border-orange-700 pb-4"
                      : "border-black pb-4"
                  }
                />
              </div>
            );
          })}
        </div>

        <p className="text-xl font-semibold pb-2">Brands</p>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Choose Brand</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={brand}
              label="Choose Brand"
              onChange={(e) => setBrand(e.target.value)}
            >
              {
                allBrands.map((item: any, index) => {
                  return (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </div>

        <p className="text-xl font-semibold pb-1 pt-4">Price</p>
        <Slider
          aria-label="Volume"
          value={price}
          onChange={(event: any) => setPrice(event.target.value)}
          min={minPrice}
          max={maxPrice}
          size="small"
        />

        <Button variant="contained" color="warning" size="small" onClick={handleClearFilter}>
          Clear Filter
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;
