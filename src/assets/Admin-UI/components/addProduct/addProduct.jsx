import React from 'react';
import './index.css';

const AddProduct = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Title</label>
          <input className="w-full p-2 border rounded" type="text" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Stock status</label>
          <input className="w-full p-2 border rounded" type="text" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Price</label>
          <input className="w-full p-2 border rounded" type="text" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Available quantity</label>
          <input className="w-full p-2 border rounded" type="text" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Category</label>
          <input className="w-full p-2 border rounded" type="text" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Images</label>
          <button className="w-full p-2 border rounded bg-gray-200">Choose product images</button>
          <div className="flex mt-2">
            <div className="w-16 h-16 mr-2 border rounded">
              <img src="image1.jpg" alt="Product" />
              <button className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full">x</button>
            </div>
            <div className="w-16 h-16 mr-2 border rounded">
              <img src="image2.jpg" alt="Product" />
              <button className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full">x</button>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Slug</label>
          <input className="w-full p-2 border rounded" type="text" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">SKU</label>
          <input className="w-full p-2 border rounded" type="text" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Colors</label>
          <div className="flex">
            <div className="w-8 h-8 mr-2 bg-yellow-500 rounded-full"></div>
            <div className="w-8 h-8 mr-2 bg-orange-500 rounded-full"></div>
            <div className="w-8 h-8 mr-2 bg-green-500 rounded-full"></div>
            <div className="w-8 h-8 mr-2 bg-blue-500 rounded-full"></div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Sizes</label>
          <div className="flex">
            <button className="w-8 h-8 mr-2 border rounded">S</button>
            <button className="w-8 h-8 mr-2 border rounded">M</button>
            <button className="w-8 h-8 mr-2 border rounded">X</button>
            <button className="w-8 h-8 mr-2 border rounded">XL</button>
            <button className="w-8 h-8 mr-2 border rounded">XXL</button>
          </div>
        </div>
        <div className="col-span-12">
          <label className="block mb-2">Description</label>
          <textarea className="w-full p-2 border rounded"></textarea>
        </div>
        <div className="col-span-12">
          <button className="w-full p-2 bg-blue-500 text-white rounded">Save Product</button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
