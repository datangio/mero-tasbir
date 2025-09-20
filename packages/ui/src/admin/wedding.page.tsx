"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const WeddingPageContent = () => {
  const [weddings, setWeddings] = useState([
    {
      id: 1,
      couple: "John & Emily",
      date: "2024-06-15",
      venue: "Grand Ballroom",
      status: "Planning",
      budget: 50000,
      guests: 150,
    },
    {
      id: 2,
      couple: "Michael & Sarah",
      date: "2024-07-20",
      venue: "Garden Vista",
      status: "Confirmed",
      budget: 75000,
      guests: 200,
    },
    {
      id: 3,
      couple: "David & Lisa",
      date: "2024-08-10",
      venue: "Seaside Resort",
      status: "Planning",
      budget: 60000,
      guests: 180,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newWedding, setNewWedding] = useState({
    couple: "",
    date: "",
    venue: "",
    status: "Planning",
    budget: 0,
    guests: 0,
  });

  const handleAddWedding = () => {
    if (newWedding.couple && newWedding.date && newWedding.venue) {
      setWeddings([
        ...weddings,
        {
          ...newWedding,
          id: weddings.length + 1,
        },
      ]);
      setNewWedding({
        couple: "",
        date: "",
        venue: "",
        status: "Planning",
        budget: 0,
        guests: 0,
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteWedding = (id: number) => {
    setWeddings(weddings.filter(wedding => wedding.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Planning":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Wedding Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <motion.div
          className="rounded-lg border bg-white p-6 shadow-sm"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-sm font-medium text-gray-500">Total Weddings</h3>
          <p className="text-2xl font-bold text-gray-900">{weddings.length}</p>
        </motion.div>
        <motion.div
          className="rounded-lg border bg-white p-6 shadow-sm"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-sm font-medium text-gray-500">This Month</h3>
          <p className="text-2xl font-bold text-blue-600">
            {
              weddings.filter(
                w => new Date(w.date).getMonth() === new Date().getMonth()
              ).length
            }
          </p>
        </motion.div>
        <motion.div
          className="rounded-lg border bg-white p-6 shadow-sm"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600">
            ${weddings.reduce((sum, w) => sum + w.budget, 0).toLocaleString()}
          </p>
        </motion.div>
        <motion.div
          className="rounded-lg border bg-white p-6 shadow-sm"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-sm font-medium text-gray-500">Total Guests</h3>
          <p className="text-2xl font-bold text-purple-600">
            {weddings.reduce((sum, w) => sum + w.guests, 0)}
          </p>
        </motion.div>
      </div>

      {/* Add Wedding Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Wedding Events</h2>
        <motion.button
          onClick={() => setShowAddForm(!showAddForm)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showAddForm ? "Cancel" : "Add Wedding"}
        </motion.button>
      </div>

      {/* Add Wedding Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-lg border bg-white p-6 shadow-sm"
          >
            <h3 className="mb-4 text-lg font-medium">Add New Wedding</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Couple Names"
                value={newWedding.couple}
                onChange={e =>
                  setNewWedding({ ...newWedding, couple: e.target.value })
                }
                className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={newWedding.date}
                onChange={e =>
                  setNewWedding({ ...newWedding, date: e.target.value })
                }
                className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Venue"
                value={newWedding.venue}
                onChange={e =>
                  setNewWedding({ ...newWedding, venue: e.target.value })
                }
                className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newWedding.status}
                onChange={e =>
                  setNewWedding({ ...newWedding, status: e.target.value })
                }
                className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Planning">Planning</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                type="number"
                placeholder="Budget"
                value={newWedding.budget}
                onChange={e =>
                  setNewWedding({
                    ...newWedding,
                    budget: parseInt(e.target.value),
                  })
                }
                className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Guests"
                value={newWedding.guests}
                onChange={e =>
                  setNewWedding({
                    ...newWedding,
                    guests: parseInt(e.target.value),
                  })
                }
                className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 transition-colors hover:text-gray-800"
              >
                Cancel
              </button>
              <motion.button
                onClick={handleAddWedding}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add Wedding
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wedding List */}
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Couple
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Venue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Guests
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {weddings.map(wedding => (
                <motion.tr
                  key={wedding.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {wedding.couple}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(wedding.date).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {wedding.venue}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(wedding.status)}`}
                    >
                      {wedding.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    ${wedding.budget.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {wedding.guests}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <motion.button
                      onClick={() => handleDeleteWedding(wedding.id)}
                      className="text-red-600 transition-colors hover:text-red-900"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
