import { Header } from "@repo/ui/index";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header logo="OBSESED" />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">
            Events & Celebrations
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Host memorable corporate events, private parties, and special
            celebrations in our beautiful and versatile venues.
          </p>
        </div>

        {/* Event Types */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 p-6 text-center transition-shadow hover:shadow-lg">
            <div className="mb-4 text-4xl">🏢</div>
            <h3 className="mb-2 text-xl font-semibold">Corporate Events</h3>
            <p className="text-sm text-gray-600">
              Professional meetings, conferences, and corporate celebrations.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 p-6 text-center transition-shadow hover:shadow-lg">
            <div className="mb-4 text-4xl">🎂</div>
            <h3 className="mb-2 text-xl font-semibold">Birthday Parties</h3>
            <p className="text-sm text-gray-600">
              Celebrate special milestones with style and elegance.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 p-6 text-center transition-shadow hover:shadow-lg">
            <div className="mb-4 text-4xl">🎓</div>
            <h3 className="mb-2 text-xl font-semibold">Graduations</h3>
            <p className="text-sm text-gray-600">
              Honor academic achievements with memorable celebrations.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 p-6 text-center transition-shadow hover:shadow-lg">
            <div className="mb-4 text-4xl">🎊</div>
            <h3 className="mb-2 text-xl font-semibold">Anniversaries</h3>
            <p className="text-sm text-gray-600">
              Celebrate years of love and commitment in style.
            </p>
          </div>
        </div>

        {/* Venue Features */}
        <div className="mb-16 rounded-lg bg-gray-50 p-12">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Our Venue Features
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-3xl">🏛️</div>
              <h3 className="mb-2 text-xl font-semibold">Elegant Spaces</h3>
              <p className="text-gray-600">
                Beautifully designed venues that can accommodate any event size.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-3xl">🍽️</div>
              <h3 className="mb-2 text-xl font-semibold">Catering Services</h3>
              <p className="text-gray-600">
                Professional catering with customizable menus for every
                occasion.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-3xl">🎵</div>
              <h3 className="mb-2 text-xl font-semibold">Audio/Visual</h3>
              <p className="text-gray-600">
                State-of-the-art sound and lighting systems for perfect
                ambiance.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Ready to Plan Your Event?
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Let us help you create an unforgettable experience for your guests.
          </p>
          <button className="rounded bg-black px-8 py-4 text-white transition-colors hover:bg-gray-800">
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
}
