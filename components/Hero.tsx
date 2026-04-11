import React from "react";

export default function Hero() {
  return (
    <section className="px-4 md:px-8 py-4 h-[calc(100vh-4rem)]">
      <div className="relative w-full h-full bg-[#f3f6f4] rounded-[45px] overflow-hidden flex flex-col md:flex-row">
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#22c55e] opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-56 h-56 bg-[#014d2c] opacity-5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex-1 p-8 md:p-14 flex flex-col justify-center z-10">
          <div className="inline-flex items-center gap-2 bg-white border border-[#e2e8f0] rounded-full px-4 py-1.5 text-sm font-semibold text-[#166534] shadow-sm w-fit mb-6">
            <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
            Платформа за студенти во Македонија
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a1a1a] leading-[1.1] tracking-tight">
            Се што им <br />е{" "}
            <span className="relative inline-block">
              <span className="text-[#22c55e]">потребно</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 6 Q100 0 200 6"
                  stroke="#22c55e"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </span>
            <br />
            на студентите
          </h1>

          <p className="mt-4 text-gray-500 text-base md:text-lg max-w-md leading-relaxed">
            Стипендии, сместување, настани, попусти и многу повеќе &mdash;
            твојот краен водич низ академскиот живот во Македонија.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="group flex items-center gap-2 bg-[#014d2c] text-white px-7 py-3 rounded-full font-bold text-base hover:bg-[#013d22] hover:shadow-xl hover:scale-105 transition-all duration-200">
              Истражи сега
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            <button className="flex items-center gap-2 bg-white text-gray-900 px-7 py-3 rounded-full font-bold text-base border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
              Најнови информации
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#a7f3d0", "#6ee7b7", "#34d399", "#10b981"].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              <span className="font-bold text-[#1a1a1a]">10,000+</span> студенти
              го користат секој ден
            </p>
          </div>
        </div>

        <div className="flex-1 relative min-h-[300px] md:min-h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-[#f3f6f4] via-[#f3f6f4]/20 to-transparent z-10 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f3f6f4]/60 to-transparent z-10 md:hidden" />
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
            alt="Студенти кои соработуваат"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute top-8 right-6 z-20 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 border border-[#e2e8f0]">
            <div className="w-10 h-10 bg-[#dcfce7] rounded-xl flex items-center justify-center text-xl">
              🎓
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">
                Активни следбеници
              </p>
              <p className="text-lg font-extrabold text-[#014d2c]">60k+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
