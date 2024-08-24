
import "./Footer.css";

function Footer() {
  return (
    <div className="footer bg-black text-white md:pt-20 px-4 md:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 justify-space-between">
        <div className="text">
          <ul>
            <li className="exclusive">Exclusive</li>
            <li className="subscribe">Subscribe</li>
            <li>Get 10% off your first order</li>
            <div className="enter-your-email-container">
              <input
                className="enter-your-email"
                placeholder="Enter your email"
              />
            </div>
          </ul>
        </div>
        <div className="text">
          <ul>
            <li className="subscribe">Support</li>
            <li>111 Bijoy sarani, Dhaka</li>
            <li>exclusive@gmail.com</li>
            <li>+88015-8888-9999</li>
          </ul>
        </div>
        <div className="text">
          <ul>
            <li className="subscribe">Account</li>
            <li>My Account</li>
            <li>Login/Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>
        <div className="text">
          <ul>
            <li className="subscribe">Quick Link</li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="subscribe">Download App</li>
            <li>Save $3 with App New User Only</li>
            <li>
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <img src="./icons/qrcode.png" alt="QR Code" className="w-24 h-24" />
                </div>
                <div className="flex flex-row sm:flex-col gap-2">
                  <img src="./icons/googleplay.png" alt="Google Play" className="h-10" />
                  <img src="./icons/AppStore.png" alt="App Store" className="h-10" />
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <img src="./icons/social-media/facebook.png" alt="Facebook" className="w-6 h-6" />
                <img src="./icons/social-media/twitter.png" alt="Twitter" className="w-6 h-6" />
                <img src="./icons/social-media/instagram.png" alt="Instagram" className="w-6 h-6" />
                <img src="./icons/social-media/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="copy-right  text-gray-400 flex justify-center ">
        Copyright Rimel 2022. All rights reserved
      </div>
    </div>
  );
}

export default Footer;