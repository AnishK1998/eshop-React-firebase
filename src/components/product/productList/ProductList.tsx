import { useState, useEffect } from "react";
import { propductListProp } from "../../models/models";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { filterBySearch, selectFilteredProduct, sortProduct } from "../../../redux/Slice/filterSlice";
import Pagination from "../../pagination/Pagination";

const ProductList = (props: propductListProp) => {
  const [grid, setGrid] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const filteredProducts = useSelector(selectFilteredProduct);
  const [sort, setSort] = useState("latest")
  const dispatch = useDispatch();

   //pagination starts here
   const [currentPage, setCurrentPage] = useState(1);
   const [productsPerPage, setProductsPerPage] = useState(5);
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct);
   //pagination ends here

  useEffect(() => {
    dispatch(filterBySearch({ search: searchVal, products: props.products }));
  }, [searchVal, dispatch, props.products]);

  useEffect(() => {
    dispatch(sortProduct({ sort, products: props.products }));
  }, [sort, dispatch, props.products]);

  return (
    <div className="w-11/12 bg-slate-100" id="product">
      <div className=" px-3 py-7">
        <div className="flex justify-between items-center mb-2">
          <div className="mr-3">
            <span className="text-lg ">
              <strong>{filteredProducts?.length}</strong> Product found
            </span>
          </div>
          <div>
            <Search value={searchVal} onChange={setSearchVal} />
          </div>
          <div className="flex items-center mr-3">
            <strong className="mx-2">Sort by:</strong>
            <div>
              <FormControl>
                <NativeSelect
                  defaultValue={"latest"}
                  inputProps={{
                    name: "selectionCategory",
                    id: "uncontrolled-native",
                  }}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value={"latest"}> Latest</option>
                  <option value={"highest-price"}> Highest Price</option>
                  <option value={"lowest-price"}> Lowest Price</option>
                  <option value={"a-z"}> A-Z</option>
                  <option value={"z-a"}> Z-A</option>
                </NativeSelect>
              </FormControl>
            </div>
          </div>
        </div>
        <hr className="border-x-2 border-slate-400" />
        <div className="my-4 px-4 flex justify-center">
          {props.products?.length === 0 ? (
            <p>No Product Found</p>
          ) : (
            <div className="md:grid-cols-3 grid-cols-1 grid gap-5">
              {currentProducts?.map((item: any) => {
                return (
                  <div key={item.id}>
                    <ProductItem
                      grid={grid}
                      item={item}
                      products={props.products}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <Pagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts?.length}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
