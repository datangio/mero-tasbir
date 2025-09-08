import Image from "next/image";
import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Side: Images */}
            <div className="space-y-4">
              <div className="h-90 relative aspect-video w-80 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/images/laptop_show.jpg"
                  alt="Photographer holding camera"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="h-90 relative aspect-video w-80 overflow-hidden rounded-lg shadow-lg">
              {/* Image */}
              <Image
                src="/images/laptop_show.jpg"
                alt="Photographer taking photo"
                fill
                className="object-cover"
              />

              {/* Overlay Text - Positioned on Top */}
              <div className="absolute inset-0 z-10 flex items-center justify-center p-6 text-center">
                <div className="max-w-xs rounded-lg bg-white bg-opacity-90 p-4 shadow-md backdrop-blur-sm">
                  <div className="mb-1 text-2xl font-bold text-orange-500">
                    30,000+
                  </div>
                  <div className="text-sm text-gray-700">
                    Sales in July 2024 with 5-star ratings and happy clients.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Content */}
            <div>
              <h1 className="mb-4 text-3xl font-bold text-orange-500">
                ABOUT US
              </h1>
              <p className="mb-6 leading-relaxed text-gray-700">
                We are connecting clients and professionals within Nepal's
                photography and videography industry. It will recognize the
                growing demand for accessible, high-quality media services and
                creative resources, bridging the gap between talented
                freelancers and customers seeking reliable, culturally relevant
                photography and video solutions.
              </p>
              <button className="rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                EXPLORE MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Side: Text */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Why Choose Mero Tasbir?
              </h2>
              <p className="mb-6 text-gray-700">
                Discover the Benefits That Set Us Apart and Propel Your Fitness
                Journey Forward.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 mt-0.5 h-5 w-5 text-orange-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Easy Booking
                    <br />
                    Browse profiles, check availability, and book your preferred
                    creative in just a few clicks.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 mt-0.5 h-5 w-5 text-orange-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Verified Professionals
                    <br />
                    All freelancers are vetted for quality, experience, and
                    reliability.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 mt-0.5 h-5 w-5 text-orange-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Comprehensive Programs
                    <br />
                    Enjoy a variety of classes and programs tailored to all
                    photography levels, from beginner to advanced.
                  </span>
                </li>
              </ul>
              <button className="mt-6 rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                Free Trial Today
              </button>
            </div>

            {/* Right Side: Images */}
            <div className="space-y-4">
              <div className="w-150 h-50 relative aspect-video overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/images/laptop_show.jpg"
                  alt="Event setup"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-150 h-50 relative aspect-video overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/images/laptop_show.jpg"
                  alt="Event setup"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-150 h-50 relative aspect-video overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/images/laptop_show.jpg"
                  alt="Event setup"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
