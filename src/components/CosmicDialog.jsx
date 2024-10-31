'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function CosmicDialog({ randomNumber,show,dialogToggle }) {
  const [showDialog, setShowDialog] = useState(show);
  const [stars, setStars] = useState([])

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
    }))
    setStars(newStars)
  }, [])
  useEffect(() => {
    setShowDialog(show); // Update state when the show prop changes
  }, [show]);

  return (
    <Dialog open={showDialog} onOpenChange={dialogToggle}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-purple-900 to-indigo-900 border-none text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
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
                opacity: [0.2, 0.8, 0.2],
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
        <DialogHeader className="relative z-10">
          <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200">
            Cosmic Upload Success!
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Your file has been beamed across the digital universe. Here's your cosmic identifier:
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 relative z-10">
          <div className="flex items-center justify-center">
            <motion.span 
              className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-red-400"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {randomNumber}
            </motion.span>
          </div>
        </div>
        <Button 
          onClick={() => dialogToggle()}
          className="relative z-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          Close Portal
        </Button>
      </DialogContent>
    </Dialog>
  )
}
