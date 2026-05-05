"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
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

const About = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden text-gray-400">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(224,35,78,0.15),transparent_60%)] blur-3xl animate-gradient-slow opacity-20"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-96 h-96 bg-[#E0234E]/20 rounded-full animate-blob top-[-10%] left-[-10%] absolute" />
        <div className="w-80 h-80 bg-[#ff194f]/20 rounded-full animate-blob top-[70%] left-[60%] absolute" />
      </div>

      {/* About content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Text content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          variants={itemVariants}
        >
          <motion.h1
            className="text-5xl font-bold text-[#E0234E] mb-6"
            variants={itemVariants}
          >
            About CodeHive
          </motion.h1>
          <motion.p
            className="text-gray-300 text-lg mb-6 leading-relaxed max-w-xl"
            variants={itemVariants}
          >
            CodeHive is an all-in-one platform for developers where you can
            share your projects, learn new skills, and connect with other
            professionals. Our goal is to build a collaborative community that
            helps you grow as a developer and a creator.
          </motion.p>
          <motion.p
            className="text-gray-400 text-base max-w-xl"
            variants={itemVariants}
          >
            Join us now and take advantage of resources, tutorials, and
            practical projects that we provide to help you reach a professional
            level in programming.
          </motion.p>

          <motion.button
            onClick={() => router.push("/signup")}
            className="mt-8 px-8 py-4 bg-linear-to-r from-[#E0234E] to-[#ff194f] text-white font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-[0_0_25px_#E0234E] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#E0234E]/50"
            aria-label="Sign up now"
            variants={itemVariants}
          >
            Sign Up Now
          </motion.button>
        </motion.div>

        {/* codehive image */}
        <motion.div className="flex-1" variants={itemVariants}>
          <motion.img
            src="/logo.png"
            alt="CodeHive Logo"
            className="w-full max-w-md mx-auto rounded-3xl shadow-[0_0_40px_#E0234E]"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring" as const,
              stiffness: 120,
              damping: 20,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
