import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-sm breadcrumbs mb-8">
          <ul>
            <li>Home</li>
            <li>About</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h1 className="text-4xl font-bold mb-6">Our Story</h1>
            <p className="mb-4">
              Launced in 2015, Exclusive is South Asia's premier online shopping
              marketplace with an active presense in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sellers and 300 brands and serves 3 millioons
              customers across the region.
            </p>
            <p>
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assortment in categories
              ranging from consumer.
            </p>
          </div>
          <div>
            <img
              src="images/about/portrait-two-african-females-holding-shopping-bags-while-reacting-something-their-smartphone 1.png"
              alt="Shopping"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-16">
          <div className="p-4 rounded-lg text-center bg-gray-100">
            <div className="inline-block p-3 rounded-full bg-gray-200 mb-3">
              <img
                src="images/about/icon_shop.png"
                className="icon-store text-2xl"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2">10.5k</h3>
            <p>Sellers active our site</p>
          </div>
          <div className="p-4 rounded-lg text-center bg-red-500 text-white">
            <div className="inline-block p-3 rounded-full bg-white mb-3">
              <img
                src="images/about/icon_shop.png"
                className="icon-store text-2xl"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2">33k</h3>
            <p>Mopnthly Produduct Sale</p>
          </div>
          <div className="p-4 rounded-lg text-center bg-gray-100">
            <div className="inline-block p-3 rounded-full bg-gray-200 mb-3">
              <img
                src="images/about/icon_shop.png"
                className="icon-store text-2xl"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2">45.5k</h3>
            <p>Customer active in our site</p>
          </div>
          <div className="p-4 rounded-lg text-center bg-gray-100">
            <div className="inline-block p-3 rounded-full bg-gray-200 mb-3">
              <img
                src="images/about/icon_shop.png"
                className="icon-store text-2xl"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2">25k</h3>
            <p>Anual gross sale in our site</p>
          </div>
        </div>

        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Our Team</h2>
            <div className="flex space-x-2">
              <span className="w-3 h-3 rounded-full bg-gray-300"></span>
              <span className="w-3 h-3 rounded-full bg-gray-300"></span>
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-gray-300"></span>
              <span className="w-3 h-3 rounded-full bg-gray-300"></span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="/path-to-tom-cruise-image.jpg"
                alt="Tom Cruise"
                className="w-full h-auto mb-4"
              />
              <h3 className="font-semibold text-xl mb-1">Tom Cruise</h3>
              <p className="text-gray-600 mb-2">Founder & Chairman</p>
              <div className="flex justify-center space-x-2">
                <a href="#" className="text-gray-400 hover:text-blue-500">
                  <i className="icon-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-500">
                  <i className="icon-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-700">
                  <i className="icon-linkedin"></i>
                </a>
              </div>
            </div>
            <div className="text-center">
              <img
                src="/path-to-emma-watson-image.jpg"
                alt="Emma Watson"
                className="w-full h-auto mb-4"
              />
              <h3 className="font-semibold text-xl mb-1">Emma Watson</h3>
              <p className="text-gray-600 mb-2">Managing Director</p>
              <div className="flex justify-center space-x-2">
                <a href="#" className="text-gray-400 hover:text-blue-500">
                  <i className="icon-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-500">
                  <i className="icon-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-700">
                  <i className="icon-linkedin"></i>
                </a>
              </div>
            </div>
            <div className="text-center">
              <img
                src="/path-to-will-smith-image.jpg"
                alt="Will Smith"
                className="w-full h-auto mb-4"
              />
              <h3 className="font-semibold text-xl mb-1">Will Smith</h3>
              <p className="text-gray-600 mb-2">Product Designer</p>
              <div className="flex justify-center space-x-2">
                <a href="#" className="text-gray-400 hover:text-blue-500">
                  <i className="icon-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-500">
                  <i className="icon-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-700">
                  <i className="icon-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-block p-4 rounded-full bg-gray-200 mb-4">
              <i className="icon-truck text-3xl"></i>
            </div>
            <h3 className="font-semibold text-xl mb-2">
              FREE AND FAST DELIVERY
            </h3>
            <p>Free delivery for all orders over $140</p>
          </div>
          <div className="text-center">
            <div className="inline-block p-4 rounded-full bg-gray-200 mb-4">
              <i className="icon-headset text-3xl"></i>
            </div>
            <h3 className="font-semibold text-xl mb-2">
              24/7 CUSTOMER SERVICE
            </h3>
            <p>Friendly 24/7 customer support</p>
          </div>
          <div className="text-center">
            <div className="inline-block p-4 rounded-full bg-gray-200 mb-4">
              <i className="icon-shield text-3xl"></i>
            </div>
            <h3 className="font-semibold text-xl mb-2">MONEY BACK GUARANTEE</h3>
            <p>We return money within 30 days</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutPage;
