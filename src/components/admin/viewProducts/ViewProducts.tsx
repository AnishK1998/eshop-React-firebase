import {
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db, storage } from "../../../firebase/config";
import { toast } from "react-toastify";
import { productModel } from "../../models/models";
import { Link } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import Loader from "../../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, setProduct } from "../../../redux/Slice/productSlice";
import useFectCollection from "../../../custom hooks/useFectCollection";
import {
  filterBySearch,
  selectFilteredProduct,
} from "../../../redux/Slice/filterSlice";
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";

const ViewProducts = () => {
  const [searchVal, setSearchVal] = useState("");
  const { data, isLoading } = useFectCollection("products");
  const stateProduct = useSelector(selectProduct);
  const products: productModel[] = stateProduct.products;
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProduct);

  //pagination starts here
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(3);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  //pagination ends here

  useEffect(() => {
    dispatch(setProduct(data));
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(filterBySearch({ search: searchVal, products: products }));
  }, [searchVal, dispatch, products]);

  const confirmDelete = (id: string | undefined, imageUrl: string) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "Are you sure you want to delete this Product",
      "Delete",
      "Cancel",
      function deleteCb() {
        deleteProduct(id, imageUrl);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        borderRadius: "9px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id: string | undefined, imageUrl: string) => {
    if (id) {
      try {
        await deleteDoc(doc(db, "products", id));
        const storageReference = ref(storage, imageUrl);
        deleteObject(storageReference);
        toast.success("Product is deleted successfully");
      } catch (error) {
        toast.error("failed to delete that product");
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <h2 className="text-3xl font-bold mx-5 mt-3">All Products</h2>
        <div className="mx-5 my-2">
          <p className="text-slate-500 my-2">
            <strong>{filteredProducts?.length}</strong> Products found
          </p>
          <Search value={searchVal} onChange={setSearchVal} />
        </div>
        {filteredProducts?.length === 0 ? (
          <>
            {" "}
            <h2 className="text-3xl font-bold flex justify-center items-center">
              No Product Found
            </h2>
          </>
        ) : (
          <div
            className=" w-full px-5"
            style={{ height: "31.5rem", overflow: "auto" }}
          >
            <table className="w-full bg-slate-200 drop-shadow-lg">
              <thead className="border-y-blue-700 border-2 my-3">
                <tr>
                  <th className="text-left">s/n</th>
                  <th className="text-left">Image</th>
                  <th className="text-left">Name</th>
                  <th className="text-left">Category</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              {currentProducts?.map((item: any, index: number) => {
                const { id, name, category, price, imageUrl } = item;
                return (
                  <tbody key={id}>
                    <tr>
                      <td className="px-2 py-2">{index + 1}</td>
                      <td className="px-2 py-2">
                        <img
                          src={imageUrl}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td className="px-2 py-2">{name}</td>
                      <td className="px-2 py-2">{category}</td>
                      <td className="px-2 py-2">{price}</td>
                      <td className="px-2 py-2">
                        <Link
                          to={`/admin/add-product/${id}`}
                          className="mx-2 text-green-800"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <i
                          className="fa-solid fa-trash cursor-pointer text-red-700"
                          onClick={() => confirmDelete(id, imageUrl)}
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
            <div className="my-4">
              <Pagination 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                productsPerPage={productsPerPage}
                totalProducts={filteredProducts?.length}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewProducts;
