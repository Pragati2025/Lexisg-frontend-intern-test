// src/App.jsx
import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [showPdf, setShowPdf] = useState(false);

  const response = {
    answer:
      'Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased’s annual income should be added as future prospects.',
    citations: [
      {
        text:
          '“...as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.” (Para 7 of the document)',
        source: 'Dani_Devi_v_Pritam_Singh.pdf',
        link: 'https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz',
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-blue-800">🧑‍⚖️ Lexi Legal Assistant</h1>

        {/* User Query Input */}
        <div className="bg-white p-4 rounded-lg shadow">
          <textarea
            className="w-full p-3 border rounded text-gray-700"
            rows={4}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a legal question..."
          />
          <button
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={() => setShowPdf(false)}
          >
            Submit
          </button>
        </div>

        {/* Chat-style Response */}
        {query && (
          <div className="bg-white p-6 rounded-lg shadow border">
            {/* Simulated Answer */}
            <div className="mb-4">
              <p className="text-gray-800 leading-relaxed">
                <strong>Answer:</strong> {response.answer}
              </p>
            </div>

            {/* Citation */}
            <div className="mt-4 text-sm">
              <p className="italic text-gray-600 mb-1">Citation:</p>
              <button
                onClick={() => setShowPdf(true)}
                className="text-blue-600 underline hover:text-blue-800"
              >
                {response.citations[0].text}
              </button>

              <div className="mt-2">
                <a
                  href={response.citations[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 underline hover:text-green-900"
                >
                  📄 Download PDF
                </a>
              </div>
            </div>
          </div>
        )}

        {/* PDF Modal */}
        {showPdf && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-3/4 h-4/5 p-4 rounded shadow-lg relative">
              <button
                onClick={() => setShowPdf(false)}
                className="absolute top-2 right-2 text-red-600 font-bold text-xl"
              >
                ×
              </button>
              <iframe
                src={response.citations[0].link}
                className="w-full h-full"
                title="PDF Viewer"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
