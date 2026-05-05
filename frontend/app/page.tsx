"use client";
import React from "react";
import { FaProjectDiagram, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import BackgroundAnimation from "./components/ui/BackgroundAnimation";
import Footer from "./components/Footer";

const Welcome: React.FC = () => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.8 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 120 },
    },
  };

  return (
    <div className="relative min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <BackgroundAnimation />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 sm:px-6 py-20 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Highlight Badge */}
        <motion.span
          className="mb-6 inline-block px-4 py-2 bg-[#bc002c] text-white font-semibold rounded-full"
          variants={itemVariants}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          CodeHive <span className="text-[lime] animate-ping">●</span>
        </motion.span>

        {/* Main Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] mx-auto"
          variants={itemVariants}
          initial={{ opacity: 0, y: -50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, type: "spring", stiffness: 100 },
          }}
        >
          Welcome to <span className="text-[#E0234E]">CodeHive</span> Web
          developer community
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-300 max-w-[90%] sm:max-w-xl md:max-w-2xl mx-auto mb-10 text-sm sm:text-base md:text-lg"
          variants={itemVariants}
        >
          Join our web developers community to exchange ideas, work on exciting
          projects, and enhance your skills alongside thousands of passionate
          developers worldwide.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-12"
          variants={itemVariants}
        >
          <button
            onClick={() => router.push("/rules")}
            className="flex items-center  cursor-pointer justify-center gap-2 bg-[#E0234E] hover:bg-[#ff194f] text-white px-6 py-3 rounded-xl font-semibold transition-transform duration-300 hover:scale-105 hover:-rotate-3 w-full sm:w-auto"
          >
            <FaShieldAlt /> Reading rules
          </button>

          <button
            onClick={() => router.push("/projects")}
            className="flex items-center  cursor-pointer justify-center gap-2 border border-[#E0234E] text-white hover:bg-[#ff194f] px-6 py-3 rounded-xl font-semibold transition-transform duration-300 hover:scale-105 hover:rotate-3 w-full sm:w-auto"
          >
            <FaProjectDiagram /> Explore Projects
          </button>
        </motion.div>

        {/* Developer Avatars */}
        <motion.div
          className="flex flex-col items-center"
          variants={itemVariants}
        >
          <motion.div
            className="flex flex-wrap justify-center -space-x-3 mb-2"
            variants={containerVariants}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-700 border-2 border-slate-900 overflow-hidden flex items-center justify-center"
                variants={itemVariants}
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                <img
                  src={`/nest.svg`}
                  alt={`Developer ${i}`}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ))}
            <motion.div
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#E0234E] border-2 border-slate-900 flex items-center justify-center text-xs sm:text-sm font-medium text-white"
              variants={itemVariants}
              whileHover={{ scale: 1.2, rotate: 5 }}
            >
              +2K
            </motion.div>
          </motion.div>
          <motion.p
            className="text-gray-300 text-xs sm:text-sm md:text-base"
            variants={itemVariants}
          >
            Join over <span className="text-white font-medium">2,000+</span>{" "}
            developers
          </motion.p>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Welcome;
