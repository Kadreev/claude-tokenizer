import Anthropic from '@anthropic-ai/sdk';

let client = null;

function initClient() {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (apiKey && !client) {
    client = new Anthropic({ apiKey, dangerouslyAllowBrowser:true });
  }
  return client;
}

/**
 * Counts tokens using Anthropic's API
 * 
 * @param {string} text - The text to count tokens for
 * @returns {Promise<number>} - The actual token count from the API
 */
export async function countTokens(text) {
  if (!text) return 0;
  
  try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

    const client = new Anthropic({ apiKey, dangerouslyAllowBrowser:true });

    if (!client) {
      console.warn('No API key found. Using character-based estimation.');
      return Math.ceil(text.length / 4);
    }
    
    const response = await client.messages.countTokens({
  model: 'claude-3-7-sonnet-20250219',
  system: 'You are a scientist',
      messages: [{
        role: 'user',
        content: text
      }]
    });
    return response.input_tokens;
  } catch (error) {
    console.error('Error counting tokens:', error);
    if (error.status === 429) {
      console.warn('Rate limit exceeded. Using character-based estimation.');
    }
    // Fallback to basic estimation
    return Math.ceil(text.length / 4);
  }
}