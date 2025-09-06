import React from "react";
import { motion } from "framer-motion";
import advayuLogo from "@/assets/advayuClubLogo.png";

const container = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const child = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Content = () => {
  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="animate"
      className="lg:ml-0 space-y-8 pt-4 ">
      {/* logo */}
      <motion.div variants={child}>
        <img
          src={advayuLogo}
          alt="Advayu logo"
          className="w-48 h-auto"
        />
      </motion.div>
      {/* tagline */}
      <motion.div variants={child} className="md:text-3xl text-xl font-sm text-gray-700">
        <span className="font-bold"> Built </span> into where{" "}
        <span className="font-bold">
          money moves, <br /> Designed{" "}
        </span>
        for those
        <span className="font-bold"> who move it.</span>
      </motion.div>
    </motion.div>
  );
};

export default Content;