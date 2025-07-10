// src/App.jsx
import React, { useState } from 'react';
import stringSimilarity from 'string-similarity';

function App() {
  const [query, setQuery] = useState('');
  const [showPdf, setShowPdf] = useState(false);

  const mockDatabase = [
    {
      question: "motor accident claim where the deceased was self-employed and aged 54–55",
      answer: "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased’s annual income should be added as future prospects.",
      citations: [
        {
          text: "“…as the age of the deceased was held to be about 54-55 years by the learned Tribunal, being self-employed, 10% of annual income should have been awarded on account of future prospects.” (Para 7)",
          source: "Dani_Devi_v_Pritam_Singh.pdf",
          link: "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz",
        },
      ],
    },
    {
      question: "limitation period to file a consumer complaint",
      answer: "Under the Consumer Protection Act, the limitation period for filing a consumer complaint is two years from the date of the cause of action.",
      citations: [
        {
          text: "“The complaint must be filed within two years of the cause of action as per Section 24A of the Consumer Protection Act.”",
          source: "Consumer_Protection_Law.pdf",
          link: "/mockpdfs/Consumer_Protection_Law.pdf",
        },
      ],
    },
    {
      question: "minor be a party to a contract",
      answer: "No, under Indian Contract Act, a contract with a minor is void ab initio. A minor lacks the legal capacity to enter into a valid contract.",
      citations: [
        {
          text: "“…a contract with a minor is void and cannot be enforced against him.” - Mohori Bibee v. Dharmodas Ghose",
          source: "Contract_Case_Law.pdf",
          link: "/mockpdfs/Contract_Case_Law.pdf",
        },
      ],
    },
    {
      question: "fir be quashed by the high court",
      answer: "Yes, the High Court can quash an FIR under Section 482 of the CrPC if the allegations do not disclose a cognizable offence.",
      citations: [
        {
          text: "“High Court may exercise its inherent powers to quash FIRs under Section 482 CrPC to prevent abuse of the process of law.”",
          source: "CrPC_Quash_FIR.pdf",
          link: "/mockpdfs/CrPC_Quash_FIR.pdf",
        },
      ],
    },
    {
      question: "rights of arrested person in india",
      answer: "An arrested person has rights under Article 22 of the Constitution and Sections 50, 57, and 167 of CrPC including legal counsel and production before a magistrate within 24 hours.",
      citations: [
        {
          text: "“Every arrested person shall be informed of the grounds of arrest and has the right to consult a lawyer.” - Article 22(1)",
          source: "Rights_of_Arrestee.pdf",
          link: "/mockpdfs/Rights_of_Arrestee.pdf",
        },
      ],
    },
    {
      question: "wife claim maintenance after divorce",
      answer: "Yes, a divorced wife can claim maintenance under Section 125 of CrPC if she is unable to maintain herself and the husband has sufficient means.",
      citations: [
        {
          text: "“A divorced wife is entitled to maintenance unless she remarries.” - Section 125 CrPC",
          source: "Maintenance_After_Divorce.pdf",
          link: "/mockpdfs/Maintenance_After_Divorce.pdf",
        },
      ],
    },
    {
      question: "anticipatory bail",
      answer: "Anticipatory bail is granted under Section 438 of CrPC when a person anticipates arrest. It allows pre-arrest bail from the court.",
      citations: [
        {
          text: "“Section 438 CrPC provides for anticipatory bail if a person has reason to believe they may be arrested.”",
          source: "Anticipatory_Bail.pdf",
          link: "/mockpdfs/Anticipatory_Bail.pdf",
        },
      ],
    },
    {
      question: "tenant be evicted without notice",
      answer: "No, landlords must serve proper notice and follow due process as per Rent Control Acts before evicting a tenant.",
      citations: [
        {
          text: "“Eviction of tenant without following due legal process is invalid.”",
          source: "Eviction_Laws.pdf",
          link: "/mockpdfs/Eviction_Laws.pdf",
        },
      ],
    },
    {
      question: "live-in relationship legally recognized",
      answer: "Yes, the Supreme Court has held that live-in relationships are legal and protected under Article 21 of the Constitution.",
      citations: [
        {
          text: "“Live-in relationships are recognized under Article 21 as part of the right to life and liberty.”",
          source: "LiveIn_Rights.pdf",
          link: "/mockpdfs/LiveIn_Rights.pdf",
        },
      ],
    },
    {
      question: "police arrest without warrant in india",
      answer: "Yes, police can arrest without a warrant in cognizable offences under Section 41 of CrPC, but safeguards must be followed.",
      citations: [
        {
          text: "“Police may arrest without warrant in cognizable offences, subject to reasonable belief and necessity.” - Section 41 CrPC",
          source: "Police_Arrest_Powers.pdf",
          link: "/mockpdfs/Police_Arrest_Powers.pdf",
        },
      ],
    },
  ];

  // Match the closest question
  const getBestMatch = () => {
    if (!query.trim()) return null;
    const questions = mockDatabase.map((q) => q.question);
    const { bestMatchIndex, bestMatch } = stringSimilarity.findBestMatch(query.toLowerCase(), questions);
    return bestMatch.rating > 0.3 ? mockDatabase[bestMatchIndex] : null; // threshold for relevance
  };

  const matched = getBestMatch();

  return (
    <div className="bg-gray-100 min-h-screen p-6 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-800">🧑‍⚖️ Lexi Legal Assistant</h1>

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

        {query && matched && (
          <div className="bg-white p-6 rounded-lg shadow border">
            <p className="text-gray-800 leading-relaxed">
              <strong>Answer:</strong> {matched.answer}
            </p>
            <div className="mt-4 text-sm">
              <p className="italic text-gray-600 mb-1">Citation:</p>
              <button
                onClick={() => setShowPdf(true)}
                className="text-blue-600 underline hover:text-blue-800"
              >
                {matched.citations[0].text}
              </button>
              <div className="mt-2">
                <a
                  href={matched.citations[0].link}
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

        {query && !matched && (
          <div className="bg-white p-6 rounded shadow text-gray-600 italic text-center">
            No relevant legal information found. Please rephrase your question.
          </div>
        )}

        {showPdf && matched && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-3/4 h-4/5 p-4 rounded shadow-lg relative">
              <button
                onClick={() => setShowPdf(false)}
                className="absolute top-2 right-2 text-red-600 font-bold text-xl"
              >
                ×
              </button>
              <iframe
                src={matched.citations[0].link}
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
