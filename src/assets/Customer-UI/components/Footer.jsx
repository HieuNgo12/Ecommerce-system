<<<<<<< HEAD
import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div className="bg-black text-white pt-20 text-left pl-10 mt-10 pb-20">
      <div class="grid grid-cols-5 gap-5">
        <div>
          <ul>
            <li className="exclusive">Exclusive</li>
            <li className="subscribe">Subscribe</li>
            <li>Get 10% of your first order</li>
            <div className="enter-your-email">
              <input
                className="enter-your-email"
                placeholder="Enter your mail"
              />
=======
import "./Footer.css"
function Footer() {
  return (
    <div className='bg-black text-white pt-20 text-left pl-10 mt-10 pb-20'>
      <div className ="grid grid-cols-5 gap-5">
            <div>

                <ul>
                    <li className='exclusive'>Exclusive</li>
                    <li className='subscribe'>Subscribe</li>
                    <li>Get 10% of your first order</li>
                    <div className='enter-your-email' >
                        <input className='enter-your-email' placeholder='Enter your mail'/>
                    </div>
                </ul>
>>>>>>> 220afef99d8d7ab3bdf40abb812282301e9980d4
            </div>
          </ul>
        </div>
        <div>
          <ul>
            <li className="subscribe">Support</li>
            <li>111 Bijoy sarani, Dhaka</li>
            <li>exlucisive@gmail.com</li>
            <li>+88015-8888-9999</li>
          </ul>
        </div>

        <div>
          <ul>
            <li className="subscribe">Account</li>
            <li>My Account</li>
            <li>Login/Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="subscribe">Quick Link</li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="pr-8">
          <ul>
            <li className="subscribe">Download App</li>
            <li>Save $3 with App New User Only</li>
            <li >
              <div className="flex">
                <div>
                  <img src="./icons/qrcode.png" />
                </div>
                <div>
                  <img src="./icons/googleplay.png" />
                  <img src="./icons/AppStore.png" />
                </div>
              </div>

              <div className="flex">
                <img src="./icons/social-media/facebook.png" />
                <img src="./icons/social-media/twitter.png" />

<<<<<<< HEAD
                <img src="./icons/social-media/instagram.png" />

                <img src="./icons/social-media/linkedin.png" />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="copy-right text-center pt-20 ">
=======
                        </div>
                    </div>
                    </li>
                    
                </ul></div>
    </div>
    <div className='copy-right text-center text-sm mt-10 pt-6 opacity-40'>
>>>>>>> 220afef99d8d7ab3bdf40abb812282301e9980d4
        Copyright Rimel 2022. All right reserved
      </div>
    </div>
  );
}

export default Footer;
