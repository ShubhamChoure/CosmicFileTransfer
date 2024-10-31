"use client"
import { useEffect,useState } from "react";
import {motion,AnimatePresence} from "framer-motion";
import { StarField } from '@/components/StarField';
import { Meteor } from "./Meteor";
export const IntroAnimation = ({ onComplete }) => {
    const [showContent, setShowContent] = useState(true)
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowContent(false)
      }, 5000) // Start fade-out after 5 seconds
  
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
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200" 
                style={{ fontFamily: "'Orbitron', sans-serif" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Project By
              </motion.h1>
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-red-400" 
                style={{ fontFamily: "'Orbitron', sans-serif" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1, duration: 1 }}
              >
                Shubham Choure
              </motion.h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }