import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function GET() {
  try {
    // Test if the OpenAI client can be initialized
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    // Log API key status
    console.log('OpenAI API Key present:', !!process.env.OPENAI_API_KEY);
    if (process.env.OPENAI_API_KEY) {
      console.log('OpenAI API Key length:', process.env.OPENAI_API_KEY.length);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'OpenAI client initialized successfully',
      apiKeyPresent: !!process.env.OPENAI_API_KEY
    });
  } catch (error) {
    console.error('OpenAI initialization error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      apiKeyPresent: !!process.env.OPENAI_API_KEY
    });
  }
}

export const runtime = 'nodejs';