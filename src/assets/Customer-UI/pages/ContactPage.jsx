import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import validator from "validator";

emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);
function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validatePhoneNumber = (number) => {
    return validator.isMobilePhone(number, "vi-VN");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePhoneNumber(formData.phone)) {
      toast.error("Please Enter Valid Phone Number!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      return;
    }

    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      console.log(result.text);
      toast.success("Message sent successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error.text || error);
      toast.error("Message sending failed!");
    }
  };

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
                to="/contactpage"
                className={({ isActive }) =>
                  isActive
                    ? " font-semibold text-black"
                    : "text-black"
                }
              >
                Contact
              </NavLink>
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
                <h6 className="flex pl-8 my-3">
                  Email: customer@exclusive.com
                </h6>
                <h6 className="flex pl-8 my-3">Email: support@exclusive.com</h6>
              </div>
            </div>
            {/* Send Message Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-md bg-gray-100"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-md bg-gray-100"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-md bg-gray-100"
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
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
      </div>
      <Footer />
    </div>
  );
}

export default ContactPage;
