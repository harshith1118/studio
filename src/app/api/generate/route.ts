import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

console.log('API route loaded');

const generateAIResponse = async (prompt) => {
  console.log('generateAIResponse called with prompt:', prompt);
  
  try {
    // Log API key status for debugging (without revealing the actual key)
    console.log('Gemini API Key present:', !!process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.log('Gemini API Key length:', process.env.GOOGLE_GENERATIVE_AI_API_KEY.length);
    }

    // Initialize Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // Generate content using Gemini with optimized parameters for speed
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.7,
        topP: 0.9
      }
    });
    
    const response = await result.response;
    const text = response.text();
    
    console.log('Received response from Gemini');
    return text;
  } catch (error) {
    console.error('Gemini API error:', error);
    // Fallback to simulated responses if Gemini fails
    return `I'm currently experiencing technical difficulties connecting to the AI service. This is a simulated response for demonstration purposes. Try asking again later for a real AI-generated response.`;
  }
};

export async function POST(request) {
  console.log('POST request received');
  
  try {
    const { prompt } = await request.json();
    console.log('Prompt received:', prompt);
    
    if (!prompt) {
      console.log('No prompt provided');
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }
    
    // Generate response using Gemini
    console.log('Generating AI response...');
    const result = await generateAIResponse(prompt);
    console.log('AI response generated:', result);
    
    return NextResponse.json({ result });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';