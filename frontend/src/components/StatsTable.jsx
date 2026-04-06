import React from "react";

const StatsTable = ({ workshops = [], startIndex = 1 }) => {
  // ── Empty state ─────────────────────────────────────────────────────
  if (!workshops || workshops.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No data available
          </h3>
          <p className="text-sm text-gray-500 max-w-sm">
            There are no workshop records to display. Try adjusting your filters
            or selecting a different date range.
          </p>
        </div>
      </div>
    );
  }

  // ── Populated table ─────────────────────────────────────────────────
  return (
    /*
      Outer card: bg-white rounded-xl shadow-sm p-5
      Inner wrapper: overflow-x-auto  → horizontal scroll on mobile
      thead: sticky top-0 z-10        → header stays visible while scrolling
    */
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full min-w-[700px] border-collapse">
          {/* ── Sticky header ──────────────────────────────────────── */}
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-50 border-b border-gray-200">
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold
                           text-gray-600 uppercase tracking-wider whitespace-nowrap"
              >
                Sr No.
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold
                           text-gray-600 uppercase tracking-wider whitespace-nowrap"
              >
                Coordinator Name
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold
                           text-gray-600 uppercase tracking-wider whitespace-nowrap"
              >
                Institute Name
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold
                           text-gray-600 uppercase tracking-wider whitespace-nowrap"
              >
                Instructor Name
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold
                           text-gray-600 uppercase tracking-wider whitespace-nowrap"
              >
                Workshop Name
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold
                           text-gray-600 uppercase tracking-wider whitespace-nowrap"
              >
                Workshop Date
              </th>
            </tr>
          </thead>

          {/* ── Body rows ───────────────────────────────────────────── */}
          <tbody className="divide-y divide-gray-100">
            {workshops.map((workshop, index) => (
              <tr
                key={workshop.id || index}
                className="hover:bg-blue-50/40 transition-colors duration-100"
              >
                {/* Sr No. */}
                <td className="px-4 py-3.5 whitespace-nowrap text-sm text-gray-500">
                  {startIndex + index}
                </td>

                {/* Coordinator Name */}
                <td className="px-4 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900">
                  {workshop.coordinator_name || "N/A"}
                </td>

                {/* Institute Name */}
                <td className="px-4 py-3.5 whitespace-nowrap text-sm text-gray-600">
                  {workshop.institute_name || "N/A"}
                </td>

                {/* Instructor Name */}
                <td className="px-4 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900">
                  {workshop.instructor_name || "N/A"}
                </td>

                {/* Workshop Name */}
                <td className="px-4 py-3.5 whitespace-nowrap text-sm text-gray-700">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full
                               text-xs font-medium bg-blue-50 text-blue-700
                               border border-blue-100"
                  >
                    {workshop.workshop_name || "N/A"}
                  </span>
                </td>

                {/* Workshop Date */}
                <td className="px-4 py-3.5 whitespace-nowrap text-sm text-gray-600">
                  {workshop.workshop_date
                    ? new Date(workshop.workshop_date).toLocaleDateString(
                        "en-IN",
                        { day: "2-digit", month: "short", year: "numeric" },
                      )
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsTable;
