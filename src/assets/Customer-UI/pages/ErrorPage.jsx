import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, NavLink } from "react-router-dom";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  console.error(error);

  return (
    <div id="error-page" className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-28 my-12">
        <ul className="flex flex-wrap items-center">
          <li>
            <Link to="/" className="text-gray-500  hover:text-blue-700">
              Home
            </Link>
          </li>
          <li>
            <span>/</span>
          </li>
          <li>
            <NavLink
              to="/ErrorPage"
              className={({ isActive }) =>
                isActive ? " font-semibold text-black" : "text-black"
              }
            >
              404 Error
            </NavLink>
          </li>
        </ul>
        <h1 className="text-8xl font-semibold my-8">404 NOT FOUND</h1>
        <p className="my-8">Your visited page not found. You may go back to the home page.</p>
        <button className=" px-8 py-3 my-8 bg-red-500 w-64 text-white rounded hover:bg-red-600">
          <Link to="/" className="">
            Back To Homepage
          </Link>
        </button>
        {/* <p>
          <i>{error.statusText || error.message}</i>
        </p> */}
      </div>
      <Footer />
    </div>
  );
}
