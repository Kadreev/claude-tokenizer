import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import TokenCounter from './components/TokenCounter';
import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <TokenCounter />
      </Layout>
    </ThemeProvider>
  );
}

export default App;