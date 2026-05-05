import {
  FaCloud,
  FaCode,
  FaLaptopCode,
  FaPalette,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

export const services = [
  {
    icon: <FaCode size={40} className="text-[#E0234E]" />,
    title: "Front-End Development",
    description:
      "We follow best practices to build attractive and fast interfaces using React and Tailwind CSS.",
  },
  {
    icon: <FaLaptopCode size={40} className="text-[#ff194f]" />,
    title: "Back-End Development",
    description:
      "We use Node.js and NestJS to develop powerful and secure APIs for efficient data management.",
  },
  {
    icon: <FaUsers size={40} className="text-pink-500" />,
    title: "Community & Support",
    description:
      "A community of developers to help with learning, projects, and sharing expertise.",
  },
  {
    icon: <FaCloud size={40} className="text-[#ff194f]" />,
    title: "Cloud Computing",
    description:
      "We leverage cloud technologies to deliver scalable and secure solutions for your data.",
  },
  {
    icon: <FaPalette size={40} className="text-pink-500" />,
    title: "UI/UX Design",
    description:
      "We design attractive and user-friendly interfaces with the best user experience practices.",
  },
  {
    icon: <FaShieldAlt size={40} className="text-[#E0234E]" />,
    title: "Performance & Security",
    description:
      "We enhance your site's performance and implement best security practices to protect user data.",
  },
];
