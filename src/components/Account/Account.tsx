import { useState } from "react";

type AccountMode = "login" | "signup";

type AccountProps = {
  initialMode?: AccountMode;
  onBack?: () => void;
};

export default function Account({
  initialMode = "login",
  onBack,
}: AccountProps) {
  const [mode, setMode] = useState<AccountMode>(initialMode);

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

          {onBack && (
            <button
              onClick={onBack}
              className="text-xs uppercase tracking-widest text-gray-500 hover:text-purple-600 transition"
            >
              Back
            </button>
          )}

        </div>
      </header>

      {/* Account Card */}
      <main className="flex justify-center px-6 py-14">

        <div className="w-full max-w-md">

          <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-8 md:p-10">

            {/* Heading */}
            <div className="text-center mb-8">

              <p className="text-xs uppercase tracking-[0.25em] text-purple-500 mb-3">
                Nail Tech Ready
              </p>

              <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-3">
                {mode === "login" ? "Welcome Back" : "Start Your Journey"}
              </h1>

              <p className="text-gray-500 text-sm">
                {mode === "login"
                  ? "Log in to access your Nail Tech Ready account."
                  : "Create your account and continue building your future."}
              </p>

            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="space-y-5"
            >

              {mode === "signup" && (
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>

              {mode === "signup" && (
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>
              )}

              {mode === "login" && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-xs text-purple-600 hover:text-purple-700"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-purple-600 text-white text-sm uppercase tracking-wider hover:bg-purple-700 transition"
              >
                {mode === "login" ? "Log In" : "Create Account"}
              </button>

            </form>

            {/* Switch Mode */}
            <div className="text-center mt-7 pt-6 border-t border-gray-100">

              <p className="text-sm text-gray-500">
                {mode === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}

                <button
                  type="button"
                  onClick={() =>
                    setMode(mode === "login" ? "signup" : "login")
                  }
                  className="ml-2 text-purple-600 font-medium hover:text-purple-700"
                >
                  {mode === "login" ? "Sign Up" : "Log In"}
                </button>
              </p>

            </div>

          </div>

          {/* Privacy */}
          <div className="flex justify-center gap-4 mt-6 text-[11px] text-gray-400">
            <span>✓ Your Info is safe</span>
            <span>✓ We respect your privacy</span>
          </div>

        </div>

      </main>

    </div>
  );
}