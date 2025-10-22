// Test script to verify Langchain implementation
import { generateAIResponseWithCircuitBreaker } from './src/ai/langchain-service-advanced';

// Mock environment variable for testing
process.env.GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'test-key';

async function testLangchainService() {
  console.log('Testing advanced Langchain service with circuit breaker...');
  
  try {
    const testPrompt = "What are some eco-friendly tips?";
    console.log(`Sending test prompt: ${testPrompt}`);
    
    const response = await generateAIResponseWithCircuitBreaker(testPrompt);
    console.log('Response received:', response);
    
    console.log('Test completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testLangchainService();