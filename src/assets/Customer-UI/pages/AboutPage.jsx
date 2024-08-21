import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Link, NavLink } from "react-router-dom";

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        <div className="text-sm breadcrumbs mb-8">
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
                to="/aboutpage"
                className={({ isActive }) =>
                  isActive
                    ? " font-semibold text-black"
                    : "text-black"
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Section 1 */}
        <div className="container mx-auto px-6 py-12 flex-grow">
          <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
            <div className="mb-20 justify-center">
              <h1 className="text-5xl font-bold mb-8 text-left">Our Story</h1>
              <h6 className="text-lg my-6 text-left font-light">
                Launched in 2015, Exclusive is South Asia premier online
                shopping marketplace with an active presence in Bangladesh.
                Supported by a wide range of tailored marketing, data and
                service solutions, Exclusive has 10,500 sellers and 300 brands
                and serves 3 million customers across the region.
              </h6>
              <h6 className="text-lg my-6 text-left font-light">
                Exclusive has more than 1 Million products to offer, growing at
                a very fast pace. Exclusive offers a diverse assortment in
                categories ranging from consumer goods to electronics.
              </h6>
            </div>
            <div>
              <img
                src="images/about/portrait-two-african-females-holding-shopping-bags-while-reacting-something-their-smartphone 1.png"
                alt="Two women shopping"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                title: "10.5k",
                description: "Sellers active on our site",
                icon: "shop",
              },
              {
                title: "33k",
                description: "Monthly Product Sale",
                icon: "moneybag",
              },
              {
                title: "45.5k",
                description: "Customer active in our site",
                icon: "shoppingbag",
              },
              {
                title: "25k",
                description: "Annual gross sale in our site",
                icon: "moneybag",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-lg text-center transition-colors duration-300 bg-gray-100 hover:bg-red-500 hover:text-white"
              >
                <div>
                  <img
                    src={`/images/about/${item.icon}.png`}
                    alt={item.icon}
                    className="w-16 h-16 mx-auto bg-black rounded-full object-none ring-8 ring-slate-300 mb-6"
                  />
                </div>
                <h3 className="text-4xl font-bold mb-4">{item.title}</h3>
                <h6>{item.description}</h6>
              </div>
            ))}
          </div>

          {/* Section 3 */}
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { name: "Tom Cruise", role: "Founder & Chairman" },
                { name: "Emma Watson", role: "Managing Director" },
                { name: "Will Smith", role: "Product Designer" },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative">
                    <img
                      src={`/images/about/${member.name}.png`}
                      alt={member.name}
                      // className="w-80 h-96 rounded-lg shadow-lg mb-6"
                      className="w-80 h-96 rounded-lg shadow-lg object-contain mx-auto"
                    />
                    <h1 className="font-semibold text-3xl mb-2">
                      {member.name}
                    </h1>
                    <h6 className="text-gray-600 mb-4">{member.role}</h6>
                    <div className="space-x-4">
                      {[faTwitter, faInstagram, faLinkedin].map(
                        (icon, index) => (
                          <FontAwesomeIcon
                            key={index}
                            icon={icon}
                            className="w-6 h-6 text-gray-600 hover:text-black"
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center my-10">
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i === 2 ? "bg-red-500" : "bg-gray-300"
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              {
                title: "FREE AND FAST DELIVERY",
                description: "Free delivery for all orders over $140",
                icon: "delivery",
              },
              {
                title: "24/7 CUSTOMER SERVICE",
                description: "Friendly 24/7 customer support",
                icon: "customer service",
              },
              {
                title: "MONEY BACK GUARANTEE",
                description: "We return money within 30 days",
                icon: "secure",
              },
            ].map((service, index) => (
              <div key={index} className="text-center">
                <div className="inline-block p-5 rounded-full">
                  <img
                    src={`/images/about/${service.icon}.png`}
                    alt={service.icon}
                    className="w-16 h-16 mx-auto bg-black rounded-full object-none ring-8 ring-slate-300 mb-6"
                  />
                </div>
                <h3 className="font-semibold text-xl mb-3">{service.title}</h3>
                <h6 className="text-gray-600">{service.description}</h6>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutPage;
