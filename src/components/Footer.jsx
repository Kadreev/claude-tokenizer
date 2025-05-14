import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 py-6 shadow-inner transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Claude Token Counter
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://docs.anthropic.com/en/docs/build-with-claude/token-counting" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors duration-200 text-sm"
            >
              Anthropic Documentation
            </a>
            <a 
              href="https://www.anthropic.com/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors duration-200 text-sm"
            >
              Claude API
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;