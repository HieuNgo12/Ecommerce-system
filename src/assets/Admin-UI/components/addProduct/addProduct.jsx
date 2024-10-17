import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AddProduct = () => {
  const { callApi } = useAdminContext();
  const [newCategory, setNewCategory] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newStatus, setNewStatus] = useState("available");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const [sku, setSku] = useState("");
  const [slug, setSlug] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [color, setColor] = useState("");
  const [brand, setNewBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [tags, setTags] = useState("");
  const [classify, setClassify] = useState("");
  const [size, setSize] = useState("");
  const [arrMoreColor, setArrMoreColor] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const navigate = useNavigate();

  const colors = [
    "yellow-500",
    "orange-500",
    "white",
    "blue-500",
    "black",
    "red-500",
    "gray-500",
    "sky-500",
    "rose-500",
    "cyan-500",
    "violet-500",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const choiceCategory = (e) => {
    setNewCategory(e.target.value);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const addMoreColor = () => {
    const newColor = { color: "tam" };
    const newArrColor = [...arrMoreColor, newColor];
    setArrMoreColor(newArrColor);
  };

  const deleteColor = (index) => {
    const delArrColor = [...arrMoreColor];
    delArrColor.splice(index, 1);
    setArrMoreColor(delArrColor);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  const createNewProduct = async () => {
    try {
      if (!newCategory) {
        toast.warn("Email is required", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      if (!newTitle) {
        toast.warn("Title is required", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      if (!selectedColor) {
        toast.warn("Color is required", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      if (!newDescription) {
        toast.warn("Email is required", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      if (!newPrice) {
        toast.warn("Email is required", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      if (!sku) {
        toast.warn("Email is required", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      if (!slug) {
        toast.warn("Email is required", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      if (!size) {
        toast.warn("Email is required", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      if (!newImage) {
        toast.warn("Image is required", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      //B1 tạo sp mới
      const res1 = await fetch(
        "http://localhost:8080/api/v1/products/add-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newTitle,
            status: newStatus,
            price: newPrice,
            slug: slug,
            category: newCategory,
            description: newDescription,
            brand: brand,
            tags: tags,
            sku: sku,
            color: selectedColor,
            // image: imageUrl,
            quantity: quantity,
          }),
        }
      );
      const json1 = await res1.json();
      const productId = json1.data._id;
 


      //B2 tạo hình mới
      const formData = new FormData();
      formData.append("file", newImage); // Thêm tệp vào FormData
      formData.append("productId", productId);

      const res2 = await fetch(
        "http://localhost:8080/api/v1/products/single-upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const json2 = await res2.json();

      
      if (!json2.public_id) {
        throw new Error("Image upload failed");
      }
      
      // const imagePublicId = json2.public_id;
      const imageUrl = json2.secure_url;
      console.log(imageUrl)


      //B3 cập nhật lại hình vào sản phẩm
      const res3 = await fetch(`http://localhost:8080/api/v1/products/update-product/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image : imageUrl
        })
      })

      const jon3 = res3.json();
      console.log(jon3)

      callApi();
      toast.success("Added product successful!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // onClose: () => navigate("/products"),
      });
    } catch (error) {
      console.error("loading", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <label>Category : </label>
      <select value={newCategory} onChange={choiceCategory}>
        <option></option>
        <option value="men's clothing">Men's clothing</option>
        <option value="women's clothing">Women's clothing</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="toy">Toy</option>
      </select>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Title</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Status</label>
          <select
            className="w-full p-2 border rounded"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="available">Available</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="discontinued">Discontinued</option>
            <option value="pre_order">Pre Order</option>
          </select>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Price</label>
          <input
            className="w-full p-2 border rounded"
            type="number"
            value={newPrice < 0 ? 0 : newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            min={0}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Slug</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Category</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={newCategory}
            disabled
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Classify</label>
          <select
            className="w-full p-2 border rounded"
            value={classify}
            onChange={(e) => setClassify(e.target.value)}
          >
            <option value="T-Shirt">T-Shirt</option>
            <option value="trousers">Trousers</option>
            <option value="jeans">Jeans</option>
            <option value="Dress">Dress</option>
          </select>
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Brand</label>
          <div>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={brand}
              onChange={(e) => setNewBrand(e.target.value)}
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Tags</label>
          <div>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">SKU</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={`/${sku}`}
            onChange={(e) => setSku(e.target.value.slice(1))}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Colors</label>
          <div className="flex">
            {colors.map((color) => (
              <div
                key={color}
                className={`w-8 h-8 mr-2 bg-${color} rounded-full cursor-pointer ${
                  selectedColor === color
                    ? "transform scale-110 border-4 border-black"
                    : ""
                }`}
                onClick={() => handleColorClick(color)}
              ></div>
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Size</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Images</label>
          <div className="flex gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-28 p-2 border rounded bg-gray-200"
            />
            <input
              type="text"
              value={newImage.name}
              disabled
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="col-span-12 md:col-span-6">
            <label className="block mb-2">Quantity</label>
            <input
              className="w-full p-2 border rounded"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min={0}
            />
          </div>
          <div className="col-span-12 ">
            <button
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-400"
              onClick={addMoreColor}
            >
              Add more color
            </button>
          </div>
        </div>
        {arrMoreColor.map((item, index) => (
          <React.Fragment key={index}>
            <div className="col-span-12 md:col-span-6">
              <label className="block mb-2">SKU</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={`/${sku}`}
                onChange={(e) => setSku(e.target.value.slice(1))}
                disabled
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <label className="block mb-2">Colors</label>
              <div className="flex">
                {colors.map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8 mr-2 bg-${color}-500 rounded-full cursor-pointer`}
                    onClick={() => setColor(color)}
                  ></div>
                ))}
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <label className="block mb-2">Size</label>
              <div className="flex justify-between">
                <button
                  key={size}
                  className="w-16 h-8 border rounded"
                  onClick={() => setSize(size)}
                >
                  {size}
                </button>
              </div>
            </div>

            <div className="col-span-12 md:col-span-6">
              <label className="block mb-2">Images</label>
              <div className="flex gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-28 p-2 border rounded bg-gray-200"
                />
                <input
                  type="text"
                  value={newImage.name}
                  disabled
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="flex justify-between"></div>
              <button
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-400"
                onClick={() => deleteColor(index)}
              >
                Delete color
              </button>
            </div>
          </React.Fragment>
        ))}
        <div className="col-span-12">
          <button
            className="w-full p-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            onClick={createNewProduct}
          >
            Save Product
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
