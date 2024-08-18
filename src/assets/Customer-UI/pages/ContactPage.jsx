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

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div>
              <h2 className="flex items-center text-xl font-semibold mb-4">
                <svg
                  className="w-6 h-6 mr-2 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call To Us
              </h2>
              <p className="mb-2">We are available 24/7, 7 days a week.</p>
              <p className="font-semibold">Phone: +8801611112222</p>
            </div>
            <div>
              <h2 className="flex items-center text-xl font-semibold mb-4">
                <svg
                  className="w-6 h-6 mr-2 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Write To US
              </h2>
              <p className="mb-2">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="mb-1">Emails: customer@exclusive.com</p>
              <p>Emails: support@exclusive.com</p>
            </div>
          </div>
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
                className="px-8 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
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
