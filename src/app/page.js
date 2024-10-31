'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Download, FileText, CheckCircle, Rocket, AlertCircle } from 'lucide-react'
import CosmicDialog from '@/components/CosmicDialog'
import { StarField } from '@/components/StarField'
import { Meteor } from '@/components/Meteor'
import { IntroAnimation } from '@/components/IntroAnimation'
import { FileDownloadInfo } from '@/components/FileDownloadInfo'
import { Github, Linkedin, Mail } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function Component() {
  const [introComplete, setIntroComplete] = useState(false)
  const [downloadCode, setDownloadCode] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [randomNumber, setRandomNumber] = useState(0)
  const [downloadError, setDownloadError] = useState(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadingFileName, setDownloadingFileName] = useState("");
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const onDrop = useCallback(acceptedFiles => {
    setUploadedFile(acceptedFiles[0])
    setUploadComplete(false)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleDownload = async (e) => {
    e.preventDefault()
    setDownloadError(null)
    setIsDownloading(true)
    setDownloadingFileName('')
    console.log('Downloading with code:', downloadCode)
    
    try {
      const response = await axios.post("/api/get", { randomNumber: parseInt(downloadCode, 10) }, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const contentType = response.headers['content-type']
      const blob = new Blob([response.data], { type: contentType })

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      
      const contentDisposition = response.headers['content-disposition']
      let filename = 'downloaded-file'
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+?)"?(?:;|$)/)
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/[_\s"]+$/, '').replace(/^"/, '')
        }
      }
      link.download = filename
      setDownloadingFileName(filename)
      
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading file:', error)
      if (error.response) {
        if (error.response.status === 404) {
          setDownloadError("File not found. Please check your download code and try again.")
        } else {
          setDownloadError(`Server error: ${error.response.status}`)
        }
      } else if (error.request) {
        setDownloadError("No response from server. Please check your internet connection and try again.")
      } else {
        setDownloadError(`Error: ${error.message}`)
      }
    } finally {
      setTimeout(() => {
        setIsDownloading(false)
        setDownloadingFileName('')
      }, 3000) // Keep the download info visible for 3 seconds after completion
    }
  }

  const deleteOldFiles = async () => {
    try {
      const temp = await axios.get("/api/delete")
    } catch (e) {
      console.log(e)
    }
  }

  const handleUpload = async () => {
    if (uploadedFile) {
      setIsUploading(true)
      deleteOldFiles()
      const formData = new FormData()
      formData.append('file', uploadedFile)

      try {
        const response = await axios.post('/api/put', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        console.log('Upload successful:', response.data)
        setUploadComplete(true)
        setRandomNumber(response.data.fileData.randomNumber)
        setShowDialog(true)
      } catch (error) {
        console.error('Error uploading file:', error)
        // Display the error to the user
      } finally {
        setIsUploading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-indigo-900 p-4 sm:p-8 relative overflow-hidden">
      {!introComplete && <IntroAnimation onComplete={() => setIntroComplete(true)} />}
      <StarField />
      {[...Array(5)].map((_, i) => <Meteor key={i} delay={i * 2} />)}
      <AnimatePresence>
        {(introComplete) && (
          <motion.main
            className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="md:w-1/2 mb-8 md:mb-0 md:pr-8"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Cosmic File Transfer
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl mb-8">
                Beam your files across the digital universe - No login required!
              </p>
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Rocket className="text-white w-16 h-16 sm:w-24 sm:h-24" />
              </motion.div>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Tabs defaultValue="download" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-black bg-opacity-50 border border-indigo-500">
                  <TabsTrigger 
                    value="download" 
                    className="data-[state=active]:bg-indigo-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors"
                  >
                    Download
                  </TabsTrigger>
                  <TabsTrigger 
                    value="upload" 
                    className="data-[state=active]:bg-indigo-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors"
                  >
                    Upload
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="download">
                  <Card className="bg-black bg-opacity-50 border border-indigo-500">
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl font-semibold text-white flex items-center">
                        <Download className="mr-2 h-6 w-6 text-indigo-400" />
                        Download File
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleDownload} className="space-y-4">
                        <div>
                          <Label htmlFor="downloadCode" className="text-gray-300">Enter 6-digit code</Label>
                          <Input
                            id="downloadCode"
                            type="text"
                            placeholder="Enter 6-digit code"
                            value={downloadCode}
                            onChange={(e) => setDownloadCode(e.target.value)}
                            maxLength={6}
                            pattern="\d{6}"
                            required
                            className="mt-1 bg-gray-800 text-white border-indigo-700"
                          />
                        </div>
                        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isDownloading}>
                          <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                      </form>
                      <AnimatePresence>
                        {isDownloading && downloadingFileName && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4"
                          >
                            <FileDownloadInfo fileName={downloadingFileName} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {downloadError && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 text-red-400 flex items-center justify-center"
                        >
                          <AlertCircle className="mr-2 h-5 w-5" /> {downloadError}
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="upload">
                  <Card className="bg-black bg-opacity-50 border border-indigo-500">
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl font-semibold text-white flex items-center">
                        <Upload className="mr-2 h-6 w-6 text-indigo-400" />
                        Upload File
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center cursor-pointer transition-colors ${
                          isDragActive ? 'border-indigo-500 bg-indigo-900 bg-opacity-30' : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <input {...getInputProps()} />
                        {uploadedFile ? (
                          <p className="text-gray-300"><FileText className="inline mr-2" />{uploadedFile.name}</p>
                        ) : (
                          <p className="text-gray-400">Drag and drop a file here, or click to select a file</p>
                        )}
                      </div>
                      {uploadedFile && !uploadComplete && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Button onClick={handleUpload} className="mt-4 bg-indigo-600 hover:bg-indigo-700 w-full text-white" disabled={isUploading}>
                            {isUploading ? (
                              <>
                                <motion.div
                                  className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Upload className="mr-2 h-4 w-4" /> Upload File
                              </>
                            )}
                          </Button>
                        </motion.div>
                      )}
                      {uploadComplete && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 text-indigo-400 flex items-center justify-center"
                        >
                          <CheckCircle className="mr-2 h-5 w-5" /> File uploaded successfully!
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
      <CosmicDialog randomNumber={randomNumber} show={showDialog} dialogToggle={() => { setShowDialog(!showDialog) }} />
      <motion.div
        className="mt-8 text-center text-gray-400 absolute z-10 bottom-4 left-0 right-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex items-center justify-center space-x-4 mb-2">
          <a
            href="https://github.com/shubhamchoure"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/shubham-choure-01a6b6287/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <button
            onClick={() => setShowEmailDialog(true)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Show email"
          >
            <Mail className="h-5 w-5" />
          </button>
        </div>
        <p>&copy; 2024 Cosmic File Transfer. All rights reserved.</p>
      </motion.div>
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-md bg-black/90 border border-indigo-500 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Contact Email</DialogTitle>
            <DialogDescription className="text-gray-400">
              Feel free to reach out via email:
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 bg-gray-900/50 p-3 rounded-lg">
            <p className="text-indigo-400 flex-1 text-center">shubhamchoureps@gmail.com</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}