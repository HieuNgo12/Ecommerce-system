import React from "react";
import sort from "../svg/icon-sort-vertical-svgrepo-com.svg";


const Products = ({ dataProducts }) => {

  console.log(dataProducts)

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-2 border-b border-r w-10">
              <img src={sort} alt="" className="w-9 h-9"/>
            </th>
            <th className="py-2 px-4 border-b border-r w-16">Title</th>
            <th className="py-2 px-4 border-b border-r">Categories</th>
            <th className="py-2 px-4 border-b border-r">Images</th>
            <th className="py-2 px-4 border-b border-r">Price</th>
            <th className="py-2 px-4 border-b border-r">Description</th>
            <th className="py-2 px-4 border-b border-r">Status</th>
            <th className="py-2 px-4 border-b border-r w-[5.3125rem]">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataProducts.map((product, index) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b border-r">{product.id}</td>
              <td className="py-2 px-4 border-b border-r">{product.title}</td>
              <td className="py-2 px-4 border-b border-r">{product.category}</td>
              <td className="py-2 px-4 border-b border-r ">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-17 w-16 object-cover"
                />
              </td>
              <td className="py-2 px-4 border-b border-r">{product.price}</td>
              <td className="py-2 px-4 border-b border-r">{product.description}</td>
              <td className="py-2 px-4 border-b border-r cursor-pointer">
                <select>
                  <option value="">Selling</option>
                  <option value="">Block</option>
                  <option value="">Sold Out</option>
                </select>
              </td>
              <td className="py-2 px-4 border-b border-r cursor-pointer">
                <div className="flex flex-col gap-2">
                  <button className="rounded-md bg-gray-800 text-white hover:rounded-md hover:bg-gray-700  hover:outline-gray-800 hover:outline hover:outline-1">Edit</button>
                  <button className="rounded-md bg-gray-800 text-white hover:rounded-md hover:bg-gray-700  hover:outline-gray-800 hover:outline hover:outline-1">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
