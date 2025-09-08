import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold">MERO TASBIR</h3>
            <p className="mt-4 text-gray-300">
              This is a comprehensive platform connecting clients and
              professionals within Nepal's photography and videography industry.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold">COMPANY</h4>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>
                <a href="#" className="transition-colors hover:text-orange-500">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-orange-500">
                  Terms & conditions
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-orange-500">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-orange-500">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold">CONTACT US</h4>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>Mid-Baneshwor, Kathmandu</li>
              <li>+977-1234567890</li>
              <li>info@merotasbir.com</li>
              <li>merotasbir.com</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold">SOCIAL LINKS</h4>
            <div className="mt-4 flex space-x-4">
              <a href="#" aria-label="Facebook">
                <Image
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </a>
              <a href="#" aria-label="Instagram">
                <Image
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>
              <a href="#" aria-label="Pinterest">
                <Image
                  src="/icons/pinterest.svg"
                  alt="Pinterest"
                  width={24}
                  height={24}
                />
              </a>
            </div>
            <div className="mt-2 flex space-x-4">
              <a href="#" aria-label="Google Play">
                <Image
                  src="/icons/google-play.png"
                  alt="Google Play"
                  width={120}
                  height={40}
                />
              </a>
            </div>
            <div className="flex space-x-4 p-2">
              <a href="#" aria-label="App Store">
                <Image
                  src="/icons/app-store.png"
                  alt="App Store"
                  width={100}
                  height={40}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          © 2025 Mero Tasbir by RISMA MOTION PICTURES PVT. LTD. All rights
          reserved. Powered by
          <a href="https://maptechnepal.com/"> M.A.P. Tech</a>
        </div>
      </div>
    </footer>
  );
}
