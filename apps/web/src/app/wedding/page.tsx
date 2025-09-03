import { Header } from "@repo/ui/index";

export default function WeddingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header logo="OBSESED" />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">
            Wedding Planning
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Create your perfect wedding day with our expert team. From intimate
            ceremonies to grand celebrations, we make your dreams come true.
          </p>
        </div>

        {/* Wedding Packages */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 p-8 transition-shadow hover:shadow-lg">
            <div className="mb-4 text-4xl">💒</div>
            <h3 className="mb-4 text-2xl font-semibold">Intimate Wedding</h3>
            <p className="mb-6 text-gray-600">
              Perfect for couples who want a cozy, personal celebration with
              close family and friends.
            </p>
            <ul className="mb-6 space-y-2 text-sm text-gray-500">
              <li>• Up to 50 guests</li>
              <li>• Ceremony & reception</li>
              <li>• Basic decoration</li>
              <li>• Photography package</li>
            </ul>
            <button className="w-full rounded bg-black py-3 text-white transition-colors hover:bg-gray-800">
              Learn More
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 p-8 transition-shadow hover:shadow-lg">
            <div className="mb-4 text-4xl">👑</div>
            <h3 className="mb-4 text-2xl font-semibold">Classic Wedding</h3>
            <p className="mb-6 text-gray-600">
              Traditional elegance meets modern sophistication for your special
              day.
            </p>
            <ul className="mb-6 space-y-2 text-sm text-gray-500">
              <li>• Up to 150 guests</li>
              <li>• Full ceremony & reception</li>
              <li>• Premium decoration</li>
              <li>• Professional photography</li>
              <li>• Wedding coordinator</li>
            </ul>
            <button className="w-full rounded bg-black py-3 text-white transition-colors hover:bg-gray-800">
              Learn More
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 p-8 transition-shadow hover:shadow-lg">
            <div className="mb-4 text-4xl">✨</div>
            <h3 className="mb-4 text-2xl font-semibold">Luxury Wedding</h3>
            <p className="mb-6 text-gray-600">
              The ultimate celebration with every detail crafted to perfection.
            </p>
            <ul className="mb-6 space-y-2 text-sm text-gray-500">
              <li>• Up to 300 guests</li>
              <li>• Grand ceremony & reception</li>
              <li>• Custom decoration</li>
              <li>• Premium photography & video</li>
              <li>• Dedicated wedding planner</li>
              <li>• Luxury amenities</li>
            </ul>
            <button className="w-full rounded bg-black py-3 text-white transition-colors hover:bg-gray-800">
              Learn More
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-lg bg-gray-50 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Ready to Plan Your Dream Wedding?
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Contact us today to schedule a consultation and start planning your
            perfect day.
          </p>
          <button className="rounded bg-black px-8 py-4 text-white transition-colors hover:bg-gray-800">
            Schedule Consultation
          </button>
        </div>
      </main>
    </div>
  );
}
