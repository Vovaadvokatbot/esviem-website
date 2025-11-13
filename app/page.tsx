"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-12 max-w-4xl w-full shadow-2xl"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl font-bold text-white text-center mb-6"
        >
          ESVIEM Consulting
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-gray-200 text-center mb-8 leading-relaxed"
        >
          Комплексні рішення для бізнесу: юридичний, фінансовий,
          будівельний та земельний консалтинг. 15+ років досвіду. Ми
          створюємо системи, що працюють.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
            Послуги
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all transform hover:scale-105">
            Контакти
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-gray-300 mt-8 text-sm"
        >
          Демоверсія для інвестора • Professional Consulting Hub
        </motion.p>
      </motion.div>
    </div>
  );
}