import React from 'react';
import { motion } from 'framer-motion';
import { FileDown } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export function FileDownloadInfo({ fileName }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mt-4 bg-indigo-900 bg-opacity-50 border border-indigo-400">
        <CardContent className="p-4 flex items-center space-x-4">
          <div className="flex-shrink-0">
            <FileDown className="h-6 w-6 text-indigo-400" />
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-sm font-medium text-indigo-100 truncate">
              Downloading: {fileName}
            </p>
            <div className="mt-1 relative">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-200 bg-opacity-25">
                <motion.div 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
