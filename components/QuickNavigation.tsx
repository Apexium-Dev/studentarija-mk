import React from "react";
import Link from "next/link";

const categories = [
  {
    id: 1,
    icon: "🎓",
    title: "Стипендии",
    href: "/scholarships",
    color: "bg-yellow-50 group-hover:bg-yellow-100",
  },
  {
    id: 2,
    icon: "🏠",
    title: "Студентски домови",
    href: "/dorms",
    color: "bg-blue-50 group-hover:bg-blue-100",
  },
  {
    id: 3,
    icon: "🚌",
    title: "ЈСП",
    href: "/jsp",
    color: "bg-orange-50 group-hover:bg-orange-100",
  },
  {
    id: 4,
    icon: "🚇",
    title: "Транспорт",
    href: "/transport",
    color: "bg-purple-50 group-hover:bg-purple-100",
  },
  {
    id: 5,
    icon: "📅",
    title: "Настани",
    href: "/events",
    color: "bg-pink-50 group-hover:bg-pink-100",
  },
  {
    id: 6,
    icon: "📄",
    title: "Документи",
    href: "/documents",
    color: "bg-cyan-50 group-hover:bg-cyan-100",
  },
  {
    id: 7,
    icon: "❓",
    title: "FAQ",
    href: "/faq",
    color: "bg-green-50 group-hover:bg-green-100",
  },
];

export default function QuickNavigation() {
  return (
    <section className="px-4 md:px-8 py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-[#1a1a1a]">
          Брза навигација
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Најди го точно тоа што ти е потребно
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="group bg-white border border-[#e2e8f0] rounded-[20px] p-4 flex flex-col items-center justify-center gap-3 transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${cat.color} bg-gray-50`}
            >
              <span className="text-2xl">{cat.icon}</span>
            </div>
            <span className="text-xs font-bold text-gray-700 text-center leading-tight">
              {cat.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
