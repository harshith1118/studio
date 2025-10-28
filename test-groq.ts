// Test script to verify Groq API implementation
import { generateAIResponseWithGroqAndCircuitBreaker } from './src/ai/groq-service';

// Set the GROQ API key from environment or use a placeholder for testing
process.env.GROQ_API_KEY = process.env.GROQ_API_KEY || 'your_groq_api_key_here';

async function testGroqService() {
  console.log('Testing Groq service with circuit breaker...');
  
  try {
    const testPrompt = "What are some eco-friendly tips?";
    console.log(`Sending test prompt: ${testPrompt}`);
    
    const response = await generateAIResponseWithGroqAndCircuitBreaker(testPrompt);
    console.log('Response received:', response);
    
    console.log('Groq test completed successfully!');
  } catch (error) {
    console.error('Groq test failed:', error);
  }
}

// Run the test
testGroqService();