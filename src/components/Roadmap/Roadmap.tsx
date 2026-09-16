export default function roadmap() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">

      {/* Header */}
      <header className="px-6 py-5 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          <div className="flex flex-col items-center leading-none">
            <div className="relative px-3 py-1">
              <div className="absolute top-0 left-1 right-1 h-3 border-t border-gray-800 rounded-t-full"></div>
              <div className="absolute bottom-0 left-1 right-1 h-3 border-b border-gray-800 rounded-b-full"></div>

              <div className="relative px-3 py-0.5 text-lg font-serif tracking-[0.3em] text-gray-900">
                N T R
              </div>
            </div>

            <div className="mt-1.5 text-[9px] font-medium tracking-[0.18em] text-gray-800 uppercase">
              NAIL TECH READY
            </div>
          </div>

        </div>
      </header>

      {/* Product */}
      <main className="max-w-4xl mx-auto px-6 py-16 text-center">

        <p className="text-xs uppercase tracking-[0.25em] text-purple-500 mb-4">
          Nail Tech Ready
        </p>

        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-5">
          The Nail Tech roadmap
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          A step-by-step guide to help you move from aspiring nail tech
          to confidently building your career.
        </p>

        {/* Placeholder Product */}
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm border border-purple-100 p-8">

          <div className="h-56 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mb-6">
            <span className="text-purple-500 font-medium">
              Product Preview
            </span>
          </div>

          <h2 className="text-2xl font-serif text-gray-900 mb-2">
            Zero to Hero Nail Tech Guide
          </h2>

          <p className="text-gray-500 mb-6">
            Your roadmap for navigating nail school, licensing,
            getting started, and building your nail tech career.
          </p>

          <div className="text-3xl font-semibold text-gray-900 mb-6">
            $99
          </div>

          <button className="w-full py-3.5 rounded-full bg-purple-600 text-white text-sm uppercase tracking-wider hover:bg-purple-700 transition">
            Get the roadmap
          </button>

          <p className="text-xs text-gray-400 mt-4">
            Secure checkout • Instant access
          </p>

        </div>

      </main>

    </div>
  );
}