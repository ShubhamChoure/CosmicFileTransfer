"use client"
import {motion} from "framer-motion";
export const Meteor = ({ delay = 0 }) => (
    <motion.div
      className="fixed z-10 w-1 h-1 bg-white rounded-full shadow-lg"
      style={{
        top: '-5%',
        left: '100%',
      }}
      animate={{
        top: ['0%', '100%'],
        left: ['100%', '-5%'],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: delay,
      }}
    />
  )