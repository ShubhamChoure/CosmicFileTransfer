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
                <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text" 
                  style={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  background: "linear-gradient(to right, #60A5FA, #34D399, #A78BFA)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  textShadow: "0 0 30px rgba(96, 165, 250, 0.3)"
                  }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Project By
              </motion.h1>
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text" 
                  style={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  background: "linear-gradient(to right, #F472B6, #818CF8, #34D399)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  textShadow: "0 0 30px rgba(244, 114, 182, 0.3)"
                  }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1, duration: 1 }}
                >
                  Shubham Chour
                </motion.h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
}