import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../../Products/Context/WishlistContext";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import GroupedSelect from "./utils/DropdownSelect";
import NavbarDarkExample from "./utils/DropdownSelect";
import BasicMenu from "./utils/DropdownSelect";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const { getWishlistCount } = useContext(WishlistContext);
  const wishlistCount = getWishlistCount();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full relative top-0 left-0">
      {/* Top Bar */}
      <div className="bg-black text-white text-center py-2 text-sm">
        <span className="hidden sm:inline">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </span>
        <span className="sm:hidden">Summer Sale - 50% OFF!</span>
        <a href="#" className="font-bold ml-1">
          ShopNow
        </a>
        <div className="absolute right-4 top-2 hidden sm:block">
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

          {/* Navigation Links - Desktop */}
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
              to="/contactpage"
              className={({ isActive }) =>
                isActive
                  ? "text-decoration-line: underline font-semibold"
                  : "text-gray-900 hover:text-blue-700"
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/aboutpage"
              className={({ isActive }) =>
                isActive
                  ? "text-decoration-line: underline font-semibold"
                  : "text-gray-900 hover:text-blue-700"
              }
            >
              About
            </NavLink>
          </div>

          {/* Icons and Search */}
          <div className="flex items-center space-x-4">
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden sm:block"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border rounded-full py-2 px-4 text-gray-500 w-40 md:w-60"
                placeholder="Search..."
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                <SearchOutlinedIcon />
              </button>
            </form>
            <NavLink to="/shopping-cart">
              <div className="relative">
                <ShoppingCartOutlinedIcon className=" image h-6 w-6 text-gray-600" />
              </div>
            </NavLink>
            <NavLink to="/productwishlist" className="text-gray-600">
              <div className="relative">
                <FavoriteBorderOutlinedIcon className="h-6 w-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </NavLink>
            <BasicMenu className="text-gray-600" />
            {/* Mobile menu button */}
            <button className="md:hidden text-gray-600" onClick={toggleMenu}>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <NavLink
              to="/"
              className="block py-2 px-4 text-gray-900 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/productlist"
              className="block py-2 px-4 text-gray-900 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Products
            </NavLink>
            <NavLink
              to="/contactpage"
              className="block py-2 px-4 text-gray-900 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Contact
            </NavLink>
            <NavLink
              to="/aboutpage"
              className="block py-2 px-4 text-gray-900 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              About
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
