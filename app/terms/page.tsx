"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-700 transition mb-8"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Назад</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-8">
            <FileText size={16} /> Услови за користење
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-gray-900">
            Услови на <span className="text-blue-700">заедницата</span>.
          </h1>

          <p className="text-lg md:text-xl font-medium text-gray-600 mb-12 max-w-2xl">
            Со користење на Studentarija MK, вие се согласувате со овие правила.
            Ве молиме прочитајте ги внимателно.
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
              <AlertCircle size={24} className="text-red-600" />
              Прифатливо однесување
            </h2>
            <p className="text-gray-700 mb-6">
              Нашата платформа е место за поддршка и информирање. Строго е
              забрането:
            </p>
            <ul className="space-y-3 ml-6">
              <li className="flex gap-3">
                <span className="text-red-600 font-bold shrink-0">•</span>
                <span>Објавување лажни вести или дезинформации.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold shrink-0">•</span>
                <span>Навредлив јазик или дискриминација во коментарите.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold shrink-0">•</span>
                <span>Обиди за хакирање или преоптоварување на системот.</span>
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
              <CheckCircle size={24} className="text-blue-700" />
              Одговорност за содржината
            </h2>
            <p className="text-gray-700">
              Информациите за стипендии, превоз (ЈСП) и сместување се преземени
              од официјални извори. Studentarija MK не е одговорна за ненадејни
              промени направени од институциите (МОН, факултети итн.).
            </p>
          </motion.section>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-blue-50 p-8 border-2 border-blue-200 italic text-sm"
          >
            Studentarija MK го задржува правото да ги промени овие услови во
            било кое време. Промените стапуваат на сила веднаш по нивното
            објавување.
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
