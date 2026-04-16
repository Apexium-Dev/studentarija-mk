"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-700 transition mb-8"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Назад</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-green-700 mb-8">
            <ShieldCheck size={16} /> Политика за приватност
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-gray-900">
            Вашата <span className="text-green-700">безбедност</span> е наш
            приоритет.
          </h1>

          <p className="text-lg md:text-xl font-medium text-gray-600 mb-12 max-w-2xl">
            Оваа политика објаснува како Studentarija MK ги собира, користи и
            заштитува вашите податоци кога ја користите нашата платформа.
          </p>
        </motion.div>

        <div className="space-y-12 text-gray-700 leading-relaxed">
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-green-700 font-black">1.</span>
              Податоци што ги собираме
            </h2>
            <p className="text-gray-700 mb-6">
              Кога се регистрирате или се претплатувате на нашиот билтен,
              собираме само неопходни информации:
            </p>
            <ul className="space-y-3 ml-6">
              <li className="flex gap-3">
                <span className="text-green-700 font-bold flex-shrink-0">
                  •
                </span>
                <span>
                  <strong>Е-пошта:</strong> За известувања и автентикација.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-700 font-bold flex-shrink-0">
                  •
                </span>
                <span>
                  <strong>Профилни податоци:</strong> Име и факултет (доколку ги
                  внесете).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-700 font-bold flex-shrink-0">
                  •
                </span>
                <span>
                  <strong>Податоци за користење:</strong> Анонимни статистики за
                  тоа кои статии се најчитани.
                </span>
              </li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-green-700 font-black">2.</span>
              Како ги чуваме податоците?
            </h2>
            <p className="text-gray-700">
              Вашите податоци се чуваат на безбедни сервери преку{" "}
              <strong>Supabase (PostgreSQL)</strong>. Користиме енкрипција за
              сите лозинки и чувствителни информации. Никогаш не ги продаваме
              вашите податоци на трети страни.
            </p>
          </motion.section>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-green-50 p-8 border-2 border-green-200"
          >
            <div className="flex gap-3">
              <Lock size={24} className="text-green-700 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Право на бришење
                </h3>
                <p className="text-sm text-gray-700">
                  Во секое време можете да побарате целосно бришење на вашиот
                  профил и сите поврзани податоци со испраќање порака до нашиот
                  тим.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
