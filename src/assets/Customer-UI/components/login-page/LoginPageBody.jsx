import React from "react";
import "./LoginPageBody.css"
function LoginPageBody() {
  return (
    <div className="container">
      <div className="flex">
        <ul className="breadcrumb text-left">
          <li>Home</li>
          <li>Cart</li>
        </ul>
        <div className="flex welcome">
          <p>Welcome!</p>
          <p className="mcl-rimmel "> Mcl Rimel</p>
        </div>
      </div>
      <div className="flex">
        <div>
          <div className="head-link">Manage My account</div>
          <ul>
            <li>My Profile</li>
            <li>Address Book</li>
            <li>My Payment Option</li>
          </ul>
          <div className="head-link">My Orders</div>
          <ul>
            <li>My Returns</li>
            <li>My Cancellations</li>
          </ul>
          <div className="head-link">My Wishlist</div>
        </div>
        <div className="ml-32">
          <div className="edit-your-profile">Edit Your Profile</div>
          <div>
            <div>
              <div className="flex">
                <div className="text-very-left ">First Name</div>
                <div className="text-very-left">Last Name</div>
              </div>
              <div className="flex">
                <input className="short-input" placeholder="Md" />
                <input className="short-input" placeholder="Rimel" />
              </div>
            </div>
            <div>
              <div className="flex">
                <div className="text-very-left ">Email</div>
                <div className="text-very-left">Address</div>
              </div>
              <div className="flex">
                <input className="short-input" placeholder="rimel1111@gmail.com" />
                <input className="short-input" placeholder="Kingston, 5236, United States" />
              </div>
            </div>
            <div >
              <div>
                <div className="password">Password Changes</div>
              </div>
              <div className="flex">
                <input className="long-input" placeholder="Current Password" />
              </div>
            </div>
            <div>
              <div  className="flex">
                <input className="long-input" placeholder="New Password" />
              </div>
            </div>
            <div>
              <div  className="flex">
                <input className="long-input" placeholder="Confirm New Password" />
              </div>
            </div>
          </div>
          <div className="buttons">
            <button className="cancel-button">Cancel</button>
            <button className="save-changes">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPageBody;
