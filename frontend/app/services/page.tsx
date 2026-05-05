"use client";

import { motion } from "framer-motion";
import { services } from "../libs/services";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 20,
    },
  },
};

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden text-gray-400">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(224,35,78,0.15),transparent_60%)] blur-3xl animate-gradient-slow opacity-20"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-96 h-96 bg-[#E0234E]/20 rounded-full animate-blob top-[-10%] left-[-10%] absolute" />
        <div className="w-80 h-80 bg-[#ff194f]/20 rounded-full animate-blob top-[70%] left-[60%] absolute" />
      </div>

      {/* Services content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-5xl font-bold text-[#E0234E] mb-12">
          Our Services
        </h1>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-3xl p-8 flex flex-col items-center text-center cursor-pointer"
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px #E0234E",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="mb-6">{service.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h2>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Services;
