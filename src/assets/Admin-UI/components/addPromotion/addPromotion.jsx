import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AddPromotion = () => {
  const { callApi, dataProduct, newPromotion } = useAdminContext();
  const navigate = useNavigate();
  // const [newCategory, setNewCategory] = useState("");
  const [newID, setNewID] = useState("");
  // const [newTitle, setNewTitle] = useState("");
  // const [newStatus, setNewStatus] = useState("");
  // const [newPrice, setNewPrice] = useState("");
  // const [newImage, setNewImage] = useState("");
  const [sku, setSku] = useState("");
  // const [slug, setSlug] = useState("");
  // const [newDescription, setNewDescription] = useState("");
  // const [color, setColor] = useState("");
  // const [quantity, setQuantity] = useState("");
  // const [classify, setClassify] = useState("");
  // const [size, setSize] = useState("");
  const [quantitySizeXS, setQuantitySizeXS] = useState(0);
  const [quantitySizeS, setQuantitySizeS] = useState(0);
  const [quantitySizeM, setQuantitySizeM] = useState(0);
  const [quantitySizeL, setQuantitySizeL] = useState(0);
  const [quantitySizeXL, setQuantitySizeXL] = useState(0);
  const [quantitySizeXLL, setQuantitySizeXLL] = useState(0);
  const [quantitySizeXLLL, setQuantitySizeXLLL] = useState(0);
  const [arrMoreColor, setArrMoreColor] = useState([]);
  const [selectedSKU, setSelectedSKU] = useState();
  const [getData, setGetData] = useState("");
  const [promotionalPrice, setPromotionalPrice] = useState(getData.price);

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const startDateTime = new Date(`${startDate}T${startTime}`);
  const endDateTime = new Date(`${endDate}T${endTime}`);

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

  useEffect(() => {
    const getInfor = dataProduct.find((item) => {
      if (item.id === selectedSKU) {
        return item;
      }
    });
    setGetData(
      getInfor || {
        id: "",
        title: "",
        price: "",
        status: "",
        category: "",
        description: "",
      }
    );
  }, [selectedSKU]);

  const createNewPromotion = () => {
    const originalPrice = getData.price;
    const newData = { ...getData, promotionalPrice: promotionalPrice };
    console.log("Dữ liệu sản phẩm với giá khuyến mãi:", newData);
    newPromotion(newData);
  

    const now = new Date();
    console.log("Thời gian hiện tại:", now);
  

    if (now >= startDateTime && now <= endDateTime) {
      console.log("Khuyến mãi đang diễn ra");
  
      // Gửi PUT request để cập nhật giá trị price thành promotionalPrice
      const updatePrice = async (price) => {
        try {
          const res = await fetch(
            `https://66b0ab0f6a693a95b539b080.mockapi.io/products/${getData.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                price: price,
              }),
            }
          );
          const json = await res.json();
          console.log("Kết quả từ API:", json);
          toast.success("Added product successful!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } catch (error) {
          console.error("Lỗi:", error);
        }
      };
  
      console.log("Cập nhật giá trị price thành giá khuyến mãi:", promotionalPrice);
      updatePrice(promotionalPrice);
  
      const timeRemaining = endDateTime - now;
      console.log("Thời gian còn lại cho khuyến mãi (ms):", timeRemaining);
  
      const timer = setTimeout(() => {
        console.log("Thời gian khuyến mãi đã kết thúc.");

        console.log("Khôi phục giá trị price về giá ban đầu:", originalPrice);
        updatePrice(originalPrice);
        alert("Thời gian khuyến mãi đã kết thúc, giá sản phẩm trở về giá ban đầu!");
      }, timeRemaining);

      const countdownInterval = setInterval(() => {
        const timeLeft = endDateTime - new Date();
        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
        } else {
          console.log("Thời gian còn lại:", Math.floor(timeLeft / 1000), "giây");
        }
      }, 1000);
  
      return () => {
        clearTimeout(timer);
        clearInterval(countdownInterval);
        console.log("Timer và countdown đã bị hủy.");
      };
    } else {
      console.log("Khuyến mãi chưa bắt đầu hoặc đã kết thúc.");
    }
  };
  
  
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Promotion</h1>
      <label>SKU : </label>
      <select
        value={selectedSKU}
        onChange={(e) => setSelectedSKU(e.target.value)}
        className="w-80"
      >
        <option value={{ id: "", title: "" }}>Select SKU </option>
        {dataProduct.map((item, index) => (
          <option key={index}>{item.id}</option>
        ))}
      </select>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Title</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={getData.title}
            // onChange={() => setNewTitle(getData.title)}
            disabled
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Stock status</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={getData.status}
            // onChange={() => setNewTitle(getData.title)}
            disabled
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Price</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={getData.price}
            // onChange={(e) => setNewPrice(e.target.value)}
            disabled
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Slug</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            // value={slug}
            // onChange={(e) => setSlug(e.target.value)}
            disabled
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Category</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={getData.category}
            disabled
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Classify</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={getData.category}
            disabled
          />
        </div>
        <div className="col-span-12">
          <label className="block mb-2">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={getData.description}
            // onChange={(e) => setNewDescription(e.target.value)}
            disabled
          ></textarea>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">ID</label>
          <div>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={getData.id}
              // onChange={(e) => setNewID(e.target.value)}
              disabled
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">SKU</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={`/${getData.id}`}
            // onChange={(e) => setSku(e.target.value.slice(1))}
            disabled
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Promotional Price</label>
          <div className="flex gap-3">
            <input
              type="number"
              value={promotionalPrice}
              min="0"
              onChange={(e) => {
                const value = e.target.value < 0 ? 0 : e.target.value;
                setPromotionalPrice(value);
              }}
              // disabled
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Request</label>
          <div className="flex gap-3">
            <input
              type="text"
              // value={getData.image}
              // disabled
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Start Date</label>
          <div className="flex gap-3">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Start Time</label>
          <div className="flex gap-3">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">End Date</label>
          <div className="flex gap-3">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">End Time</label>
          <div className="flex gap-3">
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
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
              type="text"
              value={getData.image}
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
            onClick={createNewPromotion}
          >
            Save Promotion
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddPromotion;
