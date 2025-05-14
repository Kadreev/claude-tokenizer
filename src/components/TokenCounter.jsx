import React, { useState, useEffect, useRef } from 'react';
import { Copy, RefreshCw, CheckCircle, ChevronDown } from 'lucide-react';
import { countTokens } from '../services/tokenService';
import TokenStats from './TokenStats';
import TokenProgress from './TokenProgress';

function TokenCounter() {
  const [text, setText] = useState('');
  const [selectedModel, setSelectedModel] = useState('claude-3.7-sonnet');
  const [tokenCount, setTokenCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const updateCounts = async () => {
      if (text.trim() === '') {
        setTokenCount(0);
        setCharCount(0);
        return;
      }

      setIsLoading(true);
      try {
        const count = await countTokens(text);
        setTokenCount(count);
        setCharCount(text.length);
      } catch (error) {
        console.error('Error counting tokens:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(updateCounts, 300);
    return () => clearTimeout(debounceTimer);
  }, [text]);

  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand('copy');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const clearText = () => {
    setText('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">Input Text</h2>
              <div className="relative">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="appearance-none bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-sm rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-violet-500 focus:border-transparent cursor-pointer"
                >
                  <option value="claude-3.7-sonnet">Claude 3.7 Sonnet (200K)</option>
                  <option value="claude-3-opus">Claude 3 Opus (200K)</option>
                  <option value="claude-3.5-sonnet">Claude 3.5 Sonnet (200K)</option>
                  <option value="claude-3.5-haiku">Claude 3.5 Haiku (200K)</option>
                  <option value="claude-3-haiku">Claude 3 Haiku (200K)</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={clearText}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                aria-label="Clear text"
              >
                <RefreshCw size={18} />
              </button>
              <button
                onClick={handleCopy}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                aria-label="Copy text"
              >
                {isCopied ? <CheckCircle size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>
          </div>
          
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here to count tokens..."
            className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none transition-all duration-200"
            spellCheck="false"
          />
          
          <TokenProgress 
            tokenCount={tokenCount} 
            isLoading={isLoading} 
            selectedModel={selectedModel}
          />
          
          <TokenStats 
            tokenCount={tokenCount} 
            charCount={charCount}
            isLoading={isLoading}
            selectedModel={selectedModel}
          />
        </div>
      </div>
    </div>
  );
}

export default TokenCounter;