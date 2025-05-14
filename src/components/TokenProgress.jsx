import React from 'react';

function TokenProgress({ tokenCount, isLoading, selectedModel }) {
  // Model context limits
  const contextLimits = {
    'claude-3-opus': 200000,     // 200K tokens
    'claude-3.7-sonnet': 200000, // 200K tokens
    'claude-3.5-sonnet': 200000, // 200K tokens
    'claude-3.5-haiku': 200000,  // 200K tokens
    'claude-3-haiku': 200000     // 200K tokens
  };

  const maxTokens = contextLimits[selectedModel];
  const percentage = (tokenCount / maxTokens) * 100;
  
  // Color coding for progress bar
  let progressColor = 'bg-green-500';
  if (percentage > 75) progressColor = 'bg-red-500';
  else if (percentage > 50) progressColor = 'bg-yellow-500';
  
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Token Usage
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {isLoading ? 'Calculating...' : `${tokenCount.toLocaleString()} / ${maxTokens.toLocaleString()}`}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div 
          className={`h-2.5 rounded-full transition-all duration-500 ${progressColor}`} 
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {percentage.toFixed(2)}% of {selectedModel.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} context window
      </div>
    </div>
  );
}

export default TokenProgress;