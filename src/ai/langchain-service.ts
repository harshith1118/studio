import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { LANGCHAIN_CONFIG } from "./config";

// Create a singleton instance to reuse the model connection
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

export const generateAIResponseWithLangchain = async (prompt: string): Promise<string> => {
  console.log('Generating AI response using Langchain with prompt:', prompt);
  
  try {
    const model = getChatModel();
    
    const messages = [
      new SystemMessage("You are an AI assistant that helps users with eco-friendly and sustainable living tips. Respond concisely and helpfully."),
      new HumanMessage(prompt),
    ];
    
    // Generate content using Langchain
    const result = await model.invoke(messages);
    const responseText = result.content as string;
    
    console.log('Received response from Langchain');
    return responseText;
  } catch (error) {
    console.error('Langchain API error:', error);
    
    // Fallback response
    return `I'm currently experiencing technical difficulties connecting to the AI service. This is a simulated response for demonstration purposes. Try asking again later for a real AI-generated response.`;
  }
};

// Alternative implementation with more detailed error handling and retry logic
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
      
      // Generate content using Langchain
      const result = await model.invoke(messages, {
        timeout: LANGCHAIN_CONFIG.timeout, // timeout from config
      });
      
      const responseText = result.content as string;
      console.log('Received response from advanced Langchain');
      return responseText;
    } catch (error: any) {
      lastError = error;
      console.error(`Attempt ${attempt} failed:`, error);
      
      // Log specific error details
      if (error.status) {
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
  console.error('All attempts failed. Last error:', lastError);
  return `I'm currently experiencing technical difficulties connecting to the AI service. This is a simulated response for demonstration purposes. Try asking again later for a real AI-generated response.`;
};