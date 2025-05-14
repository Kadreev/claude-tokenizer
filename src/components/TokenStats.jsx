import React from 'react';

function TokenStats({ tokenCount, charCount, isLoading, selectedModel }) {
  // Pricing per 1K tokens
  const modelPricing = {
    'claude-3-opus': 0.015,      // $15/million tokens
    'claude-3.7-sonnet': 0.003,  // $3/million tokens
    'claude-3.5-sonnet': 0.003,  // $3/million tokens
    'claude-3.5-haiku': 0.0008,  // $0.80/million tokens
    'claude-3-haiku': 0.00025    // $0.25/million tokens
  };

  const inputCostPer1K = modelPricing[selectedModel];
  const estimatedCost = (tokenCount / 1000) * inputCostPer1K;
  
  const stats = [
    { name: 'Tokens', value: isLoading ? '...' : tokenCount.toLocaleString() },
    { name: 'Characters', value: isLoading ? '...' : charCount.toLocaleString() },
    { 
      name: 'Estimated Cost', 
      value: isLoading ? '...' : `$${estimatedCost.toFixed(5)}` 
    },
    { 
      name: 'Tokens/Char Ratio', 
      value: isLoading || charCount === 0 ? '...' : (tokenCount / charCount).toFixed(2) 
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-all duration-200">
          <div className="text-sm text-gray-500 dark:text-gray-400">{stat.name}</div>
          <div className="text-lg font-medium text-gray-900 dark:text-white mt-1">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}

export default TokenStats;