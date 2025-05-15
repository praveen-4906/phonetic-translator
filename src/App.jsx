import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [tolang, setTolang] = useState('Tamil');

  const [inputText, setInputText] = useState('');
  const [fromLang, setFromLang] = useState('Tamil');
  const [translatedToEnglish, setTranslatedToEnglish] = useState('');

  


  async function generateAnswer() {
    setAnswer('Generating...');
    const prompt = `Translate the following English sentence into a casual sentence in ${tolang}, using only ${tolang} words written in English letters. Do NOT include multiple versions. Only return ONE short and natural sentence that a native speaker would text their friend. No explanations. No English words unless they’re commonly used. Just one simple sentence. Sentence: "${question}"`;

    try {
      const response = await axios({
      
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_KEY}`,

        method: 'POST',
        data: {
          contents: [{ parts: [{ text: prompt }] }],
        },
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAnswer('Error generating. Please try again.');
      console.error(error);
    }
  }

  async function translateToEnglish() {
    setTranslatedToEnglish('Generating...');
    const prompt = `The following sentence is written in phonetic ${fromLang}, using English letters. Please translate it into simple English so it’s easy to understand. Only return the English sentence without explanations.

Sentence: "${inputText}"`;

    try {
      const response = await axios({
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_KEY}`,
        method: 'POST',
        data: {
          contents: [{ parts: [{ text: prompt }] }],
        },
      });

      setTranslatedToEnglish(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setTranslatedToEnglish('Error generating. Please try again.');
      console.error(error);
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-4 md:px-8" style={{ height: '64px' }}>
        <div className="flex items-center h-full text-xl font-semibold">Phonetic Translator</div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
          {/* English to Phonetic */}
          <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-1/2">
            <h2 className="text-xl font-bold mb-4 text-blue-500">English to Phonetic</h2>

            <label className="block font-medium text-gray-700 mb-1">Input Text:</label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              style={{ resize: 'none' }}
            />

            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-700 font-medium">Translate to:</span>
              <select
                value={tolang}
                onChange={(e) => setTolang(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Hindi">Hindi</option>
                <option value="Kannada">Kannada</option>
              </select>
              <button
                onClick={generateAnswer}
                className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
              >
                Translate
              </button>
            </div>

            <label className="block font-medium text-gray-700 mb-1">Output Text:</label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mb-2"
              value={answer}
              readOnly
              rows={4}
              style={{ resize: 'none' }}
            />
            <button
              onClick={() => copyToClipboard(answer)}
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
            >
              Copy
            </button>
          </div>

          {/* Phonetic to English */}
          <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-1/2">
            <h2 className="text-xl font-bold mb-4 text-blue-500">Phonetic to English</h2>

            <label className="block font-medium text-gray-700 mb-1">Input Text:</label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
              style={{ resize: 'none' }}
            />

            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-700 font-medium">Translate from:</span>
              <select
                value={fromLang}
                onChange={(e) => setFromLang(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Hindi">Hindi</option>
                <option value="Kannada">Kannada</option>
              </select>
              <button
                onClick={translateToEnglish}
                className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
              >
                Translate
              </button>
            </div>

            <label className="block font-medium text-gray-700 mb-1">Output Text:</label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mb-2"
              value={translatedToEnglish}
              readOnly
              rows={4}
              style={{ resize: 'none' }}
            />
            <button
              onClick={() => copyToClipboard(translatedToEnglish)}
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
            >
              Copy
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-2 text-sm text-gray-700">
        Made by{' '}
        <a
          href="https://github.com/praveen-4906"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-medium hover:underline"
        >
          Praveen
        </a>
      </footer>
    </div>
  );
}

export default App;
