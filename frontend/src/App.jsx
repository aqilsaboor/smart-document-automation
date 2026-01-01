import { useState } from 'react'
import DocumentUploader from './components/DocumentUploader'
import ResultsViewer from './components/ResultsViewer'

function App() {
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const handleProcessingComplete = (data) => {
    setResults(data)
    setError(null)
  }

  const handleProcessingError = (err) => {
    setError(err.message || "Processing failed")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            SDAS - Smart Document Automation
          </h1>
          <div className="text-sm bg-indigo-800 px-3 py-1 rounded-full">
            Production Ready
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h5a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            Document Processor
          </h2>
          <p className="text-gray-600 mb-6">
            Upload business documents for automatic classification and data extraction. 
            Supports PDF, JPG, and PNG formats.
          </p>
          
          <DocumentUploader 
            onProcessComplete={handleProcessingComplete}
            onError={handleProcessingError}
          />
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r" role="alert">
            <p className="font-bold">Processing Error</p>
            <p>{error}</p>
          </div>
        )}

        {results && <ResultsViewer results={results} />}
      </main>

      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2026 SDAS - Enterprise Document Automation</p>
          <p className="text-sm mt-1">Production-grade AI automation system | 6+ years experience implementation</p>
        </div>
      </footer>
    </div>
  )
}

export default App