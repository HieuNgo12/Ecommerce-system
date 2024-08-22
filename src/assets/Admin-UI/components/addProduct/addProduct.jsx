import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AddProduct = () => {
  const { callApi } = useAdminContext();
  const [newCategory, setNewCategory] = useState("");
  const [newID, setNewID] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const [sku, setSku] = useState("");
  const [slug, setSlug] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [classify, setClassify] = useState("");
  const [size, setSize] = useState("");
  const [arrMoreColor, setArrMoreColor] = useState([]);
  const [quantitySizeXS, setQuantitySizeXS] = useState(0);
  const [quantitySizeS, setQuantitySizeS] = useState(0);
  const [quantitySizeM, setQuantitySizeM] = useState(0);
  const [quantitySizeL, setQuantitySizeL] = useState(0);
  const [quantitySizeXL, setQuantitySizeXL] = useState(0);
  const [quantitySizeXLL, setQuantitySizeXLL] = useState(0);
  const [quantitySizeXLLL, setQuantitySizeXLLL] = useState(0);
  const navigate = useNavigate();

  const choiceCategory = (e) => {
    setNewCategory(e.target.value);
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
      const res = await fetch(
        "https://66b0ab0f6a693a95b539b080.mockapi.io/products/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: newID,
            title: newTitle,
            price: newPrice,
            description: newDescription,
            category: newCategory,
            image: newImage,
            status: newStatus,
          }),
        }
      );
      const json = await res.json();
      console.log(json);
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
        onClose: () => navigate("/products"),
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
          <label className="block mb-2">Stock status</label>
          <select
            className="w-full p-2 border rounded"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="sold out">Sold Out</option>
            <option value="block">Block</option>
          </select>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Price</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Slug</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            disabled
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

        <div className="col-span-12">
          <label className="block mb-2">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">ID</label>
          <div>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={newID}
              onChange={(e) => setNewID(e.target.value)}
              disabled
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
            disabled
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Colors</label>
          <div className="flex">
            <div
              className="w-8 h-8 mr-2 bg-yellow-500 rounded-full cursor-pointer"
              onClick={() => setColor("yellow")}
            ></div>
            <div
              className="w-8 h-8 mr-2 bg-orange-500 rounded-full cursor-pointer"
              onClick={() => setColor("orange")}
            ></div>
            <div
              className="w-8 h-8 mr-2 bg-white rounded-full cursor-pointer border"
              onClick={() => setColor("white")}
            ></div>
            <div
              className="w-8 h-8 mr-2 bg-blue-500 rounded-full cursor-pointer"
              onClick={() => setColor("blue")}
            ></div>
            <div
              className="w-8 h-8 mr-2 bg-black rounded-full cursor-pointer"
              onClick={() => setColor("black")}
            ></div>
            <div
              className="w-8 h-8 mr-2 bg-red-500 rounded-full cursor-pointer"
              onClick={() => setColor("black")}
            ></div>
            <div
              className="w-8 h-8 mr-2 bg-gray-500 rounded-full cursor-pointer"
              onClick={() => setColor("black")}
            ></div>
            <div
              className="w-8 h-8 mr-2 bg-sky-500 rounded-full cursor-pointer"
              onClick={() => setColor("black")}
            ></div>
            <div
              className="w-8 h-8 mr-2 bg-rose-500 rounded-full cursor-pointer"
              onClick={() => setColor("black")}
            ></div>
            <div
              className="w-8 h-8 mr-2 bg-cyan-500 rounded-full cursor-pointer"
              onClick={() => setColor("black")}
            ></div>
            <div
              className="w-8 h-8 mr-2 bg-amber-900 rounded-full cursor-pointer"
              onClick={() => setColor("black")}
            ></div>
            <div
              className="w-8 h-8 mr-2 bg-indigo-950 rounded-full cursor-pointer"
              onClick={() => setColor("black")}
            ></div>
            <div
              className="w-8 h-8 mr-2 bg-violet-500 rounded-full cursor-pointer"
              onClick={() => setColor("black")}
            ></div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Size</label>
          <div className="flex justify-between">
            <button
              className="w-16 h-8 border rounded"
              onClick={() => setSize("XS")}
            >
              XS
            </button>
            <button
              className="w-16 h-8 border rounded"
              onClick={() => setSize("S")}
            >
              S
            </button>
            <button
              className="w-16 h-8 mr-2 border rounded"
              onClick={() => setSize("M")}
            >
              M
            </button>
            <button
              className="w-16 h-8 border rounded"
              onClick={() => setSize("L")}
            >
              L
            </button>
            <button
              className="w-16 h-8 border rounded"
              onClick={() => setSize("XL")}
            >
              XL
            </button>
            <button
              className="w-16 h-8 border rounded"
              onClick={() => setSize("XXL")}
            >
              XXL
            </button>
            <button
              className="w-16 h-8 border rounded"
              onClick={() => setSize("XXXL")}
            >
              XXXL
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
          <div className="flex justify-between">
            <input
              type="number"
              value={quantitySizeXS}
              min="0"
              onChange={(e) => {
                const value = e.target.value < 0 ? 0 : e.target.value;
                setQuantitySizeXS(value);
              }}
              className="w-16 h-8 border rounded mb-1"
            />
            <input
              type="number"
              value={quantitySizeS}
              min="0"
              onChange={(e) => {
                const value = e.target.value < 0 ? 0 : e.target.value;
                setQuantitySizeS(value);
              }}
              className="w-16 h-8 border rounded mb-1"
            />
            <input
              type="number"
              value={quantitySizeM}
              min="0"
              onChange={(e) => {
                const value = e.target.value < 0 ? 0 : e.target.value;
                setQuantitySizeM(value);
              }}
              className="w-16 h-8 border rounded mb-1"
            />
            <input
              type="number"
              value={quantitySizeL}
              min="0"
              onChange={(e) => {
                const value = e.target.value < 0 ? 0 : e.target.value;
                setQuantitySizeL(value);
              }}
              className="w-16 h-8 border rounded mb-1"
            />
            <input
              type="number"
              value={quantitySizeXL}
              min="0"
              onChange={(e) => {
                const value = e.target.value < 0 ? 0 : e.target.value;
                setQuantitySizeXL(value);
              }}
              className="w-16 h-8 border rounded mb-1"
            />
            <input
              type="number"
              value={quantitySizeXLL}
              min="0"
              onChange={(e) => {
                const value = e.target.value < 0 ? 0 : e.target.value;
                setQuantitySizeXLL(value);
              }}
              className="w-16 h-8 border rounded mb-1"
            />
            <input
              type="number"
              value={quantitySizeXLLL}
              min="0"
              onChange={(e) => {
                const value = e.target.value < 0 ? 0 : e.target.value;
                setQuantitySizeXLLL(value);
              }}
              className="w-16 h-8 border rounded mb-1"
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
              <label className="block mb-2">ID</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={newID}
                onChange={(e) => setNewID(e.target.value)}
                disabled
              />
            </div>
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
                <div
                  className="w-8 h-8 mr-2 bg-yellow-500 rounded-full cursor-pointer"
                  onClick={() => setColor("yellow")}
                ></div>
                <div
                  className="w-8 h-8 mr-2 bg-orange-500 rounded-full cursor-pointer"
                  onClick={() => setColor("orange")}
                ></div>
                <div
                  className="w-8 h-8 mr-2 bg-white rounded-full cursor-pointer border"
                  onClick={() => setColor("white")}
                ></div>
                <div
                  className="w-8 h-8 mr-2 bg-blue-500 rounded-full cursor-pointer"
                  onClick={() => setColor("blue")}
                ></div>
                <div
                  className="w-8 h-8 mr-2 bg-black rounded-full cursor-pointer"
                  onClick={() => setColor("black")}
                ></div>
                <div
                  className="w-8 h-8 mr-2 bg-red-500 rounded-full cursor-pointer"
                  onClick={() => setColor("black")}
                ></div>
                <div
                  className="w-8 h-8 mr-2 bg-gray-500 rounded-full cursor-pointer"
                  onClick={() => setColor("black")}
                ></div>
                <div
                  className="w-8 h-8 mr-2 bg-sky-500 rounded-full cursor-pointer"
                  onClick={() => setColor("black")}
                ></div>
                <div
                  className="w-8 h-8 mr-2 bg-rose-500 rounded-full cursor-pointer"
                  onClick={() => setColor("black")}
                ></div>
                <div
                  className="w-8 h-8 mr-2 bg-cyan-500 rounded-full cursor-pointer"
                  onClick={() => setColor("black")}
                ></div>
                <div
                  className="w-8 h-8 mr-2 bg-amber-900 rounded-full cursor-pointer"
                  onClick={() => setColor("black")}
                ></div>
                <div
                  className="w-8 h-8 mr-2 bg-indigo-950 rounded-full cursor-pointer"
                  onClick={() => setColor("black")}
                ></div>
                <div
                  className="w-8 h-8 mr-2 bg-violet-500 rounded-full cursor-pointer"
                  onClick={() => setColor("black")}
                ></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <label className="block mb-2">Sizes</label>
              <div className="flex justify-between">
                <button
                  className="w-16 h-8 border rounded"
                  onClick={() => setSize("XS")}
                >
                  XS
                </button>
                <button
                  className="w-16 h-8 border rounded"
                  onClick={() => setSize("S")}
                >
                  S
                </button>
                <button
                  className="w-16 h-8 mr-2 border rounded"
                  onClick={() => setSize("M")}
                >
                  M
                </button>
                <button
                  className="w-16 h-8 border rounded"
                  onClick={() => setSize("L")}
                >
                  L
                </button>
                <button
                  className="w-16 h-8 border rounded"
                  onClick={() => setSize("XL")}
                >
                  XL
                </button>
                <button
                  className="w-16 h-8 border rounded"
                  onClick={() => setSize("XXL")}
                >
                  XXL
                </button>
                <button
                  className="w-16 h-8 border rounded"
                  onClick={() => setSize("XXXL")}
                >
                  XXXL
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
              <div className="flex justify-between">
                <input
                  type="number"
                  value={quantitySizeXS}
                  min="0"
                  onChange={(e) => {
                    const value = e.target.value < 0 ? 0 : e.target.value;
                    setQuantitySizeXS(value);
                  }}
                  className="w-16 h-8 border rounded mb-1"
                />
                <input
                  type="number"
                  value={quantitySizeS}
                  min="0"
                  onChange={(e) => {
                    const value = e.target.value < 0 ? 0 : e.target.value;
                    setQuantitySizeS(value);
                  }}
                  className="w-16 h-8 border rounded mb-1"
                />
                <input
                  type="number"
                  value={quantitySizeM}
                  min="0"
                  onChange={(e) => {
                    const value = e.target.value < 0 ? 0 : e.target.value;
                    setQuantitySizeM(value);
                  }}
                  className="w-16 h-8 border rounded mb-1"
                />
                <input
                  type="number"
                  value={quantitySizeL}
                  min="0"
                  onChange={(e) => {
                    const value = e.target.value < 0 ? 0 : e.target.value;
                    setQuantitySizeL(value);
                  }}
                  className="w-16 h-8 border rounded mb-1"
                />
                <input
                  type="number"
                  value={quantitySizeXL}
                  min="0"
                  onChange={(e) => {
                    const value = e.target.value < 0 ? 0 : e.target.value;
                    setQuantitySizeXL(value);
                  }}
                  className="w-16 h-8 border rounded mb-1"
                />
                <input
                  type="number"
                  value={quantitySizeXLL}
                  min="0"
                  onChange={(e) => {
                    const value = e.target.value < 0 ? 0 : e.target.value;
                    setQuantitySizeXLL(value);
                  }}
                  className="w-16 h-8 border rounded mb-1"
                />
                <input
                  type="number"
                  value={quantitySizeXLLL}
                  min="0"
                  onChange={(e) => {
                    const value = e.target.value < 0 ? 0 : e.target.value;
                    setQuantitySizeXLLL(value);
                  }}
                  className="w-16 h-8 border rounded mb-1"
                />
              </div>
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
