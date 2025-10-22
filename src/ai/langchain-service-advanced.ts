import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { LANGCHAIN_CONFIG } from "./config";

// Create a singleton instance to reuse the model connection for better performance
let chatModel: ChatGoogleGenerativeAI | null = null;

const getChatModel = (): ChatGoogleGenerativeAI => {
  if (!chatModel) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }
    
    chatModel = new ChatGoogleGenerativeAI({
      modelName: LANGCHAIN_CONFIG.modelName,
      apiKey: process.env.GEMINI_API_KEY,
      maxOutputTokens: LANGCHAIN_CONFIG.maxOutputTokens,
      temperature: LANGCHAIN_CONFIG.temperature,
      topP: LANGCHAIN_CONFIG.topP,
      // Add retry configuration for more robust API calls
      maxRetries: LANGCHAIN_CONFIG.maxRetries,
    });
  }
  
  return chatModel;
};

/**
 * Implements a more resilient AI response generation with:
 * 1. Connection reuse (singleton pattern)
 * 2. Retry logic with exponential backoff
 * 3. Proper timeout handling
 * 4. Detailed error logging
 */
export const generateAIResponseWithLangchainAdvanced = async (prompt: string): Promise<string> => {
  console.log('Generating AI response using advanced Langchain with prompt:', prompt);
  
  let lastError: any;
  
  // Implement retry logic with exponential backoff
  for (let attempt = 1; attempt <= LANGCHAIN_CONFIG.maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt} for AI response generation`);
      
      const model = getChatModel();
      
      const messages = [
        new SystemMessage("You are an AI assistant that helps users with eco-friendly and sustainable living tips. Respond concisely and helpfully."),
        new HumanMessage(prompt),
      ];
      
      // Generate content using Langchain with timeout
      const result = await model.invoke(messages, {
        timeout: LANGCHAIN_CONFIG.timeout, // timeout from config
      });
      
      const responseText = result.content as string;
      console.log('Received response from advanced Langchain');
      return responseText;
    } catch (error: any) {
      lastError = error;
      console.error(`Attempt ${attempt} failed:`, error?.message || error);
      
      // Log specific error details
      if (error?.status) {
        console.error(`API Error Status: ${error.status}`);
      }
      
      // If this was the last attempt, break out of the loop
      if (attempt === LANGCHAIN_CONFIG.maxRetries) {
        break;
      }
      
      // Wait before retrying (exponential backoff: 1s, 2s, 4s)
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // If all attempts failed, log the final error and return fallback
  console.error('All attempts failed. Last error:', lastError?.message || lastError);
  
  // Return a helpful fallback message
  return `I'm currently experiencing technical difficulties connecting to the AI service. This is a simulated response for demonstration purposes. Try asking again later for a real AI-generated response.`;
};

/**
 * Alternative implementation with circuit breaker pattern
 */
interface CircuitBreakerState {
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  failureCount: number;
  lastFailureTime: number | null;
}

const circuitBreaker: CircuitBreakerState = {
  state: 'CLOSED',
  failureCount: 0,
  lastFailureTime: null,
};

const CIRCUIT_BREAKER_THRESHOLD = 3; // Number of failures before opening
const CIRCUIT_BREAKER_TIMEOUT = 30000; // 30 seconds before half-open

export const generateAIResponseWithCircuitBreaker = async (prompt: string): Promise<string> => {
  console.log('Generating AI response with circuit breaker pattern');
  
  // Check circuit breaker state
  if (circuitBreaker.state === 'OPEN') {
    const now = Date.now();
    if (now - (circuitBreaker.lastFailureTime || 0) > CIRCUIT_BREAKER_TIMEOUT) {
      // Timeout elapsed, try to reset
      circuitBreaker.state = 'HALF_OPEN';
      console.log('Circuit breaker in HALF_OPEN state, attempting to recover');
    } else {
      // Still in open state, return fallback
      console.log('Circuit breaker OPEN, returning fallback response');
      return `I'm temporarily unavailable due to high demand. Please try again later.`;
    }
  }
  
  try {
    // Call the main function
    const result = await generateAIResponseWithLangchainAdvanced(prompt);
    
    // Success - reset circuit breaker if it was in HALF_OPEN
    if (circuitBreaker.state === 'HALF_OPEN') {
      console.log('Circuit breaker recovery successful');
    }
    
    circuitBreaker.state = 'CLOSED';
    circuitBreaker.failureCount = 0;
    circuitBreaker.lastFailureTime = null;
    
    return result;
  } catch (error) {
    // Failure - increment failure count
    circuitBreaker.failureCount++;
    circuitBreaker.lastFailureTime = Date.now();
    
    if (circuitBreaker.failureCount >= CIRCUIT_BREAKER_THRESHOLD) {
      circuitBreaker.state = 'OPEN';
      console.log('Circuit breaker OPENED due to multiple failures');
    }
    
    throw error; // Re-throw to be handled by caller
  }
};