import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircleOutlinedIcon className="h-6 w-6 text-gray-600" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <div className="flex">
            <Link to={"/edit-page"}>
              {" "}
              <div>Manage My Account</div>
            </Link>
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={"/login"}> Login</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={"/shopping-cart"}>My Order</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={""}> My Collections</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={""}> My Reviews</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={"/login"}> Logout</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
