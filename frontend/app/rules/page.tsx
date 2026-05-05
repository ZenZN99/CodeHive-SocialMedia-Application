"use client";
import { FaExclamationTriangle, FaBan, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CommunityRules() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Community Rules & Guidelines
        </motion.h1>

        <motion.p
          className="text-gray-400 mb-10 text-lg leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Welcome to{" "}
          <span className="text-[#E0234E] font-semibold">CodeHive</span>. To
          ensure a safe, respectful, and professional environment for everyone,
          all users must strictly follow the rules outlined below.
        </motion.p>

        {/* Important Warning */}
        <motion.div
          className="bg-red-900/30 border border-red-700 rounded-2xl p-6 mb-12 flex gap-4 hover:scale-105 transition-transform cursor-pointer"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FaExclamationTriangle className="text-red-400 text-3xl mt-1" />
          <div>
            <h2 className="text-xl font-bold text-red-400 mb-2">
              Important Warning
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Violation of these rules may result in <b>temporary suspension</b>{" "}
              or
              <b> permanent account termination</b> without prior notice.
            </p>
          </div>
        </motion.div>

        {/* Rules Sections */}
        <section className="space-y-10">
          {[
            {
              title: "Respect Other Users",
              desc: "Any form of harassment, hate speech, discrimination, threats, or personal attacks is strictly prohibited.",
            },
            {
              title: "No Illegal or Harmful Content",
              desc: "Sharing content that is illegal, violent, sexually explicit, abusive, or promotes harmful behavior is forbidden.",
            },
            {
              title: "No Spam or Scam Activities",
              desc: "Spam messages, advertisements, phishing attempts, or scam links will result in immediate action.",
            },
            {
              title: "Privacy & Data Protection",
              desc: "Do not share personal information (yours or others), including passwords, private messages, or confidential data.",
            },
            {
              title: "Impersonation is Forbidden",
              desc: "Impersonating other users, developers, moderators, or administrators is strictly prohibited.",
            },
            {
              title: "Use Features Responsibly",
              desc: "Any attempt to exploit bugs, abuse features, or bypass system limitations will be treated as a serious violation.",
            },
          ].map((rule, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {idx + 1}. {rule.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{rule.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Administration */}
        <motion.div
          className="mt-16 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:scale-105 transition-transform cursor-pointer"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FaShieldAlt className="text-[#E0234E] text-2xl" />
            <h2 className="text-2xl font-bold text-white">
              Administration Rights
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed mb-4">
            The CodeHive administration team reserves the right to:
          </p>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Review reported content and user activity</li>
            <li>Restrict or suspend accounts violating the rules</li>
            <li>Permanently ban users in severe or repeated cases</li>
            <li>Modify these rules at any time to protect the community</li>
          </ul>
        </motion.div>

        {/* Zero Tolerance */}
        <motion.div
          className="mt-16 bg-black border border-red-700 rounded-2xl p-8 flex gap-4 hover:scale-105 transition-transform cursor-pointer"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FaBan className="text-red-500 text-4xl mt-1" />
          <div>
            <h2 className="text-2xl font-bold text-red-500 mb-3">
              Zero Tolerance Policy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Users who repeatedly violate these rules or commit severe offenses
              will be permanently banned from the platform without the
              possibility of appeal.
            </p>
          </div>
        </motion.div>

        <motion.p
          className="mt-16 text-center text-gray-500 text-sm"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          By using CodeHive, you agree to comply with all rules and guidelines
          listed above.
        </motion.p>
      </div>
    </div>
  );
}
