import { Header } from "@repo/ui/index";

export default function JobsPage() {
  const jobOpenings = [
    {
      id: 1,
      title: "Event Coordinator",
      department: "Events",
      type: "Full-time",
      location: "New York, NY",
      description:
        "Plan and coordinate weddings and special events from conception to completion.",
    },
    {
      id: 2,
      title: "Wedding Planner",
      department: "Weddings",
      type: "Full-time",
      location: "Los Angeles, CA",
      description:
        "Create magical wedding experiences for couples on their special day.",
    },
    {
      id: 3,
      title: "Catering Manager",
      department: "Catering",
      type: "Full-time",
      location: "Chicago, IL",
      description:
        "Oversee catering operations and ensure exceptional dining experiences.",
    },
    {
      id: 4,
      title: "Marketing Specialist",
      department: "Marketing",
      type: "Full-time",
      location: "Remote",
      description:
        "Develop and execute marketing strategies to promote our services.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header logo="OBSESED" />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">
            Join Our Team
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Be part of creating unforgettable experiences. We're looking for
            passionate, creative individuals to join our growing team.
          </p>
        </div>

        {/* Why Work With Us */}
        <div className="mb-16 rounded-lg bg-gray-50 p-12">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Why Work With OBSESED?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-3xl">🌟</div>
              <h3 className="mb-2 text-xl font-semibold">
                Creative Environment
              </h3>
              <p className="text-gray-600">
                Work in a dynamic, creative environment where your ideas are
                valued.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-3xl">📈</div>
              <h3 className="mb-2 text-xl font-semibold">
                Growth Opportunities
              </h3>
              <p className="text-gray-600">
                Advance your career with professional development and growth
                opportunities.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-3xl">🤝</div>
              <h3 className="mb-2 text-xl font-semibold">Team Culture</h3>
              <p className="text-gray-600">
                Join a supportive team that celebrates success and
                collaboration.
              </p>
            </div>
          </div>
        </div>

        {/* Job Openings */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Current Openings
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {jobOpenings.map(job => (
              <div
                key={job.id}
                className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                    {job.type}
                  </span>
                </div>
                <div className="mb-4 flex items-center space-x-4 text-sm text-gray-600">
                  <span>📍 {job.location}</span>
                  <span>🏢 {job.department}</span>
                </div>
                <p className="mb-4 text-gray-600">{job.description}</p>
                <button className="rounded bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16 rounded-lg bg-gray-50 p-12">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Employee Benefits
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-2xl">🏥</div>
              <p className="text-gray-600">Health Insurance</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-2xl">🏖️</div>
              <p className="text-gray-600">Paid Time Off</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-2xl">💰</div>
              <p className="text-gray-600">Competitive Salary</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-2xl">🎓</div>
              <p className="text-gray-600">Training & Development</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Don't See Your Perfect Role?
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            We're always looking for talented individuals. Send us your resume
            and we'll keep you in mind for future opportunities.
          </p>
          <button className="rounded bg-black px-8 py-4 text-white transition-colors hover:bg-gray-800">
            Submit Resume
          </button>
        </div>
      </main>
    </div>
  );
}
