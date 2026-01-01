import { useState } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'

const DocumentUploader = ({ onProcessComplete, onError }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [fileName, setFileName] = useState(null)

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return
    
    const file = acceptedFiles[0]
    setFileName(file.name)
    setIsUploading(true)
    onError(null) // Clear previous errors

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(
        '/api/process-document/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout: 30000 // 30 second timeout
        }
      )
      
      onProcessComplete(response.data)
    } catch (error) {
      let errorMessage = "Failed to process document"
      if (error.response) {
        errorMessage = error.response.data.detail || errorMessage
      } else if (error.message) {
        errorMessage = error.message
      }
      onError({ message: errorMessage })
    } finally {
      setIsUploading(false)
      setFileName(null)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    maxSize: 10485760 // 10MB
  })

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-lg font-medium text-gray-900 mb-1">
            {isDragActive ? "Drop the file here..." : "Drag & drop a document"}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            or click to browse files
          </p>
          <p className="text-xs text-gray-400">
            Supports PDF, JPG, PNG (max 10MB)
          </p>
        </div>
      </div>

      {fileName && (
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h5a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-700 truncate max-w-xs">
              {fileName}
            </span>
          </div>
          {!isUploading && (
            <button 
              onClick={() => setFileName(null)}
              className="text-red-500 hover:text-red-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      )}

      <button
        onClick={() => document.getElementById('file-input').click()}
        disabled={isUploading || !fileName}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
          isUploading || !fileName
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {isUploading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing document...
          </span>
        ) : (
          "Process Document"
        )}
      </button>
    </div>
  )
}

export default DocumentUploader