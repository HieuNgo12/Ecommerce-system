<<<<<<< HEAD
import "./Navbar.css";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
=======
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../../Products/Context/WishlistContext";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


const Navbar = () => {
  const { getWishlistCount } = useContext(WishlistContext);
  const wishlistCount = getWishlistCount();
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // Handle changes to the search input field
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle form submission to navigate with search query
  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    navigate(`/productlist?search=${encodeURIComponent(searchQuery)}`);
  };
>>>>>>> 220afef99d8d7ab3bdf40abb812282301e9980d4

  return (
<<<<<<< HEAD
    <nav class="bg-white dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 ">
      <div class="bg-black text-white flex pt-8">
        <div className="ml-48">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </div>
        <div className="ml-10">
          <a class="font-bold"> ShopNow</a>
        </div>
        <div className="ml-24">
          <Menu as="div" className="relative mt-0 inline-block text-left ">
            <div className="mt-0">
              <MenuButton className="inline-flex w-full justify-center   text-white bg-black px-3 py-2 text-sm font-semibold     hover:bg-black">
                Languages
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-gray-400"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    English
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Vietnamese
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a class="flex items-center space-x-3 rtl:space-x-reverse">
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Exclusive
          </span>
        </a>

        <div class="items-center justify-between " id="navbar-sticky">
          <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/"
                class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/contact-page"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/about"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/sign-up"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Sign Up
              </a>
            </li>
          </ul>
        </div>
        <div>
          <input
            className="looking-for"
            placeholder="What are you looking for?"
          />
        </div>
        <div class="flex " style={{ cursor: "pointer" }}>
          <Link to={"/shopping-cart"}>
            {" "}
            <img src="./icons/cart.png" />
          </Link>
          <img src="./icons/wishlist.png" />
          <img src="./icons/user.png" />
        </div>
        <input />
      </div>
    </nav>
  );
}
=======
    <nav className="w-full relative top-0 left-0">
      {/* Top Bar */}
      <div className="bg-black text-white text-center py-2 text-sm">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        <a href="#" className="font-bold ml-1">
          ShopNow
        </a>
        <div className="absolute right-4 top-2">
          <select className="bg-black text-white">
            <option>English</option>
            <option>Español</option>
            <option>Français</option>
          </select>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between py-4 px-4 mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-semibold">Exclusive</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-decoration-line: underline font-semibold"
                  : "text-gray-900 hover:text-blue-700"
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/productlist"
              className={({ isActive }) =>
                isActive
                  ? "text-decoration-line: underline font-semibold"
                  : "text-gray-900 hover:text-blue-700"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-decoration-line: underline font-semibold"
                  : "text-gray-900 hover:text-blue-700"
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold"
                  : "text-gray-900 hover:text-blue-700"
              }
            >
              About
            </NavLink>
          </div>

          {/* Icons and Search */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border rounded-full py-2 px-4 text-gray-500 w-60"
                placeholder="What are you looking for?"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                <SearchOutlinedIcon/>
              </button>
            </form>
            <ShoppingCartOutlinedIcon className="h-6 w-6 text-gray-600" />
            <NavLink to="/productwishlist">
              <div className="relative">
                <FavoriteBorderOutlinedIcon className="h-6 w-6 text-gray-600" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </NavLink>
            <AccountCircleOutlinedIcon className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
>>>>>>> 220afef99d8d7ab3bdf40abb812282301e9980d4
