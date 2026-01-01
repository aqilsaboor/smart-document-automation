import { useState } from 'react'

const ResultsViewer = ({ results }) => {
  const [activeTab, setActiveTab] = useState('summary')
  
  // Format processing time
  const formatTime = (seconds) => {
    if (seconds < 1) return `${Math.round(seconds * 1000)}ms`
    return `${seconds.toFixed(2)}s`
  }

  // Get validation status badge
  const getValidationBadge = () => {
    if (results.requires_validation) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <svg className="-ml-1 mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Requires Validation
        </span>
      )
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <svg className="-ml-1 mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Processing Complete
      </span>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {['summary', 'fields', 'raw'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Processing Results</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Document ID: {results.document_id}
                </p>
              </div>
              {getValidationBadge()}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Classification
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Document Type:</span>
                    <span className="font-medium">{results.classification.document_type.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Confidence:</span>
                    <span className="font-medium">{(results.classification.confidence * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Performance
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Processing Time:</span>
                    <span className="font-medium">{formatTime(results.processing_time)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Fields Extracted:</span>
                    <span className="font-medium">{Object.keys(results.extracted_fields).length}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Export JSON
              </button>
              <button className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700">
                Send to Workflow
              </button>
            </div>
          </div>
        )}

        {activeTab === 'fields' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Extracted Fields</h3>
            <p className="text-sm text-gray-500 mb-4">
              Fields marked with ⚠️ require manual validation
            </p>
            
            <div className="space-y-3">
              {Object.entries(results.extracted_fields).map(([key, field]) => (
                <div 
                  key={key}
                  className={`p-4 rounded-lg border ${
                    field.confidence < 0.9 
                      ? 'border-yellow-300 bg-yellow-50' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900 capitalize">{key.replace('_', ' ')}</span>
                        {field.confidence < 0.9 && (
                          <span className="ml-2 text-yellow-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-gray-600 break-words max-w-prose">{field.value}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        field.confidence >= 0.95 ? 'text-green-600' :
                        field.confidence >= 0.9 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {(field.confidence * 100).toFixed(0)}% confidence
                      </div>
                      <button className="mt-1 text-xs text-indigo-600 hover:text-indigo-800">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'raw' && (
          <div className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-auto max-h-96">
            <pre className="text-sm">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResultsViewer