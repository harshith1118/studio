import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
  try {
    // Test if the Gemini client can be initialized
    console.log('Gemini API Key present:', !!process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.log('Gemini API Key length:', process.env.GOOGLE_GENERATIVE_AI_API_KEY.length);
    }
    
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Test with a simple prompt
    const result = await model.generateContent('Hello, what is your name?');
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Gemini client initialized successfully',
      apiKeyPresent: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      testResponse: text
    });
  } catch (error) {
    console.error('Gemini initialization error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      apiKeyPresent: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY
    });
  }
}

export const runtime = 'nodejs';