"use client"
import {motion} from "framer-motion";
import { useState,useEffect } from "react";
export const StarField = () => {
    const [stars, setStars] = useState([])
    useEffect(() => {
      const newStars = Array.from({ length: 200 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
      }))
      setStars(newStars)
    }, [])
  
    return (
      <div className="fixed inset-0 z-0">
        {stars.map((star, index) => (
          <motion.div
            key={index}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    )
  }