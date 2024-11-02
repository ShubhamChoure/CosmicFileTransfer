"use client"
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarField } from '@/components/StarField';
import { Meteor } from "./Meteor";

export const IntroAnimation = ({ onComplete }) => {
    const [showContent, setShowContent] = useState(true)
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowContent(false)
      }, 5000)
  
      return () => clearTimeout(timer)
    }, [])
  
    return (
      <AnimatePresence onExitComplete={onComplete}>
        {showContent && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <StarField />
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              style={{
                background: "radial-gradient(circle, rgba(147,51,234,0.2) 0%, rgba(79,70,229,0.1) 50%, rgba(0,0,0,0) 100%)",
              }}
            />
            {[...Array(10)].map((_, i) => (
              <Meteor key={i} delay={i * 0.5} />
            ))}
            <motion.div
              className="text-center z-10 relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1 }}
            >
              <motion.div className="space-y-4">
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter mb-4"
                  style={{ 
                    fontFamily: "'Clash Display', sans-serif",
                    background: "linear-gradient(to right, #6366f1, #a855f7, #ec4899)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 40px rgba(99, 102, 241, 0.5)"
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    delay: 0.5, 
                    duration: 1,
                    type: "spring",
                    stiffness: 100 
                  }}
                >
                  Project By
                </motion.h1>
                <motion.h2 
                  className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight"
                  style={{ 
                    fontFamily: "'Clash Display', sans-serif",
                    background: "linear-gradient(to right, #22d3ee, #818cf8, #c084fc)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 40px rgba(34, 211, 238, 0.5)"
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    delay: 1, 
                    duration: 1,
                    type: "spring",
                    stiffness: 100 
                  }}
                >
                  Shubham Choure
                </motion.h2>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
}