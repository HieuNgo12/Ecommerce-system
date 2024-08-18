import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="text-sm breadcrumbs mb-8">
        <ul className="flex flex-wrap items-center">
          <li>
            <Link to="/" className="text-gray-500 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link to="/contactpage" className="text-gray-500 hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className="container mx-auto px-36 py-4 flex-grow">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="border-b border-gray-300 pb-4 w-4/5">
              <h2 className="flex items-center text-xl font-semibold ">
                <img
                  src="images/about/phone.png"
                  alt=""
                   className="bg-red-600 rounded-full mr-3 w-10 h-10 object-none"
                />
                Call To Us
              </h2>
              <h6 className="flex pl-8 my-3">
                We are available 24/7, 7 days a week.
              </h6>
              <h6 className="flex pl-8 my-3">Phone: +8801611112222</h6>
            </div>
            <div>
              <h2 className="flex items-center text-xl font-semibold ">
                <img
                  src="images/about/mail.png"
                  alt=""
                   className="bg-red-600 rounded-full mr-3 w-10 h-10 object-none"
                />
                Write To Us
              </h2>
              <h6 className="flex pl-8 my-3">
                Fill out our form and we will contact you within 24 hours.
              </h6>
              <h6 className="flex pl-8 my-3">Emails: customer@exclusive.com</h6>
              <h6 className="flex pl-8 my-3">Emails: support@exclusive.com</h6>
            </div>
          </div>
          {/* Send Message Form */}
          <div>
            <form className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  className="w-full px-4 py-3 border rounded-md bg-gray-100"
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  required
                  className="w-full px-4 py-3 border rounded-md bg-gray-100"
                />
                <input
                  type="tel"
                  placeholder="Your Phone *"
                  required
                  className="w-full px-4 py-3 border rounded-md bg-gray-100"
                />
              </div>
              <textarea
                placeholder="Your Message"
                required
                rows="8"
                className="w-full px-4 py-3 border rounded-md bg-gray-100"
              ></textarea>
              <button
                type="submit"
                className="flex ml-auto px-8 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactPage;
