import React from "react";

const FiltersPanel = ({
  filters,
  onFilterChange,
  onView,
  onDownload,
  onClear,
  workshops = [],
  states = [],
  isAuthenticated = false,
}) => {
  const {
    from_date = "",
    to_date = "",
    workshop_type = "",
    state = "",
    sort = "date",
    show_workshops = false,
  } = filters;

  // Shared input/select classes
  const fieldClass =
    "w-full px-3 py-2 rounded-md border border-gray-200 text-sm text-gray-900 " +
    "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " +
    "transition-all duration-150";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">Filters</h2>
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md
                     border border-gray-200 bg-gray-50 text-xs font-medium
                     text-gray-500 hover:bg-gray-100 hover:text-gray-700
                     transition-colors duration-150"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Clear
        </button>
      </div>

      {/* ── Filter Fields ───────────────────────────────────────────── */}
      <div className="p-5 space-y-4">
        {/* From Date */}
        <div>
          <label
            htmlFor="from_date"
            className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide"
          >
            From Date
          </label>
          <input
            type="date"
            id="from_date"
            name="from_date"
            value={from_date}
            onChange={onFilterChange}
            className={fieldClass}
          />
        </div>

        {/* To Date */}
        <div>
          <label
            htmlFor="to_date"
            className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide"
          >
            To Date
          </label>
          <input
            type="date"
            id="to_date"
            name="to_date"
            value={to_date}
            onChange={onFilterChange}
            className={fieldClass}
          />
        </div>

        {/* Workshop */}
        <div>
          <label
            htmlFor="workshop_type"
            className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide"
          >
            Workshop
          </label>
          <select
            id="workshop_type"
            name="workshop_type"
            value={workshop_type}
            onChange={onFilterChange}
            className={fieldClass + " cursor-pointer"}
          >
            <option value="">All Workshops</option>
            {workshops.map((ws) => (
              <option key={ws.id} value={ws.id}>
                {ws.name}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div>
          <label
            htmlFor="state"
            className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide"
          >
            State
          </label>
          <select
            id="state"
            name="state"
            value={state}
            onChange={onFilterChange}
            className={fieldClass + " cursor-pointer"}
          >
            <option value="">All States</option>
            {states.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label
            htmlFor="sort"
            className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide"
          >
            Sort By
          </label>
          <select
            id="sort"
            name="sort"
            value={sort}
            onChange={onFilterChange}
            className={fieldClass + " cursor-pointer"}
          >
            <option value="date">Oldest First</option>
            <option value="-date">Latest First</option>
          </select>
        </div>

        {/* Show My Workshops — only when authenticated */}
        {isAuthenticated && (
          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              id="show_workshops"
              name="show_workshops"
              checked={show_workshops}
              onChange={onFilterChange}
              className="w-4 h-4 rounded border-gray-300 text-blue-600
                         focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor="show_workshops"
              className="text-sm text-gray-700 cursor-pointer"
            >
              Show my workshops only
            </label>
          </div>
        )}
      </div>

      {/* ── Action Buttons ──────────────────────────────────────────── */}
      <div className="px-5 py-4 border-t border-gray-100 space-y-2.5">
        {/* View — green */}
        <button
          onClick={onView}
          className="w-full inline-flex items-center justify-center gap-2
                     px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium
                     hover:bg-green-700 active:bg-green-800
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                     transition-colors duration-150"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          View
        </button>

        {/* Download — blue */}
        <button
          onClick={onDownload}
          className="w-full inline-flex items-center justify-center gap-2
                     px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium
                     hover:bg-blue-700 active:bg-blue-800
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     transition-colors duration-150"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download
        </button>
      </div>
    </div>
  );
};

export default FiltersPanel;
