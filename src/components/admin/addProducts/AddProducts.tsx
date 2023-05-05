import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { productModel } from "../../models/models";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { db, storage } from "../../../firebase/config";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import Loader from "../../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProduct } from "../../../redux/Slice/productSlice";

const initialProductState = {
  name: "",
  imageUrl: "",
  price: "",
  category: "",
  brand: "",
  description: "",
};

const AddProducts = () => {
  const { id } = useParams();
  const detectParams = (id: string | undefined, p1: any, p2: any) => {
    if (id === "add") {
      return p1;
    }
    return p2;
  };
  const reduxProducts = useSelector(selectProduct);
  const editProduct: productModel = reduxProducts.products.find(
    (item: any) => item.id === id
  );
  const [product, setProduct] = useState<productModel>(() => {
    const newState = detectParams(id, { ...initialProductState }, editProduct);
    return newState;
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEdit = async (event: any) => {
    event.preventDefault();
    if (id) {
      setIsLoading(true);
      if(product.imageUrl !== editProduct.imageUrl){
          const storageReference = ref(storage, editProduct.imageUrl);
          deleteObject(storageReference);
      }
      try {
        await setDoc(doc(db, "products", id), {
         ...product, editedAt: Date.now()
        });
        setIsLoading(false);
        toast.success("Product Editted Sucessfully");
        navigate("/admin/all-products")
      } catch (error) {
        setIsLoading(false);
        toast.error("Failed to edit form");
      }
    }
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
       await addDoc(collection(db, "products"), {
        ...product,
        createdAt: Date.now(),
      });
      toast.success("Product is uploaded sucessfully");
      setIsLoading(false);
      setProduct(initialProductState);
      navigate("/admin/all-products");
    } catch (error) {
      toast.error("failed to upload product");
      setIsLoading(false);
      setProduct(initialProductState);
    }
  };

  const handleInput = (event: any) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `e-shop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageUrl: downloadURL });
          toast.success("Image uploaded successfully");
        });
      }
    );
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full" style={{ height: "auto" }}>
          <p className="text-3xl mx-7 my-5 font-bold">
            {detectParams(id, "Add New Product", "Edit Product")}
          </p>
          <div className="w-4/6">
            <form
              onSubmit={detectParams(id, handleSubmit, handleEdit)}
              className="w-full drop-shadow-xl mx-7 my-3 py-5 bg-slate-100 rounded-lg"
            >
              <div className="mb-3">
                <label className="mx-3">Product Name :</label>
                <div className="mx-3 my-1">
                  <input
                    type="text"
                    placeholder="Product Name"
                    required
                    name="name"
                    value={product.name}
                    onChange={(e) => handleInput(e)}
                    className="w-full border border-gray-400 p-1 rounded-md placeholder:text-sm px-3"
                  />
                </div>
              </div>

              <div className="my-3">
                <label className="mx-3">Product Image :</label>
                <div className="mx-3 my-1">
                  <input
                    type="file"
                    accept="image/*"
                    placeholder="Product Image"
                    name="image"
                    onChange={(e) => handleImageChange(e)}
                  />
                  {product.imageUrl === "" ? null : (
                    <input
                      type="text"
                      required
                      disabled
                      name="imageUrl"
                      placeholder="Image Url"
                      value={product.imageUrl}
                      className="w-full border border-gray-400 p-1 rounded-md placeholder:text-sm px-3 mt-1"
                    />
                  )}
                </div>
              </div>

              <div className="my-3">
                <label className="mx-3">Product Price :</label>
                <div className="mx-3 my-1">
                  <input
                    type="number"
                    placeholder="Product Price"
                    value={product.price}
                    required
                    name="price"
                    onChange={(e) => handleInput(e)}
                    className="w-full border border-gray-400 p-1 rounded-md placeholder:text-sm px-3"
                  />
                </div>
              </div>

              <div className="my-5">
                <div className="mx-3 ">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">
                      -- Choose Product Category --
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-autowidth"
                      value={product.category}
                      name="category"
                      onChange={(e) => handleInput(e)}
                      label="---Choose Product Category---"
                    >
                      <MenuItem value="Laptop">Laptop</MenuItem>
                      <MenuItem value="Electronics">Electronics</MenuItem>
                      <MenuItem value="Fashion">Fashion</MenuItem>
                      <MenuItem value="Phone">Phone</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="my-2">
                <label className="mx-3">Product Company/Brand :</label>
                <div className="mx-3 my-1">
                  <input
                    type="text"
                    placeholder="Product Brand"
                    required
                    name="brand"
                    value={product.brand}
                    onChange={(e) => handleInput(e)}
                    className="w-full border border-gray-400 p-1 rounded-md placeholder:text-sm px-3"
                  />
                </div>
              </div>

              <div className="my-3">
                <label className="mx-3">Product Company/Brand :</label>
                <div className="mx-3 my-1">
                  <textarea
                    required
                    value={product.description}
                    name="description"
                    rows={4}
                    onChange={(e) => handleInput(e)}
                    className="w-full border border-gray-400 rounded-md placeholder:text-sm px-3"
                  />
                </div>
              </div>
              <div className="mt-3 mx-3">
                <Button type="submit" variant="contained" color="primary">
                  {detectParams(id, "Save Product", "Edit Product")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProducts;
