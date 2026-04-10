export default function Navbar() {
  const user = {
    isAuthenticated: false,
    role: null, // "instructor" or "coordinator"
    name: "John Doe",
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT: LOGO */}
        <div className="text-lg font-semibold text-gray-800">
          FOSSEE Workshops
        </div>

        {/* RIGHT: NAV LINKS */}
        <div className="flex items-center gap-6">

          {/* Public Links */}
          <a href="/" className="text-gray-600 hover:text-black">Home</a>
          <a href="/types" className="text-gray-600 hover:text-black">Workshop Types</a>
          <a href="/statistics" className="text-gray-600 hover:text-black">Statistics</a>

          {/* Auth Section */}
          {!user.isAuthenticated && null}

          {/* Logged In */}
          {user.isAuthenticated && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">{user.name}</span>
              <button className="text-red-500">Logout</button>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}
