import { useEffect, useRef } from "react";
import { Clock } from "lucide-react";

type LandingPageProps = {
  takenToday: number;
  bonusSpots: number;
  onStartQuiz: () => void;
  onRealityBreakdown?: () => void;
};

export default function LandingPage({
  takenToday,
  onStartQuiz,
  onRealityBreakdown,
}: LandingPageProps) {

  const products = [
  {
    name: "Professional Nail Drill",
    price: "$89",
    icon: "✦",
    iconStyle: "circle",
  },
  {
    name: "Gel Polish Collection",
    price: "$45",
    icon: "POLISH",
    iconStyle: "polish",
  },
  {
    name: "Nail Tech Starter Kit",
    price: "$129",
    icon: "NAIL KIT",
    iconStyle: "kit",
  },
  {
    name: "Nail Art Brush Set",
    price: "$24",
    icon: "BRUSHES",
    iconStyle: "brushes",
  },
  {
    name: "Professional Nail Tips",
    price: "$18",
    icon: "TIPS",
    iconStyle: "tips",
  },
  {
    name: "UV/LED Nail Lamp",
    price: "$59",
    icon: "UV / LED",
    iconStyle: "lamp",
  },
];

  const productScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const container = productScrollRef.current;

      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: 220,
          behavior: "smooth",
        });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>

   {/* Premium Beauty Navigation */}
<nav className="w-full bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <div className="flex items-center justify-between h-14">

      {/* Brand */}
<div className="flex flex-col items-center leading-none">

  {/* NTR Broken Box */}
  <div className="relative px-3 py-1">

    {/* Top line */}
    <div className="absolute top-0 left-1 right-1 h-3 border-t border-gray-800 rounded-t-full"></div>

    {/* Bottom line */}
    <div className="absolute bottom-0 left-1 right-1 h-3 border-b border-gray-800 rounded-b-full"></div>

    {/* NTR */}
    <div className="relative px-3 py-0.5 text-lg font-serif tracking-[0.3em] text-gray-900">
      N T R
    </div>

  </div>

  {/* Brand Name */}
  <div className="mt-1.5 text-[9px] font-medium tracking-[0.18em] text-gray-800 uppercase whitespace-nowrap">
    NAIL TECH READY
</div>  
      </div>

{/* Navigation Links */}
<div className="hidden md:flex items-center gap-7 ml-20 mr-16">

  <a
    href="#"
    className="text-xs uppercase tracking-widest text-gray-500
               hover:text-purple-600 transition"
  >
    Home
  </a>

  <a
    href="#quiz"
    className="text-xs uppercase tracking-widest text-gray-500
               hover:text-purple-600 transition"
  >
    Career Quiz
  </a>

  <a
    href="#reality"
    className="text-xs uppercase tracking-widest text-gray-500
               hover:text-purple-600 transition"
  >
    Reality Check
  </a>

  <a
    href="#roadmap"
    className="text-xs uppercase tracking-widest text-gray-500
               hover:text-purple-600 transition"
  >
    Roadmap
  </a>

  <a
    href="#shop"
    className="text-xs uppercase tracking-widest text-gray-500
               hover:text-purple-600 transition"
  >
    Shop

        </a>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        <a
          href="#login"
          className="hidden sm:block text-xs uppercase tracking-widest
                     text-gray-500 hover:text-purple-600"
        >
          Log In
        </a>

        <button
          className="px-5 py-2.5 border border-purple-300
                     rounded-full text-xs uppercase tracking-wider
                     text-purple-600 hover:bg-purple-50 transition"
        >
          Get Started
        </button>

      </div>

    </div>

  </div>

</nav>
   
    <div className="min-h-screen bg-white">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-pink-50 to-white py-14 md:py-18 px-4 relative overflow-hidden">

        {/* Hero Content */}
        <div className="max-w-6xl mx-auto relative z-10">

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT SIDE — Main Message */}
            <div className="text-center md:text-left">

         {/* Quiz Badge */}
<div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
  <Clock className="w-4 h-4" aria-hidden="true" />
  <span>90-second Quiz</span>
  <span>•</span>
  <span className="font-bold">?</span>
  <span>12 Questions</span>
  <span>•</span>
  <span className="font-bold">✓</span>
  <span>{takenToday} taken today</span>
</div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
                Are You Actually Ready
                <span className="block text-pink-600">
                  To Be A Nail Tech?
                </span>
              </h1>

              {/* Main Description */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 max-w-xl mx-auto md:mx-0">
                Most aspiring nail technicians spend $3K–$8K and 6+ months
                before realizing it wasn't the right move.
              </p>

{/* QUESTION + BENEFITS */}
<div className="mb-8 max-w-xl mx-auto md:mx-0">

  <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-4">
    Do you think you've got what it takes?
  </p>

  <div className="space-y-3 max-w-md mx-auto md:mx-0 text-left">

    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold">
        ✓
      </div>
      <span className="text-gray-700">
        Get your personalized readiness score
      </span>
    </div>

    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold">
        ✓
      </div>
      <span className="text-gray-700">
        Know your next steps
      </span>
    </div>

    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold">
        ✓
      </div>
      <span className="text-gray-700">
        Get a preview of what nail school is really like
      </span>
    </div>

  </div>

</div>

             {/* CTA Button */}
<div className="text-center">
  <button
    onClick={onStartQuiz}
    className="w-full md:w-[360px] mx-auto px-10 h-14 text-lg rounded-xl text-white font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
  >
    Take the Quiz →
  </button>
</div>

              {/* Trust / Reassurance */}
              <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-500">
                <span>✓ 100% free</span>
                <span>✓ No credit card required</span>
                <span>✓ Results in 90 seconds</span>
              </div>

            </div>

            {/* RIGHT SIDE — Visual */}
            <div className="relative flex justify-center">

              {/* Main Image Card */}
              <div className="relative w-full max-w-lg">

                <div className="rounded-3xl overflow-hidden shadow-2xl bg-white">
                  <img
                    src="/hero-nail-tech.png"
                    alt="Professional nail technician providing a manicure"
                    className="w-full h-[560px] object-cover"
                  />
                </div>

                {/* Floating Quiz Card */}
<div className="absolute -bottom-6 -left-4 md:-left-8 bg-white rounded-2xl shadow-xl px-6 py-4 max-w-[280px]">
                  <div className="flex items-center gap-3 mb-2">

                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <span className="text-xl">💅</span>
                    </div>

                    <div>
                      <p className="font-bold text-gray-900">
                        Nail Tech Career Fitness
                      </p>

                      <p className="text-sm text-gray-500">
                        Quiz
                      </p>
                    </div>

                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    Find out if you're ready before investing in nail school.
                  </p>

                </div>

                {/* Small Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full shadow-lg px-5 py-3">
                  <p className="text-sm font-semibold text-pink-600">
                    90 seconds
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

{/* Nail Tech Blueprint Promotional Banner */}
<section className="w-full py-6 px-4 bg-gradient-to-r from-purple-50/50 via-pink-50/60 to-purple-50/50">

  {/* Advertisement Label */}
  <div className="flex items-center justify-center gap-3 mb-3">
    <div className="h-px flex-1 bg-purple-200/60"></div>

    <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">
      Ready to Commit?
    </span>

    <div className="h-px flex-1 bg-purple-200/60"></div>
  </div>

  {/* Promotional Banner */}
  <div className="max-w-7xl mx-auto bg-white border border-purple-100 rounded-2xl shadow-sm overflow-hidden">

    <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 py-4">

      {/* Product Placeholder */}
      <div className="w-24 h-20 sm:w-32 sm:h-24 md:w-40 md:h-28
                      rounded-xl
                      bg-gradient-to-br from-purple-100 to-pink-100
                      flex items-center justify-center
                      flex-shrink-0">

        <div className="text-center">
          <div className="w-12 h-14 sm:w-16 sm:h-18 mx-auto
                          bg-white rounded-md shadow-sm
                          flex items-center justify-center">

            <span className="text-[9px] sm:text-[11px] font-semibold
                             text-purple-500 leading-tight px-1">
              NAIL TECH
              <br />
              BLUEPRINT
            </span>

          </div>
        </div>

      </div>

      {/* Product Copy */}
      <div className="flex-1 min-w-0">

        <span className="text-[9px] uppercase tracking-[0.18em] text-purple-400">
          Your Next Step
        </span>

        <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 mt-1">
          The Nail Tech Blueprint
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
          A step-by-step roadmap to help you start, prepare, and build your
          nail-tech career with confidence.
        </p>

        <div className="flex items-center gap-3 mt-2">

          <span className="text-sm sm:text-base font-semibold text-gray-800">
            $99
          </span>

          <span className="hidden sm:inline text-[11px] text-gray-400">
            Complete Career Roadmap
          </span>

        </div>

      </div>

      {/* CTA */}
      <div className="flex-shrink-0">

        <button
          onClick={() => {
            // Add your Blueprint checkout/link here
          }}
          className="px-4 sm:px-6 py-2.5 sm:py-3
                     rounded-full
                     bg-gradient-to-r from-purple-400 to-pink-400
                     text-white text-xs sm:text-sm
                     font-medium
                     shadow-sm
                     hover:opacity-90
                     transition"
        >
          Get the Blueprint
        </button>

      </div>

    </div>

  </div>

  <p className="text-center text-[9px] text-gray-400 mt-2 tracking-wide">
    NAIL TECH BLUEPRINT
  </p>

</section>

      {/* REALITY SECTION */}
      <section className="py-4 md:py-6 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">

          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-6">

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              The Reality of Becoming a Nail Tech
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              A quick look at what you should know before committing your time,
              money, and energy to nail school.
            </p>

          </div>


          {/* Reality Cards */}
          <div className="grid md:grid-cols-3 gap-4">

            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">

              <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-3">
                33%
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Fail Their First Licensing Exam
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Passing state licensing exam isn't guaranteed, even after finishing school.
              </p>

            </div>


            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">

              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-3">
                12–24
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Months to build your clientele
              </h3>

              <p className="text-gray-600 leading-relaxed">
                A license gets you started. Building a steady clientele takes time.
              </p>

            </div>


            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">

              <div className="text-4xl md:text-5xl mb-3">
                ⚡
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Burnout is real
              </h3>

              <p className="text-gray-600 leading-relaxed">
               Research shows that the physical, mental, and financial demands can add up quickly
                
              </p>

            </div>

          </div>


          {/* Supporting Message + CTA */}
          <div className="text-center max-w-3xl mx-auto mt-6">

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
              This isn't about scaring you. It's about making sure you go in
              <span className="font-bold text-pink-600">
                {" "}prepared to WIN.
              </span>
            </p>

            <button
              onClick={onRealityBreakdown}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              Access the Free Reality Breakdown →
            </button>

          </div>

        </div>
      </section>


{/* FEATURED PRODUCTS / SHOPPING CAROUSEL */}

<section className="py-3 px-2 bg-gradient-to-r from-purple-50/60 via-pink-50/70 to-purple-50/60 border-y border-purple-100/70">

  <div className="max-w-7xl mx-auto">

    {/* Section Label */}

    <div className="flex items-center gap-3 mb-3">

      <div className="h-px flex-1 bg-purple-200/60"></div>

      <span className="text-[10px] tracking-[0.25em] uppercase text-purple-400 font-medium">
        Featured
      </span>

      <div className="h-px flex-1 bg-purple-200/60"></div>

    </div>


    {/* Product Container */}

    <div className="rounded-2xl bg-white/90 border border-purple-100 shadow-sm p-3 md:p-4">

      {/* Header */}

      <div className="flex items-center justify-between mb-2">

        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-800">
            Nail Tech Essentials
          </h3>

        </div>

        <span className="hidden sm:block text-xs text-gray-400">
          Shop products for your nail journey
        </span>

      </div>


      {/* Carousel */}

      <div className="flex items-center gap-2">

        {/* LEFT ARROW */}

        <button
          onClick={() => {
            document.getElementById("product-scroll")?.scrollBy({
              left: -320,
              behavior: "smooth"
            });
          }}
          className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white border border-purple-100 text-purple-400 shadow-sm flex items-center justify-center hover:bg-purple-50 transition"
          aria-label="Previous products"
        >
          ←
        </button>


        {/* PRODUCTS */}

        <div
        ref={productScrollRef}
          id="product-scroll"
          className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory flex-1"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }}
        >

          {products.map((product) => (

            <div
              key={product.name}
              className="min-w-[190px] md:min-w-[23.5%] snap-start bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
            >

              {/* PRODUCT DISPLAY */}

              <div className="h-40 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">

                {product.iconStyle === "circle" && (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                    <span className="text-purple-500 text-xl">
                      {product.icon}
                    </span>
                  </div>
                )}

                {product.iconStyle === "polish" && (
                  <div className="flex gap-1">
                    <div className="w-7 h-14 rounded-full bg-pink-200"></div>
                    <div className="w-7 h-16 rounded-full bg-purple-200"></div>
                    <div className="w-7 h-12 rounded-full bg-fuchsia-200"></div>
                  </div>
                )}

                {product.iconStyle === "kit" && (
                  <div className="w-20 h-12 rounded-lg bg-gradient-to-r from-purple-200 to-pink-200 flex items-center justify-center">
                    <span className="text-purple-500 text-xs font-semibold">
                      {product.icon}
                    </span>
                  </div>
                )}

                {product.iconStyle === "brushes" && (
                  <div className="flex gap-2">
                    <div className="w-2 h-16 bg-purple-300 rounded-full rotate-[-15deg]"></div>
                    <div className="w-2 h-16 bg-pink-300 rounded-full"></div>
                    <div className="w-2 h-16 bg-fuchsia-300 rounded-full rotate-[15deg]"></div>
                  </div>
                )}

                {product.iconStyle === "tips" && (
                  <div className="w-20 h-14 rounded-md bg-white border-2 border-pink-200 flex items-center justify-center">
                    <span className="text-xs text-pink-400 font-semibold">
                      {product.icon}
                    </span>
                  </div>
                )}

                {product.iconStyle === "lamp" && (
                  <div className="w-20 h-12 rounded-xl bg-purple-200 flex items-center justify-center">
                    <span className="text-purple-500 text-xs font-bold">
                      {product.icon}
                    </span>
                  </div>
                )}

              </div>


              {/* PRODUCT INFO */}

              <div className="p-2">

                <h4 className="font-semibold text-sm text-gray-800">
                  {product.name}
                </h4>

                <div className="flex items-center justify-between mt-2">

                  <span className="font-semibold text-sm text-purple-500">
                    {product.price}
                  </span>

                  <button className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xs font-medium hover:opacity-90 transition">
                    Shop Now
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* RIGHT ARROW */}

        <button
          onClick={() => {
            document.getElementById("product-scroll")?.scrollBy({
              left: 320,
              behavior: "smooth"
            });
          }}
          className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white border border-purple-100 text-purple-400 shadow-sm flex items-center justify-center hover:bg-purple-50 transition"
          aria-label="Next products"
        >
          →
        </button>

      </div>


      {/* Bottom Label */}

      <div className="text-center mt-3 pt-2 border-t border-gray-100">

        <span className="text-[9px] tracking-[0.2em] uppercase text-gray-400">
           Resources for Your Growth • Curated for Every Step 
        </span>

      </div>

    </div>

  </div>

</section>

      {/* TESTIMONIALS */}
      <section className="py-12 px-2 mb-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-center text-xl md:text-2xl mb-5 text-gray-600">
            What Others Are Saying
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-700 mb-3 leading-relaxed">
                "This literally saved me from making a $5K mistake. I thought I
                was ready but the quiz showed me I needed to save more first."
              </p>

              <p className="text-sm font-medium">— Jasmine, 23, Atlanta</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-700 mb-3 leading-relaxed">
                "I scored Ready and it gave me so much confidence. Enrolled 2
                weeks later and I'm so glad I went for it."
              </p>

              <p className="text-sm font-medium">— Maria, 26, Houston</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-700 mb-3 leading-relaxed">
                "Honestly didn't expect much from a free quiz but wow. Knowing
                the real costs upfront changed everything for me."
              </p>

              <p className="text-sm font-medium">— Keyanna, 21, Phoenix</p>
            </div>
          </div>
        </div>
      </section>


      {/* FINAL CTA */}
      <section className="py-8 px-4 bg-gradient-to-b from-purple-600 to-pink-600 text-white">

        <div className="max-w-xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl mb-3">
            Get Clarity Before You Commit
          </h2>

          <p className="text-xl mb-5 text-purple-100">
            90 seconds now could save you thousands of dollars and months of
            uncertainty.
          </p>

          <style>{`
            @keyframes textPulse {
              0%, 100% {
                opacity: 0.70;
              }

              50% {
                opacity: 1;
              }
            }
          `}</style>

          <button
            onClick={onStartQuiz}
            className="w-full h-14 text-lg rounded-lg mb-1 font-bold active:scale-95 transition-transform"
            style={{
              color: "#BE185D",
              background:
                "linear-gradient(135deg, #FBCFE8 0%, #F9A8D4 50%, #FBCFE8 100%)",
              animation: "textPulse 1.6s ease-in-out infinite",
            }}
          >
            See If I'm Ready
          </button>

          <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-white text-center">
            <span>✓ Your Info is safe</span>
            <span>✓ We respect your privacy</span>
            <span>✓ Unsubscribe anytime</span>
          </div>
        </div>
      </section>


      {/* MOBILE BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg md:hidden z-50">

        <button
          onClick={onStartQuiz}
          className="w-full h-12 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold"
        >
          Get My Free Career Score
        </button>

      </div>

    </div>
    </>
  );
}