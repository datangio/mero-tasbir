import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

     {/* Hero Section */}
<section className="px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-7xl">
    {/* Section Header */}
    
<div className="flex items-center justify-center text-center">
  <div>
    <h1 className="mb-4 text-3xl font-bold text-orange-500">
      CONTACT US
    </h1>
    <p className="mb-6 leading-relaxed text-gray-700">
      Have a question or want to work with us? Reach out — we&apos;d love to hear from you!
    </p>
  </div>
</div>

    {/* Contact Info & Form Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
          {/* Left: Contact Information */}
      <div className="px-12 space-y-8 bg-white p-6  transition-all duration-300 ">
        <div className="space-y-6">
          {/* Email */}
          <div className="flex items-start transition-transform hover:translate-x-1">
            <div className="mr-4 flex-shrink-0 rounded-full bg-orange-100 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Email</h3>
              
              <p className="mt-1 text-gray-600">
                <a 
  href="mailto:hello@merotasbir.com" 
  className="hover:text-orange-500 transition-colors duration-200"
>
                hello@merotasbir.com</a></p>
              
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start transition-transform hover:translate-x-1">
            <div className="mr-4 flex-shrink-0 rounded-full bg-orange-100 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Phone</h3>
              <p className="mt-1 text-gray-600"><a 
  href="tel:+9779876543210" 
  className="hover:text-orange-500 transition-colors duration-200"
>+977 9876543210
</a></p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start transition-transform hover:translate-x-1">
            <div className="mr-4 flex-shrink-0 rounded-full bg-orange-100 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Location</h3>
              <p className="mt-1 text-gray-600">
                New Baneshwor, Kathmandu, Nepal
                <br />
                <span className="text-sm font-normal text-gray-500">
                  (Office Hours: 10 AM – 5 PM)
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-start space-x-4 pt-4">
          {[
            { name: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z' },
            { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.058-1.69-.072-4.948-.072zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
            { name: 'Pinterest', icon: 'M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0' }
          ].map((social) => (
            <a
              key={social.name}
              href="#"
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-all duration-300 hover:bg-orange-100 hover:text-orange-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-300"
              aria-label={social.name}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d={social.icon} />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Right: Contact Form (spans 2 columns on large screens) */}
  <div className="rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">

    <form className="space-y-6">
          <div className="space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-black placeholder-gray-500 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-black placeholder-gray-500 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Subject (Radio Buttons) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Subject*
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["General Inquiry", "Enroll Course", "Job Vacancy", "Freelancer"].map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center space-x-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-orange-50 hover:border-orange-300"
                  >
                    <input
                      type="radio"
                      name="subject"
                      value={option.toLowerCase().replace(/\s+/g, '-')}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95"
            >
              Send Message →
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

      {/* Map Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="">
            {/* Text Content */}
            <div className="flex items-center justify-center text-center pb-6">
                <div>
<h2 className="text-2xl font-bold text-gray-900">Visit us at our Location</h2>
              <p className="mt-4 text-gray-700">
For inqueries, to schedule a visit, or for any assitance, please feel free to contact us.              </p>
              
                </div>
              
            </div>

            {/* Map */}
            <div className="rounded-lg shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.624905945268!2d85.33434361500001!3d27.7089289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198218c8635b%3A0xf7330d5780d12663!2sNew%20Baneshwor%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1685084435783!5m2!1sen!2snp"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: "0.5rem" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mero Tasbir Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}